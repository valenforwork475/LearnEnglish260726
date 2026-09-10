export const BOSS_STAGES = [
  {
    id: "stage1",
    name: "Airport & Travel Dragon",
    title: "บอสด่านที่ 1: ด่านเอาตัวรอดสนามบิน & เดินทาง",
    icon: "🛫",
    bossName: "Baby Dragon (มังกรจิ๋วตัวกลม)",
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
    bossName: "Coffee Bear (เจ้าหมีคาเฟ่)",
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
    bossName: "Fox Sphinx (จิ้งจอกสฟิงซ์หางนุ่ม)",
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
  },
  {
    id: "stage4",
    name: "Hotel & Taxi Bunny",
    title: "บอสด่านที่ 4: ด่านโรงแรม & การเดินทาง (Hotel & Taxi)",
    icon: "🐰",
    bossName: "Hotel Bunny (กระต่ายน้อยโรงแรม)",
    maxHp: 110,
    bgGradient: "from-pink-950 via-rose-950 to-stone-950",
    questions: [
      {
        id: "s4_1",
        situation: "คุณเพิ่งไปถึงโรงแรม ต้องการเช็กอินห้องพักที่จองไว้",
        question: "ประโยคแจ้งเช็กอินที่สุภาพคือข้อใด?",
        options: [
          { id: "a", text: "Hi, I have a reservation under the name John.", isCorrect: true },
          { id: "b", text: "Give me room key now.", isCorrect: false },
          { id: "c", text: "Where is my bedroom John?", isCorrect: false },
          { id: "d", text: "I want to sleep today.", isCorrect: false }
        ],
        explanation: "'I have a reservation under the name [ชื่อ]' แปลว่า ฉันได้จองห้องไว้ในนามชื่อ... เป็นประโยคเช็กอินมาตรฐาน",
        translation: "สวัสดีครับ/ค่ะ ฉันได้ทำการจองห้องพักไว้ในชื่อคุณ John"
      },
      {
        id: "s4_2",
        situation: "ต้องการขอให้เคาน์เตอร์โรงแรมช่วยเรียกแท็กซี่ไปส่งที่สนามบิน",
        question: "ประโยคขอความช่วยเหลือที่ถูกต้องคือข้อใด?",
        options: [
          { id: "a", text: "Could you call a taxi for me to the airport, please?", isCorrect: true },
          { id: "b", text: "Taxi airport go now.", isCorrect: false },
          { id: "c", text: "Drive car to airport for me.", isCorrect: false },
          { id: "d", text: "Where is taxi man?", isCorrect: false }
        ],
        explanation: "'Could you call a taxi for me...?' เป็นการขอให้เจ้าหน้าที่โรงแรมช่วยเรียกแท็กซี่ให้อย่างสุภาพ",
        translation: "ช่วยเรียกแท็กซี่ไปสนามบินให้ฉันหน่อยได้ไหมครับ/ค่ะ?"
      },
      {
        id: "s4_3",
        situation: "แอร์ในห้องพักโรงแรมเสีย ไม่เย็นเลย",
        question: "ประโยคแจ้งพนักงานโรงแรมที่ดีที่สุดคือข้อใด?",
        options: [
          { id: "a", text: "Excuse me, the air conditioning in my room isn't working.", isCorrect: true },
          { id: "b", text: "Air is hot bad room.", isCorrect: false },
          { id: "c", text: "Why room no cold?", isCorrect: false },
          { id: "d", text: "Fix air fast now.", isCorrect: false }
        ],
        explanation: "'The air conditioning isn't working' เป็นประโยคสุภาพบอกว่าเครื่องปรับอากาศไม่ทำงาน/เสีย",
        translation: "ขอโทษนะครับ/ค่ะ แอร์ในห้องของฉันไม่ทำงานครับ"
      }
    ]
  },
  {
    id: "stage5",
    name: "Shopping Slime",
    title: "บอสด่านที่ 5: ด่านช้อปปิ้ง & ซื้อของ (Shopping Expert)",
    icon: "🧪",
    bossName: "Shopping Slime (สไลม์ขาช้อปปิ้ง)",
    maxHp: 100,
    bgGradient: "from-emerald-950 via-teal-950 to-stone-950",
    questions: [
      {
        id: "s5_1",
        situation: "ลองเสื้อแล้วใส่ไม่ได้ อยากขอดูขนาดที่ใหญ่ขึ้นอีกไซซ์หนึ่ง",
        question: "ควรถามพนักงานร้านว่าอย่างไร?",
        options: [
          { id: "a", text: "Do you have this in a larger size?", isCorrect: true },
          { id: "b", text: "Give me big shirt.", isCorrect: false },
          { id: "c", text: "This shirt is too small for big body.", isCorrect: false },
          { id: "d", text: "Change shirt size big now.", isCorrect: false }
        ],
        explanation: "'Do you have this in a larger size / smaller size?' เป็นประโยคถามหาเสื้อผ้าไซซ์ใหญ่ขึ้นหรือเล็กลง",
        translation: "เสื้อแบบนี้มีไซซ์ใหญ่กว่านี้ไหมครับ/ค่ะ?"
      },
      {
        id: "s5_2",
        situation: "ต้องการถามพนักงานว่าสินค้าชิ้นนี้มีส่วนลดราคาไหม",
        question: "ประโยคถามส่วนลดที่นิยมใช้คือข้อใด?",
        options: [
          { id: "a", text: "Is there any discount on this item?", isCorrect: true },
          { id: "b", text: "Can you make it cheap?", isCorrect: false },
          { id: "c", text: "Minus money this item.", isCorrect: false },
          { id: "d", text: "Discount now please.", isCorrect: false }
        ],
        explanation: "'Is there any discount on this item?' แปลว่า สินค้าชิ้นนี้มีส่วนลดบ้างไหมครับ/ค่ะ",
        translation: "สินค้าชิ้นนี้มีส่วนลดบ้างไหมครับ/ค่ะ?"
      },
      {
        id: "s5_3",
        situation: "ซื้อของเสร็จแล้ว ต้องการขอถุงใส่สินค้าเพิ่มอีก 1 ใบ",
        question: "ประโยคขอถุงพลาสติก/ถุงกระดาษที่สุภาพคือข้อใด?",
        options: [
          { id: "a", text: "Could I get a bag for this, please?", isCorrect: true },
          { id: "b", text: "Give me plastic bag.", isCorrect: false },
          { id: "c", text: "Put in bag now.", isCorrect: false },
          { id: "d", text: "I want bag free.", isCorrect: false }
        ],
        explanation: "'Could I get a bag for this, please?' เป็นการขอถุงใส่สินค้าอย่างสุภาพ",
        translation: "ขอถุงใส่ของใบนี้หน่อยได้ไหมครับ/ค่ะ?"
      }
    ]
  },
  {
    id: "stage6",
    name: "Pharmacy & Medical Kitty",
    title: "บอสด่านที่ 6: ด่านร้านขายยา & สุขภาพ (Medical Survival)",
    icon: "🐱",
    bossName: "Medical Kitty (เหมียวน้อยพยาบาล)",
    maxHp: 110,
    bgGradient: "from-cyan-950 via-sky-950 to-slate-950",
    questions: [
      {
        id: "s6_1",
        situation: "รู้สึกเจ็บคอและปวดหัว ต้องการขอยาที่ร้านขายยาต่างประเทศ",
        question: "ประโยคบอกอาการป่วยกับเภสัชกรคือข้อใด?",
        options: [
          { id: "a", text: "I have a sore throat and a headache.", isCorrect: true },
          { id: "b", text: "My neck is pain and head is hot.", isCorrect: false },
          { id: "c", text: "Give me medicine for sick.", isCorrect: false },
          { id: "d", text: "I am pain everywhere.", isCorrect: false }
        ],
        explanation: "'sore throat' แปลว่า เจ็บคอ และ 'headache' แปลว่า ปวดหัว เป็นการบอกอาการป่วยที่ถูกต้อง",
        translation: "ฉันมีอาการเจ็บคอและปวดหัวครับ/ค่ะ"
      },
      {
        id: "s6_2",
        situation: "ต้องการถามหายาบรรเทาอาการเป็นไข้หวัดในร้านขายยา",
        question: "ประโยคขอยาแก้ไข้หวัดที่สุภาพคือข้อใด?",
        options: [
          { id: "a", text: "Do you have anything for a cold?", isCorrect: true },
          { id: "b", text: "Sell me cold medicine fast.", isCorrect: false },
          { id: "c", text: "I want cold drug.", isCorrect: false },
          { id: "d", text: "Medicine for water nose.", isCorrect: false }
        ],
        explanation: "'Do you have anything for [อาการป่วย]?' แปลว่า มียาสำหรับบรรเทาอาการ... ไหมครับ (a cold = ไข้หวัด)",
        translation: "มียาบรรเทาอาการไข้หวัดไหมครับ/ค่ะ?"
      }
    ]
  }
];
