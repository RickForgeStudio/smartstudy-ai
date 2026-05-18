# SmartStudy-AI

SmartStudy-AI 是一個文件整理與學習輔助工具。你可以貼上文字，或上傳 `TXT / MD / CSV / JSON / HTML / XML / DOCX / PPTX / PDF` 等檔案，系統會先抽取內容，再整理成摘要、重點、關鍵名詞與練習題。

目前支援兩種分析模式：

- `智慧規則分析`：純前端規則分析，不需要 OpenAI API
- `進階 AI 模式`：透過 Node.js + Express 後端安全串接 OpenAI API

如果 `進階 AI 模式` 因為 API Key 未設定、伺服器未啟動或 API 呼叫失敗而不可用，前端會自動退回 `智慧規則分析`。

## 專案結構

```text
smartstudy-ai/
├── index.html
├── style.css
├── app.js
├── finance-knowledge.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

## 功能

- 貼上文字或上傳文件後自動整理內容
- 產生智慧摘要
- 擷取重要句子
- 整理關鍵名詞
- 推測可能考點
- 產生理解問題
- 產生延伸練習
- 加入 AI Tutor 教學問答
- 加入 RAG AI 知識庫
- 加入 AI Study Agent 讀書規劃
- 支援複製結果與下載筆記
- 支援中英文結果切換
- 保留本機規則分析作為備援

## 啟動方式

### 1. 安裝套件

```bash
cd smartstudy-ai
npm install
```

### 2. 建立環境變數

把 `.env.example` 複製成 `.env`：

```bash
cp .env.example .env
```

接著填入你的 OpenAI API Key：

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
PORT=3000
```

### 3. 啟動伺服器

```bash
npm start
```

啟動後打開：

```txt
http://localhost:3000
```

## 使用方式

1. 開啟網站
2. 選擇整理模式
3. 選擇分析方式
   - `智慧規則分析`
   - `進階 AI 模式`
4. 貼上內容或上傳檔案
5. 點「開始整理筆記」

若選擇 `進階 AI 模式`，前端會呼叫：

```txt
POST /api/analyze
```

由後端使用 OpenAI API 產生：

- 智慧摘要
- 重要句子
- 關鍵名詞
- 可能考點
- 理解問題
- 延伸練習

整理完成後也可以使用 `AI Tutor`：

- 直接針對目前筆記提問
- 請老師根據目前內容出題
- 送出自己的答案後，讓 AI 批改
- 若答錯，AI 會指出錯在哪、重新解釋，並再出一題類似題

## RAG AI 知識庫

RAG AI 知識庫目前提供兩種模式：

### 1. 展示模式：前端關鍵字 RAG

此模式可直接部署在 GitHub Pages，不需要後端與 OpenAI API Key。  
系統會在前端抽取文件文字、切成段落 chunks，並使用關鍵字比對找出相關內容。  
適合課堂展示、作業發表與快速 Demo。

### 2. 進階模式：OpenAI Embedding RAG

此模式需要啟動 `server.js`，並在 `.env` 設定 `OPENAI_API_KEY`。  
系統會將文件 chunks 轉成 embedding，建立本地向量索引。  
使用者提問時，後端會將問題轉成 embedding，透過 cosine similarity 找出最相關段落，再交給 OpenAI 產生回答。

若進階模式失敗，系統會自動退回展示模式，避免網站功能中斷。

此外，RAG 知識庫已和整體學習流程串接：

- 可把首頁最近一次整理結果直接加入知識庫
- 可把知識庫問答送去 `AI Tutor` 繼續解釋
- 可把知識庫問答送去 `AI Study Agent` 納入讀書計畫
- 可根據目前 RAG 回答整理成考前重點

也可以使用 `AI Study Agent`：

- 分析目前筆記
- 分析錯題與薄弱觀念
- 讀取考試日期
- 讀取每日可讀書時間
- 生成今日任務
- 生成每日讀書計畫
- 生成本週進度
- 自動調整優先科目與優先章節
- 主動提醒快忘內容與高風險內容
- 在接近考試時提供考前衝刺模式

## API 說明

### `POST /api/analyze`

Request body:

```json
{
  "text": "要分析的內容",
  "mode": "exam",
  "modeLabel": "考試複習模式"
}
```

### `POST /api/tutor`

Request body:

```json
{
  "action": "ask",
  "userInput": "這段內容的重點是什麼？",
  "noteContext": {
    "sourceText": "目前筆記全文",
    "summary": "目前摘要",
    "importantSentences": ["重要句子 1"],
    "possibleExamPoints": ["可能重點 1"],
    "accountingTerms": ["關鍵名詞"]
  },
  "messages": [
    {
      "role": "assistant",
      "text": "上一輪老師回覆"
    }
  ],
  "pendingQuestion": {
    "question": "老師目前出的題目",
    "expectedAnswer": "標準答案"
  }
}
```

### `GET /api/rag/status`

回傳目前後端向量 RAG 知識庫的檔案數、chunk 數、已索引檔名與更新時間。

### `POST /api/rag/index`

把前端抽取完成的多份文件 sections 送到後端，建立 embedding 與本地向量索引。

每個 section 可附帶：

- `title`
- `text`
- `pageNumber`
- `paragraphNumber`

### `POST /api/rag/query`

送出問題後，後端會：

1. 先替問題建立 embedding
2. 用 cosine similarity 找出最相關的 chunks
3. 把檢索結果交給 OpenAI 產生最終回答
4. 回傳答案與引用來源

引用來源會包含：

- `fileName`
- `pageNumber`
- `paragraphNumber`
- `quote`

### `POST /api/study-agent/plan`

根據目前筆記、錯題、考試日期與每日可讀書時間，生成：

- 讀書計畫總覽
- 今日任務
- 每日讀書計畫
- 本週進度
- 優先科目 / 章節
- 快忘風險提醒
- 高風險提醒
- 考前衝刺模式

Response:

```json
{
  "ok": true,
  "analysis": {
    "summary": "摘要內容",
    "importantSentences": [
      {
        "text": "重要句子",
        "level": "高",
        "reasons": ["原因一", "原因二"]
      }
    ],
    "accountingTerms": [
      {
        "label": "關鍵名詞",
        "description": "名詞說明"
      }
    ],
    "possibleExamPoints": ["可能考點一"],
    "questions": [
      {
        "question": "理解問題",
        "answer": "答案"
      }
    ],
    "mockExamQuestions": [
      {
        "question": "延伸練習",
        "answer": "答案"
      }
    ]
  }
}
```

## 本機規則分析與 AI 模式差異

### 智慧規則分析

- 完全在前端進行
- 不需要 OpenAI API Key
- 適合本機展示、備援與離線感較高的情境

### 進階 AI 模式

- 需要啟動 `server.js`
- 需要設定 `OPENAI_API_KEY`
- 會透過 OpenAI API 產生更完整的摘要與題目
- 若失敗，會自動退回智慧規則分析

## 檢查語法

```bash
npm run check
```

## 技術組成

- `HTML`
- `CSS`
- `JavaScript`
- `Node.js`
- `Express`
- `dotenv`
- `OpenAI Node SDK`
- `OpenAI Embeddings`
- `JSZip`
- `Mammoth`
- `pdf.js`
- `Tesseract.js`

## 注意事項

- `OPENAI_API_KEY` 不要寫在前端 `app.js`
- `.env` 不要提交到公開 repository
- 若只想展示純前端功能，可以直接使用 `智慧規則分析`
- `DOCX / PPTX / PDF / OCR` 解析仍仰賴前端套件與瀏覽器環境
- RAG 知識庫目前使用本地 JSON 向量索引，適合本機專案與中小型知識庫展示

## 之後可再擴充

- 加入串流回應
- 加入模型切換選單
- 加入分析 token / 成本提示
- 加入登入與雲端歷史紀錄
- 加入更通用的非會計知識庫
