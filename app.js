const missingElementAudit = [];
const OPTIONAL_LEGACY_UI_IDS = new Set([
  "tutorCard",
  "tutorCardTitle",
  "tutorCardMeta",
  "tutorStatus",
  "tutorDescription",
  "tutorLoadedTitle",
  "tutorLoadedMeta",
  "tutorContextPreview",
  "tutorMessages",
  "tutorEmptyState",
  "tutorAskButton",
  "tutorQuizButton",
  "tutorAnswerButton",
  "knowledgeSectionKicker",
  "knowledgeSectionTitle",
  "knowledgeMeta",
  "knowledgeFileInput",
  "chooseKnowledgeFilesButton",
  "buildKnowledgeBaseButton",
  "knowledgeFileStatus",
  "knowledgeUploadDescription",
  "ragModeSelect",
  "ragModeDescription",
  "addLatestNoteToKnowledgeButton",
  "knowledgeStatusTitle",
  "knowledgeStatusDetail",
  "knowledgeStats",
  "knowledgeStatsText",
  "clearKnowledgeBaseButton",
  "ragQuestionInput",
  "ragQuickQuestions",
  "askKnowledgeBaseButton",
  "ragAnswerTitle",
  "ragAnswerMeta",
  "ragAnswerResult",
  "ragExamFocusResult",
  "sendRagToTutorButton",
  "sendRagToStudyAgentButton",
  "makeRagExamFocusButton",
  "ragSourcesTitle",
  "ragSourcesMeta",
  "ragSourcesResult",
  "studyAgentSectionKicker",
  "studyAgentSectionTitle",
  "studyAgentMeta",
  "wrongQuestionsLabel",
  "wrongQuestionsInput",
  "examDateLabel",
  "studyHoursLabel",
  "generateStudyPlanButton",
  "studyAgentStatusTitle",
  "studyAgentStatusDetail",
  "studyPlanOverviewTitle",
  "studyPlanOverviewMeta",
  "studyPlanOverviewResult",
  "todayTasksTitle",
  "todayTasksMeta",
  "todayTasksResult",
  "dailyPlanTitle",
  "dailyPlanMeta",
  "dailyPlanResult",
  "weeklyProgressTitle",
  "weeklyProgressMeta",
  "weeklyProgressResult",
  "priorityFocusTitle",
  "priorityFocusMeta",
  "priorityFocusResult",
  "riskAlertsTitle",
  "riskAlertsMeta",
  "riskAlertsResult",
  "sprintModeTitle",
  "sprintModeMeta",
  "sprintModeResult",
  "studyAgentLoadedTitle",
  "studyAgentLoadedMeta"
]);
const BRAND_INTRO_SESSION_KEY = "smartstudy.brandIntroSeen";

function getElementByIdSafe(id, tagName = "div") {
  const element = document.getElementById(id);
  if (element) {
    return element;
  }

  const isOptionalLegacy = OPTIONAL_LEGACY_UI_IDS.has(id);
  if (!isOptionalLegacy) {
    missingElementAudit.push({ id, tagName });
    console.warn(`[SmartStudy UI Audit] Missing element #${id} <${tagName}> in index.html`);
  }

  const fallback = document.createElement(tagName);
  fallback.value = "";
  fallback.hidden = true;
  fallback.disabled = true;
  fallback.dataset.missingId = id;
  return fallback;
}

const sourceText = getElementByIdSafe("sourceText", "textarea");
const fileInput = getElementByIdSafe("fileInput", "input");
const uploadDropzone = getElementByIdSafe("uploadDropzone");
const selectedFilesList = getElementByIdSafe("selectedFilesList");
const chooseFileButton = getElementByIdSafe("chooseFileButton", "button");
const fileStatus = getElementByIdSafe("fileStatus");
const uploadHelp = getElementByIdSafe("uploadHelp");
const parseStatusTitle = getElementByIdSafe("parseStatusTitle");
const parseStatusDetail = getElementByIdSafe("parseStatusDetail");
const progressPhase = getElementByIdSafe("progressPhase");
const progressValue = getElementByIdSafe("progressValue");
const progressFill = getElementByIdSafe("progressFill");
const pdfPageStartInput = getElementByIdSafe("pdfPageStartInput", "input");
const pdfPageEndInput = getElementByIdSafe("pdfPageEndInput", "input");
const uploadPreviewBox = getElementByIdSafe("uploadPreviewBox");
const uploadPreviewTitle = getElementByIdSafe("uploadPreviewTitle");
const uploadPreviewMeta = getElementByIdSafe("uploadPreviewMeta");
const uploadPreviewList = getElementByIdSafe("uploadPreviewList");
const uploadDiagnosticsBadge = getElementByIdSafe("uploadDiagnosticsBadge");
const uploadFileCount = getElementByIdSafe("uploadFileCount");
const uploadSectionCount = getElementByIdSafe("uploadSectionCount");
const uploadOcrStatus = getElementByIdSafe("uploadOcrStatus");
const uploadDiagnosticsMessage = getElementByIdSafe("uploadDiagnosticsMessage");
const analyzeButton = getElementByIdSafe("analyzeButton", "button");
const clearButton = getElementByIdSafe("clearButton", "button");
const demoButton = getElementByIdSafe("demoButton", "button");
const refreshQuestionsButton = getElementByIdSafe("refreshQuestionsButton", "button");
const copyButton = getElementByIdSafe("copyButton", "button");
const modeSelect = getElementByIdSafe("modeSelect", "select");
const analysisEnhancement = getElementByIdSafe("analysisEnhancement", "select");
const outputLanguage = getElementByIdSafe("outputLanguage", "select");
const useKnowledgeBaseCheckbox = getElementByIdSafe("useKnowledgeBaseCheckbox", "input");
const knowledgeAssistStatus = getElementByIdSafe("knowledgeAssistStatus");
const knowledgeAssistMeta = getElementByIdSafe("knowledgeAssistMeta");
const knowledgeAssistPreviewToggle = getElementByIdSafe("knowledgeAssistPreviewToggle", "button");
const knowledgeAssistPreviewIcon = getElementByIdSafe("knowledgeAssistPreviewIcon");
const knowledgeAssistPreviewBody = getElementByIdSafe("knowledgeAssistPreviewBody");
const knowledgeAssistPreviewList = getElementByIdSafe("knowledgeAssistPreviewList");
const knowledgeAssistPreviewSubtitle = getElementByIdSafe("knowledgeAssistPreviewSubtitle");
const analysisEnhancementDescription = getElementByIdSafe("analysisEnhancementDescription");
const modeDescription = getElementByIdSafe("modeDescription");
const modeBadge = getElementByIdSafe("modeBadge");
const strategyBadge = getElementByIdSafe("strategyBadge");
const strategyDescription = getElementByIdSafe("strategyDescription");
const strategyFocus = getElementByIdSafe("strategyFocus");
const outputMeta = getElementByIdSafe("outputMeta");
const charCount = getElementByIdSafe("charCount");
const sentenceCount = getElementByIdSafe("sentenceCount");
const processState = getElementByIdSafe("processState");
const summaryResult = getElementByIdSafe("summaryResult");
const summaryCard = getElementByIdSafe("summaryCard");
const formulasResult = getElementByIdSafe("formulasResult");
const formulasCard = getElementByIdSafe("formulasCard");
const importantSentencesResult = getElementByIdSafe("importantSentencesResult");
const importantSentencesCard = getElementByIdSafe("importantSentencesCard");
const importanceReasonsResult = getElementByIdSafe("importanceReasonsResult");
const importanceReasonsCard = getElementByIdSafe("importanceReasonsCard");
const possibleExamPointsResult = getElementByIdSafe("possibleExamPointsResult");
const possibleExamPointsCard = getElementByIdSafe("possibleExamPointsCard");
const generalNotesResult = getElementByIdSafe("generalNotesResult");
const generalNotesCard = getElementByIdSafe("generalNotesCard");
const keyTermsResult = getElementByIdSafe("keyTermsResult");
const keyTermsCard = getElementByIdSafe("keyTermsCard");
const englishExplainResult = getElementByIdSafe("englishExplainResult");
const englishExplainCard = getElementByIdSafe("englishExplainCard");
const keywordsResult = getElementByIdSafe("keywordsResult");
const highlightsResult = getElementByIdSafe("highlightsResult");
const questionsResult = getElementByIdSafe("questionsResult");
const questionsCard = getElementByIdSafe("questionsCard");
const mockExamResult = getElementByIdSafe("mockExamResult");
const mockExamCard = getElementByIdSafe("mockExamCard");
const journalQuestionsResult = getElementByIdSafe("journalQuestionsResult");
const journalCard = getElementByIdSafe("journalCard");
const tutorCard = getElementByIdSafe("tutorCard");
const tutorCardTitle = getElementByIdSafe("tutorCardTitle");
const tutorCardMeta = getElementByIdSafe("tutorCardMeta");
const tutorStatus = getElementByIdSafe("tutorStatus");
const tutorDescription = getElementByIdSafe("tutorDescription");
const tutorLoadedTitle = getElementByIdSafe("tutorLoadedTitle");
const tutorLoadedMeta = getElementByIdSafe("tutorLoadedMeta");
const tutorContextPreview = getElementByIdSafe("tutorContextPreview");
const tutorMessages = getElementByIdSafe("tutorMessages");
const tutorEmptyState = getElementByIdSafe("tutorEmptyState");
const tutorInput = getElementByIdSafe("tutorInput", "textarea");
const tutorAskButton = getElementByIdSafe("tutorAskButton", "button");
const tutorQuizButton = getElementByIdSafe("tutorQuizButton", "button");
const tutorAnswerButton = getElementByIdSafe("tutorAnswerButton", "button");
const knowledgeSectionKicker = getElementByIdSafe("knowledgeSectionKicker");
const knowledgeSectionTitle = getElementByIdSafe("knowledgeSectionTitle");
const knowledgeMeta = getElementByIdSafe("knowledgeMeta");
const knowledgeFileInput = getElementByIdSafe("knowledgeFileInput", "input");
const chooseKnowledgeFilesButton = getElementByIdSafe("chooseKnowledgeFilesButton", "button");
const buildKnowledgeBaseButton = getElementByIdSafe("buildKnowledgeBaseButton", "button");
const knowledgeFileStatus = getElementByIdSafe("knowledgeFileStatus");
const knowledgeUploadDescription = getElementByIdSafe("knowledgeUploadDescription");
const ragModeSelect = getElementByIdSafe("ragModeSelect", "select");
const ragModeDescription = getElementByIdSafe("ragModeDescription");
const addLatestNoteToKnowledgeButton = getElementByIdSafe("addLatestNoteToKnowledgeButton", "button");
const knowledgeStatusTitle = getElementByIdSafe("knowledgeStatusTitle");
const knowledgeStatusDetail = getElementByIdSafe("knowledgeStatusDetail");
const knowledgeStats = getElementByIdSafe("knowledgeStats");
const knowledgeStatsText = getElementByIdSafe("knowledgeStatsText");
const clearKnowledgeBaseButton = getElementByIdSafe("clearKnowledgeBaseButton", "button");
const ragQuestionInput = getElementByIdSafe("ragQuestionInput", "textarea");
const ragQuickQuestions = getElementByIdSafe("ragQuickQuestions");
const askKnowledgeBaseButton = getElementByIdSafe("askKnowledgeBaseButton", "button");
const ragAnswerTitle = getElementByIdSafe("ragAnswerTitle");
const ragAnswerMeta = getElementByIdSafe("ragAnswerMeta");
const ragAnswerResult = getElementByIdSafe("ragAnswerResult");
const ragExamFocusResult = getElementByIdSafe("ragExamFocusResult");
const sendRagToTutorButton = getElementByIdSafe("sendRagToTutorButton", "button");
const sendRagToStudyAgentButton = getElementByIdSafe("sendRagToStudyAgentButton", "button");
const makeRagExamFocusButton = getElementByIdSafe("makeRagExamFocusButton", "button");
const ragSourcesTitle = getElementByIdSafe("ragSourcesTitle");
const ragSourcesMeta = getElementByIdSafe("ragSourcesMeta");
const ragSourcesResult = getElementByIdSafe("ragSourcesResult");
const studyAgentSectionKicker = getElementByIdSafe("studyAgentSectionKicker");
const studyAgentSectionTitle = getElementByIdSafe("studyAgentSectionTitle");
const studyAgentMeta = getElementByIdSafe("studyAgentMeta");
const wrongQuestionsLabel = getElementByIdSafe("wrongQuestionsLabel");
const wrongQuestionsInput = getElementByIdSafe("wrongQuestionsInput", "textarea");
const examDateLabel = getElementByIdSafe("examDateLabel");
const examDateInput = getElementByIdSafe("examDateInput", "input");
const studyHoursLabel = getElementByIdSafe("studyHoursLabel");
const studyHoursInput = getElementByIdSafe("studyHoursInput", "input");
const generateStudyPlanButton = getElementByIdSafe("generateStudyPlanButton", "button");
const studyAgentStatusTitle = getElementByIdSafe("studyAgentStatusTitle");
const studyAgentStatusDetail = getElementByIdSafe("studyAgentStatusDetail");
const studyPlanOverviewTitle = getElementByIdSafe("studyPlanOverviewTitle");
const studyPlanOverviewMeta = getElementByIdSafe("studyPlanOverviewMeta");
const studyPlanOverviewResult = getElementByIdSafe("studyPlanOverviewResult");
const todayTasksTitle = getElementByIdSafe("todayTasksTitle");
const todayTasksMeta = getElementByIdSafe("todayTasksMeta");
const todayTasksResult = getElementByIdSafe("todayTasksResult");
const dailyPlanTitle = getElementByIdSafe("dailyPlanTitle");
const dailyPlanMeta = getElementByIdSafe("dailyPlanMeta");
const dailyPlanResult = getElementByIdSafe("dailyPlanResult");
const weeklyProgressTitle = getElementByIdSafe("weeklyProgressTitle");
const weeklyProgressMeta = getElementByIdSafe("weeklyProgressMeta");
const weeklyProgressResult = getElementByIdSafe("weeklyProgressResult");
const priorityFocusTitle = getElementByIdSafe("priorityFocusTitle");
const priorityFocusMeta = getElementByIdSafe("priorityFocusMeta");
const priorityFocusResult = getElementByIdSafe("priorityFocusResult");
const riskAlertsTitle = getElementByIdSafe("riskAlertsTitle");
const riskAlertsMeta = getElementByIdSafe("riskAlertsMeta");
const riskAlertsResult = getElementByIdSafe("riskAlertsResult");
const sprintModeTitle = getElementByIdSafe("sprintModeTitle");
const sprintModeMeta = getElementByIdSafe("sprintModeMeta");
const sprintModeResult = getElementByIdSafe("sprintModeResult");
const resultTimestamp = getElementByIdSafe("resultTimestamp");
const historyList = getElementByIdSafe("historyList");
const clearHistoryButton = getElementByIdSafe("clearHistoryButton", "button");
const sourceTextLabel = getElementByIdSafe("sourceTextLabel");
const charCountLabel = getElementByIdSafe("charCountLabel");
const sentenceCountLabel = getElementByIdSafe("sentenceCountLabel");
const processStateLabel = getElementByIdSafe("processStateLabel");
const resultSectionKicker = getElementByIdSafe("resultSectionKicker");
const resultSectionTitle = getElementByIdSafe("resultSectionTitle");
const resultLanguageTitle = getElementByIdSafe("resultLanguageTitle");
const resultLanguageDescription = getElementByIdSafe("resultLanguageDescription");
const resultLanguageTag = getElementByIdSafe("resultLanguageTag", "button");
const summaryCardTitle = getElementByIdSafe("summaryCardTitle");
const formulasCardTitle = getElementByIdSafe("formulasCardTitle");
const formulasCardMeta = getElementByIdSafe("formulasCardMeta");
const importantSentencesCardTitle = getElementByIdSafe("importantSentencesCardTitle");
const importantSentencesCardMeta = getElementByIdSafe("importantSentencesCardMeta");
const importanceReasonsCardTitle = getElementByIdSafe("importanceReasonsCardTitle");
const importanceReasonsCardMeta = getElementByIdSafe("importanceReasonsCardMeta");
const generalNotesCardTitle = getElementByIdSafe("generalNotesCardTitle");
const generalNotesCardMeta = getElementByIdSafe("generalNotesCardMeta");
const possibleExamPointsCardTitle = getElementByIdSafe("possibleExamPointsCardTitle");
const possibleExamPointsCardMeta = getElementByIdSafe("possibleExamPointsCardMeta");
const keyTermsCardTitle = getElementByIdSafe("keyTermsCardTitle");
const keyTermsCardMeta = getElementByIdSafe("keyTermsCardMeta");
const englishExplainCardTitle = getElementByIdSafe("englishExplainCardTitle");
const englishExplainCardMeta = getElementByIdSafe("englishExplainCardMeta");
const questionsCardTitle = getElementByIdSafe("questionsCardTitle");
const questionsCardMeta = getElementByIdSafe("questionsCardMeta");
const mockExamCardTitle = getElementByIdSafe("mockExamCardTitle");
const mockExamCardMeta = getElementByIdSafe("mockExamCardMeta");
const journalCardTitle = getElementByIdSafe("journalCardTitle");
const journalCardMeta = getElementByIdSafe("journalCardMeta");
const historyTitle = getElementByIdSafe("historyTitle");
const historyDescription = getElementByIdSafe("historyDescription");
const historyToggleText = getElementByIdSafe("historyToggleText");
const nextStepPanel = getElementByIdSafe("nextStepPanel");
const studyAgentLoadedTitle = getElementByIdSafe("studyAgentLoadedTitle");
const studyAgentLoadedMeta = getElementByIdSafe("studyAgentLoadedMeta");
const focusSpotifyStateTitle = getElementByIdSafe("focusSpotifyStateTitle");
const focusSpotifyPremiumBadge = getElementByIdSafe("focusSpotifyPremiumBadge");
const focusSpotifyStatus = getElementByIdSafe("focusSpotifyStatus");
const focusSpotifyConnectButton = getElementByIdSafe("focusSpotifyConnectButton", "button");
const focusSpotifyReconnectButton = getElementByIdSafe("focusSpotifyReconnectButton", "button");
const focusSpotifyDisconnectButton = getElementByIdSafe("focusSpotifyDisconnectButton", "button");
const focusSpotifyNowPlaying = getElementByIdSafe("focusSpotifyNowPlaying");
const focusSpotifyCover = getElementByIdSafe("focusSpotifyCover", "img");
const focusSpotifyTrackName = getElementByIdSafe("focusSpotifyTrackName");
const focusSpotifyArtistName = getElementByIdSafe("focusSpotifyArtistName");
const focusSpotifyProgressWrap = getElementByIdSafe("focusSpotifyProgressWrap");
const focusSpotifyProgressCurrent = getElementByIdSafe("focusSpotifyProgressCurrent");
const focusSpotifyProgressTotal = getElementByIdSafe("focusSpotifyProgressTotal");
const focusSpotifyProgressFill = getElementByIdSafe("focusSpotifyProgressFill");
const focusSpotifyControls = getElementByIdSafe("focusSpotifyControls");
const spotifyPreviousButton = getElementByIdSafe("spotifyPreviousButton", "button");
const spotifyPlayButton = getElementByIdSafe("spotifyPlayButton", "button");
const spotifyNextButton = getElementByIdSafe("spotifyNextButton", "button");
const spotifyVolumeInput = getElementByIdSafe("spotifyVolumeInput", "input");
const focusSpotifyLockActions = getElementByIdSafe("focusSpotifyLockActions");
const focusSpotifyLockButton = getElementByIdSafe("focusSpotifyLockButton", "button");
const focusSpotifyReturnLockedButton = getElementByIdSafe("focusSpotifyReturnLockedButton", "button");
const focusSpotifyLockStatus = getElementByIdSafe("focusSpotifyLockStatus");
const focusMusicPlayer = getElementByIdSafe("focusMusicPlayer");
const toggleCollapsePlayer = getElementByIdSafe("toggleCollapsePlayer", "button");
const prevTrackBtn = getElementByIdSafe("prevTrackBtn", "button");
const currentTrackLabel = getElementByIdSafe("currentTrackLabel");
const nextTrackBtn = getElementByIdSafe("nextTrackBtn", "button");
const openTrackMenuBtn = getElementByIdSafe("openTrackMenuBtn", "button");
const volumeControl = getElementByIdSafe("volumeControl", "input");
const playPauseBtn = getElementByIdSafe("playPauseBtn", "button");
const spotifyBtn = getElementByIdSafe("spotifyBtn", "button");
const trackMenu = getElementByIdSafe("trackMenu");
const spotifyPanel = getElementByIdSafe("spotifyPanel");
const closeSpotifyPanelBtn = getElementByIdSafe("closeSpotifyPanelBtn", "button");
const homeSnapshotNotes = getElementByIdSafe("homeSnapshotNotes");
const homeSnapshotTasks = getElementByIdSafe("homeSnapshotTasks");
const homeSnapshotKnowledge = getElementByIdSafe("homeSnapshotKnowledge");
const homeSnapshotFocus = getElementByIdSafe("homeSnapshotFocus");
const brandIntro = getElementByIdSafe("brandIntro");
const notesResultStatus = getElementByIdSafe("notesResultStatus");
const resultOverviewSummary = getElementByIdSafe("resultOverviewSummary");
const resultOverviewKeyPoint = getElementByIdSafe("resultOverviewKeyPoint");
const resultOverviewQuestion = getElementByIdSafe("resultOverviewQuestion");
const sendSummaryToTutorBtn = getElementByIdSafe("sendSummaryToTutorBtn", "button");
const sendKeyPointToTutorBtn = getElementByIdSafe("sendKeyPointToTutorBtn", "button");
const notesAccordionList = getElementByIdSafe("notesAccordionList");
const notesExportTrigger = getElementByIdSafe("notesExportTrigger", "button");
const currentTutorSourceTitle = getElementByIdSafe("currentTutorSourceTitle");
const currentTutorSourceMeta = getElementByIdSafe("currentTutorSourceMeta");
const tutorContextHelperText = getElementByIdSafe("tutorContextHelperText");
const tutorModeBadge = getElementByIdSafe("tutorModeBadge");
const tutorModeDescription = getElementByIdSafe("tutorModeDescription");
const chooseTutorSourceBtn = getElementByIdSafe("chooseTutorSourceBtn", "button");
const clearTutorSourceBtn = getElementByIdSafe("clearTutorSourceBtn", "button");
const refreshQuestionsBtn = getElementByIdSafe("refreshQuestionsBtn", "button");
const recommendedQuestions = getElementByIdSafe("recommendedQuestions");
const chatMessages = getElementByIdSafe("chatMessages");
const sendTutorMessage = getElementByIdSafe("sendTutorMessage", "button");
const knowledgeSearchInput = getElementByIdSafe("knowledgeSearchInput", "input");
const knowledgeSearchBtn = getElementByIdSafe("knowledgeSearchBtn", "button");
const seedKnowledgeBaseButton = getElementByIdSafe("seedKnowledgeBaseButton", "button");
const knowledgeSummaryFiles = getElementByIdSafe("knowledgeSummaryFiles");
const knowledgeSummaryChunks = getElementByIdSafe("knowledgeSummaryChunks");
const knowledgeSummarySubjects = getElementByIdSafe("knowledgeSummarySubjects");
const knowledgeSummaryTopTopicsText = getElementByIdSafe("knowledgeSummaryTopTopicsText");
const knowledgeInsightTitle = getElementByIdSafe("knowledgeInsightTitle");
const knowledgeInsightMeta = getElementByIdSafe("knowledgeInsightMeta");
const knowledgeActiveQuery = getElementByIdSafe("knowledgeActiveQuery");
const knowledgeStructureCount = getElementByIdSafe("knowledgeStructureCount");
const knowledgeStructureList = getElementByIdSafe("knowledgeStructureList");
const knowledgeSubjectFilter = getElementByIdSafe("knowledgeSubjectFilter", "select");
const knowledgeChapterFilter = getElementByIdSafe("knowledgeChapterFilter", "select");
const knowledgeTagFilter = getElementByIdSafe("knowledgeTagFilter", "select");
const knowledgeTypeFilter = getElementByIdSafe("knowledgeTypeFilter", "select");
const resetKnowledgeFiltersBtn = getElementByIdSafe("resetKnowledgeFiltersBtn", "button");
const knowledgeResultCount = getElementByIdSafe("knowledgeResultCount");
const knowledgeResults = getElementByIdSafe("knowledgeResults");
const knowledgePreviewType = getElementByIdSafe("knowledgePreviewType");
const knowledgePreviewSubject = getElementByIdSafe("knowledgePreviewSubject");
const knowledgePreviewTitle = getElementByIdSafe("knowledgePreviewTitle");
const knowledgePreviewMeta = getElementByIdSafe("knowledgePreviewMeta");
const knowledgePreviewTags = getElementByIdSafe("knowledgePreviewTags");
const knowledgePreviewSummary = getElementByIdSafe("knowledgePreviewSummary");
const knowledgePreviewKeyPoints = getElementByIdSafe("knowledgePreviewKeyPoints");
const knowledgePreviewQuestion = getElementByIdSafe("knowledgePreviewQuestion");
const knowledgePreviewTutorBtn = getElementByIdSafe("knowledgePreviewTutorBtn", "button");
const knowledgePreviewTaskBtn = getElementByIdSafe("knowledgePreviewTaskBtn", "button");
const knowledgePreviewExportBtn = getElementByIdSafe("knowledgePreviewExportBtn", "button");
const examScopeInput = getElementByIdSafe("examScopeInput", "input");
const plannerNoteSelect = getElementByIdSafe("plannerNoteSelect", "select");
const generateStudyPlanBtn = getElementByIdSafe("generateStudyPlanBtn", "button");
const clearPlannerFormBtn = getElementByIdSafe("clearPlannerFormBtn", "button");
const plannerInsightToday = getElementByIdSafe("plannerInsightToday");
const plannerInsightWeek = getElementByIdSafe("plannerInsightWeek");
const plannerInsightDone = getElementByIdSafe("plannerInsightDone");
const plannerInsightFocus = getElementByIdSafe("plannerInsightFocus");
const myNotesSearch = getElementByIdSafe("myNotesSearch", "input");
const myNotesSubjectFilter = getElementByIdSafe("myNotesSubjectFilter", "select");
const myNotesSort = getElementByIdSafe("myNotesSort", "select");
const myNotesTypeFilter = getElementByIdSafe("myNotesTypeFilter", "select");
const myNotesGrid = getElementByIdSafe("myNotesGrid");
const myNotesTotalCount = getElementByIdSafe("myNotesTotalCount");
const myNotesLatestDate = getElementByIdSafe("myNotesLatestDate");
const myNotesFilteredCount = getElementByIdSafe("myNotesFilteredCount");
const myNotesInsightTitle = getElementByIdSafe("myNotesInsightTitle");
const myNotesInsightMeta = getElementByIdSafe("myNotesInsightMeta");
const myNotesInsightSubjects = getElementByIdSafe("myNotesInsightSubjects");
const exportModal = getElementByIdSafe("exportModal");
const exportModalBackdrop = getElementByIdSafe("exportModalBackdrop");
const closeExportModalButton = getElementByIdSafe("closeExportModal", "button");
const exportFormat = getElementByIdSafe("exportFormat", "select");
const exportTemplate = getElementByIdSafe("exportTemplate", "select");
const exportPreviewText = getElementByIdSafe("exportPreviewText");
const exportTemplateHint = getElementByIdSafe("exportTemplateHint");
const cancelExportBtn = getElementByIdSafe("cancelExportBtn", "button");
const startExportBtn = getElementByIdSafe("startExportBtn", "button");
const toastStack = getElementByIdSafe("toastStack");
const guideModal = getElementByIdSafe("guideModal");
const guideModalBackdrop = getElementByIdSafe("guideModalBackdrop");
const openGuideModalButton = getElementByIdSafe("openGuideModalButton", "button");
const closeGuideModalButton = getElementByIdSafe("closeGuideModal", "button");
const guideModalCloseAction = getElementByIdSafe("guideModalCloseAction", "button");
const guideModalGoNotes = getElementByIdSafe("guideModalGoNotes", "button");
const homeLatestNoteTitle = getElementByIdSafe("homeLatestNoteTitle");
const homeLatestNoteMeta = getElementByIdSafe("homeLatestNoteMeta");
const homeNextActionTitle = getElementByIdSafe("homeNextActionTitle");
const homeNextActionMeta = getElementByIdSafe("homeNextActionMeta");

const pdfjsLib = globalThis.pdfjsLib;
if (pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

const demoText = "人工智慧是透過演算法與資料，讓電腦模擬人類學習、推理與判斷能力的技術。近年來，人工智慧已經被應用在教育、醫療、交通與金融等領域。在教育方面，人工智慧可以分析學生的學習狀況，提供個人化學習建議，也能協助教師整理教材與設計評量。雖然人工智慧提升了效率，但也帶來資料隱私、錯誤判斷與倫理責任等問題。因此，在使用人工智慧時，除了重視便利性，也必須思考安全性、公平性與人類監督的重要性。";

const modeConfigs = {
  exam: {
    label: "考試複習模式",
    description: "聚焦重點整理與複習提問，適合考前快速統整與背誦。",
    summaryCount: 5,
    summaryMin: 4,
    highlightCount: 9,
    criticalCount: 4,
    keywordCount: 8,
    questionCount: 5,
    highlightStyle: "explain"
  },
  report: {
    label: "報告整理模式",
    description: "偏重主題歸納與段落組織，適合整理報告架構與發表內容。",
    summaryCount: 4,
    summaryMin: 3,
    highlightCount: 6,
    criticalCount: 3,
    keywordCount: 6,
    questionCount: 4,
    highlightStyle: "explain"
  },
  simple: {
    label: "精簡重點模式",
    description: "提供較精簡的重點整理結果，適合快速瀏覽與初步理解內容。",
    summaryCount: 3,
    summaryMin: 2,
    highlightCount: 4,
    criticalCount: 3,
    keywordCount: 5,
    questionCount: 3,
    highlightStyle: "explain"
  }
};

const enhancementConfigs = {
  local: {
    label: "智慧規則分析",
    description: "使用本機規則、關鍵字權重與主題詞彙庫進行整理，不需呼叫外部 API。"
  },
  "future-ai": {
    label: "進階 AI 模式",
    description: "透過後端安全串接 OpenAI API，產生更完整的摘要、重點、名詞與練習。若 API 無法使用，會自動改回智慧規則分析。"
  }
};

const uiTranslations = {
  zh: {
    sourceTextLabel: "或直接貼上筆記 / 文章內容",
    sourceTextPlaceholder: "例如：輸入上課筆記、文章段落、考試範圍整理內容...",
    analyzeButton: "開始整理筆記",
    clearButton: "清空內容",
    copyButton: "複製結果",
    downloadButton: "匯出",
    refreshQuestionsButton: "更新題目",
    clearHistoryButton: "清空歷史",
    charCountLabel: "字數",
    sentenceCountLabel: "句子數",
    processStateLabel: "狀態",
    resultSectionKicker: "步驟二",
    resultSectionTitle: "整理結果",
    knowledgeSectionKicker: "步驟三",
    knowledgeSectionTitle: "RAG AI 知識庫",
    knowledgeMeta: "可上傳 TXT、DOCX、PPTX、PDF 等文件，系統會在前端抽字、切段落並建立可查詢知識庫。",
    knowledgeUploadDescription: "可一次選擇多份文件，系統會在這個瀏覽器中抽取文字並建立前端展示版知識庫。",
    ragModeLocal: "展示模式：前端關鍵字 RAG",
    ragModeAdvanced: "進階模式：OpenAI Embedding RAG",
    ragModeDescriptionLocal: "展示模式可直接在 GitHub Pages 使用；進階模式會透過後端建立 embedding 向量索引。",
    ragModeDescriptionAdvanced: "進階模式會透過後端建立 OpenAI embedding 向量索引；若失敗會自動退回展示模式。",
    chooseKnowledgeFilesButton: "選擇多個檔案",
    buildKnowledgeBaseButton: "建立知識庫",
    askKnowledgeBaseButton: "查詢知識庫",
    knowledgeFileStatusEmpty: "尚未選擇知識庫檔案",
    knowledgeStatusTitle: "知識庫尚未建立",
    knowledgeStatusDetail: "建立完成後，你可以直接對整個知識庫提問，系統會顯示來源檔案、段落與引用內容。",
    ragQuestionPlaceholder: "例如：這些文件對於財務報表分析最常強調哪些重點？",
    ragAnswerTitle: "知識庫回答",
    ragAnswerMeta: "含來源引用",
    ragAnswerEmpty: "尚未查詢知識庫。",
    ragSourcesTitle: "引用來源",
    ragSourcesMeta: "來源文件 / 頁碼 / 段落",
    ragSourcesEmpty: "尚未顯示來源。",
    studyAgentSectionKicker: "步驟四",
    studyAgentSectionTitle: "AI Study Agent",
    studyAgentMeta: "根據目前筆記、錯題、考試日期與每日可讀書時間，自動生成可調整的讀書計畫。",
    wrongQuestionsLabel: "錯題 / 容易卡住的觀念",
    wrongQuestionsPlaceholder: "例如：這兩個概念常常搞混、公式容易寫錯、關鍵定義記不住",
    examDateLabel: "考試日期",
    studyHoursLabel: "每日可讀書時間（小時）",
    generateStudyPlanButton: "生成讀書計畫",
    studyAgentStatusTitle: "尚未生成讀書計畫",
    studyAgentStatusDetail: "先整理筆記，再填入錯題、考試日期與可讀書時間，AI 才能幫你排出更合理的每日計畫。",
    studyPlanOverviewTitle: "讀書計畫總覽",
    studyPlanOverviewMeta: "自動調整重點",
    studyPlanOverviewEmpty: "尚未生成讀書計畫。",
    todayTasksTitle: "今日任務",
    todayTasksMeta: "今天先做什麼",
    todayTasksEmpty: "尚未生成今日任務。",
    dailyPlanTitle: "每日讀書計畫",
    dailyPlanMeta: "逐日安排",
    dailyPlanEmpty: "尚未生成每日讀書計畫。",
    weeklyProgressTitle: "本週進度",
    weeklyProgressMeta: "本週追蹤",
    weeklyProgressEmpty: "尚未生成本週進度。",
    priorityFocusTitle: "優先順序",
    priorityFocusMeta: "科目 / 章節",
    priorityFocusEmpty: "尚未生成優先順序。",
    riskAlertsTitle: "風險提醒",
    riskAlertsMeta: "快忘了 / 高風險",
    riskAlertsEmpty: "尚未產生風險提醒。",
    sprintModeTitle: "考前衝刺模式",
    sprintModeMeta: "考前切換",
    sprintModeEmpty: "尚未產生考前衝刺建議。",
    resultLanguageTitle: "中文結果",
    resultLanguageDescription: "中文直接整理；英文會先翻譯再整理。",
    languageToggleTarget: "English",
    languageToggleAria: "切換結果語言為英文",
    summaryCardTitle: "智慧摘要",
    formulasCardTitle: "公式 / 結構",
    formulasCardMeta: "重點整理",
    importantSentencesCardTitle: "重要句子",
    importantSentencesCardMeta: "優先閱讀",
    importanceReasonsCardTitle: "重要度原因",
    importanceReasonsCardMeta: "重點原因",
    generalNotesCardTitle: "一般整理",
    generalNotesCardMeta: "段落整理",
    possibleExamPointsCardTitle: "可能重點",
    possibleExamPointsCardMeta: "快速提醒",
    keyTermsCardTitle: "關鍵詞 / 重要概念",
    keyTermsCardMeta: "概念說明",
    englishExplainCardTitle: "原文句子解釋",
    englishExplainCardMeta: "對照理解",
    questionsCardTitle: "理解問題",
    questionsCardMeta: "快速思考",
    mockExamCardTitle: "延伸練習",
    mockExamCardMeta: "延伸思考",
    journalCardTitle: "專門題型",
    journalCardMeta: "僅在特定領域內容出現時顯示",
    tutorCardTitle: "AI Tutor",
    tutorCardMeta: "根據目前整理內容進行教學問答。",
    tutorDescription: "你可以直接提問，也可以請老師出題；若答錯，AI 會指出錯在哪、重新解釋，並再出一題類似題。",
    tutorInputPlaceholder: "例如：這段內容的核心概念是什麼？",
    tutorAskButton: "送出提問",
    tutorQuizButton: "老師出題",
    tutorAnswerButton: "送出答案",
    tutorEmpty: "尚未開始 AI Tutor 對話。",
    tutorStatusNeedAnalysis: "請先整理內容後再開始。",
    tutorStatusReady: "可以開始提問，或請老師直接出題。",
    tutorStatusLoading: "AI Tutor 思考中",
    tutorStatusPendingPrefix: "待回答：",
    tutorWelcome: "我是 AI Tutor。接下來我會根據目前這份筆記，用老師帶你理解的方式回答問題。你可以直接提問，或按「老師出題」開始練習。",
    tutorTeacherLabel: "老師",
    tutorStudentLabel: "你",
    tutorQuestionBadge: "老師題目",
    tutorAnswerBadge: "你的答案",
    tutorMistakePrefix: "你剛剛錯在：",
    tutorRetryPrefix: "再試一題：",
    historyTitle: "歷史紀錄",
    historyDescription: "保留最近幾次整理結果，可以快速回看或載回步驟一重新編修。",
    historyToggleText: "展開歷史紀錄",
    showAnswer: "顯示答案",
    hideAnswer: "隱藏答案",
    historyEmpty: "尚未有歷史紀錄。",
    restoreHistory: "載入這筆",
    deleteHistory: "刪除",
    manualSource: "來源：手動輸入或示範文字",
    sourcePrefix: "來源：",
    notReady: "尚未整理",
    outputMetaIntro: "依「{mode}」產生摘要、重點、概念整理與延伸練習。分析方式：{enhancement}。",
    outputMetaKnowledge: " 內建 {glossaryCount} 筆概念詞彙與 {financeCount} 筆知識規則可作為補充參考。",
    outputMetaJournal: " 若內容屬於特定專業領域，系統會補充對應的專門練習。",
    outputMetaSource: " 目前來源為 {fileName}。",
    emptySummary: "尚未產生摘要。",
    emptyFormulas: "尚未產生關鍵結構或整理架構。",
    emptyImportantSentences: "尚未產生重要句子。",
    emptyImportanceReasons: "尚未產生重要度原因。",
    emptyGeneralNotes: "尚未產生一般整理。",
    emptyPossibleExamPoints: "尚未產生可能重點。",
    emptyAccountingTerms: "尚未整理出關鍵詞或重要概念。",
    emptyEnglishExplain: "尚未產生原文句子解釋。",
    emptyQuestions: "尚未產生理解問題。",
    emptyMockExam: "尚未產生延伸練習。",
    emptyJournal: "目前沒有需要額外顯示的專門題型。",
    highlightBadge: "重點"
  },
  en: {
    sourceTextLabel: "Or paste your notes / article content",
    sourceTextPlaceholder: "Example: class notes, article paragraphs, or exam scope summaries...",
    analyzeButton: "Analyze Notes",
    clearButton: "Clear",
    copyButton: "Copy Result",
    downloadButton: "Export",
    refreshQuestionsButton: "Refresh Questions",
    clearHistoryButton: "Clear History",
    charCountLabel: "Characters",
    sentenceCountLabel: "Sentences",
    processStateLabel: "Status",
    resultSectionKicker: "Step 2",
    resultSectionTitle: "Results",
    knowledgeSectionKicker: "Step 3",
    knowledgeSectionTitle: "RAG Knowledge Base",
    knowledgeMeta: "Upload TXT, DOCX, PPTX, PDF, and other supported files to build a front-end searchable knowledge base in this browser.",
    knowledgeUploadDescription: "Select multiple files at once. The browser extracts text, chunks it locally, and keeps the demo knowledge base in localStorage.",
    ragModeLocal: "Demo Mode: Front-end Keyword RAG",
    ragModeAdvanced: "Advanced Mode: OpenAI Embedding RAG",
    ragModeDescriptionLocal: "Demo mode works on GitHub Pages; advanced mode builds embedding-based vector indexes through the backend.",
    ragModeDescriptionAdvanced: "Advanced mode uses the backend to build OpenAI embeddings and vector indexes. If it fails, the app falls back to demo mode automatically.",
    chooseKnowledgeFilesButton: "Choose Files",
    buildKnowledgeBaseButton: "Build Knowledge Base",
    askKnowledgeBaseButton: "Ask Knowledge Base",
    knowledgeFileStatusEmpty: "No knowledge-base files selected",
    knowledgeStatusTitle: "Knowledge base not built yet",
    knowledgeStatusDetail: "After indexing, you can ask questions across the full knowledge base and see the source file, paragraph, and quoted passage.",
    ragQuestionPlaceholder: "Example: What ideas do these files emphasize most about financial statement analysis?",
    ragAnswerTitle: "Knowledge Base Answer",
    ragAnswerMeta: "With source citations",
    ragAnswerEmpty: "No knowledge-base answer yet.",
    ragSourcesTitle: "Cited Sources",
    ragSourcesMeta: "File / page / quoted passage",
    ragSourcesEmpty: "No sources shown yet.",
    studyAgentSectionKicker: "Step 4",
    studyAgentSectionTitle: "AI Study Agent",
    studyAgentMeta: "Generate an adaptive study plan from the current notes, missed questions, exam date, and available study time.",
    wrongQuestionsLabel: "Missed Questions / Fragile Concepts",
    wrongQuestionsPlaceholder: "Example: I keep mixing up current ratio and quick ratio, and I often write the EPS formula incorrectly.",
    examDateLabel: "Exam Date",
    studyHoursLabel: "Available Study Hours Per Day",
    generateStudyPlanButton: "Generate Study Plan",
    studyAgentStatusTitle: "No study plan yet",
    studyAgentStatusDetail: "Analyze notes first, then provide missed questions, the exam date, and daily study time so the AI can build a better plan.",
    studyPlanOverviewTitle: "Study Plan Overview",
    studyPlanOverviewMeta: "Adaptive focus",
    studyPlanOverviewEmpty: "No study plan yet.",
    todayTasksTitle: "Today's Tasks",
    todayTasksMeta: "Start here today",
    todayTasksEmpty: "No tasks for today yet.",
    dailyPlanTitle: "Daily Study Plan",
    dailyPlanMeta: "Day-by-day schedule",
    dailyPlanEmpty: "No daily study plan yet.",
    weeklyProgressTitle: "Weekly Progress",
    weeklyProgressMeta: "This week",
    weeklyProgressEmpty: "No weekly progress yet.",
    priorityFocusTitle: "Priority Focus",
    priorityFocusMeta: "Subjects / chapters",
    priorityFocusEmpty: "No priority focus yet.",
    riskAlertsTitle: "Risk Alerts",
    riskAlertsMeta: "Forgetting / highest risk",
    riskAlertsEmpty: "No risk alerts yet.",
    sprintModeTitle: "Sprint Mode",
    sprintModeMeta: "Before the exam",
    sprintModeEmpty: "No sprint-mode suggestion yet.",
    resultLanguageTitle: "English View",
    resultLanguageDescription: "Chinese is processed directly. English is translated first.",
    languageToggleTarget: "中文",
    languageToggleAria: "Switch result language to Chinese",
    summaryCardTitle: "Smart Summary",
    formulasCardTitle: "Formulas / Structure",
    formulasCardMeta: "Key points",
    importantSentencesCardTitle: "Important Sentences",
    importantSentencesCardMeta: "Read first",
    importanceReasonsCardTitle: "Why It Matters",
    importanceReasonsCardMeta: "Why it matters",
    generalNotesCardTitle: "General Notes",
    generalNotesCardMeta: "Notes",
    possibleExamPointsCardTitle: "Possible Key Points",
    possibleExamPointsCardMeta: "Quick reminders",
    keyTermsCardTitle: "Key Terms / Important Concepts",
    keyTermsCardMeta: "Concept Notes",
    englishExplainCardTitle: "Original Sentence Explanation",
    englishExplainCardMeta: "Side-by-side view",
    questionsCardTitle: "Questions",
    questionsCardMeta: "Quick thinking",
    mockExamCardTitle: "Extended Practice",
    mockExamCardMeta: "Applied review",
    journalCardTitle: "Specialized Questions",
    journalCardMeta: "Shown only for domain-specific material",
    tutorCardTitle: "AI Tutor",
    tutorCardMeta: "Ask questions about the current notes and learn in a teacher-style conversation.",
    tutorDescription: "You can ask directly or let the tutor quiz you. If your answer is wrong, the tutor points out the mistake, reteaches it, and gives you a similar question.",
    tutorInputPlaceholder: "Example: What is the core concept of this content?",
    tutorAskButton: "Ask Tutor",
    tutorQuizButton: "Give Me a Quiz",
    tutorAnswerButton: "Submit Answer",
    tutorEmpty: "No AI Tutor conversation yet.",
    tutorStatusNeedAnalysis: "Analyze the content first to start tutoring.",
    tutorStatusReady: "Ask a question or let the tutor give you one.",
    tutorStatusLoading: "AI Tutor is thinking",
    tutorStatusPendingPrefix: "Pending question: ",
    tutorWelcome: "I am your AI Tutor. I will answer based on the current notes in a teacher-like way. You can ask directly or press \"Give Me a Quiz\" to start practicing.",
    tutorTeacherLabel: "Tutor",
    tutorStudentLabel: "You",
    tutorQuestionBadge: "Tutor Question",
    tutorAnswerBadge: "Your Answer",
    tutorMistakePrefix: "What you missed:",
    tutorRetryPrefix: "Try a similar one:",
    historyTitle: "History",
    historyDescription: "Keep recent analysis results so you can quickly review them or load them back into step one for editing.",
    historyToggleText: "Show history",
    showAnswer: "Show Answer",
    hideAnswer: "Hide Answer",
    historyEmpty: "No history yet.",
    restoreHistory: "Load",
    deleteHistory: "Delete",
    manualSource: "Source: manual input or demo text",
    sourcePrefix: "Source: ",
    notReady: "Not analyzed yet",
    outputMetaIntro: 'The current mode "{mode}" builds a focused view with a smart summary, key structure, concept notes, questions, and practice. If the source contains English, the system still analyzes it with the built-in front-end pipeline. Analysis mode: {enhancement}.',
    outputMetaKnowledge: " The system currently includes {glossaryCount} concept glossary entries and {financeCount} domain knowledge rules for support.",
    outputMetaJournal: " Domain-specific material may also trigger specialized practice content.",
    outputMetaSource: " Current source: {fileName}.",
    emptySummary: "No summary yet.",
    emptyFormulas: "No key structure or framework notes yet.",
    emptyImportantSentences: "No important sentences yet.",
    emptyImportanceReasons: "No importance reasons yet.",
    emptyGeneralNotes: "No general notes yet.",
    emptyPossibleExamPoints: "No possible key points yet.",
    emptyAccountingTerms: "No key terms or important concepts detected yet.",
    emptyEnglishExplain: "No English explanation yet.",
    emptyQuestions: "No questions yet.",
    emptyMockExam: "No extended practice yet.",
    emptyJournal: "No domain-specific practice is needed for this material.",
    highlightBadge: "Key"
  }
};

const rawFinanceKnowledgeBase = Array.isArray(globalThis.financeKnowledgeBase)
  ? globalThis.financeKnowledgeBase
  : [];
const accountingFormulaKnowledgeBase = Array.isArray(globalThis.accountingFormulaKnowledgeBase)
  ? globalThis.accountingFormulaKnowledgeBase
  : [];
const journalEntryKnowledgeBase = Array.isArray(globalThis.journalEntryKnowledgeBase)
  ? globalThis.journalEntryKnowledgeBase
  : [];

const stopWords = new Set([
  "我們", "你們", "他們", "以及", "可以", "如果", "因為", "所以", "而且",
  "但是", "就是", "這些", "那些", "一個", "很多", "沒有", "需要", "已經",
  "進行", "透過", "使用", "相關", "內容", "資料", "學生", "老師", "自己",
  "例如", "一些", "這個", "那個", "並且", "更加", "可能", "其中", "主要",
  "非常", "用來", "問題", "重要", "影響", "提升", "幫助", "系統", "功能",
  "進一步", "以及", "我們的", "他的", "她的", "它的", "是否", "為了", "並非",
  "此次", "這份", "本文", "本篇", "內容中", "進而", "可以說", "以及其", "the",
  "and", "with", "from", "that", "this", "into", "about", "have", "will",
  "your", "their", "they", "them", "were", "been", "being", "also"
]);

const weakChineseTerms = new Set([
  "我們", "你們", "他們", "這些", "那些", "一個", "很多", "沒有", "需要", "相關",
  "內容", "一些", "這個", "那個", "其中", "主要", "非常", "用來", "重要", "功能",
  "問題", "幫助", "影響", "資料", "方式", "例如", "以及", "因為", "所以", "但是"
]);

const directTextExtensions = new Set(["txt", "md", "csv", "json", "rtf", "html", "htm", "xml"]);
const structuredExtensions = new Set(["pptx", "docx", "pdf"]);
const legacyExtensions = new Set(["ppt", "doc"]);

let lastSourceMeta = null;
let lastSourceSections = [];
let isParsingFile = false;
let ocrWorkerPromise = null;
let currentAnalysisResult = null;
let questionRefreshCounter = 0;
let isTutorLoading = false;
let tutorConversation = [];
let tutorPendingQuestion = null;
let tutorSourceId = "";
let ragSelectedFiles = [];
let selectedKnowledgeFiles = [];
let isKnowledgeIndexing = false;
let isKnowledgeQuerying = false;
let isStudyAgentLoading = false;
let currentStudyPlan = null;
let apiHealthCache = null;
let currentRagAnswerPayload = null;
let currentRagTutorContext = null;
let currentRagStudyAgentContext = null;
let currentKnowledgePreviewId = "";

const STORAGE_KEYS = {
  notes: "smartstudy_notes",
  myNotes: "smartstudy_my_notes",
  knowledge: "smartstudy_knowledge",
  tasks: "smartstudy_tasks",
  planner: "smartstudy_planner",
  language: "smartstudy_language",
  theme: "smartstudy_theme",
  music: "smartstudy_music",
  tutorSource: "smartstudy_tutor_source",
  history: "smartstudy-analysis-history",
  latestResult: "smartstudy_latest_result",
  latestAnalysis: "smartstudy-latest-analysis",
  knowledgeChunks: "smartstudy_knowledge_chunks",
  knowledgeSeedVersion: "smartstudy_knowledge_seed_version",
  ragMode: "smartstudy-rag-mode",
  musicExpanded: "smartstudy.focusMusic.expanded"
};
const IS_STATIC_PAGES_MODE = Boolean(
  globalThis.location && (
    globalThis.location.protocol === "file:" ||
    /github\.io$/i.test(globalThis.location.hostname || "")
  )
);

const HISTORY_STORAGE_KEY = STORAGE_KEYS.history;
const HISTORY_LIMIT = 8;
const ANALYSIS_ENHANCEMENT_STORAGE_KEY = "smartstudy-analysis-enhancement";
const DISPLAY_LANGUAGE_STORAGE_KEY = STORAGE_KEYS.language;
const SMARTSTUDY_LATEST_RESULT_KEY = STORAGE_KEYS.latestResult;
const LATEST_ANALYSIS_STORAGE_KEY = STORAGE_KEYS.latestAnalysis;
const KNOWLEDGE_CHUNKS_KEY = STORAGE_KEYS.knowledgeChunks;
const LOCAL_RAG_STORAGE_KEY = STORAGE_KEYS.knowledge;
const KNOWLEDGE_SEED_VERSION_KEY = STORAGE_KEYS.knowledgeSeedVersion;
const RAG_MODE_STORAGE_KEY = STORAGE_KEYS.ragMode;
const RAG_TO_TUTOR_STORAGE_KEY = "smartstudy-rag-to-tutor";
const RAG_TO_STUDY_AGENT_STORAGE_KEY = "smartstudy-rag-to-study-agent";
const focusPlayerTracks = [
  { id: "rain", name: "雨聲", src: "audio/rain.wav", gain: 1 },
  { id: "whiteNoise", name: "白噪音", src: "audio/white-noise.wav", gain: 1 },
  { id: "ocean", name: "海浪聲", src: "audio/ocean.wav", gain: 1 },
  { id: "cafe", name: "咖啡廳", src: "audio/cafe.wav", gain: 1 },
  { id: "library", name: "圖書館", src: "audio/library.wav", gain: 1 },
  { id: "keyboard", name: "鍵盤聲", src: "audio/keyboard.wav", gain: 1 },
  { id: "piano", name: "輕鋼琴", src: "audio/piano.wav", gain: 1 },
  { id: "lofi", name: "Lo-fi", src: "audio/lofi.wav", gain: 1 }
];
let focusPlayerCurrentTrackIndex = 0;
let focusPlayerIsPlaying = false;
const focusPlayerAudio = new Audio(focusPlayerTracks[focusPlayerCurrentTrackIndex].src);
focusPlayerAudio.loop = true;
let focusPlayerUserVolume = 0.5;
focusPlayerAudio.volume = 0.5;
let focusPlayerInitialized = false;
let focusPlayerBuiltInAudioUnavailable = false;
let focusPlayerGeneratedMode = false;
let focusPlayerAudioContext = null;
let focusPlayerGeneratedNodes = [];
let focusPlayerGeneratedIntervals = [];
let currentUploadedFiles = [];

function clampVolumeValue(value) {
  return Math.min(1, Math.max(0, Number(value)));
}

function getCurrentFocusTrack() {
  return focusPlayerTracks[focusPlayerCurrentTrackIndex] || focusPlayerTracks[0];
}

function getNormalizedFocusTrackVolume(track = getCurrentFocusTrack()) {
  return clampVolumeValue(focusPlayerUserVolume * (track?.gain || 1));
}

function applyFocusPlayerVolume() {
  const currentTrack = getCurrentFocusTrack();
  focusPlayerAudio.volume = getNormalizedFocusTrackVolume(currentTrack);
  if (focusPlayerGeneratedMode && focusPlayerGeneratedNodes[0]?.gain) {
    focusPlayerGeneratedNodes[0].gain.value = focusPlayerAudio.volume * 0.22;
  }
}

function switchPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(`${pageName}Page`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  document.querySelectorAll(".nav-pill").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  triggerPageReveal();
}

function triggerPageReveal() {
  document.body.classList.remove("page-reveal");
  window.requestAnimationFrame(() => {
    document.body.classList.add("page-reveal");
  });
}

function animateNumericText(element, nextValue) {
  if (!element || element.dataset.missingId) {
    return;
  }

  const targetValue = Number(nextValue) || 0;
  const currentValue = Number(element.dataset.animatedValue || element.textContent || 0) || 0;

  if (currentValue === targetValue) {
    element.textContent = String(targetValue);
    element.dataset.animatedValue = String(targetValue);
    return;
  }

  const start = performance.now();
  const duration = 420;
  const delta = targetValue - currentValue;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(currentValue + delta * eased);
    element.textContent = String(value);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }

    element.textContent = String(targetValue);
    element.dataset.animatedValue = String(targetValue);
  };

  window.requestAnimationFrame(tick);
}

function bindPageNavigation() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    if (button.dataset.navBound === "true") {
      return;
    }
    button.dataset.navBound = "true";
    button.addEventListener("click", () => {
      const pageName = button.dataset.page;
      if (pageName) {
        switchPage(pageName);
      }
    });
  });
}

function reportMissingUiElements() {
  if (!missingElementAudit.length) {
    return;
  }

  const grouped = missingElementAudit.reduce((accumulator, item) => {
    const feature = item.id.includes("knowledge") || item.id.includes("rag")
      ? "knowledge"
      : item.id.includes("study") || item.id.includes("planner") || item.id.includes("exam")
        ? "planner"
        : item.id.includes("tutor")
          ? "tutor"
          : "other";

    if (!accumulator[feature]) {
      accumulator[feature] = [];
    }
    accumulator[feature].push(item.id);
    return accumulator;
  }, {});

  console.warn("[SmartStudy UI Audit] Missing UI elements detected:", grouped);
}

function reportCoreUiReadiness() {
  const coreIds = [
    "themeToggle",
    "chooseFileButton",
    "analyzeButton",
    "notesExportTrigger",
    "sendSummaryToTutorBtn",
    "sendKeyPointToTutorBtn",
    "chooseTutorSourceBtn",
    "clearTutorSourceBtn",
    "sendTutorMessage",
    "knowledgeSearchBtn",
    "seedKnowledgeBaseButton",
    "knowledgePreviewTutorBtn",
    "knowledgePreviewTaskBtn",
    "knowledgePreviewExportBtn",
    "generateStudyPlanBtn",
    "clearPlannerFormBtn",
    "openGuideModalButton",
    "guideModalGoNotes"
  ];

  const missingCore = coreIds.filter((id) => !document.getElementById(id));
  if (missingCore.length) {
    console.warn("[SmartStudy UI Audit] Missing current-page controls:", missingCore);
  } else {
    console.info("[SmartStudy UI Audit] Current-page controls are present.");
  }
}

function initNavigation() {
  bindPageNavigation();
}

function initBrandIntro() {
  if (!brandIntro || brandIntro.dataset.missingId) {
    document.body.classList.add("page-reveal");
    return;
  }

  const hasSeenIntro = sessionStorage.getItem(BRAND_INTRO_SESSION_KEY) === "true";
  if (hasSeenIntro) {
    brandIntro.classList.add("is-hidden");
    document.body.classList.add("page-reveal");
    return;
  }

  document.body.classList.add("intro-lock");
  window.setTimeout(() => {
    brandIntro.classList.add("is-hidden");
    document.body.classList.remove("intro-lock");
    document.body.classList.add("page-reveal");
    sessionStorage.setItem(BRAND_INTRO_SESSION_KEY, "true");
  }, 1800);
}

function updateInterfaceLanguage() {
  const dict = i18n[currentLanguage] || i18n.zh;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key || !dict[key]) return;
    element.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (!key || !dict[key]) return;
    element.setAttribute("placeholder", dict[key]);
  });

  document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-Hant";
  updateKnowledgeAssistStatus();
}

function setLanguage(lang) {
  if (!["zh", "en"].includes(lang)) {
    return;
  }

  setCurrentLanguage(lang);
  saveToStorage(STORAGE_KEYS.language, currentLanguage);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLanguage);
  });

  if (outputLanguage) {
    outputLanguage.value = currentLanguage;
  }

  updateInterfaceLanguage();
  updateLanguageView();
  updateTutorModeUI();
  updatePlayButton();
  updateTutorSourceUI();
  renderHomeTasks();
  renderStudyPlanner();
  renderMyNotes();
  updateKnowledgeResults();
  updateExportPreview();
  refreshKnowledgeAssistPreviewFromCurrentInput();
}

function initLanguageToggle() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.dataset.bound === "true") {
      return;
    }
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage(currentLanguage);
}

function setTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", currentTheme === "dark" ? "切換亮色模式" : "切換深色模式");
  }

  saveToStorage(STORAGE_KEYS.theme, currentTheme);
}

function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle && themeToggle.dataset.bound !== "true") {
    themeToggle.dataset.bound = "true";
    themeToggle.addEventListener("click", toggleTheme);
  }
  setTheme(currentTheme);
}

function updateTrackLabel() {
  if (!currentTrackLabel) {
    return;
  }

  currentTrackLabel.textContent = `目前：${getCurrentFocusTrack().name}`;
}

function clearGeneratedIntervals() {
  focusPlayerGeneratedIntervals.forEach((intervalId) => {
    window.clearInterval(intervalId);
  });
  focusPlayerGeneratedIntervals = [];
}

function stopGeneratedAmbient() {
  clearGeneratedIntervals();
  focusPlayerGeneratedNodes.forEach((node) => {
    try {
      if (typeof node.stop === "function") {
        node.stop();
      }
    } catch (error) {
      // Ignore stop errors from already-stopped nodes.
    }

    try {
      if (typeof node.disconnect === "function") {
        node.disconnect();
      }
    } catch (error) {
      // Ignore disconnect errors.
    }
  });
  focusPlayerGeneratedNodes = [];
  focusPlayerGeneratedMode = false;
}

function stopFocusPlayerPlayback({ keepPlayingState = false } = {}) {
  focusPlayerAudio.pause();
  stopGeneratedAmbient();
  if (!keepPlayingState) {
    focusPlayerIsPlaying = false;
    updatePlayButton();
    saveMusicState();
  }
}

function ensureFocusPlayerAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!focusPlayerAudioContext) {
    focusPlayerAudioContext = new AudioContextClass();
  }

  if (focusPlayerAudioContext.state === "suspended") {
    return focusPlayerAudioContext.resume().then(() => focusPlayerAudioContext);
  }

  return Promise.resolve(focusPlayerAudioContext);
}

function createNoiseBuffer(audioContext, color = "white") {
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    if (color === "brown") {
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 3.5;
    } else if (color === "pink") {
      lastOut = (0.98 * lastOut) + (0.02 * white);
      data[i] = lastOut * 1.8;
    } else {
      data[i] = white;
    }
  }

  return buffer;
}

function registerGeneratedNode(node) {
  focusPlayerGeneratedNodes.push(node);
  return node;
}

function scheduleKeyboardClicks(audioContext, outputGain) {
  const triggerClick = () => {
    const clickOsc = audioContext.createOscillator();
    const clickGain = audioContext.createGain();
    clickOsc.type = "square";
    clickOsc.frequency.value = 900 + Math.random() * 500;
    clickGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.025, audioContext.currentTime + 0.005);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.07);
    clickOsc.connect(clickGain);
    clickGain.connect(outputGain);
    clickOsc.start();
    clickOsc.stop(audioContext.currentTime + 0.08);
    registerGeneratedNode(clickOsc);
    registerGeneratedNode(clickGain);
  };

  triggerClick();
  focusPlayerGeneratedIntervals.push(window.setInterval(triggerClick, 380 + Math.random() * 280));
}

function scheduleLofiPulse(audioContext, outputGain) {
  const playChord = () => {
    const root = 220;
    [1, 1.25, 1.5].forEach((ratio, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      osc.type = index === 0 ? "triangle" : "sine";
      osc.frequency.value = root * ratio;
      filter.type = "lowpass";
      filter.frequency.value = 900;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.022 / (index + 1), audioContext.currentTime + 0.4);
      gain.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + 2.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(outputGain);
      osc.start();
      osc.stop(audioContext.currentTime + 2.5);
      registerGeneratedNode(osc);
      registerGeneratedNode(gain);
      registerGeneratedNode(filter);
    });
  };

  playChord();
  focusPlayerGeneratedIntervals.push(window.setInterval(playChord, 2400));
}

async function startGeneratedAmbient(track) {
  const audioContext = await ensureFocusPlayerAudioContext();
  if (!audioContext) {
    throw new Error("Web Audio API unavailable");
  }

  stopGeneratedAmbient();

  const outputGain = registerGeneratedNode(audioContext.createGain());
  outputGain.gain.value = getNormalizedFocusTrackVolume(track) * 0.22;
  outputGain.connect(audioContext.destination);

  const noiseSource = registerGeneratedNode(audioContext.createBufferSource());
  const noiseFilter = registerGeneratedNode(audioContext.createBiquadFilter());
  const noiseGain = registerGeneratedNode(audioContext.createGain());

  noiseSource.loop = true;
  noiseGain.gain.value = 1;

  switch (track.id) {
    case "rain":
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 3200;
      noiseFilter.Q.value = 0.8;
      noiseGain.gain.value = 0.9;
      break;
    case "whiteNoise":
      noiseSource.buffer = createNoiseBuffer(audioContext, "white");
      noiseFilter.type = "highpass";
      noiseFilter.frequency.value = 500;
      noiseGain.gain.value = 0.55;
      break;
    case "ocean":
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 900;
      noiseGain.gain.value = 1;
      {
        const wave = registerGeneratedNode(audioContext.createOscillator());
        const waveGain = registerGeneratedNode(audioContext.createGain());
        wave.type = "sine";
        wave.frequency.value = 0.12;
        waveGain.gain.value = 450;
        wave.connect(waveGain);
        waveGain.connect(noiseFilter.frequency);
        wave.start();
      }
      break;
    case "cafe":
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1400;
      noiseFilter.Q.value = 0.6;
      noiseGain.gain.value = 0.32;
      scheduleKeyboardClicks(audioContext, outputGain);
      break;
    case "library":
      noiseSource.buffer = createNoiseBuffer(audioContext, "brown");
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 700;
      noiseGain.gain.value = 0.22;
      break;
    case "keyboard":
      noiseSource.buffer = createNoiseBuffer(audioContext, "white");
      noiseFilter.type = "highpass";
      noiseFilter.frequency.value = 1400;
      noiseGain.gain.value = 0.08;
      scheduleKeyboardClicks(audioContext, outputGain);
      break;
    case "piano":
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 500;
      noiseGain.gain.value = 0.06;
      scheduleLofiPulse(audioContext, outputGain);
      break;
    case "lofi":
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 1100;
      noiseGain.gain.value = 0.12;
      scheduleLofiPulse(audioContext, outputGain);
      break;
    default:
      noiseSource.buffer = createNoiseBuffer(audioContext, "pink");
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 1800;
      noiseGain.gain.value = 0.4;
      break;
  }

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(outputGain);
  noiseSource.start();
  focusPlayerGeneratedMode = true;
}

async function playCurrentFocusTrack() {
  const track = getCurrentFocusTrack();
  stopGeneratedAmbient();
  focusPlayerAudio.pause();

  if (focusPlayerBuiltInAudioUnavailable) {
    await startGeneratedAmbient(track);
    focusPlayerIsPlaying = true;
    updatePlayButton();
    saveMusicState();
    return;
  }

  focusPlayerAudio.src = track.src;
  focusPlayerAudio.loop = true;
  applyFocusPlayerVolume();

  try {
    await focusPlayerAudio.play();
    focusPlayerGeneratedMode = false;
    focusPlayerIsPlaying = true;
    updatePlayButton();
    saveMusicState();
  } catch (error) {
    focusPlayerBuiltInAudioUnavailable = true;
    await startGeneratedAmbient(track);
    focusPlayerIsPlaying = true;
    updatePlayButton();
    saveMusicState();
  }
}

function updatePlayButton() {
  if (!playPauseBtn) {
    return;
  }

  playPauseBtn.textContent = focusPlayerIsPlaying
    ? getI18nText("pauseLabel", "暫停")
    : getI18nText("playLabel", "播放");
}

function saveMusicState() {
  const player = document.getElementById("focusMusicPlayer");

  saveToStorage(STORAGE_KEYS.music, {
    currentTrackIndex: focusPlayerCurrentTrackIndex,
    volume: focusPlayerUserVolume,
    isCollapsed: player ? player.classList.contains("collapsed") : false
  });
}

function restoreMusicState() {
  try {
    const state = loadFromStorage(STORAGE_KEYS.music, null);
    if (!state) {
      updateTrackLabel();
      updatePlayButton();
      return;
    }

    if (typeof state.currentTrackIndex === "number" && focusPlayerTracks[state.currentTrackIndex]) {
      focusPlayerCurrentTrackIndex = state.currentTrackIndex;
      focusPlayerAudio.src = focusPlayerTracks[focusPlayerCurrentTrackIndex].src;
    }

    if (typeof state.volume === "number") {
      focusPlayerUserVolume = clampVolumeValue(state.volume);
      applyFocusPlayerVolume();

      if (volumeControl) {
        volumeControl.value = String(focusPlayerUserVolume);
      }
    }

    const player = document.getElementById("focusMusicPlayer");
    if (player && state.isCollapsed) {
      player.classList.add("collapsed");
    }

    updateTrackLabel();
    updatePlayButton();
  } catch (error) {
    console.warn("Failed to restore music state:", error);
  }
}

function loadTrack(index, shouldPlay = focusPlayerIsPlaying) {
  if (index < 0 || index >= focusPlayerTracks.length) {
    return;
  }

  focusPlayerCurrentTrackIndex = index;
  focusPlayerAudio.src = focusPlayerTracks[focusPlayerCurrentTrackIndex].src;
  focusPlayerAudio.loop = true;
  applyFocusPlayerVolume();
  stopGeneratedAmbient();

  updateTrackLabel();

  if (shouldPlay) {
    void playCurrentFocusTrack();
  } else {
    focusPlayerAudio.pause();
    focusPlayerIsPlaying = false;
    updatePlayButton();
  }

  saveMusicState();
}

function nextTrack() {
  const nextIndex = (focusPlayerCurrentTrackIndex + 1) % focusPlayerTracks.length;
  loadTrack(nextIndex);
}

function prevTrack() {
  const prevIndex = (focusPlayerCurrentTrackIndex - 1 + focusPlayerTracks.length) % focusPlayerTracks.length;
  loadTrack(prevIndex);
}

function playPause() {
  if (focusPlayerIsPlaying) {
    stopFocusPlayerPlayback();
    return;
  }

  void playCurrentFocusTrack()
    .then(() => {
      if (window.SmartStudySpotifyPlayer?.pause) {
        void window.SmartStudySpotifyPlayer.pause();
      }
    })
    .catch(() => {
      focusPlayerIsPlaying = false;
      updatePlayButton();
    });
}

function setVolume(value) {
  focusPlayerUserVolume = clampVolumeValue(value);
  applyFocusPlayerVolume();
  saveMusicState();
}

function togglePlayerCollapse() {
  const player = document.getElementById("focusMusicPlayer");
  if (!player) {
    return;
  }

  player.classList.toggle("collapsed");
  saveMusicState();
}

function toggleTrackMenu() {
  const menu = document.getElementById("trackMenu");
  if (!menu) {
    return;
  }

  menu.classList.toggle("hidden");
}

function selectTrackById(trackId) {
  const index = focusPlayerTracks.findIndex((track) => track.id === trackId);
  if (index === -1) {
    return;
  }

  loadTrack(index);

  const menu = document.getElementById("trackMenu");
  if (menu) {
    menu.classList.add("hidden");
  }
}

function openSpotifyPanel() {
  if (!spotifyPanel) {
    return;
  }

  spotifyPanel.classList.toggle("hidden");
}

function initFocusMusicPlayer() {
  if (focusPlayerInitialized) {
    return;
  }

  const player = document.getElementById("focusMusicPlayer");
  if (!player) {
    return;
  }

  focusPlayerInitialized = true;
  restoreMusicState();
  focusPlayerAudio.addEventListener("error", () => {
    focusPlayerBuiltInAudioUnavailable = true;
    if (focusPlayerIsPlaying) {
      void startGeneratedAmbient(focusPlayerTracks[focusPlayerCurrentTrackIndex]).then(() => {
        focusPlayerGeneratedMode = true;
      }).catch(() => {
        focusPlayerIsPlaying = false;
        updatePlayButton();
      });
    }
  });
  focusPlayerAudio.addEventListener("ended", () => {
    if (!focusPlayerIsPlaying) {
      return;
    }

    focusPlayerAudio.currentTime = 0;
    void focusPlayerAudio.play().catch(() => {
      focusPlayerIsPlaying = false;
      updatePlayButton();
    });
  });

  playPauseBtn?.addEventListener("click", playPause);
  nextTrackBtn?.addEventListener("click", nextTrack);
  prevTrackBtn?.addEventListener("click", prevTrack);
  toggleCollapsePlayer?.addEventListener("click", togglePlayerCollapse);
  openTrackMenuBtn?.addEventListener("click", toggleTrackMenu);
  spotifyBtn?.addEventListener("click", openSpotifyPanel);
  closeSpotifyPanelBtn?.addEventListener("click", () => {
    spotifyPanel?.classList.add("hidden");
  });

  volumeControl?.addEventListener("input", (event) => {
    setVolume(event.target.value);
  });

  document.querySelectorAll("#trackMenu [data-track]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTrackById(button.dataset.track);
    });
  });

  document.addEventListener("click", (event) => {
    if (!trackMenu.classList.contains("hidden") && !trackMenu.contains(event.target) && event.target !== openTrackMenuBtn) {
      trackMenu.classList.add("hidden");
    }

    if (!spotifyPanel.classList.contains("hidden")
      && !spotifyPanel.contains(event.target)
      && event.target !== spotifyBtn) {
      spotifyPanel.classList.add("hidden");
    }
  });

  if (window.SmartStudySpotifyPlayer?.init) {
    window.SmartStudySpotifyPlayer.init({
      modeButton: spotifyBtn,
      statusTitle: document.getElementById("focusSpotifyStateTitle"),
      premiumBadge: document.getElementById("focusSpotifyPremiumBadge"),
      statusText: document.getElementById("focusSpotifyStatus"),
      connectButton: document.getElementById("focusSpotifyConnectButton"),
      reconnectButton: document.getElementById("focusSpotifyReconnectButton"),
      disconnectButton: document.getElementById("focusSpotifyDisconnectButton"),
      authHint: document.getElementById("focusSpotifyAuthHint"),
      nowPlaying: document.getElementById("focusSpotifyNowPlaying"),
      cover: document.getElementById("focusSpotifyCover"),
      trackName: document.getElementById("focusSpotifyTrackName"),
      artistName: document.getElementById("focusSpotifyArtistName"),
      progressWrap: document.getElementById("focusSpotifyProgressWrap"),
      progressCurrent: document.getElementById("focusSpotifyProgressCurrent"),
      progressTotal: document.getElementById("focusSpotifyProgressTotal"),
      progressFill: document.getElementById("focusSpotifyProgressFill"),
      controls: document.getElementById("focusSpotifyControls"),
      previousButton: document.getElementById("spotifyPreviousButton"),
      playPauseButton: document.getElementById("spotifyPlayButton"),
      nextButton: document.getElementById("spotifyNextButton"),
      volumeInput: document.getElementById("spotifyVolumeInput"),
      lockActions: document.getElementById("focusSpotifyLockActions"),
      lockButton: document.getElementById("focusSpotifyLockButton"),
      returnLockedButton: document.getElementById("focusSpotifyReturnLockedButton"),
      lockStatus: document.getElementById("focusSpotifyLockStatus"),
      onSpotifyPlaybackStart: () => {
        if (focusPlayerIsPlaying) {
          stopFocusPlayerPlayback();
        }
      }
    });
  }
}

const i18n = {
  zh: {
    navHome: "首頁",
    navNotes: "筆記整理",
    navTutor: "AI Tutor",
    navKnowledge: "知識庫",
    navPlanner: "讀書計畫",
    navMyNotes: "我的筆記",
    homeTitle: "讓 AI 成為你的學習助教",
    homeSubtitle: "今天要整理筆記、複習重點，還是問 AI 老師？",
    aiTodaySuggestion: "AI 今日建議",
    aiTodaySuggestionSubtitle: "根據你的筆記與待辦，提供今日複習方向",
    todayRecommended: "今日推薦",
    suggestReviewLabel: "今天建議先複習",
    possibleQuestionLabel: "可能考題",
    todayTaskLabel: "今日任務",
    homeSuggestionReviewTitle: "今天先複習核心概念與主線",
    homeSuggestionReviewDesc: "先整理今天最重要的概念，再回頭補細節與例子。",
    homeSuggestionQuestionTitle: "這份內容最可能怎麼被提問？",
    homeSuggestionQuestionDesc: "想想老師會要求你解釋、比較，還是應用到情境裡。",
    homeSuggestionTaskTitle: "完成一組小型回顧任務",
    homeSuggestionTaskDesc: "先做短題或自我測試，再整理今天最容易忘記的地方。",
    quickStart: "快速開始",
    quickStartSubtitle: "依照你現在的需求選擇功能",
    startLearning: "開始學習",
    quickNewNote: "我有新筆記",
    quickOrganizeNotes: "整理筆記",
    quickOrganizeNotesDesc: "上傳或貼上內容，產生摘要、重點與考題。",
    quickAskQuestion: "我想問問題",
    quickAITutor: "AI Tutor",
    quickAITutorDesc: "根據目前筆記，用教學方式回答你的問題。",
    quickFindData: "我想找資料",
    quickKnowledge: "知識庫",
    quickKnowledgeDesc: "搜尋整理過的筆記、關鍵字與相關考點。",
    quickPrepareExam: "我想準備考試",
    quickPlanner: "讀書計畫",
    quickPlannerDesc: "建立今日、本週與已完成任務看板。",
    guideButton: "功能說明",
    guideSectionTitle: "這個網站可以幫你做什麼？",
    guideSectionSubtitle: "如果你第一次使用，可以先看這裡，再決定從哪個功能開始。",
    guideTagStart: "開始用",
    guideTagAsk: "理解內容",
    guideTagFind: "查資料",
    guideTagPlan: "安排進度",
    guideNotesTitle: "筆記整理",
    guideNotesDesc: "把原始資料變成摘要、重點、關鍵字和複習內容。",
    guideNotesStep1: "貼上文字或上傳 PDF、DOCX、PPTX。",
    guideNotesStep2: "選擇整理模式與輸出語言。",
    guideNotesStep3: "按開始整理，右側會出現可展開的結果。",
    guideTutorTitle: "AI Tutor",
    guideTutorDesc: "像老師一樣回答你，幫你把某份筆記真正搞懂。",
    guideTutorStep1: "先選一份筆記當作回答依據。",
    guideTutorStep2: "點推薦問題，或直接輸入你想問的內容。",
    guideTutorStep3: "系統會用重點、解釋和可能問法回答你。",
    guideKnowledgeTitle: "知識庫",
    guideKnowledgeDesc: "把整理過的內容集中起來，之後可以用關鍵字快速搜尋。",
    guideKnowledgeStep1: "整理過的筆記會成為可搜尋的內容。",
    guideKnowledgeStep2: "用關鍵字、科目、章節和類型縮小範圍。",
    guideKnowledgeStep3: "找到結果後可繼續問 AI Tutor 或加入任務。",
    guidePlannerTitle: "讀書計畫",
    guidePlannerDesc: "把複習需求拆成今天、本週和已完成任務，減少臨時抱佛腳。",
    guidePlannerStep1: "填入考試日期、可讀時間與範圍。",
    guidePlannerStep2: "系統會建立可追蹤的任務卡片。",
    guidePlannerStep3: "完成後可以移動任務，首頁也會同步更新。",
    guideModalTitle: "SmartStudy AI 操作說明",
    guideModalSubtitle: "第一次使用時，照著下面的順序操作會最容易上手。",
    guideModalStep1Title: "1. 先把資料放進來",
    guideModalStep1Desc: "到「筆記整理」上傳 PDF、DOCX、PPTX，或直接貼上文字內容。",
    guideModalStep2Title: "2. 讓 AI 幫你整理",
    guideModalStep2Desc: "選整理模式後按開始整理，系統會產生摘要、重點、關鍵字與複習內容。",
    guideModalStep3Title: "3. 有看不懂的地方就問 AI Tutor",
    guideModalStep3Desc: "把某份筆記設成目前資料後，就能像問老師一樣追問觀念、比較差異和練習題。",
    guideModalStep4Title: "4. 想找舊內容時用知識庫",
    guideModalStep4Desc: "如果你已經整理過很多筆記，可以到知識庫用關鍵字搜尋，再接回 Tutor 或讀書計畫。",
    guideModalStep5Title: "5. 想安排複習時用讀書計畫",
    guideModalStep5Desc: "把考試日期和可讀時間輸入後，系統會幫你拆成今日、本週與已完成任務。",
    guideModalStep6Title: "6. 所有整理結果都會留在我的筆記",
    guideModalStep6Desc: "之後你可以從「我的筆記」重新開啟、匯出或刪除整理過的內容。",
    guidePrimaryAction: "前往筆記整理開始使用",
    closeGuideButton: "我知道了",
    todayTodo: "今日待辦",
    todayTodoSubtitle: "把讀書計畫拆成今天可以完成的小任務",
    manageTasks: "管理任務",
    export: "匯出",
    start: "開始整理",
    send: "送出",
    search: "搜尋",
    cancel: "取消",
    confirm: "確認",
    delete: "刪除",
    notesTitle: "AI 筆記整理",
    notesSubtitle: "上傳或貼上課堂內容，讓 AI 幫你整理成可複習的學習筆記。",
    notesInputSettingsTitle: "輸入與設定",
    notesInputSettingsSubtitle: "放入你的筆記，選擇整理方式",
    uploadFileLabel: "上傳檔案",
    chooseFile: "選擇檔案",
    pdfRangeTitle: "PDF 頁數範圍",
    pdfRangeDescription: "可留空代表整份 PDF；若一次上傳多份 PDF，所有 PDF 會套用同一組頁數範圍。",
    pdfPageStartLabel: "起始頁",
    pdfPageEndLabel: "結束頁",
    pdfPageStartPlaceholder: "例如：1",
    pdfPageEndPlaceholder: "例如：20",
    uploadPreviewTitle: "匯入預覽",
    uploadPreviewMeta: "解析完成後，這裡會顯示目前匯入的檔案與內容區塊概況。",
    pasteTextLabel: "貼上文字",
    noteModesLabel: "整理模式（可複選）",
    strategyPresetLabel: "學習策略",
    strategyRefinementLabel: "加強方向（可複選）",
    strategySummaryTitle: "目前策略",
    strategyQuickTitle: "快速整理",
    strategyQuickDesc: "先抓大意與主線",
    strategyExamTitle: "考前衝刺",
    strategyExamDesc: "聚焦常考與易錯點",
    strategyDeepTitle: "深入理解",
    strategyDeepDesc: "強化脈絡與概念解釋",
    strategyReportTitle: "報告架構",
    strategyReportDesc: "整理論點與段落結構",
    strategyKnowledgeTitle: "知識累積",
    strategyKnowledgeDesc: "兼顧摘要與概念連結",
    outputLanguageLabel: "輸出語言",
    knowledgeAssistLabel: "知識庫輔助",
    knowledgeAssistOption: "引用最相關知識庫段落",
    knowledgeAssistHint: "整理筆記時可額外參考知識庫中最相關的 1～3 段補充內容。",
    knowledgeAssistPreviewTitle: "引用預覽",
    knowledgeAssistPreviewSubtitle: "整理前可先查看這次會引用的知識片段。",
    notesResultTitle: "整理結果",
    notesResultSubtitle: "先看一句重點，展開後再看詳細解析",
    tutorTitle: "AI Tutor 問答老師",
    knowledgeTitle: "我的知識庫",
    plannerTitle: "讀書計畫",
    myNotesTitle: "我的筆記",
    tutorSubtitle: "根據你目前選取的筆記內容回答問題，並用教學方式幫你理解觀念。",
    tutorCurrentSourceTitle: "目前使用資料",
    tutorCurrentSourceSubtitle: "AI Tutor 會優先根據這份資料回答",
    tutorModeLabel: "Tutor 模式",
    tutorModeQuickTitle: "快速解釋",
    tutorModeQuickDesc: "先講核心重點",
    tutorModeDeepTitle: "深入教學",
    tutorModeDeepDesc: "補脈絡與例子",
    tutorModeExamTitle: "考前問答",
    tutorModeExamDesc: "偏考點與常見問法",
    tutorModeDrillTitle: "作答演練",
    tutorModeDrillDesc: "更常追問與批改",
    tutorCurrentNoteLabel: "目前筆記",
    chooseNote: "選擇筆記",
    clearSource: "清除資料",
    recommendedQuestionsTitle: "推薦問題",
    recommendedQuestionsSubtitle: "只根據目前選取資料產生",
    recommendedQuestionsEmpty: "目前尚未選擇資料，請先選擇一份筆記後再產生推薦問題。",
    refreshRecommendations: "刷新推薦",
    chatAreaTitle: "對話區",
    chatAreaSubtitle: "回答會採用「重點 → 解釋 → 考試可能問法」的教學格式",
    knowledgeSubtitle: "搜尋你整理過的筆記、摘要與重點，快速找到相關考點。",
    knowledgeHelperText: "可以搜尋筆記標題、智慧摘要、可能重點、關鍵字、易錯觀念與考題預測。",
    loadDemoKnowledge: "載入 / 重建示範知識庫",
    knowledgeSummaryFiles: "知識文件",
    knowledgeSummaryChunks: "知識段落",
    knowledgeSummarySubjects: "目前領域",
    knowledgeSummaryTopTopics: "主要主題",
    knowledgeStructureTitle: "知識結構總覽",
    knowledgeStructureSubtitle: "快速查看目前有哪些領域與子主題",
    knowledgeStructureEmpty: "目前尚無知識結構資料。",
    knowledgeStructureTopicsCount: "個主題",
    filtersTitle: "篩選",
    filtersSubtitle: "縮小搜尋範圍",
    subjectLabel: "科目",
    chapterLabel: "章節",
    tagLabel: "標籤",
    typeLabel: "類型",
    allSubjects: "全部科目",
    allChapters: "全部章節",
    allTags: "全部標籤",
    allTypes: "全部類型",
    tagSummary: "智慧摘要",
    tagKeyPoints: "可能重點",
    tagQuiz: "考題預測",
    tagKeywords: "關鍵字",
    tagMistakes: "易錯觀念",
    tagConcepts: "概念連結",
    clearFilters: "清除篩選",
    searchResultsTitle: "搜尋結果",
    plannerSubtitle: "根據考試日期、讀書時間與筆記內容，建立可追蹤的複習任務。",
    plannerFormTitle: "建立讀書計畫",
    plannerFormSubtitle: "輸入考試資訊，讓 AI 幫你拆成可執行任務",
    examDateLabel: "考試日期",
    studyHoursLabel: "每天可讀時間",
    studyHoursPlaceholder: "例如：1.5 小時、90 分鐘",
    examScopeLabel: "考試範圍",
    examScopePlaceholder: "例如：第 50-66 頁、Chapter 13",
    plannerNoteSelectLabel: "選擇科目 / 筆記",
    pleaseChooseNote: "請選擇筆記",
    generatePlan: "產生計畫",
    clearInput: "清除輸入",
    plannerHelperText: "產生的任務會加入下方看板，並同步到首頁今日待辦。",
    todayTasksColumnTitle: "今日任務",
    weekTasksColumnTitle: "本週任務",
    doneTasksColumnTitle: "已完成",
    emptyTodayTasks: "目前沒有今日任務。",
    emptyWeekTasks: "目前沒有本週任務。",
    emptyDoneTasks: "目前尚無已完成任務。",
    myNotesSubtitle: "管理、查看、重新開啟、匯出或刪除你整理過的筆記。",
    searchNotesLabel: "搜尋筆記",
    myNotesSearchPlaceholder: "搜尋標題、科目、摘要或關鍵字...",
    dateSortLabel: "日期排序",
    sortNewest: "日期：新到舊",
    sortOldest: "日期：舊到新",
    allNotesCount: "全部筆記",
    latestOrganized: "最近整理",
    currentFilteredResults: "目前篩選結果",
    noDataYet: "尚無資料",
    noNotesYetTitle: "目前沒有筆記",
    noNotesYetDetail: "請先到「筆記整理」頁產生一份筆記，整理完成後會出現在這裡。",
    globalMusicStripText: "想延伸問答、查詢知識庫或安排讀書計畫，可以使用上方導覽列切換功能。",
    exportModalTitle: "匯出設定",
    exportModalSubtitle: "選擇格式、模板與要包含的內容",
    exportFormatLabel: "格式",
    exportFormatMarkdown: "Markdown 筆記 .md",
    exportFormatWord: "Word 文件 .docx",
    exportFormatPdf: "PDF 講義 .pdf",
    exportFormatPpt: "PowerPoint 簡報 .pptx",
    exportTemplateLabel: "模板",
    templateStudyNote: "讀書筆記模板",
    templateFormalReport: "正式報告模板",
    templateExamReview: "考前複習模板",
    templateAutoPresentation: "自動報告簡報模板",
    exportIncludeLabel: "包含內容",
    exportIncludeKeyPoints: "重要重點",
    referencesLabel: "參考資料",
    exportPreviewTitle: "目前匯出內容",
    startExport: "開始匯出",
    focusMusicTitle: "專注音樂",
    previousTrack: "上一首",
    nextTrack: "下一首",
    moreMusic: "更多音樂",
    volumeLabel: "音量",
    playLabel: "播放",
    pauseLabel: "暫停",
    modeQuick: "快速摘要",
    modeDeep: "深度解析",
    modeExam: "考前複習",
    modeQuiz: "題目生成",
    modeConcept: "概念連結",
    modeMistake: "易錯觀念",
    knowledgeSearchPlaceholder: "輸入關鍵字、問題或主題，例如：Python、設計思考、學習策略...",
    notesSourcePlaceholder: "請貼上課堂筆記、講義內容、老師上課重點或你想整理的資料...",
    tutorInputPlaceholderSimple: "輸入你的問題，例如：這段內容的核心概念是什麼？"
  },
  en: {
    navHome: "Home",
    navNotes: "Notes",
    navTutor: "AI Tutor",
    navKnowledge: "Knowledge Base",
    navPlanner: "Study Planner",
    navMyNotes: "My Notes",
    homeTitle: "Let AI become your study assistant",
    homeSubtitle: "Do you want to organize notes, review key points, or ask AI Tutor today?",
    aiTodaySuggestion: "AI Suggestions",
    aiTodaySuggestionSubtitle: "Get today’s review direction based on your notes and tasks",
    todayRecommended: "Recommended",
    suggestReviewLabel: "Review first",
    possibleQuestionLabel: "Possible exam question",
    todayTaskLabel: "Today's task",
    homeSuggestionReviewTitle: "Review the core ideas first",
    homeSuggestionReviewDesc: "Start with the main concepts, then return to details and examples.",
    homeSuggestionQuestionTitle: "How could this topic be asked?",
    homeSuggestionQuestionDesc: "Think about whether a teacher would ask you to explain, compare, or apply the idea.",
    homeSuggestionTaskTitle: "Finish a small review task",
    homeSuggestionTaskDesc: "Try a short self-check first, then organize today’s easiest-to-forget points.",
    quickStart: "Quick Start",
    quickStartSubtitle: "Choose a feature based on what you want to do",
    startLearning: "Start Learning",
    quickNewNote: "I have new notes",
    quickOrganizeNotes: "Organize Notes",
    quickOrganizeNotesDesc: "Upload or paste content to generate summaries, key points, and questions.",
    quickAskQuestion: "I want to ask a question",
    quickAITutor: "AI Tutor",
    quickAITutorDesc: "Ask questions based on your current notes with guided explanations.",
    quickFindData: "I want to find information",
    quickKnowledge: "Knowledge Base",
    quickKnowledgeDesc: "Search organized notes, keywords, and related exam points.",
    quickPrepareExam: "I want to prepare for exams",
    quickPlanner: "Study Planner",
    quickPlannerDesc: "Create today, weekly, and completed task boards.",
    guideButton: "How It Works",
    guideSectionTitle: "What can this website help you do?",
    guideSectionSubtitle: "If this is your first time here, start with this overview before choosing a feature.",
    guideTagStart: "Get Started",
    guideTagAsk: "Understand",
    guideTagFind: "Find",
    guideTagPlan: "Plan",
    guideNotesTitle: "Notes",
    guideNotesDesc: "Turn raw material into summaries, key points, keywords, and review-ready notes.",
    guideNotesStep1: "Paste text or upload a PDF, DOCX, or PPTX file.",
    guideNotesStep2: "Choose an organization mode and output language.",
    guideNotesStep3: "Press Start and the expandable results will appear on the right.",
    guideTutorTitle: "AI Tutor",
    guideTutorDesc: "Ask questions like you are talking to a teacher, and make one note truly understandable.",
    guideTutorStep1: "Select a note first so AI Tutor knows what to answer from.",
    guideTutorStep2: "Use a recommended question or type your own.",
    guideTutorStep3: "The reply follows a structure: key point, explanation, and possible exam question.",
    guideKnowledgeTitle: "Knowledge Base",
    guideKnowledgeDesc: "Collect your organized content and search it later with keywords.",
    guideKnowledgeStep1: "Organized notes become searchable knowledge items.",
    guideKnowledgeStep2: "Use keywords, subjects, chapters, and types to narrow the results.",
    guideKnowledgeStep3: "Once you find something useful, continue with AI Tutor or turn it into a task.",
    guidePlannerTitle: "Study Planner",
    guidePlannerDesc: "Break review work into today, this week, and completed tasks so revision feels manageable.",
    guidePlannerStep1: "Enter the exam date, available study time, and scope.",
    guidePlannerStep2: "SmartStudy AI creates trackable task cards for you.",
    guidePlannerStep3: "Move tasks as you complete them, and the home dashboard will update too.",
    guideModalTitle: "SmartStudy AI Quick Guide",
    guideModalSubtitle: "If this is your first time using the site, this is the easiest order to follow.",
    guideModalStep1Title: "1. Bring your material in first",
    guideModalStep1Desc: "Go to Notes and upload a PDF, DOCX, PPTX, or paste text directly.",
    guideModalStep2Title: "2. Let AI organize it",
    guideModalStep2Desc: "Choose a note mode and press Start. The system generates summaries, key points, keywords, and review content.",
    guideModalStep3Title: "3. Ask AI Tutor when something is unclear",
    guideModalStep3Desc: "Once a note is selected as the current source, you can ask follow-up questions, compare ideas, or practice with guided answers.",
    guideModalStep4Title: "4. Use the knowledge base to find older content",
    guideModalStep4Desc: "If you already organized many notes, search them by keyword and continue into AI Tutor or the planner.",
    guideModalStep5Title: "5. Use Study Planner when you need revision structure",
    guideModalStep5Desc: "Enter your exam date and available study time, and the system will split the work into today, weekly, and completed tasks.",
    guideModalStep6Title: "6. Everything stays in My Notes",
    guideModalStep6Desc: "You can reopen, export, or delete organized notes later from My Notes.",
    guidePrimaryAction: "Go to Notes to get started",
    closeGuideButton: "Got it",
    todayTodo: "Today's To-do",
    todayTodoSubtitle: "Break your study plan into tasks you can finish today",
    manageTasks: "Manage Tasks",
    export: "Export",
    start: "Start",
    send: "Send",
    search: "Search",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    notesTitle: "AI Note Organizer",
    notesSubtitle: "Upload or paste class content and let AI turn it into review-ready study notes.",
    notesInputSettingsTitle: "Input & Settings",
    notesInputSettingsSubtitle: "Add your notes and choose how to organize them.",
    uploadFileLabel: "Upload File",
    chooseFile: "Choose File",
    pdfRangeTitle: "PDF Page Range",
    pdfRangeDescription: "Leave these empty to use the whole PDF. If you upload multiple PDFs at once, the same range will be applied to all of them.",
    pdfPageStartLabel: "Start Page",
    pdfPageEndLabel: "End Page",
    pdfPageStartPlaceholder: "Example: 1",
    pdfPageEndPlaceholder: "Example: 20",
    uploadPreviewTitle: "Import Preview",
    uploadPreviewMeta: "After parsing, this area shows the imported files and a quick overview of the extracted content blocks.",
    pasteTextLabel: "Paste Text",
    noteModesLabel: "Organization Modes (Multi-select)",
    strategyPresetLabel: "Learning Strategy",
    strategyRefinementLabel: "Focus Directions (Multi-select)",
    strategySummaryTitle: "Current Strategy",
    strategyQuickTitle: "Quick Capture",
    strategyQuickDesc: "Start with the big picture",
    strategyExamTitle: "Exam Sprint",
    strategyExamDesc: "Focus on likely tests and pitfalls",
    strategyDeepTitle: "Deep Understanding",
    strategyDeepDesc: "Strengthen context and concept explanation",
    strategyReportTitle: "Report Builder",
    strategyReportDesc: "Organize arguments and structure",
    strategyKnowledgeTitle: "Knowledge Builder",
    strategyKnowledgeDesc: "Combine summary with concept links",
    outputLanguageLabel: "Output Language",
    knowledgeAssistLabel: "Knowledge Support",
    knowledgeAssistOption: "Include the most relevant knowledge-base passages",
    knowledgeAssistHint: "When organizing notes, SmartStudy AI can optionally reference 1 to 3 relevant supporting passages from your knowledge base.",
    knowledgeAssistPreviewTitle: "Reference Preview",
    knowledgeAssistPreviewSubtitle: "Preview the knowledge passages that may be referenced before generating notes.",
    notesResultTitle: "Results",
    notesResultSubtitle: "Start with one key idea, then expand for full details.",
    tutorTitle: "AI Tutor",
    knowledgeTitle: "Knowledge Base",
    plannerTitle: "Study Planner",
    myNotesTitle: "My Notes",
    tutorSubtitle: "Answer questions based on your currently selected notes and explain concepts in a teaching style.",
    tutorCurrentSourceTitle: "Current Source",
    tutorCurrentSourceSubtitle: "AI Tutor will answer based on this selected source first.",
    tutorModeLabel: "Tutor Mode",
    tutorModeQuickTitle: "Quick Explain",
    tutorModeQuickDesc: "Start with the core idea",
    tutorModeDeepTitle: "Deep Teach",
    tutorModeDeepDesc: "Add context and examples",
    tutorModeExamTitle: "Exam Coach",
    tutorModeExamDesc: "Focus on likely questions",
    tutorModeDrillTitle: "Answer Drill",
    tutorModeDrillDesc: "Push harder on correction",
    tutorCurrentNoteLabel: "Current note",
    chooseNote: "Choose Note",
    clearSource: "Clear Source",
    recommendedQuestionsTitle: "Recommended Questions",
    recommendedQuestionsSubtitle: "Generated only from the currently selected source",
    recommendedQuestionsEmpty: "No source is selected yet. Please choose a note before generating recommended questions.",
    refreshRecommendations: "Refresh",
    chatAreaTitle: "Chat",
    chatAreaSubtitle: "Answers follow a teaching structure: key point, explanation, and possible exam question.",
    knowledgeSubtitle: "Search your organized notes, summaries, and key points to quickly find relevant exam topics.",
    knowledgeHelperText: "You can search note titles, summaries, key points, keywords, common mistakes, and predicted questions.",
    loadDemoKnowledge: "Load / Rebuild Demo Knowledge Base",
    knowledgeSummaryFiles: "Knowledge Files",
    knowledgeSummaryChunks: "Knowledge Chunks",
    knowledgeSummarySubjects: "Active Subjects",
    knowledgeSummaryTopTopics: "Main Topics",
    knowledgeStructureTitle: "Knowledge Structure",
    knowledgeStructureSubtitle: "Quickly review the active subjects and subtopics",
    knowledgeStructureEmpty: "No knowledge structure available yet.",
    knowledgeStructureTopicsCount: "topics",
    filtersTitle: "Filters",
    filtersSubtitle: "Narrow the search scope",
    subjectLabel: "Subject",
    chapterLabel: "Chapter",
    tagLabel: "Tag",
    typeLabel: "Type",
    allSubjects: "All subjects",
    allChapters: "All chapters",
    allTags: "All tags",
    allTypes: "All types",
    tagSummary: "Summary",
    tagKeyPoints: "Key Points",
    tagQuiz: "Predicted Questions",
    tagKeywords: "Keywords",
    tagMistakes: "Common Mistakes",
    tagConcepts: "Concept Links",
    clearFilters: "Clear Filters",
    searchResultsTitle: "Search Results",
    plannerSubtitle: "Create trackable review tasks based on your exam date, study time, and notes.",
    plannerFormTitle: "Create Study Plan",
    plannerFormSubtitle: "Enter exam details and let AI break them into actionable tasks.",
    examDateLabel: "Exam Date",
    studyHoursLabel: "Daily Study Time",
    studyHoursPlaceholder: "For example: 1.5 hours, 90 minutes",
    examScopeLabel: "Exam Scope",
    examScopePlaceholder: "For example: pages 50-66, Chapter 13",
    plannerNoteSelectLabel: "Choose Subject / Note",
    pleaseChooseNote: "Please choose a note",
    generatePlan: "Generate Plan",
    clearInput: "Clear",
    plannerHelperText: "Generated tasks will be added to the board below and synced to the home dashboard.",
    todayTasksColumnTitle: "Today's Tasks",
    weekTasksColumnTitle: "This Week",
    doneTasksColumnTitle: "Done",
    emptyTodayTasks: "There are no tasks for today yet.",
    emptyWeekTasks: "There are no tasks for this week yet.",
    emptyDoneTasks: "There are no completed tasks yet.",
    myNotesSubtitle: "Manage, review, reopen, export, or delete the notes you have organized.",
    searchNotesLabel: "Search Notes",
    myNotesSearchPlaceholder: "Search titles, subjects, summaries, or keywords...",
    dateSortLabel: "Sort by Date",
    sortNewest: "Date: Newest First",
    sortOldest: "Date: Oldest First",
    allNotesCount: "All Notes",
    latestOrganized: "Latest Organized",
    currentFilteredResults: "Current Results",
    noDataYet: "No data yet",
    noNotesYetTitle: "No Notes Yet",
    noNotesYetDetail: "Generate a note from the Notes page first, and it will appear here.",
    globalMusicStripText: "Use the navigation above if you want to continue with AI Tutor, the knowledge base, or the study planner.",
    exportModalTitle: "Export Settings",
    exportModalSubtitle: "Choose the format, template, and content to include.",
    exportFormatLabel: "Format",
    exportFormatMarkdown: "Markdown Notes .md",
    exportFormatWord: "Word Document .docx",
    exportFormatPdf: "PDF Handout .pdf",
    exportFormatPpt: "PowerPoint Slides .pptx",
    exportTemplateLabel: "Template",
    templateStudyNote: "Study Note Template",
    templateFormalReport: "Formal Report Template",
    templateExamReview: "Exam Review Template",
    templateAutoPresentation: "Auto Presentation Template",
    exportIncludeLabel: "Include",
    exportIncludeKeyPoints: "Key Points",
    referencesLabel: "References",
    exportPreviewTitle: "Current Export Content",
    startExport: "Start Export",
    focusMusicTitle: "Focus Music",
    previousTrack: "Previous",
    nextTrack: "Next",
    moreMusic: "More Music",
    volumeLabel: "Volume",
    playLabel: "Play",
    pauseLabel: "Pause",
    modeQuick: "Quick Summary",
    modeDeep: "Deep Analysis",
    modeExam: "Exam Review",
    modeQuiz: "Question Generation",
    modeConcept: "Concept Links",
    modeMistake: "Common Mistakes",
    knowledgeSearchPlaceholder: "Search keywords, questions, or topics such as Python, design thinking, or study strategies...",
    notesSourcePlaceholder: "Paste your notes, lecture content, teacher highlights, or any material you want to organize...",
    tutorInputPlaceholderSimple: "Ask a question, for example: What is the core idea in this passage?"
  }
};

let currentLanguage = loadFromStorage(STORAGE_KEYS.language, "zh");
let currentTheme = loadFromStorage(STORAGE_KEYS.theme, "light");
let currentNoteModes = ["quick"];
let currentTutorMode = "quickExplain";
const NOTE_MODE_STORAGE_KEY = STORAGE_KEYS.myNotes;
const STUDY_TASKS_STORAGE_KEY = STORAGE_KEYS.tasks;
const noteModeToLegacyMode = {
  quick: "simple",
  deep: "report",
  exam: "exam",
  quiz: "exam",
  concept: "report",
  mistake: "exam"
};
const noteModeDisplayConfigs = {
  quick: {
    label: "快速摘要",
    description: "快速抓出整份內容的大意與主線，適合先建立整體理解。"
  },
  deep: {
    label: "深度解析",
    description: "完整解釋觀念與脈絡，適合課後整理與強化理解。"
  },
  exam: {
    label: "考前複習",
    description: "聚焦常考方向與易混淆重點，適合考前快速統整。"
  },
  quiz: {
    label: "題目生成",
    description: "優先整理出可能考題與練習方向，方便直接做題複習。"
  },
  concept: {
    label: "概念連結",
    description: "著重觀念之間的關係與結構，幫助你把內容串成完整脈絡。"
  },
  mistake: {
    label: "易錯觀念",
    description: "優先指出最容易混淆或考錯的地方，方便釐清盲點。"
  }
};

const noteModeDescriptions = {
  quick: {
    zh: "快速抓出整份內容的大意與主線，適合先建立整體理解。",
    en: "Quickly capture the main idea and structure of the content for an overall understanding."
  },
  deep: {
    zh: "完整解釋觀念與脈絡，適合課後整理與強化理解。",
    en: "Explain ideas and context in depth for stronger post-class understanding."
  },
  exam: {
    zh: "聚焦常考方向與易混淆重點，適合考前快速統整。",
    en: "Focus on common exam directions and confusing points for fast pre-exam review."
  },
  quiz: {
    zh: "優先整理出可能考題與練習方向，方便直接做題複習。",
    en: "Prioritize likely questions and practice directions so you can review through problems."
  },
  concept: {
    zh: "著重觀念之間的關係與結構，幫助你把內容串成完整脈絡。",
    en: "Highlight relationships and structure between concepts so the topic feels connected."
  },
  mistake: {
    zh: "優先指出最容易混淆或考錯的地方，方便釐清盲點。",
    en: "Highlight the most confusing and error-prone ideas first to clear up blind spots."
  }
};
const noteStrategyPresets = {
  quickCapture: {
    modes: ["quick"],
    label: { zh: "快速整理", en: "Quick Capture" },
    description: {
      zh: "適合先把一份新資料整理成可以快速吸收的版本，再決定要不要往下深挖。",
      en: "Best for turning fresh material into a fast, readable version before deciding whether to go deeper."
    }
  },
  examSprint: {
    modes: ["exam", "mistake"],
    label: { zh: "考前衝刺", en: "Exam Sprint" },
    description: {
      zh: "把常考重點和最容易混淆的地方一起拉出來，適合考前短時間複習。",
      en: "Pull likely exam points and confusing areas together for short, focused review before a test."
    }
  },
  deepFocus: {
    modes: ["deep"],
    label: { zh: "深入理解", en: "Deep Understanding" },
    description: {
      zh: "更重視觀念解釋、前後脈絡與細節補充，適合課後真正把內容弄懂。",
      en: "Prioritizes explanations, context, and detail so you can truly understand the material after class."
    }
  },
  reportBuild: {
    modes: ["deep", "concept"],
    label: { zh: "報告架構", en: "Report Builder" },
    description: {
      zh: "把內容整理成可延伸成段落與論點的骨架，適合報告、作業或口頭發表前打底。",
      en: "Shapes the material into a structure of arguments and sections for reports, assignments, or presentations."
    }
  },
  knowledgeBuild: {
    modes: ["quick", "concept"],
    label: { zh: "知識累積", en: "Knowledge Builder" },
    description: {
      zh: "同時保留摘要效率與觀念關聯，適合想把內容穩定收進自己的知識庫。",
      en: "Keeps summary speed while building concept connections, ideal for steadily growing your knowledge base."
    }
  }
};
const legacyModeToNoteMode = {
  simple: "quick",
  report: "deep",
  exam: "exam"
};
const noteModeOrder = ["quick", "deep", "exam", "quiz", "concept", "mistake"];
const noteStrategyOrder = ["quickCapture", "examSprint", "deepFocus", "reportBuild", "knowledgeBuild"];
const tutorModeConfigs = {
  quickExplain: {
    label: { zh: "快速解釋", en: "Quick Explain" },
    description: {
      zh: "先用最短路徑講清楚核心概念，再補一個最值得追問的方向。",
      en: "Explain the core idea in the shortest path first, then suggest one high-value follow-up."
    }
  },
  deepTeach: {
    label: { zh: "深入教學", en: "Deep Teach" },
    description: {
      zh: "更像老師帶你拆概念，會補前後脈絡、比較與例子。",
      en: "Acts more like a teacher, adding context, comparisons, and examples."
    }
  },
  examCoach: {
    label: { zh: "考前問答", en: "Exam Coach" },
    description: {
      zh: "回答會更偏向常考重點、答題句型與老師可能怎麼問。",
      en: "Answers lean toward likely exam points, answer framing, and probable question wording."
    }
  },
  answerDrill: {
    label: { zh: "作答演練", en: "Answer Drill" },
    description: {
      zh: "更適合互動練習，會更積極追問、出題與批改。",
      en: "Best for interactive practice, with more follow-up, quizzing, and correction."
    }
  }
};
let currentTutorSource = null;
let currentOpenedNotePayload = null;
let currentExportContext = {
  source: null,
  payload: null
};
const fallbackTutorSourceMessage = {
  title: "尚未選擇筆記",
  meta: "請先從「我的筆記」或「知識庫」選擇一份資料。"
};

function getCurrentLanguage() {
  return currentLanguage === "en" ? "en" : "zh";
}

function getI18nText(key, fallback = "") {
  const dict = i18n[getCurrentLanguage()] || i18n.zh;
  return dict[key] || fallback;
}

function normalizePlainList(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      if (typeof item === "string") {
        return normalizeText(item);
      }
      if (item && typeof item === "object") {
        return normalizeText(item.text || item.label || item.question || item.description || "");
      }
      return "";
    })
    .filter(Boolean);
}

function normalizeQuestionList(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      if (typeof item === "string") {
        return normalizeText(item);
      }
      if (item && typeof item === "object") {
        return normalizeText([item.question, item.answer].filter(Boolean).join("｜"));
      }
      return "";
    })
    .filter(Boolean);
}

function normalizeLatestStudyResult(result) {
  if (!result || typeof result !== "object") {
    return null;
  }

  const sourceSections = Array.isArray(result.sourceSections)
    ? result.sourceSections.map((section) => ({
      title: section.title || "",
      text: section.text || "",
      pageNumber: Number(section.pageNumber) || null,
      paragraphNumber: Number(section.paragraphNumber) || null
    }))
    : [];

  const summary = normalizeText(result.summary || result.chinese?.summary || "");
  const importantSentences = normalizePlainList(result.importantSentences || result.chinese?.importantSentences);
  const possibleExamPoints = normalizePlainList(result.possibleExamPoints || result.chinese?.possibleExamPoints);
  const formulas = normalizePlainList(result.formulas || result.chinese?.formulas);
  const generalNotes = normalizePlainList(result.generalNotes || result.chinese?.generalNotes);
  const accountingTerms = normalizePlainList(result.keyTerms || result.accountingTerms || result.chinese?.keyTerms || result.chinese?.accountingTerms);
  const englishExplain = normalizePlainList(result.englishExplain || result.englishExplanations || result.chinese?.englishExplanations);
  const questions = normalizeQuestionList(result.questions || result.chinese?.questions);
  const mockExam = normalizeQuestionList(result.practiceQuestions || result.mockExam || result.mockExamQuestions || result.chinese?.practiceQuestions || result.chinese?.mockExamQuestions);
  const journalQuestions = normalizeQuestionList(result.specializedQuestions || result.journalQuestions || result.journalEntryQuestions || result.chinese?.specializedQuestions || result.chinese?.journalEntryQuestions);

  return {
    sourceText: normalizeText(result.sourceText || result.cleanedText || ""),
    mode: result.mode || "exam",
    analysisType: result.analysisType || result.analysisEnhancement || "local",
    summary,
    importantSentences,
    possibleExamPoints,
    formulas,
    generalNotes,
    accountingTerms,
    englishExplain,
    questions,
    mockExam,
    journalQuestions,
    sourceMeta: result.sourceMeta || null,
    sourceSections,
    createdAt: result.createdAt || result.analyzedAt || new Date().toISOString()
  };
}

function convertLatestStudyResultToAnalysisResult(result) {
  const latest = normalizeLatestStudyResult(result);
  if (!latest) {
    return null;
  }

  const buildInfoBlocks = (items) => items.map((text, index) => ({
    label: `重點 ${index + 1}`,
    description: text
  }));

  const buildQuestionBlocks = (items) => items.map((text) => ({
    question: text,
    answer: ""
  }));

  return {
    analyzedAt: latest.createdAt,
    createdAt: latest.createdAt,
    mode: latest.mode,
    modeLabel: modeConfigs[latest.mode]?.label || modeConfigs.exam.label,
    sourceText: latest.sourceText,
    cleanedText: latest.sourceText,
    analysisEnhancement: latest.analysisType,
    sourceMeta: latest.sourceMeta || null,
    sourceSections: latest.sourceSections || [],
    chinese: {
      summary: latest.summary,
      importantSentences: latest.importantSentences.map((text) => ({ text })),
      possibleExamPoints: latest.possibleExamPoints.map((text) => ({ text })),
      formulas: buildInfoBlocks(latest.formulas),
      generalNotes: latest.generalNotes.map((text) => ({ text })),
      accountingTerms: latest.accountingTerms.map((text) => ({ label: text, description: "" })),
      keyTerms: latest.accountingTerms.map((text) => ({ label: text, description: "" })),
      englishExplanations: buildInfoBlocks(latest.englishExplain),
      questions: buildQuestionBlocks(latest.questions),
      mockExamQuestions: buildQuestionBlocks(latest.mockExam),
      practiceQuestions: buildQuestionBlocks(latest.mockExam),
      journalEntryQuestions: buildQuestionBlocks(latest.journalQuestions),
      specializedQuestions: buildQuestionBlocks(latest.journalQuestions),
      keywords: latest.accountingTerms.map((text) => ({ text })),
      highlights: latest.possibleExamPoints.map((text) => ({ text }))
    }
  };
}

function buildAnalysisResultFromRagContext(context) {
  if (!context?.answer && !(context?.sources || []).length) {
    return null;
  }

  const sourceText = normalizeText([
    context.question ? `問題：${context.question}` : "",
    context.answer || "",
    ...(context.sources || []).map((item) => item.quote || item.content || item.text || "")
  ].filter(Boolean).join("\n\n"));

  const points = buildExamFocusFromRagPayload({
    answer: context.answer || "",
    sources: context.sources || []
  }).map((item) => item.replace(/^\d+\.\s*/, ""));

  return convertLatestStudyResultToAnalysisResult({
    sourceText,
    mode: "exam",
    analysisType: "local",
    summary: context.answer || "這是最近一次 RAG 問答整理出的知識摘要。",
    importantSentences: (context.sources || []).map((item) => item.quote || item.content || item.text || "").filter(Boolean).slice(0, 4),
    possibleExamPoints: points,
    accountingTerms: [...new Set((context.sources || []).map((item) => item.fileName).filter(Boolean))].slice(0, 5),
    questions: context.question ? [context.question] : [],
    createdAt: context.createdAt || new Date().toISOString()
  });
}

function saveLatestStudyResult(result) {
  const payload = normalizeLatestStudyResult(result);
  if (!payload) {
    return;
  }
  saveToStorage(SMARTSTUDY_LATEST_RESULT_KEY, payload);
}

function loadLatestStudyResult() {
  try {
    const parsed = loadFromStorage(SMARTSTUDY_LATEST_RESULT_KEY, null);
    if (parsed) {
      const payload = normalizeLatestStudyResult(parsed);
      if (payload) {
        const hasUsefulContent = Boolean(payload.summary)
          || payload.importantSentences.length > 0
          || payload.possibleExamPoints.length > 0
          || Boolean(payload.sourceText);
        if (hasUsefulContent) {
          return payload;
        }
      }
    }
  } catch (error) {
    console.error("讀取最近一次整理結果失敗：", error);
  }

  try {
    const parsedAnalysis = loadFromStorage(LATEST_ANALYSIS_STORAGE_KEY, null);
    if (!parsedAnalysis) {
      return null;
    }
    return normalizeLatestStudyResult(parsedAnalysis);
  } catch (error) {
    return null;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save storage:", key, error);
  }
}

function loadFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    try {
      return JSON.parse(raw);
    } catch (parseError) {
      return raw;
    }
  } catch (error) {
    console.error("Failed to load storage:", key, error);
    return fallback;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove storage:", key, error);
  }
}

function saveJsonStorage(key, value) {
  saveToStorage(key, value);
}

function loadJsonStorage(key) {
  return loadFromStorage(key, null);
}

function debounce(callback, wait = 180) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function yieldToBrowser() {
  return new Promise((resolve) => {
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(() => resolve());
      return;
    }
    window.setTimeout(resolve, 0);
  });
}

function loadRagTutorTransfer() {
  return loadJsonStorage(RAG_TO_TUTOR_STORAGE_KEY);
}

function loadRagStudyAgentTransfer() {
  return loadJsonStorage(RAG_TO_STUDY_AGENT_STORAGE_KEY);
}

function saveLatestAnalysis(result) {
  if (!result) {
    return;
  }
  saveToStorage(LATEST_ANALYSIS_STORAGE_KEY, result);
  saveLatestStudyResult(result);
}

function loadLatestAnalysis() {
  try {
    const saved = loadFromStorage(LATEST_ANALYSIS_STORAGE_KEY, null);
    if (saved) {
      return saved;
    }
    const latestResult = loadLatestStudyResult();
    return latestResult ? convertLatestStudyResultToAnalysisResult(latestResult) : null;
  } catch (error) {
    const latestResult = loadLatestStudyResult();
    return latestResult ? convertLatestStudyResultToAnalysisResult(latestResult) : null;
  }
}

function loadLocalKnowledgeStore() {
  try {
    const parsedChunks = loadFromStorage(KNOWLEDGE_CHUNKS_KEY, null);
    if (Array.isArray(parsedChunks)) {
      const files = [...new Set(parsedChunks.map((chunk) => chunk.fileName).filter(Boolean))];
      return {
        fileCount: files.length,
        chunkCount: parsedChunks.length,
        chunks: parsedChunks,
        files,
        updatedAt: parsedChunks[0]?.createdAt || null
      };
    }
    const parsed = loadFromStorage(LOCAL_RAG_STORAGE_KEY, null);
    if (!parsed || !Array.isArray(parsed.chunks)) {
      return { fileCount: 0, chunkCount: 0, chunks: [], files: [], updatedAt: null };
    }
    return {
      fileCount: Number(parsed.fileCount) || 0,
      chunkCount: Number(parsed.chunkCount) || 0,
      chunks: parsed.chunks,
      files: Array.isArray(parsed.files) ? parsed.files : [],
      updatedAt: parsed.updatedAt || null
    };
  } catch (error) {
    return { fileCount: 0, chunkCount: 0, chunks: [], files: [], updatedAt: null };
  }
}

function saveLocalKnowledgeStore(store) {
  saveToStorage(LOCAL_RAG_STORAGE_KEY, store);
  saveToStorage(KNOWLEDGE_CHUNKS_KEY, Array.isArray(store?.chunks) ? store.chunks : []);
}

const KNOWLEDGE_SEED_VERSION = "2026-05-multidomain-seed-v5";

function buildSeedKnowledgeDocuments() {
  const rawSeedDocuments = Array.isArray(window.SMARTSTUDY_KNOWLEDGE_SEED_DOCUMENTS)
    ? window.SMARTSTUDY_KNOWLEDGE_SEED_DOCUMENTS
    : [];

  return rawSeedDocuments
    .map((document) => ({
      ...document,
      sections: Array.isArray(document.sections)
        ? document.sections.map((section, index) => ({
            ...section,
            paragraphNumber: typeof section.paragraphNumber === "number"
              ? section.paragraphNumber
              : index + 1
          }))
        : []
    }));
}

function ensureSeedKnowledgeBase() {
  const seedDocuments = buildSeedKnowledgeDocuments();
  const expectedSeedFiles = seedDocuments.map((document) => document.fileName);
  const seededVersion = loadFromStorage(KNOWLEDGE_SEED_VERSION_KEY, "");
  const store = loadLocalKnowledgeStore();
  const existingSeedFiles = new Set(
    (store.files || [])
      .filter((fileName) => String(fileName || "").startsWith("SmartStudy Seed - "))
  );

  if (seededVersion === KNOWLEDGE_SEED_VERSION && expectedSeedFiles.every((fileName) => existingSeedFiles.has(fileName))) {
    return;
  }

  const nonSeedChunks = (store.chunks || []).filter((chunk) => !String(chunk.fileName || "").startsWith("SmartStudy Seed - "));
  const nonSeedFiles = [...new Set(nonSeedChunks.map((chunk) => chunk.fileName).filter(Boolean))];

  saveLocalKnowledgeStore({
    fileCount: nonSeedFiles.length,
    chunkCount: nonSeedChunks.length,
    files: nonSeedFiles,
    chunks: nonSeedChunks,
    updatedAt: new Date().toISOString()
  });

  mergeDocumentsIntoLocalKnowledge(seedDocuments);
  saveToStorage(KNOWLEDGE_SEED_VERSION_KEY, KNOWLEDGE_SEED_VERSION);
}

function reloadSeedKnowledgeBase() {
  const store = loadLocalKnowledgeStore();
  const nonSeedChunks = (store.chunks || []).filter((chunk) => !String(chunk.fileName || "").startsWith("SmartStudy Seed - "));
  const nonSeedFiles = [...new Set(nonSeedChunks.map((chunk) => chunk.fileName).filter(Boolean))];

  saveLocalKnowledgeStore({
    fileCount: nonSeedFiles.length,
    chunkCount: nonSeedChunks.length,
    files: nonSeedFiles,
    chunks: nonSeedChunks,
    updatedAt: new Date().toISOString()
  });

  removeFromStorage(KNOWLEDGE_SEED_VERSION_KEY);
  ensureSeedKnowledgeBase();
  refreshKnowledgeStats();
  refreshKnowledgeBaseStatus();
  refreshKnowledgeAssistPreviewFromCurrentInput();
  updateKnowledgeResults();

  setKnowledgeStatus(
    currentLanguage === "en" ? "Demo knowledge base rebuilt" : "示範知識庫已重建",
    currentLanguage === "en"
      ? "Fresh multi-domain seed content has been loaded into the local knowledge base."
      : "已重新載入多領域示範內容到本地知識庫。"
  );
  showToast(
    currentLanguage === "en" ? "Demo knowledge ready" : "示範知識庫已更新",
    currentLanguage === "en"
      ? "You can search it now or use it as note support."
      : "現在可以直接搜尋，或拿來當作筆記整理的輔助內容。",
    "success"
  );
}

function setCurrentLanguage(language) {
  currentLanguage = language === "en" ? "en" : "zh";
}

function getLanguageInstruction() {
  if (currentLanguage === "en") {
    return [
      "Please answer entirely in English.",
      "Do not mix Chinese unless the original source term requires it.",
      "Use clear explanations suitable for a student."
    ].join(" ");
  }

  return [
    "請全部使用繁體中文回答。",
    "不要中英文夾雜，除非原文必要名詞本身是英文。",
    "請用適合學生理解的方式清楚解釋。"
  ].join(" ");
}

function buildNotePrompt({ text, mode, originalText = "", knowledgeChunks = [] }) {
  const hasKnowledgeSupport = Array.isArray(knowledgeChunks) && knowledgeChunks.length > 0;
  const originalSection = normalizeText(originalText || text);
  const supportSection = hasKnowledgeSupport
    ? knowledgeChunks
        .map((chunk, index) => {
          const title = normalizeText(chunk.sectionTitle || chunk.fileName || `${currentLanguage === "en" ? "Support passage" : "補充片段"} ${index + 1}`);
          const content = normalizeText(chunk.content || chunk.text || "");
          return `${currentLanguage === "en" ? `Support passage ${index + 1}` : `補充片段 ${index + 1}`}｜${title}\n${content}`;
        })
        .join("\n\n")
    : "";

  return `
你是 SmartStudy AI 筆記整理助手。

${getLanguageInstruction()}

${currentLanguage === "en"
    ? "Please organize the note based on the original note content below."
    : "請根據下方的原始筆記內容整理筆記。"}

${currentLanguage === "en" ? "Original note content:" : "原始筆記內容："}
${originalSection}

${hasKnowledgeSupport
    ? `${currentLanguage === "en"
        ? "The following knowledge-base passages are only supporting references. Use them only when they genuinely help clarify or complete the original note, and do not let them override the original note's focus."
        : "以下是知識庫補充段落，只能作為輔助參考。只有在能幫助澄清或補足原始筆記時才可引用，不要讓它們蓋掉原始筆記本身的重點。"}

${currentLanguage === "en" ? "Knowledge-base support:" : "知識庫補充段落："}
${supportSection}`
    : ""}

整理模式：${mode}

請輸出以下區塊：
1. 智慧摘要
2. 可能重點
3. 考題預測
4. 關鍵字整理
5. 易錯觀念
6. 概念連結

格式要求：
- 每個區塊都要有 preview 與 detail。
- preview 是 1～2 句核心重點。
- detail 是較完整的解釋。
- 不要使用重複模板化開頭。
- 不要只寫籠統描述，要有具體觀念與說明。
- 優先以原始筆記內容為主，知識庫只作補充，不要把補充段落當成主題本體。
`.trim();
}

function buildKnowledgeAssistQuery(text) {
  const normalized = normalizeText(text);
  const firstLines = normalized
    .split(/\n+/)
    .map((line) => normalizeText(line))
    .filter(Boolean)
    .slice(0, 6)
    .join(" ");

  return normalizeText(firstLines || normalized).slice(0, 600);
}

function retrieveKnowledgeSupportForNote(text, limit = 3) {
  const store = loadLocalKnowledgeStore();
  const chunks = Array.isArray(store?.chunks) ? store.chunks : [];
  if (!chunks.length) {
    return [];
  }

  const query = buildKnowledgeAssistQuery(text);
  const queryTokens = tokenize(query);
  if (!queryTokens.length) {
    return [];
  }

  return chunks
    .map((item) => ({
      ...item,
      score: scoreTextAgainstQuestion(queryTokens, item.content || item.text || "")
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.content || b.text || "").length - (a.content || a.text || "").length)
    .slice(0, limit);
}

function buildNoteAnalysisSupport(text) {
  const shouldUseKnowledge = Boolean(useKnowledgeBaseCheckbox?.checked);
  if (!shouldUseKnowledge) {
    return {
      shouldUseKnowledge,
      matchedChunks: [],
      analysisText: text,
      promptText: text
    };
  }

  const matchedChunks = retrieveKnowledgeSupportForNote(text, 3);
  if (!matchedChunks.length) {
    return {
      shouldUseKnowledge,
      matchedChunks: [],
      analysisText: text,
      promptText: text
    };
  }

  const supportText = matchedChunks
    .map((chunk, index) => {
      const heading = chunk.sectionTitle || chunk.fileName || `知識片段 ${index + 1}`;
      return `[補充資料 ${index + 1}] ${heading}\n${normalizeText(chunk.content || chunk.text || "")}`;
    })
    .join("\n\n");

  const combinedText = normalizeText([
    text,
    currentLanguage === "en" ? "Knowledge base support:" : "知識庫補充段落：",
    supportText
  ].join("\n\n"));

  return {
    shouldUseKnowledge,
    matchedChunks,
    analysisText: combinedText,
    promptText: combinedText
  };
}

function renderKnowledgeAssistPreview(chunks = null) {
  if (!knowledgeAssistPreviewList || !knowledgeAssistPreviewSubtitle) {
    return;
  }

  if (!Boolean(useKnowledgeBaseCheckbox?.checked)) {
    knowledgeAssistPreviewSubtitle.textContent = currentLanguage === "en"
      ? "Knowledge-base support is off, so no preview is shown."
      : "目前已關閉知識庫輔助，因此不顯示引用預覽。";
    knowledgeAssistPreviewList.innerHTML = `<p class="empty-state">${currentLanguage === "en" ? "Turn on knowledge support to preview referenced passages." : "開啟知識庫輔助後，這裡會顯示引用預覽。"}</p>`;
    return;
  }

  if (!Array.isArray(chunks)) {
    knowledgeAssistPreviewSubtitle.textContent = currentLanguage === "en"
      ? "Type or upload content first to preview the referenced knowledge passages."
      : "請先輸入或上傳內容，才會顯示這次可能引用的知識片段。";
    knowledgeAssistPreviewList.innerHTML = `<p class="empty-state">${currentLanguage === "en" ? "No preview yet." : "目前尚未顯示知識庫引用預覽。"}</p>`;
    return;
  }

  if (!chunks.length) {
    knowledgeAssistPreviewSubtitle.textContent = currentLanguage === "en"
      ? "No relevant supporting passage was found for the current note."
      : "目前沒有找到與這份筆記相關的補充段落。";
    knowledgeAssistPreviewList.innerHTML = `<p class="empty-state">${currentLanguage === "en" ? "No matching knowledge passage found." : "目前沒有符合的知識片段。"}</p>`;
    return;
  }

  knowledgeAssistPreviewSubtitle.textContent = currentLanguage === "en"
    ? `Previewing ${chunks.length} supporting passage(s) that will be referenced in this run.`
    : `目前預覽本次會引用的 ${chunks.length} 段補充內容。`;

  knowledgeAssistPreviewList.innerHTML = chunks.map((chunk, index) => {
    const title = escapeHTML(normalizeText(chunk.sectionTitle || chunk.fileName || `${currentLanguage === "en" ? "Support passage" : "補充片段"} ${index + 1}`));
    const content = escapeHTML(extractPreviewText(normalizeText(chunk.content || chunk.text || ""), currentLanguage === "en" ? "No content." : "無內容。", 180));
    return `
      <article class="notes-knowledge-preview-item">
        <strong>${currentLanguage === "en" ? `Support ${index + 1}` : `補充 ${index + 1}`}｜${title}</strong>
        <p>${content}</p>
      </article>
    `;
  }).join("");
}

function refreshKnowledgeAssistPreviewFromCurrentInput() {
  const currentText = normalizeText(sourceText?.value || "");
  if (!currentText) {
    updateKnowledgeAssistStatus();
    renderKnowledgeAssistPreview(null);
    return;
  }

  const support = buildNoteAnalysisSupport(currentText);
  updateKnowledgeAssistStatus(support.matchedChunks);
  renderKnowledgeAssistPreview(support.matchedChunks);
}

function detectSubject(text) {
  return inferSubjectFromText(normalizeText(text || ""), "", getDefaultSubjectLabel());
}

function extractTags(text) {
  const normalized = normalizeText(text || "").toLowerCase();
  const tags = [];

  if (/(摘要|summary|總結|overview)/i.test(normalized)) tags.push("summary");
  if (/(重點|key point|核心|important)/i.test(normalized)) tags.push("keyPoints");
  if (/(考題|quiz|question|測驗|題目)/i.test(normalized)) tags.push("quiz");
  if (/(關鍵字|keyword|term|名詞)/i.test(normalized)) tags.push("keywords");
  if (/(易錯|mistake|混淆|confuse)/i.test(normalized)) tags.push("mistakes");
  if (/(概念|concept|關聯|connection)/i.test(normalized)) tags.push("concepts");

  return [...new Set(tags)];
}

function AI_generateNote(text, options = {}) {
  const normalizedText = normalizeText(text || "");
  const titleSeed = normalizeText(options.title || normalizedText.split(/\n+/)[0] || "");
  const subject = detectSubject(normalizedText);
  const chapter = inferChapterFromText(normalizedText, titleSeed);
  const tags = extractTags(normalizedText);

  return {
    title: titleSeed || (currentLanguage === "en" ? "AI Generated Note" : "AI 生成筆記"),
    subject,
    chapter: chapter || (currentLanguage === "en" ? "Auto classified" : "自動分類"),
    tags,
    content: normalizedText
  };
}

function updateFilters(notes = getMyNotes()) {
  const normalizedNotes = Array.isArray(notes) ? notes : [];
  syncMyNotesSubjectFilterOptions(normalizedNotes);

  const knowledgeItems = getKnowledgeItems();
  syncKnowledgeSubjectFilterOptions(knowledgeItems);
  syncKnowledgeChapterFilterOptions(knowledgeItems);
  syncKnowledgeTagFilterOptions(knowledgeItems);

  renderMyNotes();
  updateKnowledgeResults();

  return {
    subjects: [...new Set(normalizedNotes.map((note) => normalizeText(note.subject)).filter(Boolean))],
    chapters: [...new Set(knowledgeItems.map((item) => normalizeText(item.chapter)).filter(Boolean))],
    tags: [...new Set(knowledgeItems.flatMap((item) => item.tags || buildDynamicTagKeys(item.result)))]
  };
}

async function generateNotes(fileText, useKnowledgeBase = true) {
  const normalizedText = normalizeText(fileText || "");
  if (!normalizedText) {
    return null;
  }

  sourceText.value = normalizedText;
  if (useKnowledgeBaseCheckbox) {
    useKnowledgeBaseCheckbox.checked = Boolean(useKnowledgeBase);
  }

  updateCounts();
  refreshKnowledgeAssistPreviewFromCurrentInput();

  const result = await handleGenerateNotes();
  if (!result) {
    return null;
  }

  updateFilters(getMyNotes());
  return getMyNotes()[0] || null;
}

function updateKnowledgeAssistStatus(chunks = null) {
  if (!knowledgeAssistStatus || !knowledgeAssistMeta) {
    return;
  }

  const useKnowledge = Boolean(useKnowledgeBaseCheckbox?.checked);
  if (!useKnowledge) {
    knowledgeAssistStatus.textContent = currentLanguage === "en"
      ? "Knowledge-base support is currently turned off."
      : "目前已關閉知識庫輔助。";
    knowledgeAssistMeta.textContent = currentLanguage === "en"
      ? "Only the text you upload or paste will be used to generate the note."
      : "系統只會使用你上傳或貼上的文字來整理筆記。";
    renderKnowledgeAssistPreview([]);
    return;
  }

  if (!Array.isArray(chunks)) {
    knowledgeAssistStatus.textContent = currentLanguage === "en"
      ? "Knowledge-base support is enabled."
      : "目前會引用知識庫輔助內容。";
    knowledgeAssistMeta.textContent = currentLanguage === "en"
      ? "If no relevant content exists yet, SmartStudy AI will organize only your uploaded or pasted text."
      : "如果目前知識庫沒有相關內容，系統會只整理你上傳或貼上的文字。";
    return;
  }

  if (!chunks.length) {
    knowledgeAssistStatus.textContent = currentLanguage === "en"
      ? "Knowledge-base support is enabled, but no relevant passage was found."
      : "已啟用知識庫輔助，但目前沒有找到相關段落。";
    knowledgeAssistMeta.textContent = currentLanguage === "en"
      ? "This run will organize only the file text itself."
      : "本次會只整理檔案本身的內容。";
    return;
  }

  const titles = chunks
    .map((chunk) => normalizeText(chunk.sectionTitle || chunk.fileName || ""))
    .filter(Boolean)
    .slice(0, 3);

  knowledgeAssistStatus.textContent = currentLanguage === "en"
    ? `Knowledge-base support is enabled and ${chunks.length} relevant passage(s) will be referenced.`
    : `已啟用知識庫輔助，將引用 ${chunks.length} 段最相關內容。`;
  knowledgeAssistMeta.textContent = titles.length
    ? (currentLanguage === "en"
        ? `Referenced sources: ${titles.join(", ")}`
        : `引用來源：${titles.join("、")}`)
    : (currentLanguage === "en"
        ? "Relevant supporting passages were found in the current knowledge base."
        : "已從目前知識庫找到相關補充段落。");
}

function buildTutorPrompt({ question, source }) {
  const sourceContent = source
    ? JSON.stringify(source.result || source.content || source, null, 2)
    : "目前沒有指定資料。";
  const tutorMode = tutorModeConfigs[currentTutorMode] || tutorModeConfigs.quickExplain;

  return `
你是 SmartStudy AI 的 AI Tutor 問答老師。

${getLanguageInstruction()}

請只根據「目前選取資料」回答。
不要引用其他科目、其他章節或無關內容。

目前選取資料：
${sourceContent}

使用者問題：
${question}

目前教學模式：
${tutorMode.label.zh} / ${tutorMode.label.en}
${tutorMode.description.zh}

回答格式：
1. 重點
2. 解釋
3. 考試可能問法

如果目前沒有選取資料，請提醒使用者先選擇筆記，不要假裝有資料。
`.trim();
}

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeLine(line) {
  return normalizeText((line || "").replace(/\s+/g, " "));
}

function dedupeAdjacentPhrase(text, phrase) {
  if (!text || !phrase) {
    return text || "";
  }

  const escaped = escapeRegExp(phrase);
  return text.replace(new RegExp(`(?:${escaped}\\s*){2,}`, "g"), (match) => {
    const trailingWhitespace = /\s$/.test(match) ? " " : "";
    return `${phrase}${trailingWhitespace}`;
  });
}

function polishGeneratedStudyText(text) {
  if (!text) {
    return "";
  }

  let output = text
    .replace(/([\u4e00-\u9fff]{1,12})\s*['’]s\b/g, "$1")
    .replace(/([「『“"])\s+/g, "$1")
    .replace(/\s+([」』”"])/g, "$1");

  [...accountingReferenceEntries]
    .map((entry) => entry.term)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      output = dedupeAdjacentPhrase(output, term);
    });

  return output
    .replace(/([「『“"])([\u4e00-\u9fffA-Za-z]{2,})([」』”"])\s+\2/g, "$1$2$3")
    .replace(/([\u4e00-\u9fff]{2,})\s+\1/g, "$1")
    .replace(/([\u4e00-\u9fff]{2,})(?:\1)+/g, "$1")
    .replace(/([A-Za-z][A-Za-z' -]{1,})\s+\1/gi, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([，。；：！？,.!?])/g, "$1")
    .trim();
}

function rotateArray(items, offset = 0) {
  if (!items.length) {
    return [];
  }
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return items.slice(safeOffset).concat(items.slice(0, safeOffset));
}

function getSelectedEnhancement() {
  if (analysisEnhancement?.value === "hybrid") {
    return "local";
  }
  return enhancementConfigs[analysisEnhancement?.value] ? analysisEnhancement.value : "local";
}

function getEnhancementLabel() {
  return enhancementConfigs[getSelectedEnhancement()]?.label || enhancementConfigs.local.label;
}

function persistEnhancementPreference() {
  saveToStorage(ANALYSIS_ENHANCEMENT_STORAGE_KEY, getSelectedEnhancement());
}

function restoreEnhancementPreference() {
  if (IS_STATIC_PAGES_MODE && analysisEnhancement) {
    analysisEnhancement.value = "local";
    return;
  }
  const saved = loadFromStorage(ANALYSIS_ENHANCEMENT_STORAGE_KEY, null);
  if (saved === "hybrid" && analysisEnhancement) {
    analysisEnhancement.value = "local";
    return;
  }
  if (saved && enhancementConfigs[saved] && analysisEnhancement) {
    analysisEnhancement.value = saved;
  }
}

function getUiText(key) {
  return uiTranslations[currentLanguage]?.[key] || uiTranslations.zh[key] || "";
}

function applyTemplate(template, values = {}) {
  return Object.entries(values).reduce(
    (output, [key, value]) => output.replaceAll(`{${key}}`, String(value)),
    template
  );
}

function restoreDisplayLanguagePreference() {
  const saved = loadFromStorage(DISPLAY_LANGUAGE_STORAGE_KEY, "zh");
  if (saved === "zh" || saved === "en") {
    setCurrentLanguage(saved);
  } else {
    setCurrentLanguage("zh");
  }
}

function persistDisplayLanguagePreference() {
  saveToStorage(DISPLAY_LANGUAGE_STORAGE_KEY, currentLanguage);
}

function syncPagesCompatibleOptions() {
  const futureAiOption = analysisEnhancement?.querySelector('option[value="future-ai"]');
  if (futureAiOption) {
    futureAiOption.disabled = IS_STATIC_PAGES_MODE;
    futureAiOption.hidden = IS_STATIC_PAGES_MODE;
  }
  if (IS_STATIC_PAGES_MODE && analysisEnhancement) {
    analysisEnhancement.value = "local";
  }

  const advancedRagOption = ragModeSelect?.querySelector('option[value="advanced"]');
  if (advancedRagOption) {
    advancedRagOption.disabled = IS_STATIC_PAGES_MODE;
    advancedRagOption.hidden = IS_STATIC_PAGES_MODE;
  }
  if (IS_STATIC_PAGES_MODE && ragModeSelect) {
    ragModeSelect.value = "local";
  }
}

function getSelectedRagMode() {
  return ragModeSelect?.value === "advanced" ? "advanced" : "local";
}

function persistRagModePreference() {
  saveToStorage(RAG_MODE_STORAGE_KEY, getSelectedRagMode());
}

function restoreRagModePreference() {
  if (IS_STATIC_PAGES_MODE && ragModeSelect) {
    ragModeSelect.value = "local";
    return;
  }
  const saved = loadFromStorage(RAG_MODE_STORAGE_KEY, null);
  if ((saved === "local" || saved === "advanced") && ragModeSelect) {
    ragModeSelect.value = saved;
  }
}

function pickDisplayEnglish(entry) {
  if (entry.displayEnglish) {
    return entry.displayEnglish;
  }

  const englishAliases = (entry.aliases || []).filter((alias) => /^[A-Za-z][A-Za-z0-9' -]*$/.test(alias));
  return englishAliases
    .map((alias, index) => ({
      alias,
      index,
      wordCount: alias.trim().split(/\s+/).length
    }))
    .sort((a, b) => b.wordCount - a.wordCount || a.alias.length - b.alias.length || a.index - b.index)[0]?.alias || entry.term;
}

function formatEnglishDisplayLabel(label) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (/^[A-Z0-9-]+$/.test(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function buildBilingualLabel(entry) {
  const english = formatEnglishDisplayLabel(pickDisplayEnglish(entry));
  return `${english}(${entry.term})`;
}

const financeKnowledgeBase = rawFinanceKnowledgeBase.map((entry) => ({
  ...entry,
  displayEnglish: formatEnglishDisplayLabel(pickDisplayEnglish(entry)),
  bilingualLabel: buildBilingualLabel(entry)
}));

const accountingGlossary = {
  financial_statement: [
    ["Financial Statements", "財務報表", "statement", 10, ["financial statements"]],
    ["Balance Sheet", "資產負債表", "statement", 10, ["statement of financial position"]],
    ["Income Statement", "損益表", "statement", 10, ["statement of comprehensive income"]],
    ["Statement of Cash Flows", "現金流量表", "statement", 10, ["cash flow statement"]],
    ["Statement of Changes in Equity", "權益變動表", "statement", 9, []],
    ["Notes to Financial Statements", "財務報表附註", "statement", 8, []],
    ["Annual Report", "年報", "statement", 7, []],
    ["Interim Financial Report", "期中財務報告", "statement", 7, []]
  ],
  assets_liabilities_equity: [
    ["Assets", "資產", "concept", 10, []],
    ["Current Assets", "流動資產", "concept", 10, []],
    ["Non-current Assets", "非流動資產", "concept", 9, ["noncurrent assets"]],
    ["Cash", "現金", "account", 10, []],
    ["Cash and Cash Equivalents", "現金及約當現金", "account", 10, ["cash equivalents"]],
    ["Accounts Receivable", "應收帳款", "account", 10, ["trade receivables"]],
    ["Notes Receivable", "應收票據", "account", 9, []],
    ["Allowance for Doubtful Accounts", "備抵呆帳", "account", 9, []],
    ["Inventory", "存貨", "account", 10, ["inventories"]],
    ["Prepaid Expenses", "預付費用", "account", 8, ["prepaid expense"]],
    ["Supplies", "用品盤存", "account", 7, []],
    ["Property, Plant and Equipment", "不動產、廠房及設備", "account", 10, ["ppe", "property plant and equipment"]],
    ["Land", "土地", "account", 8, []],
    ["Buildings", "建築物", "account", 8, ["building"]],
    ["Equipment", "設備", "account", 8, []],
    ["Machinery", "機器設備", "account", 8, ["machinery and equipment"]],
    ["Vehicles", "運輸設備", "account", 7, ["transportation equipment"]],
    ["Accumulated Depreciation", "累計折舊", "account", 8, []],
    ["Intangible Assets", "無形資產", "account", 8, []],
    ["Goodwill", "商譽", "account", 7, []],
    ["Patent", "專利權", "account", 7, []],
    ["Trademark", "商標權", "account", 7, []],
    ["Copyright", "著作權", "account", 6, []],
    ["Investment Property", "投資性不動產", "account", 7, []],
    ["Long-term Investments", "長期投資", "account", 8, ["long term investments"]]
  ],
  liabilities: [
    ["Liabilities", "負債", "concept", 10, []],
    ["Current Liabilities", "流動負債", "concept", 10, []],
    ["Non-current Liabilities", "非流動負債", "concept", 9, ["noncurrent liabilities"]],
    ["Accounts Payable", "應付帳款", "account", 10, ["trade payables"]],
    ["Notes Payable", "應付票據", "account", 9, []],
    ["Accrued Expenses", "應計費用", "accounting", 8, ["accrued expense"]],
    ["Salaries Payable", "應付薪資", "account", 9, ["wages payable", "salaries wages payable"]],
    ["Interest Payable", "應付利息", "account", 8, []],
    ["Income Tax Payable", "應付所得稅", "account", 8, []],
    ["Unearned Revenue", "預收收入", "account", 9, ["deferred revenue"]],
    ["Short-term Borrowings", "短期借款", "account", 8, ["short term borrowings"]],
    ["Long-term Debt", "長期負債", "account", 8, ["long term debt"]],
    ["Bonds Payable", "應付公司債", "account", 8, []],
    ["Mortgage Payable", "應付抵押借款", "account", 7, []],
    ["Lease Liability", "租賃負債", "account", 7, ["lease liabilities"]],
    ["Provisions", "負債準備", "account", 6, ["provision"]]
  ],
  equity: [
    ["Equity", "權益", "concept", 10, []],
    ["Shareholders' Equity", "股東權益", "equity", 9, ["stockholders' equity"]],
    ["Owner's Equity", "業主權益", "equity", 8, []],
    ["Common Stock", "普通股", "equity", 9, []],
    ["Preferred Stock", "特別股", "equity", 8, []],
    ["Share Capital", "股本", "equity", 8, ["capital stock"]],
    ["Additional Paid-in Capital", "資本公積", "equity", 8, []],
    ["Retained Earnings", "保留盈餘", "equity", 10, []],
    ["Accumulated Other Comprehensive Income", "累積其他綜合損益", "equity", 7, ["aoci"]],
    ["Treasury Stock", "庫藏股", "equity", 8, []],
    ["Dividends", "股利", "equity", 8, []],
    ["Cash Dividends", "現金股利", "equity", 8, []],
    ["Stock Dividends", "股票股利", "equity", 7, []]
  ],
  income_statement: [
    ["Revenue", "收入", "concept", 10, []],
    ["Sales Revenue", "銷貨收入", "account", 10, ["sales revenues"]],
    ["Service Revenue", "服務收入", "account", 10, ["service revenues"]],
    ["Interest Revenue", "利息收入", "account", 8, ["interest income"]],
    ["Dividend Revenue", "股利收入", "account", 7, ["dividend income"]],
    ["Rent Revenue", "租金收入", "account", 7, []],
    ["Gains", "利益", "concept", 7, ["gain"]],
    ["Expenses", "費用", "concept", 10, ["expense"]],
    ["Cost of Goods Sold", "銷貨成本", "concept", 10, ["cogs"]],
    ["Salaries Expense", "薪資費用", "account", 10, ["salary expense", "wages expense", "salaries wages expense"]],
    ["Rent Expense", "租金費用", "account", 8, []],
    ["Depreciation Expense", "折舊費用", "account", 8, []],
    ["Amortization Expense", "攤銷費用", "account", 7, []],
    ["Interest Expense", "利息費用", "account", 8, []],
    ["Insurance Expense", "保險費", "account", 7, ["insurance expense"]],
    ["Utilities Expense", "水電費", "account", 7, []],
    ["Bad Debt Expense", "呆帳費用", "account", 7, ["bad debts expense"]],
    ["Income Tax Expense", "所得稅費用", "account", 8, []],
    ["Losses", "損失", "concept", 7, ["loss"]]
  ],
  profit_and_comprehensive_income: [
    ["Net Income", "淨利", "concept", 10, []],
    ["Net Loss", "淨損", "concept", 8, []],
    ["Gross Profit", "毛利", "concept", 9, []],
    ["Operating Income", "營業利益", "concept", 9, []],
    ["Operating Loss", "營業損失", "concept", 7, []],
    ["Profit", "利潤", "concept", 7, []],
    ["Profitability", "獲利能力", "ratio", 8, []],
    ["Comprehensive Income", "綜合損益", "concept", 8, []],
    ["Other Comprehensive Income", "其他綜合損益", "concept", 8, ["oci"]],
    ["Unrealized Gain", "未實現利益", "finance", 7, []],
    ["Unrealized Loss", "未實現損失", "finance", 7, []],
    ["Realized Gain", "已實現利益", "finance", 7, []],
    ["Realized Loss", "已實現損失", "finance", 7, []],
    ["Earnings Per Share", "每股盈餘", "ratio", 9, ["eps"]]
  ],
  cash_flow: [
    ["Cash Flow", "現金流量", "cashflow", 10, []],
    ["Operating Activities", "營業活動", "cashflow", 10, []],
    ["Investing Activities", "投資活動", "cashflow", 10, []],
    ["Financing Activities", "籌資活動", "cashflow", 10, []],
    ["Net Cash Provided by Operating Activities", "營業活動提供之淨現金", "cashflow", 8, []],
    ["Net Cash Used in Operating Activities", "營業活動使用之淨現金", "cashflow", 8, []],
    ["Free Cash Flow", "自由現金流量", "cashflow", 8, []],
    ["Cash Inflow", "現金流入", "cashflow", 7, []],
    ["Cash Outflow", "現金流出", "cashflow", 7, []]
  ],
  financial_ratio: [
    ["Financial Ratio", "財務比率", "ratio", 9, []],
    ["Ratio Analysis", "比率分析", "ratio", 8, []],
    ["Current Ratio", "流動比率", "ratio", 10, []],
    ["Acid-test Ratio", "速動比率", "ratio", 8, ["acid test ratio", "quick ratio"]],
    ["Debt Ratio", "負債比率", "ratio", 9, []],
    ["Debt to Equity Ratio", "負債權益比", "ratio", 9, []],
    ["Times Interest Earned", "利息保障倍數", "ratio", 8, []],
    ["Inventory Turnover", "存貨週轉率", "ratio", 9, []],
    ["Accounts Receivable Turnover", "應收帳款週轉率", "ratio", 8, []],
    ["Asset Turnover", "資產週轉率", "ratio", 8, []],
    ["Return on Assets", "資產報酬率", "ratio", 10, ["roa"]],
    ["Return on Equity", "權益報酬率", "ratio", 10, ["roe"]],
    ["Profit Margin", "純益率", "ratio", 9, []],
    ["Gross Profit Margin", "毛利率", "ratio", 9, []],
    ["Payout Ratio", "股利支付率", "ratio", 7, []],
    ["Price-Earnings Ratio", "本益比", "ratio", 8, ["pe ratio", "p/e ratio"]],
    ["Liquidity", "流動性", "ratio", 8, []],
    ["Solvency", "償債能力", "ratio", 8, []],
    ["Profitability Ratio", "獲利能力比率", "ratio", 7, []],
    ["Liquidity Ratio", "流動性比率", "ratio", 7, []]
  ],
  investment: [
    ["Financial Assets", "金融資產", "finance", 9, []],
    ["Financial Liabilities", "金融負債", "finance", 8, []],
    ["Fair Value", "公允價值", "finance", 9, []],
    ["Amortized Cost", "攤銷後成本", "finance", 8, []],
    ["FVTPL", "透過損益按公允價值衡量", "finance", 10, ["fair value through profit or loss"]],
    ["FVTOCI", "透過其他綜合損益按公允價值衡量", "finance", 10, ["fair value through other comprehensive income"]],
    ["Equity Investment", "權益投資", "finance", 8, []],
    ["Debt Investment", "債務投資", "finance", 8, []],
    ["Trading Securities", "交易目的證券", "finance", 7, []],
    ["Available-for-sale Securities", "備供出售金融資產", "finance", 7, ["available for sale securities"]],
    ["Held-to-maturity Securities", "持有至到期投資", "finance", 7, ["held to maturity securities"]],
    ["Bond Investment", "債券投資", "finance", 7, []],
    ["Stock Investment", "股票投資", "finance", 7, []],
    ["Dividend Income", "股利收入", "finance", 7, []],
    ["Interest Income", "利息收入", "finance", 7, []]
  ],
  journal_entry: [
    ["Debit", "借方", "accounting", 10, []],
    ["Credit", "貸方", "accounting", 10, []],
    ["Journal Entry", "分錄", "accounting", 10, []],
    ["Adjusting Entry", "調整分錄", "accounting", 9, []],
    ["Closing Entry", "結帳分錄", "accounting", 8, []],
    ["Trial Balance", "試算表", "accounting", 9, []],
    ["General Ledger", "總分類帳", "accounting", 7, []],
    ["Accounting Equation", "會計方程式", "accounting", 9, ["assets = liabilities + equity"]],
    ["Accrual Basis", "應計基礎", "accounting", 9, []],
    ["Cash Basis", "現金基礎", "accounting", 8, []],
    ["Matching Principle", "配合原則", "accounting", 8, []],
    ["Revenue Recognition", "收入認列", "accounting", 8, []],
    ["Going Concern", "繼續經營", "accounting", 7, []],
    ["Materiality", "重大性", "accounting", 7, []],
    ["Conservatism", "穩健原則", "accounting", 7, []],
    ["Depreciation", "折舊", "accounting", 8, []],
    ["Amortization", "攤銷", "accounting", 8, []],
    ["Impairment", "減損", "accounting", 8, []],
    ["Revaluation", "重估價", "accounting", 7, []]
  ]
};

const accountingGlossaryEntries = Object.entries(accountingGlossary).flatMap(([topic, items]) =>
  items.map(([en, zh, category, priority, aliases]) => ({
    en: formatEnglishDisplayLabel(en),
    zh,
    topic,
    category,
    priority,
    aliases: [...new Set([zh, en, ...(aliases || [])])],
    term: zh,
    displayEnglish: formatEnglishDisplayLabel(en),
    bilingualLabel: `${formatEnglishDisplayLabel(en)}(${zh})`,
    definition: `${formatEnglishDisplayLabel(en)}是「${zh}」的常見會計或財務英文用語。`
  }))
);

function mergeAccountingEntries(primaryEntries, glossaryEntries) {
  const map = new Map();

  [...glossaryEntries, ...primaryEntries].forEach((entry) => {
    const key = entry.term;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        ...entry,
        aliases: [...new Set(entry.aliases || [])],
        bilingualLabel: entry.bilingualLabel || `${formatEnglishDisplayLabel(entry.displayEnglish || pickDisplayEnglish(entry))}(${entry.term})`
      });
      return;
    }

    map.set(key, {
      ...entry,
      ...existing,
      category: entry.category || existing.category,
      topic: existing.topic || entry.topic,
      priority: Math.max(existing.priority || 0, entry.priority || 0),
      definition: entry.definition || existing.definition,
      displayEnglish: existing.displayEnglish || entry.displayEnglish,
      aliases: [...new Set([...(existing.aliases || []), ...(entry.aliases || [])])],
      bilingualLabel: existing.bilingualLabel || entry.bilingualLabel
    });
  });

  return [...map.values()];
}

const accountingReferenceEntries = mergeAccountingEntries(financeKnowledgeBase, accountingGlossaryEntries);

const chineseToEnglishDisplayPhrases = [
  ["這裡的重點是：", "The key point here is: "],
  ["這句話可以整理成一個核心觀念：", "This sentence can be organized into a core concept: "],
  ["如果這個觀念出現在題目中，重點通常不是背誦，而是", "If this idea appears in a question, the focus is usually not memorization but "],
  ["這個重點適合用一到兩句話記住：", "This point is best remembered in one or two sentences: "],
  ["這裡真正要會的是公式怎麼用：", "What you really need to know here is how to use the formula: "],
  ["這個觀念容易用比較題來考：", "This idea is often tested through comparison questions: "],
  ["這句話可以整理成分類邏輯：", "This sentence can be organized into a classification rule: "],
  ["這個重點適合拿來考分錄判斷：", "This point is well suited for journal-entry judgment questions: "],
  ["這裡要掌握的是因果關係：", "What matters here is the cause-and-effect relationship: "],
  ["這個名詞通常不只考定義，還會搭配用途、判斷邏輯或和相近概念的差異。", "This term is usually tested not only as a definition, but also through usage, judgment logic, or differences from related concepts."],
  ["這句英文原文主要在說明 ", "This English sentence mainly explains "],
  ["可搭配上方中文整理一起理解。", "Read it together with the notes above."],
  ["這句被列為重要句子，原因是：", "This sentence is marked as important because "],
  ["句型本身屬於定義、公式、結論或分錄重點", "it is a definition, formula, conclusion, or journal-entry sentence"],
  ["命中了 ", "it matches "],
  ["目前主題判斷偏向 ", "the detected topic is "],
  ["這個名詞在原文中出現 ", "This term appears "],
  [" 次，且屬於高權重會計主題，因此被視為重要。", " times and belongs to a high-priority accounting topic."],
  ["延伸練習：", "Extended Practice: "],
  ["這份內容最可能考出的結論是什麼？", "What is the conclusion most likely to be tested from this material?"],
  ["這份內容最重要的主張是什麼？", "What is the most important claim in this material?"],
  ["如果考試要比較「", 'If the exam asks you to compare "'],
  ["」，應該抓什麼重點？", '", what key points should you focus on?'],
  ["這段重點中的「", 'How should "' ],
  ["」在金融或會計脈絡下該怎麼理解？", '" be understood in a finance or accounting context?'],
  ["請定義「", 'Define "' ],
  ["」，並說明它在本文中的用途或判讀重點。", '" and explain its role or interpretation in this material.'],
  ["是這份內容中的重要名詞，作答時可先定義，再說明它在本文中的角色。", "is an important term in this material. Define it first, then explain its role in context."],
  ["請根據重點說明這段內容最可能考什麼觀念？", "Based on the key points, what concept is this passage most likely to test?"],
  ["請用一到兩句話寫出這份內容的整體結論。", "Write the overall conclusion of this material in one or two sentences."],
  ["可特別補充比率的公式、用途與判讀方向。", "You can further explain the formula, purpose, and interpretation of the ratio."],
  ["可特別補充資產、負債與權益之間的關係。", "You can further explain the relationship among assets, liabilities, and equity."],
  ["可特別補充收入、費用與淨利之間的變化。", "You can further explain the relationship among revenue, expenses, and net income."],
  ["可特別補充營業、投資與籌資活動的差異。", "You can further explain the differences among operating, investing, and financing activities."],
  ["可特別補充公允價值衡量與投資分類。", "You can further explain fair value measurement and investment classification."],
  ["可特別補充分錄借貸方向與會計處理原因。", "You can further explain debit-credit directions and the reason for the accounting treatment."],
  ["可特別補充報表功能與使用時點。", "You can further explain the function and use timing of the financial statements."],
  ["這段文字提到的分錄或會計處理重點是：", "The key journal-entry or accounting-treatment point in this passage is: "],
  ["文件中的分錄內容是：", "The journal entry shown in the document is: "],
  ["內容中的相關句子是：", "The related sentence in the material is: "],
  ["這筆分錄在記錄什麼交易？", "What transaction does this journal entry record?"],
  ["這筆分錄的借方與貸方分別代表什麼？", "What do the debit and credit sides of this journal entry represent?"],
  ["這筆交易為什麼要這樣作分錄？", "Why is this transaction recorded with this journal entry?"],
  ["請用自己的話說明這段重點。", "Explain this key point in your own words."],
  ["請說明這個名詞在本文中的用途。", "Explain how this term is used in this material."],
  ["請比較這兩個重點的差異。", "Compare the differences between these two key points."],
  ["目前主題判斷偏向 financial_statement", "the detected topic is financial statements"],
  ["目前主題判斷偏向 assets_liabilities_equity", "the detected topic is assets, liabilities, and equity"],
  ["目前主題判斷偏向 income_statement", "the detected topic is the income statement"],
  ["目前主題判斷偏向 cash_flow", "the detected topic is cash flow"],
  ["目前主題判斷偏向 financial_ratio", "the detected topic is financial ratios"],
  ["目前主題判斷偏向 investment", "the detected topic is investments"],
  ["目前主題判斷偏向 journal_entry", "the detected topic is journal entries"]
];

const zhToEnStatusMap = {
  待處理: "Ready",
  已完成文件匯入: "File imported",
  解析中: "Parsing",
  舊格式需轉檔: "Legacy format needs conversion",
  解析失敗: "Parsing failed",
  請先輸入內容: "Please enter content first",
  題目已更新: "Questions refreshed",
  請先整理筆記: "Please analyze notes first",
  已複製結果: "Result copied",
  複製失敗: "Copy failed",
  已下載筆記: "Notes downloaded",
  已清空: "Cleared",
  示範內容已載入: "Demo loaded",
  整理模式已切換: "Mode switched",
  分析方式已切換: "Analysis mode switched",
  已載入歷史紀錄: "History loaded",
  已刪除歷史紀錄: "History entry deleted",
  歷史紀錄已清空: "History cleared"
};

function findFinanceEntryByAlias(text) {
  return accountingReferenceEntries.find((entry) =>
    entry.aliases.some((alias) => includesAlias(text, alias))
  ) || null;
}

function replaceBilingualLabels(text, targetLanguage = "zh") {
  if (!text) {
    return "";
  }

  let output = text;
  [...accountingReferenceEntries]
    .sort((a, b) => (b.bilingualLabel?.length || 0) - (a.bilingualLabel?.length || 0))
    .forEach((entry) => {
      const variants = [
        entry.bilingualLabel,
        `${entry.displayEnglish}（${entry.term}）`,
        `${entry.displayEnglish} (${entry.term})`
      ].filter(Boolean);
      const replacement = targetLanguage === "en" ? entry.displayEnglish : entry.term;
      variants.forEach((variant) => {
        output = output.replace(new RegExp(escapeRegExp(variant), "g"), replacement);
      });
    });

  return output;
}

function replaceFinanceTermsWithEnglish(text) {
  if (!text) {
    return "";
  }

  let output = replaceBilingualLabels(text, "en");
  [...accountingReferenceEntries]
    .sort((a, b) => {
      const maxAliasA = Math.max(a.term.length, ...(a.aliases || []).map((alias) => alias.length));
      const maxAliasB = Math.max(b.term.length, ...(b.aliases || []).map((alias) => alias.length));
      return maxAliasB - maxAliasA;
    })
    .forEach((entry) => {
      const patterns = [...new Set([entry.term, ...(entry.aliases || [])])]
        .sort((a, b) => b.length - a.length)
        .filter(Boolean);

      patterns.forEach((alias) => {
        if (/^[A-Za-z][A-Za-z0-9' -]*$/.test(alias)) {
          output = output.replace(buildEnglishAliasRegExp(alias, "gi"), entry.displayEnglish);
          return;
        }

        output = output.replace(new RegExp(escapeRegExp(alias), "g"), entry.displayEnglish);
      });
    });

  return polishGeneratedStudyText(output);
}

function replaceFinanceTermsWithBilingual(text) {
  if (!text) {
    return "";
  }

  let output = text;
  const placeholders = [];
  [...accountingReferenceEntries]
    .sort((a, b) => {
      const maxAliasA = Math.max(a.term.length, ...(a.aliases || []).map((alias) => alias.length));
      const maxAliasB = Math.max(b.term.length, ...(b.aliases || []).map((alias) => alias.length));
      return maxAliasB - maxAliasA;
    })
    .forEach((entry, index) => {
      const patterns = [...new Set([entry.term, ...(entry.aliases || [])])]
        .sort((a, b) => b.length - a.length)
        .filter((alias) => alias && alias !== entry.bilingualLabel);
      patterns.forEach((alias) => {
        if (/^[A-Za-z][A-Za-z0-9' -]*$/.test(alias)) {
          output = output.replace(buildEnglishAliasRegExp(alias, "gi"), () => {
            const placeholder = `__FIN_TERM_${index}_${placeholders.length}__`;
            placeholders.push({
              placeholder,
              value: entry.bilingualLabel
            });
            return placeholder;
          });
          return;
        }

        output = output.replace(new RegExp(escapeRegExp(alias), "g"), () => {
          const placeholder = `__FIN_TERM_${index}_${placeholders.length}__`;
          placeholders.push({
            placeholder,
            value: entry.bilingualLabel
          });
          return placeholder;
        });
      });
    });

  placeholders.forEach(({ placeholder, value }) => {
    output = output.replace(new RegExp(escapeRegExp(placeholder), "g"), value);
  });

  return polishGeneratedStudyText(output);
}

function replaceFinanceTermsWithChinese(text) {
  if (!text) {
    return "";
  }

  let output = replaceBilingualLabels(text, "zh");
  [...accountingReferenceEntries]
    .sort((a, b) => {
      const maxAliasA = Math.max(a.term.length, ...(a.aliases || []).map((alias) => alias.length));
      const maxAliasB = Math.max(b.term.length, ...(b.aliases || []).map((alias) => alias.length));
      return maxAliasB - maxAliasA;
    })
    .forEach((entry) => {
      const patterns = [...new Set([entry.term, ...(entry.aliases || [])])]
        .sort((a, b) => b.length - a.length)
        .filter(Boolean);

      patterns.forEach((alias) => {
        if (/^[A-Za-z][A-Za-z0-9' -]*$/.test(alias)) {
          output = output.replace(buildEnglishAliasRegExp(alias, "gi"), entry.term);
          return;
        }

        output = output.replace(new RegExp(escapeRegExp(alias), "g"), entry.term);
      });
    });

  return polishGeneratedStudyText(output);
}

function removeBilingualMixing(text = "") {
  return String(text)
    .replace(/[A-Za-z][A-Za-z0-9\s/-]*（([^）]+)）/g, "$1")
    .replace(/[A-Za-z][A-Za-z0-9\s/-]*\(([^)]+)\)/g, "$1")
    .replace(/（[A-Za-z][A-Za-z0-9\s/-]*）/g, "")
    .replace(/\([A-Za-z][A-Za-z0-9\s/-]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeChineseOutputText(text = "", options = {}) {
  const { convertFinanceTerms = true } = options;
  let output = String(text || "");
  if (!output) {
    return "";
  }

  if (convertFinanceTerms) {
    output = replaceFinanceTermsWithChinese(output);
  }

  output = removeBilingualMixing(output)
    .replace(/\s+([，。；：！？,.!?])/g, "$1")
    .replace(/[()（）]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return polishGeneratedStudyText(output);
}

function translateChineseDisplayTextToEnglish(text) {
  if (!text) {
    return "";
  }

  let output = replaceFinanceTermsWithEnglish(text);
  [...chineseToEnglishDisplayPhrases]
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([source, target]) => {
      output = output.replaceAll(source, target);
    });

  return output
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/：/g, ": ")
    .replace(/；/g, "; ")
    .replace(/、/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function sanitizeMonolingualDisplayText(text, language = currentLanguage) {
  if (!text) {
    return "";
  }

  let output = text;
  const hasChinese = /[\u4e00-\u9fff]/.test(output);
  const hasEnglish = /[A-Za-z]/.test(output);

  if (language === "zh") {
    output = output
      .replace(/([A-Za-z0-9&/' .-]+)\(\s*([\u4e00-\u9fff、，。；：「」『』（）《》0-9 %:-]+)\s*\)/g, "$2")
      .replace(/([\u4e00-\u9fff]{2,})\(\s*\1\s*\)/g, "$1")
      .replace(/([\u4e00-\u9fff]{2,})（\s*\1\s*）/g, "$1")
      .replace(/[（(]\s*[A-Za-z][A-Za-z0-9'",./& %:-]*\s*[）)]/g, " ")
      .replace(/\b[A-Za-z]{2,}(?:[\s/-][A-Za-z]{2,})*\b/g, hasChinese && hasEnglish ? " " : "$&")
      .replace(/\s*\.\s*。/g, "。")
      .replace(/\s*,\s*。/g, "。")
      .replace(/\s*\.\s*$/g, "")
      .replace(/\s*\(\s*\)/g, " ")
      .replace(/\s*（\s*）/g, " ")
      .replace(/\s+([，。；：！？,.!?])/g, "$1")
      .replace(/,\s+/g, "、")
      .replace(/\s{2,}/g, " ")
      .replace(/([：；，。！？])\1+/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();
    return polishGeneratedStudyText(output);
  }

  output = output
    .replace(/[（(]\s*[\u4e00-\u9fff、，。；：「」『』（）《》0-9 %:-]+\s*[）)]/g, " ")
    .replace(/[\u4e00-\u9fff]+/g, hasChinese && hasEnglish ? " " : "")
    .replace(/「|」|『|』/g, '"')
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/，/g, ", ")
    .replace(/。/g, ". ")
    .replace(/；/g, "; ")
    .replace(/：/g, ": ")
    .replace(/、/g, ", ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\(\s*\)/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return polishGeneratedStudyText(output);
}

function translateDisplayText(text, language = currentLanguage) {
  if (!text) {
    return "";
  }
  const translated = language === "en"
    ? translateChineseDisplayTextToEnglish(text)
    : translateSentenceToChineseIfNeeded(replaceFinanceTermsWithChinese(text));
  return sanitizeMonolingualDisplayText(translated, language);
}

function translateDisplayListItems(items = [], language = currentLanguage) {
  return items.map((item) => ({
    ...item,
    text: translateDisplayText(item.text || getHighlightDisplayText(item), language)
  }));
}

function translateDisplayInfoBlocks(items = [], language = currentLanguage) {
  return items.map((item) => ({
    ...item,
    label: translateDisplayText(item.label || item.text, language),
    description: translateDisplayText(item.description || item.text, language)
  }));
}

function translateDisplayQuestions(items = [], language = currentLanguage) {
  return items.map((item) => ({
    ...item,
    question: translateDisplayText(item.question, language),
    answer: translateDisplayText(item.answer, language)
  }));
}

function setProcessStateText(text) {
  if (!processState) {
    return;
  }
  processState.textContent = currentLanguage === "en" ? (zhToEnStatusMap[text] || text) : text;
}

function showToast(title, detail = "", type = "info", duration = 2600) {
  if (!toastStack) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const titleEl = document.createElement("strong");
  titleEl.textContent = title;
  toast.appendChild(titleEl);

  if (detail) {
    const detailEl = document.createElement("p");
    detailEl.textContent = detail;
    toast.appendChild(detailEl);
  }

  toastStack.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => {
      toast.remove();
    }, 220);
  }, duration);
}

function looksLikeNoiseLine(line, sourceMeta = null) {
  const normalized = normalizeLine(line);
  if (!normalized) {
    return true;
  }

  if (isForbiddenOutputText(normalized)) {
    return true;
  }

  const lower = normalized.toLowerCase();
  const fileName = sourceMeta?.fileName?.toLowerCase() || "";
  const fileStem = fileName.replace(/\.[^.]+$/, "");
  const strongNoisePatterns = [
    /^作者[:：]?\s*/,
    /^author[:：]?\s*/i,
    /^教授[:：]?\s*/,
    /^指導老師[:：]?\s*/,
    /^任課老師[:：]?\s*/,
    /^學號[:：]?\s*/,
    /^姓名[:：]?\s*/,
    /^班級[:：]?\s*/,
    /^系級[:：]?\s*/,
    /^學校[:：]?\s*/,
    /^授課教師[:：]?\s*/,
    /^參考資料[:：]?\s*/,
    /^參考文獻[:：]?\s*/,
    /^參考書目[:：]?\s*/,
    /^reference(s)?[:：]?\s*/i,
    /^bibliography[:：]?\s*/i,
    /^copyright/i,
    /^版權/i,
    /^by\s+[A-Za-z]/i,
    /^目錄$/,
    /^contents$/i,
    /^頁碼[:：]?\s*/,
    /^第\s*\d+\s*頁$/,
    /^page\s*\d+$/i,
    /^slide\s*\d+$/i,
    /^第\s*\d+\s*張投影片$/,
    /^pdf 第\s*\d+\s*頁$/,
    /^第\s*\d+\s*頁投影片$/,
    /^文件附加圖片\s*\d+\s*文字$/,
    /^pdf 第\s*\d+\s*頁附加圖片文字$/,
    /^第\s*\d+\s*張投影片附加圖片文字$/
  ];

  if (strongNoisePatterns.some((pattern) => pattern.test(normalized))) {
    return true;
  }

  if (fileStem && lower === fileStem) {
    return true;
  }

  if (/^(第\s*\d+\s*(章|節|單元|部分)|chapter\s*\d+)\b/i.test(normalized) && normalized.length <= 18) {
    return true;
  }

  if (/^(圖|表)\s*\d+[-.、:]?/.test(normalized) && normalized.length <= 24) {
    return true;
  }

  if (/^(來源|source)[:：]/i.test(normalized) && normalized.length <= 40) {
    return true;
  }

  if (/^(作者|author|教授|teacher|instructor|school|university|department)[:：\s]/i.test(normalized)) {
    return true;
  }

  if (/^[A-Za-z0-9\s_.-]{1,12}$/.test(normalized) && normalized.length <= 6) {
    return true;
  }

  return false;
}

function isLikelyMeaningfulSentence(sentence, sourceMeta = null) {
  if (!sentence) {
    return false;
  }

  const normalized = cleanClause(sentence);
  if (normalized.length < 6) {
    return false;
  }

  if (looksLikeNoiseLine(normalized, sourceMeta)) {
    return false;
  }

  if (/^[0-9.\-_/ ]+$/.test(normalized)) {
    return false;
  }

  if (/^(附註|補充|備註|頁面|投影片|章節|標題|例子|案例)/.test(normalized) && normalized.length < 18) {
    return false;
  }

  if (/^(作者|教授|學校|班級|系級|課程名稱|上課日期|繳交日期)/.test(normalized)) {
    return false;
  }

  return true;
}

function cleanSourceContent(text, sourceMeta = null) {
  const raw = normalizeText(text);
  if (!raw) {
    return {
      cleanedText: "",
      removedNoise: [],
      retainedLines: []
    };
  }

  const removedNoise = [];
  const retainedLines = raw
    .split(/\n+/)
    .map((line) => normalizeLine(line))
    .filter(Boolean)
    .filter((line) => {
      if (looksLikeNoiseLine(line, sourceMeta)) {
        removedNoise.push(line);
        return false;
      }
      return true;
    });

  const sentencePool = splitSentences(retainedLines.join("\n"));
  const keptSentences = [];

  sentencePool.forEach((sentence) => {
    const normalized = normalizeStudySentence(sentence);
    if (!isLikelyMeaningfulSentence(normalized, sourceMeta)) {
      if (normalized) {
        removedNoise.push(normalized);
      }
      return;
    }
    keptSentences.push(normalized);
  });

  return {
    cleanedText: normalizeText(keptSentences.join("\n")),
    removedNoise: [...new Set(removedNoise)].slice(0, 30),
    retainedLines
  };
}

const STRUCTURE_HEADING_LABEL_PATTERN = /(主題定位|核心觀念|關鍵詞|關鍵名詞|重點關聯|考試提醒|延伸理解|分段整理)/;
const forbiddenOutputPatterns = [
  /copyright/i,
  /john\s*wiley/i,
  /all\s*rights\s*reserved/i,
  /著作權/i,
  /版權/i,
  /出版社/i,
  /授權/i,
  /不得重製/i,
  /不得改作/i,
  /公開展示/i,
  /公開傳輸/i,
  /本教學投影片/i,
  /教學資源/i,
  /使用規範/i,
  /^第\s*\d+\s*頁$/i,
  /^page\s*\d+$/i,
  /^\d+$/,
  /^(pptx|ppt|docx|doc|pdf|txt|file)$/i,
  /^[一二三四五六七八九十]+[、.．]\s*核心觀念$/,
  /核心觀念/,
  /學習目標/,
  /重點整理/,
  /課程大綱/,
  /附加圖片文字/,
  /^ai\s*summary$/i,
  /^ai\s*摘要$/i
];

function isForbiddenOutputText(text) {
  const s = String(text || "").trim();

  if (!s) return true;

  return forbiddenOutputPatterns.some(pattern => pattern.test(s));
}

function cleanOutputText(text) {
  let s = String(text || "");

  s = s
    .replace(/copyright\s*©?.*/gi, "")
    .replace(/john\s*wiley.*$/gim, "")
    .replace(/all\s*rights\s*reserved.*$/gim, "")
    .replace(/本教學投影片.*$/gm, "")
    .replace(/請依出版社授權.*$/gm, "")
    .replace(/[一二三四五六七八九十]+[、.．]\s*核心觀念[、，\s]*/g, "")
    .replace(/[一二三四五六七八九十]+[、.．]\s*學習目標[、，\s]*/g, "")
    .replace(/[一二三四五六七八九十]+[、.．]\s*重點整理[、，\s]*/g, "")
    .replace(/第\s*\d+\s*張投影片附加圖片文字[:：]?/g, "")
    .replace(/附加圖片文字[:：]?/g, "")
    .replace(/^第\s*\d+\s*頁$/gim, "")
    .replace(/^page\s*\d+$/gim, "")
    .replace(/^[、，。；;：:\s]+/g, "")
    .replace(/[、，；;：:\s]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return s;
}

function safeExportLine(text) {
  const clean = cleanOutputText(text);
  return isForbiddenOutputText(clean) ? "" : clean;
}

function getItemText(item) {
  if (typeof item === "string") {
    return item;
  }
  if (!item || typeof item !== "object") {
    return "";
  }
  return item.text || item.label || item.description || item.question || item.answer || item.title || item.content || "";
}

function cleanOutputList(items) {
  const seen = new Set();

  return (items || [])
    .map((item) => {
      if (typeof item === "string") {
        return cleanOutputText(item);
      }

      if (item && typeof item === "object") {
        if ("question" in item || "answer" in item) {
          return {
            ...item,
            question: cleanOutputText(item.question || ""),
            answer: cleanOutputText(item.answer || "")
          };
        }

        if ("label" in item || "description" in item) {
          return {
            ...item,
            label: cleanOutputText(item.label || ""),
            description: cleanOutputText(item.description || "")
          };
        }

        return {
          ...item,
          text: cleanOutputText(item.text || item.title || item.content || "")
        };
      }

      return "";
    })
    .filter((item) => {
      const text = typeof item === "string"
        ? item
        : item.text || item.question || item.label || item.title || item.content || "";

      if (!text) return false;
      if (isForbiddenOutputText(text)) return false;

      const key = text.replace(/\s+/g, "");
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
}

function stripStructureHeadingPrefix(sentence) {
  return normalizeText((sentence || "")
    .replace(new RegExp(`^[一二三四五六七八九十]+、\\s*${STRUCTURE_HEADING_LABEL_PATTERN.source}\\s*[：:，,]?\\s*`), "")
    .replace(new RegExp(`^${STRUCTURE_HEADING_LABEL_PATTERN.source}\\s*[：:，,]?\\s*`), "")
    .replace(/^\(?\s*報表\s*\)?\s*[：:，,]?\s*/g, "")
    .replace(/^工具\s*[：:，,]?\s*/g, "")
    .replace(/^[、，,；;:\s]+/g, "")
    .trim());
}

function looksLikeStructureHeadingOnly(sentence) {
  const normalized = normalizeLine(sentence);
  if (!normalized) {
    return true;
  }

  if (new RegExp(`^[一二三四五六七八九十]+、\\s*${STRUCTURE_HEADING_LABEL_PATTERN.source}\\s*$`).test(normalized)) {
    return true;
  }

  if (new RegExp(`^${STRUCTURE_HEADING_LABEL_PATTERN.source}\\s*$`).test(normalized)) {
    return true;
  }

  return !stripStructureHeadingPrefix(normalized);
}

function looksLikeFragmentedKeywordList(sentence) {
  const normalized = normalizeLine(sentence);
  if (!normalized) {
    return false;
  }

  const stripped = stripStructureHeadingPrefix(normalized)
    .replace(/[()（）]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!stripped) {
    return false;
  }

  const tokens = stripped
    .split(/[、，,；;:\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const hasExplanationVerb = /是|代表|說明|指出|顯示|反映|用來|用於|比較|理解|判讀|影響|形成|區分|掌握|分析|因為|所以|因此|主要|核心|功能|用途|差異|關聯|公式|計算/.test(stripped);
  const hasSentenceShape = /[。！？!?]/.test(stripped) || stripped.length >= 24;
  const hasManyMatchedTerms = collectMatchedFinanceTerms(stripped).length >= 3;

  if (hasExplanationVerb) {
    return false;
  }

  if (tokens.length >= 4 && (hasManyMatchedTerms || !hasSentenceShape)) {
    return true;
  }

  return /^(報表|工具|分析|公式|重點|內容|概念)([\s、，,；;:：].*)?$/.test(stripped);
}

function isUnusableStructuredSentence(sentence) {
  return looksLikeStructureHeadingOnly(sentence) || looksLikeFragmentedKeywordList(sentence);
}

function normalizeStudySentence(sentence) {
  const normalized = normalizeLine(sentence);
  if (!normalized) {
    return "";
  }

  if (looksLikeStructureHeadingOnly(normalized)) {
    return "";
  }

  const stripped = stripStructureHeadingPrefix(normalized);
  if (!stripped) {
    return "";
  }

  const cleaned = stripped
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")")
    .replace(/（\s*/g, "（")
    .replace(/\s*）/g, "）")
    .replace(/\s{2,}/g, " ")
    .trim();

  return looksLikeStructureHeadingOnly(cleaned) ? "" : cleaned;
}

function collapseRepeatedFragments(text) {
  if (!text) {
    return "";
  }

  return normalizeText(text)
    .replace(/[“”„‟"]/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/([\u4e00-\u9fff]{2,12})\1+/g, "$1")
    .replace(/([\u4e00-\u9fff]{2,12})(?:\s+\1)+/g, "$1")
    .replace(/\b([A-Za-z]{2,}(?:[- ][A-Za-z]{2,})*(?:'s)?)\b(?:\s+\1\b)+/gi, "$1")
    .replace(/\b([A-Za-z]{2,})(?:'s)\b/gi, "$1")
    .replace(/([A-Za-z]{2,})\s+分析\b/g, "$1分析")
    .replace(/\b公司'?s\b/gi, "公司")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function looksLikeLowQualityConceptPhrase(text) {
  const normalized = normalizeText(text || "");
  if (!normalized) {
    return false;
  }

  const stripped = normalized
    .replace(/[()（）"'“”‘’]/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!stripped) {
    return false;
  }

  const matchedTerms = collectMatchedFinanceTerms(stripped);
  const hasExplanationVerb = /是|代表|說明|指出|顯示|反映|用來|用於|比較|理解|判讀|影響|形成|區分|掌握|分析|因為|所以|因此|主要|核心|功能|用途|差異|關聯|公式|計算/.test(stripped);
  const tokens = stripped
    .split(/[、，,；;:\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (hasExplanationVerb) {
    return false;
  }

  if (matchedTerms.length >= 1 && stripped.length <= 28) {
    return true;
  }

  return tokens.length >= 2 && tokens.length <= 4 && stripped.length <= 24;
}

function cleanFinalOutputText(text, options = {}) {
  const { keepHeadingLine = false } = options;
  const normalized = normalizeText(cleanOutputText(text || ""));
  if (!normalized) {
    return "";
  }

  let output = normalized;
  if (!keepHeadingLine) {
    output = stripStructureHeadingPrefix(output);
  }

  output = collapseRepeatedFragments(output)
    .replace(/([A-Za-z0-9\u4e00-\u9fff]+)\(\s*\1\s*\)/g, "$1")
    .replace(/([：；，。！？])\1+/g, "$1")
    .replace(/\s*\.\s*。/g, "。")
    .replace(/\s*,\s*。/g, "。")
    .replace(/[()（）]/g, "")
    .replace(/(^|[\u4e00-\u9fff])\s*[A-Za-z]+'?s\b/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/^[、，,；;:\s]+/g, "")
    .trim();

  if (!output || isForbiddenOutputText(output) || looksLikeStructureHeadingOnly(output) || isUnusableStructuredSentence(output) || looksLikeLowQualityConceptPhrase(output)) {
    return "";
  }

  return output;
}

function buildFallbackConceptSentence(text) {
  const cleaned = cleanFinalOutputText(text);
  if (!cleaned) {
    return "";
  }

  const matchedTerms = [...new Set(collectMatchedFinanceTerms(cleaned).map((term) => term.term).filter(Boolean))];
  if (matchedTerms.length >= 2) {
    return `這段內容主要圍繞 ${matchedTerms.slice(0, 4).join("、")} 展開，重點是理解這些概念的定義、用途與彼此關聯。`;
  }

  if (matchedTerms.length === 1) {
    return `這段內容的核心在於理解 ${matchedTerms[0]} 的定義、用途與判讀方式。`;
  }

  return "";
}

function sanitizeFinalListItems(items = []) {
  const seen = new Set();
  return cleanOutputList(items)
    .map((item) => {
      const next = { ...item };
      const rawText = typeof item === "string"
        ? item
        : item.text || item.label || item.description || "";
      let cleaned = cleanFinalOutputText(rawText);
      if (!cleaned && rawText) {
        cleaned = buildFallbackConceptSentence(rawText);
      }
      if (!cleaned) {
        return null;
      }
      next.text = ensureSentenceEnding(cleaned);
      return next;
    })
    .filter(Boolean)
    .filter((item) => {
      const key = normalizeConcept(item.text);
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function sanitizeFinalInfoBlocks(items = []) {
  const seen = new Set();
  return items
    .map((item) => {
      const label = cleanFinalOutputText(item.label || "", { keepHeadingLine: true });
      let description = cleanFinalOutputText(item.description || "");
      if (!description && item.description) {
        description = buildFallbackConceptSentence(item.description);
      }
      if (!label && !description) {
        return null;
      }
      const key = normalizeConcept(`${label}|${description}`);
      if (!key || seen.has(key)) {
        return null;
      }
      seen.add(key);
      return {
        ...item,
        label: label || description,
        description: ensureSentenceEnding(description || label)
      };
    })
    .filter(Boolean);
}

function sanitizeFinalQuestions(items = []) {
  const seen = new Set();
  return items
    .map((item) => {
      const question = cleanFinalOutputText(item.question || "", { keepHeadingLine: true });
      let answer = cleanFinalOutputText(item.answer || "");
      if (!answer && item.answer) {
        answer = buildFallbackConceptSentence(item.answer);
      }
      if (!question || !answer) {
        return null;
      }
      const key = normalizeConcept(`${question}|${answer}`);
      if (!key || seen.has(key)) {
        return null;
      }
      seen.add(key);
      return {
        ...item,
        question: ensureSentenceEnding(question).replace(/[。！？!?]$/, "？"),
        answer: ensureSentenceEnding(answer)
      };
    })
    .filter(Boolean);
}

function sanitizeFinalSummary(summary) {
  const normalized = normalizeText(summary || "");
  if (!normalized) {
    return "";
  }

  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const merged = [];
  const blockMap = new Map();

  blocks.forEach((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) {
      return;
    }

    const maybeTitle = lines[0];
    const semanticTitle = parseSummarySemanticTitle(maybeTitle);
    const isHeading = Boolean(semanticTitle);
    const bodySource = isHeading ? lines.slice(1).join(" ") : lines.join(" ");
    let body = cleanFinalOutputText(bodySource);
    if (!body) {
      body = buildFallbackConceptSentence(bodySource);
    }
    if (!body) {
      return;
    }

    const key = semanticTitle || `plain:${normalizeConcept(body)}`;
    if (!blockMap.has(key)) {
      const entry = { semanticTitle, bodies: [ensureSentenceEnding(body)] };
      blockMap.set(key, entry);
      merged.push(entry);
      return;
    }

    const entry = blockMap.get(key);
    const bodyKey = normalizeConcept(body);
    if (!entry.bodies.some((existing) => normalizeConcept(existing) === bodyKey)) {
      entry.bodies.push(ensureSentenceEnding(body));
    }
  });

  return reindexSummaryHeadings(merged
    .map((entry) => {
      if (!entry.semanticTitle) {
        return entry.bodies.join("\n");
      }

      return `${entry.semanticTitle}\n${entry.bodies.join("\n")}`;
    })
    .join("\n\n"));
}

const SUMMARY_SEMANTIC_TITLES = [
  "主題定位",
  "核心觀念",
  "關鍵詞",
  "關鍵名詞",
  "重點關聯",
  "考試提醒",
  "延伸理解",
  "分段整理"
];
const SUMMARY_SEMANTIC_TITLE_SET = new Set(SUMMARY_SEMANTIC_TITLES);
const CHINESE_SUMMARY_NUMERALS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

function parseSummarySemanticTitle(rawTitle) {
  const title = normalizeText(rawTitle || "");
  if (!title) {
    return "";
  }

  const numberedMatch = title.match(/^([一二三四五六七八九十]+)、\s*(.+)$/);
  const label = normalizeText(numberedMatch ? numberedMatch[2] : title);
  if (label === "關鍵名詞") {
    return "關鍵詞";
  }
  return SUMMARY_SEMANTIC_TITLE_SET.has(label) ? label : "";
}

function formatSummaryDisplayTitle(index, semanticTitle) {
  const numeral = CHINESE_SUMMARY_NUMERALS[index] || `${index + 1}`;
  return `${numeral}、${semanticTitle}`;
}

function reindexSummaryHeadings(summary) {
  const normalized = normalizeText(summary || "");
  if (!normalized) {
    return "";
  }

  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  let titleIndex = 0;
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (!lines.length) {
        return "";
      }

      const semanticTitle = parseSummarySemanticTitle(lines[0]);
      if (!semanticTitle) {
        return lines.join("\n");
      }

      const displayTitle = formatSummaryDisplayTitle(titleIndex, semanticTitle);
      titleIndex += 1;
      return [displayTitle, ...lines.slice(1)].join("\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

function sanitizeFinalAnalysisOutput(result) {
  if (!result) {
    return null;
  }

  const cleanChineseSentence = (text) => normalizeChineseOutputText(text);
  const cleanChineseSentenceWithEnding = (text) => {
    const cleaned = normalizeChineseOutputText(text);
    return cleaned ? ensureSentenceEnding(cleaned) : "";
  };

  let summary = cleanChineseSentence(sanitizeFinalSummary(result.summary));
  if (isForbiddenOutputText(summary) || summary.length < 8) {
    summary = "本份資料已整理出核心內容與重點脈絡，建議搭配下方的重要句子、關鍵結構與專有名詞一起閱讀。";
  }

  const importantSentences = sanitizeFinalListItems(cleanOutputList(result.importantSentences || []))
    .map((item) => ({ ...item, text: cleanChineseSentenceWithEnding(item.text || "") }))
    .filter((item) => item.text);
  const generalNotes = sanitizeFinalListItems(cleanOutputList(result.generalNotes || []))
    .map((item) => ({ ...item, text: cleanChineseSentenceWithEnding(item.text || "") }))
    .filter((item) => item.text);
  const possibleExamPoints = sanitizeFinalListItems(cleanOutputList(result.possibleExamPoints || []))
    .map((item) => ({ ...item, text: cleanChineseSentenceWithEnding(item.text || "") }))
    .filter((item) => item.text);
  const questions = sanitizeFinalQuestions(cleanOutputList(result.questions || []))
    .map((item) => ({
      ...item,
      question: cleanChineseSentenceWithEnding(item.question || "").replace(/[。！？!?]$/, "？"),
      answer: cleanChineseSentenceWithEnding(item.answer || "")
    }))
    .filter((item) => item.question && item.answer);
  const mockExamQuestions = sanitizeFinalQuestions(cleanOutputList(result.practiceQuestions || result.mockExamQuestions || []))
    .map((item) => ({
      ...item,
      question: cleanChineseSentenceWithEnding(item.question || "").replace(/[。！？!?]$/, "？"),
      answer: cleanChineseSentenceWithEnding(item.answer || "")
    }))
    .filter((item) => item.question && item.answer);
  const journalEntryQuestions = sanitizeFinalQuestions(cleanOutputList(result.specializedQuestions || result.journalEntryQuestions || []))
    .map((item) => ({
      ...item,
      question: cleanChineseSentenceWithEnding(item.question || "").replace(/[。！？!?]$/, "？"),
      answer: cleanChineseSentenceWithEnding(item.answer || "")
    }))
    .filter((item) => item.question && item.answer);
  const formulas = sanitizeFinalInfoBlocks(cleanOutputList(result.formulas || []))
    .map((item) => ({
      ...item,
      label: cleanChineseSentence(item.label || ""),
      description: cleanChineseSentenceWithEnding(item.description || "")
    }))
    .filter((item) => item.label || item.description);
  const highlights = sanitizeFinalListItems(cleanOutputList(result.highlights || []))
    .map((item) => ({ ...item, text: cleanChineseSentenceWithEnding(item.text || "") }))
    .filter((item) => item.text);
  const importanceReasons = sanitizeFinalInfoBlocks(cleanOutputList(result.importanceReasons || []))
    .map((item) => ({
      ...item,
      label: cleanChineseSentence(item.label || ""),
      description: cleanChineseSentenceWithEnding(item.description || "")
    }))
    .filter((item) => item.label || item.description);
  const accountingTerms = sanitizeFinalInfoBlocks(cleanOutputList(result.keyTerms || result.accountingTerms || []))
    .map((term) => ({
      ...term,
      label: cleanChineseSentence(term.label || ""),
      description: cleanChineseSentenceWithEnding(term.description || "")
    }))
    .filter((term) => !isForbiddenOutputText(`${term.label || ""} ${term.description || ""}`));
  const englishExplanations = sanitizeFinalInfoBlocks(cleanOutputList(result.englishExplanations || []))
    .map((item) => ({
      ...item,
      label: cleanOutputText(item.label || item.original || ""),
      description: cleanChineseSentenceWithEnding(item.description || item.explanation || "")
    }))
    .filter((item) => item.label && item.description)
    .filter((item) => !isForbiddenOutputText(item.label))
    .filter((item) => !isForbiddenOutputText(item.description));

  return {
    ...result,
    summary,
    formulas,
    highlights,
    importantSentences,
    importanceReasons,
    possibleExamPoints,
    generalNotes,
    accountingTerms,
    keyTerms: accountingTerms,
    englishExplanations,
    questions,
    mockExamQuestions,
    practiceQuestions: mockExamQuestions,
    journalEntryQuestions,
    specializedQuestions: journalEntryQuestions
  };
}

function getFileExtension(fileName) {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function localizeModeLabel(label) {
  if (currentLanguage !== "en") {
    return label;
  }
  return {
    考試複習模式: "Exam Review Mode",
    報告整理模式: "Report Organization Mode",
    精簡重點模式: "Quick Summary Mode"
  }[label] || label;
}

function localizeEnhancementLabel(label) {
  if (currentLanguage !== "en") {
    return label;
  }
  return {
    "智慧規則分析": "Smart Rule Analysis",
    "進階 AI 模式": "Advanced AI Mode"
  }[label] || label;
}

function localizeParseText(text) {
  return currentLanguage === "en" ? translateChineseDisplayTextToEnglish(text) : text;
}

function setProgress(percent, phaseText = progressPhase.textContent) {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  progressPhase.textContent = localizeParseText(phaseText);
  progressValue.textContent = `${safePercent}%`;
  progressFill.style.width = `${safePercent}%`;
}

function setParseStatus(title, detail, percent = null, phaseText = null) {
  parseStatusTitle.textContent = localizeParseText(title);
  parseStatusDetail.textContent = localizeParseText(detail);
  if (percent !== null) {
    setProgress(percent, phaseText || title);
  }
  updateUploadDiagnosticsFromStatus(localizeParseText(title), localizeParseText(detail));
}

function updateUploadDiagnostics({ badge, fileCount, sectionCount, ocrStatus, message } = {}) {
  if (badge && uploadDiagnosticsBadge) uploadDiagnosticsBadge.textContent = badge;
  if (typeof fileCount !== "undefined" && uploadFileCount) uploadFileCount.textContent = String(fileCount);
  if (typeof sectionCount !== "undefined" && uploadSectionCount) uploadSectionCount.textContent = String(sectionCount);
  if (ocrStatus && uploadOcrStatus) uploadOcrStatus.textContent = ocrStatus;
  if (message && uploadDiagnosticsMessage) uploadDiagnosticsMessage.textContent = message;
}

function updateUploadDiagnosticsFromStatus(title, detail) {
  const normalizedTitle = String(title || "");
  const normalizedDetail = String(detail || "");
  const fileCount = Array.isArray(currentUploadedFiles) ? currentUploadedFiles.length : 0;
  const sectionCount = lastSourceMeta?.sectionCount || 0;
  let badge = currentLanguage === "en" ? "Pending" : "待上傳";
  let ocrStatusText = currentLanguage === "en" ? "Not started" : "尚未啟動";

  if (/失敗|failed/i.test(normalizedTitle)) {
    badge = currentLanguage === "en" ? "Failed" : "失敗";
    ocrStatusText = currentLanguage === "en" ? "Stopped" : "已中止";
  } else if (/完成|ready|done/i.test(normalizedTitle)) {
    badge = currentLanguage === "en" ? "Ready" : "完成";
    ocrStatusText = lastSourceMeta?.imageCount
      ? (currentLanguage === "en" ? `Done (${lastSourceMeta.imageCount})` : `已完成（${lastSourceMeta.imageCount}）`)
      : (currentLanguage === "en" ? "Skipped or not needed" : "略過或不需要");
  } else if (/辨識|ocr/i.test(normalizedTitle) || /辨識|ocr/i.test(normalizedDetail)) {
    badge = currentLanguage === "en" ? "Processing" : "處理中";
    ocrStatusText = currentLanguage === "en" ? "Running OCR" : "辨識中";
  } else if (/讀取|解析|抽取|prepare|processing/i.test(normalizedTitle)) {
    badge = currentLanguage === "en" ? "Processing" : "處理中";
    ocrStatusText = currentLanguage === "en" ? "Waiting or optional" : "等待中或非必要";
  }

  updateUploadDiagnostics({
    badge,
    fileCount,
    sectionCount,
    ocrStatus: ocrStatusText,
    message: normalizedDetail || (currentLanguage === "en" ? "Waiting for file upload." : "等待上傳檔案。")
  });
}

function resetUploadDiagnostics() {
  updateUploadDiagnostics({
    badge: currentLanguage === "en" ? "Pending" : "待上傳",
    fileCount: 0,
    sectionCount: 0,
    ocrStatus: currentLanguage === "en" ? "Not started" : "尚未啟動",
    message: currentLanguage === "en"
      ? "Choose files to see parsing status, extracted sections, and OCR behavior."
      : "選擇檔案後，這裡會顯示解析狀態、抽取到的內容區塊與 OCR 情況。"
  });
}

function setBusyState(isBusy) {
  isParsingFile = isBusy;
  fileInput.disabled = isBusy;
  chooseFileButton.disabled = isBusy;
  analyzeButton.disabled = isBusy;
  demoButton.disabled = isBusy;
  useKnowledgeBaseCheckbox.disabled = isBusy;
  pdfPageStartInput.disabled = isBusy;
  pdfPageEndInput.disabled = isBusy;
  if (uploadDropzone && !uploadDropzone.dataset.missingId) {
    uploadDropzone.classList.toggle("is-disabled", isBusy);
  }
}

function restoreUploadHelp() {
  uploadHelp.textContent = currentLanguage === "en"
    ? "Supported: TXT, MD, CSV, JSON, HTML, XML, DOCX, PPTX, and PDF. You can upload multiple files at once, and PDF page ranges can be limited before parsing. Some scanned PDFs or image-based text require OCR attempts, and results may vary with file quality."
    : "支援：TXT、MD、CSV、JSON、HTML、XML、DOCX、PPTX、PDF。可一次上傳多份檔案，也可先限制 PDF 頁數範圍再解析。部分掃描型 PDF 或圖片文字需透過 OCR 嘗試辨識，結果可能受檔案品質影響。";
  resetUploadDiagnostics();
  setParseStatus(
    currentLanguage === "en" ? "File parsing has not started yet" : "文件解析尚未開始",
    currentLanguage === "en"
      ? "After you upload files, the system extracts text first, then captures OCR text from images, and finally sends the merged content into the study workflow. Core analysis stays in the browser, but parsing dependencies may load from CDN resources."
      : "上傳檔案後，系統會先抽取文字，再補抓圖片中的文字辨識內容，最後把合併後的完整內容帶進整理流程。主要分析流程在瀏覽器端完成，但檔案解析依賴的前端套件可能會透過 CDN 載入。",
    0,
    currentLanguage === "en" ? "Waiting for upload" : "等待上傳"
  );
  renderSelectedFiles([]);
}

function syncSourceContextUI() {
  if (lastSourceMeta?.fileName) {
    fileStatus.textContent = currentLanguage === "en"
      ? `Loaded: ${lastSourceMeta.fileName} (${lastSourceMeta.extension.toUpperCase()})`
      : `已完成解析：${lastSourceMeta.fileName} (${lastSourceMeta.extension.toUpperCase()})`;
    uploadHelp.textContent = currentLanguage === "en"
      ? `Extracted ${lastSourceMeta.sectionCount} content sections and ${lastSourceMeta.imageCount} OCR image text blocks.`
      : `已抽取 ${lastSourceMeta.sectionCount} 個內容區塊，並擷取 ${lastSourceMeta.imageCount} 筆圖片文字辨識內容。`;
    updateUploadDiagnostics({
      badge: currentLanguage === "en" ? "Ready" : "完成",
      fileCount: Array.isArray(lastSourceMeta.files) ? lastSourceMeta.files.length : 1,
      sectionCount: lastSourceMeta.sectionCount || 0,
      ocrStatus: lastSourceMeta.imageCount
        ? (currentLanguage === "en" ? `Done (${lastSourceMeta.imageCount})` : `已完成（${lastSourceMeta.imageCount}）`)
        : (currentLanguage === "en" ? "Skipped or not needed" : "略過或不需要"),
      message: currentLanguage === "en"
        ? "You can review the import preview below, then generate notes or ask AI Tutor."
        : "你可以先看下方匯入預覽，再開始整理或接著問 AI Tutor。"
    });
    return;
  }

  if (sourceText.value === demoText) {
    fileStatus.textContent = currentLanguage === "en" ? "Demo content loaded" : "已載入示範內容";
    uploadHelp.textContent = currentLanguage === "en"
      ? "The demo text is loaded. You can also upload TXT, PPTX, DOCX, or PDF files."
      : "目前使用示範文字內容，你也可以改上傳 TXT、PPTX、DOCX 或 PDF。";
    updateUploadDiagnostics({
      badge: currentLanguage === "en" ? "Demo" : "示範",
      fileCount: 0,
      sectionCount: 1,
      ocrStatus: currentLanguage === "en" ? "Not required" : "不需要",
      message: currentLanguage === "en"
        ? "This content comes from built-in demo text, so no file parsing or OCR is involved."
        : "這份內容來自內建示範文字，因此沒有檔案解析或 OCR 流程。"
    });
    return;
  }

  restoreUploadHelp();
  fileStatus.textContent = currentLanguage === "en" ? "No file selected" : "尚未選擇檔案";
  resetUploadPreview();
}

function resetUploadPreview() {
  uploadPreviewBox.classList.add("hidden");
  uploadPreviewTitle.textContent = currentLanguage === "en" ? "Import Preview" : "匯入預覽";
  uploadPreviewMeta.textContent = currentLanguage === "en"
    ? "After parsing, an overview of the imported files and sections will appear here."
    : "解析完成後，這裡會顯示目前匯入的檔案與內容區塊概況。";
  uploadPreviewList.innerHTML = "";
}

function renderSelectedFiles(files = currentUploadedFiles) {
  if (!selectedFilesList || selectedFilesList.dataset.missingId) {
    return;
  }

  if (!Array.isArray(files) || !files.length) {
    selectedFilesList.innerHTML = "";
    return;
  }

  selectedFilesList.innerHTML = files
    .map((file) => `
      <div class="selected-file-chip">
        <strong>${escapeHTML(file.name || (currentLanguage === "en" ? "Untitled file" : "未命名檔案"))}</strong>
        <span>${escapeHTML(formatFileSize(Number(file.size) || 0))}</span>
      </div>
    `)
    .join("");
}

function renderUploadPreview(result) {
  if (!result?.sourceMeta) {
    resetUploadPreview();
    return;
  }

  const meta = result.sourceMeta;
  const fileItems = Array.isArray(meta.files) && meta.files.length ? meta.files : [{
    name: meta.fileName || "",
    sectionCount: meta.sectionCount || 0,
    imageCount: meta.imageCount || 0
  }];
  const sections = Array.isArray(result.sections) ? result.sections.slice(0, 6) : [];

  uploadPreviewTitle.textContent = currentLanguage === "en" ? "Import Preview" : "匯入預覽";
  uploadPreviewMeta.textContent = currentLanguage === "en"
    ? `Imported ${fileItems.length} file(s), ${meta.sectionCount || 0} sections, and ${meta.imageCount || 0} OCR text blocks before note generation.`
    : `已匯入 ${fileItems.length} 份檔案、${meta.sectionCount || 0} 個內容區塊，並抓到 ${meta.imageCount || 0} 筆 OCR 圖片文字；你可以先檢查再開始整理。`;

  uploadPreviewList.innerHTML = "";

  fileItems.slice(0, 4).forEach((item) => {
    const pageRangeText = item.pageRange
      ? (currentLanguage === "en"
        ? `, pages ${item.pageRange.startPage}-${item.pageRange.endPage}`
        : `，頁數 ${item.pageRange.startPage}-${item.pageRange.endPage}`)
      : "";
    const card = document.createElement("div");
    card.className = "upload-preview-item";
    card.innerHTML = `
      <strong>${escapeHTML(item.name || (currentLanguage === "en" ? "Untitled file" : "未命名檔案"))}</strong>
      <span>${escapeHTML(currentLanguage === "en"
        ? `${item.sectionCount || 0} sections, ${item.imageCount || 0} OCR blocks${pageRangeText}`
        : `${item.sectionCount || 0} 個區塊，${item.imageCount || 0} 筆 OCR 文字${pageRangeText}`)}</span>
    `;
    uploadPreviewList.appendChild(card);
  });

  if (sections.length) {
    const sectionCard = document.createElement("div");
    sectionCard.className = "upload-preview-item";
    sectionCard.innerHTML = `
      <strong>${escapeHTML(currentLanguage === "en" ? "Previewed sections" : "內容區塊預覽")}</strong>
      <span>${escapeHTML(sections.map((section) => section.title || "").filter(Boolean).join(" / "))}</span>
    `;
    uploadPreviewList.appendChild(sectionCard);
  }

  uploadPreviewBox.classList.remove("hidden");
}

function getPdfPageRangeOptions() {
  const startRaw = Number.parseInt(String(pdfPageStartInput.value || "").trim(), 10);
  const endRaw = Number.parseInt(String(pdfPageEndInput.value || "").trim(), 10);
  const startPage = Number.isFinite(startRaw) && startRaw > 0 ? startRaw : null;
  const endPage = Number.isFinite(endRaw) && endRaw > 0 ? endRaw : null;

  if (startPage && endPage && startPage > endPage) {
    throw new Error(currentLanguage === "en"
      ? "The PDF start page cannot be greater than the end page."
      : "PDF 起始頁不可大於結束頁。");
  }

  return { startPage, endPage };
}

function splitSentences(text) {
  return text
    .split(/(?<=[。！？!?\.])\s*|\n+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

function splitSentencesByLanguage(text) {
  const sentences = splitSentences(text);
  const chineseSentences = [];
  const englishSentences = [];

  sentences.forEach((sentence) => {
    const hasChinese = /[\u4e00-\u9fff]/.test(sentence);
    const hasEnglish = /[A-Za-z]/.test(sentence);

    if (hasChinese) {
      chineseSentences.push(sentence);
    }
    if (hasEnglish) {
      englishSentences.push(sentence);
    }
    if (!hasChinese && !hasEnglish) {
      chineseSentences.push(sentence);
    }
  });

  return { chineseSentences, englishSentences };
}

function isChineseChar(char) {
  return /[\u4e00-\u9fff]/.test(char);
}

function sanitizeChineseSegment(segment) {
  return segment.replace(/[^\u4e00-\u9fff]/g, "");
}

function isNoiseToken(token) {
  if (!token) {
    return true;
  }
  if (/^([\u4e00-\u9fffA-Za-z])\1+$/.test(token)) {
    return true;
  }
  return token.length > 12;
}

function shouldKeepChineseToken(token) {
  if (token.length < 2 || token.length > 4) {
    return false;
  }
  if (isNoiseToken(token) || weakChineseTerms.has(token)) {
    return false;
  }
  for (const word of stopWords) {
    if (word.length >= 2 && token.includes(word)) {
      return false;
    }
  }
  return new Set(token.split("")).size !== 1;
}

function collectChineseNgrams(segment) {
  const cleaned = sanitizeChineseSegment(segment);
  const tokens = [];
  for (let size = 2; size <= 4; size += 1) {
    for (let index = 0; index <= cleaned.length - size; index += 1) {
      const candidate = cleaned.slice(index, index + size);
      if (shouldKeepChineseToken(candidate)) {
        tokens.push(candidate);
      }
    }
  }
  return tokens;
}

function tokenize(text) {
  const tokens = [];
  const chineseSegments = text.match(/[\u4e00-\u9fff]+/g) || [];
  const englishWords = text.match(/[A-Za-z][A-Za-z'-]{1,15}/g) || [];

  chineseSegments.forEach((segment) => {
    tokens.push(...collectChineseNgrams(segment));
  });

  englishWords.forEach((word) => {
    const normalized = word.toLowerCase().replace(/[^a-z'-]/g, "");
    if (
      normalized.length >= 2 &&
      normalized.length <= 16 &&
      !stopWords.has(normalized) &&
      !/^[a-z]\1+$/.test(normalized)
    ) {
      tokens.push(normalized);
    }
  });

  return tokens;
}

function buildTokenFrequencyMap(tokens = []) {
  const map = new Map();
  tokens.forEach((token) => {
    map.set(token, (map.get(token) || 0) + 1);
  });
  return map;
}

function scoreTextAgainstQuestion(questionTokens = [], text = "") {
  const normalizedText = normalizeText(text || "");
  if (!normalizedText) {
    return 0;
  }

  const textTokens = tokenize(normalizedText);
  const textTokenMap = buildTokenFrequencyMap(textTokens);
  const compactText = normalizedText.toLowerCase();
  let score = 0;

  questionTokens.forEach((token) => {
    const count = textTokenMap.get(token) || 0;
    if (count > 0) {
      score += count * (token.length >= 3 ? 2.4 : 1.5);
    } else if (compactText.includes(String(token).toLowerCase())) {
      score += 1.2;
    }
  });

  return score;
}

function splitTextIntoKnowledgeChunks(text, options = {}) {
  const chunkSize = options.chunkSize || 420;
  const overlap = options.overlap || 80;
  const paragraphs = normalizeText(text)
    .split(/\n{2,}/)
    .map((part) => normalizeText(part))
    .filter(Boolean);

  if (!paragraphs.length) {
    return [];
  }

  const chunks = [];
  let current = "";

  const pushCurrent = () => {
    const value = normalizeText(current);
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
      const slice = normalizeText(paragraph.slice(start, start + chunkSize));
      if (slice) {
        chunks.push(slice);
      }
      start += Math.max(chunkSize - overlap, 100);
    }
    current = "";
  });

  if (current.trim()) {
    chunks.push(normalizeText(current));
  }

  return chunks;
}

function buildKeywordScores(words) {
  const scores = new Map();
  words.forEach((word) => {
    const isChinese = isChineseChar(word[0]);
    const countWeight = isChinese ? 1.15 : 1;
    const lengthBonus = isChinese
      ? (word.length === 2 ? 0.3 : word.length === 3 ? 0.42 : 0.36)
      : Math.min(word.length, 8) * 0.03;
    const current = scores.get(word) || { count: 0, weight: 0 };
    current.count += 1;
    current.weight += countWeight + lengthBonus;
    scores.set(word, current);
  });
  return scores;
}

function scoreSentence(sentence, keywordScores) {
  const words = tokenize(sentence);
  const keywordScore = words.reduce((sum, word) => {
    const entry = keywordScores.get(word);
    return sum + (entry ? entry.weight : 0);
  }, 0);
  const bonus = /因此|所以|總結|重點|關鍵|首先|另外|此外|結論|顯示|代表|指出|核心|主要|目的|原因|影響|步驟|條件|比較|差異|公式|定義|分錄|借方|貸方/.test(sentence) ? 2.8 : 0;
  const contextBonus = getContextSentenceScore(sentence);
  const roleBonus = getSentenceRoleScore(sentence);
  const financeBonus = isFinanceContent(sentence, words) ? 2.1 : 0;
  const examplePenalty = /例如|像是|譬如|舉例|案例/.test(sentence) ? 1.5 : 0;
  return keywordScore + bonus + contextBonus + roleBonus + financeBonus - examplePenalty + Math.min(words.length, 12) * 0.15;
}

function pickTopKeywords(keywordScores, limit, accountingTerms = []) {
  const prioritized = accountingTerms
    .slice(0, Math.min(4, limit))
    .map((entry) => entry.zh);
  const remaining = [...keywordScores.entries()]
    .sort((a, b) => {
      if (b[1].count !== a[1].count) {
        return b[1].count - a[1].count;
      }
      if (b[1].weight !== a[1].weight) {
        return b[1].weight - a[1].weight;
      }
      return a[0].length - b[0].length;
    })
    .slice(0, limit)
    .map(([word]) => word)
    .filter((word) => !prioritized.includes(word));

  return [...prioritized, ...remaining].slice(0, limit);
}

function pickSummary(sentences, keywordScores, modeConfig) {
  const limit = Math.min(modeConfig.summaryCount, sentences.length);
  const ranked = sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: scoreSentence(sentence, keywordScores)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence);

  const minimum = Math.min(modeConfig.summaryMin, sentences.length);
  while (ranked.length < minimum) {
    ranked.push(sentences[ranked.length]);
  }
  return ranked.join(" ");
}

function buildDetailedSummary(sentences, keywordScores, highlights, accountingTerms, accountingTopic, modeConfig, sourceSections = []) {
  const baseSummary = pickSummary(sentences, keywordScores, modeConfig) || sentences[0] || "";
  const summaryParts = [];
  const seen = new Set();
  const topicCoreTemplates = {
    financial_statement: "這份內容的核心在於理解各報表的用途與彼此關聯，尤其要分清楚損益表、綜合損益與其他綜合損益在資訊呈現上的差異。",
    assets_liabilities_equity: "這份內容的核心在於掌握資產、負債與權益的分類邏輯，並理解各項科目如何放回會計方程式中判讀。",
    income_statement: "這份內容的核心在於掌握收入、費用、淨利與綜合損益之間的形成關係，並理解它們如何反映企業經營成果。",
    cash_flow: "這份內容的核心在於區分營業、投資與籌資活動的判讀方式，並理解不同現金流量對企業狀況的意義。",
    financial_ratio: "這份內容的核心在於理解各財務比率的公式、用途與判讀方向，不能只記名稱，還要知道比率變動代表的財務訊號。",
    investment: "這份內容的核心在於理解金融資產分類、公允價值衡量與損益認列方式，並比較不同投資項目的會計處理差異。",
    journal_entry: "這份內容的核心在於把交易事件、借貸方向與科目變化連在一起理解，而不是只背分錄格式。"
  };

  const cleanSummaryNoteText = (text) => {
    return cleanClause(text || "")
      .replace(/^[一二三四五六七八九十]+、\s*/g, "")
      .replace(new RegExp(`^(?:${STRUCTURE_HEADING_LABEL_PATTERN.source})[：:]?\\s*`), "")
      .replace(new RegExp(`[一二三四五六七八九十]+、\\s*(?:${STRUCTURE_HEADING_LABEL_PATTERN.source})[：:]?`, "g"), "")
      .replace(/([A-Za-z0-9\u4e00-\u9fff]+)\(\s*\1\s*\)/g, "$1")
      .replace(/([：；，。！？])\1+/g, "$1")
      .replace(/[()（）]/g, "")
      .replace(/(\S{2,})\s+\1/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const pushNote = (title, sentence) => {
    const cleaned = cleanSummaryNoteText(sentence || "");
    const normalized = normalizeConcept(cleaned);
    if (!cleaned || !normalized || seen.has(`${title}:${normalized}`)) {
      return;
    }
    seen.add(`${title}:${normalized}`);
    summaryParts.push(`${title}\n${ensureSentenceEnding(cleaned)}`);
  };

  const buildHumanCoreConcept = (highlight) => {
    const rawText = cleanSummaryNoteText(buildStudySentence(highlight.fullText || highlight.sentence || highlight.core, highlight.matchedTerms));
    const matchedTerms = [...new Set((highlight.matchedTerms || []).map((term) => term.term || term.zh || term.label).filter(Boolean))];
    const lowQualityFragment = /^(報表|工具|分析|公式|重點|內容|概念)([\s、，,；;:：].*)?$/.test(rawText)
      || /^([\u4e00-\u9fff]{2,})(\s+\1)+[。.]?$/.test(rawText)
      || looksLikeStructureHeadingOnly(rawText);

    if (matchedTerms.length >= 3) {
      return `這段內容集中在 ${matchedTerms.slice(0, 4).join("、")} 等重點名詞，複習時不要只背名稱，還要一起掌握它們的定義、用途與判讀差異。`;
    }

    if (looksLikeFragmentedKeywordList(rawText) || /^[\u4e00-\u9fff、,\s()（）]+[。.]?$/.test(rawText) || rawText.length <= 18) {
      return matchedTerms.length
        ? `這段內容主要圍繞 ${matchedTerms.join("、")} 展開，重點是理解這些概念在本文中的角色與彼此關聯。`
        : "";
    }

    if (lowQualityFragment) {
      return "";
    }

    return rawText;
  };

  const baseSentences = splitSentences(baseSummary);
  if (baseSentences.length) {
    pushNote("主題定位", baseSentences.join(" "));
  }

  const criticalHighlights = highlights
    .filter((item) => item.isCritical)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const coreConcepts = criticalHighlights
    .map((item) => buildHumanCoreConcept(item))
    .filter(Boolean);

  const coreConceptText = [];
  if (topicCoreTemplates[accountingTopic]) {
    coreConceptText.push(topicCoreTemplates[accountingTopic]);
  }
  coreConcepts.forEach((item) => {
    if (!coreConceptText.some((existing) => normalizeConcept(existing) === normalizeConcept(item))) {
      coreConceptText.push(item);
    }
  });

  if (coreConceptText.length) {
    pushNote("核心觀念", coreConceptText.slice(0, 2).join(" "));
  }

  if (accountingTerms.length) {
    const topTerms = accountingTerms
      .slice(0, 4)
      .map((term) => `${term.en}（${term.zh}）`)
      .join("、");
    pushNote("關鍵詞", `這份內容反覆聚焦在 ${topTerms}，代表這些概念是理解全文與後續複習時最應優先掌握的核心內容。`);
  }

  if (criticalHighlights.length >= 2) {
    const relationText = criticalHighlights
      .slice(0, 2)
      .map((item) => buildHumanCoreConcept(item))
      .filter(Boolean)
      .join("；");
    pushNote("重點關聯", `若把全文當成一套筆記來看，最需要一起理解的重點包括：${relationText}。這些內容通常不是各自獨立出現，而是會在定義、用途、公式或判讀上彼此連動。`);
  }

  const topicSummaryHints = {
    financial_statement: "考試上要特別注意各報表的功能、呈現重點與彼此之間的關聯，因為這類內容常被拿來考用途比較與報表判讀。",
    assets_liabilities_equity: "考試上要特別注意資產、負債與權益的分類邏輯，以及各項科目的性質、歸類方式與會計方程式脈絡。",
    income_statement: "考試上要特別注意收入、費用、毛利與淨利之間的形成邏輯，並理解各項收益與成本如何影響損益結果。",
    cash_flow: "考試上要特別注意營業、投資與籌資活動的分類依據，並清楚區分各類現金流量的來源與意義。",
    financial_ratio: "考試上要特別注意各財務比率的公式、用途、變動方向與判讀意義，因為這些通常是最容易直接出題的部分。",
    investment: "考試上要特別注意金融資產的分類基礎、公允價值衡量方式，以及不同類別在損益與其他綜合損益中的認列差異。",
    journal_entry: "考試上要特別注意交易事件、借貸方向與科目增減變化，因為分錄題通常會直接要求你判斷會計處理原因。"
  };

  if (topicSummaryHints[accountingTopic]) {
    pushNote("考試提醒", topicSummaryHints[accountingTopic]);
  }

  const supportingHighlights = highlights
    .filter((item) => !item.isCritical)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => cleanClause(item.fullText || item.sentence || item.core))
    .filter(Boolean);

  if (supportingHighlights.length) {
    pushNote("延伸理解", `${supportingHighlights.join("；")}。這些內容通常是老師用來補充原因、差異、限制或應用情境的地方，複習時不要只背名詞，也要一起理解它們在題目中的用途。`);
  }

  const sectionBlocks = buildSectionSummaryBlocks(sourceSections, keywordScores, modeConfig);
  const summaryBody = summaryParts
    .slice(0, Math.max(modeConfig.summaryMin + 2, 6))
    .join("\n\n");

  if (sectionBlocks.length <= 1) {
    return summaryBody;
  }

  return `${summaryBody}\n\n分段整理\n${sectionBlocks.join("\n\n")}`;
}

function buildSectionSummaryBlocks(sourceSections, keywordScores, modeConfig) {
  if (!Array.isArray(sourceSections) || !sourceSections.length) {
    return [];
  }

  return sourceSections
    .map((section, index) => {
      const title = normalizeText(section?.title || "") || `第 ${index + 1} 段`;
      const sectionText = normalizeAccountingRawText(normalizeText(section?.text || ""));
      const sectionSentences = splitSentences(sectionText)
        .map((sentence) => normalizeStudySentence(sentence))
        .filter(Boolean)
        .filter((sentence) => sentence.length >= 6);

      if (!sectionSentences.length) {
        return null;
      }

      const ranked = sectionSentences
        .map((sentence, sentenceIndex) => ({
          sentence,
          sentenceIndex,
          score: scoreSentence(sentence, keywordScores)
        }))
        .sort((a, b) => b.score - a.score || a.sentenceIndex - b.sentenceIndex)
        .slice(0, Math.min(2, Math.max(1, modeConfig.summaryMin - 1)))
        .sort((a, b) => a.sentenceIndex - b.sentenceIndex)
        .map((item) => cleanClause(item.sentence))
        .filter(Boolean);

      if (!ranked.length) {
        return null;
      }

      return `【${title}】\n- ${ranked.join("\n- ")}`;
    })
    .filter(Boolean);
}

function getSentenceRole(sentence) {
  if (looksLikeStructureHeadingOnly(sentence)) {
    return "heading";
  }
  if (/總結|結論|顯示|總而言之/.test(sentence)) {
    return "conclusion";
  }
  if (/借方|貸方|借：|貸：|分錄|會計處理/.test(sentence)) {
    return "journal";
  }
  if (/是|代表|意指|可視為|稱為/.test(sentence) && !/如果|是否/.test(sentence)) {
    return "definition";
  }
  if (/分為|包括|可分成|分類為|區分為/.test(sentence)) {
    return "classification";
  }
  if (/公式|計算|等於|除以|乘以|加總/.test(sentence)) {
    return "formula";
  }
  if (/用途|用來|目的|功能/.test(sentence)) {
    return "usage";
  }
  if (/因為|由於|原因|來自|導致/.test(sentence)) {
    return "cause";
  }
  if (/因此|所以|使|造成|帶來|影響|結果|提升|降低/.test(sentence)) {
    return "effect";
  }
  if (/比較|差異|關聯|不同|相較|相比/.test(sentence)) {
    return "comparison";
  }
  if (/例如|像是|譬如|舉例|案例/.test(sentence)) {
    return "example";
  }
  return "general";
}

function getSentenceRoleScore(sentence) {
  const role = getSentenceRole(sentence);
  if (role === "heading") {
    return -3;
  }
  if (role === "journal") {
    return 3.2;
  }
  if (role === "definition" || role === "effect" || role === "conclusion") {
    return 2.3;
  }
  if (role === "classification" || role === "formula" || role === "usage") {
    return 2;
  }
  if (role === "cause" || role === "comparison") {
    return 1.7;
  }
  if (role === "example") {
    return -1.2;
  }
  return 0;
}

function extractClauses(sentence) {
  return sentence
    .split(/[，；：]/)
    .map((clause) => normalizeText(clause))
    .filter(Boolean);
}

function cleanClause(clause) {
  return normalizeText(
    clause
      .replace(/^第\s*[0-9一二三四五六七八九十百]+\s*(頁|張|個|段|章|節|部分|單元|投影片|圖片)\s*/, "")
      .replace(/^(附註|補充|備註|說明|重點整理)\s*[：:]\s*/, "")
      .replace(/[。！？!?]+$/g, "")
  );
}

function scoreClause(clause) {
  let score = clause.length >= 6 && clause.length <= 32 ? 1.4 : 0.4;
  if (/因此|所以|核心|主要|關鍵|重點|代表|指出|顯示|目的|原因|影響|定義|公式|計算|用途|分類|借方|貸方|分錄/.test(clause)) {
    score += 1.2;
  }
  if (/例如|像是|譬如|舉例|案例/.test(clause)) {
    score -= 1;
  }
  return score;
}

function selectMainClause(clauses) {
  if (!clauses.length) {
    return "";
  }
  return [...clauses]
    .map((clause, index) => ({
      clause: cleanClause(clause),
      index,
      score: scoreClause(clause)
    }))
    .filter((item) => item.clause.length > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.clause || cleanClause(clauses[0]);
}

function selectDetailClause(clauses, mainClause) {
  const detailCandidate = clauses
    .map((clause) => cleanClause(clause))
    .find((clause) => clause && clause !== mainClause && clause.length >= 6);

  if (!detailCandidate) {
    return "";
  }

  return detailCandidate.length > 52 ? `${detailCandidate.slice(0, 52)}...` : detailCandidate;
}

function normalizeConcept(text) {
  return cleanClause(text).replace(/[^\u4e00-\u9fffA-Za-z0-9]/g, "");
}

function haveStrongConceptOverlap(a, b) {
  const tokensA = new Set(tokenize(a));
  const tokensB = new Set(tokenize(b));
  let overlap = 0;
  tokensA.forEach((token) => {
    if (tokensB.has(token)) {
      overlap += 1;
    }
  });
  return overlap >= 2;
}

function collectMatchedFinanceTerms(text) {
  return accountingReferenceEntries.filter((entry) =>
    entry.aliases.some((alias) => includesAlias(text, alias))
  );
}

function isCriticalHighlightCandidate(item) {
  if (!item) {
    return false;
  }

  return ["journal", "definition", "formula", "conclusion"].includes(item.role)
    || item.score >= 10
    || item.matchedTerms.length >= 2;
}

function buildHighlightItem(sentence, rankedSentences, index, modeConfig) {
  const clauses = extractClauses(sentence);
  const cleanedSentence = cleanClause(sentence);
  const core = selectMainClause(clauses) || cleanClause(sentence);
  let detail = "";

  if (modeConfig.highlightStyle === "explain") {
    detail = selectDetailClause(clauses, core);
    if (!detail) {
      const nextRelated = rankedSentences
        .slice(index + 1)
        .find((item) => haveStrongConceptOverlap(sentence, item.sentence) && getSentenceRole(item.sentence) !== "example");
      if (nextRelated) {
        const nextSentence = cleanClause(nextRelated.sentence);
        detail = nextSentence.length > 52 ? `${nextSentence.slice(0, 52)}...` : nextSentence;
      }
    }
  }

  if (detail === core) {
    detail = "";
  }

  return {
    core,
    detail,
    role: getSentenceRole(sentence),
    sentence,
    fullText: cleanedSentence,
    score: scoreSentence(sentence, buildKeywordScores(tokenize(sentence))),
    matchedTerms: collectMatchedFinanceTerms(cleanedSentence)
  };
}

function isDuplicateHighlight(existingItems, nextItem) {
  return existingItems.some((item) => {
    if (normalizeConcept(item.fullText || item.sentence || "") === normalizeConcept(nextItem.fullText || nextItem.sentence || "")) {
      return true;
    }
    if (normalizeConcept(item.core) === normalizeConcept(nextItem.core)) {
      return true;
    }
    const sharedTerms = item.matchedTerms.filter((term) =>
      nextItem.matchedTerms.some((candidate) => candidate.term === term.term)
    );
    if (sharedTerms.length >= 2) {
      return true;
    }
    return haveStrongConceptOverlap(item.core, nextItem.core);
  });
}

function formatHighlightItem(item) {
  if (typeof item === "string") {
    return {
      core: item,
      detail: "",
      role: "general",
      sentence: item,
      fullText: item,
      text: replaceFinanceTermsWithBilingual(item),
      isCritical: false,
      matchedTerms: collectMatchedFinanceTerms(item)
    };
  }
  if (!item) {
    return {
      core: "",
      detail: "",
      role: "general",
      sentence: "",
      fullText: "",
      text: "",
      isCritical: false,
      matchedTerms: []
    };
  }

  const plainText = item.fullText || item.sentence || (item.detail ? `${item.core}：${item.detail}` : item.core);
  return {
    ...item,
    text: replaceFinanceTermsWithBilingual(plainText),
    isCritical: false,
    matchedTerms: item.matchedTerms
  };
}

function buildHighlights(sentences, keywordScores, modeConfig) {
  const rankedSentences = sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: scoreSentence(sentence, keywordScores)
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const highlightItems = [];
  rankedSentences.forEach((item, index) => {
    if (highlightItems.length >= Math.min(modeConfig.highlightCount, sentences.length)) {
      return;
    }
    if (isUnusableStructuredSentence(item.sentence)) {
      return;
    }
    if (isWeakContextSentence(item.sentence)) {
      return;
    }
    if (getSentenceRole(item.sentence) === "example" && highlightItems.length >= 2) {
      return;
    }
    const highlight = buildHighlightItem(item.sentence, rankedSentences, index, modeConfig);
    if (!highlight.core || highlight.core.length < 4) {
      return;
    }
    if (!isDuplicateHighlight(highlightItems, highlight)) {
      highlightItems.push(highlight);
    }
  });

  const formattedItems = highlightItems.map((item) => formatHighlightItem(item));
  const criticalIndexes = formattedItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => isCriticalHighlightCandidate(item))
    .sort((a, b) => b.item.score - a.item.score || a.index - b.index)
    .slice(0, modeConfig.criticalCount || 3)
    .map(({ index }) => index);
  const criticalIndexSet = new Set(criticalIndexes);

  return formattedItems.map((item, index) => ({
    ...item,
    isCritical: criticalIndexSet.has(index)
  }));
}

function extractQuestionTopic(highlight) {
  if (!highlight) {
    return "";
  }
  const topKeyword = tokenize(highlight.core).find((token) => token.length >= 2);
  return topKeyword || highlight.core;
}

function getHighlightDisplayText(highlight) {
  return highlight?.text || replaceFinanceTermsWithBilingual(highlight?.detail ? `${highlight.core}：${highlight.detail}` : highlight?.core || "");
}

function ensureSentenceEnding(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return "";
  }
  return /[。！？!?]$/.test(normalized) ? normalized : `${normalized}。`;
}

function buildStudySentence(text, matchedTerms = []) {
  const normalized = normalizeStudySentence(text);
  if (!normalized || isUnusableStructuredSentence(normalized)) {
    return "";
  }

  const cleaned = cleanClause(normalized);
  if (!cleaned) {
    return "";
  }

  let sentence = cleaned;
  if (matchedTerms.length && !matchedTerms.some((entry) => sentence.includes(entry.term))) {
    sentence = `${matchedTerms[0].term}的重點是${sentence}`;
  }

  sentence = sentence
    .replace(/^因此\s*/, "整理後可知，")
    .replace(/^所以\s*/, "因此，")
    .replace(/^另外\s*/, "另外，")
    .replace(/^此外\s*/, "此外，");

  return ensureSentenceEnding(normalizeChineseOutputText(sentence));
}

function buildImportantSentences(highlights, modeConfig, accountingContext = {}) {
  const items = highlights
    .filter((item) => item.isCritical)
    .sort((a, b) => b.score - a.score)
    .slice(0, modeConfig.criticalCount || 3)
    .map((item) => ({
      ...item,
      text: buildStudySentence(item.fullText || item.sentence || item.core, item.matchedTerms)
    }));

  if (items.length) {
    return items;
  }

  return (accountingContext.terms || []).slice(0, modeConfig.criticalCount || 3).map((term) => ({
    text: ensureSentenceEnding(`${term.zh}是這份內容中的核心會計名詞，且在原始內容中共出現 ${term.count} 次。`),
    isCritical: true,
    matchedTerms: [{ term: term.zh }]
  }));
}

function buildGeneralNotes(sentences, highlights, modeConfig, accountingContext = {}) {
  const notes = [];
  const seen = new Set();

  highlights
    .filter((item) => !item.isCritical)
    .forEach((item) => {
      const sentence = buildStudySentence(item.fullText || item.sentence || item.core, item.matchedTerms);
      const normalized = normalizeConcept(sentence);
      if (sentence && !seen.has(normalized)) {
        seen.add(normalized);
        notes.push({
          text: sentence,
          matchedTerms: item.matchedTerms || [],
          isCritical: false
        });
      }
    });

  if (notes.length < Math.max(3, modeConfig.summaryMin)) {
    sentences.forEach((sentence) => {
      const candidateText = buildStudySentence(sentence, collectMatchedFinanceTerms(sentence));
      const normalized = normalizeConcept(candidateText);
      if (
        candidateText &&
        candidateText.length >= 10 &&
        !isWeakContextSentence(sentence) &&
        !seen.has(normalized)
      ) {
        seen.add(normalized);
        notes.push({
          text: candidateText,
          matchedTerms: collectMatchedFinanceTerms(sentence),
          isCritical: false
        });
      }
    });
  }

  if (notes.length < 3) {
    (accountingContext.terms || []).slice(0, 4).forEach((term) => {
      const fallback = ensureSentenceEnding(`${term.zh}是這份內容的重要會計主題，整理時應優先理解其定義、用途與判讀方式。`);
      const normalized = normalizeConcept(fallback);
      if (!seen.has(normalized)) {
        seen.add(normalized);
        notes.push({
          text: fallback,
          matchedTerms: [{ term: term.zh }],
          isCritical: false
        });
      }
    });
  }

  return notes.slice(0, Math.max(4, modeConfig.highlightCount - (modeConfig.criticalCount || 3)));
}

function buildAccountingTermList(accountingTerms, limit = 8) {
  return accountingTerms
    .slice(0, limit)
    .map((entry) => ({
      label: `${entry.zh}｜出現 ${entry.count} 次`,
      description: ensureSentenceEnding(`${entry.zh}是本文中的高頻會計或財務名詞，整理時應優先掌握它的定義、用途與判讀方式。`)
    }));
}

function buildAccountingTermsFromReference(text, limit = 20) {
  if (!text) {
    return [];
  }

  return accountingReferenceEntries
    .map((entry) => {
      const aliasVariants = [...new Set((entry.aliases || []).flatMap((alias) => buildAccountingAliasVariants({ zh: entry.term }, alias)))];
      let count = aliasVariants.reduce((sum, alias) => (
        sum + countAliasOccurrences(text, alias)
      ), 0);

      if (!count) {
        const compactText = normalizeAccountingSearchText(text);
        const compactHit = aliasVariants.some((alias) => {
          const compactAlias = normalizeAccountingSearchText(alias);
          return compactAlias && compactText.includes(compactAlias);
        });
        if (compactHit) {
          count = 1;
        }
      }

      return {
        en: entry.displayEnglish,
        zh: entry.term,
        count,
        priority: entry.priority || 0,
        topic: entry.topic || "general",
        category: entry.category || "concept",
        label: `${entry.displayEnglish}（${entry.term}）`
      };
    })
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || b.priority - a.priority || a.en.length - b.en.length)
    .slice(0, limit);
}

function buildFormulaCards(accountingTerms, text, limit = 6) {
  const matched = accountingFormulaKnowledgeBase
    .map((entry) => {
      const count = (entry.aliases || []).reduce((sum, alias) => sum + countAliasOccurrences(text, alias), 0);
      return {
        ...entry,
        count
      };
    })
    .filter((entry) => entry.count > 0 || accountingTerms.some((term) => entry.aliases.some((alias) => term.zh === alias || term.en.toLowerCase() === alias.toLowerCase())))
    .sort((a, b) => b.count - a.count || b.formula.length - a.formula.length)
    .slice(0, limit);

  return matched.map((entry) => ({
    label: replaceFinanceTermsWithBilingual(entry.title),
    description: `${replaceFinanceTermsWithBilingual(entry.formula)}。${replaceFinanceTermsWithBilingual(entry.explanation)}`
  }));
}

function buildPossibleExamPoints(highlights, accountingTerms, accountingTopic, limit = 5) {
  const points = [];
  const seen = new Set();

  const pushPoint = (text, isCritical = false) => {
    const normalizedText = normalizeChineseOutputText(text);
    const sentence = ensureSentenceEnding(normalizedText);
    const key = normalizeConcept(sentence);
    if (!sentence || !key || seen.has(key)) {
      return;
    }
    seen.add(key);
    points.push({ text: sentence, isCritical });
  };

  const topicHints = {
    financial_statement: "這份內容的核心在於分辨各財務報表提供的資訊功能。若出題，通常不只問名稱，而是要你判斷哪一張報表最能支持特定分析目的。",
    assets_liabilities_equity: "這裡要掌握的是資產、負債與權益之間的結構關係。題目常會從分類、增減影響，或三者如何連動來考觀念是否穩固。",
    income_statement: "這個主題常考收入、費用、毛利與淨利之間的形成邏輯。作答時要說清楚項目之間如何一步步影響最終獲利結果。",
    cash_flow: "這份內容的重點通常不是死背分類，而是判斷一筆活動為什麼屬於營業、投資或籌資現金流量。",
    financial_ratio: "比率分析最常考公式、用途與高低代表的意義。真正的關鍵是知道數值變動時，代表企業的財務結構或經營狀況出了什麼變化。",
    investment: "投資主題最容易考金融資產分類、公允價值衡量，以及損益與其他綜合損益的認列差異。若要拿分，不能只背名稱，還要說明判斷依據與後續影響。",
    journal_entry: "分錄題的核心不是只背借貸方向，而是先判斷交易影響了哪些科目，再說明為什麼要這樣記錄。考題也常把調整分錄和一般交易分錄放在一起比較。"
  };

  if (topicHints[accountingTopic]) {
    pushPoint(topicHints[accountingTopic]);
  }

  const generalStarters = [
    "這裡的重點是",
    "這句話可以整理成一個核心觀念",
    "如果這個觀念出現在題目中，重點通常不是背誦，而是",
    "這個重點適合用一到兩句話記住"
  ];

  const buildHighlightExamPoint = (item, index) => {
    const base = normalizeChineseOutputText(item.text || getHighlightDisplayText(item));
    const matchedTerms = [...new Set((item.matchedTerms || []).map((term) => term.term || term.zh || term.label).filter(Boolean))];
    const keyTerm = matchedTerms[0] || "";

    switch (item.role) {
      case "definition":
        return `${generalStarters[index % generalStarters.length]}：${base} 若出成定義題，先說概念本身是什麼，再補它的用途或判讀重點。`;
      case "formula":
        return `這裡真正要會的是公式怎麼用：${base} 作答時要交代各變數代表什麼，並說明數值變動會讓結論往哪個方向移動。`;
      case "comparison":
        return `這個觀念容易用比較題來考：${base} 作答時不要只列差異，還要指出判斷依據或適用情境。`;
      case "classification":
        return `這句話可以整理成分類邏輯：${base} 題目若要求比較，先寫分類標準，再說各類別為什麼不同。`;
      case "journal":
        return `這個重點適合拿來考分錄判斷：${base} 作答時先抓交易影響的科目，再決定借貸方向，會比死背答案更穩。`;
      case "usage":
        return `如果這個觀念出現在題目中，重點通常不是背誦，而是理解它能拿來判斷什麼：${base}`;
      case "cause":
      case "effect":
        return `這裡要掌握的是因果關係：${base} 題目常會反過來問，某個變化為什麼會造成這樣的結果。`;
      default:
        if (item.isCritical && keyTerm) {
          return `這裡的重點是先抓住「${keyTerm}」在整段內容中的角色：${base} 若要拿高分，最好補一句它和其他概念之間的關聯。`;
        }
        return `${generalStarters[index % generalStarters.length]}：${base}`;
    }
  };

  highlights.slice(0, limit).forEach((item, index) => {
    pushPoint(buildHighlightExamPoint(item, index), item.isCritical);
  });

  const termTopicHints = {
    financial_ratio: "這個名詞常和公式、用途以及高低代表的意義一起考。",
    investment: "這個名詞常和投資分類、公允價值衡量或認列位置一起比較。",
    journal_entry: "這個名詞容易出現在分錄題，重點是判斷交易影響與借貸方向。",
    cash_flow: "這個名詞常和現金流量分類依據一起出題。",
    general: "這個名詞通常不只考定義，還會搭配用途、判斷邏輯或和相近概念的差異。"
  };

  accountingTerms.slice(0, 3).forEach((term) => {
    const label = normalizeChineseOutputText(term.zh || term.term || term.label || "");
    if (!label) {
      return;
    }
    const hint = termTopicHints[accountingTopic] || termTopicHints.general;
    pushPoint(`${label}是這份內容中的高頻關鍵概念。${hint}`);
  });

  return points.slice(0, limit);
}

function buildEnglishExplanationBlocks(rawText, accountingTerms, limit = 4) {
  const { englishSentences } = splitSentencesByLanguage(rawText);
  const blocks = [];

  englishSentences.forEach((sentence) => {
    if (blocks.length >= limit) {
      return;
    }
    const matched = accountingTerms.filter((term) => includesAlias(sentence, term.en) || includesAlias(sentence, term.zh));
    if (!matched.length) {
      return;
    }
    blocks.push({
      label: sentence,
      description: ensureSentenceEnding(`這句英文原文主要在說明${matched.map((term) => term.zh).join("、")}，可搭配上方中文整理一起理解。`)
    });
  });

  if (!blocks.length) {
    accountingTerms.slice(0, limit).forEach((term) => {
      blocks.push({
        label: term.en,
        description: ensureSentenceEnding(`${term.zh}是本文中的重要英文原文名詞，可搭配原句一起記憶。`)
      });
    });
  }

  return blocks.slice(0, limit);
}

function buildImportanceReasons(highlights, accountingTerms, accountingTopic, limit = 5) {
  const reasons = highlights
    .filter((item) => item.isCritical)
    .slice(0, limit)
    .map((item) => {
      const reasonParts = [];
      if (["definition", "formula", "conclusion", "journal"].includes(item.role)) {
        reasonParts.push("句型本身屬於定義、公式、結論或分錄重點");
      }
      if (item.matchedTerms?.length) {
        reasonParts.push(`命中了 ${item.matchedTerms.slice(0, 3).map((term) => term.term || term.zh || term.label).join("、")}`);
      }
      if (accountingTopic && accountingTopic !== "general") {
        reasonParts.push(`目前主題判斷偏向 ${accountingTopic}`);
      }
      return {
        label: item.text || getHighlightDisplayText(item),
        description: ensureSentenceEnding(`這句被列為重要句子，原因是：${reasonParts.join("；")}。`)
      };
    });

  if (!reasons.length && accountingTerms.length) {
    return accountingTerms.slice(0, limit).map((term) => ({
      label: `${term.zh}`,
      description: ensureSentenceEnding(`這個名詞在原文中出現 ${term.count} 次，且屬於高權重會計主題，因此被視為重要。`)
    }));
  }

  return reasons;
}

function buildMockExamQuestions(mode, keywords, highlights, summary, sentences, modeConfig, text, accountingContext = {}) {
  const questions = [];
  const isFinance = isFinanceContent(text, keywords);
  const important = highlights.filter((item) => item.isCritical);
  const topic = accountingContext.topic || "general";
  const accountingTerms = accountingContext.terms || [];

  if (isFinance) {
    accountingTerms.slice(0, 3).forEach((entry) => {
      questions.push(buildQuestionAnswerPair(
        normalizeChineseOutputText(`延伸練習：請定義「${entry.zh}」，並說明它在本文中的用途或判讀重點。`),
        ensureSentenceEnding(normalizeChineseOutputText(`${entry.zh}是這份內容中的重要名詞，作答時可先定義，再說明它在本文中的角色。`))
      ));
    });

    const journalQuestion = buildJournalEntryQuestions(sentences)[0];
    if (journalQuestion && topic === "journal_entry") {
      questions.push({
        question: `延伸練習：${journalQuestion.question}`,
        answer: journalQuestion.answer
      });
    }
  }

  important.slice(0, 2).forEach((item) => {
    questions.push(buildQuestionAnswerPair(
      `延伸練習：請根據重點說明這段內容最可能考什麼觀念？`,
      buildStudySentence(item.fullText || item.sentence || item.core, item.matchedTerms)
    ));
  });

  if (summary && questions.length < Math.max(3, modeConfig.questionCount - 1)) {
    const topicHints = {
      financial_ratio: "可特別補充比率的公式、用途與判讀方向。",
      assets_liabilities_equity: "可特別補充資產、負債與權益之間的關係。",
      income_statement: "可特別補充收入、費用與淨利之間的變化。",
      cash_flow: "可特別補充營業、投資與籌資活動的差異。",
      investment: "可特別補充公允價值衡量與投資分類。",
      journal_entry: "可特別補充分錄借貸方向與會計處理原因。",
      financial_statement: "可特別補充報表功能與使用時點。"
    };
    questions.push(buildQuestionAnswerPair(
      "延伸練習：請用一到兩句話寫出這份內容的整體結論。",
      ensureSentenceEnding(normalizeChineseOutputText(`${summary}${topicHints[topic] ? ` ${topicHints[topic]}` : ""}`))
    ));
  }

  return questions
    .filter((item, index, list) => list.findIndex((entry) => entry.question === item.question) === index)
    .slice(0, Math.max(3, modeConfig.questionCount));
}

function enhanceQuestionText(question) {
  const enhancement = getSelectedEnhancement();
  if (enhancement === "future-ai") {
    return question
      .replace(/^「(.+)」是什麼？$/, "請解釋「$1」這個名詞，並說明它在本文中的重點。")
      .replace(/^這份內容的主要結論是什麼？$/, "如果這段內容出成考題，最可能考哪個結論？");
  }
  return question;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildEnglishAliasRegExp(alias, flags = "i") {
  const pattern = alias
    .trim()
    .split(/\s+/)
    .map((part) => escapeRegExp(part))
    .join("\\s+");
  return new RegExp(`\\b${pattern}\\b`, flags);
}

function normalizeAccountingSearchText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[‐‑–—-]/g, "-")
    .replace(/[()（）［］\[\]{}]/g, " ")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

const accountingOcrCorrections = [
  [/\blncome\b/gi, "Income"],
  [/\blnventory\b/gi, "Inventory"],
  [/\blnterest\b/gi, "Interest"],
  [/\blnvesting\b/gi, "Investing"],
  [/\blnvestment\b/gi, "Investment"],
  [/\blnvestments\b/gi, "Investments"],
  [/\bEqulty\b/gi, "Equity"],
  [/\bLiabillties\b/gi, "Liabilities"],
  [/\bRecelvable\b/gi, "Receivable"],
  [/\bPayab1e\b/gi, "Payable"],
  [/\bAcc0unts\b/gi, "Accounts"],
  [/\bCas h\b/gi, "Cash"],
  [/\bNetincome\b/gi, "Net Income"],
  [/\bGrossprofit\b/gi, "Gross Profit"],
  [/\bCurrentratio\b/gi, "Current Ratio"],
  [/\bQuickratio\b/gi, "Quick Ratio"],
  [/\bAcidtest\b/gi, "Acid Test"],
  [/\bShortterm\b/gi, "Short Term"],
  [/\bLongterm\b/gi, "Long Term"],
  [/\bTaxexpense\b/gi, "Tax Expense"],
  [/\bCashflow\b/gi, "Cash Flow"],
  [/\bBalanceSheet\b/gi, "Balance Sheet"],
  [/\bIncomeStatement\b/gi, "Income Statement"],
  [/\bAccountsreceivable\b/gi, "Accounts Receivable"],
  [/\bAccountspayable\b/gi, "Accounts Payable"],
  [/\bRetainedearnings\b/gi, "Retained Earnings"]
];

function normalizeAccountingRawText(text) {
  return accountingOcrCorrections.reduce((output, [pattern, replacement]) => (
    output.replace(pattern, replacement)
  ), text || "");
}

function buildLooseEnglishAliasRegExp(alias, flags = "i") {
  const pattern = alias
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => escapeRegExp(part))
    .join("[\\s\\-_/()（）]*");
  return new RegExp(pattern, flags);
}

function buildAccountingAliasVariants(entry, alias) {
  const variants = new Set([alias]);
  const normalizedAlias = alias.toLowerCase().replace(/[‐‑–—]/g, "-");

  if (/^[A-Za-z][A-Za-z0-9' -]*$/.test(alias)) {
    variants.add(normalizedAlias.replace(/\s+/g, ""));
    variants.add(normalizedAlias.replace(/[\s-]+/g, ""));

    const words = normalizedAlias.split(/[\s-]+/).filter(Boolean);
    const genericWords = new Set(["ratio", "expense", "revenue", "income", "assets", "asset", "liabilities", "liability", "activities", "activity", "statement", "stock", "investments", "investment"]);
    const coreWords = words.filter((word) => !genericWords.has(word));
    if (coreWords.length >= 1) {
      variants.add(coreWords.join(""));
      variants.add(coreWords.join(" "));
    }

    const zhSuffixes = [];
    if (/ratio/.test(normalizedAlias)) zhSuffixes.push("比率");
    if (/expense/.test(normalizedAlias)) zhSuffixes.push("費用", "費");
    if (/revenue|income/.test(normalizedAlias)) zhSuffixes.push("收入", "營收");
    if (/assets?/.test(normalizedAlias)) zhSuffixes.push("資產");
    if (/liabilit(y|ies)/.test(normalizedAlias)) zhSuffixes.push("負債");
    if (/equity/.test(normalizedAlias)) zhSuffixes.push("權益");
    if (/cash/.test(normalizedAlias)) zhSuffixes.push("現金");
    if (/inventory|inventories/.test(normalizedAlias)) zhSuffixes.push("存貨");
    if (/receivable/.test(normalizedAlias)) zhSuffixes.push("應收帳款", "應收款項");
    if (/payable/.test(normalizedAlias)) zhSuffixes.push("應付帳款", "應付款項");

    coreWords.forEach((word) => {
      zhSuffixes.forEach((suffix) => variants.add(`${word}${suffix}`));
    });
  }

  if (entry?.zh) {
    variants.add(entry.zh);
    variants.add(normalizeAccountingSearchText(entry.zh));
  }

  return [...variants].filter(Boolean);
}

function includesAlias(text, alias) {
  if (!text || !alias) {
    return false;
  }

  if (/^[A-Za-z][A-Za-z0-9 -]*$/.test(alias)) {
    return buildEnglishAliasRegExp(alias, "i").test(text);
  }

  return text.includes(alias);
}

function getFinanceMatches(text) {
  return accountingReferenceEntries.filter((entry) =>
    entry.aliases.some((alias) => includesAlias(text, alias))
  );
}

function getJournalEntryMatches(text) {
  return journalEntryKnowledgeBase.filter((entry) =>
    entry.aliases.some((alias) => includesAlias(text, alias)) || includesAlias(text, entry.pattern)
  );
}

function countAliasOccurrences(text, alias) {
  if (!text || !alias) {
    return 0;
  }

  if (/^[A-Za-z][A-Za-z0-9' -]*$/.test(alias)) {
    const matches = text.match(buildEnglishAliasRegExp(alias, "gi"));
    if (matches?.length) {
      return matches.length;
    }
    const looseMatches = text.match(buildLooseEnglishAliasRegExp(alias, "gi"));
    return looseMatches ? looseMatches.length : 0;
  }

  return text.split(alias).length - 1;
}

function findAccountingTerms(text) {
  if (!text) {
    return [];
  }

  const rawText = normalizeAccountingRawText(normalizeText(text));
  const compactText = normalizeAccountingSearchText(rawText);

  return accountingGlossaryEntries
    .map((entry) => {
      const aliasVariants = [...new Set((entry.aliases || []).flatMap((alias) => buildAccountingAliasVariants(entry, alias)))];
      let count = aliasVariants.reduce((sum, alias) => (
        sum + countAliasOccurrences(rawText, alias)
      ), 0);

      if (!count) {
        const compactHit = aliasVariants.some((alias) => {
          const compactAlias = normalizeAccountingSearchText(alias);
          return compactAlias && compactText.includes(compactAlias);
        });
        if (compactHit) {
          count = 1;
        }
      }

      return {
        en: entry.displayEnglish,
        zh: entry.zh,
        count,
        priority: entry.priority || 0,
        topic: entry.topic || "general",
        category: entry.category || "concept",
        label: `${entry.displayEnglish}（${entry.zh}）`
      };
    })
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || b.priority - a.priority || a.en.length - b.en.length)
    .slice(0, 20);
}

function detectAccountingTopic(accountingTerms, text) {
  if (!accountingTerms.length && !text) {
    return "general";
  }

  const topicScores = {
    financial_statement: 0,
    assets_liabilities_equity: 0,
    income_statement: 0,
    cash_flow: 0,
    financial_ratio: 0,
    investment: 0,
    journal_entry: 0,
    general: 0
  };

  accountingTerms.forEach((entry) => {
    const boost = entry.count * Math.max(entry.priority || 1, 1);
    if (topicScores[entry.topic] !== undefined) {
      topicScores[entry.topic] += boost;
    }
    if (["account", "equity", "statement"].includes(entry.category)) {
      topicScores.assets_liabilities_equity += entry.count;
    }
    if (entry.category === "ratio") {
      topicScores.financial_ratio += entry.count;
    }
    if (entry.category === "cashflow") {
      topicScores.cash_flow += entry.count;
    }
  });

  if (/借方|貸方|分錄|調整分錄|試算表|journal entry|adjusting entry|trial balance/i.test(text)) {
    topicScores.journal_entry += 5;
  }

  const best = Object.entries(topicScores)
    .filter(([key]) => key !== "general")
    .sort((a, b) => b[1] - a[1])[0];

  return best && best[1] >= 6 ? best[0] : "general";
}

function isFinanceContent(text, keywords = []) {
  const financeMatches = getFinanceMatches(text);
  const accountingTerms = findAccountingTerms(text);
  if (financeMatches.length >= 2 || accountingTerms.length >= 2) {
    return true;
  }

  const financeHints = [
    "分錄", "借方", "貸方", "會計", "財務", "報表", "資產", "負債",
    "權益", "流動比率", "速動比率", "損益表", "現金流量表", "投資",
    "折現", "淨現值", "內部報酬率", "存貨", "應收帳款", "應付帳款"
  ];

  const hintCount = financeHints.filter((hint) => text.includes(hint) || keywords.includes(hint)).length;
  return hintCount >= 2;
}

function extractEvidenceSentence(term, sentences) {
  return sentences.find((sentence) => includesAlias(sentence, term)) || "";
}

function extractBestJournalEvidence(entry, sentences) {
  return sentences.find((sentence) =>
    entry.aliases.some((alias) => includesAlias(sentence, alias)) ||
    includesAlias(sentence, entry.pattern) ||
    haveStrongConceptOverlap(sentence, entry.title)
  ) || "";
}

function buildFinanceTermQuestion(entry, sentences) {
  const questionMap = {
    accounting: [
      `「${entry.term}」在會計上要如何解釋？`,
      `如果考試問到「${entry.term}」，應該怎麼作答？`
    ],
    account: [
      `「${entry.term}」屬於什麼性質的科目？要如何解釋？`,
      `「${entry.term}」在會計科目上應如何理解？`
    ],
    statement: [
      `「${entry.term}」主要在呈現什麼？`,
      `「${entry.term}」這張報表最重要的功能是什麼？`
    ],
    ratio: [
      `「${entry.term}」要如何解釋？它通常用來看什麼？`,
      `如果考到「${entry.term}」，重點應該寫哪兩件事？`
    ],
    cashflow: [
      `「${entry.term}」在現金流量表中代表什麼？`,
      `「${entry.term}」通常反映哪一類現金流動？`
    ],
    finance: [
      `「${entry.term}」在財務管理中要如何解釋？`,
      `「${entry.term}」這個財務名詞的核心意思是什麼？`
    ],
    managerial: [
      `「${entry.term}」的意思是什麼？在管理上怎麼用？`,
      `如果從管理角度出題，「${entry.term}」會怎麼考？`
    ],
    audit: [
      `「${entry.term}」在查核或控制上代表什麼？`,
      `「${entry.term}」在審計或內控中為什麼重要？`
    ],
    concept: [
      `「${entry.term}」是什麼？`,
      `請解釋「${entry.term}」這個概念。`
    ],
    default: [
      `請解釋「${entry.term}」這個專有名詞。`,
      `如果考試問到「${entry.term}」，你會怎麼定義？`
    ]
  };

  const evidence = extractEvidenceSentence(entry.term, sentences);
  const options = questionMap[entry.category] || questionMap.default;
  const question = rotateArray(options.map((item) => replaceFinanceTermsWithBilingual(item)), questionRefreshCounter)[0];
  const answer = evidence
    ? `${replaceFinanceTermsWithBilingual(entry.definition)} 內容中的相關句子是：${replaceFinanceTermsWithBilingual(cleanClause(evidence))}`
    : replaceFinanceTermsWithBilingual(entry.definition);

  return buildQuestionAnswerPair(question, answer);
}

function extractJournalEntrySentence(sentences) {
  return sentences.find((sentence) => /分錄|借方|貸方|借：|貸：|借方：|貸方：/.test(sentence)) || "";
}

function buildQuestionAnswerPair(question, answer) {
  return {
    question: enhanceQuestionText(question),
    answer: answer || "這題的答案可以參考上方重點整理。"
  };
}

function buildJournalEntryQuestions(sentences) {
  const journalSentences = sentences.filter((sentence) => /分錄|借方|貸方|借：|貸：|借方：|貸方：|會計處理/.test(sentence));
  const questions = [];
  const matchedEntries = getJournalEntryMatches(sentences.join(" "))
    .slice(0, 3);

  matchedEntries.forEach((entry) => {
    const evidence = extractBestJournalEvidence(entry, sentences);
    const prompts = rotateArray([
      `「${entry.title}」這筆分錄在記錄什麼交易？`,
      `如果考試出「${entry.title}」，借方與貸方通常怎麼寫？`,
      `「${entry.title}」這筆分錄為什麼要這樣記？`
    ], questionRefreshCounter);
    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(prompts[0]),
        `${replaceFinanceTermsWithBilingual(entry.pattern)}。${replaceFinanceTermsWithBilingual(entry.explanation)}${evidence ? ` 文件中的相關內容是：${replaceFinanceTermsWithBilingual(cleanClause(evidence))}` : ""}`
      )
    );
  });

  journalSentences.slice(0, 2).forEach((sentence) => {
    const normalized = cleanClause(sentence);
    if (/借方|貸方|借：|貸：/.test(sentence)) {
      const prompts = rotateArray([
        "這筆分錄的借方與貸方分別在表達什麼？",
        "這筆分錄最可能對應哪一種交易？",
        "如果老師考這筆分錄，作答重點應該是什麼？"
      ], questionRefreshCounter);
      questions.push(
        buildQuestionAnswerPair(
          replaceFinanceTermsWithBilingual(prompts[0]),
          `文件中的分錄內容是：${replaceFinanceTermsWithBilingual(normalized)}`
        )
      );
      return;
    }

    const prompts = rotateArray([
      "這段會計處理對應的是什麼分錄概念？",
      "這段敘述如果轉成考題，最可能問哪個分錄重點？"
    ], questionRefreshCounter);
    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(prompts[0]),
        `這段文字提到的分錄或會計處理重點是：${replaceFinanceTermsWithBilingual(normalized)}`
      )
    );
  });

  return questions
    .filter((item, index, list) => list.findIndex((entry) => entry.question === item.question && entry.answer === item.answer) === index)
    .slice(0, 3);
}

function findBestAnswerByTopic(topic, highlights, sentences, fallbackText = "") {
  const normalizedTopic = normalizeConcept(topic);
  const matchHighlight = highlights.find((highlight) => {
    const candidate = `${highlight.core} ${highlight.detail || ""}`;
    return normalizeConcept(candidate).includes(normalizedTopic) || haveStrongConceptOverlap(candidate, topic);
  });

  if (matchHighlight) {
    return getHighlightDisplayText(matchHighlight);
  }

  const matchSentence = sentences.find((sentence) => normalizeConcept(sentence).includes(normalizedTopic));
  return replaceFinanceTermsWithBilingual(matchSentence || fallbackText);
}

function buildFinanceQuestions(mode, keywords, highlights, summary, sentences, modeConfig, text, accountingContext = {}) {
  const targetCount = Math.max(modeConfig.questionCount, mode === "exam" ? 5 : 4);
  const questions = [];
  const financeMatches = accountingContext.terms?.length
    ? accountingContext.terms
        .slice(0, targetCount + 2)
        .map((term) => accountingReferenceEntries.find((entry) => entry.term === term.zh || entry.displayEnglish === term.en))
        .filter(Boolean)
    : getFinanceMatches(text)
        .sort((a, b) => (b.term.length - a.term.length))
        .slice(0, targetCount + 2);

  financeMatches.forEach((entry) => {
    if (questions.length < targetCount) {
      questions.push(buildFinanceTermQuestion(entry, sentences));
    }
  });

  highlights.forEach((highlight) => {
    if (questions.length >= targetCount) {
      return;
    }

    const topic = extractQuestionTopic(highlight);
    if (!topic || getFinanceMatches(topic).length) {
      return;
    }

    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(`這段重點中的「${topic}」在金融或會計脈絡下該怎麼理解？`),
        getHighlightDisplayText(highlight)
      )
    );
  });

  if (questions.length < targetCount && summary) {
    questions.push(
      buildQuestionAnswerPair(
        "這份金融內容最重要的考點是什麼？",
        replaceFinanceTermsWithBilingual(summary)
      )
    );
  }

  return questions
    .filter((item, index, list) => list.findIndex((entry) => entry.question === item.question) === index)
    .slice(0, targetCount);
}

function buildGenericQuestions(mode, keywords, highlights, summary, sentences, modeConfig, accountingContext = {}) {
  const questions = [];
  const primaryHighlight = highlights[0];
  const secondaryHighlight = highlights[1];
  const primaryTopic = accountingContext.terms?.[0]?.zh || keywords[0] || extractQuestionTopic(primaryHighlight) || "核心概念";
  const secondaryTopic = keywords[1] || extractQuestionTopic(secondaryHighlight);
  const explainPrompts = rotateArray([
    `請解釋「${primaryTopic}」這個名詞。`,
    `如果考試問「${primaryTopic}」，應該怎麼定義？`
  ], questionRefreshCounter);
  const usagePrompts = rotateArray([
    `「${primaryTopic}」在這份內容中的用途或重點是什麼？`,
    `「${primaryTopic}」最可能考哪個重點？`
  ], questionRefreshCounter);
  const comparePrompts = rotateArray([
    `請比較「${primaryTopic}」和「${secondaryTopic}」的關係或差異。`,
    `如果要區分「${primaryTopic}」和「${secondaryTopic}」，應該寫什麼？`
  ], questionRefreshCounter);

  questions.push(
    buildQuestionAnswerPair(
      replaceFinanceTermsWithBilingual(explainPrompts[0]),
      findBestAnswerByTopic(primaryTopic, highlights, sentences, primaryHighlight ? getHighlightDisplayText(primaryHighlight) : summary)
    )
  );

  if (primaryHighlight?.detail) {
    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(usagePrompts[0]),
        replaceFinanceTermsWithBilingual(primaryHighlight.detail || getHighlightDisplayText(primaryHighlight))
      )
    );
  } else if (secondaryTopic) {
    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(comparePrompts[0]),
        replaceFinanceTermsWithBilingual(`${primaryTopic}與${secondaryTopic}都屬於這份內容的重要重點，可一起從這段整理理解：${summary}`)
      )
    );
  }

  if (secondaryTopic && secondaryTopic !== primaryTopic) {
    questions.push(
      buildQuestionAnswerPair(
        replaceFinanceTermsWithBilingual(`如果考試要比較「${primaryTopic}」和「${secondaryTopic}」，應該抓什麼重點？`),
        replaceFinanceTermsWithBilingual(`${primaryTopic}與${secondaryTopic}的關聯可從重點整理看出：${[highlights[0], highlights[1]].filter(Boolean).map((item) => getHighlightDisplayText(item)).join("；")}`)
      )
    );
  } else if (highlights[1]) {
    questions.push(
      buildQuestionAnswerPair(
        "第二個重點最可能怎麼出題？",
        getHighlightDisplayText(highlights[1])
      )
    );
  } else if (summary) {
    questions.push(buildQuestionAnswerPair("這份內容最可能考出的結論是什麼？", replaceFinanceTermsWithBilingual(summary)));
  }

  const causeSentence = sentences.find((sentence) => /因為|由於|原因|目的|條件/.test(sentence));
  if (causeSentence && questions.length < modeConfig.questionCount + 1) {
    questions.push(
      buildQuestionAnswerPair(
        "請說明這段內容中的原因、條件或目的。",
        replaceFinanceTermsWithBilingual(cleanClause(causeSentence))
      )
    );
  }

  if (mode === "report" && questions.length < modeConfig.questionCount) {
    questions.push(buildQuestionAnswerPair("這份內容最重要的主張是什麼？", replaceFinanceTermsWithBilingual(summary)));
  }

  if (mode === "simple" && questions.length > modeConfig.questionCount) {
    return questions.slice(0, modeConfig.questionCount);
  }

  return questions
    .filter((item, index, list) => list.findIndex((entry) => entry.question === item.question) === index)
    .slice(0, modeConfig.questionCount);
}

function buildChineseQuestions(mode, keywords, highlights, summary, sentences, modeConfig, text, accountingContext = {}) {
  const isFinance = isFinanceContent(text, keywords);
  const questions = isFinance
    ? buildFinanceQuestions(mode, keywords, highlights, summary, sentences, modeConfig, text, accountingContext)
    : buildGenericQuestions(mode, keywords, highlights, summary, sentences, modeConfig, accountingContext);
  const journalEntryQuestions = buildJournalEntryQuestions(sentences);

  return {
    questions,
    journalEntryQuestions
  };
}

const englishPhraseTranslations = [
  ["financial statement analysis", "財務報表分析"],
  ["financial statements", "財務報表"],
  ["financial analysis", "財務分析"],
  ["income statement", "損益表"],
  ["balance sheet", "資產負債表"],
  ["cash flow statement", "現金流量表"],
  ["statement of cash flows", "現金流量表"],
  ["retained earnings", "保留盈餘"],
  ["working capital", "營運資金"],
  ["current ratio", "流動比率"],
  ["quick ratio", "速動比率"],
  ["debt ratio", "負債比率"],
  ["profit margin", "利潤率"],
  ["gross profit", "毛利"],
  ["net income", "淨利"],
  ["operating income", "營業利益"],
  ["operating activities", "營業活動"],
  ["investing activities", "投資活動"],
  ["financing activities", "融資活動"],
  ["accounts receivable", "應收帳款"],
  ["accounts payable", "應付帳款"],
  ["allowance for doubtful accounts", "備抵呆帳"],
  ["bad debt expense", "壞帳費用"],
  ["uncollectible accounts expense", "壞帳費用"],
  ["unearned service revenue", "預收服務收入"],
  ["unearned service revenues", "預收服務收入"],
  ["service revenue", "服務收入"],
  ["service revenues", "服務收入"],
  ["sales revenue", "銷貨收入"],
  ["sales revenues", "銷貨收入"],
  ["sales returns and allowances", "銷貨退回與折讓"],
  ["sales discounts", "銷貨折扣"],
  ["salaries wages payable", "應付薪資"],
  ["salaries payable", "應付薪資"],
  ["salary payable", "應付薪資"],
  ["wages payable", "應付薪資"],
  ["wage payable", "應付薪資"],
  ["salaries wages expense", "薪資費用"],
  ["salaries expense", "薪資費用"],
  ["salary expense", "薪資費用"],
  ["wages expense", "薪資費用"],
  ["wage expense", "薪資費用"],
  ["notes receivable", "應收票據"],
  ["notes payable", "應付票據"],
  ["unearned revenue", "預收收入"],
  ["deferred revenue", "預收收入"],
  ["accrued revenue", "應計收入"],
  ["accrued expense", "應計費用"],
  ["accumulated depreciation", "累計折舊"],
  ["accumulated depreciation equipment", "累計折舊-設備"],
  ["depreciation expense", "折舊費用"],
  ["amortization expense", "攤銷費用"],
  ["interest receivable", "應收利息"],
  ["interest payable", "應付利息"],
  ["interest revenue", "利息收入"],
  ["interest income", "利息收入"],
  ["interest expense", "利息費用"],
  ["income tax payable", "應付所得稅"],
  ["income tax expense", "所得稅費用"],
  ["supplies expense", "用品費用"],
  ["supplies", "用品"],
  ["prepaid advertising", "預付廣告費"],
  ["prepaid insurance", "預付保險費"],
  ["insurance expense", "保險費用"],
  ["prepaid rent", "預付租金"],
  ["rent expense", "租金費用"],
  ["rent payable", "應付租金"],
  ["rent receivable", "應收租金"],
  ["utilities payable", "應付水電費"],
  ["utilities expense", "水電費用"],
  ["advertising expense", "廣告費用"],
  ["office expense", "辦公費用"],
  ["repair expense", "維修費用"],
  ["repairs expense", "維修費用"],
  ["petty cash", "零用金"],
  ["cash equivalents", "約當現金"],
  ["short-term investments", "短期投資"],
  ["marketable securities", "短期投資"],
  ["merchandise inventory", "商品存貨"],
  ["office equipment", "辦公設備"],
  ["machinery and equipment", "機器設備"],
  ["transportation equipment", "運輸設備"],
  ["machinery", "機器設備"],
  ["vehicles", "運輸設備"],
  ["land", "土地"],
  ["buildings", "建築物"],
  ["building", "建築物"],
  ["equipment", "設備"],
  ["common stock", "普通股"],
  ["preferred stock", "特別股"],
  ["additional paid-in capital", "資本公積"],
  ["paid-in capital in excess of par", "資本公積"],
  ["treasury stock", "庫藏股"],
  ["cash dividends", "現金股利"],
  ["dividends payable", "應付股利"],
  ["owner's capital", "業主資本"],
  ["owner's drawing", "業主提款"],
  ["drawings", "業主提款"],
  ["income summary", "本期損益"],
  ["purchases", "進貨"],
  ["purchase returns and allowances", "進貨退出與折讓"],
  ["purchase discounts", "進貨折扣"],
  ["freight-in", "進貨運費"],
  ["transportation-in", "進貨運費"],
  ["freight-out", "銷貨運費"],
  ["delivery expense", "銷貨運費"],
  ["bonds payable", "應付公司債"],
  ["premium on bonds payable", "公司債溢價"],
  ["discount on bonds payable", "公司債折價"],
  ["mortgage payable", "應付抵押借款"],
  ["intangible assets", "無形資產"],
  ["patent", "專利權"],
  ["trademark", "商標權"],
  ["goodwill", "商譽"],
  ["straight-line method", "直線法"],
  ["double-declining-balance method", "倍數餘額遞減法"],
  ["units-of-production method", "生產數量法"],
  ["perpetual inventory system", "永續盤存制"],
  ["periodic inventory system", "定期盤存制"],
  ["lower of cost and net realizable value", "成本與淨變現價值孰低法"],
  ["statement of retained earnings", "保留盈餘表"],
  ["inventory turnover", "存貨週轉率"],
  ["return on assets", "資產報酬率"],
  ["return on equity", "股東權益報酬率"],
  ["earnings per share", "每股盈餘"],
  ["break even point", "損益兩平點"],
  ["cost of goods sold", "銷貨成本"],
  ["internal control", "內部控制"],
  ["financial performance", "財務績效"],
  ["business strategy", "企業策略"],
  ["market segmentation", "市場區隔"],
  ["target market", "目標市場"],
  ["competitive advantage", "競爭優勢"],
  ["customer satisfaction", "顧客滿意度"],
  ["brand awareness", "品牌知名度"],
  ["supply chain", "供應鏈"],
  ["value proposition", "價值主張"],
  ["human resources", "人力資源"],
  ["decision making", "決策"],
  ["case study", "個案研究"],
  ["research method", "研究方法"],
  ["research methods", "研究方法"],
  ["literature review", "文獻回顧"],
  ["study objective", "研究目標"],
  ["study objectives", "研究目標"],
  ["main argument", "主要論點"],
  ["supporting evidence", "支持證據"],
  ["key findings", "關鍵發現"],
  ["executive summary", "執行摘要"],
  ["oral presentation", "口頭報告"],
  ["presentation slide", "簡報投影片"],
  ["presentation slides", "簡報投影片"],
  ["class discussion", "課堂討論"],
  ["learning outcome", "學習成效"],
  ["learning outcomes", "學習成效"],
  ["study guide", "讀書指南"],
  ["practice question", "練習題"],
  ["practice questions", "練習題"],
  ["final exam", "期末考試"],
  ["midterm exam", "期中考試"],
  ["artificial intelligence", "人工智慧"],
  ["machine learning", "機器學習"],
  ["deep learning", "深度學習"],
  ["natural language processing", "自然語言處理"],
  ["computer vision", "電腦視覺"],
  ["large language model", "大型語言模型"],
  ["note taking", "筆記整理"],
  ["note-taking", "筆記整理"],
  ["key concepts", "核心概念"],
  ["key points", "重點"],
  ["review questions", "理解問題"],
  ["study materials", "學習資料"],
  ["final project", "期末專題"],
  ["data analysis", "資料分析"],
  ["personalized learning", "個人化學習"],
  ["learning progress", "學習進度"],
  ["teaching materials", "教材"],
  ["exam preparation", "考試準備"],
  ["report writing", "報告撰寫"],
  ["critical thinking", "批判思考"],
  ["problem solving", "問題解決"]
];

const englishWordTranslations = {
  accounting: "會計",
  assets: "資產",
  ai: "人工智慧",
  analysis: "分析",
  analyze: "分析",
  analyst: "分析人員",
  annual: "年度",
  article: "文章",
  balance: "餘額",
  bank: "銀行",
  budget: "預算",
  business: "企業",
  capital: "資本",
  case: "案例",
  company: "公司",
  concept: "概念",
  concepts: "概念",
  conclusion: "結論",
  content: "內容",
  course: "課程",
  cost: "成本",
  creditor: "債權人",
  current: "流動",
  customer: "顧客",
  data: "資料",
  decision: "決策",
  demand: "需求",
  development: "發展",
  equity: "權益",
  education: "教育",
  efficiency: "效率",
  exam: "考試",
  explain: "說明",
  expense: "費用",
  file: "檔案",
  finance: "財務",
  financial: "財務",
  focus: "重點",
  growth: "成長",
  hypothesis: "假設",
  important: "重要",
  improve: "提升",
  income: "收入",
  industry: "產業",
  information: "資訊",
  interest: "利息",
  investment: "投資",
  keyword: "關鍵字",
  keywords: "關鍵字",
  liability: "負債",
  liabilities: "負債",
  learning: "學習",
  liquidity: "流動性",
  loss: "損失",
  management: "管理",
  manager: "管理者",
  margin: "利潤率",
  market: "市場",
  marketing: "行銷",
  medical: "醫療",
  model: "模型",
  notes: "筆記",
  note: "筆記",
  objective: "目標",
  objectives: "目標",
  organize: "整理",
  performance: "績效",
  personalized: "個人化",
  privacy: "隱私",
  procedure: "程序",
  process: "流程",
  profit: "利潤",
  project: "專題",
  question: "問題",
  questions: "問題",
  ratio: "比率",
  recommendation: "建議",
  research: "研究",
  report: "報告",
  review: "複習",
  revenue: "營收",
  risk: "風險",
  safety: "安全性",
  sales: "銷售",
  shareholder: "股東",
  short: "短期",
  statement: "報表",
  statements: "報表",
  strategy: "策略",
  student: "學生",
  students: "學生",
  success: "成功",
  summary: "摘要",
  teacher: "教師",
  teachers: "教師",
  technology: "技術",
  text: "文字",
  turnover: "週轉率",
  tools: "工具",
  transportation: "交通",
  trend: "趨勢",
  valuation: "估值"
};

function translateEnglishSentenceToChinese(sentence) {
  let translated = replaceFinanceTermsWithChinese(sentence);

  [...englishPhraseTranslations]
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([source, target]) => {
      translated = translated.replace(buildEnglishAliasRegExp(source, "gi"), target);
    });

  const tokens = translated.toLowerCase().match(/[a-z][a-z'-]*/g) || [];
  tokens.forEach((token) => {
    const translatedWord = englishWordTranslations[token];
    if (!translatedWord) {
      return;
    }
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    translated = translated.replace(new RegExp(`\\b${escaped}\\b`, "gi"), translatedWord);
  });

  return translated
    .replace(/\b(is|are|was|were|be|been|being|the|a|an|to|of|for|in|on|at|by|with|and|or|that|this|these|those)\b/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function translateEnglishSentencesToChinese(sentences) {
  return sentences
    .map((sentence) => translateEnglishSentenceToChinese(sentence))
    .filter((sentence) => sentence.length > 0);
}

function translateSentenceToChineseIfNeeded(sentence) {
  return /[A-Za-z]/.test(sentence) ? translateEnglishSentenceToChinese(sentence) : sentence;
}

function getModeConfig() {
  return modeConfigs[getLegacyModeFromSelectedNoteModes()] || modeConfigs.exam;
}

function getModeLabel(mode) {
  return modeConfigs[mode]?.label || modeConfigs.exam.label;
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat(currentLanguage === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(value));
}

function extractPreviewText(text, fallback = "尚無預覽內容。", maxLength = 84) {
  const normalized = normalizeText(String(text || ""));
  if (!normalized) {
    return fallback;
  }
  const firstSentence = normalized.split(/(?<=[。！？!?\.])\s+/)[0] || normalized;
  return firstSentence.length > maxLength ? `${firstSentence.slice(0, maxLength - 1)}…` : firstSentence;
}

function escapeAccordionHtml(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function buildParagraphHtml(text, fallback = "尚無詳細內容。") {
  const normalized = normalizeText(String(text || ""));
  if (!normalized) {
    return `<p>${escapeHtml(fallback)}</p>`;
  }
  return normalized
    .split(/\n{2,}/)
    .map((part) => `<p>${escapeAccordionHtml(part)}</p>`)
    .join("");
}

function getDisplayItemText(item) {
  if (!item) {
    return "";
  }
  if (typeof item === "string") {
    return normalizeText(item);
  }
  if (typeof item === "object") {
    return normalizeText(
      item.question
      || item.answer
      || item.label
      || item.description
      || item.text
      || item.title
      || ""
    );
  }
  return "";
}

function buildBulletHtml(items, fallback = "尚無詳細內容。") {
  const normalizedItems = (Array.isArray(items) ? items : [])
    .map((item) => getDisplayItemText(item))
    .filter(Boolean);

  if (!normalizedItems.length) {
    return `<p>${escapeHtml(fallback)}</p>`;
  }

  return `<ul>${normalizedItems.map((item) => `<li>${escapeAccordionHtml(item)}</li>`).join("")}</ul>`;
}

function buildQuestionHtml(items, fallback = "尚無詳細內容。") {
  const normalizedItems = (Array.isArray(items) ? items : []).filter(Boolean);
  if (!normalizedItems.length) {
    return `<p>${escapeHtml(fallback)}</p>`;
  }

  return `<ol>${normalizedItems.map((item) => {
    const question = escapeHtml(item.question || getDisplayItemText(item));
    const answer = normalizeText(item.answer || "");
    return `<li><strong>${question}</strong>${answer ? `<br>${escapeAccordionHtml(answer)}` : ""}</li>`;
  }).join("")}</ol>`;
}

function stripHtmlTags(value) {
  return normalizeText(String(value || "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " "));
}

function extractTutorSourceText(note) {
  if (!note) {
    return "";
  }

  const parts = [
    note.title,
    note.content,
    note.result?.summary?.detail,
    note.result?.keyPoints?.detail,
    note.result?.quiz?.detail,
    note.result?.keywords?.detail,
    note.result?.mistakes?.detail,
    note.result?.concepts?.detail
  ]
    .map((item) => stripHtmlTags(item))
    .filter(Boolean);

  return normalizeText(parts.join("\n\n"));
}

function convertTutorSourceToAnalysisResult(note) {
  if (!note) {
    return null;
  }

  const title = note.title || "未命名筆記";
  const noteModes = Array.isArray(note.modes) && note.modes.length
    ? note.modes.filter((mode) => noteModeDisplayConfigs[mode])
    : [note.mode || "exam"];
  const primaryMode = getPrimaryNoteMode(noteModes);
  const keywordPreview = stripHtmlTags(note.result?.keywords?.preview || "");
  const keywordLabels = keywordPreview
    .split(/[、,，]/)
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, 8);

  const keyPointPreview = stripHtmlTags(note.result?.keyPoints?.preview || "");
  const quizPreview = stripHtmlTags(note.result?.quiz?.preview || "");
  const mistakePreview = stripHtmlTags(note.result?.mistakes?.preview || "");
  const conceptPreview = stripHtmlTags(note.result?.concepts?.preview || "");
  const summaryText = stripHtmlTags(note.result?.summary?.detail || note.result?.summary?.preview || "");
  const sourceText = extractTutorSourceText(note);

  return {
    analyzedAt: note.createdAt || new Date().toISOString(),
    mode: primaryMode,
    modeLabel: noteModeDisplayConfigs[primaryMode]?.label || primaryMode,
    cleanedText: sourceText,
    sourceText,
    sourceMeta: {
      fileName: title
    },
    sourceSections: [
      {
        title,
        text: sourceText || summaryText || title,
        paragraphNumber: 1
      }
    ],
    chinese: {
      summary: summaryText || title,
      importantSentences: [keyPointPreview, conceptPreview].filter(Boolean).map((text) => ({ text })),
      possibleExamPoints: [quizPreview, mistakePreview, keyPointPreview].filter(Boolean).map((text) => ({ text })),
      accountingTerms: keywordLabels.map((label) => ({ label, description: "來自目前選取筆記的關鍵字整理。" }))
    }
  };
}

function generateRecommendedQuestions(currentNote) {
  if (!currentNote) {
    return [];
  }

  const textSource = [
    currentNote.title,
    currentNote.result?.summary?.preview,
    currentNote.result?.keyPoints?.preview,
    currentNote.result?.quiz?.preview,
    currentNote.result?.keywords?.preview,
    currentNote.result?.mistakes?.preview,
    currentNote.result?.concepts?.preview
  ]
    .map((item) => stripHtmlTags(item))
    .filter(Boolean)
    .join(" ");

  const title = currentNote.title || (currentLanguage === "en" ? "this note" : "這份筆記");
  const subjectLabel = currentNote.subject || getDefaultSubjectLabel();
  const chapterLabel = currentNote.chapter || (currentLanguage === "en" ? "this material" : "這份資料");

  if (!textSource.trim()) {
    return currentLanguage === "en"
      ? [
          `Can you explain the core idea of "${title}"?`,
          `What is the easiest concept in this ${subjectLabel} material to confuse?`,
          `How might ${chapterLabel} be asked in a quiz, review, or discussion?`
        ]
      : [
          `請解釋「${title}」的核心重點？`,
          `這份${subjectLabel}資料中最容易混淆的觀念是什麼？`,
          `這份${chapterLabel}可能會怎麼被提問、測驗或延伸應用？`
        ];
  }

  return currentLanguage === "en"
    ? [
        `Can you explain the core idea of "${title}" in a simple way?`,
        `What ideas from this ${subjectLabel} source are most worth understanding first?`,
        `Which part of ${chapterLabel} is most likely to be misunderstood or answered incorrectly?`
      ]
    : [
        `請用簡單方式解釋「${title}」的核心重點？`,
        `這份${subjectLabel}資料最值得先理解的觀念是什麼？`,
        `這份${chapterLabel}有哪些容易混淆或容易答錯的地方？`
      ];
}

function renderRecommendedQuestions(questions) {
  if (!recommendedQuestions) return;

  recommendedQuestions.innerHTML = "";

  if (!questions || questions.length === 0) {
    const wrapper = document.createElement("div");
    wrapper.className = "empty-state";

    const text = document.createElement("p");
    text.textContent = getI18nText(
      "recommendedQuestionsEmpty",
      "目前尚未選擇資料，請先選擇一份筆記後再產生推薦問題。"
    );
    wrapper.appendChild(text);

    const actions = document.createElement("div");
    actions.className = "empty-action-row";

    const chooseButton = document.createElement("button");
    chooseButton.className = "secondary-btn";
    chooseButton.type = "button";
    chooseButton.textContent = currentLanguage === "en" ? "Choose a note" : "選擇一份筆記";
    chooseButton.addEventListener("click", chooseLatestNoteAsTutorSource);

    const notesButton = document.createElement("button");
    notesButton.className = "secondary-btn";
    notesButton.type = "button";
    notesButton.textContent = currentLanguage === "en" ? "Go to My Notes" : "前往我的筆記";
    notesButton.addEventListener("click", () => {
      switchPage("myNotes");
    });

    actions.append(chooseButton, notesButton);
    wrapper.appendChild(actions);
    recommendedQuestions.appendChild(wrapper);
    return;
  }

  questions.forEach((question) => {
    const button = document.createElement("button");
    button.className = "question-chip";
    button.type = "button";
    button.textContent = question;

    button.addEventListener("click", () => {
      if (tutorInput) {
        tutorInput.value = question;
        tutorInput.focus();
      }
    });

    recommendedQuestions.appendChild(button);
  });
}

function generateAndRenderRecommendedQuestions() {
  const questions = generateRecommendedQuestions(currentTutorSource);
  renderRecommendedQuestions(questions);
}

function updateTutorSourceUI() {
  if (!currentTutorSourceTitle || !currentTutorSourceMeta) return;

  if (!currentTutorSource) {
    currentTutorSourceTitle.textContent = currentLanguage === "en"
      ? "No note selected"
      : fallbackTutorSourceMessage.title;
    currentTutorSourceMeta.textContent = currentLanguage === "en"
      ? "Please choose one source from My Notes or the Knowledge Base first."
      : fallbackTutorSourceMessage.meta;
    if (tutorContextHelperText) {
      tutorContextHelperText.textContent = currentLanguage === "en"
        ? "Start from the summary or the strongest key point so the Tutor can answer more precisely."
        : "先從摘要或最重要重點開始追問，Tutor 的回答會更聚焦。";
    }
    renderRecommendedQuestions([]);
    return;
  }

  currentTutorSourceTitle.textContent = currentTutorSource.title || (currentLanguage === "en" ? "Untitled note" : "未命名筆記");
  const subject = currentTutorSource.subject || getDefaultSubjectLabel();
  const modes = Array.isArray(currentTutorSource.modes) && currentTutorSource.modes.length
    ? currentTutorSource.modes
    : [currentTutorSource.mode || "未指定模式"];
  const mode = modes.map((item) => getMyNoteModeLabel(item) || item).join(currentLanguage === "en" ? ", " : "、");
  currentTutorSourceMeta.textContent = currentLanguage === "en"
    ? `Subject: ${subject} | Study modes: ${mode}`
    : `科目：${subject}｜整理類型：${mode}`;
  if (tutorContextHelperText) {
    tutorContextHelperText.textContent = currentLanguage === "en"
      ? `Ask about "${currentTutorSource.title || "this note"}" from the summary, key points, or one confusing term.`
      : `建議先從「${currentTutorSource.title || "這份筆記"}」的摘要、重點或最混淆的名詞開始追問。`;
  }
  generateAndRenderRecommendedQuestions();
}

function updateHomeActivity() {
  const notes = loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];
  const latestNote = notes[0] || null;
  const todayTasks = loadJsonStorage(STUDY_TASKS_STORAGE_KEY) || [];
  const pendingToday = todayTasks.filter((task) => task.status === "today");

  if (homeLatestNoteTitle) {
    homeLatestNoteTitle.textContent = latestNote?.title || (currentLanguage === "en" ? "No note yet" : "尚未建立筆記");
  }
  if (homeLatestNoteMeta) {
    homeLatestNoteMeta.textContent = latestNote
      ? (currentLanguage === "en"
        ? `Latest subject: ${latestNote.subject || "General"} · ${formatDateTime(latestNote.savedAt || latestNote.createdAt || new Date().toISOString())}`
        : `最近科目：${latestNote.subject || "未分類"}｜${formatDateTime(latestNote.savedAt || latestNote.createdAt || new Date().toISOString())}`)
      : (currentLanguage === "en"
        ? "Create your first organized note to unlock Tutor, export, and study planning."
        : "先整理第一份筆記，之後就能直接接 Tutor、匯出與讀書計畫。");
  }
  if (homeNextActionTitle) {
    homeNextActionTitle.textContent = pendingToday.length
      ? (currentLanguage === "en" ? `Today's focus: ${pendingToday[0].title || "Review task"}` : `今天先做：${pendingToday[0].title || "複習任務"}`)
      : (latestNote ? (currentLanguage === "en" ? "Take the next step with AI Tutor" : "下一步：拿這份筆記去問 AI Tutor") : (currentLanguage === "en" ? "Start your first organization" : "開始第一次整理"));
  }
  if (homeNextActionMeta) {
    homeNextActionMeta.textContent = pendingToday.length
      ? (currentLanguage === "en"
        ? `You currently have ${pendingToday.length} task(s) waiting in Today's column.`
        : `目前「今日任務」欄位有 ${pendingToday.length} 個待完成項目。`)
      : (latestNote
        ? (currentLanguage === "en"
          ? "Open AI Tutor, ask from the summary, then add the answer back into your review plan."
          : "先用 AI Tutor 針對摘要追問，再把回答補進你的複習流程。")
        : (currentLanguage === "en"
          ? "Upload PDF, DOCX, PPTX, or paste text to generate your first study note."
          : "上傳 PDF、DOCX、PPTX 或直接貼上文字，先產生第一份學習筆記。"));
  }
}

function updatePageInsights() {
  const notes = getMyNotes();
  const tasks = getStudyTasks();
  const knowledgeItems = getKnowledgeItems();
  const todayTasks = tasks.filter((task) => task.status === "today");
  const weekTasks = tasks.filter((task) => task.status === "week");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const latestNote = notes[0] || null;
  const uniqueSubjects = [...new Set(notes.map((note) => normalizeText(note.subject)).filter(Boolean))];

  animateNumericText(homeSnapshotNotes, notes.length);
  animateNumericText(homeSnapshotTasks, todayTasks.length);
  animateNumericText(homeSnapshotKnowledge, knowledgeItems.length);
  if (homeSnapshotFocus) {
    homeSnapshotFocus.textContent = todayTasks.length
      ? (currentLanguage === "en"
        ? `Start with "${todayTasks[0].title || "today's task"}" before opening new material.`
        : `先完成「${todayTasks[0].title || "今日任務"}」，再開新的內容。`)
      : (latestNote
        ? (currentLanguage === "en"
          ? `Review "${latestNote.title || "your latest note"}" with AI Tutor to deepen understanding.`
          : `先拿「${latestNote.title || "最近筆記"}」去問 AI Tutor，把理解再往下推。`)
        : (currentLanguage === "en"
          ? "Create your first study note to unlock the full workflow."
          : "先建立第一份學習筆記，整個工作流才會開始動起來。"));
  }

  if (knowledgeInsightTitle) {
    knowledgeInsightTitle.textContent = knowledgeItems.length
      ? (currentLanguage === "en"
        ? `The library now holds ${knowledgeItems.length} searchable knowledge item(s).`
        : `目前知識庫已有 ${knowledgeItems.length} 筆可搜尋內容。`)
      : (currentLanguage === "en"
        ? "The knowledge library is still empty. Start by organizing one note."
        : "知識庫還是空的，先從第一份筆記開始累積。");
  }

  if (knowledgeInsightMeta) {
    const topKnowledgeSubject = knowledgeItems[0]?.subject || "";
    knowledgeInsightMeta.textContent = knowledgeItems.length
      ? (currentLanguage === "en"
        ? `Search by keyword, subject, or chapter${topKnowledgeSubject ? `, especially around ${topKnowledgeSubject}` : ""}.`
        : `可以用關鍵字、科目或章節搜尋${topKnowledgeSubject ? `，目前最容易延伸的是 ${topKnowledgeSubject}` : ""}。`)
      : (currentLanguage === "en"
        ? "Organized notes and knowledge chunks will be collected here for faster reuse later."
        : "整理過的筆記與知識片段會集中在這裡，之後可以用關鍵字快速找回。");
  }

  if (plannerInsightToday) {
    plannerInsightToday.textContent = currentLanguage === "en"
      ? `${todayTasks.length} task(s) for today`
      : `${todayTasks.length} 個今日任務`;
  }

  if (plannerInsightWeek) {
    plannerInsightWeek.textContent = currentLanguage === "en"
      ? `${weekTasks.length} task(s) this week`
      : `${weekTasks.length} 個本週任務`;
  }

  if (plannerInsightDone) {
    plannerInsightDone.textContent = currentLanguage === "en"
      ? `${doneTasks.length} completed`
      : `${doneTasks.length} 個已完成任務`;
  }

  if (plannerInsightFocus) {
    plannerInsightFocus.textContent = todayTasks.length
      ? (currentLanguage === "en"
        ? `Your next move is to finish "${todayTasks[0].title || "today's first task"}".`
        : `下一步先完成「${todayTasks[0].title || "今天第一個任務"}」。`)
      : (weekTasks.length
        ? (currentLanguage === "en"
          ? "Move one weekly task into Today so the plan becomes actionable."
          : "先把一個本週任務移到今日，計畫才會真正可執行。")
        : (currentLanguage === "en"
          ? "Create a few small tasks first, then refine the schedule later."
          : "先建立幾個小任務，再慢慢把時程細化。"));
  }

  if (myNotesInsightTitle) {
    myNotesInsightTitle.textContent = latestNote
      ? (currentLanguage === "en"
        ? `Latest focus: ${latestNote.title || "Untitled note"}`
        : `最近最值得回看的筆記：${latestNote.title || "未命名筆記"}`)
      : (currentLanguage === "en"
        ? "There is no note in your library yet."
        : "目前還沒有筆記庫內容。");
  }

  if (myNotesInsightMeta) {
    myNotesInsightMeta.textContent = latestNote
      ? (currentLanguage === "en"
        ? `Subject: ${latestNote.subject || "General"} · You can reopen it, export it, or continue with AI Tutor.`
        : `科目：${latestNote.subject || "未分類"}｜你可以重新開啟、匯出，或直接接著問 AI Tutor。`)
      : (currentLanguage === "en"
        ? "After you finish the first organization, this page will become your reusable study library."
        : "完成第一份整理後，這裡就會慢慢變成你可重複使用的複習資料庫。");
  }

  if (myNotesInsightSubjects) {
    myNotesInsightSubjects.textContent = currentLanguage === "en"
      ? `${uniqueSubjects.length} subject area(s)`
      : `${uniqueSubjects.length} 個主題領域`;
  }
}

function chooseLatestNoteAsTutorSource() {
  const notes = loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];

  if (!notes.length) {
    setTutorSource(null);
    showToast(
      currentLanguage === "en" ? "No note available yet" : "目前還沒有可用筆記",
      currentLanguage === "en"
        ? "Please generate a note from the Notes page first."
        : "請先到筆記整理頁產生一份筆記，再回來使用 AI Tutor。",
      "info"
    );
    return;
  }

  setTutorSource(notes[0]);
  showToast(
    currentLanguage === "en" ? "Source selected for AI Tutor" : "已選擇 AI Tutor 目前資料",
    currentLanguage === "en"
      ? "You can now ask questions based on the selected note."
      : "現在可以根據這份筆記開始提問。",
    "success"
  );
}

function appendChatMessage(role, content) {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.className = `chat-message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "你" : "AI";

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";

  const name = document.createElement("strong");
  name.textContent = role === "user" ? "你" : "AI Tutor";

  const text = document.createElement("p");
  text.textContent = content;

  messageContent.appendChild(name);
  messageContent.appendChild(text);
  message.appendChild(avatar);
  message.appendChild(messageContent);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function replaceLastAiThinkingMessage(answer) {
  const messages = document.querySelectorAll(".chat-message.ai .message-content p");
  const lastMessage = messages[messages.length - 1];

  if (lastMessage && (lastMessage.textContent.includes("正在思考") || lastMessage.textContent.includes("is thinking"))) {
    lastMessage.textContent = answer;
  } else {
    appendChatMessage("ai", answer);
  }
}

function buildMockTutorAnswer(question) {
  if (currentLanguage === "en") {
    if (!currentTutorSource) {
      return [
        "Key point:",
        "No note is selected yet, so I can only give a general answer. Please choose a source first.",
        "",
        "Explanation:",
        "AI Tutor is designed to answer based on the currently selected note so that unrelated subjects or chapters do not get mixed in.",
        "",
        "Possible exam question:",
        "An exam may ask you to explain the core concept based on a specific source, so it is better to choose the source first."
      ].join("\n");
    }

    return [
      "Key point:",
      `You asked "${question}". Based on the currently selected "${currentTutorSource.title || "note"}", you should first focus on the core definition and differences.`,
      "",
      "Explanation:",
      "Once the full AI flow is connected, this section will explain the idea in a teaching style using only the current note.",
      "",
      "Possible exam question:",
      "The teacher may ask this as a comparison, definition, or scenario-based question."
    ].join("\n");
  }

  if (!currentTutorSource) {
    return [
      "重點：",
      "目前尚未選擇筆記，因此我只能做一般性回答，建議你先選擇一份資料。",
      "",
      "解釋：",
      "AI Tutor 的設計目標是根據目前選取的筆記回答，這樣可以避免混入其他科目或章節的內容。",
      "",
      "考試可能問法：",
      "題目可能會要求你根據指定資料說明核心觀念，因此建議先選擇資料再提問。"
    ].join("\n");
  }

  return [
    "重點：",
    `你問的是「${question}」。根據目前選取的「${currentTutorSource.title || "筆記"}」，這題應先抓住核心定義與差異。`,
    "",
    "解釋：",
    "正式串接 AI 後，這裡會根據目前筆記內容進行教學式說明，不會混入其他無關資料。",
    "",
    "考試可能問法：",
    "老師可能會用比較題、名詞解釋或情境判斷題來考這個觀念。"
  ].join("\n");
}

async function askTutorFromCurrentSource(question) {
  if (!currentTutorSource) {
    return buildMockTutorAnswer(question);
  }

  const previousAnalysisResult = currentAnalysisResult;
  currentAnalysisResult = convertTutorSourceToAnalysisResult(currentTutorSource);

  try {
    const payload = await requestTutorAction("ask", question);
    const reply = payload?.reply || buildMockTutorAnswer(question);
    const followUpQuestion = payload?.followUpQuestion || "";

    if (reply.includes("重點：") || reply.includes("Key point:")) {
      return reply;
    }

    return [
      currentLanguage === "en" ? "Key point:" : "重點：",
      reply,
      "",
      currentLanguage === "en" ? "Explanation:" : "解釋：",
      currentLanguage === "en"
        ? "This answer is generated only from the currently selected source."
        : "這份回答只根據目前選取的資料整理，不會混入其他無關內容。",
      "",
      currentLanguage === "en" ? "Possible exam question:" : "考試可能問法：",
      followUpQuestion || (currentLanguage === "en"
        ? "The teacher may ask you to compare the key idea, define it, or apply it in context."
        : "老師可能會要求你比較差異、解釋定義，或放進情境題判斷。")
    ].join("\n");
  } catch (error) {
    console.error("Tutor source answer failed, fallback to mock reply.", error);
    return buildMockTutorAnswer(question);
  } finally {
    currentAnalysisResult = previousAnalysisResult;
  }
}

async function handleSendTutorMessage() {
  if (!tutorInput) return;

  const question = tutorInput.value.trim();
  if (!question) return;

  appendChatMessage("user", question);
  tutorInput.value = "";
  appendChatMessage("ai", currentLanguage === "en" ? "AI Tutor is thinking..." : "AI Tutor 正在思考中...");

  try {
    const answer = await askTutorFromCurrentSource(question);
    replaceLastAiThinkingMessage(answer);
  } catch (error) {
    console.error(error);
    replaceLastAiThinkingMessage("回答失敗，請稍後再試。");
  }
}

function setTutorSource(note) {
  currentTutorSource = note || null;
  if (currentTutorSource) {
    saveToStorage(STORAGE_KEYS.tutorSource, currentTutorSource);
  } else {
    removeFromStorage(STORAGE_KEYS.tutorSource);
  }
  updateTutorSourceUI();
}

function askTutorWithSource(noteOrKnowledgeItem, question = "") {
  setTutorSource(noteOrKnowledgeItem || null);
  switchPage("tutor");

  if (tutorInput && question) {
    tutorInput.value = question;
    tutorInput.focus();
  }
}

function buildTutorSourceFromCurrentWorkspace() {
  if (currentOpenedNotePayload?.result) {
    return currentOpenedNotePayload;
  }

  if (!currentAnalysisResult) {
    return null;
  }

  const normalized = normalizeNoteResult(currentAnalysisResult);
  const inferredTitle = lastSourceMeta?.fileName || inferNoteTitle(normalized) || (currentLanguage === "en" ? "Current workspace" : "目前整理內容");
  const inferredMeta = inferNoteSubjectAndChapter(normalized, sourceText?.value || "", inferredTitle);

  return {
    id: `workspace_${Date.now()}`,
    title: inferredTitle,
    subject: inferredMeta.subject,
    chapter: inferredMeta.chapter,
    mode: getPrimaryNoteMode(),
    modes: getSelectedNoteModes(),
    createdAt: new Date().toISOString(),
    result: normalized
  };
}

async function sendOverviewToTutor(type = "summary") {
  const source = buildTutorSourceFromCurrentWorkspace() || (loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [])[0] || null;
  if (!source) {
    showToast(
      currentLanguage === "en" ? "No note available yet" : "目前還沒有可用筆記",
      currentLanguage === "en"
        ? "Please organize one note first, then send it to AI Tutor."
        : "請先整理出至少一份筆記，再把它送進 AI Tutor。",
      "info"
    );
    return;
  }

  const overview = source.result?.overview || normalizeNoteResult(source.result).overview || {};
  const question = type === "keyPoint"
    ? (overview.tutorQuestion || overview.keyPoint || (currentLanguage === "en" ? "Please explain the most important key point from this note." : "請解釋這份筆記最重要的重點。"))
    : (currentLanguage === "en"
      ? `Please explain this summary in a clearer study-friendly way:\n${overview.summary || ""}`.trim()
      : `請把這段摘要用更好懂、更適合複習的方式解釋：\n${overview.summary || ""}`.trim());

  askTutorWithSource(source, question);
  await handleSendTutorMessage();
}

function openNoteInTutor(note) {
  setTutorSource(note || null);
  switchPage("tutor");
}

function normalizeKnowledgeSubjectValue(subject) {
  return normalizeFilterValue(subject);
}

function normalizeFilterValue(value) {
  return normalizeText(String(value || ""))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function getDefaultSubjectLabel() {
  return currentLanguage === "en" ? "General Notes" : "一般筆記";
}

function getDefaultKnowledgeSubjectLabel() {
  return currentLanguage === "en" ? "Knowledge Base" : "知識庫";
}

function extractCandidateHeadingLines(text) {
  return normalizeText(text)
    .split(/\n+/)
    .map((line) => normalizeText(line))
    .filter((line) => line && !looksLikeNoiseLine(line))
    .filter((line) => line.length <= 48)
    .slice(0, 12);
}

function inferSubjectFromText(text, title = "", fallback = "") {
  const combined = `${title}\n${text}`.toLowerCase();
  const subjectMatchers = [
    { label: currentLanguage === "en" ? "Accounting" : "會計", patterns: ["fvtpl", "fvoci", "oci", "debit", "credit", "financial asset", "會計", "分錄", "損益"] },
    { label: currentLanguage === "en" ? "Finance" : "金融", patterns: ["bond", "portfolio", "derivative", "投資", "金融", "利率", "股票"] },
    { label: currentLanguage === "en" ? "Programming" : "程式設計", patterns: ["python", "javascript", "react", "api", "function", "class", "bug", "程式", "演算法", "函式"] },
    { label: currentLanguage === "en" ? "Data Science" : "資料科學", patterns: ["machine learning", "dataset", "model", "training", "dataframe", "pandas", "資料分析", "模型"] },
    { label: currentLanguage === "en" ? "Medicine" : "醫學", patterns: ["symptom", "diagnosis", "patient", "clinical", "disease", "醫學", "病人", "症狀"] },
    { label: currentLanguage === "en" ? "Hospital Management" : "醫院管理", patterns: ["hospital", "ward", "醫院", "病房", "醫務", "healthcare management"] },
    { label: currentLanguage === "en" ? "Language Learning" : "語言學習", patterns: ["grammar", "vocabulary", "pronunciation", "英文", "日文", "單字", "文法"] },
    { label: currentLanguage === "en" ? "Science" : "自然科學", patterns: ["physics", "chemistry", "biology", "實驗", "化學", "物理", "生物"] },
    { label: currentLanguage === "en" ? "Design" : "設計", patterns: ["typography", "layout", "color palette", "ux", "ui", "設計", "版面"] },
    { label: currentLanguage === "en" ? "Observation Notes" : "觀察筆記", patterns: ["observation", "field note", "訪談", "觀察", "紀錄", "日常"] },
    { label: currentLanguage === "en" ? "Management" : "管理", patterns: ["management", "strategy", "workflow", "project", "管理", "流程", "策略"] }
  ];

  const matched = subjectMatchers.find(({ patterns }) => patterns.some((pattern) => combined.includes(pattern)));
  if (matched) {
    return matched.label;
  }

  const headingMatch = extractCandidateHeadingLines(title || text)[0];
  if (headingMatch && headingMatch.length <= 20) {
    return headingMatch;
  }

  return fallback || getDefaultSubjectLabel();
}

function inferChapterFromText(text, title = "") {
  const combinedHeadings = extractCandidateHeadingLines(`${title}\n${text}`);
  const explicitChapter = combinedHeadings.find((line) => /(^chapter\s*\d+)|(^第.{1,6}[章節單元課])|(^unit\s*\d+)|(^module\s*\d+)/i.test(line));
  if (explicitChapter) {
    return explicitChapter;
  }

  const semanticHeading = combinedHeadings.find((line) => line.length >= 4 && line.length <= 24);
  return semanticHeading || "";
}

function buildDynamicTagKeys(result) {
  const dynamicTags = [];
  if (result?.summary?.preview) dynamicTags.push("summary");
  if (result?.keyPoints?.preview) dynamicTags.push("keyPoints");
  if (result?.quiz?.preview) dynamicTags.push("quiz");
  if (result?.keywords?.preview) dynamicTags.push("keywords");
  if (result?.mistakes?.preview) dynamicTags.push("mistakes");
  if (result?.concepts?.preview) dynamicTags.push("concepts");
  return dynamicTags;
}

function buildDynamicTagLabel(tagKey) {
  const labelMap = {
    summary: getI18nText("tagSummary", "智慧摘要"),
    keyPoints: getI18nText("tagKeyPoints", "可能重點"),
    quiz: getI18nText("tagQuiz", "考題預測"),
    keywords: getI18nText("tagKeywords", "關鍵字"),
    mistakes: getI18nText("tagMistakes", "易錯觀念"),
    concepts: getI18nText("tagConcepts", "概念連結")
  };

  return labelMap[tagKey] || tagKey;
}

function fillDynamicSelect(selectElement, items, allLabel, normalizeFn = normalizeFilterValue) {
  if (!selectElement) return;

  const previousValue = selectElement.value || "all";
  selectElement.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = allLabel;
  selectElement.appendChild(allOption);

  items.forEach((item) => {
    const value = normalizeFn(item);
    if (!value) return;
    const option = document.createElement("option");
    option.value = value;
    option.textContent = item;
    selectElement.appendChild(option);
  });

  const availableValues = items.map((item) => normalizeFn(item)).filter(Boolean);
  selectElement.value = availableValues.includes(previousValue) ? previousValue : "all";
}

function syncKnowledgeSubjectFilterOptions(items = getKnowledgeItems()) {
  const subjects = [...new Set(items.map((item) => normalizeText(item.subject)).filter(Boolean))];
  fillDynamicSelect(knowledgeSubjectFilter, subjects, getI18nText("allSubjects", "全部科目"));
}

function syncKnowledgeTagFilterOptions(items = getKnowledgeItems()) {
  if (!knowledgeTagFilter) return;

  const tags = [...new Set(items.flatMap((item) => item.tags || buildDynamicTagKeys(item.result)))];
  const previousValue = knowledgeTagFilter.value || "all";
  knowledgeTagFilter.innerHTML = `<option value="all">${getI18nText("allTags", "全部標籤")}</option>`;

  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = buildDynamicTagLabel(tag);
    knowledgeTagFilter.appendChild(option);
  });

  knowledgeTagFilter.value = tags.includes(previousValue) ? previousValue : "all";
}

function syncMyNotesSubjectFilterOptions(notes = getMyNotes()) {
  const subjects = [...new Set(notes.map((note) => normalizeText(note.subject)).filter(Boolean))];
  fillDynamicSelect(myNotesSubjectFilter, subjects, getI18nText("allSubjects", "全部科目"));
}

function buildRagChunkSourceNote(chunk) {
  const title = chunk.fileName || chunk.sectionTitle || "RAG 知識片段";
  const content = normalizeText(chunk.text || chunk.content || chunk.quote || "");
  const inferredSubject = inferSubjectFromText(content, title, getDefaultKnowledgeSubjectLabel());
  const inferredChapter = inferChapterFromText(content, chunk.sectionTitle || title);
  return {
    id: `rag_${title}_${chunk.chunkId || chunk.paragraphNumber || Date.now()}`,
    title,
    subject: inferredSubject,
    chapter: inferredChapter || chunk.sectionTitle || "",
    mode: "knowledge",
    language: currentLanguage,
    createdAt: chunk.createdAt || new Date().toISOString(),
    content,
    result: {
      summary: {
        preview: extractPreviewText(content, "這筆知識片段尚無摘要。"),
        detail: content || "無"
      },
      keyPoints: {
        preview: extractPreviewText(content, "這筆知識片段尚無重點。"),
        detail: content || "無"
      },
      quiz: {
        preview: "",
        detail: ""
      },
      keywords: {
        preview: "",
        detail: ""
      },
      mistakes: {
        preview: "",
        detail: ""
      },
      concepts: {
        preview: "",
        detail: ""
      }
    }
  };
}

function getKnowledgeItems() {
  const notes = loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];
  const noteItems = notes.map((note) => {
    const result = note.result || {};
    const noteModes = Array.isArray(note.modes) && note.modes.length
      ? note.modes.filter((mode) => noteModeDisplayConfigs[mode])
      : [note.mode || ""].filter(Boolean);
    const primaryMode = note.mode || getPrimaryNoteMode(noteModes);
    const dynamicTags = Array.isArray(note.tags) && note.tags.length
      ? note.tags
      : buildDynamicTagKeys(result);

    return {
      id: note.id,
      title: note.title || "未命名筆記",
      subject: note.subject || getDefaultSubjectLabel(),
      chapter: note.chapter || "",
      mode: primaryMode,
      modes: noteModes,
      tags: dynamicTags,
      createdAt: note.createdAt || "",
      sourceNote: note,
      summaryText: [
        result.summary?.preview,
        result.summary?.detail,
        result.keyPoints?.preview,
        result.keyPoints?.detail,
        result.quiz?.preview,
        result.quiz?.detail,
        result.keywords?.preview,
        result.keywords?.detail,
        result.mistakes?.preview,
        result.mistakes?.detail,
        result.concepts?.preview,
        result.concepts?.detail
      ]
        .map((item) => stripHtmlTags(item))
        .filter(Boolean)
        .join(" "),
      result
    };
  });

  const localStore = loadLocalKnowledgeStore();
  const ragItems = (localStore.chunks || []).slice(0, 200).map((chunk, index) => {
    const sourceNote = buildRagChunkSourceNote(chunk);
    return {
      id: `rag_chunk_${index}_${chunk.fileName || "source"}`,
      title: sourceNote.title,
      subject: sourceNote.subject,
      chapter: sourceNote.chapter,
      mode: sourceNote.mode,
      tags: buildDynamicTagKeys(sourceNote.result),
      createdAt: sourceNote.createdAt,
      sourceNote,
      summaryText: sourceNote.content || "",
      result: sourceNote.result
    };
  });

  return [...noteItems, ...ragItems];
}

function getStudyTasks() {
  return loadJsonStorage(STORAGE_KEYS.tasks) || [];
}

function saveStudyTasks(tasks) {
  saveJsonStorage(STORAGE_KEYS.tasks, tasks);
  updateHomeActivity();
}

function getMyNotes() {
  return loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];
}

function saveMyNotes(notes) {
  saveJsonStorage(NOTE_MODE_STORAGE_KEY, notes);
}

function refreshAfterNotesChanged() {
  if (typeof renderMyNotes === "function") renderMyNotes();
  if (typeof updateKnowledgeResults === "function") updateKnowledgeResults();
  if (typeof populatePlannerNoteSelect === "function") populatePlannerNoteSelect();
  updateHomeActivity();
}

function refreshAfterTasksChanged() {
  if (typeof renderStudyPlanner === "function") renderStudyPlanner();
  if (typeof renderHomeTasks === "function") renderHomeTasks();
  updateHomeActivity();
}

function refreshAfterNoteDeleted() {
  if (typeof renderMyNotes === "function") renderMyNotes();
  if (typeof updateKnowledgeResults === "function") updateKnowledgeResults();
  if (typeof populatePlannerNoteSelect === "function") populatePlannerNoteSelect();
  updateHomeActivity();
}

function updateTaskCount(id, count) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = String(count);
  }
}

function updateTaskStatus(taskId, status) {
  const tasks = getStudyTasks();
  const updated = tasks.map((task) => task.id === taskId ? { ...task, status } : task);
  saveStudyTasks(updated);
  refreshAfterTasksChanged();
}

function renderTaskColumn(containerId, tasks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (!tasks.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state small-empty";
    empty.textContent = currentLanguage === "en" ? "No tasks yet." : "目前沒有任務。";
    container.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = "soft-card study-task-card";
    card.draggable = true;
    card.dataset.taskId = task.id;

    card.innerHTML = `
      <span class="task-tag">${escapeHTML(task.type || (currentLanguage === "en" ? "Task" : "任務"))}</span>
      <h3>${escapeHTML(task.title || (currentLanguage === "en" ? "Untitled task" : "未命名任務"))}</h3>
      <p>${escapeHTML(task.detail || "")}</p>
      <p>${currentLanguage === "en" ? "Source:" : "來源："}${escapeHTML(task.source || (currentLanguage === "en" ? "Unspecified" : "未指定"))}</p>

      <div class="task-card-actions">
        ${task.status !== "today" ? `<button class="secondary-btn move-today-btn" type="button">${currentLanguage === "en" ? "Move to Today" : "移到今日"}</button>` : ""}
        ${task.status !== "week" ? `<button class="secondary-btn move-week-btn" type="button">${currentLanguage === "en" ? "Move to Week" : "移到本週"}</button>` : ""}
        ${task.status !== "done" ? `<button class="primary-btn complete-task-btn" type="button">${currentLanguage === "en" ? "Mark Done" : "標記完成"}</button>` : ""}
      </div>
    `;

    card.querySelector(".move-today-btn")?.addEventListener("click", () => {
      updateTaskStatus(task.id, "today");
    });

    card.querySelector(".move-week-btn")?.addEventListener("click", () => {
      updateTaskStatus(task.id, "week");
    });

    card.querySelector(".complete-task-btn")?.addEventListener("click", () => {
      updateTaskStatus(task.id, "done");
    });

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", task.id);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    container.appendChild(card);
  });
}

function renderStudyPlanner() {
  const tasks = getStudyTasks();
  const todayTasks = tasks.filter((task) => task.status === "today");
  const weekTasks = tasks.filter((task) => task.status === "week");
  const doneTasks = tasks.filter((task) => task.status === "done");

  renderTaskColumn("todayTasksColumn", todayTasks);
  renderTaskColumn("weekTasksColumn", weekTasks);
  renderTaskColumn("doneTasksColumn", doneTasks);

  updateTaskCount("todayTaskCount", todayTasks.length);
  updateTaskCount("weekTaskCount", weekTasks.length);
  updateTaskCount("doneTaskCount", doneTasks.length);
  updatePageInsights();
}

function renderHomeTasks() {
  const container = document.querySelector(".task-card-list");
  if (!container) return;

  const tasks = getStudyTasks()
    .filter((task) => task.status === "today")
    .slice(0, 3);

  if (!tasks.length) {
    container.innerHTML = `
      <div class="soft-card task-card">
        <span class="task-tag">${currentLanguage === "en" ? "Tip" : "提示"}</span>
        <strong>${currentLanguage === "en" ? "No tasks for today" : "目前沒有今日任務"}</strong>
        <p>${currentLanguage === "en" ? "Create tasks from the Study Planner page." : "可以到讀書計畫頁建立任務。"}</p>
      </div>
    `;
    updatePageInsights();
    return;
  }

  container.innerHTML = tasks.map((task) => `
    <div class="soft-card task-card">
      <span class="task-tag">${escapeHTML(task.type || (currentLanguage === "en" ? "Task" : "任務"))}</span>
      <strong>${escapeHTML(task.title || (currentLanguage === "en" ? "Untitled task" : "未命名任務"))}</strong>
      <p>${escapeHTML(task.detail || "")}</p>
    </div>
  `).join("");
  updatePageInsights();
}

function formatNoteDate(dateString) {
  if (!dateString) return currentLanguage === "en" ? "Unknown date" : "未知時間";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return currentLanguage === "en" ? "Unknown date" : "未知時間";

  return date.toLocaleDateString(currentLanguage === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function getMyNoteModeLabel(mode) {
  const map = {
    quick: getI18nText("modeQuick", "快速摘要"),
    deep: getI18nText("modeDeep", "深度解析"),
    exam: getI18nText("modeExam", "考前複習"),
    quiz: getI18nText("modeQuiz", "題目生成"),
    concept: getI18nText("modeConcept", "概念連結"),
    mistake: getI18nText("modeMistake", "易錯觀念")
  };

  return map[mode] || (currentLanguage === "en" ? "Unspecified" : "未指定");
}

function buildMyNoteTags(note) {
  const tagKeys = note.tags?.length ? note.tags : buildDynamicTagKeys(note.result);
  return tagKeys.map((tag) => buildDynamicTagLabel(tag)).slice(0, 4);
}

function filterMyNotes() {
  const query = myNotesSearch?.value.trim().toLowerCase() || "";
  const subject = myNotesSubjectFilter?.value || "all";
  const sort = myNotesSort?.value || "newest";
  const type = myNotesTypeFilter?.value || "all";

  let notes = getMyNotes();

  notes = notes.filter((note) => {
    const result = note.result || {};

    const searchableText = [
      note.title,
      note.subject,
      note.chapter,
      note.mode,
      result.summary?.preview,
      result.summary?.detail,
      result.keyPoints?.preview,
      result.keyPoints?.detail,
      result.keywords?.preview,
      result.keywords?.detail,
      result.mistakes?.preview,
      result.mistakes?.detail
    ]
      .map((item) => stripHtmlTags(item))
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchQuery = !query || searchableText.includes(query);
    const matchSubject = subject === "all" || normalizeFilterValue(note.subject) === subject;
    const matchType = type === "all" || note.mode === type || (Array.isArray(note.modes) && note.modes.includes(type));

    return matchQuery && matchSubject && matchType;
  });

  notes.sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return sort === "newest" ? timeB - timeA : timeA - timeB;
  });

  return notes;
}

function updateMyNotesStats(allNotes, filteredNotes) {
  if (myNotesTotalCount) {
    myNotesTotalCount.textContent = String(allNotes.length);
  }

  if (myNotesFilteredCount) {
    myNotesFilteredCount.textContent = String(filteredNotes.length);
  }

  if (myNotesLatestDate) {
    if (!allNotes.length) {
      myNotesLatestDate.textContent = getI18nText("noDataYet", currentLanguage === "en" ? "No data yet" : "尚無資料");
      return;
    }

    const latest = [...allNotes].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
    myNotesLatestDate.textContent = formatNoteDate(latest.createdAt);
  }

  updatePageInsights();
}

function buildExportPayloadAsAnalysisResult(note) {
  if (!note) return null;
  return convertTutorSourceToAnalysisResult(note);
}

function openMyNote(note) {
  if (!note) return;

  currentOpenedNotePayload = note;
  switchPage("notes");

  if (note.result && typeof renderNotesResult === "function") {
    renderNotesResult(note.result);
  }

  if (sourceText) {
    sourceText.value = extractTutorSourceText(note);
    updateCounts();
  }

  if (notesResultStatus) {
    notesResultStatus.textContent = `已開啟筆記：${note.title || "未命名筆記"}`;
  }
}

function deleteMyNote(noteId) {
  const confirmed = confirm(currentLanguage === "en"
    ? "Are you sure you want to delete this note? This action cannot be undone."
    : "確定要刪除這份筆記嗎？此操作無法復原。");
  if (!confirmed) return;

  const notes = getMyNotes();
  const updated = notes.filter((note) => note.id !== noteId);
  if (currentOpenedNotePayload?.id === noteId) {
    currentOpenedNotePayload = null;
  }
  if (currentExportContext.payload?.id === noteId) {
    currentExportContext = {
      source: null,
      payload: null
    };
  }
  saveMyNotes(updated);
  refreshAfterNoteDeleted();
}

function handleMyNoteExport(note) {
  if (typeof window.openExportModal === "function") {
    window.openExportModal({
      source: "myNotes",
      payload: note
    });
    return;
  }

  const previousResult = currentAnalysisResult;
  currentAnalysisResult = buildExportPayloadAsAnalysisResult(note);
  try {
    downloadResult();
  } finally {
    currentAnalysisResult = previousResult;
  }
}

function renderMyNotes() {
  const allNotes = getMyNotes();
  syncMyNotesSubjectFilterOptions(allNotes);
  const notes = filterMyNotes();

  if (!myNotesGrid) return;

  updateMyNotesStats(allNotes, notes);
  myNotesGrid.innerHTML = "";

  if (!notes.length) {
    myNotesGrid.innerHTML = `
      <div class="app-card empty-state-card">
        <h2>${currentLanguage === "en" ? "No matching notes" : "目前沒有符合條件的筆記"}</h2>
        <p>${currentLanguage === "en"
          ? "Adjust your search or filters, or generate a note from the Notes page first."
          : "請調整搜尋或篩選條件，或先到「筆記整理」頁產生一份筆記。"}</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  notes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "app-card my-note-card";

    const preview =
      note.result?.summary?.preview ||
      note.result?.keyPoints?.preview ||
      (currentLanguage === "en" ? "This note does not have a preview yet." : "這份筆記尚無摘要預覽。");

    const tags = buildMyNoteTags(note);

    card.innerHTML = `
      <div>
        <h2>${escapeHTML(note.title || (currentLanguage === "en" ? "Untitled note" : "未命名筆記"))}</h2>
        <p class="note-preview">${escapeHTML(stripHtmlTags(preview))}</p>
      </div>

      <div class="note-meta-list">
        <p>${currentLanguage === "en" ? "Subject:" : "科目："}${escapeHTML(note.subject || (currentLanguage === "en" ? "Uncategorized" : "未分類"))}</p>
        <p>${currentLanguage === "en" ? "Last organized:" : "最後整理："}${escapeHTML(formatNoteDate(note.createdAt))}</p>
        <p>${currentLanguage === "en" ? "Mode:" : "整理類型："}${escapeHTML(getMyNoteModeLabel(note.mode))}</p>
      </div>

      <div class="meta-row">
        ${tags.map((tag) => `<span class="soft-badge">${escapeHTML(tag)}</span>`).join("")}
      </div>

      <div class="note-card-actions">
        <button class="primary-btn open-note-btn" type="button">${currentLanguage === "en" ? "Open" : "開啟"}</button>
        <button class="secondary-btn export-trigger" data-source="myNotes" type="button">${getI18nText("export", "匯出")}</button>
        <button class="secondary-btn danger-btn delete-note-btn" type="button">${getI18nText("delete", "刪除")}</button>
      </div>
    `;

    card.querySelector(".open-note-btn")?.addEventListener("click", () => {
      openMyNote(note);
    });

    card.querySelector(".delete-note-btn")?.addEventListener("click", () => {
      deleteMyNote(note.id);
    });

    card.querySelector(".export-trigger")?.addEventListener("click", () => {
      handleMyNoteExport(note);
    });
    if (card.querySelector(".export-trigger")) {
      card.querySelector(".export-trigger").dataset.exportBound = "true";
    }

    fragment.appendChild(card);
  });

  myNotesGrid.appendChild(fragment);
}

function buildKnowledgeTags(item) {
  const tagKeys = item.tags?.length ? item.tags : buildDynamicTagKeys(item.result);
  return tagKeys.map((tag) => buildDynamicTagLabel(tag)).slice(0, 4);
}

function syncKnowledgeChapterFilterOptions(items = getKnowledgeItems()) {
  if (!knowledgeChapterFilter) return;

  const previousValue = knowledgeChapterFilter.value || "all";
  const chapters = [...new Set(items.map((item) => normalizeText(item.chapter)).filter(Boolean))];
  knowledgeChapterFilter.innerHTML = `<option value="all">${getI18nText("allChapters", "全部章節")}</option>`;

  chapters.forEach((chapter) => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    knowledgeChapterFilter.appendChild(option);
  });

  knowledgeChapterFilter.value = chapters.includes(previousValue) ? previousValue : "all";
}

function filterKnowledgeItems() {
  const query = knowledgeSearchInput?.value.trim().toLowerCase() || "";
  const subject = knowledgeSubjectFilter?.value || "all";
  const chapter = knowledgeChapterFilter?.value || "all";
  const tag = knowledgeTagFilter?.value || "all";
  const type = knowledgeTypeFilter?.value || "all";

  const items = getKnowledgeItems();

  return items.filter((item) => {
    const matchQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.summaryText.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.chapter.toLowerCase().includes(query);

    const matchSubject =
      subject === "all" ||
      normalizeKnowledgeSubjectValue(item.subject) === subject;

    const matchChapter =
      chapter === "all" ||
      item.chapter === chapter;

    const matchType =
      type === "all" ||
      item.mode === type ||
      (Array.isArray(item.modes) && item.modes.includes(type));

    const matchTag =
      tag === "all" ||
      Boolean(item.result?.[tag]) ||
      Boolean(item.tags?.includes(tag));

    return matchQuery && matchSubject && matchChapter && matchType && matchTag;
  });
}

function addKnowledgeItemToTodayTasks(item) {
  const tasks = loadJsonStorage(STORAGE_KEYS.tasks) || [];

  const task = {
    id: `task_${Date.now()}`,
    type: "複習",
    title: item.title,
    detail: item.result?.keyPoints?.preview || item.result?.summary?.preview || "從知識庫加入的複習任務",
    source: item.title,
    status: "today",
    createdAt: new Date().toISOString()
  };

  tasks.unshift(task);
  saveJsonStorage(STORAGE_KEYS.tasks, tasks);
  refreshAfterTasksChanged();
  setProcessStateText(currentLanguage === "en" ? "Added to today's tasks" : "已加入今日待辦");
  showToast(
    currentLanguage === "en" ? "Added to today's tasks" : "已加入今日待辦",
    currentLanguage === "en"
      ? `You can review "${item.title}" from the home dashboard or planner.`
      : `你可以在首頁或讀書計畫頁看到「${item.title}」這項任務。`,
    "success"
  );
}

function openKnowledgeDetail(item) {
  const detail = [
    `${currentLanguage === "en" ? "Title" : "標題"}：${item.title}`,
    "",
    `${getI18nText("tagSummary", "智慧摘要")}：`,
    stripHtmlTags(item.result?.summary?.detail || item.result?.summary?.preview || (currentLanguage === "en" ? "None" : "無")),
    "",
    `${getI18nText("tagKeyPoints", "可能重點")}：`,
    stripHtmlTags(item.result?.keyPoints?.detail || item.result?.keyPoints?.preview || (currentLanguage === "en" ? "None" : "無")),
    "",
    `${getI18nText("tagQuiz", "考題預測")}：`,
    stripHtmlTags(item.result?.quiz?.detail || item.result?.quiz?.preview || (currentLanguage === "en" ? "None" : "無")),
    "",
    `${getI18nText("tagMistakes", "易錯觀念")}：`,
    stripHtmlTags(item.result?.mistakes?.detail || item.result?.mistakes?.preview || (currentLanguage === "en" ? "None" : "無"))
  ].join("\n");

  alert(detail);
}

async function copyKnowledgeItem(item) {
  const text = [
    `# ${item.title}`,
    "",
    "## 重點摘要",
    stripHtmlTags(item.result?.summary?.preview || ""),
    "",
    "## 可能重點",
    stripHtmlTags(item.result?.keyPoints?.detail || item.result?.keyPoints?.preview || ""),
    "",
    "## 考題預測",
    stripHtmlTags(item.result?.quiz?.detail || item.result?.quiz?.preview || ""),
    "",
    "## 易錯觀念",
    stripHtmlTags(item.result?.mistakes?.detail || item.result?.mistakes?.preview || "")
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    setProcessStateText(currentLanguage === "en" ? "Content copied" : "已複製內容");
    showToast(
      currentLanguage === "en" ? "Copied" : "已複製內容",
      currentLanguage === "en"
        ? "You can paste it into your notes or documents now."
        : "現在可以直接貼到你的筆記或文件中。",
      "success"
    );
  } catch (error) {
    console.error(error);
    alert(currentLanguage === "en" ? "Copy failed. Please select the content manually." : "複製失敗，請手動選取內容。");
  }
}

function getKnowledgeSearchQuery() {
  return normalizeText(knowledgeSearchInput?.value || "");
}

function highlightSearchMarkup(text, query = getKnowledgeSearchQuery()) {
  const source = String(text || "");
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return escapeHTML(source);
  }

  const terms = [...new Set(normalizedQuery.split(/\s+/).map((part) => part.trim()).filter((part) => part.length >= 2))];
  if (!terms.length) {
    return escapeHTML(source);
  }

  const pattern = terms.map((term) => escapeRegExp(term)).join("|");
  return escapeHTML(source).replace(new RegExp(`(${pattern})`, "gi"), '<mark class="search-highlight">$1</mark>');
}

function extractKnowledgeMatchLine(item, query = getKnowledgeSearchQuery()) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return currentLanguage === "en"
      ? "Use a keyword search to see why this result matches."
      : "輸入關鍵字後，這裡會顯示這筆結果為什麼被找到。";
  }

  const candidates = [
    stripHtmlTags(item.result?.summary?.detail || ""),
    stripHtmlTags(item.result?.keyPoints?.detail || ""),
    stripHtmlTags(item.result?.mistakes?.detail || ""),
    stripHtmlTags(item.summaryText || "")
  ].filter(Boolean);

  const terms = normalizedQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const matchedLine = candidates
    .flatMap((text) => normalizeText(text).split(/\n+/))
    .find((line) => {
      const normalizedLine = line.toLowerCase();
      return terms.some((term) => normalizedLine.includes(term));
    });

  return matchedLine || candidates[0] || (currentLanguage === "en" ? "This result currently has no extra preview line." : "這筆結果目前沒有額外預覽句。");
}

function setKnowledgePreview(item = null) {
  const query = getKnowledgeSearchQuery();

  if (!item) {
    currentKnowledgePreviewId = "";
    if (knowledgePreviewType) knowledgePreviewType.textContent = "Preview";
    if (knowledgePreviewSubject) knowledgePreviewSubject.textContent = currentLanguage === "en" ? "No result selected" : "尚未選擇結果";
    if (knowledgePreviewTitle) knowledgePreviewTitle.textContent = currentLanguage === "en" ? "Choose one result from the left." : "先從左側選一筆搜尋結果。";
    if (knowledgePreviewMeta) knowledgePreviewMeta.textContent = currentLanguage === "en"
      ? "Subject, chapter, study mode, and the most relevant content will appear here."
      : "這裡會顯示科目、章節、整理類型與最相關內容，讓你不用一直切換頁面。";
    if (knowledgePreviewTags) knowledgePreviewTags.innerHTML = "";
    if (knowledgePreviewSummary) knowledgePreviewSummary.textContent = currentLanguage === "en" ? "The summary preview will appear here." : "整理過的摘要會出現在這裡。";
    if (knowledgePreviewKeyPoints) knowledgePreviewKeyPoints.textContent = currentLanguage === "en" ? "Key points or matched content will appear here." : "重點、易考觀念或你搜尋到的片段會在這裡預覽。";
    if (knowledgePreviewQuestion) knowledgePreviewQuestion.textContent = currentLanguage === "en" ? "A Tutor-ready follow-up question will appear here." : "選取結果後，這裡會顯示最適合丟給 Tutor 的問題。";
    if (knowledgePreviewTutorBtn) {
      knowledgePreviewTutorBtn.disabled = true;
      knowledgePreviewTutorBtn.title = currentLanguage === "en" ? "Select one search result first." : "請先選擇一筆搜尋結果。";
    }
    if (knowledgePreviewTaskBtn) {
      knowledgePreviewTaskBtn.disabled = true;
      knowledgePreviewTaskBtn.title = currentLanguage === "en" ? "Select one search result first." : "請先選擇一筆搜尋結果。";
    }
    if (knowledgePreviewExportBtn) {
      knowledgePreviewExportBtn.disabled = true;
      knowledgePreviewExportBtn.title = currentLanguage === "en" ? "Select one search result first." : "請先選擇一筆搜尋結果。";
    }
    return;
  }

  currentKnowledgePreviewId = item.id;
  const previewSummary = stripHtmlTags(item.result?.summary?.preview || item.result?.summary?.detail || "");
  const previewKeyPoint = stripHtmlTags(item.result?.keyPoints?.preview || item.result?.keyPoints?.detail || extractKnowledgeMatchLine(item, query));
  const previewQuestion = item.result?.overview?.tutorQuestion
    || stripHtmlTags(item.result?.quiz?.preview || item.result?.quiz?.detail || "")
    || (currentLanguage === "en" ? `Please explain the key idea of "${item.title}".` : `請解釋「${item.title}」的重點。`);
  const typeLabel = getMyNoteModeLabel(item.mode || item.sourceNote?.mode || "quick");
  const metaParts = [
    item.subject || (currentLanguage === "en" ? "General" : "未分類"),
    item.chapter || (currentLanguage === "en" ? "No chapter" : "未指定章節"),
    typeLabel
  ].filter(Boolean);

  if (knowledgePreviewType) knowledgePreviewType.textContent = typeLabel;
  if (knowledgePreviewSubject) knowledgePreviewSubject.textContent = item.subject || (currentLanguage === "en" ? "Knowledge Item" : "知識條目");
  if (knowledgePreviewTitle) knowledgePreviewTitle.innerHTML = highlightSearchMarkup(item.title, query);
  if (knowledgePreviewMeta) knowledgePreviewMeta.textContent = metaParts.join(currentLanguage === "en" ? " · " : "｜");
  if (knowledgePreviewTags) {
    knowledgePreviewTags.innerHTML = buildKnowledgeTags(item)
      .map((tag) => `<span class="soft-badge">${escapeHTML(tag)}</span>`)
      .join("");
  }
  if (knowledgePreviewSummary) knowledgePreviewSummary.innerHTML = highlightSearchMarkup(previewSummary, query);
  if (knowledgePreviewKeyPoints) knowledgePreviewKeyPoints.innerHTML = highlightSearchMarkup(previewKeyPoint, query);
  if (knowledgePreviewQuestion) knowledgePreviewQuestion.textContent = previewQuestion;
  if (knowledgePreviewTutorBtn) {
    knowledgePreviewTutorBtn.disabled = false;
    knowledgePreviewTutorBtn.title = "";
  }
  if (knowledgePreviewTaskBtn) {
    knowledgePreviewTaskBtn.disabled = false;
    knowledgePreviewTaskBtn.title = "";
  }
  if (knowledgePreviewExportBtn) {
    knowledgePreviewExportBtn.disabled = false;
    knowledgePreviewExportBtn.title = "";
  }
}

function getCurrentKnowledgePreviewItem() {
  return getKnowledgeItems().find((item) => item.id === currentKnowledgePreviewId) || null;
}

function renderKnowledgeResults(items) {
  if (!knowledgeResults) return;

  knowledgeResults.innerHTML = "";
  const currentQuery = getKnowledgeSearchQuery();

  if (knowledgeActiveQuery) {
    knowledgeActiveQuery.textContent = currentQuery
      ? (currentLanguage === "en" ? `Query: ${currentQuery}` : `關鍵字：${currentQuery}`)
      : (currentLanguage === "en" ? "No keyword yet" : "尚未輸入關鍵字");
  }

  if (knowledgeResultCount) {
    knowledgeResultCount.textContent = currentLanguage === "en"
      ? `Showing ${items.length} result(s)`
      : `目前顯示 ${items.length} 筆結果`;
  }

  if (!items.length) {
    setKnowledgePreview(null);
    const emptyCard = document.createElement("div");
    emptyCard.className = "app-card empty-state-card";

    const title = document.createElement("h2");
    title.textContent = currentLanguage === "en" ? "No results found" : "尚無搜尋結果";

    const detail = document.createElement("p");
    detail.textContent = currentLanguage === "en"
      ? "Try a different keyword, build the demo knowledge base, or generate a note from the Notes page first."
      : "可以先換關鍵字、載入示範知識庫，或先到筆記整理頁產生一份筆記。";

    const actions = document.createElement("div");
    actions.className = "empty-action-row";

    const notesButton = document.createElement("button");
    notesButton.className = "secondary-btn";
    notesButton.type = "button";
    notesButton.textContent = currentLanguage === "en" ? "Go to Notes" : "前往筆記整理";
    notesButton.addEventListener("click", () => {
      switchPage("notes");
    });

    const seedButton = document.createElement("button");
    seedButton.className = "secondary-btn";
    seedButton.type = "button";
    seedButton.textContent = getI18nText("loadDemoKnowledge", "載入 / 重建示範知識庫");
    seedButton.addEventListener("click", reloadSeedKnowledgeBase);

    actions.append(notesButton, seedButton);
    emptyCard.append(title, detail, actions);
    knowledgeResults.appendChild(emptyCard);
    return;
  }

  const fragment = document.createDocumentFragment();
  const previewCandidate = items.find((entry) => entry.id === currentKnowledgePreviewId) || items[0];

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = `app-card knowledge-result-card${previewCandidate?.id === item.id ? " active" : ""}`;

    const keyPointPreview =
      item.result?.keyPoints?.preview ||
      item.result?.summary?.preview ||
      (currentLanguage === "en" ? "This item does not have a preview yet." : "這筆資料尚無摘要預覽。");
    const matchLine = extractKnowledgeMatchLine(item, currentQuery);
    const tags = buildKnowledgeTags(item);

    card.innerHTML = `
      <h2>${highlightSearchMarkup(item.title, currentQuery)}</h2>

      <p class="result-summary">
        ${highlightSearchMarkup(stripHtmlTags(keyPointPreview), currentQuery)}
      </p>

      <p class="knowledge-match-line">
        ${highlightSearchMarkup(matchLine, currentQuery)}
      </p>

      <div class="meta-row">
        ${tags.map((tag) => `<span class="soft-badge">${escapeHTML(tag)}</span>`).join("")}
      </div>

      <p class="source-text">
        ${currentLanguage === "en" ? "Source note:" : "來源筆記："}${escapeHTML(item.title)}
      </p>

      <div class="card-actions">
        <button class="primary-btn ask-tutor-btn" type="button">
          ${currentLanguage === "en" ? "Ask AI Tutor" : "問 AI Tutor"}
        </button>

        <button class="secondary-btn add-task-btn" type="button">
          ${currentLanguage === "en" ? "Add to Today" : "加入今日待辦"}
        </button>

        <div class="secondary-actions">
          <button class="link-btn view-detail-btn" type="button">${currentLanguage === "en" ? "View Details" : "查看詳細"}</button>
          <button class="link-btn copy-result-btn" type="button">${currentLanguage === "en" ? "Copy" : "複製"}</button>
          <button class="link-btn export-trigger" data-source="knowledge" type="button">${getI18nText("export", "匯出")}</button>
        </div>
      </div>
    `;

    card.addEventListener("click", (event) => {
      const interactiveElement = event.target.closest("button, a, input, select, textarea");
      if (interactiveElement) return;
      setKnowledgePreview(item);
      renderKnowledgeResults(items);
    });

    card.querySelector(".ask-tutor-btn")?.addEventListener("click", () => {
      askTutorWithSource(
        item.sourceNote,
        currentLanguage === "en"
          ? `Please explain the key idea of "${item.title}".`
          : `請解釋「${item.title}」的重點`
      );
    });

    card.querySelector(".add-task-btn")?.addEventListener("click", () => {
      addKnowledgeItemToTodayTasks(item);
    });

    card.querySelector(".view-detail-btn")?.addEventListener("click", () => {
      setKnowledgePreview(item);
      renderKnowledgeResults(items);
    });

    card.querySelector(".copy-result-btn")?.addEventListener("click", () => {
      copyKnowledgeItem(item);
    });

    card.querySelector(".export-trigger")?.addEventListener("click", () => {
      openExportModal({
        source: "knowledge",
        payload: item
      });
    });
    if (card.querySelector(".export-trigger")) {
      card.querySelector(".export-trigger").dataset.exportBound = "true";
    }

    fragment.appendChild(card);
  });

  knowledgeResults.appendChild(fragment);
  setKnowledgePreview(previewCandidate);
}

function updateKnowledgeResults() {
  const allItems = getKnowledgeItems();
  syncKnowledgeSubjectFilterOptions(allItems);
  syncKnowledgeChapterFilterOptions(allItems);
  syncKnowledgeTagFilterOptions(allItems);
  const filtered = filterKnowledgeItems();
  renderKnowledgeResults(filtered);
}

function generateBasicStudyTasks({ examDate, dailyTime, scope, noteTitle }) {
  return [
    {
      id: `task_${Date.now()}_1`,
      type: currentLanguage === "en" ? "Review" : "複習",
      title: currentLanguage === "en"
        ? `Review ${scope || noteTitle || "exam scope"}`
        : `複習 ${scope || noteTitle || "考試範圍"}`,
      detail: currentLanguage === "en"
        ? `Estimated time: ${dailyTime || "30 minutes"}`
        : `預估時間：${dailyTime || "30 分鐘"}`,
      source: noteTitle || (currentLanguage === "en" ? "Unspecified note" : "未指定筆記"),
      status: "today",
      createdAt: new Date().toISOString()
    },
    {
      id: `task_${Date.now()}_2`,
      type: currentLanguage === "en" ? "Practice" : "練習",
      title: currentLanguage === "en" ? "Finish 3 practice questions" : "完成 3 題練習題",
      detail: currentLanguage === "en"
        ? "Do the questions first, then review the mistakes."
        : "先做題目，再回頭整理錯誤觀念。",
      source: noteTitle || (currentLanguage === "en" ? "Unspecified note" : "未指定筆記"),
      status: "today",
      createdAt: new Date().toISOString()
    },
    {
      id: `task_${Date.now()}_3`,
      type: currentLanguage === "en" ? "Organize" : "整理",
      title: currentLanguage === "en" ? "Organize mistakes and keywords" : "整理易錯觀念與關鍵字",
      detail: currentLanguage === "en"
        ? "Turn confusing points into quick review cards."
        : "把容易混淆的地方整理成複習卡。",
      source: noteTitle || (currentLanguage === "en" ? "Unspecified note" : "未指定筆記"),
      status: "week",
      createdAt: new Date().toISOString()
    }
  ];
}

function getSelectedPlannerNoteTitle() {
  if (!plannerNoteSelect) return "";
  const selectedOption = plannerNoteSelect.options[plannerNoteSelect.selectedIndex];
  return selectedOption ? selectedOption.textContent : "";
}

function clearPlannerForm() {
  if (examDateInput) examDateInput.value = "";
  if (studyHoursInput) studyHoursInput.value = "";
  if (examScopeInput) examScopeInput.value = "";
  if (plannerNoteSelect) plannerNoteSelect.value = "";
}

function populatePlannerNoteSelect() {
  if (!plannerNoteSelect) return;

  const notes = loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];
  plannerNoteSelect.innerHTML = `<option value="">${getI18nText("pleaseChooseNote", "請選擇筆記")}</option>`;

  notes.forEach((note) => {
    const option = document.createElement("option");
    option.value = note.id;
    const noteSubject = normalizeText(note.subject) || getDefaultSubjectLabel();
    option.textContent = `${noteSubject}｜${note.title || (currentLanguage === "en" ? "Untitled note" : "未命名筆記")}`;
    plannerNoteSelect.appendChild(option);
  });
}

function initPlannerDragAndDrop() {
  document.querySelectorAll(".kanban-column").forEach((column) => {
    if (column.dataset.dragBound === "true") {
      return;
    }
    column.dataset.dragBound = "true";

    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", () => {
      column.classList.remove("drag-over");
    });

    column.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const status = column.dataset.status;
      column.classList.remove("drag-over");

      if (taskId && status) {
        updateTaskStatus(taskId, status);
      }
    });
  });
}

function handleGenerateStudyPlan() {
  const examDate = examDateInput?.value || "";
  const dailyTime = studyHoursInput?.value.trim() || "";
  const scope = examScopeInput?.value.trim() || "";
  const noteTitle = getSelectedPlannerNoteTitle();

  if (!examDate && !dailyTime && !scope && !noteTitle) {
    alert(currentLanguage === "en"
      ? "Please enter at least one exam detail or choose a note."
      : "請至少填寫一個考試資訊或選擇一份筆記。");
    return;
  }

  const newTasks = generateBasicStudyTasks({
    examDate,
    dailyTime,
    scope,
    noteTitle
  });

  const tasks = getStudyTasks();
  saveStudyTasks([...newTasks, ...tasks]);
  refreshAfterTasksChanged();
  setProcessStateText(currentLanguage === "en" ? "Study plan tasks created" : "已產生讀書計畫任務");
  showToast(
    currentLanguage === "en" ? "Study plan created" : "已建立讀書計畫",
    currentLanguage === "en"
      ? "Your new tasks are now in Today, This Week, and Completed."
      : "新的任務已加入今日、本週與已完成看板。",
    "success"
  );
}

function setAccordionContent(section, preview, detailHtml) {
  const accordion = document.querySelector(`[data-result-section="${section}"]`);
  if (!accordion) return;

  const previewEl = accordion.querySelector(".preview-line");
  const detailEl = accordion.querySelector(".detail-content");

  if (previewEl) {
    previewEl.textContent = preview || "尚無預覽內容。";
  }

  if (detailEl) {
    detailEl.innerHTML = detailHtml || "<p>尚無詳細內容。</p>";
  }
}

function getResultKeyTerms(result) {
  return Array.isArray(result?.keyTerms) && result.keyTerms.length
    ? result.keyTerms
    : (result?.accountingTerms || []);
}

function getResultPracticeQuestions(result) {
  return Array.isArray(result?.practiceQuestions) && result.practiceQuestions.length
    ? result.practiceQuestions
    : (result?.mockExamQuestions || []);
}

function getResultSpecializedQuestions(result) {
  return Array.isArray(result?.specializedQuestions) && result.specializedQuestions.length
    ? result.specializedQuestions
    : (result?.journalEntryQuestions || []);
}

function normalizeNoteResult(rawResult) {
  const result = rawResult?.chinese || {};
  const summaryText = translateDisplayText(result.summary || "");
  const keyPointItems = translateDisplayListItems(result.possibleExamPoints || result.importantSentences || []);
  const quizItems = translateDisplayQuestions(result.questions || getResultPracticeQuestions(result) || []);
  const keywordItems = Array.isArray(getResultKeyTerms(result)) && getResultKeyTerms(result).length
    ? getResultKeyTerms(result).map((item) => `${item.label}：${item.description}`)
    : (result.keywords || []);
  const mistakeItems = translateDisplayInfoBlocks(result.importanceReasons || [])
    .map((item) => `${item.label || item.text}${item.description ? `：${item.description}` : ""}`);
  const conceptItems = [
    ...translateDisplayInfoBlocks(result.formulas || []).map((item) => `${item.label || item.text}${item.description ? `：${item.description}` : ""}`),
    ...translateDisplayListItems(result.generalNotes || [])
  ].filter(Boolean);

  return {
    overview: {
      summary: extractPreviewText(summaryText, "整理完成後，這裡會先顯示最核心的一句總結。"),
      keyPoint: extractPreviewText(getDisplayItemText(keyPointItems[0]), "整理完成後，這裡會顯示第一個重點。"),
      tutorQuestion: extractPreviewText(quizItems[0]?.question || getDisplayItemText(keyPointItems[0]), "整理完成後，這裡會顯示最適合丟給 Tutor 的問題。")
    },
    summary: {
      preview: extractPreviewText(summaryText, "整理完成後，這裡會顯示本次內容的核心摘要。"),
      detail: buildParagraphHtml(summaryText, "尚無詳細摘要。")
    },
    keyPoints: {
      preview: extractPreviewText(getDisplayItemText(keyPointItems[0]), "整理完成後，這裡會顯示最重要的學習重點。"),
      detail: buildBulletHtml(keyPointItems, "尚無重點整理。")
    },
    quiz: {
      preview: extractPreviewText(quizItems[0]?.question || "", "整理完成後，這裡會顯示可能考題與出題方向。"),
      detail: buildQuestionHtml(quizItems, "尚無考題預測。")
    },
    keywords: {
      preview: extractPreviewText((keywordItems || []).slice(0, 5).map((item) => getDisplayItemText(item)).filter(Boolean).join("、"), "整理完成後，這裡會顯示關鍵字與簡短定義。"),
      detail: buildBulletHtml(keywordItems, "尚無關鍵字整理。")
    },
    mistakes: {
      preview: extractPreviewText(getDisplayItemText(mistakeItems[0] || keyPointItems[0]), "整理完成後，這裡會顯示容易混淆的觀念。"),
      detail: buildBulletHtml(mistakeItems.length ? mistakeItems : keyPointItems, "尚無易錯觀念整理。")
    },
    concepts: {
      preview: extractPreviewText(getDisplayItemText(conceptItems[0]), "整理完成後，這裡會顯示概念之間的連結。"),
      detail: buildBulletHtml(conceptItems, "尚無概念連結整理。")
    }
  };
}

function renderResultOverview(overview = {}) {
  if (resultOverviewSummary) {
    resultOverviewSummary.textContent = overview.summary || "整理完成後，這裡會先顯示最核心的一句總結。";
  }
  if (resultOverviewKeyPoint) {
    resultOverviewKeyPoint.textContent = overview.keyPoint || "整理完成後，這裡會顯示第一個重點。";
  }
  if (resultOverviewQuestion) {
    resultOverviewQuestion.textContent = overview.tutorQuestion || "整理完成後，這裡會顯示最適合丟給 Tutor 的問題。";
  }
}

function renderNotesResult(result) {
  renderResultOverview(result.overview);
  setAccordionContent("summary", result.summary?.preview, result.summary?.detail);
  setAccordionContent("keyPoints", result.keyPoints?.preview, result.keyPoints?.detail);
  setAccordionContent("quiz", result.quiz?.preview, result.quiz?.detail);
  setAccordionContent("keywords", result.keywords?.preview, result.keywords?.detail);
  setAccordionContent("mistakes", result.mistakes?.preview, result.mistakes?.detail);
  setAccordionContent("concepts", result.concepts?.preview, result.concepts?.detail);
}

function syncNotesAccordionResult(result = null) {
  if (!notesResultStatus) {
    return;
  }

  if (!result) {
    notesResultStatus.textContent = currentLanguage === "en"
      ? "The note workspace is currently empty. Paste text, upload files, or open an older note from the left side to begin."
      : "目前筆記整理區是空白狀態。請先在左側貼上文字、上傳檔案，或手動開啟舊筆記後再開始整理。";
    renderNotesResult({
      overview: {
        summary: "整理完成後，這裡會先顯示最核心的一句總結。",
        keyPoint: "整理完成後，這裡會顯示第一個重點。",
        tutorQuestion: "整理完成後，這裡會顯示最適合丟給 Tutor 的問題。"
      },
      summary: {
        preview: "整理完成後，這裡會顯示本次內容的核心摘要。",
        detail: "<p>詳細摘要會放在這裡。</p>"
      },
      keyPoints: {
        preview: "整理完成後，這裡會顯示最重要的學習重點。",
        detail: "<p>詳細重點會放在這裡。</p>"
      },
      quiz: {
        preview: "整理完成後，這裡會顯示可能考題與出題方向。",
        detail: "<p>考題預測會放在這裡。</p>"
      },
      keywords: {
        preview: "整理完成後，這裡會顯示關鍵字與簡短定義。",
        detail: "<p>關鍵字內容會放在這裡。</p>"
      },
      mistakes: {
        preview: "整理完成後，這裡會顯示容易混淆的觀念。",
        detail: "<p>易錯觀念會放在這裡。</p>"
      },
      concepts: {
        preview: "整理完成後，這裡會顯示概念之間的連結。",
        detail: "<p>概念連結會放在這裡。</p>"
      }
    });
    return;
  }

  renderNotesResult(normalizeNoteResult(result));
  notesResultStatus.textContent = "整理完成。你可以展開各區塊查看詳細內容，或使用匯出功能。";
}

function inferNoteTitle(result) {
  return result?.summary?.preview
    ? result.summary.preview.slice(0, 24)
    : (currentLanguage === "en" ? "Untitled note" : "未命名筆記");
}

function inferNoteSubjectAndChapter(result, rawText = "", rawTitle = "") {
  const summarySeed = [
    result?.summary?.preview,
    stripHtmlTags(result?.summary?.detail),
    result?.keyPoints?.preview,
    stripHtmlTags(result?.keyPoints?.detail),
    result?.keywords?.preview
  ]
    .filter(Boolean)
    .join("\n");
  const analysisText = normalizeText(`${rawTitle}\n${rawText}\n${summarySeed}`);

  return {
    subject: inferSubjectFromText(analysisText, rawTitle || result?.summary?.preview || "", getDefaultSubjectLabel()),
    chapter: inferChapterFromText(analysisText, rawTitle || "")
  };
}

function getSelectedNoteModes() {
  const normalizedModes = currentNoteModes
    .filter((mode) => noteModeDisplayConfigs[mode])
    .sort((a, b) => noteModeOrder.indexOf(a) - noteModeOrder.indexOf(b));

  return normalizedModes.length ? normalizedModes : ["quick"];
}

function getPrimaryNoteMode(selectedModes = getSelectedNoteModes()) {
  if (selectedModes.some((mode) => ["exam", "quiz", "mistake"].includes(mode))) {
    return selectedModes.find((mode) => ["exam", "quiz", "mistake"].includes(mode)) || "exam";
  }
  if (selectedModes.some((mode) => ["deep", "concept"].includes(mode))) {
    return selectedModes.find((mode) => ["deep", "concept"].includes(mode)) || "deep";
  }
  return selectedModes[0] || "quick";
}

function getLegacyModeFromSelectedNoteModes(selectedModes = getSelectedNoteModes()) {
  return noteModeToLegacyMode[getPrimaryNoteMode(selectedModes)] || "simple";
}

function areModeSetsEqual(left = [], right = []) {
  if (left.length !== right.length) {
    return false;
  }

  const normalizedLeft = [...left].sort();
  const normalizedRight = [...right].sort();
  return normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

function getActiveStrategyKey(selectedModes = getSelectedNoteModes()) {
  return noteStrategyOrder.find((key) => {
    const preset = noteStrategyPresets[key];
    return preset && areModeSetsEqual(selectedModes, preset.modes);
  }) || "custom";
}

function updateStrategySummary(selectedModes = getSelectedNoteModes()) {
  const strategyKey = getActiveStrategyKey(selectedModes);
  const strategy = noteStrategyPresets[strategyKey];
  const focusLabels = selectedModes.map((mode) => getMyNoteModeLabel(mode)).filter(Boolean);

  if (strategyBadge) {
    strategyBadge.textContent = strategy
      ? (strategy.label[currentLanguage] || strategy.label.zh)
      : (currentLanguage === "en" ? "Custom Mix" : "自訂組合");
  }

  if (strategyDescription) {
    strategyDescription.textContent = strategy
      ? (strategy.description[currentLanguage] || strategy.description.zh)
      : (currentLanguage === "en"
        ? "You are combining multiple directions manually. SmartStudy AI will keep one compatible primary mode underneath and merge the rest into the final result."
        : "你目前是手動混合多個方向。SmartStudy AI 會保留一個相容的主模式，並把其餘方向整合進最終結果。");
  }

  if (strategyFocus) {
    strategyFocus.innerHTML = focusLabels
      .map((label) => `<span class="strategy-focus-chip">${escapeHTML(label)}</span>`)
      .join("");
  }

  document.querySelectorAll(".strategy-btn").forEach((button) => {
    const isActive = button.dataset.strategy === strategyKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function updateTutorModeUI() {
  const config = tutorModeConfigs[currentTutorMode] || tutorModeConfigs.quickExplain;

  if (tutorModeBadge) {
    tutorModeBadge.textContent = config.label[currentLanguage] || config.label.zh;
  }

  if (tutorModeDescription) {
    tutorModeDescription.textContent = config.description[currentLanguage] || config.description.zh;
  }

  document.querySelectorAll(".tutor-mode-btn").forEach((button) => {
    const isActive = button.dataset.tutorMode === currentTutorMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function updateNoteModeSummary() {
  const selectedModes = getSelectedNoteModes();
  const labels = selectedModes
    .map((mode) => getMyNoteModeLabel(mode))
    .filter(Boolean);

  if (modeBadge) {
    modeBadge.textContent = currentLanguage === "en"
      ? `Current modes: ${labels.join(", ")}`
      : `目前模式：${labels.join("、")}`;
  }

  if (modeDescription) {
    if (selectedModes.length === 1) {
      const config = noteModeDescriptions[selectedModes[0]];
      modeDescription.textContent = config?.[currentLanguage] || config?.zh || "";
    } else {
      modeDescription.textContent = currentLanguage === "en"
        ? `Selected ${selectedModes.length} organization modes. SmartStudy AI will combine these directions in one result while keeping a compatible primary mode underneath.`
        : `已選擇 ${selectedModes.length} 種整理模式。SmartStudy AI 會在同一次整理中整合這些方向，底層仍保留相容的主模式來維持原本分析流程。`;
    }
  }

  updateStrategySummary(selectedModes);
}

function saveGeneratedNote(result) {
  const notes = loadJsonStorage(NOTE_MODE_STORAGE_KEY) || [];
  const selectedModes = getSelectedNoteModes();
  const primaryMode = getPrimaryNoteMode(selectedModes);
  const rawText = sourceText?.value?.trim() || "";
  const inferredTitle = inferNoteTitle(result);
  const inferredMeta = inferNoteSubjectAndChapter(result, rawText, inferredTitle);
  const dynamicTags = buildDynamicTagKeys(result);

  const note = {
    id: `note_${Date.now()}`,
    title: inferredTitle,
    subject: inferredMeta.subject,
    chapter: inferredMeta.chapter,
    mode: primaryMode,
    modes: selectedModes,
    tags: dynamicTags,
    language: outputLanguage?.value || currentLanguage || "zh",
    createdAt: new Date().toISOString(),
    useKnowledgeBase: Boolean(result?.knowledgeSupport?.enabled),
    knowledgeSupport: result?.knowledgeSupport || null,
    result
  };

  notes.unshift(note);
  saveJsonStorage(NOTE_MODE_STORAGE_KEY, notes);
  currentOpenedNotePayload = note;
  refreshAfterNotesChanged();
}

function setNoteMode(mode, options = {}) {
  const nextMode = noteModeDisplayConfigs[mode] ? mode : "quick";
  const selectedModes = new Set(getSelectedNoteModes());

  if (options.replaceAll) {
    selectedModes.clear();
    selectedModes.add(nextMode);
  } else if (selectedModes.has(nextMode)) {
    if (selectedModes.size > 1) {
      selectedModes.delete(nextMode);
    }
  } else {
    selectedModes.add(nextMode);
  }

  currentNoteModes = [...selectedModes].sort((a, b) => noteModeOrder.indexOf(a) - noteModeOrder.indexOf(b));

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    const isActive = currentNoteModes.includes(btn.dataset.mode);
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (!options.skipLegacySync && modeSelect) {
    modeSelect.value = getLegacyModeFromSelectedNoteModes(currentNoteModes);
  }

  updateModeUI();
  updateNoteModeSummary();
}

function applyNoteStrategy(strategyKey) {
  const strategy = noteStrategyPresets[strategyKey];
  if (!strategy) {
    return;
  }

  currentNoteModes = [...strategy.modes];

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    const isActive = currentNoteModes.includes(btn.dataset.mode);
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (modeSelect) {
    modeSelect.value = getLegacyModeFromSelectedNoteModes(currentNoteModes);
  }

  updateModeUI();
  updateNoteModeSummary();
}

function syncVisibleNoteModeFromLegacyMode() {
  const nextMode = legacyModeToNoteMode[modeSelect?.value] || "quick";
  if (!getSelectedNoteModes().length || !currentNoteModes.length) {
    setNoteMode(nextMode, { skipLegacySync: true, replaceAll: true });
    return;
  }
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    const isActive = getSelectedNoteModes().includes(btn.dataset.mode);
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  updateNoteModeSummary();
}

const exportDefaults = {
  quick: {
    format: "md",
    template: "studyNote"
  },
  deep: {
    format: "docx",
    template: "formalReport"
  },
  exam: {
    format: "pdf",
    template: "examReview"
  },
  quiz: {
    format: "pdf",
    template: "examReview"
  },
  concept: {
    format: "docx",
    template: "studyNote"
  },
  mistake: {
    format: "pdf",
    template: "examReview"
  }
};

function createEmptyExportPayload() {
  return {
    title: "SmartStudy AI 筆記",
    result: {
      summary: { preview: "", detail: "" },
      keyPoints: { preview: "", detail: "" },
      quiz: { preview: "", detail: "" },
      keywords: { preview: "", detail: "" },
      mistakes: { preview: "", detail: "" },
      concepts: { preview: "", detail: "" }
    }
  };
}

function getDefaultExportPayload() {
  if (currentOpenedNotePayload?.result) {
    return currentOpenedNotePayload;
  }

  if (currentAnalysisResult) {
    return {
      title: lastSourceMeta?.fileName || inferNoteTitle(normalizeNoteResult(currentAnalysisResult)) || "SmartStudy AI 筆記",
      result: normalizeNoteResult(currentAnalysisResult)
    };
  }

  return createEmptyExportPayload();
}

function resolveExportPayloadMode(payload) {
  if (Array.isArray(payload?.modes) && payload.modes.length) {
    return getPrimaryNoteMode(payload.modes);
  }

  if (payload?.mode) {
    return payload.mode;
  }

  if (payload?.sourceNote?.mode) {
    return payload.sourceNote.mode;
  }

  if (getSelectedNoteModes().length) {
    return getPrimaryNoteMode();
  }

  return "quick";
}

function applyExportDefaults(mode) {
  const defaults = exportDefaults[mode] || exportDefaults.quick;

  if (exportFormat) {
    exportFormat.value = defaults.format;
  }

  if (exportTemplate) {
    exportTemplate.value = defaults.template;
  }
}

function getExportPayloadBySource(source) {
  if (source === "notes") {
    return currentOpenedNotePayload || getDefaultExportPayload();
  }

  if (currentExportContext.source === source && currentExportContext.payload) {
    return currentExportContext.payload;
  }

  return getDefaultExportPayload();
}

function getSelectedExportSections() {
  return Array.from(document.querySelectorAll(".export-content-check:checked"))
    .map((checkbox) => checkbox.value);
}

function updateExportPreview() {
  if (!exportPreviewText) return;

  const format = exportFormat?.value || "md";
  const template = exportTemplate?.value || "studyNote";
  const sections = getSelectedExportSections();

  const formatLabel = {
    md: getI18nText("exportFormatMarkdown", "Markdown 筆記 .md"),
    docx: getI18nText("exportFormatWord", "Word 文件 .docx"),
    pdf: getI18nText("exportFormatPdf", "PDF 講義 .pdf"),
    pptx: getI18nText("exportFormatPpt", "PowerPoint 簡報 .pptx")
  }[format] || (currentLanguage === "en" ? "File" : "檔案");

  const templateLabel = {
    studyNote: getI18nText("templateStudyNote", "讀書筆記模板"),
    formalReport: getI18nText("templateFormalReport", "正式報告模板"),
    examReview: getI18nText("templateExamReview", "考前複習模板"),
    autoPresentation: getI18nText("templateAutoPresentation", "自動報告簡報模板")
  }[template] || (currentLanguage === "en" ? "Default template" : "預設模板");

  exportPreviewText.textContent = currentLanguage === "en"
    ? `This will export as ${formatLabel}, using ${templateLabel}, and include ${sections.length} content section(s).`
    : `將匯出為 ${formatLabel}，使用 ${templateLabel}，包含 ${sections.length} 個內容區塊。`;

  if (exportTemplateHint) {
    exportTemplateHint.textContent = ({
      studyNote: currentLanguage === "en"
        ? "Study Note keeps summary, key points, and review-ready content for later revision."
        : "讀書筆記模板會保留摘要、重點與複習內容，適合之後重新複習。",
      formalReport: currentLanguage === "en"
        ? "Formal Report emphasizes intro, structured sections, and conclusion for assignments."
        : "正式報告模板會更偏向前言、段落結構與結論，適合報告草稿。",
      examReview: currentLanguage === "en"
        ? "Exam Review compresses the output toward likely test points and review order."
        : "考前複習模板會更聚焦於可能考點、易錯觀念與複習順序。",
      autoPresentation: currentLanguage === "en"
        ? "Auto Presentation is designed for slide-like export and speaking structure."
        : "自動報告簡報模板會更偏向投影片架構與口頭報告節奏。"
    })[template] || "";
  }
}

function openExportModal(context = {}) {
  currentExportContext = {
    source: context.source || "notes",
    payload: context.payload || getDefaultExportPayload()
  };

  applyExportDefaults(resolveExportPayloadMode(currentExportContext.payload));
  exportModal.classList.remove("hidden");
  updateExportPreview();
}

function closeExportModal() {
  exportModal.classList.add("hidden");
}

function openGuideModal() {
  guideModal.classList.remove("hidden");
}

function closeGuideModal() {
  guideModal.classList.add("hidden");
}

function bindExportTriggers() {
  document.querySelectorAll(".export-trigger").forEach((button) => {
    if (button.dataset.exportBound === "true") return;

    button.dataset.exportBound = "true";
    button.addEventListener("click", () => {
      openExportModal({
        source: button.dataset.source || "notes",
        payload: getExportPayloadBySource(button.dataset.source || "notes")
      });
    });
  });
}

function getExportSectionText(resultSection) {
  return stripHtmlTags(resultSection?.detail || resultSection?.preview || "尚無內容。").trim() || "尚無內容。";
}

function buildExportContent(payload, template, sections) {
  const result = payload?.result || payload?.sourceNote?.result || createEmptyExportPayload().result;
  const title = payload?.title || payload?.sourceNote?.title || "SmartStudy AI 筆記";
  const lines = [`# ${title}`, ""];

  if (template === "formalReport") {
    lines.push("## 前言");
    lines.push("本文件根據 SmartStudy AI 整理結果產生，可作為報告草稿或學習資料。");
    lines.push("");
  }

  if (sections.includes("summary")) {
    lines.push("## 智慧摘要");
    lines.push(getExportSectionText(result.summary));
    lines.push("");
  }

  if (sections.includes("keyPoints")) {
    lines.push("## 重要重點");
    lines.push(getExportSectionText(result.keyPoints));
    lines.push("");
  }

  if (sections.includes("quiz")) {
    lines.push("## 考題預測");
    lines.push(getExportSectionText(result.quiz));
    lines.push("");
  }

  if (sections.includes("keywords")) {
    lines.push("## 關鍵字");
    lines.push(getExportSectionText(result.keywords));
    lines.push("");
  }

  if (sections.includes("mistakes")) {
    lines.push("## 易錯觀念");
    lines.push(getExportSectionText(result.mistakes));
    lines.push("");
  }

  if (sections.includes("concepts")) {
    lines.push("## 概念連結");
    lines.push(getExportSectionText(result.concepts));
    lines.push("");
  }

  if (sections.includes("references")) {
    lines.push("## 參考資料");
    lines.push("請在此補充課本、講義、網站或其他資料來源。");
    lines.push("");
  }

  if (template === "examReview") {
    lines.push("## 考前複習建議");
    lines.push("建議先複習核心觀念，再練習題目，最後整理易錯觀念。");
    lines.push("");
  }

  if (template === "formalReport") {
    lines.push("## 結論");
    lines.push("以上內容可作為正式報告或課堂作業的初稿，後續可再補充案例與資料來源。");
    lines.push("");
  }

  return lines.join("\n").trim();
}

function sanitizeFilename(name) {
  return String(name || "smartstudy-export")
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function markdownToSimpleHTML(markdown) {
  return escapeHTML(markdown)
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^---$/gm, "<hr>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

function exportMarkdown(payload, template, sections) {
  const content = buildExportContent(payload, template, sections);
  const filename = `${sanitizeFilename(payload?.title || payload?.sourceNote?.title || "smartstudy-note")}.md`;
  downloadTextFile(filename, content, "text/markdown;charset=utf-8");
  showToast(
    currentLanguage === "en" ? "Markdown exported" : "已匯出 Markdown",
    currentLanguage === "en"
      ? `Downloaded ${filename}.`
      : `已下載 ${filename}。`,
    "success"
  );
}

function exportWord(payload, template, sections) {
  const markdown = buildExportContent(payload, template, sections);
  const html = markdownToSimpleHTML(markdown);
  const wordHTML = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHTML(payload?.title || payload?.sourceNote?.title || "SmartStudy AI 筆記")}</title>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  const filename = `${sanitizeFilename(payload?.title || payload?.sourceNote?.title || "smartstudy-note")}.doc`;
  downloadTextFile(filename, wordHTML, "application/msword;charset=utf-8");
  showToast(
    currentLanguage === "en" ? "Word file exported" : "已匯出 Word 文件",
    currentLanguage === "en"
      ? `Downloaded ${filename}.`
      : `已下載 ${filename}。`,
    "success"
  );
}

function exportPDF(payload, template, sections) {
  const markdown = buildExportContent(payload, template, sections);
  const html = markdownToSimpleHTML(markdown);
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert(currentLanguage === "en"
      ? "Unable to open the print window. Please allow pop-ups in your browser."
      : "無法開啟列印視窗，請確認瀏覽器沒有阻擋彈出視窗。");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHTML(payload?.title || payload?.sourceNote?.title || "SmartStudy AI 筆記")}</title>
        <style>
          body {
            font-family: "Noto Sans TC", "Microsoft JhengHei", sans-serif;
            line-height: 1.8;
            padding: 32px;
            color: #111827;
          }
          h1, h2 {
            color: #4C1D95;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  showToast(
    currentLanguage === "en" ? "PDF print view opened" : "已開啟 PDF 列印視窗",
    currentLanguage === "en"
      ? "Use your browser print dialog to save or print the PDF."
      : "請透過瀏覽器列印視窗另存或列印 PDF。",
    "success"
  );
}

function exportPowerPoint(payload, template, sections) {
  const result = payload?.result || payload?.sourceNote?.result || createEmptyExportPayload().result;
  const title = payload?.title || payload?.sourceNote?.title || "SmartStudy AI 簡報";
  const slides = [
    {
      title,
      body: "SmartStudy AI 自動報告型簡報"
    },
    {
      title: "研究背景 / 主題說明",
      body: getExportSectionText(result.summary)
    },
    {
      title: "重點整理",
      body: getExportSectionText(result.keyPoints)
    },
    {
      title: "分析內容",
      body: sections.includes("concepts") ? getExportSectionText(result.concepts) : getExportSectionText(result.mistakes)
    },
    {
      title: "結論",
      body: "根據上述內容，整理出核心觀點與後續可延伸討論的方向。"
    },
    {
      title: "參考資料 / 補充內容",
      body: sections.includes("references") ? "請補充課本、講義、網站或其他資料來源。" : "目前未勾選參考資料區塊，可在後續編修時補上來源。"
    }
  ];

  const outline = slides
    .map((slide, index) => `# 第 ${index + 1} 頁｜${slide.title}\n\n${slide.body}\n`)
    .join("\n---\n\n");

  const filename = `${sanitizeFilename(title)}-presentation-outline.md`;
  downloadTextFile(filename, outline, "text/markdown;charset=utf-8");
  showToast(
    currentLanguage === "en" ? "Presentation outline exported" : "已匯出簡報大綱",
    currentLanguage === "en"
      ? "This is currently a Markdown outline. A real .pptx export can be added later."
      : "目前先輸出為 Markdown 簡報大綱；之後可再升級成真正的 .pptx。",
    "info",
    3200
  );
}

function startExport() {
  const format = exportFormat?.value || "md";
  const template = exportTemplate?.value || "studyNote";
  const sections = getSelectedExportSections();
  const payload = currentExportContext.payload || getDefaultExportPayload();

  if (!sections.length) {
    alert(currentLanguage === "en" ? "Please choose at least one section to export." : "請至少選擇一個要匯出的內容。");
    return;
  }

  if (format === "md") {
    exportMarkdown(payload, template, sections);
  } else if (format === "docx") {
    exportWord(payload, template, sections);
  } else if (format === "pdf") {
    exportPDF(payload, template, sections);
  } else if (format === "pptx") {
    exportPowerPoint(payload, template, sections);
  }

  closeExportModal();
}

window.openExportModal = openExportModal;

function toggleAccordion(accordion) {
  const isOpen = accordion.classList.contains("open");
  accordion.classList.toggle("open", !isOpen);

  const icon = accordion.querySelector(".accordion-icon");
  if (icon) {
    icon.textContent = isOpen ? "＋" : "−";
  }
}

function formatExportText(result) {
  return formatMarkdownExport(result)
    .split("\n")
    .map((line) => {
      if (!line.trim()) {
        return "";
      }
      return safeExportLine(line);
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHTML(value) {
  return escapeHtml(value);
}

function formatHtmlExport(result) {
  const isEnglish = currentLanguage === "en";
  const displayResult = {
    summary: reindexSummaryHeadings(translateDisplayText(result.chinese.summary || "")),
    formulas: isEnglish ? translateDisplayInfoBlocks(result.chinese.formulas || []) : (result.chinese.formulas || []),
    importantSentences: isEnglish ? translateDisplayListItems(result.chinese.importantSentences || []) : (result.chinese.importantSentences || []),
    importanceReasons: isEnglish ? translateDisplayInfoBlocks(result.chinese.importanceReasons || []) : (result.chinese.importanceReasons || []),
    generalNotes: isEnglish ? translateDisplayListItems(result.chinese.generalNotes || []) : (result.chinese.generalNotes || []),
    possibleExamPoints: isEnglish ? translateDisplayListItems(result.chinese.possibleExamPoints || []) : (result.chinese.possibleExamPoints || []),
    keyTerms: getResultKeyTerms(result.chinese),
    englishExplanations: isEnglish ? translateDisplayInfoBlocks(result.chinese.englishExplanations || []) : (result.chinese.englishExplanations || []),
    questions: isEnglish ? translateDisplayQuestions(result.chinese.questions || []) : (result.chinese.questions || []),
    practiceQuestions: isEnglish ? translateDisplayQuestions(getResultPracticeQuestions(result.chinese) || []) : (getResultPracticeQuestions(result.chinese) || []),
    highlights: isEnglish ? translateDisplayListItems(result.chinese.highlights || []) : (result.chinese.highlights || []),
    specializedQuestions: isEnglish ? translateDisplayQuestions(getResultSpecializedQuestions(result.chinese) || []) : (getResultSpecializedQuestions(result.chinese) || [])
  };

  const summary = safeExportLine(displayResult.summary) || safeExportLine(getUiText("emptySummary"));
  const formatList = (items, renderItem) => (items || [])
    .map(renderItem)
    .filter(Boolean)
    .join("");

  const formulasHtml = formatList(displayResult.formulas, (item) => {
    const label = safeExportLine(item?.label || "");
    const description = safeExportLine(item?.description || "");
    if (!label || !description) return "";
    return `<li><strong>${escapeHtml(label)}</strong>：${escapeHtml(description)}</li>`;
  });

  const importantHtml = formatList(displayResult.importantSentences, (item) => {
    const text = safeExportLine(getItemText(item));
    if (!text) return "";
    return `<li>${escapeHtml(text)}</li>`;
  });

  const reasonHtml = formatList(displayResult.importanceReasons, (item) => {
    const label = safeExportLine(item?.label || "");
    const description = safeExportLine(item?.description || "");
    if (!label || !description) return "";
    return `<li><strong>${escapeHtml(label)}</strong>：${escapeHtml(description)}</li>`;
  });

  const generalHtml = formatList(displayResult.generalNotes, (item) => {
    const text = safeExportLine(getItemText(item));
    if (!text) return "";
    return `<li>${escapeHtml(text)}</li>`;
  });

  const examHtml = formatList(displayResult.possibleExamPoints, (item) => {
    const text = safeExportLine(getItemText(item));
    if (!text) return "";
    return `<li>${escapeHtml(text)}</li>`;
  });

  const termsHtml = formatList(displayResult.keyTerms, (item) => {
    const label = safeExportLine(item?.label || "");
    const description = safeExportLine(item?.description || "");
    if (!label || !description) return "";
    return `<li><strong>${escapeHtml(label)}</strong>：${escapeHtml(description)}</li>`;
  });

  const explainHtml = formatList(displayResult.englishExplanations, (item) => {
    const label = safeExportLine(item?.label || "");
    const description = safeExportLine(item?.description || "");
    if (!label || !description) return "";
    return `<li><strong>${escapeHtml(label)}</strong>：${escapeHtml(description)}</li>`;
  });

  const questionHtml = formatList(displayResult.questions, (item) => {
    const question = safeExportLine(item?.question || "");
    const answer = safeExportLine(item?.answer || "");
    if (!question && !answer) return "";
    return `<li>${question ? `<p><strong>${escapeHtml(isEnglish ? "Question" : "題目")}</strong>：${escapeHtml(question)}</p>` : ""}${answer ? `<p><strong>${escapeHtml(isEnglish ? "Answer" : "答案")}</strong>：${escapeHtml(answer)}</p>` : ""}</li>`;
  });

  const mockHtml = formatList(displayResult.practiceQuestions, (item) => {
    const question = safeExportLine(item?.question || "");
    const answer = safeExportLine(item?.answer || "");
    if (!question && !answer) return "";
    return `<li>${question ? `<p><strong>${escapeHtml(isEnglish ? "Question" : "題目")}</strong>：${escapeHtml(question)}</p>` : ""}${answer ? `<p><strong>${escapeHtml(isEnglish ? "Answer" : "答案")}</strong>：${escapeHtml(answer)}</p>` : ""}</li>`;
  });

  const journalHtml = formatList(displayResult.specializedQuestions, (item) => {
    const question = safeExportLine(item?.question || "");
    const answer = safeExportLine(item?.answer || "");
    if (!question && !answer) return "";
    return `<li>${question ? `<p><strong>${escapeHtml(isEnglish ? "Question" : "題目")}</strong>：${escapeHtml(question)}</p>` : ""}${answer ? `<p><strong>${escapeHtml(isEnglish ? "Answer" : "答案")}</strong>：${escapeHtml(answer)}</p>` : ""}</li>`;
  });

  const generatedAt = escapeHtml(formatDateTime(result.analyzedAt));
  const modeLabel = escapeHtml(isEnglish ? localizeModeLabel(result.modeLabel) : result.modeLabel);
  const sourceLabel = escapeHtml(result.sourceMeta?.fileName || (isEnglish ? "Manual input or demo text" : "手動輸入或示範文字"));
  const highlightHtml = formatList(displayResult.highlights, (item) => {
    const text = safeExportLine(item?.text || getHighlightDisplayText(item));
    if (!text) return "";
    return `<li>${escapeHtml(text)}</li>`;
  });
  const sourceMetaLine = result.sourceMeta
    ? escapeHtml(
        isEnglish
          ? `${result.sourceMeta.extension.toUpperCase()} · ${result.sourceMeta.sectionCount} sections · ${result.cleanedText?.length || 0} cleaned chars`
          : `${result.sourceMeta.extension.toUpperCase()} · ${result.sourceMeta.sectionCount} 個章節 · 清洗後 ${result.cleanedText?.length || 0} 字`
      )
    : escapeHtml(isEnglish ? "Manual input source" : "手動輸入來源");
  const sectionBlock = (eyebrow, title, content, listType = "ul", extraClass = "") => `
    <section class="story-section ${extraClass}">
      <div class="story-head">
        <span class="story-eyebrow">${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
      </div>
      ${listType === "div"
        ? `<div class="story-copy">${content}</div>`
        : `<${listType} class="story-list ${listType === "ol" ? "story-list-numbered" : ""}">${content}</${listType}>`}
    </section>
  `;

  return `<!DOCTYPE html>
<html lang="${isEnglish ? "en" : "zh-Hant"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(isEnglish ? "SmartStudy Notes" : "SmartStudy 筆記")}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f5efe5;
      --panel: rgba(255, 250, 244, 0.9);
      --panel-strong: #fffdf9;
      --ink: #1f2933;
      --muted: #6c6a68;
      --accent: #b55d3d;
      --accent-deep: #7e3b26;
      --accent-soft: #f2d9c8;
      --line: rgba(31, 41, 51, 0.1);
      --shadow: 0 30px 80px rgba(73, 46, 29, 0.12);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: "Iowan Old Style", "Palatino Linotype", "Times New Roman", "Noto Serif TC", serif;
      color: var(--ink);
      background:
        radial-gradient(circle at top left, rgba(181, 93, 61, 0.18), transparent 28%),
        radial-gradient(circle at 85% 10%, rgba(229, 181, 134, 0.28), transparent 22%),
        linear-gradient(180deg, #fbf7f1 0%, var(--bg) 100%);
    }
    .sheet {
      max-width: 1100px;
      margin: 0 auto;
      padding: 28px;
      border-radius: 32px;
      background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.95));
      box-shadow: var(--shadow);
      border: 1px solid rgba(126, 59, 38, 0.08);
    }
    h1, h2, h3, p { margin: 0; }
    p, li { line-height: 1.85; }
    .hero {
      position: relative;
      overflow: hidden;
      padding: 42px;
      border-radius: 28px;
      background:
        linear-gradient(135deg, rgba(126, 59, 38, 0.95), rgba(181, 93, 61, 0.82) 46%, rgba(244, 222, 205, 0.9) 100%);
      color: #fffaf5;
    }
    .hero::after {
      content: "";
      position: absolute;
      right: -40px;
      top: -60px;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: rgba(255, 248, 238, 0.12);
      border: 1px solid rgba(255, 248, 238, 0.18);
    }
    .hero-kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 250, 244, 0.12);
      border: 1px solid rgba(255, 250, 244, 0.2);
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .hero-kicker::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ffe0c8;
      box-shadow: 0 0 0 6px rgba(255, 224, 200, 0.18);
    }
    .hero h1 {
      margin-top: 22px;
      font-size: clamp(2.6rem, 5vw, 4.6rem);
      line-height: 0.98;
      max-width: 8.5em;
    }
    .hero-intro {
      margin-top: 18px;
      max-width: 44rem;
      font-size: 1.05rem;
      color: rgba(255, 248, 241, 0.92);
      white-space: pre-wrap;
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }
    .hero-chip {
      padding: 10px 14px;
      border-radius: 16px;
      background: rgba(255, 252, 247, 0.14);
      border: 1px solid rgba(255, 252, 247, 0.18);
      backdrop-filter: blur(10px);
      font-size: 0.92rem;
    }
    .hero-chip strong {
      display: block;
      margin-bottom: 4px;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 243, 232, 0.78);
    }
    .flow {
      margin-top: 26px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .summary-panel,
    .story-section,
    .closing-panel {
      padding: 28px 30px;
      border-radius: 24px;
      background: var(--panel);
      border: 1px solid rgba(126, 59, 38, 0.08);
      box-shadow: 0 14px 30px rgba(73, 46, 29, 0.05);
    }
    .summary-panel {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 248, 241, 0.92)),
        linear-gradient(90deg, rgba(242, 217, 200, 0.2), transparent);
    }
    .panel-label,
    .story-eyebrow {
      display: inline-block;
      margin-bottom: 12px;
      color: var(--accent-deep);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .summary-panel h2,
    .story-head h2,
    .closing-panel h2 {
      font-size: 1.55rem;
      line-height: 1.15;
      color: #2c201c;
    }
    .summary-text {
      margin-top: 14px;
      font-size: 1.04rem;
      white-space: pre-wrap;
    }
    .highlight-ribbon {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
      padding: 0;
      list-style: none;
    }
    .highlight-ribbon li {
      padding: 10px 14px;
      border-radius: 999px;
      background: var(--panel-strong);
      border: 1px solid rgba(181, 93, 61, 0.14);
      font-size: 0.92rem;
      line-height: 1.5;
    }
    .story-section {
      position: relative;
    }
    .story-section::before {
      content: "";
      position: absolute;
      left: 15px;
      top: 26px;
      bottom: 26px;
      width: 2px;
      background: linear-gradient(180deg, rgba(181, 93, 61, 0.34), rgba(181, 93, 61, 0.02));
    }
    .story-head,
    .story-copy,
    .story-list {
      margin-left: 26px;
    }
    .story-copy {
      margin-top: 14px;
      white-space: pre-wrap;
    }
    .story-list {
      margin-top: 16px;
      padding-left: 22px;
    }
    .story-list li + li {
      margin-top: 12px;
    }
    .story-list li::marker {
      color: var(--accent);
    }
    .story-list li p + p {
      margin-top: 6px;
    }
    .closing-panel {
      background: linear-gradient(135deg, rgba(255, 248, 241, 0.96), rgba(250, 237, 227, 0.96));
    }
    .closing-panel p {
      color: var(--muted);
      margin-top: 12px;
    }
    @media (max-width: 640px) {
      body { padding: 14px; }
      .sheet { padding: 16px; border-radius: 24px; }
      .hero,
      .summary-panel,
      .story-section,
      .closing-panel {
        padding: 22px 20px;
      }
      .hero h1 {
        font-size: 2.3rem;
      }
      .story-section::before {
        left: 9px;
      }
      .story-head,
      .story-copy,
      .story-list {
        margin-left: 18px;
      }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <section class="hero">
      <span class="hero-kicker">${escapeHtml(isEnglish ? "Curated Study Narrative" : "設計版學習敘事")}</span>
      <h1>SmartStudy AI</h1>
      <p class="hero-intro">${escapeHtml(summary)}</p>
      <div class="hero-meta">
        <div class="hero-chip">
          <strong>${escapeHtml(isEnglish ? "Mode" : "整理模式")}</strong>
          <span>${modeLabel}</span>
        </div>
        <div class="hero-chip">
          <strong>${escapeHtml(isEnglish ? "Generated" : "整理時間")}</strong>
          <span>${generatedAt}</span>
        </div>
        <div class="hero-chip">
          <strong>${escapeHtml(isEnglish ? "Source" : "來源")}</strong>
          <span>${sourceLabel}</span>
        </div>
        <div class="hero-chip">
          <strong>${escapeHtml(isEnglish ? "Material Snapshot" : "資料快照")}</strong>
          <span>${sourceMetaLine}</span>
        </div>
      </div>
    </section>

    <div class="flow">
      <section class="summary-panel">
        <span class="panel-label">${escapeHtml(isEnglish ? "Executive Focus" : "核心導讀")}</span>
        <h2>${escapeHtml(isEnglish ? "What to understand first" : "先抓住什麼最重要")}</h2>
        <p class="summary-text">${escapeHtml(summary)}</p>
        ${highlightHtml ? `<ul class="highlight-ribbon">${highlightHtml}</ul>` : ""}
      </section>

      ${sectionBlock(
        isEnglish ? "Framework" : "架構",
        isEnglish ? "Key Structure / Framework" : "關鍵結構 / 架構",
        formulasHtml || `<li>${escapeHtml(getUiText("emptyFormulas"))}</li>`,
        "ul"
      )}
      ${sectionBlock(
        isEnglish ? "Signals" : "訊號",
        isEnglish ? "Important Sentences" : "重要句子",
        importantHtml || `<li>${escapeHtml(getUiText("emptyImportantSentences"))}</li>`,
        "ol"
      )}
      ${sectionBlock(
        isEnglish ? "Why It Matters" : "為什麼重要",
        isEnglish ? "Why They Matter" : "重要度原因",
        reasonHtml || `<li>${escapeHtml(getUiText("emptyImportanceReasons"))}</li>`,
        "ul"
      )}
      ${sectionBlock(
        isEnglish ? "Interpretation" : "解讀",
        isEnglish ? "General Notes" : "一般整理",
        generalHtml || `<li>${escapeHtml(getUiText("emptyGeneralNotes"))}</li>`,
        "ol"
      )}
      ${sectionBlock(
        isEnglish ? "Exam Focus" : "考點",
        isEnglish ? "Possible Key Points" : "可能重點",
        examHtml || `<li>${escapeHtml(getUiText("emptyPossibleExamPoints"))}</li>`,
        "ol"
      )}
      ${sectionBlock(
        isEnglish ? "Concept Bank" : "概念庫",
        isEnglish ? "Key Terms / Important Concepts" : "關鍵詞 / 重要概念",
        termsHtml || `<li>${escapeHtml(getUiText("emptyAccountingTerms"))}</li>`,
        "ul"
      )}
      ${sectionBlock(
        isEnglish ? "Translation Layer" : "翻譯層",
        isEnglish ? "Original Sentence Explanation" : "原文句子解釋",
        explainHtml || `<li>${escapeHtml(getUiText("emptyEnglishExplain"))}</li>`,
        "ul"
      )}
      ${sectionBlock(
        isEnglish ? "Dialogue" : "問答",
        isEnglish ? "Understanding Questions" : "理解問題",
        questionHtml || `<li>${escapeHtml(getUiText("emptyQuestions"))}</li>`,
        "ol"
      )}
      ${sectionBlock(
        isEnglish ? "Practice" : "練習",
        isEnglish ? "Extended Practice" : "延伸練習",
        mockHtml || `<li>${escapeHtml(getUiText("emptyMockExam"))}</li>`,
        "ol"
      )}
      ${journalHtml
        ? sectionBlock(
            isEnglish ? "Advanced" : "進階",
            isEnglish ? "Specialized Questions" : "專門題型",
            journalHtml,
            "ol"
          )
        : ""}

      <section class="closing-panel">
        <span class="panel-label">${escapeHtml(isEnglish ? "Closing Note" : "收尾備註")}</span>
        <h2>${escapeHtml(isEnglish ? "How to use this sheet well" : "這份版型怎麼用最有效")}</h2>
        <p>${escapeHtml(
          isEnglish
            ? "Read the summary first, then move through the story sections in order. This layout is designed to feel like a guided walkthrough instead of a rigid grid of cards."
            : "建議先看封面摘要，再依序往下讀各段內容。這份模板刻意做成像導讀長頁，而不是一格一格的卡片牆。"
        )}</p>
      </section>
    </div>
  </main>
</body>
</html>`;
}

function formatMarkdownExport(result) {
  const isEnglish = currentLanguage === "en";
  const displayResult = {
    summary: reindexSummaryHeadings(translateDisplayText(result.chinese.summary || "")),
    formulas: isEnglish ? translateDisplayInfoBlocks(result.chinese.formulas || []) : (result.chinese.formulas || []),
    importantSentences: isEnglish ? translateDisplayListItems(result.chinese.importantSentences || []) : (result.chinese.importantSentences || []),
    importanceReasons: isEnglish ? translateDisplayInfoBlocks(result.chinese.importanceReasons || []) : (result.chinese.importanceReasons || []),
    generalNotes: isEnglish ? translateDisplayListItems(result.chinese.generalNotes || []) : (result.chinese.generalNotes || []),
    possibleExamPoints: isEnglish ? translateDisplayListItems(result.chinese.possibleExamPoints || []) : (result.chinese.possibleExamPoints || []),
    keyTerms: getResultKeyTerms(result.chinese),
    englishExplanations: isEnglish ? translateDisplayInfoBlocks(result.chinese.englishExplanations || []) : (result.chinese.englishExplanations || []),
    questions: isEnglish ? translateDisplayQuestions(result.chinese.questions || []) : (result.chinese.questions || []),
    practiceQuestions: isEnglish ? translateDisplayQuestions(getResultPracticeQuestions(result.chinese) || []) : (getResultPracticeQuestions(result.chinese) || []),
    highlights: isEnglish ? translateDisplayListItems(result.chinese.highlights || []) : (result.chinese.highlights || []),
    specializedQuestions: isEnglish ? translateDisplayQuestions(getResultSpecializedQuestions(result.chinese) || []) : (getResultSpecializedQuestions(result.chinese) || [])
  };
  const summary = safeExportLine(displayResult.summary) || safeExportLine(getUiText("emptySummary"));
  const importantLines = (displayResult.importantSentences || [])
    .map((item, index) => {
      const text = safeExportLine(getItemText(item));
      if (!text) return "";
      return `${index + 1}. ${text}`;
    })
    .filter(Boolean);
  const generalLines = (displayResult.generalNotes || [])
    .map((item, index) => {
      const text = safeExportLine(getItemText(item));
      if (!text) return "";
      return `${index + 1}. ${text}`;
    })
    .filter(Boolean);
  const examPointLines = (displayResult.possibleExamPoints || [])
    .map((item, index) => {
      const text = safeExportLine(getItemText(item));
      if (!text) return "";
      return `${index + 1}. ${text}`;
    })
    .filter(Boolean);
  const formulaLines = (displayResult.formulas || [])
    .map((item) => {
      const label = safeExportLine(item?.label || "");
      const description = safeExportLine(item?.description || "");
      if (!label || !description) return "";
      return `- **${label}**: ${description}`;
    })
    .filter(Boolean);
  const importanceReasonLines = (displayResult.importanceReasons || [])
    .map((item) => {
      const label = safeExportLine(item?.label || "");
      const description = safeExportLine(item?.description || "");
      if (!label || !description) return "";
      return `- **${label}**: ${description}`;
    })
    .filter(Boolean);
  const accountingTermLines = (displayResult.keyTerms || [])
    .map((item, index) => {
      const label = safeExportLine(item?.label || "");
      const description = safeExportLine(item?.description || "");
      if (!label || !description) return "";
      return `${index + 1}. ${label}：${description}`;
    })
    .filter(Boolean);
  const englishExplanationLines = (displayResult.englishExplanations || [])
    .map((item) => {
      const label = safeExportLine(item?.label || "");
      const description = safeExportLine(item?.description || "");
      if (!label || !description) return "";
      return `- **${label}**: ${description}`;
    })
    .filter(Boolean);
  const questionLines = (displayResult.questions || [])
    .flatMap((item, index) => {
      const question = safeExportLine(item?.question || "");
      const answer = safeExportLine(item?.answer || "");
      return [
        question ? (isEnglish ? `${index + 1}. Question: ${question}` : `${index + 1}. 題目：${question}`) : "",
        answer ? (isEnglish ? `   Answer: ${answer}` : `   答案：${answer}`) : ""
      ];
    })
    .filter(Boolean);
  const mockExamLines = (displayResult.practiceQuestions || [])
    .flatMap((item, index) => {
      const question = safeExportLine(item?.question || "");
      const answer = safeExportLine(item?.answer || "");
      return [
        question ? (isEnglish ? `${index + 1}. Question: ${question}` : `${index + 1}. 題目：${question}`) : "",
        answer ? (isEnglish ? `   Answer: ${answer}` : `   答案：${answer}`) : ""
      ];
    })
    .filter(Boolean);
  const highlightLines = (displayResult.highlights || [])
    .map((item, index) => {
      const text = safeExportLine(item?.text || getHighlightDisplayText(item));
      if (!text) return "";
      return `${index + 1}. ${text}`;
    })
    .filter(Boolean);
  const journalLines = (displayResult.specializedQuestions || [])
    .flatMap((item, index) => {
      const question = safeExportLine(item?.question || "");
      const answer = safeExportLine(item?.answer || "");
      return [
        question ? (isEnglish ? `${index + 1}. Question: ${question}` : `${index + 1}. 題目：${question}`) : "",
        answer ? (isEnglish ? `   Answer: ${answer}` : `   答案：${answer}`) : ""
      ];
    })
    .filter(Boolean);
  const sourceMeta = result.sourceMeta;
  const sourceLines = sourceMeta
    ? [
        isEnglish ? safeExportLine(`- Source file: ${sourceMeta.fileName}`) : safeExportLine(`- 來源檔案：${sourceMeta.fileName}`),
        isEnglish ? safeExportLine(`- Source format: ${sourceMeta.extension.toUpperCase()}`) : safeExportLine(`- 來源格式：${sourceMeta.extension.toUpperCase()}`),
        isEnglish ? safeExportLine(`- Section count: ${sourceMeta.sectionCount}`) : safeExportLine(`- 章節數：${sourceMeta.sectionCount}`),
        safeExportLine(
          isEnglish
            ? `- Image OCR: ${sourceMeta.imageCount > 0 ? `${sourceMeta.imageCount} image text blocks extracted` : "No image OCR extracted"}`
            : `- 圖片文字辨識：${sourceMeta.imageCount > 0 ? `已擷取 ${sourceMeta.imageCount} 張圖片文字` : "未擷取圖片文字"}`
        ),
        safeExportLine(isEnglish ? `- Cleaned length: ${result.cleanedText?.length || 0}` : `- 清洗後字數：${result.cleanedText?.length || 0}`),
        safeExportLine(isEnglish ? `- Removed noise count: ${result.removedNoise?.length || 0}` : `- 省略雜訊數量：${result.removedNoise?.length || 0}`)
      ].filter(Boolean)
    : [safeExportLine(isEnglish ? "- Source: manual input or demo text" : "- 來源：手動輸入或示範文字")].filter(Boolean);

  const lines = [
    safeExportLine("# SmartStudy-AI"),
    "",
    safeExportLine(isEnglish ? `- Mode: ${localizeModeLabel(result.modeLabel)}` : `- 整理模式：${result.modeLabel}`),
    safeExportLine(isEnglish ? `- Generated at: ${formatDateTime(result.analyzedAt)}` : `- 整理時間：${formatDateTime(result.analyzedAt)}`),
    ...sourceLines,
    "",
    safeExportLine(isEnglish ? "## English View" : "## 中文結果"),
    safeExportLine(
      isEnglish
        ? "> Note: This export follows the current English display view and keeps the same overall learning structure."
        : (result.fromEnglishTranslation ? "> 註記：此區先將英文內容翻成中文，再與原始內容一起分析。" : "> 註記：此區直接根據原始中文內容分析。")
    ),
    "",
    safeExportLine(isEnglish ? "### Smart Summary" : "### 智慧摘要"),
    summary,
    "",
    safeExportLine(isEnglish ? "### Key Structure / Framework" : "### 關鍵結構 / 架構"),
    ...formulaLines,
    "",
    safeExportLine(isEnglish ? "### Important Sentences" : "### 重要句子"),
    ...importantLines,
    "",
    safeExportLine(isEnglish ? "### Why They Matter" : "### 重要度原因"),
    ...importanceReasonLines,
    "",
    safeExportLine(isEnglish ? "### General Notes" : "### 一般整理"),
    ...generalLines,
    "",
    safeExportLine(isEnglish ? "### Possible Key Points" : "### 可能重點"),
    ...examPointLines,
    "",
    safeExportLine(isEnglish ? "### Key Terms / Important Concepts" : "### 關鍵詞 / 重要概念"),
    ...accountingTermLines,
    "",
    safeExportLine(isEnglish ? "### Original Sentence Explanation" : "### 原文句子解釋"),
    ...englishExplanationLines,
    "",
    safeExportLine(isEnglish ? "### Understanding Questions" : "### 理解問題"),
    ...questionLines,
    "",
    safeExportLine(isEnglish ? "### Extended Practice" : "### 延伸練習"),
    ...mockExamLines,
    "",
    safeExportLine(isEnglish ? "### Original Highlight List" : "### 重點整理原始列表"),
    ...highlightLines,
    "",
    ...(journalLines.length
      ? [
          "",
          safeExportLine(isEnglish ? "### Specialized Questions" : "### 專門題型"),
          ...journalLines
        ]
      : [])
  ];

  return lines.join("\n");
}

function renderList(element, items, emptyText) {
  element.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.className = "empty-state";
    li.textContent = emptyText;
    element.appendChild(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = `highlight-item${item.isCritical ? " critical" : ""}`;
    if (item.isCritical) {
      const badge = document.createElement("span");
      badge.className = "highlight-badge";
      badge.textContent = getUiText("highlightBadge");

      const text = document.createElement("span");
      text.className = "highlight-text";
      text.textContent = item.text || getHighlightDisplayText(item);

      li.append(badge, text);
    } else {
      li.textContent = item.text || getHighlightDisplayText(item);
    }
    element.appendChild(li);
  });
}

function renderInfoBlocks(element, items, emptyText) {
  if (!element) {
    return;
  }
  element.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    element.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "term-item";

    const label = document.createElement("strong");
    label.className = "term-title";
    label.textContent = item.label || item.text;

    const detail = document.createElement("span");
    detail.className = "term-description";
    detail.textContent = item.description || item.text;

    li.append(label, detail);
    element.appendChild(li);
  });
}

function renderKeywordList(element, items, emptyText) {
  if (!element) {
    return;
  }
  element.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("span");
    empty.className = "chip-empty";
    empty.textContent = emptyText;
    element.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "ghost-button keyword";
    chip.textContent = replaceFinanceTermsWithBilingual(item);
    element.appendChild(chip);
  });
}

function renderGeneralNotes(items) {
  renderList(generalNotesResult, items || [], getUiText("emptyGeneralNotes"));
}

function renderPossibleExamPoints(items) {
  renderList(possibleExamPointsResult, items || [], getUiText("emptyPossibleExamPoints"));
}

function renderEnglishExplanations(items) {
  renderInfoBlocks(englishExplainResult, items || [], getUiText("emptyEnglishExplain"));
}

function toggleCard(card, shouldShow) {
  if (!card) {
    return;
  }
  card.hidden = !shouldShow;
}

function resetResultsView() {
  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
    }
  };

  setHTML("summaryResult", getUiText("emptySummary"));
  setHTML("formulasResult", `<li class="empty-state">${getUiText("emptyFormulas")}</li>`);
  setHTML("importantSentencesResult", `<li class="empty-state">${getUiText("emptyImportantSentences")}</li>`);
  setHTML("importanceReasonsResult", `<li class="empty-state">${getUiText("emptyImportanceReasons")}</li>`);
  setHTML("generalNotesResult", `<li class="empty-state">${getUiText("emptyGeneralNotes")}</li>`);
  setHTML("possibleExamPointsResult", `<li class="empty-state">${getUiText("emptyPossibleExamPoints")}</li>`);
  setHTML("keyTermsResult", `<li class="empty-state">${getUiText("emptyAccountingTerms")}</li>`);
  setHTML("englishExplainResult", `<li class="empty-state">${getUiText("emptyEnglishExplain")}</li>`);
  setHTML("questionsResult", `<p class="empty-state">${getUiText("emptyQuestions")}</p>`);
  setHTML("mockExamResult", `<p class="empty-state">${getUiText("emptyMockExam")}</p>`);
  setHTML("journalQuestionsResult", `<p class="empty-state">${getUiText("emptyJournal")}</p>`);

  const timestamp = document.getElementById("resultTimestamp");
  if (timestamp) {
    timestamp.textContent = getUiText("notReady");
  }
}

function setTutorBusyState(isBusy) {
  isTutorLoading = isBusy;
  if (tutorInput) {
    tutorInput.disabled = isBusy || !currentAnalysisResult;
  }
  if (tutorAskButton) {
    tutorAskButton.disabled = isBusy || !currentAnalysisResult;
  }
  if (tutorQuizButton) {
    tutorQuizButton.disabled = isBusy || !currentAnalysisResult;
  }
  if (tutorAnswerButton) {
    tutorAnswerButton.disabled = isBusy || !currentAnalysisResult || !tutorPendingQuestion;
  }
}

async function getApiHealth(forceRefresh = false) {
  if (IS_STATIC_PAGES_MODE) {
    throw new Error(currentLanguage === "en"
      ? "GitHub Pages cannot run the backend API. This site is currently using front-end-compatible features only."
      : "GitHub Pages 無法直接執行後端 API，目前網站會使用前端可相容的功能。");
  }
  if (apiHealthCache && !forceRefresh) {
    return apiHealthCache;
  }

  const response = await fetch("/api/health");
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.ok) {
    throw new Error("後端服務目前無法連線。請先確認 server.js 已啟動。");
  }

  apiHealthCache = payload;
  return payload;
}

async function ensureOpenAIBackend(featureName) {
  const health = await getApiHealth();
  if (!health.hasApiKey) {
    throw new Error(`${featureName} 需要先在伺服器設定 OPENAI_API_KEY。`);
  }
  return health;
}

function resetTutorSession() {
  tutorConversation = [];
  tutorPendingQuestion = null;
  tutorSourceId = "";
  renderTutorPanel(null);
}

function appendTutorMessage(role, text, options = {}) {
  if (!text) {
    return;
  }
  tutorConversation.push({
    role,
    text,
    badge: options.badge || "",
    timestamp: new Date().toISOString()
  });
}

function getTutorContextPayload(result) {
  const payload = {
    sourceText: (result?.cleanedText || result?.sourceText || "").slice(0, 12000),
    summary: result?.chinese?.summary || "",
    importantSentences: (result?.chinese?.importantSentences || []).map((item) => item.text || "").filter(Boolean).slice(0, 8),
    possibleExamPoints: (result?.chinese?.possibleExamPoints || []).map((item) => item.text || "").filter(Boolean).slice(0, 8),
    accountingTerms: getResultKeyTerms(result?.chinese || {})
      .map((item) => item.label || item.text || "")
      .filter(Boolean)
      .slice(0, 10)
  };

  if (currentRagTutorContext?.answer) {
    payload.ragQuestion = currentRagTutorContext.question || "";
    payload.ragAnswer = currentRagTutorContext.answer || "";
    payload.ragSources = (currentRagTutorContext.sources || [])
      .map((item) => `${item.fileName || "來源"}：${item.quote || item.content || item.text || ""}`)
      .slice(0, 5);
  }

  return payload;
}

function buildTutorHistoryPayload() {
  return tutorConversation.slice(-10).map((item) => ({
    role: item.role,
    text: item.text
  }));
}

function buildTutorCandidateSources(result = currentAnalysisResult) {
  if (!result) {
    return [];
  }

  const candidates = [];
  const pushCandidate = (text, meta = {}) => {
    const normalized = normalizeText(text || "");
    if (!normalized) {
      return;
    }
    candidates.push({
      text: normalized,
      fileName: meta.fileName || result.sourceMeta?.fileName || "目前筆記",
      sectionTitle: meta.sectionTitle || "",
      pageNumber: meta.pageNumber || null,
      paragraphNumber: meta.paragraphNumber || null
    });
  };

  pushCandidate(result.chinese?.summary || "", { sectionTitle: "智慧摘要" });
  (result.chinese?.importantSentences || []).forEach((item, index) => {
    pushCandidate(item.text || item, { sectionTitle: `重要句子 ${index + 1}` });
  });
  (result.chinese?.possibleExamPoints || []).forEach((item, index) => {
    pushCandidate(item.text || item, { sectionTitle: `可能重點 ${index + 1}` });
  });
  (result.sourceSections || []).forEach((section, index) => {
    pushCandidate(section.text || "", {
      sectionTitle: section.title || `來源段落 ${index + 1}`,
      pageNumber: section.pageNumber || null,
      paragraphNumber: section.paragraphNumber || null
    });
  });

  (currentRagTutorContext?.sources || []).forEach((item, index) => {
    pushCandidate(item.quote || item.content || item.text || "", {
      fileName: item.fileName || "RAG 來源",
      sectionTitle: item.sectionTitle || `RAG 引用 ${index + 1}`,
      pageNumber: item.pageNumber || null,
      paragraphNumber: item.paragraphNumber || null
    });
  });

  pushCandidate(currentRagTutorContext?.answer || "", {
    fileName: "RAG 回答",
    sectionTitle: currentRagTutorContext?.question ? `RAG 問題：${currentRagTutorContext.question}` : "RAG 回答"
  });

  return candidates;
}

function rankTutorSources(question, result = currentAnalysisResult, limit = 3) {
  const questionTokens = tokenize(normalizeText(question || ""));
  return buildTutorCandidateSources(result)
    .map((item) => ({
      ...item,
      score: scoreTextAgainstQuestion(questionTokens, item.text)
    }))
    .sort((a, b) => b.score - a.score || b.text.length - a.text.length)
    .slice(0, limit);
}

function buildLocalTutorReply(action, userInput = "") {
  if (!currentAnalysisResult) {
    throw new Error(getUiText("tutorStatusNeedAnalysis"));
  }

  const summary = normalizeText(currentAnalysisResult.chinese?.summary || "");
  const important = (currentAnalysisResult.chinese?.importantSentences || []).map((item) => item.text || item).filter(Boolean);
  const possiblePoints = (currentAnalysisResult.chinese?.possibleExamPoints || []).map((item) => item.text || item).filter(Boolean);
  const mode = currentTutorMode;

  if (action === "ask") {
    const matches = rankTutorSources(userInput, currentAnalysisResult, 3);
    const answerParts = [];
    if (summary) {
      answerParts.push(mode === "deepTeach"
        ? `先抓主線：${summary}\n\n如果把它拆開來看，這份內容主要在說明概念本身、它的用途，以及和其他重點的關聯。`
        : `先用一句話整理：${summary}`);
    }
    if (matches.length) {
      answerParts.push(mode === "examCoach"
        ? `從考前角度看，最值得先記的內容是：${matches.map((item) => item.text.slice(0, 120)).join("；")}`
        : `根據目前筆記，最相關的內容有：${matches.map((item) => item.text.slice(0, 120)).join("；")}`);
    } else {
      answerParts.push("目前筆記裡沒有足夠直接對應的段落，我先根據摘要和重點幫你整理。");
    }

    if (mode === "deepTeach" && important[0]) {
      answerParts.push(`如果你要真的聽懂，可以再特別看這句：${important[0]}`);
    }
    if (mode === "examCoach" && possiblePoints[0]) {
      answerParts.push(`如果老師要考，常見問法會圍繞：${possiblePoints[0]}`);
    }

    const followUpQuestion = mode === "answerDrill"
      ? (possiblePoints[0]
        ? `不要只背結論，請直接用 2 句話回答：「${possiblePoints[0]}」`
        : (important[0] ? `請直接用自己的話重述這句重點：「${important[0]}」` : "請用兩句話說明這份內容最核心的概念。"))
      : possiblePoints[0]
      ? `請用自己的話說明：「${possiblePoints[0]}」為什麼重要？`
      : (important[0] ? `你可以試著解釋這句話的意思嗎？「${important[0]}」` : "");

    return {
      reply: answerParts.join("\n\n"),
      followUpQuestion,
      expectedAnswer: followUpQuestion ? (possiblePoints[0] || important[0] || summary) : ""
    };
  }

  if (action === "quiz") {
    const target = possiblePoints[0] || important[0] || summary;
    return {
      reply: mode === "examCoach"
        ? "我會用比較像考前口試或申論題的方式來問你，請盡量答得完整一點。"
        : "這題想練習你是否真的理解剛剛整理出的核心概念，請盡量用自己的話回答。",
      followUpQuestion: target
        ? (mode === "deepTeach"
          ? `請先定義，再補一個例子，說明以下重點：${target}`
          : `請說明以下重點的意思與用途：${target}`)
        : "請說明這份筆記最核心的概念是什麼？",
      expectedAnswer: target || summary
    };
  }

  if (action === "answer") {
    const expectedAnswer = normalizeText(tutorPendingQuestion?.expectedAnswer || "");
    const answerTokens = tokenize(userInput);
    const expectedTokens = tokenize(expectedAnswer);
    const overlap = answerTokens.filter((token) => expectedTokens.includes(token));
    const answerCorrect = expectedTokens.length
      ? overlap.length >= Math.max(2, Math.ceil(expectedTokens.length * 0.25))
      : normalizeText(userInput).length >= 12;

    return {
      answerCorrect,
      reply: answerCorrect
        ? (mode === "answerDrill"
          ? "你的回答有抓到主軸，方向是對的。若在考場上，再補一個用途或例子會更完整。"
          : "你的回答有抓到主要概念，方向是對的。建議再補一個例子，會更完整。")
        : `這次答案還不夠貼近筆記重點。比較接近的整理內容是：${expectedAnswer || summary || "請回頭看一下整理摘要與重要句子。"}`,
      mistakeHint: answerCorrect ? "" : (mode === "answerDrill"
        ? "你少了老師最會聽的關鍵詞，或沒有交代這個概念的作用與差異。"
        : "少了核心關鍵詞，或沒有說明這個概念的作用與重點。"),
      followUpQuestion: (possiblePoints[1] || important[1])
        ? `再試一題：請進一步說明「${possiblePoints[1] || important[1]}」`
        : "",
      expectedAnswer: possiblePoints[1] || important[1] || expectedAnswer || summary
    };
  }

  throw new Error("Unsupported tutor action.");
}

function renderTutorContextPreview(latestResult) {
  if (!tutorContextPreview) {
    return;
  }

  if (!latestResult) {
    tutorContextPreview.innerHTML = `
      <p class="empty-state">目前還沒有可用的整理結果。請先回到首頁整理筆記，再回來使用 AI Tutor。</p>
      <a class="primary-link-button" href="./index.html">回首頁整理筆記</a>
    `;
    return;
  }

  const points = (latestResult.possibleExamPoints || [])
    .slice(0, 5)
    .map((item) => `<li>${escapeHTML(String(item))}</li>`)
    .join("");

  tutorContextPreview.innerHTML = `
    <div class="context-preview-block">
      <strong>智慧摘要</strong>
      <p>${escapeHTML(latestResult.summary || "尚未產生摘要。")}</p>
    </div>
    <div class="context-preview-block">
      <strong>可能重點</strong>
      <ul>${points || "<li>尚未產生可能重點。</li>"}</ul>
    </div>
    ${currentRagTutorContext?.answer ? `
      <div class="context-preview-block">
        <strong>RAG 延伸上下文</strong>
        <p>${escapeHTML(currentRagTutorContext.question || "最近一次知識庫問題")}</p>
        <p>${escapeHTML(currentRagTutorContext.answer || "").slice(0, 280)}</p>
      </div>
    ` : ""}
  `;
}

function updateTutorLoadedState(latestResult) {
  if (!tutorLoadedTitle && !tutorLoadedMeta && !tutorStatus) {
    return;
  }

  if (!latestResult) {
    if (tutorStatus) {
      tutorStatus.textContent = "尚未載入整理結果";
      tutorStatus.classList.remove("tutor-status-pending");
    }
    if (tutorLoadedTitle) {
      tutorLoadedTitle.textContent = "目前還沒有可用的整理結果";
    }
    if (tutorLoadedMeta) {
      tutorLoadedMeta.textContent = "請先回到首頁整理筆記，再回來使用 AI Tutor。";
    }
    renderTutorContextPreview(null);
    return;
  }

  if (tutorLoadedTitle) {
    tutorLoadedTitle.textContent = "已載入最近一次整理結果";
  }

  if (tutorLoadedMeta) {
    const createdAt = latestResult.createdAt
      ? new Date(latestResult.createdAt).toLocaleString("zh-TW")
      : "未記錄時間";
    tutorLoadedMeta.textContent = `整理時間：${createdAt}｜模式：${latestResult.mode || "exam"}`;
  }

  renderTutorContextPreview(latestResult);
}

function renderTutorPanel(result = currentAnalysisResult) {
  if (!tutorCard || !tutorMessages) {
    return;
  }

  if (!result) {
    tutorCard.hidden = false;
    updateTutorLoadedState(null);
    tutorMessages.innerHTML = `<p class="empty-state">${currentLanguage === "en"
      ? "No analyzed notes yet. Please go back to the notes page, run an analysis, and then return here."
      : "目前還沒有可用的整理結果。請先回到首頁整理筆記，再回來使用 AI Tutor。"}
    </p>`;
    if (tutorStatus) {
      tutorStatus.textContent = getUiText("tutorStatusNeedAnalysis");
      tutorStatus.classList.remove("tutor-status-pending");
    }
    if (tutorInput) {
      tutorInput.value = "";
    }
    setTutorBusyState(false);
    return;
  }

  tutorCard.hidden = false;
  updateTutorLoadedState(loadLatestStudyResult() || normalizeLatestStudyResult(result));

  if (!tutorConversation.length) {
    appendTutorMessage("assistant", getUiText("tutorWelcome"));
  }

  tutorMessages.innerHTML = "";
  tutorConversation.forEach((message) => {
    const article = document.createElement("article");
    article.className = `tutor-message ${message.role === "assistant" ? "assistant" : "user"}`;

    const head = document.createElement("div");
    head.className = "tutor-message-head";

    const name = document.createElement("span");
    name.textContent = message.role === "assistant" ? getUiText("tutorTeacherLabel") : getUiText("tutorStudentLabel");
    head.appendChild(name);

    if (message.badge) {
      const badge = document.createElement("span");
      badge.className = "tutor-badge";
      badge.textContent = message.badge;
      head.appendChild(badge);
    }

    const body = document.createElement("div");
    body.textContent = message.text;
    article.append(head, body);
    tutorMessages.appendChild(article);
  });

  tutorMessages.scrollTop = tutorMessages.scrollHeight;

  if (tutorStatus) {
    if (isTutorLoading) {
      tutorStatus.textContent = getUiText("tutorStatusLoading");
      tutorStatus.classList.remove("tutor-status-pending");
    } else if (tutorPendingQuestion?.question) {
      tutorStatus.textContent = `${getUiText("tutorStatusPendingPrefix")}${tutorPendingQuestion.question}`;
      tutorStatus.classList.add("tutor-status-pending");
    } else {
      tutorStatus.textContent = getUiText("tutorStatusReady");
      tutorStatus.classList.remove("tutor-status-pending");
    }
  }

  setTutorBusyState(isTutorLoading);
}

function syncTutorSession(result = currentAnalysisResult) {
  if (!result) {
    resetTutorSession();
    return;
  }

  if (tutorSourceId !== result.analyzedAt) {
    tutorSourceId = result.analyzedAt;
    tutorConversation = [];
    tutorPendingQuestion = null;
  }

  renderTutorPanel(result);
}

function initTutorPage() {
  if (!tutorCard || !document.getElementById("tutorCard")) {
    return;
  }

  const latestResult = loadLatestStudyResult();
  currentRagTutorContext = loadRagTutorTransfer();
  if (latestResult && !currentAnalysisResult) {
    currentAnalysisResult = convertLatestStudyResultToAnalysisResult(latestResult);
  } else if (!latestResult && currentRagTutorContext && !currentAnalysisResult) {
    currentAnalysisResult = buildAnalysisResultFromRagContext(currentRagTutorContext);
  }

  updateTutorLoadedState(latestResult || normalizeLatestStudyResult(currentAnalysisResult));
  if (currentRagTutorContext && !tutorConversation.length) {
    appendTutorMessage(
      "assistant",
      `我已讀取上一輪知識庫問答作為補充上下文。你剛剛問的是：「${currentRagTutorContext.question || "最近一次 RAG 問題"}」。如果你要，我可以直接接著解釋這個主題。`
    );
  }
  renderTutorPanel(currentAnalysisResult);
}

async function requestTutorAction(action, userInput = "") {
  if (!currentAnalysisResult) {
    throw new Error(getUiText("tutorStatusNeedAnalysis"));
  }
  try {
    const health = await getApiHealth();
    if (health?.hasApiKey) {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action,
          userInput,
          tutorMode: currentTutorMode,
          language: currentLanguage,
          languageInstruction: getLanguageInstruction(),
          prompt: buildTutorPrompt({ question: userInput, source: currentTutorSource }),
          source: currentTutorSource,
          noteContext: getTutorContextPayload(currentAnalysisResult),
          messages: buildTutorHistoryPayload(),
          pendingQuestion: tutorPendingQuestion
        })
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "AI Tutor 目前無法使用。");
      }
      return payload;
    }
  } catch (error) {
    // Fall back to the front-end tutor when the backend is unavailable.
  }

  return buildLocalTutorReply(action, userInput);
}

async function handleTutorAsk() {
  const question = normalizeText(tutorInput.value);
  if (!question) {
    setProcessStateText("請先輸入內容");
    return;
  }

  appendTutorMessage("user", question);
  tutorInput.value = "";
  setTutorBusyState(true);
  renderTutorPanel();
  setProcessStateText(currentLanguage === "en" ? "AI Tutor is answering" : "AI Tutor 回答中");

  try {
    const payload = await requestTutorAction("ask", question);
    let reply = payload.reply || "";
    if (payload.followUpQuestion) {
      tutorPendingQuestion = {
        question: payload.followUpQuestion,
        expectedAnswer: payload.expectedAnswer || ""
      };
      reply = `${reply}\n\n${getUiText("tutorQuestionBadge")}：${payload.followUpQuestion}`;
      appendTutorMessage("assistant", reply, { badge: getUiText("tutorQuestionBadge") });
    } else {
      tutorPendingQuestion = null;
      appendTutorMessage("assistant", reply);
    }
    setProcessStateText(currentLanguage === "en" ? "AI Tutor replied" : "AI Tutor 已回覆");
  } catch (error) {
    appendTutorMessage("assistant", error.message || "AI Tutor 目前無法使用。");
    setProcessStateText(currentLanguage === "en" ? "AI Tutor unavailable" : "AI Tutor 目前無法使用");
  } finally {
    setTutorBusyState(false);
    renderTutorPanel();
  }
}

async function handleTutorQuiz() {
  if (!currentAnalysisResult) {
    setProcessStateText("請先整理筆記");
    return;
  }

  setTutorBusyState(true);
  renderTutorPanel();
  setProcessStateText(currentLanguage === "en" ? "AI Tutor is preparing a question" : "AI Tutor 出題中");

  try {
    const payload = await requestTutorAction("quiz", "");
    tutorPendingQuestion = {
      question: payload.followUpQuestion || "",
      expectedAnswer: payload.expectedAnswer || ""
    };
    const reply = [payload.reply, payload.followUpQuestion ? `${getUiText("tutorQuestionBadge")}：${payload.followUpQuestion}` : ""]
      .filter(Boolean)
      .join("\n\n");
    appendTutorMessage("assistant", reply, { badge: getUiText("tutorQuestionBadge") });
    setProcessStateText(currentLanguage === "en" ? "Tutor question ready" : "老師題目已產生");
  } catch (error) {
    appendTutorMessage("assistant", error.message || "AI Tutor 目前無法使用。");
    setProcessStateText(currentLanguage === "en" ? "AI Tutor unavailable" : "AI Tutor 目前無法使用");
  } finally {
    setTutorBusyState(false);
    renderTutorPanel();
  }
}

async function handleTutorAnswer() {
  if (!tutorPendingQuestion?.question) {
    setProcessStateText(currentLanguage === "en" ? "Ask the tutor for a question first" : "請先請老師出題");
    return;
  }

  const answer = normalizeText(tutorInput.value);
  if (!answer) {
    setProcessStateText("請先輸入內容");
    return;
  }

  appendTutorMessage("user", answer, { badge: getUiText("tutorAnswerBadge") });
  tutorInput.value = "";
  setTutorBusyState(true);
  renderTutorPanel();
  setProcessStateText(currentLanguage === "en" ? "AI Tutor is checking your answer" : "AI Tutor 批改中");

  try {
    const payload = await requestTutorAction("answer", answer);
    const feedbackParts = [];
    if (!payload.answerCorrect && payload.mistakeHint) {
      feedbackParts.push(`${getUiText("tutorMistakePrefix")}${payload.mistakeHint}`);
    }
    if (payload.reply) {
      feedbackParts.push(payload.reply);
    }
    if (payload.followUpQuestion) {
      feedbackParts.push(`${getUiText("tutorRetryPrefix")}${payload.followUpQuestion}`);
      tutorPendingQuestion = {
        question: payload.followUpQuestion,
        expectedAnswer: payload.expectedAnswer || ""
      };
    } else {
      tutorPendingQuestion = null;
    }
    appendTutorMessage("assistant", feedbackParts.join("\n\n"), {
      badge: payload.answerCorrect ? "" : getUiText("tutorQuestionBadge")
    });
    setProcessStateText(payload.answerCorrect
      ? (currentLanguage === "en" ? "Answer checked" : "答案批改完成")
      : (currentLanguage === "en" ? "Tutor gave correction" : "老師已重新講解"));
  } catch (error) {
    appendTutorMessage("assistant", error.message || "AI Tutor 目前無法使用。");
    setProcessStateText(currentLanguage === "en" ? "AI Tutor unavailable" : "AI Tutor 目前無法使用");
  } finally {
    setTutorBusyState(false);
    renderTutorPanel();
  }
}

function setKnowledgeStatus(title, detail) {
  if (knowledgeStatusTitle) {
    knowledgeStatusTitle.textContent = title;
  }
  if (knowledgeStatusDetail) {
    knowledgeStatusDetail.textContent = detail;
  }
}

function updateRagModeUI() {
  if (!ragModeSelect || !ragModeDescription) {
    return;
  }

  const isAdvanced = getSelectedRagMode() === "advanced";
  const localOption = ragModeSelect.querySelector('option[value="local"]');
  const advancedOption = ragModeSelect.querySelector('option[value="advanced"]');

  if (localOption) {
    localOption.textContent = getUiText("ragModeLocal");
  }
  if (advancedOption) {
    advancedOption.textContent = getUiText("ragModeAdvanced");
  }

  ragModeDescription.textContent = IS_STATIC_PAGES_MODE
    ? (currentLanguage === "en"
      ? "GitHub Pages uses the front-end keyword RAG mode. Advanced vector indexing needs a separate backend deployment."
      : "GitHub Pages 會使用前端關鍵字 RAG 模式；進階向量索引需要另外部署後端。")
    : isAdvanced
    ? getUiText("ragModeDescriptionAdvanced")
    : getUiText("ragModeDescriptionLocal");
}

function setKnowledgeBusyState(isBusy, queryBusy = isKnowledgeQuerying) {
  isKnowledgeIndexing = isBusy;
  if (knowledgeFileInput) {
    knowledgeFileInput.disabled = isBusy || queryBusy;
  }
  if (chooseKnowledgeFilesButton) {
    chooseKnowledgeFilesButton.disabled = isBusy || queryBusy;
  }
  if (buildKnowledgeBaseButton) {
    buildKnowledgeBaseButton.disabled = isBusy || queryBusy || selectedKnowledgeFiles.length === 0;
  }
  if (seedKnowledgeBaseButton) {
    seedKnowledgeBaseButton.disabled = isBusy || queryBusy;
  }
  if (ragQuestionInput) {
    ragQuestionInput.disabled = isBusy || queryBusy;
  }
  if (askKnowledgeBaseButton) {
    askKnowledgeBaseButton.disabled = isBusy || queryBusy;
  }
}

function setKnowledgeQueryBusyState(isBusy) {
  isKnowledgeQuerying = isBusy;
  setKnowledgeBusyState(isKnowledgeIndexing, isBusy);
}

function renderRagSources(items = []) {
  if (!ragSourcesResult) {
    return;
  }

  ragSourcesResult.innerHTML = "";
  if (!items.length) {
    ragSourcesResult.innerHTML = `<p class="empty-state">${getUiText("ragSourcesEmpty")}</p>`;
    return;
  }

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "source-citation-item";

    const title = document.createElement("h4");
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
    title.textContent = `[${index + 1}] ${item.fileName}｜${locationParts.join("｜") || "段落引用"}`;

    const meta = document.createElement("div");
    meta.className = "source-citation-meta";
    meta.textContent = currentLanguage === "en"
      ? `Quoted passage${typeof item.score === "number" ? ` · similarity ${item.score.toFixed(3)}` : ""}`
      : `引用段落${typeof item.score === "number" ? ` · 相似度 ${item.score.toFixed(3)}` : ""}`;

    const quote = document.createElement("p");
    quote.textContent = item.quote || item.text || "";

    article.append(title, meta, quote);
    ragSourcesResult.appendChild(article);
  });
}

function resetRagExamFocus() {
  if (!ragExamFocusResult) {
    return;
  }
  ragExamFocusResult.hidden = true;
  ragExamFocusResult.innerHTML = "";
}

function buildKnowledgeAnswerSections(question, answer, sources = []) {
  const shortAnswer = summarizeTextForKnowledge(answer || "").split("\n").slice(0, 2).join("\n");
  const organized = summarizeTextForKnowledge(
    [
      answer,
      ...sources.slice(0, 3).map((item) => item.content || item.text || item.quote || "")
    ].filter(Boolean).join("\n\n")
  );
  const sourceNames = [...new Set(sources.map((item) => item.fileName).filter(Boolean))];

  return `
    <div class="context-preview-block">
      <strong>簡短答案</strong>
      <p>${escapeHTML(shortAnswer || answer || "尚未產生回答。").replace(/\n/g, "<br>")}</p>
    </div>
    <div class="context-preview-block">
      <strong>根據資料整理</strong>
      <p>${escapeHTML(organized || "目前沒有足夠資料可整理。").replace(/\n/g, "<br>")}</p>
    </div>
    <div class="context-preview-block">
      <strong>引用來源</strong>
      <p>${sourceNames.length ? escapeHTML(sourceNames.join("、")) : "請查看下方引用來源區塊。"}</p>
    </div>
    <div class="context-preview-block">
      <strong>下一步操作</strong>
      <p>你可以把這次的 RAG 問答送去 AI Tutor 深入解釋，或交給讀書計畫整理成後續複習安排。</p>
    </div>
  `;
}

function setCurrentRagAnswerPayload(question, answer, sources = [], mode = getSelectedRagMode()) {
  currentRagAnswerPayload = {
    question,
    answer,
    sources,
    mode,
    createdAt: new Date().toISOString()
  };

  if (ragAnswerResult) {
    ragAnswerResult.innerHTML = buildKnowledgeAnswerSections(question, answer, sources);
  }
  resetRagExamFocus();
}

function sendRagToTutor() {
  if (!currentRagAnswerPayload) {
    setKnowledgeStatus("尚未有 RAG 回答", "請先完成一次知識庫查詢，再把結果送去 AI Tutor。");
    return;
  }

  saveJsonStorage(RAG_TO_TUTOR_STORAGE_KEY, currentRagAnswerPayload);
  if (document.getElementById("tutorPage")) {
    switchPage("tutor");
    return;
  }
  location.href = "./tutor.html";
}

function sendRagToStudyAgent() {
  if (!currentRagAnswerPayload) {
    setKnowledgeStatus("尚未有 RAG 回答", "請先完成一次知識庫查詢，再把結果加入讀書計畫。");
    return;
  }

  saveJsonStorage(RAG_TO_STUDY_AGENT_STORAGE_KEY, currentRagAnswerPayload);
  if (document.getElementById("plannerPage")) {
    switchPage("planner");
    return;
  }
  location.href = "./study-agent.html";
}

function buildExamFocusFromRagPayload(payload) {
  const sourceText = [
    payload?.answer || "",
    ...(payload?.sources || []).map((item) => item.content || item.text || item.quote || "")
  ].join("\n\n");

  const sentences = String(sourceText)
    .replace(/\n+/g, " ")
    .split(/。|！|？|\.|\?|!/)
    .map((sentence) => normalizeText(sentence))
    .filter((sentence) => sentence.length >= 10);

  const unique = [];
  const seen = new Set();
  sentences.forEach((sentence) => {
    const key = normalizeConcept(sentence);
    if (key && !seen.has(key)) {
      seen.add(key);
      unique.push(sentence);
    }
  });

  return unique.slice(0, 5).map((sentence, index) => `${index + 1}. ${sentence}`);
}

function renderRagExamFocus() {
  if (!ragExamFocusResult || !currentRagAnswerPayload) {
    return;
  }

  const items = buildExamFocusFromRagPayload(currentRagAnswerPayload);
  ragExamFocusResult.hidden = false;
  ragExamFocusResult.innerHTML = `
    <div class="context-preview-block">
      <strong>考前重點整理</strong>
      <p>${items.length ? escapeHTML(items.join("\n")).replace(/\n/g, "<br>") : "目前還沒有足夠內容可整理成考前重點。"}</p>
    </div>
  `;
}

function buildLatestNoteKnowledgeDocument(latestResult) {
  if (!latestResult) {
    return null;
  }

  const sections = [
    { title: "智慧摘要", text: latestResult.summary || "" },
    { title: "重要句子", text: (latestResult.importantSentences || []).join("\n") },
    { title: "可能重點", text: (latestResult.possibleExamPoints || []).join("\n") },
    { title: "關鍵詞 / 重要概念", text: ((latestResult.keyTerms || latestResult.accountingTerms) || []).join("\n") },
    { title: "理解問題", text: (latestResult.questions || []).join("\n") }
  ]
    .map((section, index) => ({
      ...section,
      paragraphNumber: index + 1
    }))
    .filter((section) => normalizeText(section.text).length > 0);

  if (!sections.length) {
    return null;
  }

  return {
    fileName: "最近一次整理結果筆記",
    extension: "smartstudy-note",
    sections
  };
}

function mergeDocumentsIntoLocalKnowledge(documents = []) {
  const nextChunks = createLocalKnowledgeChunks(documents);
  const store = loadLocalKnowledgeStore();
  const replacedFiles = new Set(documents.map((document) => document.fileName));
  const preserved = (store.chunks || []).filter((item) => !replacedFiles.has(item.fileName));
  const mergedChunks = preserved.concat(nextChunks);
  const files = [...new Set(mergedChunks.map((item) => item.fileName).filter(Boolean))];

  saveLocalKnowledgeStore({
    fileCount: files.length,
    chunkCount: mergedChunks.length,
    files,
    chunks: mergedChunks,
    updatedAt: new Date().toISOString()
  });

  return {
    fileCount: files.length,
    chunkCount: mergedChunks.length,
    addedChunkCount: nextChunks.length,
    files
  };
}

function updateKnowledgeSelectionUI() {
  if (!knowledgeFileStatus) {
    return;
  }

  if (!selectedKnowledgeFiles.length) {
    knowledgeFileStatus.textContent = getUiText("knowledgeFileStatusEmpty");
    buildKnowledgeBaseButton.disabled = true;
    return;
  }

  knowledgeFileStatus.textContent = currentLanguage === "en"
    ? `${selectedKnowledgeFiles.length} file(s) selected for indexing`
    : `已選擇 ${selectedKnowledgeFiles.length} 份知識庫檔案`;
  buildKnowledgeBaseButton.disabled = false;
}

async function buildKnowledgeDocumentsFromFiles(files) {
  const documents = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    setKnowledgeStatus(
      currentLanguage === "en" ? "Extracting file content" : "抽取文件內容中",
      currentLanguage === "en"
        ? `Processing ${file.name} (${index + 1}/${files.length})`
        : `正在處理 ${file.name}（${index + 1}/${files.length}）`
    );

    const result = await extractFileContent(file);
    documents.push({
      fileName: result.sourceMeta?.fileName || file.name,
      extension: result.sourceMeta?.extension || getFileExtension(file.name),
      sourceMeta: result.sourceMeta || null,
      sections: (result.sections || []).map((section) => ({
        title: section.title || "",
        text: section.text || "",
        pageNumber: Number(section.pageNumber) || null,
        paragraphNumber: Number(section.paragraphNumber) || null
      }))
    });
  }

  return documents;
}

async function extractTextForKnowledge(file) {
  const result = await extractFileContent(file);
  return {
    text: result.rawText || "",
    sections: Array.isArray(result.sections) ? result.sections : [],
    sourceMeta: result.sourceMeta || { fileName: file.name, extension: getFileExtension(file.name) }
  };
}

function chunkKnowledgeText(text, fileName, sections = []) {
  const chunks = [];

  if (sections.length) {
    sections.forEach((section, sectionIndex) => {
      const chunkTexts = splitTextIntoKnowledgeChunks(section.text || "");
      chunkTexts.forEach((chunkText, chunkIndex) => {
        chunks.push({
          id: `${fileName}-${sectionIndex + 1}-${chunkIndex + 1}-${Date.now()}`,
          fileName,
          chunkIndex: chunks.length + 1,
          sectionTitle: section.title || `段落 ${sectionIndex + 1}`,
          pageNumber: Number(section.pageNumber) || null,
          paragraphNumber: Number(section.paragraphNumber) || null,
          content: chunkText,
          text: chunkText,
          quote: chunkText,
          createdAt: new Date().toISOString()
        });
      });
    });
    return chunks;
  }

  return splitTextIntoKnowledgeChunks(text || "").map((chunkText, index) => ({
    id: `${fileName}-${index + 1}-${Date.now()}`,
    fileName,
    chunkIndex: index + 1,
    content: chunkText,
    text: chunkText,
    quote: chunkText,
    createdAt: new Date().toISOString()
  }));
}

function createLocalKnowledgeChunks(documents = []) {
  return documents.flatMap((document) => (
    chunkKnowledgeText(
      (document.sections || []).map((section) => section.text || "").join("\n\n"),
      document.fileName,
      document.sections || []
    )
  ));
}

function summarizeTextForKnowledge(text) {
  const sentences = String(text || "")
    .replace(/\n+/g, " ")
    .split(/。|！|？|\.|\?|!/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 15);

  if (!sentences.length) {
    return String(text || "").slice(0, 500);
  }

  return sentences.slice(0, 5).map((sentence, index) => `${index + 1}. ${sentence}`).join("\n");
}

function buildLocalKnowledgeAnswer(question, matchedChunks = []) {
  if (!matchedChunks.length) {
    return currentLanguage === "en"
      ? "No closely related passage was found in the current knowledge base."
      : "目前知識庫中沒有找到高度相關的段落。";
  }

  const combined = matchedChunks
    .slice(0, 3)
    .map((item) => item.content || item.text || "")
    .join("\n\n");

  return currentLanguage === "en"
    ? `Based on the uploaded files, the most relevant points are:\n${summarizeTextForKnowledge(combined)}`
    : `根據目前知識庫中最相關的段落，可以整理出以下回答：\n${summarizeTextForKnowledge(combined)}\n\n建議你優先查看下方引用來源，確認原文脈絡。`;
}

function queryLocalKnowledgeStore(question, limit = 6) {
  const store = loadLocalKnowledgeStore();
  const questionTokens = tokenize(normalizeText(question || ""));
  const ranked = (store.chunks || [])
    .map((item) => ({
      ...item,
      score: scoreTextAgainstQuestion(questionTokens, item.content || item.text || "")
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.content || b.text || "").length - (a.content || a.text || "").length)
    .slice(0, limit);

  return {
    store,
    ranked,
    answer: buildLocalKnowledgeAnswer(question, ranked)
  };
}

async function buildFrontendKnowledgeBase() {
  if (!selectedKnowledgeFiles.length) {
    setKnowledgeStatus(
      currentLanguage === "en" ? "No files selected" : "尚未選擇檔案",
      currentLanguage === "en"
        ? "Choose multiple PDF, PPTX, DOCX, or text files first."
        : "請先選擇多份 PDF、PPTX、DOCX 或文字檔。"
    );
    return;
  }

  setKnowledgeBusyState(true);
  ragAnswerResult.textContent = getUiText("ragAnswerEmpty");
  renderRagSources([]);

  try {
    const documents = [];
    const errors = [];

    for (let index = 0; index < selectedKnowledgeFiles.length; index += 1) {
      const file = selectedKnowledgeFiles[index];
      setKnowledgeStatus("正在建立知識庫", `正在處理 ${file.name}（${index + 1}/${selectedKnowledgeFiles.length}）`);

      try {
        const extracted = await extractTextForKnowledge(file);
        if (!normalizeText(extracted.text)) {
          errors.push(`${file.name} 沒有可讀取的文字內容`);
          continue;
        }

        documents.push({
          fileName: extracted.sourceMeta?.fileName || file.name,
          extension: extracted.sourceMeta?.extension || getFileExtension(file.name),
          sections: extracted.sections
        });
      } catch (error) {
        errors.push(error.message || `${file.name} 解析失敗`);
      }
    }

    const chunks = createLocalKnowledgeChunks(documents);
    if (!chunks.length) {
      throw new Error(errors.length
        ? `沒有成功建立任何段落。${errors.join("；")}`
        : "上傳的文件沒有產生可搜尋的段落。");
    }

    const payload = {
      ok: true,
      fileCount: documents.length,
      chunkCount: chunks.length,
      files: documents.map((document) => document.fileName)
    };
    saveLocalKnowledgeStore({
      fileCount: payload.fileCount,
      chunkCount: payload.chunkCount,
      files: payload.files,
      chunks,
      updatedAt: new Date().toISOString()
    });

    setKnowledgeStatus(
      currentLanguage === "en" ? "Knowledge base ready" : "知識庫建立成功",
      currentLanguage === "en"
        ? `Indexed ${payload.fileCount} file(s) into ${payload.chunkCount} local chunks.`
        : `已索引 ${payload.fileCount} 份文件，共建立 ${payload.chunkCount} 個段落。你現在可以在右側提問。`
    );
    knowledgeFileStatus.textContent = currentLanguage === "en"
      ? `${payload.fileCount} file(s) indexed: ${(payload.files || []).join(", ")}`
      : `已完成 ${payload.fileCount} 份文件索引：${(payload.files || []).join("、")}`;
    refreshKnowledgeStats();

    if (errors.length && knowledgeStatusDetail) {
      knowledgeStatusDetail.innerHTML += `<br><br>部分檔案未成功：${errors.map((error) => `<br>・${escapeHTML(error)}`).join("")}`;
    }
    refreshKnowledgeAssistPreviewFromCurrentInput();
  } catch (error) {
    setKnowledgeStatus(
      currentLanguage === "en" ? "Knowledge base build failed" : "知識庫建立失敗",
      `錯誤原因：${error.message || (currentLanguage === "en" ? "Unknown error." : "發生未知錯誤。")}`
    );
  } finally {
    setKnowledgeBusyState(false);
  }
}

async function buildAdvancedKnowledgeBase() {
  if (!selectedKnowledgeFiles.length) {
    setKnowledgeStatus("尚未選擇檔案", "請先選擇至少一份文件，再建立知識庫。");
    return;
  }

  await ensureOpenAIBackend("進階 RAG 模式");
  setKnowledgeBusyState(true);
  renderRagSources([]);
  ragAnswerResult.textContent = getUiText("ragAnswerEmpty");

  try {
    const documents = await buildKnowledgeDocumentsFromFiles(selectedKnowledgeFiles);
    setKnowledgeStatus(
      "建立進階知識庫中",
      "正在把文件送到後端建立 OpenAI embedding 向量索引。"
    );

    const response = await fetch("/api/rag/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ documents })
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error || "進階 RAG 知識庫建立失敗。");
    }

    setKnowledgeStatus(
      "進階知識庫建立成功",
      `已索引 ${payload.fileCount || documents.length} 份文件，本次新增 ${payload.chunkCount || 0} 個 embedding chunks。`
    );
    if (knowledgeFileStatus) {
      knowledgeFileStatus.textContent = `已完成進階索引：${(payload.files || documents.map((document) => document.fileName)).join("、")}`;
    }
    refreshKnowledgeAssistPreviewFromCurrentInput();
  } finally {
    setKnowledgeBusyState(false);
  }
}

function buildKnowledgeBase() {
  return handleBuildKnowledgeBase();
}

async function addLatestNoteToKnowledgeBase() {
  const latestResult = loadLatestStudyResult();
  if (!latestResult) {
    setKnowledgeStatus("尚未找到最近筆記", "請先回首頁整理一次筆記，再把整理結果加入知識庫。");
    return;
  }

  const document = buildLatestNoteKnowledgeDocument(latestResult);
  if (!document) {
    setKnowledgeStatus("最近筆記內容不足", "最近一次整理結果缺少可加入知識庫的摘要或重點。");
    return;
  }

  const localSummary = mergeDocumentsIntoLocalKnowledge([document]);
  refreshKnowledgeStats();
  await refreshKnowledgeBaseStatus();
  setKnowledgeStatus(
    "已加入最近一次整理結果",
    `已將首頁整理結果加入知識庫，新增 ${localSummary.addedChunkCount} 個段落。`
  );
  refreshKnowledgeAssistPreviewFromCurrentInput();

  if (getSelectedRagMode() === "advanced") {
    try {
      await ensureOpenAIBackend("進階 RAG 模式");
      const response = await fetch("/api/rag/index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ documents: [document] })
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "進階模式不可用，已改用展示模式。");
      }
      setKnowledgeStatus(
        "已同步到進階知識庫",
        `最近一次整理結果已加入展示模式與進階模式知識庫。`
      );
    } catch (error) {
      setKnowledgeStatus("進階模式不可用，已改用展示模式", error.message || "最近一次整理結果已先加入展示模式知識庫。");
    }
  }
}

async function askFrontendKnowledgeBase() {
  const question = normalizeText(ragQuestionInput.value);
  if (!question) {
    ragAnswerResult.textContent = currentLanguage === "en" ? "Please enter a question first." : "請先輸入你想查詢的問題。";
    return;
  }

  const existingStore = loadLocalKnowledgeStore();
  if (!existingStore.chunkCount) {
    ragAnswerResult.textContent = currentLanguage === "en"
      ? "No knowledge base has been built yet. Upload files and build it first."
      : "目前還沒有建立知識庫。請先上傳文件並按下「建立知識庫」。";
    renderRagSources([]);
    return;
  }

  setKnowledgeQueryBusyState(true);
  setKnowledgeStatus(
    currentLanguage === "en" ? "Searching knowledge base" : "搜尋知識庫中",
    currentLanguage === "en"
      ? "The system is matching keywords against local chunks and preparing a cited answer."
      : "系統正在用關鍵字比對本地 chunks，並整理含引用來源的回答。"
  );

  try {
    const payload = queryLocalKnowledgeStore(question);
    setCurrentRagAnswerPayload(question, payload.answer || getUiText("ragAnswerEmpty"), payload.ranked || [], "local");
    renderRagSources(payload.ranked || []);
    if (ragAnswerMeta) {
      ragAnswerMeta.textContent = `展示模式｜找到 ${payload.ranked?.length || 0} 個相關段落`;
    }
    setKnowledgeStatus(
      currentLanguage === "en" ? "Answer ready" : "已完成知識庫回答",
      currentLanguage === "en"
        ? `Retrieved ${payload.ranked?.length || 0} cited local chunk(s).`
        : `本次共引用 ${payload.ranked?.length || 0} 個本地來源片段。`
    );
    showToast(
      currentLanguage === "en" ? "Knowledge answer ready" : "知識庫回答已完成",
      currentLanguage === "en"
        ? `Found ${payload.ranked?.length || 0} local source passage(s).`
        : `本次找到 ${payload.ranked?.length || 0} 個本地來源片段。`,
      "success"
    );
  } catch (error) {
    currentRagAnswerPayload = null;
    ragAnswerResult.textContent = error.message || (currentLanguage === "en" ? "Knowledge-base query failed." : "知識庫查詢失敗。");
    renderRagSources([]);
    resetRagExamFocus();
    setKnowledgeStatus(
      currentLanguage === "en" ? "Knowledge-base query failed" : "知識庫查詢失敗",
      error.message || (currentLanguage === "en" ? "Unknown error." : "發生未知錯誤。")
    );
  } finally {
    setKnowledgeQueryBusyState(false);
  }
}

function askKnowledgeBase() {
  return handleAskKnowledgeBase();
}

async function askAdvancedKnowledgeBase() {
  const question = normalizeText(ragQuestionInput.value);
  if (!question) {
    ragAnswerResult.textContent = currentLanguage === "en" ? "Please enter a question first." : "請先輸入你想查詢的問題。";
    return;
  }

  await ensureOpenAIBackend("進階 RAG 模式");
  setKnowledgeQueryBusyState(true);

  try {
    setKnowledgeStatus("查詢進階知識庫中", "正在透過 query embedding 與向量索引搜尋最相關段落。");
    const response = await fetch("/api/rag/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error || "進階 RAG 查詢失敗。");
    }

    setCurrentRagAnswerPayload(question, payload.answer || getUiText("ragAnswerEmpty"), payload.sources || [], "advanced");
    renderRagSources(payload.sources || []);
    if (ragAnswerMeta) {
      ragAnswerMeta.textContent = `進階模式｜找到 ${(payload.sources || []).length} 個來源片段`;
    }
    setKnowledgeStatus("進階知識庫回答完成", `本次共引用 ${(payload.sources || []).length} 個後端檢索來源。`);
    showToast(
      currentLanguage === "en" ? "Advanced knowledge answer ready" : "進階知識庫回答已完成",
      currentLanguage === "en"
        ? `Found ${(payload.sources || []).length} retrieved source passage(s).`
        : `本次找到 ${(payload.sources || []).length} 個後端檢索來源。`,
      "success"
    );
  } finally {
    setKnowledgeQueryBusyState(false);
  }
}

async function handleBuildKnowledgeBase() {
  const ragMode = getSelectedRagMode();

  if (ragMode === "advanced") {
    try {
      await buildAdvancedKnowledgeBase();
      return;
    } catch (error) {
      console.warn("進階 RAG 建立失敗，改用展示模式：", error);
      setKnowledgeStatus("進階模式失敗，已改用展示模式", error.message || "後端進階索引失敗，改由前端展示模式處理。");
      await buildFrontendKnowledgeBase();
      return;
    }
  }

  await buildFrontendKnowledgeBase();
}

async function handleAskKnowledgeBase() {
  const ragMode = getSelectedRagMode();

  if (ragMode === "advanced") {
    try {
      await askAdvancedKnowledgeBase();
      return;
    } catch (error) {
      console.warn("進階 RAG 查詢失敗，改用展示模式：", error);
      setKnowledgeStatus("進階模式失敗，已改用展示模式", error.message || "後端進階查詢失敗，改由前端展示模式處理。");
      await askFrontendKnowledgeBase();
      return;
    }
  }

  await askFrontendKnowledgeBase();
}

function refreshKnowledgeStats() {
  if (!knowledgeStats || !knowledgeStatsText) {
    // Continue updating the visible summary cards below even if the legacy stats block is absent.
  }

  const store = loadLocalKnowledgeStore();
  if (knowledgeStats && knowledgeStatsText) {
    if (!store.chunkCount) {
      knowledgeStats.hidden = true;
      knowledgeStatsText.textContent = "尚無資料。";
    } else {
      knowledgeStats.hidden = false;
      knowledgeStatsText.textContent = `已建立 ${store.fileCount} 份文件、${store.chunkCount} 個段落。`;
    }
  }

  const knowledgeItems = getKnowledgeItems();
  const subjects = [...new Set(knowledgeItems.map((item) => normalizeText(item.subject)).filter(Boolean))];
  const chapters = knowledgeItems
    .map((item) => normalizeText(item.chapter))
    .filter(Boolean);
  const topTopics = [...new Set(chapters)].slice(0, 4);

  if (knowledgeSummaryFiles) {
    knowledgeSummaryFiles.textContent = String(store.fileCount || 0);
  }

  if (knowledgeSummaryChunks) {
    knowledgeSummaryChunks.textContent = String(store.chunkCount || 0);
  }

  if (knowledgeSummarySubjects) {
    knowledgeSummarySubjects.textContent = String(subjects.length);
  }

  if (knowledgeSummaryTopTopicsText) {
    knowledgeSummaryTopTopicsText.textContent = topTopics.length
      ? topTopics.join(currentLanguage === "en" ? ", " : "、")
      : (currentLanguage === "en" ? "No data yet" : "尚無資料");
  }

  if (knowledgeStructureCount) {
    knowledgeStructureCount.textContent = String(subjects.length);
  }

  if (knowledgeStructureList) {
    knowledgeStructureList.innerHTML = "";

    if (!knowledgeItems.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = getUiText("knowledgeStructureEmpty");
      knowledgeStructureList.appendChild(empty);
      return;
    }

    const grouped = new Map();
    knowledgeItems.forEach((item) => {
      const subject = normalizeText(item.subject) || (currentLanguage === "en" ? "Other" : "其他");
      const chapter = normalizeText(item.chapter) || (currentLanguage === "en" ? "Uncategorized" : "未分類");
      if (!grouped.has(subject)) {
        grouped.set(subject, new Map());
      }
      const chapterMap = grouped.get(subject);
      chapterMap.set(chapter, (chapterMap.get(chapter) || 0) + 1);
    });

    const fragment = document.createDocumentFragment();
    Array.from(grouped.entries())
      .sort((a, b) => a[0].localeCompare(b[0], currentLanguage === "en" ? "en" : "zh-Hant"))
      .forEach(([subject, chapterMap]) => {
        const item = document.createElement("article");
        item.className = "knowledge-structure-item";

        const header = document.createElement("div");
        header.className = "knowledge-structure-item-header";

        const subjectTitle = document.createElement("strong");
        subjectTitle.textContent = subject;

        const meta = document.createElement("span");
        meta.textContent = `${chapterMap.size} ${getUiText("knowledgeStructureTopicsCount")}`;

        header.appendChild(subjectTitle);
        header.appendChild(meta);

        const chipRow = document.createElement("div");
        chipRow.className = "knowledge-topic-chip-row";

        Array.from(chapterMap.entries())
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], currentLanguage === "en" ? "en" : "zh-Hant"))
          .slice(0, 8)
          .forEach(([chapter, count]) => {
            const chip = document.createElement("span");
            chip.className = "knowledge-topic-chip";
            chip.textContent = `${chapter} · ${count}`;
            chipRow.appendChild(chip);
          });

        item.appendChild(header);
        item.appendChild(chipRow);
        fragment.appendChild(item);
      });

    knowledgeStructureList.appendChild(fragment);
  }

  updatePageInsights();
}

function clearFrontendKnowledgeBase() {
  removeFromStorage(KNOWLEDGE_CHUNKS_KEY);
  removeFromStorage(LOCAL_RAG_STORAGE_KEY);
  selectedKnowledgeFiles = [];
  ragSelectedFiles = [];
  if (knowledgeFileInput) {
    knowledgeFileInput.value = "";
  }
  updateKnowledgeSelectionUI();
  currentRagAnswerPayload = null;
  setKnowledgeStatus("知識庫已清空", "你可以重新上傳文件建立新的知識庫。");
  ragAnswerResult.textContent = getUiText("ragAnswerEmpty");
  renderRagSources([]);
  resetRagExamFocus();
  refreshKnowledgeStats();
  refreshKnowledgeAssistPreviewFromCurrentInput();
}

async function refreshKnowledgeBaseStatus() {
  try {
    if (getSelectedRagMode() === "advanced") {
      try {
        const health = await getApiHealth();
        if (health?.hasApiKey) {
          const response = await fetch("/api/rag/status");
          const payload = await response.json().catch(() => null);
          if (response.ok && payload?.ok) {
            setKnowledgeStatus(
              currentLanguage === "en" ? "Advanced knowledge base ready" : "進階知識庫狀態",
              currentLanguage === "en"
                ? `Backend vector store: ${payload.fileCount} file(s), ${payload.chunkCount} chunks.${payload.files?.length ? ` Files: ${payload.files.join(", ")}` : ""}`
                : `後端向量知識庫共有 ${payload.fileCount} 份文件、${payload.chunkCount} 個 chunks。${payload.files?.length ? ` 已索引檔案：${payload.files.join("、")}` : ""}`
            );
            return;
          }
        }
      } catch (error) {
        // Fall through to the local-store status when the advanced backend is unavailable.
      }
    }

    const payload = loadLocalKnowledgeStore();

    if (payload.chunkCount > 0) {
      setKnowledgeStatus(
        currentLanguage === "en" ? "Knowledge base ready" : "知識庫已就緒",
        currentLanguage === "en"
          ? `Current local index: ${payload.fileCount} file(s), ${payload.chunkCount} chunks.${payload.files?.length ? ` Files: ${payload.files.join(", ")}` : ""}`
          : `目前本地知識庫共有 ${payload.fileCount} 份文件、${payload.chunkCount} 個 chunks。${payload.files?.length ? ` 已索引檔案：${payload.files.join("、")}` : ""}`
      );
      refreshKnowledgeStats();
      return;
    }

    setKnowledgeStatus(
      currentLanguage === "en" ? "Knowledge base not built yet" : "知識庫尚未建立",
      currentLanguage === "en"
        ? "Upload files and build a front-end knowledge base stored in this browser."
        : "請先上傳文件並建立前端本地知識庫，資料會儲存在這個瀏覽器中。"
    );
    refreshKnowledgeStats();
  } catch (error) {
    setKnowledgeStatus(
      currentLanguage === "en" ? "Knowledge base unavailable" : "知識庫目前無法使用",
      error.message || (currentLanguage === "en" ? "Unable to load local knowledge store." : "無法讀取本地知識庫。")
    );
  }
}

function initKnowledgePage() {
  if (!document.getElementById("knowledgeFileInput") && !document.getElementById("buildKnowledgeBaseButton")) {
    return;
  }

  restoreRagModePreference();
  updateRagModeUI();
  refreshKnowledgeStats();
  refreshKnowledgeBaseStatus();
}

function setStudyAgentBusyState(isBusy) {
  isStudyAgentLoading = isBusy;
  if (generateStudyPlanButton) {
    generateStudyPlanButton.disabled = isBusy;
  }
  if (wrongQuestionsInput) {
    wrongQuestionsInput.disabled = isBusy;
  }
  if (examDateInput) {
    examDateInput.disabled = isBusy;
  }
  if (studyHoursInput) {
    studyHoursInput.disabled = isBusy;
  }
}

function setStudyAgentStatus(title, detail) {
  if (studyAgentStatusTitle) {
    studyAgentStatusTitle.textContent = title;
  }
  if (studyAgentStatusDetail) {
    studyAgentStatusDetail.textContent = detail;
  }
}

function resetStudyPlanView() {
  currentStudyPlan = null;
  if (studyPlanOverviewResult) {
    studyPlanOverviewResult.textContent = getUiText("studyPlanOverviewEmpty");
  }
  renderList(todayTasksResult, [], getUiText("todayTasksEmpty"));
  renderInfoBlocks(dailyPlanResult, [], getUiText("dailyPlanEmpty"));
  renderInfoBlocks(weeklyProgressResult, [], getUiText("weeklyProgressEmpty"));
  renderInfoBlocks(priorityFocusResult, [], getUiText("priorityFocusEmpty"));
  renderList(riskAlertsResult, [], getUiText("riskAlertsEmpty"));
  if (sprintModeResult) {
    sprintModeResult.textContent = getUiText("sprintModeEmpty");
  }
}

function renderStudyPlan(plan) {
  if (!plan) {
    resetStudyPlanView();
    return;
  }

  currentStudyPlan = plan;
  studyPlanOverviewResult.textContent = plan.overview || getUiText("studyPlanOverviewEmpty");

  renderList(
    todayTasksResult,
    (plan.todayTasks || []).map((text, index) => ({ text, isCritical: index < 2 })),
    getUiText("todayTasksEmpty")
  );

  renderInfoBlocks(
    dailyPlanResult,
    (plan.dailyPlan || []).map((item) => ({
      label: `${item.dayLabel}${item.hours ? `｜${item.hours}${currentLanguage === "en" ? " hrs" : " 小時"}` : ""}`,
      description: [item.focus, ...(item.tasks || [])].filter(Boolean).join(currentLanguage === "en" ? " | " : "｜")
    })),
    getUiText("dailyPlanEmpty")
  );

  renderInfoBlocks(
    weeklyProgressResult,
    (plan.weeklyProgress || []).map((item) => ({
      label: item.label,
      description: item.description
    })),
    getUiText("weeklyProgressEmpty")
  );

  const priorityItems = [
    ...(plan.subjectPriority || []).map((item) => ({
      label: currentLanguage === "en" ? `Subject: ${item.label}` : `科目：${item.label}`,
      description: item.description
    })),
    ...(plan.chapterPriority || []).map((item) => ({
      label: currentLanguage === "en" ? `Chapter: ${item.label}` : `章節：${item.label}`,
      description: item.description
    }))
  ];

  renderInfoBlocks(priorityFocusResult, priorityItems, getUiText("priorityFocusEmpty"));

  renderList(
    riskAlertsResult,
    [...(plan.memoryRiskAlerts || []), ...(plan.highRiskAlerts || [])].map((text) => ({ text, isCritical: true })),
    getUiText("riskAlertsEmpty")
  );

  sprintModeResult.textContent = [plan.sprintMode?.summary, plan.sprintMode?.action].filter(Boolean).join("\n\n") || getUiText("sprintModeEmpty");
}

function buildStudyAgentContext() {
  const latestResult = loadLatestStudyResult();
  currentRagStudyAgentContext = loadRagStudyAgentTransfer();
  const fallbackAnalysis = latestResult ? convertLatestStudyResultToAnalysisResult(latestResult) : null;
  const activeResult = currentAnalysisResult || fallbackAnalysis;
  const ragContextText = currentRagStudyAgentContext
    ? [
      currentRagStudyAgentContext.question || "",
      currentRagStudyAgentContext.answer || "",
      ...(currentRagStudyAgentContext.sources || []).map((item) => item.quote || item.content || item.text || "")
    ].join("\n")
    : "";
  const noteText = normalizeText([activeResult?.cleanedText || sourceText.value || latestResult?.sourceText || "", ragContextText].filter(Boolean).join("\n\n"));
  return {
    noteText,
    summary: activeResult?.chinese?.summary || latestResult?.summary || "",
    possibleExamPoints: (activeResult?.chinese?.possibleExamPoints || []).map((item) => item.text || "").filter(Boolean).slice(0, 8),
    accountingTerms: getResultKeyTerms(activeResult?.chinese || {}).map((item) => item.label || "").filter(Boolean).slice(0, 10),
    wrongQuestions: normalizeText(wrongQuestionsInput?.value || ""),
    examDate: examDateInput?.value || "",
    studyHoursPerDay: Number(studyHoursInput?.value || 0)
  };
}

function buildLocalStudyPlan(context) {
  const hours = Number(context.studyHoursPerDay || 2);

  const todayTasks = [
    `先讀智慧摘要，花 ${Math.max(20, Math.round(hours * 20))} 分鐘掌握整體架構`,
    ...(context.possibleExamPoints || [])
      .slice(0, 3)
      .map((point, index) => `重點 ${index + 1}：複習「${point}」並用自己的話解釋一次`),
    context.wrongQuestions
      ? `回頭修正錯題 / 卡住概念：${context.wrongQuestions}`
      : "補一題自我測驗，確認今天的理解是否完整"
  ].slice(0, 4);

  const dailyPlan = [
    {
      dayLabel: "Day 1",
      hours,
      focus: "建立整體概念與章節地圖",
      tasks: todayTasks.slice(0, 2)
    },
    {
      dayLabel: "Day 2-3",
      hours,
      focus: "複習最常出題的重點與名詞",
      tasks: (context.possibleExamPoints || []).slice(0, 3).map((point) => `複習：${point}`)
    },
    {
      dayLabel: "Day 4-5",
      hours,
      focus: "用題目驗證理解並記錄錯誤原因",
      tasks: [
        "重做容易錯的觀念",
        "把每個重點整理成一句話",
        "用自問自答確認是否真的理解"
      ]
    },
    {
      dayLabel: "考前 1-2 天",
      hours,
      focus: "切換成考前衝刺模式",
      tasks: [
        "快速回看摘要",
        "複習錯題",
        "只補最不熟的高風險觀念"
      ]
    }
  ];

  const weeklyProgress = [
    {
      label: "第 1 天",
      description: "建立整體概念與章節地圖。"
    },
    {
      label: "第 2-3 天",
      description: "重看最常出題的重點與關鍵詞。"
    },
    {
      label: "第 4-5 天",
      description: "用練習題驗證理解，並記錄錯誤原因。"
    },
    {
      label: "最後 1-2 天",
      description: "快速回看摘要、錯題與高風險觀念。"
    }
  ];

  const subjectPriority = [
    {
      label: "目前筆記主題",
      description: "優先複習摘要、重要句子與可能考點。"
    }
  ];

  const chapterPriority = [
    ...(context.possibleExamPoints || []).slice(0, 4).map((point, index) => ({
      label: `重點 ${index + 1}`,
      description: point
    })),
    ...(context.accountingTerms || []).slice(0, 3).map((term, index) => ({
      label: `關鍵詞 ${index + 1}`,
      description: term
    }))
  ];

  const riskAlerts = context.wrongQuestions
    ? [
        context.wrongQuestions,
        "若錯題類型重複，代表核心定義仍未穩定，建議重新寫一次自己的版本。"
      ]
    : [
        "若只看摘要不練習，很容易以為自己會了，建議至少安排一輪自測。"
      ];

  return {
    overview: `距離考試前，建議每天固定安排 ${hours} 小時，先用摘要建立全貌，再集中處理最容易出題與最常出錯的概念。`,
    todayTasks,
    dailyPlan,
    weeklyProgress,
    subjectPriority,
    chapterPriority,
    memoryRiskAlerts: riskAlerts,
    highRiskAlerts: [],
    sprintMode: {
      summary: "考前衝刺時，優先回看摘要、可能重點與錯題。",
      action: "把每個重點壓成一句話，再做 1 到 2 題快速自測。"
    }
  };
}

async function generateStudyPlan() {
  const context = buildStudyAgentContext();
  if (!context.noteText) {
    setStudyAgentStatus(
      currentLanguage === "en" ? "Notes required" : "需要筆記內容",
      currentLanguage === "en"
        ? "Paste notes or analyze a file first so the Study Agent has something to plan around."
        : "請先貼上筆記內容，或先整理文件，AI Study Agent 才能排出計畫。"
    );
    return;
  }

  if (!context.examDate) {
    setStudyAgentStatus(
      currentLanguage === "en" ? "Exam date required" : "需要考試日期",
      currentLanguage === "en"
        ? "Set the exam date so the Study Agent can adjust urgency and sprint mode."
        : "請先設定考試日期，AI Study Agent 才能調整急迫度與衝刺模式。"
    );
    return;
  }

  if (!context.studyHoursPerDay || context.studyHoursPerDay <= 0) {
    setStudyAgentStatus(
      currentLanguage === "en" ? "Study time required" : "需要讀書時間",
      currentLanguage === "en"
        ? "Enter your available study hours per day."
        : "請先輸入每日可讀書時間。"
    );
    return;
  }

  setStudyAgentBusyState(true);
  setStudyAgentStatus(
    currentLanguage === "en" ? "Generating study plan" : "生成讀書計畫中",
    currentLanguage === "en"
      ? "The AI Study Agent is analyzing your notes, mistakes, exam date, and study time."
      : "AI Study Agent 正在分析你的筆記、錯題、考試日期與可讀書時間。"
  );

  try {
    let plan = null;
    try {
      const health = await getApiHealth();
      if (health?.hasApiKey) {
        const response = await fetch("/api/study-agent/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(context)
        });

        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.ok || !payload?.plan) {
          throw new Error(payload?.error || "無法生成讀書計畫。");
        }
        plan = payload.plan;
      }
    } catch (error) {
      plan = null;
    }

    if (!plan) {
      plan = buildLocalStudyPlan(context);
    }

    renderStudyPlan(plan);
    setStudyAgentStatus(
      currentLanguage === "en" ? "Study plan ready" : "讀書計畫已生成",
      currentLanguage === "en"
        ? "The plan is ready. Re-run it whenever your mistakes, time, or exam date changes."
        : "讀書計畫已完成。當錯題、可用時間或考試日期有變化時，可以重新生成。"
    );
  } catch (error) {
    resetStudyPlanView();
    setStudyAgentStatus(
      currentLanguage === "en" ? "Study plan failed" : "讀書計畫生成失敗",
      error.message || (currentLanguage === "en" ? "Unknown error." : "發生未知錯誤。")
    );
  } finally {
    setStudyAgentBusyState(false);
  }
}

function initStudyAgentPage() {
  if (!document.getElementById("generateStudyPlanButton") && !document.getElementById("studyAgentStatusTitle")) {
    return;
  }

  const latestResult = loadLatestStudyResult();
  currentRagStudyAgentContext = loadRagStudyAgentTransfer();
  if (latestResult && !currentAnalysisResult) {
    currentAnalysisResult = convertLatestStudyResultToAnalysisResult(latestResult);
  } else if (!latestResult && currentRagStudyAgentContext && !currentAnalysisResult) {
    currentAnalysisResult = buildAnalysisResultFromRagContext(currentRagStudyAgentContext);
  }

  if (studyAgentLoadedTitle) {
    studyAgentLoadedTitle.textContent = latestResult || currentRagStudyAgentContext
      ? "已載入最近一次整理結果，可以生成讀書計畫。"
      : "目前還沒有可用的整理結果。";
  }
  if (studyAgentLoadedMeta) {
    studyAgentLoadedMeta.textContent = latestResult
      ? `整理時間：${new Date(latestResult.createdAt).toLocaleString("zh-TW")}｜模式：${latestResult.mode || "exam"}`
      : (currentRagStudyAgentContext
        ? "已讀取最近一次 RAG 問答內容，可直接納入讀書計畫。"
        : "請先回首頁整理筆記，再回來生成讀書計畫。");
  }
  if (currentRagStudyAgentContext && studyAgentLoadedMeta) {
    studyAgentLoadedMeta.textContent += "｜已加入最近一次 RAG 問答作為補充參考";
  }
}

function renderCurrentResult(result = null) {
  if (!result) {
    if (nextStepPanel) {
      nextStepPanel.hidden = true;
    }
    resetResultsView();
    syncTutorSession(result);
    syncNotesAccordionResult(null);
    return;
  }

  if (nextStepPanel) {
    nextStepPanel.hidden = false;
  }

  resultTimestamp.textContent = formatDateTime(result.analyzedAt);
  syncTutorSession(result);
  syncNotesAccordionResult(result);
}

function renderLastResult() {
  renderCurrentResult(currentAnalysisResult);
}

function loadHistory() {
  const parsed = loadFromStorage(HISTORY_STORAGE_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

function persistHistory(history) {
  saveToStorage(HISTORY_STORAGE_KEY, history);
}

function restoreLatestWorkspaceFromHistory() {
  if (currentAnalysisResult || normalizeText(sourceText.value)) {
    return;
  }

  const latestAnalysis = loadLatestAnalysis();
  if (latestAnalysis) {
    currentOpenedNotePayload = null;
    currentAnalysisResult = latestAnalysis;
    sourceText.value = latestAnalysis.sourceText || "";
    lastSourceMeta = latestAnalysis.sourceMeta || null;
    lastSourceSections = Array.isArray(latestAnalysis.sourceSections)
      ? latestAnalysis.sourceSections.map((section) => ({ ...section }))
      : [];

    if (latestAnalysis.mode && modeSelect.querySelector(`option[value="${latestAnalysis.mode}"]`)) {
      modeSelect.value = latestAnalysis.mode;
    }
    if (latestAnalysis.analysisEnhancement && enhancementConfigs[latestAnalysis.analysisEnhancement]) {
      analysisEnhancement.value = latestAnalysis.analysisEnhancement;
    }
    syncVisibleNoteModeFromLegacyMode();
    return;
  }

  const latest = loadHistory()[0];
  if (!latest) {
    return;
  }

  currentOpenedNotePayload = null;
  currentAnalysisResult = latest.result || null;
  sourceText.value = latest.sourceText || "";
  lastSourceMeta = latest.sourceMeta || null;
  lastSourceSections = Array.isArray(latest.result?.sourceSections)
    ? latest.result.sourceSections.map((section) => ({ ...section }))
    : [];

  if (latest.mode && modeSelect.querySelector(`option[value="${latest.mode}"]`)) {
    modeSelect.value = latest.mode;
  }
  if (latest.result?.analysisEnhancement && enhancementConfigs[latest.result.analysisEnhancement]) {
    analysisEnhancement.value = latest.result.analysisEnhancement;
  }
  syncVisibleNoteModeFromLegacyMode();
}

function resetNotesPageStateOnLoad() {
  sourceText.value = "";
  fileInput.value = "";
  currentUploadedFiles = [];
  currentOpenedNotePayload = null;
  currentAnalysisResult = null;
  lastSourceMeta = null;
  lastSourceSections = [];

  if (fileStatus) {
    fileStatus.textContent = currentLanguage === "en" ? "No file selected" : "尚未選擇檔案";
  }

  restoreUploadHelp();
  resetUploadPreview();
  renderCurrentResult();
  resetStudyPlanView();
  setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
  setProcessStateText(currentLanguage === "en" ? "Pending" : "待處理");
  updateCounts();
  updateModeUI();
  refreshKnowledgeAssistPreviewFromCurrentInput();
}

function buildHistoryPreview(result) {
  const firstHighlight = result.chinese?.highlights?.[0];
  return firstHighlight ? (firstHighlight.text || getHighlightDisplayText(firstHighlight)) : "這次整理沒有擷取到可顯示的重點。";
}

function saveHistoryEntry(result) {
  saveLatestAnalysis(result);
  const entry = {
    id: `${result.analyzedAt}-${Math.random().toString(36).slice(2, 8)}`,
    analyzedAt: result.analyzedAt,
    mode: result.mode,
    modeLabel: result.modeLabel,
    sourceMeta: result.sourceMeta,
    sourceText: result.sourceText,
    preview: buildHistoryPreview(result),
    result
  };

  const history = loadHistory()
    .filter((item) => item.sourceText !== entry.sourceText || item.mode !== entry.mode)
    .slice(0, HISTORY_LIMIT - 1);

  history.unshift(entry);
  persistHistory(history);
  renderHistory(history);
}

function renderHistory(history = loadHistory()) {
  historyList.innerHTML = "";

  if (!history.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = getUiText("historyEmpty");
    historyList.appendChild(empty);
    return;
  }

  history.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "history-item";

    const head = document.createElement("div");
    head.className = "history-item-head";

    const title = document.createElement("h4");
    title.textContent = currentLanguage === "en" ? localizeModeLabel(entry.modeLabel) : entry.modeLabel;

    const meta = document.createElement("span");
    meta.className = "history-meta";
    meta.textContent = formatDateTime(entry.analyzedAt);

    head.append(title, meta);

    const preview = document.createElement("p");
    preview.textContent = translateDisplayText(entry.preview);

    const source = document.createElement("p");
    source.className = "history-meta";
    source.textContent = entry.sourceMeta?.fileName
      ? `${getUiText("sourcePrefix")}${entry.sourceMeta.fileName}`
      : getUiText("manualSource");

    const actions = document.createElement("div");
    actions.className = "history-actions";

    const restoreButton = document.createElement("button");
    restoreButton.type = "button";
    restoreButton.className = "ghost-button";
    restoreButton.dataset.historyId = entry.id;
    restoreButton.dataset.action = "restore";
    restoreButton.textContent = getUiText("restoreHistory");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "ghost-button";
    deleteButton.dataset.historyId = entry.id;
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = getUiText("deleteHistory");

    actions.append(restoreButton, deleteButton);
    item.append(head, preview, source, actions);
    historyList.appendChild(item);
  });
}

function updateCounts() {
  const text = normalizeText(sourceText.value);
  const sentences = splitSentences(text);
  charCount.textContent = text.length.toString();
  sentenceCount.textContent = sentences.length.toString();
}

function updateLanguageToggleLabel() {
  if (!resultLanguageTag) return;

  const language = getCurrentLanguage();
  const translation = uiTranslations[language] || uiTranslations.zh;

  resultLanguageTag.textContent = translation.languageToggleTarget;
  resultLanguageTag.setAttribute("aria-label", translation.languageToggleAria);
}

function updateLanguageView() {
  persistDisplayLanguagePreference();
  applyInterfaceLanguage();
  updateModeUI();
  updateTutorSourceUI();
  updateHomeActivity();
  updatePageInsights();
  updateKnowledgeResults();
  renderMyNotes();
  renderStudyPlanner();
  renderHomeTasks();
  syncSourceContextUI();
  updateKnowledgeSelectionUI();
  updateExportPreview();
  if (!ragAnswerResult.textContent.trim() || ragAnswerResult.textContent === uiTranslations.zh.ragAnswerEmpty || ragAnswerResult.textContent === uiTranslations.en.ragAnswerEmpty) {
    ragAnswerResult.textContent = getUiText("ragAnswerEmpty");
  }
  if (!ragSourcesResult.querySelector(".source-citation-item")) {
    renderRagSources([]);
  }
  if (!knowledgeStatusTitle.textContent.trim() || knowledgeStatusTitle.textContent === uiTranslations.zh.knowledgeStatusTitle || knowledgeStatusTitle.textContent === uiTranslations.en.knowledgeStatusTitle) {
    setKnowledgeStatus(getUiText("knowledgeStatusTitle"), getUiText("knowledgeStatusDetail"));
  }
  if (!currentStudyPlan) {
    resetStudyPlanView();
  } else {
    renderStudyPlan(currentStudyPlan);
  }
  renderHistory();
}

function applyInterfaceLanguage() {
  sourceTextLabel.textContent = getUiText("sourceTextLabel");
  sourceText.placeholder = getUiText("sourceTextPlaceholder");
  analyzeButton.textContent = getUiText("analyzeButton");
  clearButton.textContent = getUiText("clearButton");
  copyButton.textContent = getUiText("copyButton");
  refreshQuestionsButton.textContent = getUiText("refreshQuestionsButton");
  clearHistoryButton.textContent = getUiText("clearHistoryButton");
  charCountLabel.textContent = getUiText("charCountLabel");
  sentenceCountLabel.textContent = getUiText("sentenceCountLabel");
  processStateLabel.textContent = getUiText("processStateLabel");
  resultSectionKicker.textContent = getUiText("resultSectionKicker");
  resultSectionTitle.textContent = getUiText("resultSectionTitle");
  knowledgeSectionKicker.textContent = getUiText("knowledgeSectionKicker");
  knowledgeSectionTitle.textContent = getUiText("knowledgeSectionTitle");
  knowledgeMeta.textContent = getUiText("knowledgeMeta");
  knowledgeUploadDescription.textContent = getUiText("knowledgeUploadDescription");
  updateRagModeUI();
  chooseKnowledgeFilesButton.textContent = getUiText("chooseKnowledgeFilesButton");
  buildKnowledgeBaseButton.textContent = getUiText("buildKnowledgeBaseButton");
  askKnowledgeBaseButton.textContent = getUiText("askKnowledgeBaseButton");
  ragQuestionInput.placeholder = getUiText("ragQuestionPlaceholder");
  ragAnswerTitle.textContent = getUiText("ragAnswerTitle");
  ragAnswerMeta.textContent = getUiText("ragAnswerMeta");
  ragSourcesTitle.textContent = getUiText("ragSourcesTitle");
  ragSourcesMeta.textContent = getUiText("ragSourcesMeta");
  studyAgentSectionKicker.textContent = getUiText("studyAgentSectionKicker");
  studyAgentSectionTitle.textContent = getUiText("studyAgentSectionTitle");
  studyAgentMeta.textContent = getUiText("studyAgentMeta");
  wrongQuestionsLabel.textContent = getUiText("wrongQuestionsLabel");
  wrongQuestionsInput.placeholder = getUiText("wrongQuestionsPlaceholder");
  examDateLabel.textContent = getUiText("examDateLabel");
  studyHoursLabel.textContent = getUiText("studyHoursLabel");
  generateStudyPlanButton.textContent = getUiText("generateStudyPlanButton");
  studyPlanOverviewTitle.textContent = getUiText("studyPlanOverviewTitle");
  studyPlanOverviewMeta.textContent = getUiText("studyPlanOverviewMeta");
  todayTasksTitle.textContent = getUiText("todayTasksTitle");
  todayTasksMeta.textContent = getUiText("todayTasksMeta");
  dailyPlanTitle.textContent = getUiText("dailyPlanTitle");
  dailyPlanMeta.textContent = getUiText("dailyPlanMeta");
  weeklyProgressTitle.textContent = getUiText("weeklyProgressTitle");
  weeklyProgressMeta.textContent = getUiText("weeklyProgressMeta");
  priorityFocusTitle.textContent = getUiText("priorityFocusTitle");
  priorityFocusMeta.textContent = getUiText("priorityFocusMeta");
  riskAlertsTitle.textContent = getUiText("riskAlertsTitle");
  riskAlertsMeta.textContent = getUiText("riskAlertsMeta");
  sprintModeTitle.textContent = getUiText("sprintModeTitle");
  sprintModeMeta.textContent = getUiText("sprintModeMeta");
  resultLanguageTitle.textContent = getUiText("resultLanguageTitle");
  resultLanguageDescription.textContent = getUiText("resultLanguageDescription");
  updateLanguageToggleLabel();
  summaryCardTitle.textContent = getUiText("summaryCardTitle");
  formulasCardTitle.textContent = getUiText("formulasCardTitle");
  formulasCardMeta.textContent = getUiText("formulasCardMeta");
  importantSentencesCardTitle.textContent = getUiText("importantSentencesCardTitle");
  importantSentencesCardMeta.textContent = getUiText("importantSentencesCardMeta");
  importanceReasonsCardTitle.textContent = getUiText("importanceReasonsCardTitle");
  importanceReasonsCardMeta.textContent = getUiText("importanceReasonsCardMeta");
  generalNotesCardTitle.textContent = getUiText("generalNotesCardTitle");
  generalNotesCardMeta.textContent = getUiText("generalNotesCardMeta");
  possibleExamPointsCardTitle.textContent = getUiText("possibleExamPointsCardTitle");
  possibleExamPointsCardMeta.textContent = getUiText("possibleExamPointsCardMeta");
  keyTermsCardTitle.textContent = getUiText("keyTermsCardTitle");
  keyTermsCardMeta.textContent = getUiText("keyTermsCardMeta");
  englishExplainCardTitle.textContent = getUiText("englishExplainCardTitle");
  englishExplainCardMeta.textContent = getUiText("englishExplainCardMeta");
  questionsCardTitle.textContent = getUiText("questionsCardTitle");
  questionsCardMeta.textContent = getUiText("questionsCardMeta");
  mockExamCardTitle.textContent = getUiText("mockExamCardTitle");
  mockExamCardMeta.textContent = getUiText("mockExamCardMeta");
  journalCardTitle.textContent = getUiText("journalCardTitle");
  journalCardMeta.textContent = getUiText("journalCardMeta");
  tutorCardTitle.textContent = getUiText("tutorCardTitle");
  tutorCardMeta.textContent = getUiText("tutorCardMeta");
  tutorDescription.textContent = getUiText("tutorDescription");
  tutorInput.placeholder = getUiText("tutorInputPlaceholder");
  tutorAskButton.textContent = getUiText("tutorAskButton");
  tutorQuizButton.textContent = getUiText("tutorQuizButton");
  tutorAnswerButton.textContent = getUiText("tutorAnswerButton");
  tutorEmptyState.textContent = getUiText("tutorEmpty");
  historyTitle.textContent = getUiText("historyTitle");
  historyDescription.textContent = getUiText("historyDescription");
  historyToggleText.textContent = getUiText("historyToggleText");
}

function updateModeUI() {
  const modeConfig = getModeConfig();
  const activeLegacyMode = getLegacyModeFromSelectedNoteModes();
  const enhancement = enhancementConfigs[getSelectedEnhancement()] || enhancementConfigs.local;
  modeDescription.textContent = currentLanguage === "en"
    ? {
        exam: "Focus on key points and review questions for quick exam preparation.",
        report: "Emphasize topic organization and paragraph structure for presentations and reports.",
        simple: "Provide a lighter summary for quick browsing and initial understanding."
      }[activeLegacyMode] || modeConfig.description
    : modeConfig.description;
  if (analysisEnhancementDescription) {
    analysisEnhancementDescription.textContent = IS_STATIC_PAGES_MODE
      ? (currentLanguage === "en"
        ? "This GitHub Pages version runs in front-end mode by default. Advanced AI requires a separate backend deployment."
        : "這個 GitHub Pages 版本會預設使用前端可運作模式；進階 AI 需要另外部署後端。")
      : currentLanguage === "en"
      ? {
          local: "This mode uses local rules, keyword weighting, and the topic vocabulary library to organize the material without calling an external API.",
          "future-ai": "This mode sends the content to the backend and uses the OpenAI API for richer summaries, key points, terms, and practice. If the API is unavailable, Smart Rule Analysis is used automatically."
        }[getSelectedEnhancement()] || enhancement.description
      : enhancement.description;
  }
  modeBadge.textContent = currentLanguage === "en"
    ? `Current mode: ${localizeModeLabel(modeConfig.label)}`
    : `目前模式：${modeConfig.label}`;
  outputMeta.textContent = applyTemplate(getUiText("outputMetaIntro"), {
    mode: currentLanguage === "en" ? localizeModeLabel(modeConfig.label) : modeConfig.label,
    enhancement: currentLanguage === "en" ? localizeEnhancementLabel(enhancement.label) : enhancement.label
  });
  if (financeKnowledgeBase.length) {
    outputMeta.textContent += applyTemplate(getUiText("outputMetaKnowledge"), {
      glossaryCount: accountingGlossaryEntries.length,
      financeCount: financeKnowledgeBase.length
    });
  }
  if (journalEntryKnowledgeBase.length) {
    outputMeta.textContent += applyTemplate(getUiText("outputMetaJournal"), {
      journalCount: journalEntryKnowledgeBase.length
    });
  }
  if (lastSourceMeta?.fileName) {
    outputMeta.textContent += applyTemplate(getUiText("outputMetaSource"), {
      fileName: lastSourceMeta.fileName
    });
  }
  outputMeta.textContent += currentLanguage === "en"
    ? " Core analysis runs in the browser. PPTX, DOCX, PDF, and OCR support rely on front-end parsing libraries that may be loaded from CDN resources."
    : " 主要分析流程在瀏覽器端完成；PPTX、DOCX、PDF 與 OCR 支援則仰賴前端解析套件，首次使用時可能透過 CDN 載入。";
  updateNoteModeSummary();
}

function isContextMarkerSentence(sentence) {
  return /第\s*[0-9一二三四五六七八九十百]+\s*(頁|張|個|段|章|節|部分|單元|投影片|圖片)|投影片|頁面|章節|標題|附註|補充|備註|說明|例子|案例|圖表|步驟/.test(sentence);
}

function isWeakContextSentence(sentence) {
  return /第\s*[0-9一二三四五六七八九十百]+\s*(頁|張|個|段|章|節|部分|單元|投影片|圖片)|投影片|頁面|章節|標題|附註|補充|備註|圖表|步驟/.test(sentence)
    && !/因此|所以|結論|代表|指出|核心|主要|原因|影響|重點/.test(sentence);
}

function getContextSentenceScore(sentence) {
  if (isWeakContextSentence(sentence)) {
    return -2.8;
  }
  if (isContextMarkerSentence(sentence)) {
    return 0.4;
  }
  return 0;
}

function buildLanguageAnalysis(sentences, mode, modeConfig, questionBuilder, options = {}) {
  if (!sentences.length) {
    return null;
  }

  const text = normalizeText(sentences.join(" "));
  const rawText = normalizeAccountingRawText(normalizeText(options.rawText || text));
  if (!text) {
    return null;
  }

  const words = tokenize(text);
  const keywordScores = buildKeywordScores(words);
  const baseSummary = pickSummary(sentences, keywordScores, modeConfig) || sentences[0] || "";
  const highlights = buildHighlights(sentences, keywordScores, modeConfig);
  const directAccountingTerms = findAccountingTerms(rawText);
  const financeDetected = isFinanceContent(rawText, words);
  const fallbackAccountingTerms = financeDetected
    ? buildAccountingTermsFromReference(`${rawText}\n${baseSummary}\n${highlights.map((item) => item.fullText || item.text || item.core).join("\n")}`)
    : [];
  const accountingTerms = directAccountingTerms.length ? directAccountingTerms : fallbackAccountingTerms;
  const accountingTopic = detectAccountingTopic(accountingTerms, rawText);
  const summary = buildDetailedSummary(
    sentences,
    keywordScores,
    highlights,
    accountingTerms,
    accountingTopic,
    modeConfig,
    options.sourceSections || []
  ) || sentences[0];
  const keywords = pickTopKeywords(keywordScores, modeConfig.keywordCount, accountingTerms);
  const accountingContext = {
    terms: accountingTerms,
    topic: accountingTopic
  };
  const questionResult = questionBuilder(mode, keywords, highlights, summary, sentences, modeConfig, rawText, accountingContext);
  const importantSentences = buildImportantSentences(highlights, modeConfig, accountingContext);
  const generalNotes = buildGeneralNotes(sentences, highlights, modeConfig, accountingContext);
  const accountingTermList = buildAccountingTermList(accountingTerms, Math.max(8, modeConfig.keywordCount));
  const formulas = buildFormulaCards(accountingTerms, rawText);
  const possibleExamPoints = buildPossibleExamPoints(highlights, accountingTerms, accountingTopic);
  const englishExplanations = buildEnglishExplanationBlocks(rawText, accountingTerms);
  const importanceReasons = buildImportanceReasons(highlights, accountingTerms, accountingTopic);
  const mockExamQuestions = buildMockExamQuestions(mode, keywords, highlights, summary, sentences, modeConfig, rawText, accountingContext);

  return sanitizeFinalAnalysisOutput({
    summary: ensureSentenceEnding(replaceFinanceTermsWithBilingual(summary)),
    formulas,
    highlights,
    keywords,
    importantSentences,
    importanceReasons,
    possibleExamPoints,
    generalNotes,
    accountingTerms: accountingTermList,
    accountingTopic,
    matchedAccountingTerms: accountingTerms,
    englishExplanations,
    questions: questionResult.questions || [],
    mockExamQuestions,
    journalEntryQuestions: questionResult.journalEntryQuestions || []
  });
}

function buildAnalysisInputContext(text, mode, modeConfig) {
  const cleaned = cleanSourceContent(text, lastSourceMeta);
  const analysisText = cleaned.cleanedText || text;
  const financeDetected = isFinanceContent(analysisText, tokenize(analysisText));
  const rawSentences = splitSentences(text);
  const originalSentences = rawSentences
    .map((sentence) => normalizeStudySentence(sentence))
    .filter(Boolean)
    .filter((sentence) => {
      if (isLikelyMeaningfulSentence(sentence, lastSourceMeta)) {
        return true;
      }
      if (!financeDetected) {
        return false;
      }
      return findAccountingTerms(sentence).length > 0 || getJournalEntryMatches(sentence).length > 0;
    });
  const fallbackOriginalSentences = originalSentences.length ? originalSentences : splitSentences(analysisText);
  const chineseAnalysisSentences = fallbackOriginalSentences
    .map((sentence) => translateSentenceToChineseIfNeeded(sentence))
    .filter(Boolean);
  const fallbackChineseSentences = chineseAnalysisSentences.length ? chineseAnalysisSentences : fallbackOriginalSentences;

  return {
    mode,
    modeConfig,
    cleaned,
    analysisText,
    fallbackOriginalSentences,
    chineseAnalysisSentences,
    fallbackChineseSentences
  };
}

function buildAnalysisResult({ mode, enhancement, text, analysisText, cleaned, chinese, fallbackOriginalSentences, chineseAnalysisSentences, analysisSource = "local", knowledgeSupport = null }) {
  return {
    mode,
    modeLabel: getModeLabel(mode),
    analysisEnhancement: enhancement,
    analysisSource,
    chinese,
    fromEnglishTranslation: fallbackOriginalSentences.some((sentence, index) => chineseAnalysisSentences[index] && chineseAnalysisSentences[index] !== sentence),
    sourceMeta: lastSourceMeta ? { ...lastSourceMeta } : null,
    sourceSections: Array.isArray(lastSourceSections) ? lastSourceSections.map((section) => ({ ...section })) : [],
    sourceText: text,
    cleanedText: analysisText,
    knowledgeSupport,
    removedNoise: cleaned.removedNoise,
    highlights: chinese?.highlights || [],
    questions: chinese?.questions || [],
    journalEntryQuestions: chinese?.journalEntryQuestions || [],
    analyzedAt: new Date().toISOString()
  };
}

function buildLocalAnalysisResult(text, mode, modeConfig, enhancement, options = {}) {
  const originalText = options.originalText || text;
  const context = buildAnalysisInputContext(text, mode, modeConfig);
  const chinese = buildLanguageAnalysis(context.fallbackChineseSentences, mode, modeConfig, buildChineseQuestions, {
    rawText: text,
    sourceSections: lastSourceSections
  });

  return buildAnalysisResult({
    mode,
    enhancement,
    text: originalText,
    analysisText: context.analysisText,
    cleaned: context.cleaned,
    chinese,
    fallbackOriginalSentences: context.fallbackOriginalSentences,
    chineseAnalysisSentences: context.chineseAnalysisSentences,
    analysisSource: "local",
    knowledgeSupport: options.knowledgeSupport || null
  });
}

function buildAiImportanceReasons(items = []) {
  return items
    .filter((item) => Array.isArray(item.reasons) && item.reasons.length > 0)
    .map((item, index) => ({
      label: `重要句 ${index + 1}`,
      description: item.reasons.join("、")
    }));
}

function buildAiLanguageAnalysis(aiAnalysis = {}) {
  const importantSentences = (Array.isArray(aiAnalysis.importantSentences) ? aiAnalysis.importantSentences : [])
    .map((item) => ({
      text: item?.text || "",
      level: item?.level || "高",
      reasons: Array.isArray(item?.reasons) ? item.reasons.filter(Boolean) : []
    }))
    .filter((item) => item.text);

  const highlights = importantSentences.map((item, index) => ({
    text: item.text,
    fullText: item.text,
    level: item.level || (index < 3 ? "high" : "medium"),
    score: Math.max(100 - index * 8, 60)
  }));

  const accountingTerms = (Array.isArray(aiAnalysis.accountingTerms) ? aiAnalysis.accountingTerms : [])
    .map((item) => ({
      label: item?.label || "",
      description: item?.description || ""
    }))
    .filter((item) => item.label && item.description);

  const possibleExamPoints = (Array.isArray(aiAnalysis.possibleExamPoints) ? aiAnalysis.possibleExamPoints : [])
    .map((text) => ({ text }));

  const questions = (Array.isArray(aiAnalysis.questions) ? aiAnalysis.questions : [])
    .map((item) => ({
      question: item?.question || "",
      answer: item?.answer || ""
    }));

  const mockExamQuestions = (Array.isArray(aiAnalysis.mockExamQuestions) ? aiAnalysis.mockExamQuestions : [])
    .map((item) => ({
      question: item?.question || "",
      answer: item?.answer || ""
    }));

  return sanitizeFinalAnalysisOutput({
    summary: ensureSentenceEnding(aiAnalysis.summary || ""),
    formulas: [],
    highlights,
    keywords: accountingTerms.map((item) => item.label).filter(Boolean).slice(0, 8),
    importantSentences,
    importanceReasons: buildAiImportanceReasons(importantSentences),
    possibleExamPoints,
    generalNotes: [],
    accountingTerms,
    accountingTopic: "general",
    matchedAccountingTerms: [],
    englishExplanations: [],
    questions,
    mockExamQuestions,
    journalEntryQuestions: []
  });
}

async function analyzeWithOpenAI(text, mode, modeLabel, modeConfig, enhancement, options = {}) {
  const originalText = options.originalText || text;
  const knowledgeChunks = Array.isArray(options.knowledgeSupport?.chunks) ? options.knowledgeSupport.chunks : [];
  const context = buildAnalysisInputContext(text, mode, modeConfig);
  const languageInstruction = getLanguageInstruction();
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      mode,
      modeLabel,
      language: currentLanguage,
      languageInstruction,
      prompt: buildNotePrompt({ text, mode, originalText, knowledgeChunks })
    })
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok || !payload?.ok || !payload?.analysis) {
    throw new Error(payload?.error || "進階 AI 模式目前無法使用。");
  }

  const chinese = buildAiLanguageAnalysis(payload.analysis);
  return buildAnalysisResult({
    mode,
    enhancement,
    text: originalText,
    analysisText: context.analysisText,
    cleaned: context.cleaned,
    chinese,
    fallbackOriginalSentences: context.fallbackOriginalSentences,
    chineseAnalysisSentences: context.chineseAnalysisSentences,
    analysisSource: "openai",
    knowledgeSupport: options.knowledgeSupport || null
  });
}

function mergeSections(sections, imageTexts) {
  const textParts = [];
  sections.forEach((section) => {
    if (section.title && section.text) {
      textParts.push(`${section.title}：${section.text}`);
    } else if (section.text) {
      textParts.push(section.text);
    }
  });
  imageTexts.forEach((item) => {
    textParts.push(`${item.label}：${item.text}`);
  });
  return normalizeText(textParts.filter(Boolean).join("\n\n"));
}

function dedupeImageTexts(items) {
  const seen = new Set();
  return items.filter((item) => {
    const normalized = normalizeText(item.text);
    if (!normalized || seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    item.text = normalized;
    return true;
  });
}

async function ensureOcrWorker() {
  if (!ocrWorkerPromise) {
    ocrWorkerPromise = globalThis.Tesseract.createWorker("chi_tra+eng", 1, {
      logger: (message) => {
        if (message.status === "recognizing text") {
          const percent = 70 + message.progress * 25;
          setParseStatus("文字辨識中", `圖片文字辨識進度 ${(message.progress * 100).toFixed(0)}%`, percent, "圖片文字辨識");
        }
      }
    });
  }
  return ocrWorkerPromise;
}

async function extractImageText(imageSource, label) {
  const worker = await ensureOcrWorker();
  const { data } = await worker.recognize(imageSource);
  return {
    label,
    text: normalizeText(data.text || "")
  };
}

async function extractImageTextSafely(imageSource, label, options = {}) {
  try {
    return await extractImageText(imageSource, label);
  } catch (error) {
    console.warn(`OCR failed for ${label}:`, error);
    if (options.onErrorMessage) {
      setParseStatus(
        options.onErrorTitle || "圖片文字辨識略過",
        options.onErrorMessage,
        options.onErrorPercent ?? null,
        options.onErrorPhase || "圖片文字辨識"
      );
    }
    return {
      label,
      text: ""
    };
  }
}

async function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(typeof event.target?.result === "string" ? event.target.result : "");
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = 8 + (event.loaded / event.total) * 20;
        setParseStatus("讀取文字檔中", `正在讀取 ${file.name} 的內容`, percent, "讀取檔案");
      }
    };
    reader.onerror = reject;
    reader.readAsText(file, "utf-8");
  });
}

async function fileToArrayBuffer(file) {
  return file.arrayBuffer();
}

async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function extractPlainText(file) {
  setParseStatus("準備讀取文字檔", `正在載入 ${file.name}`, 5, "初始化");
  const rawText = normalizeText(await readFileAsText(file));
  setParseStatus("文字檔讀取完成", "已完成文字抽取，準備匯入內容", 92, "整理文字");
  return {
    rawText,
    sections: [{ title: file.name, text: rawText, paragraphNumber: 1 }],
    imageTexts: [],
    sourceMeta: {
      fileName: file.name,
      extension: getFileExtension(file.name),
      sectionCount: rawText ? 1 : 0,
      imageCount: 0
    }
  };
}

function parseXmlString(xmlString) {
  return new DOMParser().parseFromString(xmlString, "application/xml");
}

function collectNodeTexts(root, selector) {
  return [...root.querySelectorAll(selector)]
    .map((node) => node.textContent.trim())
    .filter(Boolean);
}

async function extractPptxText(file) {
  setParseStatus("初始化 PPTX 解析", `正在載入 ${file.name}`, 5, "初始化");
  const zip = await globalThis.JSZip.loadAsync(await fileToArrayBuffer(file));
  const slideNames = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));

  const sections = [];
  const imageTexts = [];

  for (let index = 0; index < slideNames.length; index += 1) {
    const slideName = slideNames[index];
    const basePercent = 12 + (index / Math.max(slideNames.length, 1)) * 38;
    setParseStatus("解析 PPTX 中", `正在讀取第 ${index + 1} 張投影片文字內容`, basePercent, "抽取投影片文字");
    const xmlString = await zip.file(slideName).async("string");
    const xmlDoc = parseXmlString(xmlString);
    const texts = collectNodeTexts(xmlDoc, "a\\:t, t");
    sections.push({
      title: `第 ${index + 1} 頁投影片`,
      text: texts.join("\n"),
      pageNumber: index + 1
    });

    const relPath = slideName.replace("ppt/slides/", "ppt/slides/_rels/") + ".rels";
    if (!zip.file(relPath)) {
      continue;
    }

    const relDoc = parseXmlString(await zip.file(relPath).async("string"));
    const imageTargets = [...relDoc.querySelectorAll("Relationship")]
      .map((node) => node.getAttribute("Target") || "")
      .filter((target) => target.includes("../media/"))
      .map((target) => `ppt/${target.replace("../", "")}`);

    for (let imageIndex = 0; imageIndex < imageTargets.length; imageIndex += 1) {
      const imagePath = imageTargets[imageIndex];
      const imageFile = zip.file(imagePath);
      if (!imageFile) {
        continue;
      }
      const ocrBase = 55 + (((index + imageIndex / Math.max(imageTargets.length, 1)) / Math.max(slideNames.length, 1)) * 30);
      setParseStatus("PPTX 圖片文字辨識中", `第 ${index + 1} 張投影片的第 ${imageIndex + 1} 張圖片辨識中`, ocrBase, "圖片文字辨識");
      const blob = await imageFile.async("blob");
      const ocrText = await extractImageTextSafely(await blobToDataUrl(blob), `第 ${index + 1} 張投影片附加圖片文字`, {
        onErrorTitle: "PPTX 圖片文字辨識略過",
        onErrorMessage: "圖片 OCR 暫時不可用，已保留投影片原本文字並略過該圖片辨識。",
        onErrorPercent: ocrBase,
        onErrorPhase: "圖片文字辨識"
      });
      if (ocrText.text) {
        imageTexts.push(ocrText);
      }
    }
  }

  const dedupedImageTexts = dedupeImageTexts(imageTexts);
  setParseStatus("PPTX 解析完成", "已完成投影片文字與圖片文字辨識內容匯整", 94, "整合內容");
  return {
    rawText: mergeSections(sections, dedupedImageTexts),
    sections,
    imageTexts: dedupedImageTexts,
    sourceMeta: {
      fileName: file.name,
      extension: "pptx",
      sectionCount: sections.length,
      imageCount: dedupedImageTexts.length
    }
  };
}

async function extractDocxText(file) {
  setParseStatus("解析 DOCX 中", "正在抽取段落、標題與表格文字", 12, "抽取文件文字");
  const arrayBuffer = await fileToArrayBuffer(file);
  const rawResult = await globalThis.mammoth.extractRawText({ arrayBuffer });
  const zip = await globalThis.JSZip.loadAsync(arrayBuffer);
  const sections = rawResult.value
    .split(/\n{2,}/)
    .map((part) => normalizeText(part))
    .filter(Boolean)
    .map((text, index) => ({
      title: `第 ${index + 1} 段內容`,
      text,
      paragraphNumber: index + 1
    }));

  const mediaFiles = Object.keys(zip.files)
    .filter((name) => name.startsWith("word/media/"))
    .sort();

  const imageTexts = [];
  for (let index = 0; index < mediaFiles.length; index += 1) {
    const percent = 58 + ((index / Math.max(mediaFiles.length, 1)) * 26);
    setParseStatus("DOCX 圖片文字辨識中", `第 ${index + 1} 張圖片辨識中`, percent, "圖片文字辨識");
    const blob = await zip.file(mediaFiles[index]).async("blob");
    const ocrText = await extractImageTextSafely(await blobToDataUrl(blob), `文件附加圖片 ${index + 1} 文字`, {
      onErrorTitle: "DOCX 圖片文字辨識略過",
      onErrorMessage: "圖片 OCR 暫時不可用，已保留文件原本文字並略過該圖片辨識。",
      onErrorPercent: percent,
      onErrorPhase: "圖片文字辨識"
    });
    if (ocrText.text) {
      imageTexts.push(ocrText);
    }
  }

  const dedupedImageTexts = dedupeImageTexts(imageTexts);
  setParseStatus("DOCX 解析完成", "已完成段落、表格與圖片文字辨識內容匯整", 94, "整合內容");
  return {
    rawText: mergeSections(sections, dedupedImageTexts),
    sections,
    imageTexts: dedupedImageTexts,
    sourceMeta: {
      fileName: file.name,
      extension: "docx",
      sectionCount: sections.length,
      imageCount: dedupedImageTexts.length
    }
  };
}

async function renderPdfPageToCanvas(page, scale = 1.4) {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("無法建立 PDF 頁面畫布");
  }
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas;
}

async function extractPdfText(file, options = {}) {
  if (!pdfjsLib) {
    throw new Error("PDF 解析器尚未載入");
  }
  setParseStatus("解析 PDF 中", "正在讀取每一頁的文字層", 10, "讀取 PDF");
  const typedArray = new Uint8Array(await fileToArrayBuffer(file));
  const pdf = await pdfjsLib.getDocument({
    data: typedArray,
    disableWorker: true
  }).promise;
  const sections = [];
  const imageTexts = [];
  const requestedStart = options.startPage || 1;
  const requestedEnd = options.endPage || pdf.numPages;
  const startPage = Math.max(1, Math.min(pdf.numPages, requestedStart));
  const endPage = Math.max(startPage, Math.min(pdf.numPages, requestedEnd));

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const pageOffset = pageNumber - startPage;
    const totalPages = Math.max(endPage - startPage + 1, 1);
    const textPercent = 15 + (pageOffset / totalPages) * 25;
    let pageText = "";
    try {
      const textContent = await page.getTextContent();
      pageText = textContent.items
        .map((item) => (typeof item?.str === "string" ? item.str : ""))
        .join(" ");
    } catch (error) {
      console.warn(`PDF text-layer extraction failed on page ${pageNumber}:`, error);
    }
    const normalizedPageText = normalizeText(pageText);
    sections.push({
      title: `PDF 第 ${pageNumber} 頁`,
      text: normalizedPageText,
      pageNumber
    });

    setParseStatus("PDF 文字抽取中", `已完成第 ${pageNumber} 頁文字層讀取`, textPercent, "抽取頁面文字");
    const shouldAttemptOcr = normalizedPageText.length < 20;
    if (shouldAttemptOcr) {
      const ocrPercent = 48 + (pageOffset / totalPages) * 34;
      setParseStatus("PDF 圖片文字辨識中", `正在辨識第 ${pageNumber} 頁影像中的文字`, ocrPercent, "圖片文字辨識");
      try {
        const canvas = await renderPdfPageToCanvas(page);
        const ocrText = await extractImageTextSafely(canvas, `PDF 第 ${pageNumber} 頁附加圖片文字`, {
          onErrorTitle: "PDF 圖片文字辨識略過",
          onErrorMessage: `第 ${pageNumber} 頁 OCR 暫時不可用，已保留該頁原本文字層內容。`,
          onErrorPercent: ocrPercent,
          onErrorPhase: "圖片文字辨識"
        });
        if (ocrText.text) {
          imageTexts.push(ocrText);
        }
      } catch (error) {
        console.warn(`PDF page render failed on page ${pageNumber}:`, error);
      }
    }
  }

  const dedupedImageTexts = dedupeImageTexts(imageTexts);
  const hasMeaningfulText = sections.some((section) => normalizeText(section.text || "").length > 0) || dedupedImageTexts.length > 0;
  if (!hasMeaningfulText) {
    throw new Error("PDF 已載入，但暫時無法抽取文字內容。若這是掃描型 PDF，請稍後再試，或改用可選取文字的 PDF。");
  }
  setParseStatus("PDF 解析完成", "已完成各頁文字與圖片文字辨識內容匯整", 94, "整合內容");
  return {
    rawText: mergeSections(sections, dedupedImageTexts),
    sections,
    imageTexts: dedupedImageTexts,
    sourceMeta: {
      fileName: file.name,
      extension: "pdf",
      pageRange: { startPage, endPage, totalPages: pdf.numPages },
      sectionCount: sections.length,
      imageCount: dedupedImageTexts.length
    }
  };
}

async function extractFileContent(file, options = {}) {
  const extension = getFileExtension(file.name);
  if (legacyExtensions.has(extension)) {
    throw new Error(`舊版 ${extension.toUpperCase()} 檔不支援直接解析，請先轉成 ${extension === "ppt" ? "PPTX" : "DOCX"}。`);
  }
  if (directTextExtensions.has(extension) || file.type.startsWith("text/") || file.type === "application/json") {
    return extractPlainText(file);
  }
  if (extension === "pptx") {
    return extractPptxText(file);
  }
  if (extension === "docx") {
    return extractDocxText(file);
  }
  if (extension === "pdf") {
    return extractPdfText(file, options.pdfPageRange || {});
  }
  throw new Error("目前不支援這個檔案格式的內容解析。");
}

function mergeParsedFileResults(results, files) {
  const sections = results.flatMap((result) => result.sections || []);
  const imageTexts = dedupeImageTexts(results.flatMap((result) => result.imageTexts || []));
  const filesMeta = results.map((result, index) => ({
    name: result.sourceMeta?.fileName || files[index]?.name || "",
    extension: result.sourceMeta?.extension || getFileExtension(files[index]?.name || ""),
    sectionCount: result.sourceMeta?.sectionCount || 0,
    imageCount: result.sourceMeta?.imageCount || 0,
    pageRange: result.sourceMeta?.pageRange || null
  }));

  return {
    rawText: mergeSections(sections, imageTexts),
    sections,
    imageTexts,
    sourceMeta: {
      fileName: files.length === 1 ? (files[0]?.name || "") : `${files.length} 份檔案`,
      extension: files.length === 1 ? getFileExtension(files[0]?.name || "") : "multi",
      sectionCount: sections.length,
      imageCount: imageTexts.length,
      files: filesMeta
    }
  };
}

function setStructuredTextResult(result) {
  sourceText.value = result.rawText;
  lastSourceMeta = result.sourceMeta;
  lastSourceSections = Array.isArray(result.sections) ? result.sections.map((section) => ({ ...section })) : [];
  currentAnalysisResult = null;
  resetStudyPlanView();
  setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
  renderCurrentResult();
  updateCounts();
  updateModeUI();
  const fileCount = Array.isArray(result.sourceMeta.files) ? result.sourceMeta.files.length : 1;
  fileStatus.textContent = currentLanguage === "en"
    ? `Parsed: ${result.sourceMeta.fileName} (${fileCount} file${fileCount > 1 ? "s" : ""})`
    : `已完成解析：${result.sourceMeta.fileName}（共 ${fileCount} 份檔案）`;
  uploadHelp.textContent = currentLanguage === "en"
    ? `Extracted ${result.sourceMeta.sectionCount} content sections and ${result.sourceMeta.imageCount} OCR text blocks. Review the preview below before organizing.`
    : `已抽取 ${result.sourceMeta.sectionCount} 個內容區塊，並擷取 ${result.sourceMeta.imageCount} 筆圖片文字辨識內容；可先查看下方預覽再開始整理。`;
  setParseStatus(
    "文件解析完成",
    `已匯入 ${result.sourceMeta.fileName} 的完整文字內容，可直接開始整理或再補充修改文字。`,
    100,
    "完成"
  );
  updateUploadDiagnostics({
    badge: currentLanguage === "en" ? "Ready" : "完成",
    fileCount,
    sectionCount: result.sourceMeta.sectionCount || 0,
    ocrStatus: result.sourceMeta.imageCount
      ? (currentLanguage === "en" ? `Done (${result.sourceMeta.imageCount})` : `已完成（${result.sourceMeta.imageCount}）`)
      : (currentLanguage === "en" ? "Skipped or not needed" : "略過或不需要"),
    message: currentLanguage === "en"
      ? "Parsing finished. Review the imported sections below before generating your study note."
      : "解析完成。開始整理前，可以先查看下方匯入的內容區塊。"
  });
  setProcessStateText("已完成文件匯入");
  renderUploadPreview(result);
  refreshKnowledgeAssistPreviewFromCurrentInput();
}

async function handleFileUpload(files) {
  const fileList = Array.isArray(files) ? files : [files];
  if (!fileList.length) {
    return;
  }
  currentOpenedNotePayload = null;
  const pdfPageRange = getPdfPageRangeOptions();
  setBusyState(true);
  currentUploadedFiles = fileList.map((file) => ({
    name: file.name,
    size: file.size
  }));
  renderSelectedFiles(currentUploadedFiles);
  updateUploadDiagnostics({
    badge: currentLanguage === "en" ? "Queued" : "已加入",
    fileCount: fileList.length,
    sectionCount: 0,
    ocrStatus: currentLanguage === "en" ? "Waiting" : "等待中",
    message: currentLanguage === "en"
      ? "Files have been selected. SmartStudy AI is preparing parsing and OCR when needed."
      : "檔案已加入，SmartStudy AI 正在準備解析，必要時會啟動 OCR。"
  });
  fileStatus.textContent = currentLanguage === "en"
    ? `Processing ${fileList.length} file(s)...`
    : `正在處理 ${fileList.length} 份檔案…`;
  setProcessStateText("解析中");
  setParseStatus("開始處理檔案", `已選擇 ${fileList.length} 份檔案，準備初始化解析流程`, 2, "初始化");
  try {
    const parsedResults = [];
    for (let index = 0; index < fileList.length; index += 1) {
      if (index > 0) {
        await yieldToBrowser();
      }
      const file = fileList[index];
      setParseStatus(
        currentLanguage === "en" ? "Preparing file parsing" : "開始處理檔案",
        currentLanguage === "en"
          ? `Processing file ${index + 1} of ${fileList.length}: ${file.name}`
          : `正在處理第 ${index + 1} / ${fileList.length} 份檔案：${file.name}`,
        Math.min(10, 2 + index),
        currentLanguage === "en" ? "Initialize" : "初始化"
      );
      const result = await extractFileContent(file, { pdfPageRange });
      parsedResults.push(result);
      await yieldToBrowser();
    }
    const mergedResult = mergeParsedFileResults(parsedResults, fileList);
    setStructuredTextResult(mergedResult);
  } catch (error) {
    lastSourceMeta = null;
    lastSourceSections = [];
    currentUploadedFiles = [];
    const firstFile = fileList[0];
    const extension = getFileExtension(firstFile?.name || "");
    const detail = extension === "pdf" && /PDF 解析器尚未載入|setting up fake worker failed|Failed to fetch dynamically imported module|worker/i.test(String(error?.message || ""))
      ? "PDF 解析器載入失敗。若你是直接用 file:// 開啟頁面，請改用本機伺服器開啟，或重新整理後再試一次。"
      : error.message;
    fileStatus.textContent = currentLanguage === "en"
      ? `Unable to parse ${firstFile?.name || "selected file"}`
      : `無法解析：${firstFile?.name || "已選檔案"}`;
    uploadHelp.textContent = detail;
    setParseStatus("解析失敗", detail, 100, "失敗");
    updateUploadDiagnostics({
      badge: currentLanguage === "en" ? "Failed" : "失敗",
      fileCount: fileList.length,
      sectionCount: 0,
      ocrStatus: currentLanguage === "en" ? "Stopped" : "已中止",
      message: detail
    });
    setProcessStateText(legacyExtensions.has(extension) ? "舊格式需轉檔" : "解析失敗");
    resetUploadPreview();
  } finally {
    setBusyState(false);
  }
}

async function handleGenerateNotes() {
  const text = normalizeText(sourceText.value);
  const selectedLanguage = outputLanguage?.value || currentLanguage || "zh";

  if (!text) {
    alert(selectedLanguage === "en"
      ? "Please paste your notes first, or upload a file that can be organized."
      : "請先貼上筆記內容，或上傳可整理的檔案。");
    return null;
  }

  setLanguage(selectedLanguage);
  updateNoteModeSummary();

  if (notesResultStatus) {
    notesResultStatus.textContent = selectedLanguage === "en"
      ? "AI is organizing your notes. Please wait..."
      : "AI 正在整理中，請稍候...";
  }

  const result = await analyzeText();
  if (!result) {
    if (notesResultStatus) {
      notesResultStatus.textContent = selectedLanguage === "en"
        ? "Organization failed. Please check the content and try again."
        : "整理失敗，請確認內容或稍後再試。";
    }
    return null;
  }

  const normalizedResult = normalizeNoteResult(result);
  renderNotesResult(normalizedResult);
  saveGeneratedNote(normalizedResult);
  showToast(
    selectedLanguage === "en" ? "Notes organized" : "筆記整理完成",
    selectedLanguage === "en"
      ? "You can review the result on the right, ask AI Tutor, or save it for later."
      : "你現在可以查看右側結果、拿去問 AI Tutor，或之後到我的筆記重新開啟。",
    "success"
  );
  return result;
}

async function analyzeText(options = {}) {
  const { saveToHistory = true } = options;
  const text = normalizeAccountingRawText(normalizeText(sourceText.value));
  const mode = getLegacyModeFromSelectedNoteModes();
  const modeConfig = getModeConfig();
  const enhancement = getSelectedEnhancement();
  const analysisMode = analysisEnhancement?.value || "local";

  if (!text) {
    setProcessStateText("請先輸入內容");
    currentAnalysisResult = null;
    renderCurrentResult();
    return null;
  }

  const knowledgeSupport = buildNoteAnalysisSupport(text);
  updateKnowledgeAssistStatus(knowledgeSupport.matchedChunks);
  const analysisText = knowledgeSupport.analysisText;

  let result = null;
  let usedFallback = false;

  if (analysisMode === "future-ai") {
    setBusyState(true);
    setProcessStateText(currentLanguage === "en" ? "Advanced AI analysis in progress" : "進階 AI 分析中");
    try {
      result = await analyzeWithOpenAI(analysisText, mode, getModeLabel(mode), modeConfig, enhancement, {
        originalText: text,
        knowledgeSupport: {
          enabled: knowledgeSupport.shouldUseKnowledge,
          chunks: knowledgeSupport.matchedChunks.map((chunk) => ({
            fileName: chunk.fileName || "",
            sectionTitle: chunk.sectionTitle || "",
            content: normalizeText(chunk.content || chunk.text || "")
          }))
        }
      });
    } catch (error) {
      console.error("Advanced AI analysis failed, falling back to Smart Rule Analysis.", error);
      usedFallback = true;
      result = buildLocalAnalysisResult(analysisText, mode, modeConfig, enhancement, {
        originalText: text,
        knowledgeSupport: {
          enabled: knowledgeSupport.shouldUseKnowledge,
          chunks: knowledgeSupport.matchedChunks.map((chunk) => ({
            fileName: chunk.fileName || "",
            sectionTitle: chunk.sectionTitle || "",
            content: normalizeText(chunk.content || chunk.text || "")
          }))
        }
      });
    } finally {
      setBusyState(false);
    }
  } else {
    result = buildLocalAnalysisResult(analysisText, mode, modeConfig, enhancement, {
      originalText: text,
      knowledgeSupport: {
        enabled: knowledgeSupport.shouldUseKnowledge,
        chunks: knowledgeSupport.matchedChunks.map((chunk) => ({
          fileName: chunk.fileName || "",
          sectionTitle: chunk.sectionTitle || "",
          content: normalizeText(chunk.content || chunk.text || "")
        }))
      }
    });
  }

  currentAnalysisResult = result;
  saveLatestAnalysis(result);
  renderCurrentResult(result);
  if (saveToHistory) {
    saveHistoryEntry(result);
  }

  if (analysisMode === "future-ai" && usedFallback) {
    processState.textContent = currentLanguage === "en"
      ? "OpenAI is currently unavailable. This run used Smart Rule Analysis instead."
      : "OpenAI 目前無法使用，本次已自動改用智慧規則分析。";
  } else if (analysisMode === "future-ai") {
    processState.textContent = currentLanguage === "en"
      ? "Advanced AI analysis completed"
      : "進階 AI 整理完成";
  } else {
    setProcessStateText(currentLanguage === "en" ? `${localizeModeLabel(result.modeLabel)} ready` : `${result.modeLabel}整理完成`);
  }
  return result;
}

async function refreshQuestions() {
  if (!currentAnalysisResult && !normalizeText(sourceText.value)) {
    setProcessStateText("請先整理筆記");
    return null;
  }

  questionRefreshCounter += 1;
  const refreshed = await analyzeText({ saveToHistory: false });
  if (refreshed) {
    setProcessStateText("題目已更新");
  }
  return refreshed;
}

async function copyResult() {
  const result = currentAnalysisResult;
  if (!result) {
    setProcessStateText("請先整理筆記");
    return;
  }
  const exportText = formatExportText(result);
  try {
    await navigator.clipboard.writeText(exportText);
    setProcessStateText("已複製結果");
  } catch (error) {
    const fallbackArea = document.createElement("textarea");
    fallbackArea.value = exportText;
    document.body.appendChild(fallbackArea);
    fallbackArea.select();
    try {
      document.execCommand("copy");
      setProcessStateText("已複製結果");
    } catch (fallbackError) {
      setProcessStateText("複製失敗");
      alert(currentLanguage === "en"
        ? "This browser could not copy directly. Please use the download option instead."
        : "目前瀏覽器無法直接複製，請改用下載功能。");
    }
    document.body.removeChild(fallbackArea);
  }
}

function downloadResult() {
  const result = currentAnalysisResult;
  if (!result) {
    setProcessStateText("請先整理筆記");
    return;
  }
  const blob = new Blob([formatHtmlExport(result)], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `smartstudy-${result.mode}-${date}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setProcessStateText("已下載筆記");
}

function toggleResultLanguage() {
  const nextLanguage = getCurrentLanguage() === "zh" ? "en" : "zh";
  setLanguage(nextLanguage);

  if (currentAnalysisResult && typeof renderLastResult === "function") {
    renderLastResult();
  } else if (currentAnalysisResult) {
    renderCurrentResult(currentAnalysisResult);
  }

  processState.textContent = currentLanguage === "en" ? "Display language switched" : "顯示語言已切換";
}

chooseFileButton.addEventListener("click", (event) => {
  event.preventDefault();
  openFilePicker();
});

function openFilePicker() {
  if (isParsingFile) {
    return;
  }
  fileInput.value = "";
  if (typeof fileInput.showPicker === "function") {
    fileInput.showPicker();
    return;
  }
  fileInput.click();
}

fileInput.addEventListener("change", () => {
  const files = [...(fileInput.files || [])];
  if (!files.length) {
    fileStatus.textContent = currentLanguage === "en" ? "No file selected" : "尚未選擇檔案";
    restoreUploadHelp();
    return;
  }
  handleFileUpload(files);
});

uploadDropzone?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest("button")) {
    return;
  }
  openFilePicker();
});

uploadDropzone?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openFilePicker();
  }
});

["dragenter", "dragover"].forEach((eventName) => {
  uploadDropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    if (!isParsingFile) {
      uploadDropzone.classList.add("is-drag-over");
    }
  });
});

["dragleave", "dragend", "drop"].forEach((eventName) => {
  uploadDropzone?.addEventListener(eventName, () => {
    uploadDropzone.classList.remove("is-drag-over");
  });
});

uploadDropzone?.addEventListener("drop", (event) => {
  event.preventDefault();
  if (isParsingFile) {
    return;
  }
  const files = [...(event.dataTransfer?.files || [])];
  if (!files.length) {
    return;
  }
  handleFileUpload(files);
});

chooseKnowledgeFilesButton?.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isKnowledgeIndexing && !isKnowledgeQuerying) {
    knowledgeFileInput.value = "";
    if (typeof knowledgeFileInput.showPicker === "function") {
      knowledgeFileInput.showPicker();
      return;
    }
    knowledgeFileInput.click();
  }
});

knowledgeFileInput?.addEventListener("change", () => {
  ragSelectedFiles = [...(knowledgeFileInput.files || [])];
  selectedKnowledgeFiles = [...ragSelectedFiles];
  updateKnowledgeSelectionUI();
});

const debouncedRefreshKnowledgeAssistPreview = debounce(() => {
  refreshKnowledgeAssistPreviewFromCurrentInput();
}, 180);

const debouncedUpdateKnowledgeResults = debounce(() => {
  updateKnowledgeResults();
}, 180);

const debouncedRenderMyNotes = debounce(() => {
  renderMyNotes();
}, 180);

ragQuickQuestions?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-question]");
  if (!button || !ragQuestionInput) {
    return;
  }
  ragQuestionInput.value = button.dataset.question || "";
  ragQuestionInput.focus();
});

  sourceText.addEventListener("input", () => {
  if (!isParsingFile) {
    currentOpenedNotePayload = null;
    lastSourceMeta = null;
    lastSourceSections = [];
    currentAnalysisResult = null;
    resetStudyPlanView();
    setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
    renderCurrentResult();
    updateModeUI();
  }
  updateCounts();
  debouncedRefreshKnowledgeAssistPreview();
});

analyzeButton.addEventListener("click", handleGenerateNotes);

clearButton.addEventListener("click", () => {
  sourceText.value = "";
  fileInput.value = "";
  currentUploadedFiles = [];
  currentOpenedNotePayload = null;
  lastSourceMeta = null;
  lastSourceSections = [];
  currentAnalysisResult = null;
  resetStudyPlanView();
  setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
  fileStatus.textContent = currentLanguage === "en" ? "No file selected" : "尚未選擇檔案";
  restoreUploadHelp();
  setProcessStateText("已清空");
  renderCurrentResult();
  updateCounts();
  updateModeUI();
  resetUploadPreview();
  refreshKnowledgeAssistPreviewFromCurrentInput();
});

useKnowledgeBaseCheckbox?.addEventListener("change", () => {
  refreshKnowledgeAssistPreviewFromCurrentInput();
});

knowledgeAssistPreviewToggle?.addEventListener("click", () => {
  const isHidden = knowledgeAssistPreviewBody.classList.contains("hidden");
  knowledgeAssistPreviewBody.classList.toggle("hidden", !isHidden);
  knowledgeAssistPreviewIcon.textContent = isHidden ? "−" : "＋";
});

demoButton.addEventListener("click", () => {
  sourceText.value = demoText;
  currentUploadedFiles = [];
  currentOpenedNotePayload = null;
  fileStatus.textContent = currentLanguage === "en" ? "Demo content loaded" : "已載入示範內容";
  uploadHelp.textContent = currentLanguage === "en"
    ? "The demo text is loaded. You can also upload TXT, PPTX, DOCX, or PDF files."
    : "目前使用示範文字內容，你也可以改上傳 TXT、PPTX、DOCX 或 PDF。";
  lastSourceMeta = null;
  lastSourceSections = [];
  resetStudyPlanView();
  setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
  setProcessStateText("示範內容已載入");
  resetUploadPreview();
  setParseStatus(
    currentLanguage === "en" ? "Demo text loaded" : "示範文字已載入",
    currentLanguage === "en"
      ? "This content comes from the built-in demo data and does not include file parsing or image OCR."
      : "這份內容來自內建示範資料，不包含文件解析或圖片文字辨識。"
  );
  updateCounts();
  updateModeUI();
  analyzeText();
});

modeSelect.addEventListener("change", () => {
  syncVisibleNoteModeFromLegacyMode();
  updateModeUI();
  setProcessStateText("整理模式已切換");
});

analysisEnhancement?.addEventListener("change", () => {
  persistEnhancementPreference();
  updateModeUI();
  setProcessStateText("分析方式已切換");
});

ragModeSelect?.addEventListener("change", () => {
  persistRagModePreference();
  updateRagModeUI();
  refreshKnowledgeBaseStatus();
});

copyButton.addEventListener("click", copyResult);
refreshQuestionsButton?.addEventListener("click", refreshQuestions);
tutorAskButton?.addEventListener("click", handleTutorAsk);
tutorQuizButton?.addEventListener("click", handleTutorQuiz);
tutorAnswerButton?.addEventListener("click", handleTutorAnswer);
sendTutorMessage?.addEventListener("click", handleSendTutorMessage);
chooseTutorSourceBtn?.addEventListener("click", () => {
  chooseLatestNoteAsTutorSource();
});
clearTutorSourceBtn?.addEventListener("click", () => {
  setTutorSource(null);
});
sendSummaryToTutorBtn?.addEventListener("click", () => {
  sendOverviewToTutor("summary");
});
sendKeyPointToTutorBtn?.addEventListener("click", () => {
  sendOverviewToTutor("keyPoint");
});
refreshQuestionsBtn?.addEventListener("click", () => {
  if (!currentTutorSource) {
    renderRecommendedQuestions([]);
    return;
  }

  generateAndRenderRecommendedQuestions();
});
knowledgeSearchBtn?.addEventListener("click", updateKnowledgeResults);
knowledgeSearchInput?.addEventListener("input", debouncedUpdateKnowledgeResults);
[
  knowledgeSubjectFilter,
  knowledgeChapterFilter,
  knowledgeTagFilter,
  knowledgeTypeFilter
].forEach((element) => {
  element?.addEventListener("change", updateKnowledgeResults);
});
resetKnowledgeFiltersBtn?.addEventListener("click", () => {
  if (knowledgeSearchInput) knowledgeSearchInput.value = "";
  if (knowledgeSubjectFilter) knowledgeSubjectFilter.value = "all";
  if (knowledgeChapterFilter) knowledgeChapterFilter.value = "all";
  if (knowledgeTagFilter) knowledgeTagFilter.value = "all";
  if (knowledgeTypeFilter) knowledgeTypeFilter.value = "all";
  updateKnowledgeResults();
});
knowledgePreviewTutorBtn?.addEventListener("click", () => {
  const item = getCurrentKnowledgePreviewItem();
  if (!item) return;
  askTutorWithSource(
    item.sourceNote,
    currentLanguage === "en"
      ? `Please explain the key idea of "${item.title}".`
      : `請解釋「${item.title}」的重點`
  );
});
knowledgePreviewTaskBtn?.addEventListener("click", () => {
  const item = getCurrentKnowledgePreviewItem();
  if (!item) return;
  addKnowledgeItemToTodayTasks(item);
});
knowledgePreviewExportBtn?.addEventListener("click", () => {
  const item = getCurrentKnowledgePreviewItem();
  if (!item) return;
  openExportModal({
    source: "knowledge",
    payload: item
  });
});
generateStudyPlanBtn?.addEventListener("click", handleGenerateStudyPlan);
clearPlannerFormBtn?.addEventListener("click", clearPlannerForm);
buildKnowledgeBaseButton?.addEventListener("click", buildKnowledgeBase);
askKnowledgeBaseButton?.addEventListener("click", askKnowledgeBase);
clearKnowledgeBaseButton?.addEventListener("click", clearFrontendKnowledgeBase);
seedKnowledgeBaseButton?.addEventListener("click", reloadSeedKnowledgeBase);
addLatestNoteToKnowledgeButton?.addEventListener("click", addLatestNoteToKnowledgeBase);
sendRagToTutorButton?.addEventListener("click", sendRagToTutor);
sendRagToStudyAgentButton?.addEventListener("click", sendRagToStudyAgent);
makeRagExamFocusButton?.addEventListener("click", renderRagExamFocus);
generateStudyPlanButton?.addEventListener("click", generateStudyPlan);
[
  myNotesSearch,
  myNotesSubjectFilter,
  myNotesSort,
  myNotesTypeFilter
].forEach((element) => {
  element?.addEventListener("input", debouncedRenderMyNotes);
  element?.addEventListener("change", renderMyNotes);
});
closeExportModalButton?.addEventListener("click", closeExportModal);
cancelExportBtn?.addEventListener("click", closeExportModal);
exportModalBackdrop?.addEventListener("click", closeExportModal);
openGuideModalButton?.addEventListener("click", openGuideModal);
closeGuideModalButton?.addEventListener("click", closeGuideModal);
guideModalCloseAction?.addEventListener("click", closeGuideModal);
guideModalBackdrop?.addEventListener("click", closeGuideModal);
guideModalGoNotes?.addEventListener("click", closeGuideModal);
startExportBtn?.addEventListener("click", startExport);
exportFormat?.addEventListener("change", () => {
  if (exportFormat.value === "pptx" && exportTemplate) {
    exportTemplate.value = "autoPresentation";
  }
  updateExportPreview();
});
exportTemplate?.addEventListener("change", updateExportPreview);
document.querySelectorAll(".export-content-check").forEach((checkbox) => {
  checkbox.addEventListener("change", updateExportPreview);
});
if (outputLanguage) {
  outputLanguage.addEventListener("change", () => {
    setLanguage(outputLanguage.value);
    if (currentAnalysisResult) {
      renderCurrentResult(currentAnalysisResult);
    }
  });
}
if (tutorInput) {
  tutorInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendTutorMessage();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      if (tutorPendingQuestion?.question) {
        handleTutorAnswer();
      } else {
        handleTutorAsk();
      }
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !exportModal.classList.contains("hidden")) {
    closeExportModal();
  }
  if (event.key === "Escape" && !guideModal.classList.contains("hidden")) {
    closeGuideModal();
  }
});

function initNotesPage() {
  document.querySelectorAll(".strategy-btn").forEach((btn) => {
    if (btn.dataset.strategyBound === "true") {
      return;
    }
    btn.dataset.strategyBound = "true";
    btn.addEventListener("click", () => {
      applyNoteStrategy(btn.dataset.strategy);
      setProcessStateText(currentLanguage === "en" ? "Learning strategy switched" : "學習策略已切換");
    });
  });

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    if (btn.dataset.modeBound === "true") {
      return;
    }
    btn.dataset.modeBound = "true";
    btn.addEventListener("click", () => {
      setNoteMode(btn.dataset.mode);
      setProcessStateText(currentLanguage === "en" ? "Organization mode switched" : "整理模式已切換");
    });
  });

  document.querySelectorAll(".result-accordion .accordion-header").forEach((header) => {
    if (header.dataset.accordionBound === "true") {
      return;
    }
    header.dataset.accordionBound = "true";
    header.addEventListener("click", () => {
      const accordion = header.closest(".result-accordion");
      if (accordion) {
        toggleAccordion(accordion);
      }
    });
  });

  if (outputLanguage) {
    outputLanguage.value = currentLanguage;
  }

  syncVisibleNoteModeFromLegacyMode();
  syncNotesAccordionResult(currentAnalysisResult);
  bindExportTriggers();
}

function initTutorWorkspace() {
  document.querySelectorAll(".tutor-mode-btn").forEach((button) => {
    if (button.dataset.tutorModeBound === "true") {
      return;
    }
    button.dataset.tutorModeBound = "true";
    button.addEventListener("click", () => {
      currentTutorMode = tutorModeConfigs[button.dataset.tutorMode] ? button.dataset.tutorMode : "quickExplain";
      updateTutorModeUI();
      setProcessStateText(currentLanguage === "en" ? "Tutor mode switched" : "Tutor 模式已切換");
    });
  });

  updateTutorModeUI();

  if (!currentTutorSource) {
    currentTutorSource = loadFromStorage(STORAGE_KEYS.tutorSource, null);
  }
  updateTutorSourceUI();
}

function initKnowledgeWorkspace() {
  syncKnowledgeChapterFilterOptions();
  updateKnowledgeResults();
}

function initPlannerWorkspace() {
  populatePlannerNoteSelect();
  renderStudyPlanner();
  renderHomeTasks();
  initPlannerDragAndDrop();
}

function initMyNotesWorkspace() {
  renderMyNotes();
}

function initExportModal() {
  bindExportTriggers();
  updateExportPreview();
}

function initHomeGuide() {
  if (guideModalCloseAction?.dataset.page) {
    guideModalCloseAction.removeAttribute("data-page");
  }
}

function initApp() {
  syncPagesCompatibleOptions();
  ensureSeedKnowledgeBase();
  restoreEnhancementPreference();
  resetNotesPageStateOnLoad();
  updateKnowledgeSelectionUI();
  setKnowledgeBusyState(false);
  renderRagSources([]);
  refreshKnowledgeBaseStatus();
  resetStudyPlanView();
  setStudyAgentBusyState(false);
  initBrandIntro();

  initThemeToggle();
  initLanguageToggle();
  initNavigation();
  initNotesPage();
  initTutorWorkspace();
  initKnowledgeWorkspace();
  initPlannerWorkspace();
  initMyNotesWorkspace();
  initExportModal();
  initHomeGuide();
  initFocusMusicPlayer();

  renderCurrentResult();
  renderHistory();
  ragAnswerResult.textContent = getUiText("ragAnswerEmpty");
  setKnowledgeStatus(getUiText("knowledgeStatusTitle"), getUiText("knowledgeStatusDetail"));
  setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));

  initTutorPage();
  initKnowledgePage();
  initStudyAgentPage();
  switchPage("home");
}
if (resultLanguageTag) {
  resultLanguageTag.addEventListener("click", toggleResultLanguage);
}

if (typeof window !== "undefined") {
  window.askTutorWithSource = askTutorWithSource;
  window.openNoteInTutor = openNoteInTutor;
  window.setTutorSource = setTutorSource;
}

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-history-id]");
  if (!button) {
    return;
  }

  const history = loadHistory();
  const entry = history.find((item) => item.id === button.dataset.historyId);
  if (!entry) {
    return;
  }

  if (button.dataset.action === "restore") {
    sourceText.value = entry.sourceText || "";
    modeSelect.value = entry.mode || "exam";
    if (entry.result?.analysisEnhancement && enhancementConfigs[entry.result.analysisEnhancement] && analysisEnhancement) {
      analysisEnhancement.value = entry.result.analysisEnhancement;
    }
    lastSourceMeta = entry.sourceMeta || null;
    lastSourceSections = Array.isArray(entry.result?.sourceSections) ? entry.result.sourceSections.map((section) => ({ ...section })) : [];
    currentOpenedNotePayload = null;
    currentAnalysisResult = entry.result || null;
    saveLatestAnalysis(currentAnalysisResult);
    resetStudyPlanView();
    setStudyAgentStatus(getUiText("studyAgentStatusTitle"), getUiText("studyAgentStatusDetail"));
    updateCounts();
    syncVisibleNoteModeFromLegacyMode();
    updateModeUI();
    renderCurrentResult(currentAnalysisResult);
    setProcessStateText("已載入歷史紀錄");
    fileStatus.textContent = entry.sourceMeta?.fileName
      ? (currentLanguage === "en"
        ? `History source loaded: ${entry.sourceMeta.fileName}`
        : `已載入歷史來源：${entry.sourceMeta.fileName}`)
      : (currentLanguage === "en" ? "Historical input loaded" : "已載入歷史輸入內容");
    return;
  }

  const nextHistory = history.filter((item) => item.id !== entry.id);
  persistHistory(nextHistory);
  renderHistory(nextHistory);
  setProcessStateText("已刪除歷史紀錄");
});

clearHistoryButton.addEventListener("click", () => {
  persistHistory([]);
  renderHistory([]);
  setProcessStateText("歷史紀錄已清空");
});
document.addEventListener("DOMContentLoaded", () => {
  reportMissingUiElements();
  reportCoreUiReadiness();
  initApp();
});
