const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
const DATA_DIR = path.join(__dirname, "data");
const VECTOR_STORE_PATH = path.join(DATA_DIR, "rag-vector-store.json");
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const analysisSchema = {
  name: "smartstudy_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      summary: {
        type: "string",
        description: "A concise study summary in Traditional Chinese."
      },
      importantSentences: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            text: { type: "string" },
            level: { type: "string", enum: ["高", "中", "低"] },
            reasons: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["text", "level", "reasons"]
        }
      },
      keyTerms: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            description: { type: "string" }
          },
          required: ["label", "description"]
        }
      },
      possibleExamPoints: {
        type: "array",
        items: { type: "string" }
      },
      questions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            question: { type: "string" },
            answer: { type: "string" }
          },
          required: ["question", "answer"]
        }
      },
      practiceQuestions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            question: { type: "string" },
            answer: { type: "string" }
          },
          required: ["question", "answer"]
        }
      }
    },
    required: [
      "summary",
      "importantSentences",
      "keyTerms",
      "possibleExamPoints",
      "questions",
      "practiceQuestions"
    ]
  }
};

const tutorReplySchema = {
  name: "smartstudy_tutor_reply",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      reply: { type: "string" },
      followUpQuestion: { type: "string" },
      expectedAnswer: { type: "string" }
    },
    required: ["reply", "followUpQuestion", "expectedAnswer"]
  }
};

const tutorAnswerSchema = {
  name: "smartstudy_tutor_answer_feedback",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      answerCorrect: { type: "boolean" },
      reply: { type: "string" },
      mistakeHint: { type: "string" },
      followUpQuestion: { type: "string" },
      expectedAnswer: { type: "string" }
    },
    required: ["answerCorrect", "reply", "mistakeHint", "followUpQuestion", "expectedAnswer"]
  }
};

const ragAnswerSchema = {
  name: "smartstudy_rag_answer",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      answer: { type: "string" }
    },
    required: ["answer"]
  }
};

const studyAgentPlanSchema = {
  name: "smartstudy_study_agent_plan",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      overview: { type: "string" },
      todayTasks: {
        type: "array",
        items: { type: "string" }
      },
      dailyPlan: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            dayLabel: { type: "string" },
            focus: { type: "string" },
            tasks: {
              type: "array",
              items: { type: "string" }
            },
            hours: { type: "number" }
          },
          required: ["dayLabel", "focus", "tasks", "hours"]
        }
      },
      weeklyProgress: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            description: { type: "string" }
          },
          required: ["label", "description"]
        }
      },
      subjectPriority: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            description: { type: "string" }
          },
          required: ["label", "description"]
        }
      },
      chapterPriority: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            description: { type: "string" }
          },
          required: ["label", "description"]
        }
      },
      memoryRiskAlerts: {
        type: "array",
        items: { type: "string" }
      },
      highRiskAlerts: {
        type: "array",
        items: { type: "string" }
      },
      sprintMode: {
        type: "object",
        additionalProperties: false,
        properties: {
          enabled: { type: "boolean" },
          summary: { type: "string" },
          action: { type: "string" }
        },
        required: ["enabled", "summary", "action"]
      }
    },
    required: [
      "overview",
      "todayTasks",
      "dailyPlan",
      "weeklyProgress",
      "subjectPriority",
      "chapterPriority",
      "memoryRiskAlerts",
      "highRiskAlerts",
      "sprintMode"
    ]
  }
};

function normalizeString(value) {
  return String(value || "").replace(/\r/g, "").replace(/\s+/g, " ").trim();
}

function normalizeArray(items) {
  return Array.isArray(items) ? items : [];
}

function normalizeAnalysisPayload(payload) {
  const keyTerms = normalizeArray(payload?.keyTerms || payload?.accountingTerms)
    .map((item) => ({
      label: normalizeString(item?.label),
      description: normalizeString(item?.description)
    }))
    .filter((item) => item.label && item.description);
  const practiceQuestions = normalizeArray(payload?.practiceQuestions || payload?.mockExamQuestions)
    .map((item) => ({
      question: normalizeString(item?.question),
      answer: normalizeString(item?.answer)
    }))
    .filter((item) => item.question && item.answer);

  return {
    summary: normalizeString(payload?.summary),
    importantSentences: normalizeArray(payload?.importantSentences)
      .map((item) => ({
        text: normalizeString(item?.text),
        level: ["高", "中", "低"].includes(item?.level) ? item.level : "高",
        reasons: normalizeArray(item?.reasons).map(normalizeString).filter(Boolean)
      }))
      .filter((item) => item.text),
    keyTerms,
    accountingTerms: keyTerms,
    possibleExamPoints: normalizeArray(payload?.possibleExamPoints)
      .map(normalizeString)
      .filter(Boolean),
    questions: normalizeArray(payload?.questions)
      .map((item) => ({
        question: normalizeString(item?.question),
        answer: normalizeString(item?.answer)
      }))
      .filter((item) => item.question && item.answer),
    practiceQuestions,
    mockExamQuestions: practiceQuestions
  };
}

function clipText(value, maxLength = 12000) {
  return normalizeString(value).slice(0, maxLength);
}

function normalizeTutorContext(context = {}) {
  return {
    sourceText: clipText(context.sourceText || "", 12000),
    summary: clipText(context.summary || "", 1800),
    importantSentences: normalizeArray(context.importantSentences).map((item) => clipText(item, 220)).filter(Boolean).slice(0, 8),
    possibleExamPoints: normalizeArray(context.possibleExamPoints).map((item) => clipText(item, 220)).filter(Boolean).slice(0, 8),
    keyTerms: normalizeArray(context.keyTerms || context.accountingTerms).map((item) => clipText(item, 120)).filter(Boolean).slice(0, 10)
  };
}

function normalizeStudyAgentRequest(payload = {}) {
  return {
    noteText: clipText(payload.noteText || "", 16000),
    summary: clipText(payload.summary || "", 2200),
    possibleExamPoints: normalizeArray(payload.possibleExamPoints).map((item) => clipText(item, 220)).filter(Boolean).slice(0, 10),
    keyTerms: normalizeArray(payload.keyTerms || payload.accountingTerms).map((item) => clipText(item, 120)).filter(Boolean).slice(0, 12),
    wrongQuestions: clipText(payload.wrongQuestions || "", 5000),
    examDate: normalizeString(payload.examDate || ""),
    studyHoursPerDay: Number(payload.studyHoursPerDay) || 0
  };
}

function normalizeStudyAgentPlan(plan = {}) {
  return {
    overview: normalizeString(plan.overview),
    todayTasks: normalizeArray(plan.todayTasks).map(normalizeString).filter(Boolean),
    dailyPlan: normalizeArray(plan.dailyPlan)
      .map((item) => ({
        dayLabel: normalizeString(item?.dayLabel),
        focus: normalizeString(item?.focus),
        tasks: normalizeArray(item?.tasks).map(normalizeString).filter(Boolean),
        hours: Number(item?.hours) || 0
      }))
      .filter((item) => item.dayLabel && item.focus),
    weeklyProgress: normalizeArray(plan.weeklyProgress)
      .map((item) => ({
        label: normalizeString(item?.label),
        description: normalizeString(item?.description)
      }))
      .filter((item) => item.label && item.description),
    subjectPriority: normalizeArray(plan.subjectPriority)
      .map((item) => ({
        label: normalizeString(item?.label),
        description: normalizeString(item?.description)
      }))
      .filter((item) => item.label && item.description),
    chapterPriority: normalizeArray(plan.chapterPriority)
      .map((item) => ({
        label: normalizeString(item?.label),
        description: normalizeString(item?.description)
      }))
      .filter((item) => item.label && item.description),
    memoryRiskAlerts: normalizeArray(plan.memoryRiskAlerts).map(normalizeString).filter(Boolean),
    highRiskAlerts: normalizeArray(plan.highRiskAlerts).map(normalizeString).filter(Boolean),
    sprintMode: {
      enabled: Boolean(plan.sprintMode?.enabled),
      summary: normalizeString(plan.sprintMode?.summary),
      action: normalizeString(plan.sprintMode?.action)
    }
  };
}

function normalizeTutorHistory(messages = []) {
  return normalizeArray(messages)
    .map((item) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      text: clipText(item?.text || "", 1200)
    }))
    .filter((item) => item.text)
    .slice(-10);
}

function buildTutorContextBlock(noteContext = {}) {
  const sections = [];

  if (noteContext.summary) {
    sections.push(`智慧摘要：${noteContext.summary}`);
  }
  if (noteContext.importantSentences.length) {
    sections.push(`重要句子：${noteContext.importantSentences.join("；")}`);
  }
  if (noteContext.possibleExamPoints.length) {
    sections.push(`可能重點：${noteContext.possibleExamPoints.join("；")}`);
  }
  if (noteContext.keyTerms.length) {
    sections.push(`關鍵詞／重要概念：${noteContext.keyTerms.join("、")}`);
  }
  if (noteContext.sourceText) {
    sections.push(`原始筆記內容：${noteContext.sourceText}`);
  }

  return sections.join("\n");
}

function buildHistoryBlock(messages = []) {
  if (!messages.length) {
    return "目前沒有先前對話。";
  }
  return messages
    .map((message) => `${message.role === "assistant" ? "老師" : "學生"}：${message.text}`)
    .join("\n");
}

async function createStructuredResponse({ schema, systemPrompt, userPrompt, maxOutputTokens = 1800 }) {
  const response = await openai.responses.create({
    model: MODEL,
    input: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userPrompt
      }
    ],
    text: {
      format: {
        type: "json_schema",
        ...schema
      }
    },
    max_output_tokens: maxOutputTokens
  });

  const outputText = response.output_text || "";
  if (!outputText) {
    throw new Error("The OpenAI response did not include output_text.");
  }

  return JSON.parse(outputText);
}

function buildPrompt(text, modeLabel) {
  return [
    "你是 SmartStudy-AI 的進階分析模型。",
    "請閱讀使用者提供的內容，並以繁體中文輸出結構化整理結果。",
    `目前整理模式：${modeLabel || "一般整理模式"}`,
    "請聚焦於文件解釋與複習用途，不要加入版權聲明、教材頁碼、出版社資訊或雜訊標題。",
    "請回傳：智慧摘要、重要句子、關鍵詞／重要概念、可能考點、理解問題、延伸練習。",
    "重要句子請挑真正重要的原句或高度貼近原意的句子，並附上重要原因。",
    "關鍵詞／重要概念可包含任何學科或文章中的專有名詞，不限特定領域。",
    "可能考點不要使用固定罐頭句，例如不要每一點都以「這段內容可能會被考成」開頭。",
    "每個可能考點都要有具體內容，可以指出核心概念、常見考法、容易混淆處、判斷邏輯或作答方向。",
    "如果某個重點一句話就能說清楚，就只寫一句；不要為了湊字數而重複說明。",
    "請避免中英文夾雜。除非原文沒有合適中文譯名，否則名詞請優先使用繁體中文。",
    "除非原文必要，否則不要把同一個名詞寫成中英文並列格式。",
    "理解問題與延伸練習都要附答案，答案要簡潔但具體。",
    "",
    "以下是要分析的內容：",
    text
  ].join("\n");
}

function buildTutorAskPrompt(noteContext, history, userInput) {
  return [
    "你是 SmartStudy-AI 的 AI Tutor。",
    "你的回答風格要像一位耐心、清楚、很會帶學生理解概念的老師。",
    "你只能根據目前這份筆記內容回答；如果筆記沒有提供足夠資訊，請明確說明「這份筆記目前沒有提到這一點」。",
    "請用繁體中文回答，優先使用教學式說明：先講概念，再講理由，再用簡短例子幫助理解。",
    "若適合，可以在回答最後附上一題簡短的小檢查題，並提供標準答案，方便後續批改。",
    "",
    "目前筆記內容：",
    buildTutorContextBlock(noteContext),
    "",
    "近期對話：",
    buildHistoryBlock(history),
    "",
    `學生的問題：${userInput}`
  ].join("\n");
}

function buildTutorQuizPrompt(noteContext, history) {
  return [
    "你是 SmartStudy-AI 的 AI Tutor。",
    "請根據目前筆記內容，像老師帶學生練習一樣，先用一兩句話說明這題要練什麼，再出一題短題。",
    "題目要清楚、聚焦單一概念，並提供標準答案供後續批改使用。",
    "請用繁體中文。",
    "",
    "目前筆記內容：",
    buildTutorContextBlock(noteContext),
    "",
    "近期對話：",
    buildHistoryBlock(history)
  ].join("\n");
}

function buildTutorAnswerPrompt(noteContext, history, pendingQuestion, userInput) {
  return [
    "你是 SmartStudy-AI 的 AI Tutor。",
    "你的工作是批改學生針對目前筆記內容的答案。",
    "請依照以下原則：",
    "1. 判斷學生答案是否正確或大致正確。",
    "2. 如果錯誤，要明確指出錯在哪裡。",
    "3. 接著用老師教學的方式重新解釋。",
    "4. 最後再出一題類似題，並提供標準答案。",
    "5. 如果學生答對，也要簡短肯定，說明答對關鍵，並再出一題稍微相似的練習題。",
    "請用繁體中文。",
    "",
    "目前筆記內容：",
    buildTutorContextBlock(noteContext),
    "",
    "近期對話：",
    buildHistoryBlock(history),
    "",
    `目前題目：${normalizeString(pendingQuestion?.question)}`,
    `標準答案參考：${normalizeString(pendingQuestion?.expectedAnswer)}`,
    `學生作答：${userInput}`
  ].join("\n");
}

function buildStudyAgentPrompt(request) {
  const today = new Date().toISOString().slice(0, 10);
  return [
    "你是 SmartStudy-AI 的 AI Study Agent。",
    "你的任務是根據使用者的筆記、錯題、考試日期與每日可讀書時間，生成務實、可執行、能動態調整的讀書計畫。",
    "請用繁體中文作答。",
    "請特別做到以下幾點：",
    "1. 判斷哪個科目或主題最該優先。",
    "2. 判斷哪個章節或概念最該優先。",
    "3. 安排今天先做什麼。",
    "4. 排出接下來幾天的每日讀書計畫。",
    "5. 給出本週進度追蹤重點。",
    "6. 主動提醒哪些內容快忘了、哪些內容風險最高。",
    "7. 如果離考試很近，要啟動考前衝刺模式。",
    "8. 計畫必須符合每日可讀書時間，不要排太空泛的任務。",
    "",
    `今天日期：${today}`,
    `考試日期：${request.examDate}`,
    `每日可讀書時間：${request.studyHoursPerDay} 小時`,
    "",
    `錯題 / 脆弱觀念：${request.wrongQuestions || "目前未提供額外錯題"}`,
    `關鍵詞／重要概念：${request.keyTerms.join("、") || "目前未整理"}`,
    `可能考點：${request.possibleExamPoints.join("；") || "目前未整理"}`,
    `摘要：${request.summary || "目前未整理摘要"}`,
    "",
    "使用者筆記：",
    request.noteText
  ].join("\n");
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadVectorStore() {
  ensureDataDir();
  if (!fs.existsSync(VECTOR_STORE_PATH)) {
    return { chunkCount: 0, fileCount: 0, chunks: [], updatedAt: null };
  }

  try {
    const raw = fs.readFileSync(VECTOR_STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      chunkCount: Number(parsed.chunkCount) || 0,
      fileCount: Number(parsed.fileCount) || 0,
      chunks: normalizeArray(parsed.chunks),
      updatedAt: parsed.updatedAt || null
    };
  } catch (error) {
    return { chunkCount: 0, fileCount: 0, chunks: [], updatedAt: null };
  }
}

function saveVectorStore(store) {
  ensureDataDir();
  fs.writeFileSync(VECTOR_STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

function cosineSimilarity(a = [], b = []) {
  if (!a.length || !b.length || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (!normA || !normB) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function detectPageNumber(title = "") {
  const patterns = [
    /PDF 第\s*(\d+)\s*頁/i,
    /第\s*(\d+)\s*頁/i,
    /第\s*(\d+)\s*張投影片/i,
    /第\s*(\d+)\s*頁投影片/i
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      return Number(match[1]);
    }
  }

  return null;
}

function splitIntoChunks(text, options = {}) {
  const chunkSize = options.chunkSize || 800;
  const overlap = options.overlap || 140;
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized) {
    return [];
  }

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return [];
  }

  const chunks = [];
  let current = "";

  const pushCurrent = () => {
    const value = current.trim();
    if (!value) {
      return;
    }
    chunks.push(value);
    current = value.slice(-overlap);
  };

  paragraphs.forEach((paragraph) => {
    if ((current + "\n\n" + paragraph).trim().length <= chunkSize) {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
      return;
    }

    if (current.trim()) {
      pushCurrent();
    }

    if (paragraph.length <= chunkSize) {
      current = paragraph;
      return;
    }

    let start = 0;
    while (start < paragraph.length) {
      const slice = paragraph.slice(start, start + chunkSize).trim();
      if (slice) {
        chunks.push(slice);
      }
      start += Math.max(chunkSize - overlap, 80);
    }
    current = "";
  });

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

function normalizeDocuments(documents = []) {
  return normalizeArray(documents)
    .map((document) => ({
      fileName: normalizeString(document?.fileName),
      extension: normalizeString(document?.extension),
      sourceMeta: document?.sourceMeta || null,
      sections: normalizeArray(document?.sections)
        .map((section) => ({
          title: normalizeString(section?.title),
          text: clipText(section?.text || "", 20000),
          pageNumber: Number(section?.pageNumber) || null,
          paragraphNumber: Number(section?.paragraphNumber) || null
        }))
        .filter((section) => section.text)
    }))
    .filter((document) => document.fileName && document.sections.length > 0);
}

function createChunkRecords(documents = []) {
  const records = [];

  documents.forEach((document) => {
    document.sections.forEach((section, sectionIndex) => {
      const chunks = splitIntoChunks(section.text);
      const pageNumber = section.pageNumber || detectPageNumber(section.title);
      chunks.forEach((chunkText, chunkIndex) => {
        records.push({
          id: `${document.fileName}-${sectionIndex}-${chunkIndex}`,
          fileName: document.fileName,
          extension: document.extension,
          sectionTitle: section.title || `Section ${sectionIndex + 1}`,
          pageNumber,
          paragraphNumber: section.paragraphNumber || null,
          sectionIndex,
          chunkIndex,
          text: chunkText
        });
      });
    });
  });

  return records;
}

async function embedTexts(texts = []) {
  if (!texts.length) {
    return [];
  }

  const batchSize = 50;
  const embeddings = [];

  for (let index = 0; index < texts.length; index += batchSize) {
    const batch = texts.slice(index, index + batchSize);
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch
    });
    response.data.forEach((item) => {
      embeddings.push(item.embedding);
    });
  }

  return embeddings;
}

function buildRagPrompt(question, matches = []) {
  const sourceList = matches.map((item, index) => {
    const locationParts = [];
    if (item.pageNumber) {
      locationParts.push(`第 ${item.pageNumber} 頁`);
    }
    if (item.paragraphNumber) {
      locationParts.push(`第 ${item.paragraphNumber} 段`);
    }
    if (!locationParts.length && item.sectionTitle) {
      locationParts.push(item.sectionTitle);
    }

    return [
      `[${index + 1}] 檔案：${item.fileName}`,
      `位置：${locationParts.join("｜") || "未標記位置"}`,
      `引用段落：${item.text}`
    ].join("\n");
  }).join("\n\n");

  return [
    "你是 SmartStudy-AI 的 RAG 問答助手。",
    "請只能根據提供的來源片段回答，不要自行補充來源外的知識。",
    "請用繁體中文作答。",
    "回答時請在句尾用 [1]、[2] 這種格式標示引用來源。",
    "如果來源不足以回答，請直接說明目前知識庫沒有足夠資訊。",
    "",
    `使用者問題：${question}`,
    "",
    "可用來源：",
    sourceList
  ].join("\n");
}

app.use(express.json({ limit: "20mb" }));
app.use(express.static(__dirname));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    hasApiKey: Boolean(process.env.OPENAI_API_KEY),
    model: MODEL,
    embeddingModel: EMBEDDING_MODEL
  });
});

app.get("/api/rag/status", (req, res) => {
  const store = loadVectorStore();
  res.json({
    ok: true,
    fileCount: store.fileCount,
    chunkCount: store.chunkCount,
    updatedAt: store.updatedAt,
    files: [...new Set(store.chunks.map((item) => item.fileName))].sort()
  });
});

app.post("/api/analyze", async (req, res) => {
  if (!openai) {
    res.status(500).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  const text = normalizeString(req.body?.text);
  const modeLabel = normalizeString(req.body?.modeLabel);

  if (!text) {
    res.status(400).json({
      ok: false,
      error: "Missing text to analyze."
    });
    return;
  }

  try {
    const response = await openai.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content: "You are a precise study-note analysis assistant. Always produce Traditional Chinese content."
        },
        {
          role: "user",
          content: buildPrompt(text, modeLabel)
        }
      ],
      text: {
        format: {
          type: "json_schema",
          ...analysisSchema
        }
      },
      max_output_tokens: 2200
    });

    const outputText = response.output_text || "";
    if (!outputText) {
      throw new Error("The OpenAI response did not include output_text.");
    }

    const parsed = JSON.parse(outputText);
    res.json({
      ok: true,
      analysis: normalizeAnalysisPayload(parsed)
    });
  } catch (error) {
    console.error("OpenAI analyze error:", error);
    res.status(500).json({
      ok: false,
      error: error?.message || "Failed to analyze content with OpenAI."
    });
  }
});

app.post("/api/tutor", async (req, res) => {
  if (!openai) {
    res.status(500).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  const action = normalizeString(req.body?.action);
  const userInput = clipText(req.body?.userInput || "", 1600);
  const noteContext = normalizeTutorContext(req.body?.noteContext || {});
  const history = normalizeTutorHistory(req.body?.messages || []);
  const pendingQuestion = {
    question: clipText(req.body?.pendingQuestion?.question || "", 500),
    expectedAnswer: clipText(req.body?.pendingQuestion?.expectedAnswer || "", 800)
  };

  if (!noteContext.sourceText && !noteContext.summary) {
    res.status(400).json({
      ok: false,
      error: "Missing note context for AI Tutor."
    });
    return;
  }

  try {
    if (action === "ask") {
      if (!userInput) {
        res.status(400).json({
          ok: false,
          error: "Missing tutor question."
        });
        return;
      }

      const parsed = await createStructuredResponse({
        schema: tutorReplySchema,
        systemPrompt: "You are a teacher-style AI tutor. Always answer in Traditional Chinese and stay grounded in the provided notes.",
        userPrompt: buildTutorAskPrompt(noteContext, history, userInput),
        maxOutputTokens: 1400
      });

      res.json({
        ok: true,
        reply: normalizeString(parsed.reply),
        followUpQuestion: normalizeString(parsed.followUpQuestion),
        expectedAnswer: normalizeString(parsed.expectedAnswer)
      });
      return;
    }

    if (action === "quiz") {
      const parsed = await createStructuredResponse({
        schema: tutorReplySchema,
        systemPrompt: "You are a teacher-style AI tutor. Always answer in Traditional Chinese and generate a focused practice question based on the provided notes.",
        userPrompt: buildTutorQuizPrompt(noteContext, history),
        maxOutputTokens: 1200
      });

      res.json({
        ok: true,
        reply: normalizeString(parsed.reply),
        followUpQuestion: normalizeString(parsed.followUpQuestion),
        expectedAnswer: normalizeString(parsed.expectedAnswer)
      });
      return;
    }

    if (action === "answer") {
      if (!userInput || !pendingQuestion.question) {
        res.status(400).json({
          ok: false,
          error: "Missing pending tutor question or student answer."
        });
        return;
      }

      const parsed = await createStructuredResponse({
        schema: tutorAnswerSchema,
        systemPrompt: "You are a teacher-style AI tutor. Always answer in Traditional Chinese. When the answer is wrong, point out the mistake clearly, reteach it, and ask a similar question.",
        userPrompt: buildTutorAnswerPrompt(noteContext, history, pendingQuestion, userInput),
        maxOutputTokens: 1600
      });

      res.json({
        ok: true,
        answerCorrect: Boolean(parsed.answerCorrect),
        reply: normalizeString(parsed.reply),
        mistakeHint: normalizeString(parsed.mistakeHint),
        followUpQuestion: normalizeString(parsed.followUpQuestion),
        expectedAnswer: normalizeString(parsed.expectedAnswer)
      });
      return;
    }

    res.status(400).json({
      ok: false,
      error: "Unsupported tutor action."
    });
  } catch (error) {
    console.error("OpenAI tutor error:", error);
    res.status(500).json({
      ok: false,
      error: error?.message || "Failed to generate AI Tutor response."
    });
  }
});

app.post("/api/study-agent/plan", async (req, res) => {
  if (!openai) {
    res.status(500).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  const request = normalizeStudyAgentRequest(req.body || {});
  if (!request.noteText) {
    res.status(400).json({
      ok: false,
      error: "Missing note text for the study plan."
    });
    return;
  }

  if (!request.examDate) {
    res.status(400).json({
      ok: false,
      error: "Missing exam date for the study plan."
    });
    return;
  }

  if (!request.studyHoursPerDay || request.studyHoursPerDay <= 0) {
    res.status(400).json({
      ok: false,
      error: "Missing daily study hours for the study plan."
    });
    return;
  }

  try {
    const parsed = await createStructuredResponse({
      schema: studyAgentPlanSchema,
      systemPrompt: "You are an AI study planning agent. Always answer in Traditional Chinese and create practical, adaptive study plans that fit the user's available time.",
      userPrompt: buildStudyAgentPrompt(request),
      maxOutputTokens: 2200
    });

    res.json({
      ok: true,
      plan: normalizeStudyAgentPlan(parsed)
    });
  } catch (error) {
    console.error("Study agent plan error:", error);
    res.status(500).json({
      ok: false,
      error: error?.message || "Failed to generate the study plan."
    });
  }
});

app.post("/api/rag/index", async (req, res) => {
  if (!openai) {
    res.status(500).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  const documents = normalizeDocuments(req.body?.documents || []);
  if (!documents.length) {
    res.status(400).json({
      ok: false,
      error: "No valid documents were provided for indexing."
    });
    return;
  }

  try {
    const chunkRecords = createChunkRecords(documents);
    if (!chunkRecords.length) {
      res.status(400).json({
        ok: false,
        error: "The uploaded documents did not produce any indexable chunks."
      });
      return;
    }

    const embeddings = await embedTexts(chunkRecords.map((item) => item.text));
    const newChunks = chunkRecords.map((item, index) => ({
      ...item,
      embedding: embeddings[index]
    }));

    const existingStore = loadVectorStore();
    const replacedFiles = new Set(documents.map((document) => document.fileName));
    const preservedChunks = existingStore.chunks.filter((item) => !replacedFiles.has(item.fileName));
    const nextChunks = preservedChunks.concat(newChunks);
    const store = {
      chunkCount: nextChunks.length,
      fileCount: new Set(nextChunks.map((item) => item.fileName)).size,
      chunks: nextChunks,
      updatedAt: new Date().toISOString()
    };

    saveVectorStore(store);

    res.json({
      ok: true,
      fileCount: documents.length,
      chunkCount: newChunks.length,
      totalFileCount: store.fileCount,
      totalChunkCount: store.chunkCount,
      files: documents.map((document) => document.fileName)
    });
  } catch (error) {
    console.error("RAG index error:", error);
    res.status(500).json({
      ok: false,
      error: error?.message || "Failed to build the RAG knowledge base."
    });
  }
});

app.post("/api/rag/query", async (req, res) => {
  if (!openai) {
    res.status(500).json({
      ok: false,
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  const question = normalizeString(req.body?.question);
  if (!question) {
    res.status(400).json({
      ok: false,
      error: "Missing RAG question."
    });
    return;
  }

  const store = loadVectorStore();
  if (!store.chunks.length) {
    res.status(400).json({
      ok: false,
      error: "The knowledge base is empty. Please index documents first."
    });
    return;
  }

  try {
    const embeddingResponse = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: question
    });
    const queryEmbedding = embeddingResponse.data?.[0]?.embedding || [];

    const ranked = store.chunks
      .map((item) => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding || [])
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    const parsed = await createStructuredResponse({
      schema: ragAnswerSchema,
      systemPrompt: "You are a retrieval-augmented answer assistant. Always answer in Traditional Chinese and cite sources with bracket numbers like [1] [2].",
      userPrompt: buildRagPrompt(question, ranked),
      maxOutputTokens: 1400
    });

    res.json({
      ok: true,
      answer: normalizeString(parsed.answer),
      sources: ranked.map((item) => ({
        fileName: item.fileName,
        pageNumber: item.pageNumber,
        paragraphNumber: item.paragraphNumber,
        sectionTitle: item.sectionTitle,
        quote: item.text,
        score: Number(item.score?.toFixed?.(4) || item.score || 0)
      }))
    });
  } catch (error) {
    console.error("RAG query error:", error);
    res.status(500).json({
      ok: false,
      error: error?.message || "Failed to answer the RAG question."
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`SmartStudy-AI server running at http://localhost:${PORT}`);
});
