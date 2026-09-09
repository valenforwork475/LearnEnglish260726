export const GRAMMAR_TOPICS = [
  { id: "all", label: "ทุกหัวข้อ" },
  { id: "tenses", label: "Tenses (กาล)" },
  { id: "subject-verb", label: "Subject-Verb Agreement" },
  { id: "prepositions", label: "Prepositions (คำบุพบท)" },
  { id: "articles", label: "Articles (a/an/the)" },
  { id: "conditionals", label: "If-Clauses (ประโยคเงื่อนไข)" },
  { id: "passive", label: "Passive Voice" },
  { id: "modals", label: "Modal Verbs (can/should/must)" },
];

export const GRAMMAR_DATA = [
  // --- STARTER / ELEMENTARY LEVEL ---
  {
    id: "g1",
    level: "starter",
    topic: "tenses",
    question: "She _______ English every single day.",
    options: [
      { id: "a", text: "practice" },
      { id: "b", text: "practices", isCorrect: true },
      { id: "c", text: "practicing" },
      { id: "d", text: "practiced" }
    ],
    explanation: "ประธาน 'She' เป็นเอกพจน์บุรุษที่ 3 ใน Present Simple Tense (เหตุการณ์ที่ทำเป็นประจำ มีคีย์เวิร์ด 'every single day') กริยาต้องเติม -s หรือ -es (practice ➔ practices)",
    translation: "เธอฝึกฝนภาษาอังกฤษในทุกๆ วัน"
  },
  {
    id: "g2",
    level: "starter",
    topic: "tenses",
    question: "Look! The baby _______ right now.",
    options: [
      { id: "a", text: "sleeps" },
      { id: "b", text: "is sleeping", isCorrect: true },
      { id: "c", text: "slept" },
      { id: "d", text: "has slept" }
    ],
    explanation: "มีคำว่า 'Look!' (ดูสิ!) และ 'right now' (ตอนนี้) แสดงถึงเหตุการณ์ที่กำลังเกิดขึ้นขณะพูด ต้องใช้ Present Continuous (is/am/are + V.ing)",
    translation: "ดูสิ! ทารกกำลังหลับอยู่ตอนนี้"
  },
  {
    id: "g3",
    level: "starter",
    topic: "articles",
    question: "He is _______ honest man that everyone respects.",
    options: [
      { id: "a", text: "a" },
      { id: "b", text: "an", isCorrect: true },
      { id: "c", text: "the" },
      { id: "d", text: "- (ไม่เติม)" }
    ],
    explanation: "คำว่า 'honest' ออกเสียงสระเริ่มต้นขึ้นด้วยเสียง /ɒ/ (ออ-นิสท์) ตัว h ไม่ออกเสียง จึงต้องใช้ 'an' (an honest man)",
    translation: "เขาเป็นคนซื่อสัตย์ที่ทุกคนเคารพนับถือ"
  },
  {
    id: "g4",
    level: "starter",
    topic: "prepositions",
    question: "We usually have lunch _______ noon.",
    options: [
      { id: "a", text: "in" },
      { id: "b", text: "on" },
      { id: "c", text: "at", isCorrect: true },
      { id: "d", text: "by" }
    ],
    explanation: "ใช้ 'at' กับเวลาเจาะจง เช่น at noon, at 8 o'clock, at midnight",
    translation: "พวกเรามักจะกินอาหารเที่ยงตอนเที่ยงวัน"
  },
  {
    id: "g5",
    level: "starter",
    topic: "subject-verb",
    question: "Every student and teacher _______ present at the meeting today.",
    options: [
      { id: "a", text: "is", isCorrect: true },
      { id: "b", text: "are" },
      { id: "c", text: "were" },
      { id: "d", text: "have been" }
    ],
    explanation: "เมื่อประธานมีคำว่า 'Every' นำหน้า (Every student and teacher) ให้ถือว่าเป็นเอกพจน์เสมอ จึงใช้กริยาเอกพจน์ 'is'",
    translation: "นักเรียนและครูทุกคนเข้าร่วมการประชุมในวันนี้"
  },

  // --- ELEMENTARY / INTERMEDIATE LEVEL ---
  {
    id: "g6",
    level: "elementary",
    topic: "tenses",
    question: "I _______ in Bangkok since 2018.",
    options: [
      { id: "a", text: "live" },
      { id: "b", text: "lived" },
      { id: "c", text: "have lived", isCorrect: true },
      { id: "d", text: "am living" }
    ],
    explanation: "คีย์เวิร์ด 'since 2018' (ตั้งแต่ปี 2018 ถึงปัจจุบัน) บอกเหตุการณ์ที่เริ่มในอดีตและยังดำเนินต่อเนื่องมาถึงปัจจุบัน ต้องใช้ Present Perfect Tense (have/has + V.3)",
    translation: "ฉันอาศัยอยู่ในกรุงเทพฯ ตั้งแต่ปี 2018"
  },
  {
    id: "g7",
    level: "elementary",
    topic: "prepositions",
    question: "She arrived _______ the airport just in time for her flight.",
    options: [
      { id: "a", text: "at", isCorrect: true },
      { id: "b", text: "in" },
      { id: "c", text: "to" },
      { id: "d", text: "on" }
    ],
    explanation: "คำว่า 'arrive at' ใช้กับจุดสถานที่เจาะจง เช่น airport, station, hotel (ใช้ arrive in กับเมืองหรือประเทศ)",
    translation: "เธอมาถึงสนามบินทันเวลาเที่ยวบินของเธอพอดี"
  },
  {
    id: "g8",
    level: "elementary",
    topic: "modals",
    question: "You _______ wear a seatbelt while driving. It's the law.",
    options: [
      { id: "a", text: "must", isCorrect: true },
      { id: "b", text: "should" },
      { id: "c", text: "may" },
      { id: "d", text: "could" }
    ],
    explanation: "คำว่า 'must' ใช้กับข้อบังคับ กฎหมาย หรือสิ่งจำเป็นที่ต้องทำอย่างเด็ดขาด (It's the law = มันเป็นกฎหมาย)",
    translation: "คุณต้องคาดเข็มขัดนิรภัยขณะขับรถ เพราะมันเป็นกฎหมาย"
  },
  {
    id: "g9",
    level: "elementary",
    topic: "subject-verb",
    question: "Neither of the options _______ suitable for our current project.",
    options: [
      { id: "a", text: "is", isCorrect: true },
      { id: "b", text: "are" },
      { id: "c", text: "were" },
      { id: "d", text: "have" }
    ],
    explanation: "'Neither of + คำนามพหูพจน์' มีความหมายว่า 'ไม่ทั้งสองอย่าง' ถือเป็นประธานเอกพจน์ในไวยากรณ์มาตรฐาน จึงใช้ 'is'",
    translation: "ไม่มีตัวเลือกใดในสองทางเลือกนี้ที่เหมาะสมกับโปรเจกต์ปัจจุบันของเรา"
  },
  {
    id: "g10",
    level: "elementary",
    topic: "conditionals",
    question: "If it rains tomorrow, we _______ the outdoor picnic.",
    options: [
      { id: "a", text: "cancel" },
      { id: "b", text: "will cancel", isCorrect: true },
      { id: "c", text: "canceled" },
      { id: "d", text: "would cancel" }
    ],
    explanation: "ประโยคเงื่อนไขแบบที่ 1 (First Conditional) : If + Present Simple (rains), Future Simple (will + V.1)",
    translation: "ถ้าฝนตกพรุ่งนี้ พวกเราจะยกเลิกการปิกนิกกลางแจ้ง"
  },

  // --- INTERMEDIATE LEVEL ---
  {
    id: "g11",
    level: "intermediate",
    topic: "conditionals",
    question: "If I _______ more time, I would learn another language.",
    options: [
      { id: "a", text: "have" },
      { id: "b", text: "had", isCorrect: true },
      { id: "c", text: "will have" },
      { id: "d", text: "had had" }
    ],
    explanation: "ประโยคเงื่อนไขแบบที่ 2 (Second Conditional สมมติตรงข้ามกับความจริงในปัจจุบัน): If + Past Simple (had), Subject + would + V.1 (would learn)",
    translation: "ถ้าฉันมีเวลามากกว่านี้ ฉันคงจะเรียนภาษาอื่นเพิ่มแล้ว"
  },
  {
    id: "g12",
    level: "intermediate",
    topic: "passive",
    question: "The new bridge _______ by the government next year.",
    options: [
      { id: "a", text: "builds" },
      { id: "b", text: "will build" },
      { id: "c", text: "will be built", isCorrect: true },
      { id: "d", text: "is built" }
    ],
    explanation: "ประธาน 'The new bridge' (สะพานใหม่) ถูกสร้าง (Passive Voice) ในอนาคต (next year) โครงสร้างคือ will + be + V.3 (will be built)",
    translation: "สะพานแห่งใหม่จะถูกสร้างโดยรัฐบาลในปีหน้า"
  },
  {
    id: "g13",
    level: "intermediate",
    topic: "tenses",
    question: "By the time we arrived at the cinema, the movie _______ already.",
    options: [
      { id: "a", text: "started" },
      { id: "b", text: "has started" },
      { id: "c", text: "had started", isCorrect: true },
      { id: "d", text: "was starting" }
    ],
    explanation: "เหตุการณ์ในอดีต 2 เหตุการณ์: เหตุการณ์ที่เกิดขึ้นก่อนใช้ Past Perfect (had started) และเหตุการณ์ที่เกิดทีหลังใช้ Past Simple (arrived)",
    translation: "ตอนที่เราไปถึงโรงหนัง หนังก็ได้เริ่มเล่นไปเรียบร้อยแล้ว"
  },
  {
    id: "g14",
    level: "intermediate",
    topic: "subject-verb",
    question: "The number of accidents on this road _______ significantly decreased.",
    options: [
      { id: "a", text: "has", isCorrect: true },
      { id: "b", text: "have" },
      { id: "c", text: "are" },
      { id: "d", text: "were" }
    ],
    explanation: "'The number of + นามพหูพจน์' (จำนวนของ...) เป็นประธานเอกพจน์ กริยาใช้ 'has' (ต่างจาก 'A number of...' ที่ใช้กริยาพหูพจน์)",
    translation: "จำนวนอุบัติเหตุบนถนนเส้นนี้ลดลงอย่างเห็นได้ชัด"
  },
  {
    id: "g15",
    level: "intermediate",
    topic: "modals",
    question: "She _______ have missed the train; her car is still parked outside.",
    options: [
      { id: "a", text: "must", isCorrect: true },
      { id: "b", text: "should" },
      { id: "c", text: "would" },
      { id: "d", text: "can" }
    ],
    explanation: "โครงสร้าง 'must have + V.3' ใช้ในการคาดเดาในอดีตอย่างมั่นใจ (ต้อง...แน่ๆ) เนื่องจากมีหลักฐานว่ารถยังจอดอยู่ข้างนอก",
    translation: "เธอต้องพลาดตกรถไฟแน่ๆ เพราะรถของเธอยังจอดอยู่ข้างนอก"
  },

  // --- ADVANCED LEVEL ---
  {
    id: "g16",
    level: "advanced",
    topic: "conditionals",
    question: "Had I known about the traffic jam, I _______ a different route.",
    options: [
      { id: "a", text: "took" },
      { id: "b", text: "would take" },
      { id: "c", text: "would have taken", isCorrect: true },
      { id: "d", text: "will take" }
    ],
    explanation: "การละ If ใน Third Conditional (Inversion): 'Had I known...' มีความหมายเดียวกับ 'If I had known...' ส่วนประธานด้านหลังต้องใช้ 'would have + V.3'",
    translation: "ถ้าฉันรู้ล่วงหน้าว่ารถจะติด ฉันคงเลือกใช้เส้นทางอื่นไปแล้ว"
  },
  {
    id: "g17",
    level: "advanced",
    topic: "passive",
    question: "The report is believed _______ by the committee members last week.",
    options: [
      { id: "a", text: "to review" },
      { id: "b", text: "to be reviewed" },
      { id: "c", text: "to have been reviewed", isCorrect: true },
      { id: "d", text: "having reviewed" }
    ],
    explanation: "โครงสร้าง Passive ในอดีตซ้อน Infinitive: 'to have been + V.3' แสดงว่าการตรวจรายงานเกิดขึ้นก่อนในอดีต (last week)",
    translation: "เชื่อกันว่ารายงานฉบับนี้ได้รับการตรวจสอบโดยคณะกรรมการเรียบร้อยแล้วเมื่อสัปดาห์ที่แล้ว"
  },
  {
    id: "g18",
    level: "advanced",
    topic: "prepositions",
    question: "The team succeeded in completing the project ahead of schedule, _______ all expectations.",
    options: [
      { id: "a", text: "surpassing", isCorrect: true },
      { id: "b", text: "surpassed" },
      { id: "c", text: "to surpass" },
      { id: "d", text: "surpass" }
    ],
    explanation: "การใช้ Participle Clause (V.ing) ทำหน้าที่ลดรูปประโยคบอกผลลัพธ์ที่เกิดขึ้นพร้อมกันหรือตามมา ('ทำให้ก้าวข้ามความคาดหมายทั้งหมด')",
    translation: "ทีมงานประสบความสำเร็จในการเสร็จสิ้นโครงการก่อนกำหนด ซึ่งเหนือความคาดหมายทั้งหมด"
  }
];
