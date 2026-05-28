// Specialized finance/accounting reference data.
// It should only influence output when the input content clearly belongs to finance or accounting.
globalThis.financeKnowledgeBase = [
  {
    term: "分錄",
    aliases: ["分錄", "會計分錄", "journal entry"],
    category: "accounting",
    definition: "分錄是把交易事項依照借方與貸方記錄下來的會計紀錄方式，用來表達每筆交易對各科目的影響。"
  },
  {
    term: "借方",
    aliases: ["借方", "debit"],
    category: "accounting",
    definition: "借方是分錄的一邊，並不是單純代表增加或減少，而是要看科目性質。資產與費用增加通常記借方。"
  },
  {
    term: "貸方",
    aliases: ["貸方", "credit"],
    category: "accounting",
    definition: "貸方是分錄的一邊，並不是單純代表增加或減少，而是要看科目性質。負債、權益與收入增加通常記貸方。"
  },
  {
    term: "資產",
    aliases: ["資產", "assets"],
    category: "concept",
    definition: "資產是企業所控制、且未來可帶來經濟效益的資源，例如現金、存貨、設備與應收帳款。"
  },
  {
    term: "負債",
    aliases: ["負債", "liabilities"],
    category: "concept",
    definition: "負債是企業對外負有清償義務的項目，例如應付帳款、借款與應付票據。"
  },
  {
    term: "權益",
    aliases: ["權益", "業主權益", "equity"],
    category: "concept",
    definition: "權益是資產扣除負債後屬於業主或股東的剩餘權利，又可視為企業淨值。"
  },
  {
    term: "收入",
    aliases: ["收入", "revenue"],
    category: "concept",
    definition: "收入是企業在營業活動中所獲得的經濟利益流入，例如銷貨收入或服務收入。"
  },
  {
    term: "服務收入",
    aliases: ["服務收入", "service revenue", "service revenues"],
    category: "account",
    definition: "服務收入是企業因提供勞務或專業服務而認列的收入。"
  },
  {
    term: "預收服務收入",
    aliases: ["預收服務收入", "未實現服務收入", "unearned service revenue", "unearned service revenues"],
    category: "account",
    definition: "預收服務收入是企業先收到款項，但尚未完成服務，因此暫時列為負債的科目。"
  },
  {
    term: "銷貨收入",
    aliases: ["銷貨收入", "sales revenue", "sales revenues"],
    category: "account",
    definition: "銷貨收入是企業出售商品所認列的收入。"
  },
  {
    term: "費用",
    aliases: ["費用", "expense"],
    category: "concept",
    definition: "費用是企業為了獲得收入而發生的資源耗用，例如薪資費用、租金費用與折舊費用。"
  },
  {
    term: "零用金",
    aliases: ["零用金", "petty cash"],
    category: "account",
    definition: "零用金是企業為了支付小額零星支出而保留的現金。"
  },
  {
    term: "約當現金",
    aliases: ["約當現金", "cash equivalents"],
    category: "account",
    definition: "約當現金是短期且高度流動的投資，可迅速轉換為已知金額現金，且價值變動風險極低。"
  },
  {
    term: "現金",
    aliases: ["現金", "cash"],
    category: "account",
    definition: "現金是流動性最高的資產，包含庫存現金與可隨時動用的存款。"
  },
  {
    term: "短期投資",
    aliases: ["短期投資", "short-term investments", "marketable securities"],
    category: "account",
    definition: "短期投資是企業暫時持有、預計在一年內出售或變現的投資。"
  },
  {
    term: "應收帳款",
    aliases: ["應收帳款", "accounts receivable"],
    category: "account",
    definition: "應收帳款是因賒銷商品或勞務而對客戶擁有的收款權利，屬於流動資產。"
  },
  {
    term: "備抵呆帳",
    aliases: ["備抵呆帳", "allowance for doubtful accounts"],
    category: "account",
    definition: "備抵呆帳是用來估計應收帳款可能無法收回部分的抵減科目，屬於應收帳款的備抵項目。"
  },
  {
    term: "壞帳費用",
    aliases: ["壞帳費用", "bad debt expense", "uncollectible accounts expense"],
    category: "account",
    definition: "壞帳費用是企業估計部分應收帳款無法收回時所認列的費用。"
  },
  {
    term: "應付帳款",
    aliases: ["應付帳款", "accounts payable"],
    category: "account",
    definition: "應付帳款是企業因賒購商品或勞務而尚未支付的款項，屬於流動負債。"
  },
  {
    term: "應付薪資",
    aliases: ["應付薪資", "salaries payable", "wages payable", "salaries wages payable"],
    category: "account",
    definition: "應付薪資是企業已發生但尚未支付給員工的薪資，屬於流動負債。"
  },
  {
    term: "薪資費用",
    aliases: ["薪資費用", "salary expense", "salaries expense", "wages expense", "salaries wages expense"],
    category: "account",
    definition: "薪資費用是企業因雇用員工而發生的成本，屬於費用科目。"
  },
  {
    term: "應收票據",
    aliases: ["應收票據", "notes receivable"],
    category: "account",
    definition: "應收票據是企業持有、約定未來可收款的票據權利，屬於資產。"
  },
  {
    term: "應付票據",
    aliases: ["應付票據", "notes payable"],
    category: "account",
    definition: "應付票據是企業因借款或交易而簽發、承諾未來付款的票據，屬於負債。"
  },
  {
    term: "用品",
    aliases: ["用品", "supplies"],
    category: "account",
    definition: "用品是企業持有、供日常營運使用但尚未耗用的物品，通常先列為資產。"
  },
  {
    term: "用品費用",
    aliases: ["用品費用", "supplies expense"],
    category: "account",
    definition: "用品費用是本期已耗用用品所認列的費用。"
  },
  {
    term: "預付廣告費",
    aliases: ["預付廣告費", "prepaid advertising"],
    category: "account",
    definition: "預付廣告費是已先支付但尚未耗用的廣告支出，先列為資產。"
  },
  {
    term: "存貨",
    aliases: ["存貨", "inventory"],
    category: "account",
    definition: "存貨是企業預備出售或生產使用的商品與材料，通常屬於流動資產。"
  },
  {
    term: "商品存貨",
    aliases: ["商品存貨", "merchandise inventory"],
    category: "account",
    definition: "商品存貨是商業企業持有、準備出售給客戶的商品。"
  },
  {
    term: "預付費用",
    aliases: ["預付費用", "prepaid expense"],
    category: "account",
    definition: "預付費用是已先支付但尚未耗用完畢的支出，會先列為資產，之後再轉為費用。"
  },
  {
    term: "預收收入",
    aliases: ["預收收入", "unearned revenue", "deferred revenue"],
    category: "account",
    definition: "預收收入是企業已先收到款項但尚未提供商品或服務，因此先列為負債。"
  },
  {
    term: "保險費用",
    aliases: ["保險費用", "insurance expense"],
    category: "account",
    definition: "保險費用是企業因保險保障在本期耗用所認列的費用。"
  },
  {
    term: "預付保險費",
    aliases: ["預付保險費", "prepaid insurance"],
    category: "account",
    definition: "預付保險費是已支付但尚未到期耗用的保險支出，先列為資產。"
  },
  {
    term: "租金費用",
    aliases: ["租金費用", "rent expense"],
    category: "account",
    definition: "租金費用是企業因使用場地或設備而發生的費用。"
  },
  {
    term: "預付租金",
    aliases: ["預付租金", "prepaid rent"],
    category: "account",
    definition: "預付租金是已先支付但尚未耗用的租金，先列為資產。"
  },
  {
    term: "累計折舊",
    aliases: ["累計折舊", "accumulated depreciation"],
    category: "account",
    definition: "累計折舊是固定資產歷年已提列折舊的累積金額，屬於資產的抵減項目。"
  },
  {
    term: "折舊費用",
    aliases: ["折舊費用", "depreciation expense"],
    category: "account",
    definition: "折舊費用是固定資產在本期因使用而分攤認列的費用。"
  },
  {
    term: "設備",
    aliases: ["設備", "equipment"],
    category: "account",
    definition: "設備是企業長期使用於營運的固定資產。"
  },
  {
    term: "土地",
    aliases: ["土地", "land"],
    category: "account",
    definition: "土地是企業持有供營運或投資用途的不動產，通常不提列折舊。"
  },
  {
    term: "建築物",
    aliases: ["建築物", "building", "buildings"],
    category: "account",
    definition: "建築物是企業長期使用的不動產固定資產，通常需按耐用年限提列折舊。"
  },
  {
    term: "機器設備",
    aliases: ["機器設備", "machinery", "machinery and equipment"],
    category: "account",
    definition: "機器設備是企業用於生產或營運活動的長期有形資產。"
  },
  {
    term: "運輸設備",
    aliases: ["運輸設備", "vehicles", "transportation equipment"],
    category: "account",
    definition: "運輸設備是企業用於運送人員或貨物的固定資產。"
  },
  {
    term: "辦公設備",
    aliases: ["辦公設備", "office equipment"],
    category: "account",
    definition: "辦公設備是企業用於日常行政與營運的固定資產。"
  },
  {
    term: "累計折舊-設備",
    aliases: ["累計折舊-設備", "accumulated depreciation equipment"],
    category: "account",
    definition: "累計折舊-設備是針對設備累積提列的折舊金額，屬於設備的抵減科目。"
  },
  {
    term: "應付利息",
    aliases: ["應付利息", "interest payable"],
    category: "account",
    definition: "應付利息是已發生但尚未支付的利息，屬於流動負債。"
  },
  {
    term: "應收利息",
    aliases: ["應收利息", "interest receivable"],
    category: "account",
    definition: "應收利息是已賺得但尚未收到的利息，屬於資產。"
  },
  {
    term: "利息收入",
    aliases: ["利息收入", "interest revenue", "interest income"],
    category: "account",
    definition: "利息收入是企業因存款、借貸或投資而取得的利息收益。"
  },
  {
    term: "利息費用",
    aliases: ["利息費用", "interest expense"],
    category: "account",
    definition: "利息費用是企業因借款或資金融通而發生的成本。"
  },
  {
    term: "應付所得稅",
    aliases: ["應付所得稅", "income tax payable"],
    category: "account",
    definition: "應付所得稅是企業依本期課稅所得計算後尚未繳納的所得稅負債。"
  },
  {
    term: "所得稅費用",
    aliases: ["所得稅費用", "income tax expense"],
    category: "account",
    definition: "所得稅費用是企業本期應負擔的所得稅成本。"
  },
  {
    term: "應付租金",
    aliases: ["應付租金", "rent payable"],
    category: "account",
    definition: "應付租金是已發生但尚未支付的租金，屬於流動負債。"
  },
  {
    term: "應收租金",
    aliases: ["應收租金", "rent receivable"],
    category: "account",
    definition: "應收租金是已賺得但尚未收到的租金收入，屬於資產。"
  },
  {
    term: "應收服務收入",
    aliases: ["應收服務收入", "service revenue receivable", "accrued service revenue"],
    category: "account",
    definition: "應收服務收入是企業已提供服務但尚未收款的收入概念，通常以應收帳款搭配服務收入認列。"
  },
  {
    term: "應計收入",
    aliases: ["應計收入", "accrued revenue"],
    category: "accounting",
    definition: "應計收入是企業已賺得但尚未收現的收入，通常需在期末透過調整分錄認列。"
  },
  {
    term: "應計費用",
    aliases: ["應計費用", "accrued expense"],
    category: "accounting",
    definition: "應計費用是企業已發生但尚未支付的費用，需依應計基礎在期末認列。"
  },
  {
    term: "應付水電費",
    aliases: ["應付水電費", "utilities payable"],
    category: "account",
    definition: "應付水電費是已發生但尚未支付的水電支出，屬於流動負債。"
  },
  {
    term: "水電費用",
    aliases: ["水電費用", "utilities expense"],
    category: "account",
    definition: "水電費用是企業因使用水、電、瓦斯等公共設施而發生的費用。"
  },
  {
    term: "廣告費用",
    aliases: ["廣告費用", "advertising expense"],
    category: "account",
    definition: "廣告費用是企業為推廣產品或服務而發生的支出。"
  },
  {
    term: "辦公費用",
    aliases: ["辦公費用", "office expense"],
    category: "account",
    definition: "辦公費用是企業為日常行政與辦公活動所發生的費用。"
  },
  {
    term: "維修費用",
    aliases: ["維修費用", "repair expense", "repairs expense"],
    category: "account",
    definition: "維修費用是企業為維持資產正常使用狀態所發生的修繕支出。"
  },
  {
    term: "呆帳沖銷",
    aliases: ["呆帳沖銷", "write-off of accounts receivable", "direct write-off"],
    category: "accounting",
    definition: "呆帳沖銷是確認特定應收帳款無法收回時，將其自帳上沖銷的處理。"
  },
  {
    term: "普通股",
    aliases: ["普通股", "common stock"],
    category: "equity",
    definition: "普通股是公司最基本的股權科目，代表普通股股東的所有權。"
  },
  {
    term: "特別股",
    aliases: ["特別股", "preferred stock"],
    category: "equity",
    definition: "特別股是享有優先分配股利或剩餘財產權利的股權工具。"
  },
  {
    term: "資本公積",
    aliases: ["資本公積", "additional paid-in capital", "paid-in capital in excess of par"],
    category: "equity",
    definition: "資本公積是公司發行股票時超過面額所收取的金額，屬於權益的一部分。"
  },
  {
    term: "庫藏股",
    aliases: ["庫藏股", "treasury stock"],
    category: "equity",
    definition: "庫藏股是公司已發行後又買回自己股票所形成的權益減項。"
  },
  {
    term: "現金股利",
    aliases: ["現金股利", "cash dividends", "dividends"],
    category: "equity",
    definition: "現金股利是公司將盈餘以現金形式分配給股東的項目。"
  },
  {
    term: "應付股利",
    aliases: ["應付股利", "dividends payable"],
    category: "account",
    definition: "應付股利是公司已宣告但尚未支付給股東的股利負債。"
  },
  {
    term: "業主資本",
    aliases: ["業主資本", "owner's capital", "capital"],
    category: "equity",
    definition: "業主資本是獨資或合夥企業中屬於業主的權益科目。"
  },
  {
    term: "業主提款",
    aliases: ["業主提款", "owner's drawing", "drawings"],
    category: "equity",
    definition: "業主提款是業主自企業提取資產供私人使用的項目，會減少權益。"
  },
  {
    term: "本期損益",
    aliases: ["本期損益", "income summary"],
    category: "accounting",
    definition: "本期損益是結帳分錄中用來暫時彙總收入與費用的過渡科目。"
  },
  {
    term: "銷貨退回與折讓",
    aliases: ["銷貨退回與折讓", "sales returns and allowances"],
    category: "account",
    definition: "銷貨退回與折讓是銷售後因退貨或價格讓步而減少銷貨收入的抵減科目。"
  },
  {
    term: "銷貨折扣",
    aliases: ["銷貨折扣", "sales discounts"],
    category: "account",
    definition: "銷貨折扣是賣方為鼓勵買方提前付款而給予的價款減讓，屬於收入減項。"
  },
  {
    term: "進貨",
    aliases: ["進貨", "purchases"],
    category: "account",
    definition: "進貨是採定期盤存制時用來記錄購買商品成本的科目。"
  },
  {
    term: "進貨退出與折讓",
    aliases: ["進貨退出與折讓", "purchase returns and allowances"],
    category: "account",
    definition: "進貨退出與折讓是因退貨或價格調整而減少進貨成本的抵減科目。"
  },
  {
    term: "進貨折扣",
    aliases: ["進貨折扣", "purchase discounts"],
    category: "account",
    definition: "進貨折扣是買方因提前付款而取得的價款減讓，通常用來降低進貨成本。"
  },
  {
    term: "進貨運費",
    aliases: ["進貨運費", "freight-in", "transportation-in"],
    category: "account",
    definition: "進貨運費是買方為取得商品所支付的運輸成本，通常計入存貨成本。"
  },
  {
    term: "銷貨運費",
    aliases: ["銷貨運費", "freight-out", "delivery expense"],
    category: "account",
    definition: "銷貨運費是賣方為運送商品給客戶而發生的費用。"
  },
  {
    term: "應付公司債",
    aliases: ["應付公司債", "bonds payable"],
    category: "account",
    definition: "應付公司債是公司向投資人發行債券所形成的長期負債。"
  },
  {
    term: "公司債溢價",
    aliases: ["公司債溢價", "premium on bonds payable"],
    category: "account",
    definition: "公司債溢價是公司債發行價格高於面額時形成的附加金額，通常調整利息費用。"
  },
  {
    term: "公司債折價",
    aliases: ["公司債折價", "discount on bonds payable"],
    category: "account",
    definition: "公司債折價是公司債發行價格低於面額時形成的差額，通常在存續期間攤銷。"
  },
  {
    term: "應付抵押借款",
    aliases: ["應付抵押借款", "mortgage payable"],
    category: "account",
    definition: "應付抵押借款是以不動產等資產設定擔保所取得的長期負債。"
  },
  {
    term: "無形資產",
    aliases: ["無形資產", "intangible assets"],
    category: "account",
    definition: "無形資產是沒有實體形態但可帶來未來經濟效益的資產，例如專利權與商標。"
  },
  {
    term: "專利權",
    aliases: ["專利權", "patent"],
    category: "account",
    definition: "專利權是法律授予發明人在一定期間內獨占使用其發明的權利，屬於無形資產。"
  },
  {
    term: "商標權",
    aliases: ["商標權", "trademark"],
    category: "account",
    definition: "商標權是企業對品牌標誌或名稱享有的法律權利，屬於無形資產。"
  },
  {
    term: "商譽",
    aliases: ["商譽", "goodwill"],
    category: "account",
    definition: "商譽是企業併購時支付超過可辨認淨資產公允價值部分的金額。"
  },
  {
    term: "攤銷費用",
    aliases: ["攤銷費用", "amortization expense"],
    category: "account",
    definition: "攤銷費用是無形資產或遞延成本在本期認列的耗用金額。"
  },
  {
    term: "折舊",
    aliases: ["折舊", "depreciation"],
    category: "accounting",
    definition: "折舊是把固定資產成本在使用年限內按期分攤為費用的會計處理。"
  },
  {
    term: "攤銷",
    aliases: ["攤銷", "amortization"],
    category: "accounting",
    definition: "攤銷是把無形資產或特定遞延成本在受益期間內逐期分攤的會計處理。"
  },
  {
    term: "應計基礎",
    aliases: ["應計基礎", "accrual basis"],
    category: "accounting",
    definition: "應計基礎是收入與費用在發生時認列，而不是等到現金收付時才記錄。"
  },
  {
    term: "現金基礎",
    aliases: ["現金基礎", "cash basis"],
    category: "accounting",
    definition: "現金基礎是以現金實際收付作為收入與費用認列時點的記帳方式。"
  },
  {
    term: "調整分錄",
    aliases: ["調整分錄", "adjusting entry"],
    category: "accounting",
    definition: "調整分錄是在期末為了符合應計基礎與配合原則，對收入、費用、資產或負債所做的修正分錄。"
  },
  {
    term: "直線法",
    aliases: ["直線法", "straight-line method"],
    category: "accounting",
    definition: "直線法是將資產可折舊金額平均分攤到各使用期間的折舊方法。"
  },
  {
    term: "倍數餘額遞減法",
    aliases: ["倍數餘額遞減法", "double-declining-balance method"],
    category: "accounting",
    definition: "倍數餘額遞減法是以前期帳面價值乘以較高折舊率計算折舊的加速折舊法。"
  },
  {
    term: "生產數量法",
    aliases: ["生產數量法", "units-of-production method"],
    category: "accounting",
    definition: "生產數量法是依資產實際使用量或產量分攤折舊的方法。"
  },
  {
    term: "結帳分錄",
    aliases: ["結帳分錄", "closing entry"],
    category: "accounting",
    definition: "結帳分錄是期末將收入與費用等暫時性科目結轉到本期損益或權益科目的程序。"
  },
  {
    term: "永續盤存制",
    aliases: ["永續盤存制", "perpetual inventory system"],
    category: "accounting",
    definition: "永續盤存制是在每次進貨與銷貨時即時更新存貨與銷貨成本的記錄制度。"
  },
  {
    term: "定期盤存制",
    aliases: ["定期盤存制", "periodic inventory system"],
    category: "accounting",
    definition: "定期盤存制是於期末盤點後再計算期末存貨與銷貨成本的制度。"
  },
  {
    term: "成本與淨變現價值孰低法",
    aliases: ["成本與淨變現價值孰低法", "lower of cost and net realizable value", "lcnrv"],
    category: "accounting",
    definition: "成本與淨變現價值孰低法是當存貨價值下跌時，以成本與淨變現價值較低者衡量存貨的原則。"
  },
  {
    term: "試算表",
    aliases: ["試算表", "trial balance"],
    category: "accounting",
    definition: "試算表是用來檢查各帳戶借貸金額是否平衡的彙總表，但平衡不代表一定完全沒有錯。"
  },
  {
    term: "保留盈餘表",
    aliases: ["保留盈餘表", "statement of retained earnings"],
    category: "statement",
    definition: "保留盈餘表是說明保留盈餘期初、期末變動與本期增減原因的報表。"
  },
  {
    term: "資產負債表",
    aliases: ["資產負債表", "balance sheet"],
    category: "statement",
    definition: "資產負債表是表達某一特定日期企業財務狀況的報表，主要呈現資產、負債與權益。"
  },
  {
    term: "損益表",
    aliases: ["損益表", "income statement"],
    category: "statement",
    definition: "損益表是表達某一期間經營成果的報表，主要呈現收入、費用與淨利或淨損。"
  },
  {
    term: "現金流量表",
    aliases: ["現金流量表", "cash flow statement", "statement of cash flows"],
    category: "statement",
    definition: "現金流量表是表達某一期間現金流入與流出的報表，通常分為營業、投資與籌資活動。"
  },
  {
    term: "保留盈餘",
    aliases: ["保留盈餘", "retained earnings"],
    category: "statement",
    definition: "保留盈餘是企業歷年累積未分配給股東的盈餘，屬於權益的一部分。"
  },
  {
    term: "營業活動",
    aliases: ["營業活動", "operating activities"],
    category: "cashflow",
    definition: "營業活動是與企業主要營運有關的現金流量，例如銷貨收現、支付薪資與支付貨款。"
  },
  {
    term: "投資活動",
    aliases: ["投資活動", "investing activities"],
    category: "cashflow",
    definition: "投資活動是與長期資產取得或處分有關的現金流量，例如購買設備或出售投資。"
  },
  {
    term: "籌資活動",
    aliases: ["籌資活動", "financing activities"],
    category: "cashflow",
    definition: "籌資活動是與資金取得及資本結構變動有關的現金流量，例如借款、還款或發放股利。"
  },
  {
    term: "流動資產",
    aliases: ["流動資產", "current assets"],
    category: "concept",
    definition: "流動資產是預期在一年內或一個營業週期內可變現、出售或耗用的資產。"
  },
  {
    term: "流動負債",
    aliases: ["流動負債", "current liabilities"],
    category: "concept",
    definition: "流動負債是預期在一年內或一個營業週期內需要清償的負債。"
  },
  {
    term: "營運資金",
    aliases: ["營運資金", "working capital"],
    category: "ratio",
    definition: "營運資金等於流動資產減流動負債，用來衡量企業短期資金調度與流動性。"
  },
  {
    term: "流動比率",
    aliases: ["流動比率", "current ratio"],
    category: "ratio",
    definition: "流動比率等於流動資產除以流動負債，用來衡量企業短期償債能力。"
  },
  {
    term: "速動比率",
    aliases: ["速動比率", "quick ratio", "acid-test ratio"],
    category: "ratio",
    definition: "速動比率等於速動資產除以流動負債，比流動比率更嚴格地衡量短期償債能力。"
  },
  {
    term: "負債比率",
    aliases: ["負債比率", "debt ratio"],
    category: "ratio",
    definition: "負債比率通常是總負債除以總資產，用來衡量企業資產中有多少比例來自負債融資。"
  },
  {
    term: "毛利率",
    aliases: ["毛利率", "gross profit margin"],
    category: "ratio",
    definition: "毛利率等於毛利除以銷貨收入，用來觀察商品或服務本身的基本獲利能力。"
  },
  {
    term: "淨利率",
    aliases: ["淨利率", "profit margin", "net profit margin"],
    category: "ratio",
    definition: "淨利率等於淨利除以營收，用來衡量企業最終賺到的獲利水準。"
  },
  {
    term: "資產報酬率",
    aliases: ["資產報酬率", "return on assets", "roa"],
    category: "ratio",
    definition: "資產報酬率是淨利除以平均總資產，用來衡量企業運用資產創造獲利的效率。"
  },
  {
    term: "股東權益報酬率",
    aliases: ["股東權益報酬率", "return on equity", "roe"],
    category: "ratio",
    definition: "股東權益報酬率是淨利除以平均股東權益，用來衡量股東投入資本的獲利效果。"
  },
  {
    term: "存貨週轉率",
    aliases: ["存貨週轉率", "inventory turnover"],
    category: "ratio",
    definition: "存貨週轉率通常是銷貨成本除以平均存貨，用來衡量存貨流動速度與管理效率。"
  },
  {
    term: "每股盈餘",
    aliases: ["每股盈餘", "earnings per share", "eps"],
    category: "ratio",
    definition: "每股盈餘是稅後淨利扣除特別股股利後除以流通在外普通股股數，用來表達每股可分得的盈餘。"
  },
  {
    term: "銷貨成本",
    aliases: ["銷貨成本", "cost of goods sold"],
    category: "concept",
    definition: "銷貨成本是企業為了出售商品所直接耗用的成本，是計算毛利的重要基礎。"
  },
  {
    term: "毛利",
    aliases: ["毛利", "gross profit"],
    category: "concept",
    definition: "毛利等於銷貨收入減銷貨成本，代表本業銷售在扣除直接成本後所保留的利益。"
  },
  {
    term: "淨利",
    aliases: ["淨利", "net income"],
    category: "concept",
    definition: "淨利是收入扣除所有費用、損失與所得稅後的最終利益。"
  },
  {
    term: "營業利益",
    aliases: ["營業利益", "operating income"],
    category: "concept",
    definition: "營業利益是本業營運活動所產生的利益，通常不包含業外收益與損失。"
  },
  {
    term: "損益兩平點",
    aliases: ["損益兩平點", "break even point"],
    category: "managerial",
    definition: "損益兩平點是總收入剛好等於總成本、企業不賺不賠時的銷售量或銷售額。"
  },
  {
    term: "固定成本",
    aliases: ["固定成本", "fixed cost"],
    category: "managerial",
    definition: "固定成本是不會隨產量短期變動而改變總額的成本，例如租金與部分管理薪資。"
  },
  {
    term: "變動成本",
    aliases: ["變動成本", "variable cost"],
    category: "managerial",
    definition: "變動成本是會隨產量或銷售量變動而改變總額的成本，例如直接材料。"
  },
  {
    term: "貢獻毛益",
    aliases: ["貢獻毛益", "contribution margin"],
    category: "managerial",
    definition: "貢獻毛益等於銷售收入減變動成本，用來衡量銷售對固定成本與利潤的貢獻。"
  },
  {
    term: "內部控制",
    aliases: ["內部控制", "internal control"],
    category: "audit",
    definition: "內部控制是企業為了保障資產、安全、提升營運效率與確保財務資訊可靠所建立的制度。"
  },
  {
    term: "審計",
    aliases: ["審計", "audit"],
    category: "audit",
    definition: "審計是由獨立專業人員對財務報表與相關資料進行查核，評估其是否允當表達的程序。"
  },
  {
    term: "重大性",
    aliases: ["重大性", "materiality"],
    category: "audit",
    definition: "重大性是指某項錯誤或遺漏大到足以影響報表使用者判斷與決策的程度。"
  },
  {
    term: "風險",
    aliases: ["風險", "risk"],
    category: "finance",
    definition: "風險是未來結果存在不確定性且可能造成損失的程度，金融上常與報酬一起評估。"
  },
  {
    term: "報酬率",
    aliases: ["報酬率", "return"],
    category: "finance",
    definition: "報酬率是投資所得相對於投入資金的比率，可用來評估投資績效。"
  },
  {
    term: "現值",
    aliases: ["現值", "present value"],
    category: "finance",
    definition: "現值是把未來金額依一定折現率折算到今天所得到的價值。"
  },
  {
    term: "終值",
    aliases: ["終值", "future value"],
    category: "finance",
    definition: "終值是資金經過一定期間與利率累積後在未來某時點的價值。"
  },
  {
    term: "折現率",
    aliases: ["折現率", "discount rate"],
    category: "finance",
    definition: "折現率是把未來現金流折算為現值時所使用的比率，通常反映資金時間價值與風險。"
  },
  {
    term: "淨現值",
    aliases: ["淨現值", "net present value", "npv"],
    category: "finance",
    definition: "淨現值是未來現金流入現值減去投資成本後的金額，常用來評估投資方案是否值得接受。"
  },
  {
    term: "內部報酬率",
    aliases: ["內部報酬率", "internal rate of return", "irr"],
    category: "finance",
    definition: "內部報酬率是使投資案淨現值等於零的折現率，用來衡量投資方案的報酬能力。"
  },
  {
    term: "資本預算",
    aliases: ["資本預算", "capital budgeting"],
    category: "finance",
    definition: "資本預算是企業評估長期投資案可行性的決策程序，常搭配淨現值與內部報酬率分析。"
  },
  {
    term: "財務槓桿",
    aliases: ["財務槓桿", "financial leverage"],
    category: "finance",
    definition: "財務槓桿是利用負債融資放大股東報酬或損失的效果，通常伴隨更高風險。"
  },
  {
    term: "資本結構",
    aliases: ["資本結構", "capital structure"],
    category: "finance",
    definition: "資本結構是企業資金來源中負債與權益的組成比例。"
  },
  {
    term: "流動性",
    aliases: ["流動性", "liquidity"],
    category: "finance",
    definition: "流動性是資產快速轉換成現金且不大幅影響價格的能力，也可用來描述企業短期償債能力。"
  },
  {
    term: "償債能力",
    aliases: ["償債能力", "solvency"],
    category: "finance",
    definition: "償債能力是企業償還短期與長期債務的能力，常透過比率分析加以評估。"
  }
];

globalThis.journalEntryKnowledgeBase = [
  {
    title: "現金銷貨",
    aliases: ["現金銷貨", "收現銷貨", "銷貨收現"],
    pattern: "借：現金 / 貸：銷貨收入",
    explanation: "表示企業收到現金並確認銷貨收入，資產增加記借方，收入增加記貸方。"
  },
  {
    title: "賒銷商品",
    aliases: ["賒銷", "賒銷商品", "應收帳款銷貨"],
    pattern: "借：應收帳款 / 貸：銷貨收入",
    explanation: "表示商品已出售但尚未收到現金，因此應收帳款增加，銷貨收入同時認列。"
  },
  {
    title: "收回應收帳款",
    aliases: ["收回應收帳款", "收回欠款", "應收帳款收現"],
    pattern: "借：現金 / 貸：應收帳款",
    explanation: "表示客戶償還先前賒欠款項，現金增加，應收帳款減少。"
  },
  {
    title: "現購存貨",
    aliases: ["現購存貨", "現金進貨", "買進存貨付現"],
    pattern: "借：存貨 / 貸：現金",
    explanation: "表示企業以現金購買存貨，存貨增加，現金減少。"
  },
  {
    title: "賒購存貨",
    aliases: ["賒購", "賒購存貨", "應付帳款進貨"],
    pattern: "借：存貨 / 貸：應付帳款",
    explanation: "表示企業先取得存貨但尚未付款，因此存貨增加、應付帳款增加。"
  },
  {
    title: "償還應付帳款",
    aliases: ["償還應付帳款", "支付貨款", "清償應付帳款"],
    pattern: "借：應付帳款 / 貸：現金",
    explanation: "表示企業以現金清償原本積欠供應商的款項，負債減少、現金減少。"
  },
  {
    title: "業主投入資本",
    aliases: ["投入資本", "業主投資", "股東投入資本"],
    pattern: "借：現金 / 貸：資本",
    explanation: "表示業主或股東把資金投入企業，現金增加，權益增加。"
  },
  {
    title: "銀行借款",
    aliases: ["銀行借款", "向銀行借款", "取得借款"],
    pattern: "借：現金 / 貸：銀行借款",
    explanation: "表示企業取得借入資金，現金增加，同時負債增加。"
  },
  {
    title: "償還銀行借款本金",
    aliases: ["償還借款", "還銀行借款", "清償借款本金"],
    pattern: "借：銀行借款 / 貸：現金",
    explanation: "表示企業償還借款本金，負債減少，現金減少。"
  },
  {
    title: "支付租金",
    aliases: ["支付租金", "租金支出", "付租金"],
    pattern: "借：租金費用 / 貸：現金",
    explanation: "表示企業支付租金並認列當期費用，費用增加，現金減少。"
  },
  {
    title: "預付租金",
    aliases: ["預付租金", "先付租金", "租金預付"],
    pattern: "借：預付租金 / 貸：現金",
    explanation: "表示租金尚未全部耗用，因此先列為資產，現金減少。"
  },
  {
    title: "預付租金轉費用",
    aliases: ["預付租金轉費用", "租金攤提", "租金到期轉費用"],
    pattern: "借：租金費用 / 貸：預付租金",
    explanation: "表示原本的預付租金已在本期耗用，需從資產轉為費用。"
  },
  {
    title: "購買設備",
    aliases: ["購買設備", "購入設備", "買機器設備"],
    pattern: "借：設備 / 貸：現金",
    explanation: "表示企業取得固定資產設備，資產中的設備增加，現金減少。"
  },
  {
    title: "認列折舊",
    aliases: ["認列折舊", "提列折舊", "折舊分錄"],
    pattern: "借：折舊費用 / 貸：累計折舊",
    explanation: "表示固定資產在本期發生價值耗用，認列折舊費用並增加累計折舊。"
  },
  {
    title: "支付薪資",
    aliases: ["支付薪資", "發放薪資", "付員工薪水"],
    pattern: "借：薪資費用 / 貸：現金",
    explanation: "表示支付員工薪資並認列當期費用，費用增加、現金減少。"
  },
  {
    title: "應付薪資調整",
    aliases: ["應付薪資", "薪資調整", "期末認列薪資"],
    pattern: "借：薪資費用 / 貸：應付薪資",
    explanation: "表示薪資已發生但尚未支付，依應計基礎先認列費用與負債。"
  },
  {
    title: "收到預收貨款",
    aliases: ["預收貨款", "收到訂金", "預收收入"],
    pattern: "借：現金 / 貸：預收收入",
    explanation: "表示企業先收到款項但尚未提供商品或服務，因此先列負債。"
  },
  {
    title: "預收收入轉銷貨收入",
    aliases: ["預收收入轉收入", "履約後認列收入", "預收貨款轉收入"],
    pattern: "借：預收收入 / 貸：銷貨收入",
    explanation: "表示企業已完成履約，原本預收的負債轉為收入。"
  },
  {
    title: "收到應收票據",
    aliases: ["應收票據", "收受票據", "取得票據"],
    pattern: "借：應收票據 / 貸：應收帳款",
    explanation: "表示客戶以票據取代原本帳款，應收票據增加、應收帳款減少。"
  },
  {
    title: "壞帳費用估計",
    aliases: ["壞帳費用", "估計呆帳", "備抵呆帳"],
    pattern: "借：壞帳費用 / 貸：備抵呆帳",
    explanation: "表示依估計認列可能無法收回的帳款損失，符合穩健原則。"
  },
  {
    title: "沖銷無法收回應收帳款",
    aliases: ["沖銷呆帳", "沖銷應收帳款", "write off accounts receivable"],
    pattern: "借：備抵呆帳 / 貸：應收帳款",
    explanation: "表示企業確認特定客戶欠款無法收回，將原本的應收帳款沖銷，並減少備抵呆帳。"
  },
  {
    title: "宣告發放股利",
    aliases: ["宣告股利", "發放股利", "現金股利"],
    pattern: "借：保留盈餘 / 貸：應付股利",
    explanation: "表示公司宣告發放股利時，先減少權益並認列應付股利。"
  },
  {
    title: "支付股利",
    aliases: ["支付股利", "發股利", "股利付款"],
    pattern: "借：應付股利 / 貸：現金",
    explanation: "表示實際發放股利，負債減少，現金減少。"
  },
  {
    title: "收到利息收入",
    aliases: ["利息收入", "收到利息", "收利息"],
    pattern: "借：現金 / 貸：利息收入",
    explanation: "表示企業收到利息款項，現金增加並認列收入。"
  },
  {
    title: "支付利息費用",
    aliases: ["利息費用", "支付利息", "付利息"],
    pattern: "借：利息費用 / 貸：現金",
    explanation: "表示企業支付利息並認列當期財務成本。"
  },
  {
    title: "期末應計利息",
    aliases: ["應計利息", "期末利息調整", "accrued interest"],
    pattern: "借：利息費用 / 貸：應付利息",
    explanation: "表示利息已於本期發生但尚未支付，需在期末先認列費用與負債。"
  },
  {
    title: "認列應計服務收入",
    aliases: ["應計服務收入", "應收服務收入", "accrued service revenue"],
    pattern: "借：應收帳款 / 貸：服務收入",
    explanation: "表示企業已提供服務但尚未收款，因此先認列應收帳款與服務收入。"
  },
  {
    title: "預付保險費調整",
    aliases: ["保險攤提", "預付保險費轉費用", "insurance adjustment"],
    pattern: "借：保險費用 / 貸：預付保險費",
    explanation: "表示原先預付的保險在本期已部分到期耗用，因此需由資產轉為費用。"
  },
  {
    title: "用品調整分錄",
    aliases: ["用品調整", "用品轉費用", "supplies adjustment"],
    pattern: "借：用品費用 / 貸：用品",
    explanation: "表示本期已耗用部分用品，需將尚未耗用的資產轉出並認列費用。"
  },
  {
    title: "發行普通股收現",
    aliases: ["發行普通股", "股票發行", "issue common stock"],
    pattern: "借：現金 / 貸：普通股 / 貸：資本公積",
    explanation: "表示公司發行普通股取得現金，股票面額部分列為普通股，超過面額部分列為資本公積。"
  },
  {
    title: "發行公司債",
    aliases: ["發行公司債", "issue bonds", "bonds payable issuance"],
    pattern: "借：現金 / 貸：應付公司債",
    explanation: "表示公司向外部投資人發行公司債取得資金，現金增加並形成長期負債。"
  },
  {
    title: "銷貨成本結轉",
    aliases: ["銷貨成本結轉", "結轉成本", "賣出存貨成本"],
    pattern: "借：銷貨成本 / 貸：存貨",
    explanation: "表示商品出售後，需把對應存貨成本轉為當期銷貨成本。"
  }
];

globalThis.financeKnowledgeBase = globalThis.financeKnowledgeBase.map((entry) => {
  const englishAliases = (entry.aliases || []).filter((alias) => /^[A-Za-z][A-Za-z0-9' -]*$/.test(alias));
  const displayEnglish = entry.displayEnglish || englishAliases
    .map((alias, index) => ({
      alias,
      index,
      wordCount: alias.trim().split(/\s+/).length
    }))
    .sort((a, b) => b.wordCount - a.wordCount || a.alias.length - b.alias.length || a.index - b.index)[0]?.alias || entry.term;
  return {
    ...entry,
    displayEnglish
  };
});

globalThis.accountingFormulaKnowledgeBase = [
  {
    title: "流動比率",
    aliases: ["流動比率", "current ratio"],
    formula: "流動比率 = 流動資產 / 流動負債",
    explanation: "用來衡量企業短期償債能力，數值越高通常代表短期流動性越充足。"
  },
  {
    title: "速動比率",
    aliases: ["速動比率", "quick ratio", "acid-test ratio"],
    formula: "速動比率 = 速動資產 / 流動負債",
    explanation: "排除存貨後再衡量短期償債能力，比流動比率更保守。"
  },
  {
    title: "負債比率",
    aliases: ["負債比率", "debt ratio"],
    formula: "負債比率 = 總負債 / 總資產",
    explanation: "觀察企業資產有多少比例來自負債融資，比例越高通常財務風險越高。"
  },
  {
    title: "資產報酬率",
    aliases: ["資產報酬率", "return on assets", "roa"],
    formula: "資產報酬率 = 淨利 / 平均總資產",
    explanation: "衡量企業運用資產創造獲利的效率。"
  },
  {
    title: "權益報酬率",
    aliases: ["股東權益報酬率", "權益報酬率", "return on equity", "roe"],
    formula: "權益報酬率 = 淨利 / 平均股東權益",
    explanation: "衡量股東投入資本所帶來的報酬能力。"
  },
  {
    title: "毛利率",
    aliases: ["毛利率", "gross profit margin"],
    formula: "毛利率 = 毛利 / 銷貨收入",
    explanation: "用來觀察商品或服務本業的基本獲利能力。"
  },
  {
    title: "純益率",
    aliases: ["純益率", "淨利率", "profit margin", "net profit margin"],
    formula: "純益率 = 淨利 / 營業收入",
    explanation: "反映企業最終能從營收中留下多少獲利。"
  },
  {
    title: "存貨週轉率",
    aliases: ["存貨週轉率", "inventory turnover"],
    formula: "存貨週轉率 = 銷貨成本 / 平均存貨",
    explanation: "用來衡量存貨流動速度與管理效率。"
  },
  {
    title: "應收帳款週轉率",
    aliases: ["應收帳款週轉率", "accounts receivable turnover"],
    formula: "應收帳款週轉率 = 賒銷收入 / 平均應收帳款",
    explanation: "用來衡量企業收回帳款的效率。"
  },
  {
    title: "資產週轉率",
    aliases: ["資產週轉率", "asset turnover"],
    formula: "資產週轉率 = 銷貨收入 / 平均總資產",
    explanation: "用來衡量企業使用資產創造收入的效率。"
  },
  {
    title: "營運資金",
    aliases: ["營運資金", "working capital"],
    formula: "營運資金 = 流動資產 - 流動負債",
    explanation: "反映企業可用於日常營運的短期資金餘裕。"
  },
  {
    title: "每股盈餘",
    aliases: ["每股盈餘", "earnings per share", "eps"],
    formula: "每股盈餘 = 普通股股東可分配淨利 / 流通在外普通股股數",
    explanation: "用來表示每一股普通股可分得多少盈餘。"
  },
  {
    title: "會計方程式",
    aliases: ["會計方程式", "accounting equation", "assets = liabilities + equity"],
    formula: "資產 = 負債 + 權益",
    explanation: "是會計記錄最基本的平衡關係。"
  },
  {
    title: "毛利",
    aliases: ["毛利", "gross profit"],
    formula: "毛利 = 銷貨收入 - 銷貨成本",
    explanation: "表示本業銷售在扣除直接成本後所保留的利益。"
  },
  {
    title: "淨現值",
    aliases: ["淨現值", "net present value", "npv"],
    formula: "淨現值 = 未來現金流入現值 - 初始投資成本",
    explanation: "常用來評估投資方案是否值得接受。"
  }
];
