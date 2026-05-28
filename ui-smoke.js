const { chromium } = require("playwright");

async function textContent(page, selector) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: "visible", timeout: 10000 });
  return (await locator.textContent())?.trim() || "";
}

async function clickAndWait(page, selector, waitForSelector) {
  await page.locator(selector).click();
  if (waitForSelector) {
    await page.locator(waitForSelector).waitFor({ state: "visible", timeout: 10000 });
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console:${message.text()}`);
    }
  });

  page.on("pageerror", (error) => {
    errors.push(`pageerror:${error.message}`);
  });

  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 30000 });

  await clickAndWait(page, '.nav-pills button[data-page="notes"]', "#notesPage.active");
  await page.locator("#sourceText").fill("資產負債表是用來呈現企業在特定時間點的資產、負債與權益。流動資產與非流動資產的分類，會影響閱讀財務狀況時的判斷。");
  await page.locator("#analyzeButton").click();
  await page.locator("#notesResultStatus").waitFor({ state: "visible", timeout: 15000 });

  const notesStatus = await textContent(page, "#notesResultStatus");
  if (!/整理完成|organization|completed/i.test(notesStatus)) {
    throw new Error(`Unexpected notes result status: ${notesStatus}`);
  }

  await page.locator("#notesExportTrigger").click();
  await page.locator("#exportModal:not(.hidden)").waitFor({ state: "visible", timeout: 10000 });
  await page.locator("#cancelExportBtn").click();
  await page.locator("#exportModal.hidden").waitFor({ state: "attached", timeout: 10000 });

  await page.locator("#sendSummaryToTutorBtn").click();
  await page.locator("#tutorPage.active").waitFor({ state: "visible", timeout: 10000 });
  await page.locator("#chatMessages .chat-message").last().waitFor({ state: "visible", timeout: 15000 });

  await clickAndWait(page, '.nav-pills button[data-page="knowledge"]', "#knowledgePage.active");
  await page.locator("#seedKnowledgeBaseButton").click();
  await page.waitForTimeout(1200);
  await page.locator("#knowledgeSearchInput").fill("會計");
  await page.locator("#knowledgeSearchBtn").click();
  await page.waitForTimeout(1200);
  const resultCards = page.locator(".knowledge-result-card");
  const resultCount = await resultCards.count();
  if (resultCount > 0) {
    await resultCards.first().click();
    await page.locator("#knowledgePreviewTitle").waitFor({ state: "visible", timeout: 10000 });
  }

  await clickAndWait(page, '.nav-pills button[data-page="planner"]', "#plannerPage.active");
  await page.locator("#examDateInput").fill("2026-06-30");
  await page.locator("#studyHoursInput").fill("2");
  await page.locator("#examScopeInput").fill("Demo scope");
  await page.locator("#generateStudyPlanBtn").click();
  await page.waitForTimeout(1000);

  const todayTaskCount = await textContent(page, "#todayTaskCount");
  if (!Number.isFinite(Number(todayTaskCount))) {
    throw new Error(`Invalid planner task count: ${todayTaskCount}`);
  }

  await clickAndWait(page, '.nav-pills button[data-page="myNotes"]', "#myNotesPage.active");
  await page.locator("#myNotesGrid").waitFor({ state: "visible", timeout: 10000 });

  await clickAndWait(page, '.nav-pills button[data-page="home"]', "#homePage.active");
  await page.locator("#openGuideModalButton").click();
  await page.locator("#guideModal:not(.hidden)").waitFor({ state: "visible", timeout: 10000 });
  await page.locator("#guideModalCloseAction").click();
  await page.locator("#guideModal.hidden").waitFor({ state: "attached", timeout: 10000 });

  await browser.close();

  const criticalErrors = errors.filter((entry) => {
    if (entry.includes("ERR_ABORTED")) return false;
    if (entry.includes("Failed to load resource: the server responded with a status of 404")) return false;
    return true;
  });

  if (criticalErrors.length) {
    throw new Error(`Browser errors detected:\n${criticalErrors.join("\n")}`);
  }

  console.log("ui-smoke:ok");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
