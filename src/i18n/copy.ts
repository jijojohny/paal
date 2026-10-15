export type Lang = "en" | "ta" | "hi"

const en = {
  language: "Language",
  untilMidnight: "Until midnight",
  reading: "The reading",
  slip: "The slip",
  wallet: "Wallet",
  openSociety: "Open a society",
  facts: [
    "One phone, one reading",
    "The slip is never stored",
    "Readings die at midnight",
    "More than one wallet to argue",
  ],
  line1: "The fat on the",
  line2: "glass.",
  line3: "The slip stays on paper.",
  hero: "A pourer types the fat printed on the paper slip. Other phones record the fat and SNF they saw on the analyser. The slip is never stored. The readings die at midnight.",
  howReading: "How a reading works",
  morning: "Morning",
  evening: "Evening",
  fat: "Fat",
  snf: "SNF",
  onGlass: "On the glass",
  onGlassBody: "Fat and SNF other phones file for this society and this shift. One phone, one reading.",
  onSlip: "On the slip",
  onSlipBody: "The number on the paper. Compared on that screen, and never written.",
  readingLead:
    "A reading is the fat and SNF one phone saw on the analyser, for one society and one shift.",
  readingHolds: "What is filed",
  readingFatLine: "Fat, from 1 to 12.",
  readingSnfLine: "SNF, from 6 to 12.",
  readingPlaceLine: "The district or union, the society name, and morning or evening.",
  readingLeaves: "What stays off it",
  readingLeavesBody:
    "The paper slip, the pourer's name, phone, farmer code, litres, and the rupee rate are not filed. The witness address is not a name.",
  readingOnce: "One reading per board",
  readingOnceBody:
    "A phone files once for each society, shift, and day. A second filing on that board is refused. If the fat was mistyped, that phone can remove its own reading and file again.",
  readingFund: "Before filing",
  readingFundBody:
    "Each board gets its own witness address on this phone. The File screen shows that address and its test GLM. Filing needs test GLM from the faucet.",
  readingSeen: "Who sees it",
  readingSeenBody:
    "Anyone who opens the board sees the readings for that society and shift. The count and the spread come from that query. Nothing is added up and saved.",
  readingMidnight: "Until midnight",
  readingMidnightBody:
    "The reading stays on this shift's board, then dies at midnight in India. Tomorrow's board starts empty.",
  slipLead:
    "The slip is the paper the society hands back with the fat it measured. Paal checks that number against what other phones saw on the glass.",
  slipTypes: "What you type",
  slipTypesBody: "Only the fat printed on the slip, from 1 to 12. SNF on the slip is not compared.",
  slipGoes: "Where it goes",
  slipGoesBody:
    "Nowhere. The number stays on that screen. It is not saved on this phone and not written to Arkiv. Leave the page and it is gone.",
  slipShows: "What the compare shows",
  slipShowsAbove: "Readings with a higher fat than the slip, and how much higher.",
  slipShowsSame: "How many readings match the slip.",
  slipShowsGap: "The largest gap above the slip, as one number.",
  slipArgue: "When to argue",
  slipArgueBody:
    "Only when more than one phone saw a higher fat than the slip. One phone cannot change the society. When it happens, this line shows in English and Tamil:",
  slipBlind: "What it cannot see",
  slipBlindBody:
    "If the analyser itself reads low, and every phone and the slip agree, Paal shows nothing wrong. It only catches a slip that is lower than the glass.",
  walletBody:
    "This phone does not keep one address. Each society and shift gets its own witness until midnight in India. That address is not written into the reading as a name.",
  witnessForBoard: "Witness for this board",
  witnessHint:
    "This address files only here, until midnight. Another society gets another address. Fund this one before filing.",
  testGlm: "Test GLM",
  checkGlm: "Check again",
  glmNone: "Fund this address before filing.",
  glmChecking: "Checking test GLM…",
  glmBalanceFailed: "The GLM balance did not load.",
  getGlm: "Get test GLM",
  openLead: "Name the building. The fat on your paper slip stays on the next screen.",
  district: "District or union",
  areaHint: "Required. Two societies with the same name stay apart when the district differs.",
  society: "Society name",
  societyHint: "Required. The name painted on the building.",
  shift: "Shift",
  shiftHint: "Morning is before 2 in the afternoon in India. Evening is after that.",
  openToday: "Open today",
  opened: "Opened on this phone",
  openedEmpty: "Names you open stay on this phone. Fats do not.",
  forgetPlace: "Remove",
  forgetPlaceLabel: (society: string) => `Remove ${society} from this phone`,
  errArea: "Enter the district or union.",
  errSociety: "Enter the name painted on the society.",
  errDigits: "Use the name on the building. A number alone is refused.",
  areaPlaceholder: "madurai",
  societyPlaceholder: "aavin society",
  unknownShift: "Unknown shift",
  today: "Today",
  file: "File",
  thisSociety: "This society",
  shiftDies: (name: string) => `${name} shift. Readings die at midnight in India.`,
  timeLeft: (minutes: number) => {
    if (minutes <= 0) return "Midnight in India. This board is emptying."
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    if (hours === 0) return `${rest} minutes until midnight in India.`
    if (rest === 0) return `${hours} ${hours === 1 ? "hour" : "hours"} until midnight in India.`
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${rest} minutes until midnight in India.`
  },
  copyLink: "Copy link",
  linkCopied: "Copied. Another phone can open this page.",
  linkCopyFailed: "The copy failed. Select the link below.",
  readingBoard: "Reading the board…",
  boardFailed: "The board did not load.",
  tryAgain: "Try again",
  emptyBoard: "No readings for this shift yet. The count is this query. It is not saved.",
  fileGlass: "File what the glass showed",
  statWallets: "Wallets filed",
  statSpread: "Fat spread",
  notSaved: "Counted from this query. Not saved.",
  slipWaiting: "Type the fat on the slip. Readings above it show here.",
  aboveSlip: "Above this slip",
  aboveBy: (gap: string) => `${gap} above the slip`,
  sameAsSlip: (n: number) =>
    `${n} ${n === 1 ? "reading matches" : "readings match"} this slip.`,
  notFiled: "This phone has not filed what the glass showed.",
  oneWitness: "One phone is on this board. A second phone has to file before anyone can argue the slip.",
  copyAddress: "Copy address",
  addressCopied: "Copied. Paste it on the faucet.",
  addressCopyFailed: "The copy failed. Select the address above.",
  thisPhone: "This phone",
  compareSlip: "Compare a paper slip",
  paperSlip: "The paper slip",
  slipStays: "This number stays on this page. It is not saved.",
  fatOnSlip: "Fat on the slip",
  slipHint: "Required. From 1 to 12. This page forgets it when you leave.",
  errSlip: "Enter the fat printed on the slip, from 1 to 12.",
  comparing: "Comparing…",
  compare: "Compare",
  clearSlip: "Clear slip",
  argue: "More than one person saw a higher fat than the slip. Argue it.",
  calm: (n: number) =>
    `One wallet cannot change the society. ${n} reading${n === 1 ? " is" : "s are"} above this slip.`,
  glassTitle: "What the glass showed",
  glassLead: "One phone files one fat and one SNF for this shift. A second filing is refused.",
  checking: "Checking this phone…",
  fatHint: "Required. From 1 to 12.",
  snfHint: "Required. From 6 to 12.",
  errFat: "Enter the fat on the glass, from 1 to 12.",
  errSnf: "Enter the SNF on the glass, from 6 to 12.",
  filing: "Filing…",
  fileReading: "File reading",
  removing: "Removing…",
  remove: "Remove my reading",
  seeBoard: "See the board",
  alreadyFiled: (fat: string, snf: string) =>
    `This phone already filed fat ${fat}, SNF ${snf}. A second reading is refused.`,
  errNoGlm: "This phone has no test GLM. Get some from the faucet, then file again.",
  errQuery: "The query failed.",
  errQueryFull: "The public query is full. Try again in a few minutes.",
  errTimeout: "The query did not answer. Try again.",
  liveStopped: "Live updates stopped. This board is the last query.",
  biggestGap: "The largest gap above the slip",
  errWrite: "The write failed.",
  errDelete: "The delete failed.",
}

export type Copy = typeof en

const ta: Copy = {
  language: "மொழி",
  untilMidnight: "நள்ளிரவு வரை",
  reading: "அளவீடு",
  slip: "சீட்டு",
  wallet: "பணப்பை",
  openSociety: "சங்கத்தைத் திற",
  facts: [
    "ஒரு தொலைபேசி, ஒரு அளவீடு",
    "சீட்டு சேமிக்கப்படாது",
    "அளவீடுகள் நள்ளிரவில் மறையும்",
    "வாதிட ஒன்றுக்கு மேற்பட்ட பேர்",
  ],
  line1: "கண்ணாடியில்",
  line2: "கொழுப்பு.",
  line3: "சீட்டு காகிதத்திலேயே.",
  hero: "ஊற்றுபவர் காகித சீட்டில் உள்ள கொழுப்பை உள்ளிடுகிறார். மற்ற தொலைபேசிகள் பகுப்பாய்வியில் பார்த்த கொழுப்பையும் SNF-ஐயும் பதிக்கின்றன. சீட்டு சேமிக்கப்படாது. அளவீடுகள் நள்ளிரவில் மறைகின்றன.",
  howReading: "அளவீடு எப்படி வேலை செய்கிறது",
  morning: "காலை",
  evening: "மாலை",
  fat: "கொழுப்பு",
  snf: "SNF",
  onGlass: "கண்ணாடியில்",
  onGlassBody: "இந்த சங்கம், இந்த முறைக்கு மற்ற தொலைபேசிகள் கொழுப்பையும் SNF-ஐயும் பதிக்கின்றன. ஒரு தொலைபேசி, ஒரு அளவீடு.",
  onSlip: "சீட்டில்",
  onSlipBody: "காகிதத்தில் உள்ள எண். அந்தத் திரையில் ஒப்பிடப்படும். எழுதப்படாது.",
  readingLead:
    "ஒரு அளவீடு என்பது ஒரு தொலைபேசி பகுப்பாய்வியில் பார்த்த கொழுப்பும் SNF-உம். ஒரு சங்கம், ஒரு முறை.",
  readingHolds: "பதிக்கப்படுவது",
  readingFatLine: "கொழுப்பு, 1 முதல் 12 வரை.",
  readingSnfLine: "SNF, 6 முதல் 12 வரை.",
  readingPlaceLine: "மாவட்டம் அல்லது ஒன்றியம், சங்கத்தின் பெயர், காலை அல்லது மாலை.",
  readingLeaves: "பதிக்கப்படாதது",
  readingLeavesBody:
    "காகித சீட்டு, ஊற்றுபவரின் பெயர், தொலைபேசி எண், உறுப்பினர் குறியீடு, லிட்டர், ரூபாய் விலை ஆகியவை பதிக்கப்படாது. சாட்சி முகவரி ஒரு பெயர் அல்ல.",
  readingOnce: "ஒரு பலகைக்கு ஒரு அளவீடு",
  readingOnceBody:
    "ஒரு தொலைபேசி ஒவ்வொரு சங்கம், முறை, நாளுக்கு ஒரு முறை பதிக்கும். அதே பலகையில் இரண்டாவது பதிவு மறுக்கப்படும். கொழுப்பு தவறாக இருந்தால் அந்தத் தொலைபேசி தன் அளவீட்டை நீக்கி மீண்டும் பதிக்கலாம்.",
  readingFund: "பதிக்கும் முன்",
  readingFundBody:
    "ஒவ்வொரு பலகைக்கும் இந்தத் தொலைபேசியில் தனி சாட்சி முகவரி உண்டு. பதிவுத் திரை அந்த முகவரியையும் அதன் சோதனை GLM-ஐயும் காட்டும். பதிக்க குழாயிலிருந்து சோதனை GLM வேண்டும்.",
  readingSeen: "யார் பார்க்கலாம்",
  readingSeenBody:
    "பலகையைத் திறக்கும் எவரும் அந்த சங்கம், அந்த முறையின் அளவீடுகளைப் பார்க்கலாம். எண்ணிக்கையும் பரவலும் அந்த வினவலிலிருந்து வருகின்றன. எதுவும் கூட்டிச் சேமிக்கப்படாது.",
  readingMidnight: "நள்ளிரவு வரை",
  readingMidnightBody:
    "அளவீடு இந்த முறையின் பலகையில் இருக்கும். இந்திய நேரப்படி நள்ளிரவில் அது மறையும். நாளைய பலகை காலியாகத் தொடங்கும்.",
  slipLead:
    "சீட்டு என்பது சங்கம் அளந்த கொழுப்புடன் திருப்பித் தரும் காகிதம். மற்ற தொலைபேசிகள் கண்ணாடியில் பார்த்ததோடு Paal அந்த எண்ணை ஒப்பிடுகிறது.",
  slipTypes: "நீங்கள் உள்ளிடுவது",
  slipTypesBody: "சீட்டில் அச்சிடப்பட்ட கொழுப்பு மட்டும், 1 முதல் 12 வரை. சீட்டின் SNF ஒப்பிடப்படாது.",
  slipGoes: "அது எங்கே போகிறது",
  slipGoesBody:
    "எங்கும் இல்லை. எண் அந்தத் திரையிலேயே இருக்கும். இந்தத் தொலைபேசியில் சேமிக்கப்படாது, Arkiv-இல் எழுதப்படாது. பக்கத்தை விட்டால் அது மறையும்.",
  slipShows: "ஒப்பீடு காட்டுவது",
  slipShowsAbove: "சீட்டை விட அதிக கொழுப்புள்ள அளவீடுகள், எவ்வளவு அதிகம் என்பதுடன்.",
  slipShowsSame: "சீட்டுடன் ஒன்றாக உள்ள அளவீடுகள் எத்தனை.",
  slipShowsGap: "சீட்டை விட மிக அதிக இடைவெளி, ஒரே எண்ணாக.",
  slipArgue: "எப்போது வாதிடுவது",
  slipArgueBody:
    "ஒன்றுக்கு மேற்பட்ட தொலைபேசிகள் சீட்டை விட அதிக கொழுப்பு பார்த்தால் மட்டும். ஒரு தொலைபேசி சங்கத்தை மாற்ற முடியாது. அப்போது இந்த வரி தமிழிலும் ஆங்கிலத்திலும் தெரியும்:",
  slipBlind: "இது பார்க்க முடியாதது",
  slipBlindBody:
    "பகுப்பாய்வியே குறைவாகக் காட்டி, எல்லா தொலைபேசிகளும் சீட்டும் ஒத்துப்போனால், Paal எந்தத் தவறும் காட்டாது. கண்ணாடியை விடக் குறைவான சீட்டை மட்டுமே அது பிடிக்கும்.",
  walletBody:
    "இந்தத் தொலைபேசிக்கு ஒரே முகவரி இல்லை. ஒவ்வொரு சங்கம், ஒவ்வொரு முறைக்கும் நள்ளிரவு வரை தனி சாட்சி. அந்த முகவரி அளவீட்டில் பெயராக எழுதப்படாது.",
  witnessForBoard: "இந்தப் பலகையின் சாட்சி",
  witnessHint:
    "இந்த முகவரி இங்கே மட்டும், நள்ளிரவு வரை பதிக்கும். வேறு சங்கத்துக்கு வேறு முகவரி. பதிக்கும் முன் இதற்கு GLM பெறுங்கள்.",
  testGlm: "சோதனை GLM",
  checkGlm: "மீண்டும் பார்",
  glmNone: "பதிக்கும் முன் இதற்கு GLM பெறுங்கள்.",
  glmChecking: "சோதனை GLM பார்க்கிறது…",
  glmBalanceFailed: "GLM இருப்பு ஏறவில்லை.",
  getGlm: "சோதனை GLM பெறு",
  openLead: "கட்டிடத்தின் பெயரைச் சொல்லுங்கள். காகித சீட்டின் கொழுப்பு அடுத்த திரையிலேயே இருக்கும்.",
  district: "மாவட்டம் அல்லது ஒன்றியம்",
  areaHint: "கட்டாயம். ஒரே பெயருள்ள இரண்டு சங்கங்கள் மாவட்டம் வேறுபட்டால் கலக்காது.",
  society: "சங்கத்தின் பெயர்",
  societyHint: "கட்டாயம். கட்டிடத்தில் எழுதப்பட்ட பெயர்.",
  shift: "முறை",
  shiftHint: "இந்திய நேரப்படி பிற்பகல் 2 மணிக்கு முன் காலை. அதற்குப் பின் மாலை.",
  openToday: "இன்றைய பலகையைத் திற",
  opened: "இந்தத் தொலைபேசியில் திறந்தவை",
  openedEmpty: "திறந்த பெயர்கள் இந்தத் தொலைபேசியில் இருக்கும். கொழுப்பு இருக்காது.",
  forgetPlace: "அகற்று",
  forgetPlaceLabel: (society: string) => `இந்தத் தொலைபேசியிலிருந்து ${society} அகற்று`,
  errArea: "மாவட்டம் அல்லது ஒன்றியத்தை உள்ளிடுங்கள்.",
  errSociety: "சங்கத்தின் பெயரை உள்ளிடுங்கள்.",
  errDigits: "கட்டிடத்தின் பெயரைப் பயன்படுத்துங்கள். எண் மட்டும் மறுக்கப்படும்.",
  areaPlaceholder: "மதுரை",
  societyPlaceholder: "ஆவின் சங்கம்",
  unknownShift: "தெரியாத முறை",
  today: "இன்று",
  file: "பதிவு",
  thisSociety: "இந்த சங்கம்",
  shiftDies: (name) => `${name} முறை. அளவீடுகள் இந்திய நேரப்படி நள்ளிரவில் மறையும்.`,
  timeLeft: (minutes) => {
    if (minutes <= 0) return "இந்திய நேரப்படி நள்ளிரவு. இந்தப் பலகை காலியாகிறது."
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    if (hours === 0) return `நள்ளிரவுக்கு ${rest} நிமிடம்.`
    if (rest === 0) return `நள்ளிரவுக்கு ${hours} மணி.`
    return `நள்ளிரவுக்கு ${hours} மணி ${rest} நிமிடம்.`
  },
  copyLink: "இணைப்பை நகலெடு",
  linkCopied: "நகலெடுக்கப்பட்டது. மற்றொரு தொலைபேசி இந்தப் பக்கத்தைத் திறக்கும்.",
  linkCopyFailed: "நகல் தோல்வி. கீழுள்ள இணைப்பைத் தேர்ந்தெடுங்கள்.",
  readingBoard: "பலகையைப் படிக்கிறது…",
  boardFailed: "பலகை ஏறவில்லை.",
  tryAgain: "மீண்டும் முயலுங்கள்",
  emptyBoard: "இந்த முறைக்கு இன்னும் அளவீடு இல்லை. எண்ணிக்கை இந்த வினவல். அது சேமிக்கப்படாது.",
  fileGlass: "கண்ணாடி காட்டியதைப் பதி",
  statWallets: "பதித்த பணப்பைகள்",
  statSpread: "கொழுப்பு பரவல்",
  notSaved: "இந்த வினவலில் எண்ணப்பட்டது. சேமிக்கப்படாது.",
  slipWaiting: "சீட்டின் கொழுப்பை உள்ளிடுங்கள். அதைவிட அதிகமான அளவீடுகள் இங்கே தெரியும்.",
  aboveSlip: "இந்த சீட்டுக்கு மேல்",
  aboveBy: (gap) => `சீட்டை விட ${gap} அதிகம்`,
  sameAsSlip: (n) => `${n} அளவீடு இந்த சீட்டின் கொழுப்புடன் ஒன்றாக உள்ளது.`,
  notFiled: "இந்தத் தொலைபேசி கண்ணாடி காட்டியதை இன்னும் பதிக்கவில்லை.",
  oneWitness: "இந்தப் பலகையில் ஒரு தொலைபேசி மட்டுமே. சீட்டை வாதிட இன்னொரு தொலைபேசி பதிக்க வேண்டும்.",
  copyAddress: "முகவரியை நகலெடு",
  addressCopied: "நகலெடுக்கப்பட்டது. குழாயில் ஒட்டவும்.",
  addressCopyFailed: "நகல் தோல்வி. மேலுள்ள முகவரியைத் தேர்ந்தெடுங்கள்.",
  thisPhone: "இந்தத் தொலைபேசி",
  compareSlip: "காகித சீட்டை ஒப்பிடு",
  paperSlip: "காகித சீட்டு",
  slipStays: "இந்த எண் இந்தப் பக்கத்திலேயே இருக்கும். சேமிக்கப்படாது.",
  fatOnSlip: "சீட்டில் உள்ள கொழுப்பு",
  slipHint: "கட்டாயம். 1 முதல் 12 வரை. இந்தப் பக்கத்தை விட்டால் இது மறையும்.",
  errSlip: "சீட்டில் அச்சிடப்பட்ட கொழுப்பை உள்ளிடுங்கள், 1 முதல் 12 வரை.",
  comparing: "ஒப்பிடுகிறது…",
  compare: "ஒப்பிடு",
  clearSlip: "சீட்டை அழி",
  argue: "ஒன்றுக்கு மேற்பட்ட பேர் சீட்டை விட அதிக கொழுப்பு பார்த்தனர். வாதாடுங்கள்.",
  calm: (n) => `ஒரு பணப்பை சங்கத்தை மாற்ற முடியாது. ${n} அளவீடு இந்த சீட்டை விட அதிகம்.`,
  glassTitle: "கண்ணாடி காட்டியது",
  glassLead: "ஒரு தொலைபேசி இந்த முறைக்கு ஒரு கொழுப்பும் ஒரு SNF-உம் பதிக்கும். இரண்டாவது பதிவு மறுக்கப்படும்.",
  checking: "இந்தத் தொலைபேசியைப் பார்க்கிறது…",
  fatHint: "கட்டாயம். 1 முதல் 12 வரை.",
  snfHint: "கட்டாயம். 6 முதல் 12 வரை.",
  errFat: "கண்ணாடியில் உள்ள கொழுப்பை உள்ளிடுங்கள், 1 முதல் 12 வரை.",
  errSnf: "கண்ணாடியில் உள்ள SNF-ஐ உள்ளிடுங்கள், 6 முதல் 12 வரை.",
  filing: "பதிக்கிறது…",
  fileReading: "அளவீட்டைப் பதி",
  removing: "நீக்குகிறது…",
  remove: "என் அளவீட்டை நீக்கு",
  seeBoard: "பலகையைப் பார்",
  alreadyFiled: (fat, snf) =>
    `இந்தத் தொலைபேசி கொழுப்பு ${fat}, SNF ${snf} ஏற்கெனவே பதித்தது. இரண்டாவது அளவீடு மறுக்கப்படும்.`,
  errNoGlm: "இந்தத் தொலைபேசியில் சோதனை GLM இல்லை. குழாயிலிருந்து பெற்று மீண்டும் பதியுங்கள்.",
  errQuery: "வினவல் தோல்வியடைந்தது.",
  errQueryFull: "பொது வினவல் நிரம்பியது. சில நிமிடங்களில் மீண்டும் முயலுங்கள்.",
  errTimeout: "வினவல் பதிலளிக்கவில்லை. மீண்டும் முயலுங்கள்.",
  liveStopped: "நேரடி புதுப்பிப்பு நின்றது. இந்தப் பலகை கடைசி வினவல்.",
  biggestGap: "சீட்டை விட மிக அதிக இடைவெளி",
  errWrite: "எழுதுதல் தோல்வியடைந்தது.",
  errDelete: "நீக்குதல் தோல்வியடைந்தது.",
}

const hi: Copy = {
  language: "भाषा",
  untilMidnight: "आधी रात तक",
  reading: "रीडिंग",
  slip: "पर्ची",
  wallet: "वॉलेट",
  openSociety: "सोसाइटी खोलें",
  facts: [
    "एक फ़ोन, एक रीडिंग",
    "पर्ची कभी सहेजी नहीं जाती",
    "रीडिंग आधी रात को मिटती है",
    "बहस के लिए एक से ज़्यादा वॉलेट",
  ],
  line1: "काँच पर",
  line2: "फैट.",
  line3: "पर्ची कागज़ पर रहती है.",
  hero: "दूध उडेलने वाला कागज़ की पर्ची पर छपा फैट लिखता है. दूसरे फ़ोन विश्लेषक पर देखा फैट और SNF दर्ज करते हैं. पर्ची सहेजी नहीं जाती. रीडिंग आधी रात को मिट जाती है.",
  howReading: "रीडिंग कैसे काम करती है",
  morning: "सुबह",
  evening: "शाम",
  fat: "फैट",
  snf: "SNF",
  onGlass: "काँच पर",
  onGlassBody: "इस सोसाइटी और इस पाली के लिए दूसरे फ़ोन फैट और SNF दर्ज करते हैं. एक फ़ोन, एक रीडिंग.",
  onSlip: "पर्ची पर",
  onSlipBody: "कागज़ पर छपा अंक. उसी स्क्रीन पर तुलना होती है, और वह लिखा नहीं जाता.",
  readingLead:
    "एक रीडिंग वह फैट और SNF है जो एक फ़ोन ने विश्लेषक पर देखा, एक सोसाइटी और एक पाली के लिए.",
  readingHolds: "क्या दर्ज होता है",
  readingFatLine: "फैट, 1 से 12.",
  readingSnfLine: "SNF, 6 से 12.",
  readingPlaceLine: "ज़िला या यूनियन, सोसाइटी का नाम, और सुबह या शाम.",
  readingLeaves: "क्या दर्ज नहीं होता",
  readingLeavesBody:
    "कागज़ की पर्ची, उडेलने वाले का नाम, फ़ोन, किसान कोड, लीटर, और रुपए का भाव दर्ज नहीं होते. गवाह पता कोई नाम नहीं है.",
  readingOnce: "हर बोर्ड पर एक रीडिंग",
  readingOnceBody:
    "एक फ़ोन हर सोसाइटी, पाली और दिन के लिए एक बार दर्ज करता है. उसी बोर्ड पर दूसरी दर्ज मना है. फैट गलत हो तो वह फ़ोन अपनी रीडिंग हटाकर फिर दर्ज कर सकता है.",
  readingFund: "दर्ज करने से पहले",
  readingFundBody:
    "इस फ़ोन पर हर बोर्ड का अपना गवाह पता होता है. दर्ज स्क्रीन वह पता और उसका टेस्ट GLM दिखाती है. दर्ज करने के लिए नल से टेस्ट GLM चाहिए.",
  readingSeen: "कौन देख सकता है",
  readingSeenBody:
    "बोर्ड खोलने वाला कोई भी उस सोसाइटी और पाली की रीडिंग देख सकता है. गिनती और फैलाव उसी पूछताछ से आते हैं. कुछ भी जोड़कर सहेजा नहीं जाता.",
  readingMidnight: "आधी रात तक",
  readingMidnightBody:
    "रीडिंग इस पाली के बोर्ड पर रहती है. भारत में आधी रात को वह मिट जाती है. कल का बोर्ड खाली शुरू होता है.",
  slipLead:
    "पर्ची वह कागज़ है जो सोसाइटी मापे गए फैट के साथ लौटाती है. Paal उस अंक को दूसरे फ़ोनों के काँच पर देखे फैट से मिलाता है.",
  slipTypes: "आप क्या लिखते हैं",
  slipTypesBody: "सिर्फ़ पर्ची पर छपा फैट, 1 से 12. पर्ची का SNF नहीं मिलाया जाता.",
  slipGoes: "वह कहाँ जाता है",
  slipGoesBody:
    "कहीं नहीं. अंक उसी स्क्रीन पर रहता है. इस फ़ोन पर सहेजा नहीं जाता और Arkiv पर लिखा नहीं जाता. पन्ना छोड़ते ही वह मिट जाता है.",
  slipShows: "तुलना क्या दिखाती है",
  slipShowsAbove: "पर्ची से ऊँचे फैट वाली रीडिंग, और कितनी ऊँची.",
  slipShowsSame: "कितनी रीडिंग पर्ची के बराबर हैं.",
  slipShowsGap: "पर्ची से सबसे बड़ा फ़ासला, एक अंक में.",
  slipArgue: "बहस कब करें",
  slipArgueBody:
    "सिर्फ़ तब, जब एक से ज़्यादा फ़ोनों ने पर्ची से ऊँचा फैट देखा हो. एक फ़ोन सोसाइटी नहीं बदल सकता. तब यह पंक्ति हिंदी और तमिल में दिखती है:",
  slipBlind: "यह क्या नहीं देख सकता",
  slipBlindBody:
    "अगर विश्लेषक खुद कम पढ़ता है, और हर फ़ोन और पर्ची सहमत हैं, तो Paal कोई गड़बड़ी नहीं दिखाता. यह सिर्फ़ काँच से कम पर्ची पकड़ता है.",
  walletBody:
    "इस फ़ोन का एक ही पता नहीं है. हर सोसाइटी और पाली को आधी रात तक अपना गवाह मिलता है. वह पता रीडिंग में नाम की तरह नहीं लिखा जाता.",
  witnessForBoard: "इस बोर्ड का गवाह",
  witnessHint:
    "यह पता यहीं दर्ज करता है, आधी रात तक. दूसरी सोसाइटी को दूसरा पता मिलता है. दर्ज करने से पहले इसे GLM दें.",
  testGlm: "टेस्ट GLM",
  checkGlm: "फिर जाँचें",
  glmNone: "दर्ज करने से पहले इसे GLM दें.",
  glmChecking: "टेस्ट GLM जाँचा जा रहा है…",
  glmBalanceFailed: "GLM बैलेंस नहीं खुला.",
  getGlm: "टेस्ट GLM लें",
  openLead: "इमारत का नाम लिखें. पर्ची का फैट अगली स्क्रीन पर ही रहता है.",
  district: "ज़िला या यूनियन",
  areaHint: "ज़रूरी. एक ही नाम की दो सोसाइटी ज़िला अलग होने पर नहीं मिलतीं.",
  society: "सोसाइटी का नाम",
  societyHint: "ज़रूरी. इमारत पर लिखा नाम.",
  shift: "पाली",
  shiftHint: "भारत में दोपहर 2 बजे से पहले सुबह. उसके बाद शाम.",
  openToday: "आज खोलें",
  opened: "इस फ़ोन पर खोली गई",
  openedEmpty: "खोले गए नाम इस फ़ोन पर रहते हैं. फैट नहीं.",
  forgetPlace: "हटाएँ",
  forgetPlaceLabel: (society: string) => `${society} को इस फ़ोन से हटाएँ`,
  errArea: "ज़िला या यूनियन लिखें.",
  errSociety: "सोसाइटी का नाम लिखें.",
  errDigits: "इमारत का नाम लिखें. सिर्फ़ अंक मना है.",
  areaPlaceholder: "मदुरै",
  societyPlaceholder: "आविन सोसाइटी",
  unknownShift: "अनजानी पाली",
  today: "आज",
  file: "दर्ज",
  thisSociety: "यह सोसाइटी",
  shiftDies: (name) => `${name} पाली. रीडिंग भारत में आधी रात को मिटती है.`,
  timeLeft: (minutes) => {
    if (minutes <= 0) return "भारत में आधी रात. यह बोर्ड खाली हो रहा है."
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    if (hours === 0) return `आधी रात तक ${rest} मिनट.`
    if (rest === 0) return `आधी रात तक ${hours} घंटे.`
    return `आधी रात तक ${hours} घंटे ${rest} मिनट.`
  },
  copyLink: "लिंक कॉपी करें",
  linkCopied: "कॉपी हो गया. दूसरा फ़ोन यह पन्ना खोल सकता है.",
  linkCopyFailed: "कॉपी नहीं हुई. नीचे का लिंक चुनें.",
  readingBoard: "बोर्ड पढ़ा जा रहा है…",
  boardFailed: "बोर्ड नहीं खुला.",
  tryAgain: "फिर कोशिश करें",
  emptyBoard: "इस पाली की अभी कोई रीडिंग नहीं. गिनती इसी पूछताछ की है. वह सहेजी नहीं जाती.",
  fileGlass: "काँच पर जो दिखा वह दर्ज करें",
  statWallets: "दर्ज वॉलेट",
  statSpread: "फैट फैलाव",
  notSaved: "इसी पूछताछ से गिना गया. सहेजा नहीं जाता.",
  slipWaiting: "पर्ची का फैट लिखें. उससे ऊँची रीडिंग यहाँ दिखेंगी.",
  aboveSlip: "इस पर्ची से ऊपर",
  aboveBy: (gap) => `पर्ची से ${gap} ऊपर`,
  sameAsSlip: (n) => `${n} रीडिंग इस पर्ची के फैट के बराबर ${n === 1 ? "है" : "हैं"}.`,
  notFiled: "इस फ़ोन ने काँच पर जो दिखा वह अभी दर्ज नहीं किया.",
  oneWitness: "इस बोर्ड पर एक फ़ोन है. पर्ची पर बहस से पहले दूसरे फ़ोन को दर्ज करना होगा.",
  copyAddress: "पता कॉपी करें",
  addressCopied: "कॉपी हो गया. इसे नल पर चिपकाएँ.",
  addressCopyFailed: "कॉपी नहीं हुई. ऊपर का पता चुनें.",
  thisPhone: "यह फ़ोन",
  compareSlip: "कागज़ की पर्ची तुलना करें",
  paperSlip: "कागज़ की पर्ची",
  slipStays: "यह अंक इसी पन्ने पर रहता है. सहेजा नहीं जाता.",
  fatOnSlip: "पर्ची पर फैट",
  slipHint: "ज़रूरी. 1 से 12. यह पन्ना छोड़ते ही अंक मिट जाता है.",
  errSlip: "पर्ची पर छपा फैट लिखें, 1 से 12.",
  comparing: "तुलना हो रही है…",
  compare: "तुलना करें",
  clearSlip: "पर्ची मिटाएँ",
  argue: "एक से ज़्यादा लोगों ने पर्ची से ऊँचा फैट देखा. बहस करें.",
  calm: (n) => `एक वॉलेट सोसाइटी नहीं बदल सकता. ${n} रीडिंग इस पर्ची से ऊपर ${n === 1 ? "है" : "हैं"}.`,
  glassTitle: "काँच ने क्या दिखाया",
  glassLead: "एक फ़ोन इस पाली के लिए एक फैट और एक SNF दर्ज करता है. दूसरी दर्ज मना है.",
  checking: "यह फ़ोन जाँचा जा रहा है…",
  fatHint: "ज़रूरी. 1 से 12.",
  snfHint: "ज़रूरी. 6 से 12.",
  errFat: "काँच पर फैट लिखें, 1 से 12.",
  errSnf: "काँच पर SNF लिखें, 6 से 12.",
  filing: "दर्ज हो रहा है…",
  fileReading: "रीडिंग दर्ज करें",
  removing: "हटाया जा रहा है…",
  remove: "मेरी रीडिंग हटाएँ",
  seeBoard: "बोर्ड देखें",
  alreadyFiled: (fat, snf) => `इस फ़ोन ने फैट ${fat}, SNF ${snf} पहले ही दर्ज किया. दूसरी रीडिंग मना है.`,
  errNoGlm: "इस फ़ोन पर टेस्ट GLM नहीं है. नल से लेकर फिर दर्ज करें.",
  errQuery: "पूछताछ असफल रही.",
  errQueryFull: "सार्वजनिक पूछताछ भर गई है. कुछ मिनट बाद फिर कोशिश करें.",
  errTimeout: "पूछताछ का जवाब नहीं आया. फिर कोशिश करें.",
  liveStopped: "लाइव अपडेट रुक गया. यह बोर्ड आखिरी पूछताछ है.",
  biggestGap: "पर्ची से सबसे बड़ा फ़ासला",
  errWrite: "लिखना असफल रहा.",
  errDelete: "हटाना असफल रहा.",
}

export const copy: Record<Lang, Copy> = { en, ta, hi }

export function htmlLang(lang: Lang): string {
  return lang
}

function httpStatus(error: unknown): number | undefined {
  let current: unknown = error
  for (let depth = 0; current && typeof current === "object" && depth < 6; depth++) {
    if ("status" in current && typeof current.status === "number") return current.status
    current = "cause" in current ? current.cause : undefined
  }
  return undefined
}

export function explainFailure(error: unknown, t: Copy): { text: string; faucet: boolean } {
  const raw = error instanceof Error ? error.message : ""
  if (raw.includes("no test GLM")) return { text: t.errNoGlm, faucet: true }
  if (httpStatus(error) === 429 || raw.includes("429") || raw.includes("ANON_COST")) {
    return { text: t.errQueryFull, faucet: false }
  }
  if (raw.includes("query timed out") || raw.includes("took too long")) {
    return { text: t.errTimeout, faucet: false }
  }
  if (!raw) return { text: t.errQuery, faucet: false }
  return { text: raw, faucet: false }
}
