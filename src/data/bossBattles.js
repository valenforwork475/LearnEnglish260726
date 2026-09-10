export const BOSS_STAGES = [
  {
    id: "stage1",
    name: "Airport & Travel Dragon",
    title: "บอสด่านที่ 1: ด่านเอาตัวรอดสนามบิน & เดินทาง",
    icon: "🛫",
    bossName: "Aero-Dragon (มังกรเหินหาว)",
    maxHp: 100,
    bgGradient: "from-blue-900 via-indigo-900 to-slate-950",
    questions: [
      {
        id: "s1_1",
        situation: "เจ้าหน้าที่สนามบินถามว่า: 'Do you have any bags to check in?'",
        question: "คุณควรตอบอย่างไรถ้ามีกระเป๋าเดินทาง 2 ใบที่จะโหลดใต้เครื่อง?",
        options: [
          { id: "a", text: "Yes, I have two bags to check.", isCorrect: true },
          { id: "b", text: "No, I am carrying my shoes.", isCorrect: false },
          { id: "c", text: "I don't like bags.", isCorrect: false },
          { id: "d", text: "Check-in is over there.", isCorrect: false }
        ],
        explanation: "คำว่า 'check in bags' แปลว่า โหลดกระเป๋าลงใต้เครื่อง ประโยคตอบที่ถูกต้องและสุภาพคือ 'Yes, I have two bags to check.'",
        translation: "ใช่ครับ/ค่ะ ฉันมีกระเป๋า 2 ใบที่จะโหลดใต้เครื่อง"
      },
      {
        id: "s1_2",
        situation: "คุณเดินหาเกทขึ้นเครื่องไม่เจอ และต้องการถามเจ้าหน้าที่สนามบิน",
        question: "ประโยคถามทางไปเกทที่สุภาพที่สุดคือข้อใด?",
        options: [
          { id: "a", text: "Where is gate B4?", isCorrect: false },
          { id: "b", text: "Excuse me, could you tell me how to get to gate B4?", isCorrect: true },
          { id: "c", text: "Go to gate B4 now.", isCorrect: false },
          { id: "d", text: "I want gate B4 quickly.", isCorrect: false }
        ],
        explanation: "'Excuse me, could you tell me how to get to...?' เป็นประโยคถามทางมาตรฐานสากลที่สุภาพและเป็นธรรมชาติที่สุด",
        translation: "ขอโทษนะครับ/ค่ะ ช่วยบอกทางไปเกท B4 หน่อยได้ไหมครับ?"
      },
      {
        id: "s1_3",
        situation: "ตม. ต่างประเทศถามว่า: 'What is the purpose of your visit?'",
        question: "ถ้าคุณมาเที่ยวพักผ่อน ควรตอบอย่างไร?",
        options: [
          { id: "a", text: "I am here for tourism / vacation.", isCorrect: true },
          { id: "b", text: "I am working here permanently.", isCorrect: false },
          { id: "c", text: "Because I have money.", isCorrect: false },
          { id: "d", text: "I don't know.", isCorrect: false }
        ],
        explanation: "'Purpose of your visit' แปลว่า วัตถุประสงค์ในการมาเยือน ถ้ามาท่องเที่ยวให้ตอบว่า 'For tourism' หรือ 'For vacation'",
        translation: "มาท่องเที่ยว / มาพักผ่อนครับ/ค่ะ"
      }
    ]
  },
  {
    id: "stage2",
    name: "Cafe & Restaurant Beast",
    title: "บอสด่านที่ 2: ด่านเอาตัวรอดร้านอาหาร & คาเฟ่",
    icon: "☕",
    bossName: "Coffee Golem (อสูรกายร้านกาแฟ)",
    maxHp: 100,
    bgGradient: "from-amber-950 via-stone-900 to-black",
    questions: [
      {
        id: "s2_1",
        situation: "คุณต้องการสั่งอเมริกาโน่เย็น ใส่นมโอ๊ต ในร้านกาแฟต่างประเทศ",
        question: "ประโยคสั่งกาแฟที่เป็นธรรมชาติแบบเนทีฟคือข้อใด?",
        options: [
          { id: "a", text: "Can I get an iced Americano with oat milk, please?", isCorrect: true },
          { id: "b", text: "Give me iced Americano oat milk now.", isCorrect: false },
          { id: "c", text: "I want drink Americano ice with oat.", isCorrect: false },
          { id: "d", text: "Americano ice oat milk okay.", isCorrect: false }
        ],
        explanation: "ฝรั่งนิยมใช้โครงสร้าง 'Can I get a [เครื่องดื่ม] with [ส่วนผสมเพิ่มเติม], please?' เป็นประโยคสั่งอาหาร/เครื่องดื่มที่เป็นธรรมชาติที่สุด",
        translation: "ขออเมริกาโน่เย็นใส่นมโอ๊ตแก้วหนึ่งครับ/ค่ะ"
      },
      {
        id: "s2_2",
        situation: "ทานอาหารเสร็จแล้ว ต้องการเรียกเก็บเงินในร้านอาหาร",
        question: "ประโยคขอเช็กบิลที่นิยมใช้คือข้อใด?",
        options: [
          { id: "a", text: "Could we get the check, please?", isCorrect: true },
          { id: "b", text: "Money please now.", isCorrect: false },
          { id: "c", text: "Calculate my food money.", isCorrect: false },
          { id: "d", text: "Pay money table.", isCorrect: false }
        ],
        explanation: "ในฝั่งอเมริกาใช้ 'get the check' ฝั่งอังกฤษใช้ 'get the bill' ทั้งสองประโยคใช้ขอเช็กบิลได้อย่างสุภาพ",
        translation: "ขอเช็กบิลด้วยครับ/ค่ะ"
      },
      {
        id: "s2_3",
        situation: "บริกรถามว่า: 'Are you ready to order?' แต่คุณยังเลือกเมนูไม่ได้",
        question: "ควรตอบอย่างไรเพื่อขอเวลาดูเมนูเพิ่มอีกนิด?",
        options: [
          { id: "a", text: "Could we have a few more minutes, please?", isCorrect: true },
          { id: "b", text: "No ordering today.", isCorrect: false },
          { id: "c", text: "Stop talking to me.", isCorrect: false },
          { id: "d", text: "Menu is bad.", isCorrect: false }
        ],
        explanation: "'Could we have a few more minutes, please?' แปลว่า ขอเวลาเลือกเมนูอีกสักครู่นะครับ เป็นประโยคสุภาพมากๆ",
        translation: "ขอเวลาเลือกเมนูอีกสักครู่นะครับ/ค่ะ"
      }
    ]
  },
  {
    id: "stage3",
    name: "Idioms Master Sphinx",
    title: "บอสด่านที่ 3: ด่านถอดรหัสสำนวนเด็ด (Idiom Master)",
    icon: "🦊",
    bossName: "Sphinx of Idioms (สฟิงซ์เจ้าปัญญา)",
    maxHp: 120,
    bgGradient: "from-purple-950 via-slate-900 to-black",
    questions: [
      {
        id: "s3_1",
        situation: "เพื่อนพูดกับคุณก่อนขึ้นเวทีว่า: 'Break a leg!'",
        question: "สำนวน 'Break a leg!' มีความหมายว่าอย่างไร?",
        options: [
          { id: "a", text: "ขอให้โชคดีนะ! (Good luck!)", isCorrect: true },
          { id: "b", text: "ระวังขาหักนะ", isCorrect: false },
          { id: "c", text: "รีบวิ่งไปได้แล้ว", isCorrect: false },
          { id: "d", text: "สะดุดล้มลงไปเลย", isCorrect: false }
        ],
        explanation: "'Break a leg!' เป็นสำนวนอวยพรยอดฮิต แปลว่า 'ขอให้โชคดี!' (นิยมใช้อวยพรนักแสดง/ผู้ขึ้นพูดบนเวที)",
        translation: "ขอให้โชคดีนะ!"
      },
      {
        id: "s3_2",
        situation: "เพื่อนถามว่าข้อสอบยากไหม คุณตอบว่า: 'It was a piece of cake!'",
        question: "สำนวน 'a piece of cake' มีความหมายว่าอย่างไร?",
        options: [
          { id: "a", text: "ง่ายมาก หมูๆ เลย", isCorrect: true },
          { id: "b", text: "หวานเหมือนขนมเค้ก", isCorrect: false },
          { id: "c", text: "ยากจนปวดหัว", isCorrect: false },
          { id: "d", text: "แบ่งขนมให้กินหน่อย", isCorrect: false }
        ],
        explanation: "'A piece of cake' เป็นสำนวนหมายถึง สิ่งที่ง่ายมากๆ (ตรงกับสำนวนไทยว่า 'ง่ายเหมือนปอกกล้วยเข้าปาก')",
        translation: "ง่ายมากๆ หมูๆ เลย"
      },
      {
        id: "s3_3",
        situation: "เพื่อนชวนไปปาร์ตี้ แต่คุณบอกว่า: 'I'm feeling under the weather today.'",
        question: "สำนวน 'under the weather' มีความหมายว่าอย่างไร?",
        options: [
          { id: "a", text: "รู้สึกไม่ค่อยสบาย / ป่วยนิดหน่อย", isCorrect: true },
          { id: "b", text: "ยืนตากฝนอยู่ข้างนอก", isCorrect: false },
          { id: "c", text: "อากาศวันนี้ดีมากๆ", isCorrect: false },
          { id: "d", text: "กำลังดูพยากรณ์อากาศ", isCorrect: false }
        ],
        explanation: "'Under the weather' หมายถึง รู้สึกไม่ค่อยสบาย ตัวร้อน หรือป่วยนิดหน่อย",
        translation: "วันนี้รู้สึกไม่ค่อยสบายเท่าไหร่"
      },
      {
        id: "s3_4",
        situation: "ทำงานมาทั้งวัน หัวหน้าพูดว่า: 'Let's call it a day!'",
        question: "สำนวน 'Call it a day' หมายความว่าอย่างไร?",
        options: [
          { id: "a", text: "พอแค่นี้ก่อน / เลิกงานกลับบ้านได้", isCorrect: true },
          { id: "b", text: "โทรหาฉันตอนกลางวันนะ", isCorrect: false },
          { id: "c", text: "วันนี้วันอะไรนะ", isCorrect: false },
          { id: "d", text: "นับจำนวนวันทำงาน", isCorrect: false }
        ],
        explanation: "'Call it a day' แปลว่า พอแค่นี้ก่อน สำหรับวันนี้ (เลิกงานหรือหยุดพักการทำงานของวันนั้น)",
        translation: "วันนี้พอแค่นี้ก่อน เลิกงานกลับบ้านได้"
      }
    ]
  }
];
