export const MOVIE_CATEGORIES = [
  { id: "all", label: "ทุกแนวหนัง" },
  { id: "action", label: "💥 แอ็กชัน (Action)" },
  { id: "sci-fi", label: "🚀 ไซไฟ (Sci-Fi)" },
  { id: "fantasy", label: "🧙‍♂️ แฟนตาซี (Fantasy)" },
  { id: "romance", label: "❤️ โรแมนติก (Romance)" },
  { id: "slang", label: "💬 สแลงในหนัง (Movie Slang)" },
];

export const MOVIE_VOCAB_DATA = [
  {
    id: "m1",
    category: "fantasy",
    movieGenre: "🧙‍♂️ เวทมนตร์ & แฟนตาซี (Fantasy)",
    sceneDescription: "ฉากอาจารย์ใหญ่พูดเตือนสตินักเรียนหลังผ่านเหตุการณ์อันตราย",
    quoteEn: "It requires great bravery to stand up to our enemies, but just as much to stand up to our friends.",
    quoteTh: "ต้องใช้ความกล้าหาญอย่างมากในการเผชิญหน้ากับศัตรู แต่การยืนหยัดขัดขวางเพื่อนตัวเองนั้นต้องใช้ความกล้าหาญไม่แพ้กัน",
    targetWord: "Bravery",
    ipa: "/ˈbreɪ.vər.i/",
    partOfSpeech: "noun",
    meaningTh: "ความกล้าหาญ, ความใจเด็ด",
    spokenTip: "ในหนังนิยมใช้วลี 'stand up to someone' แปลว่า ยืนหยัดเผชิญหน้ากับ... ไม่ยอมก้มหัวให้",
    breakdown: [
      { word: "Bravery (n.)", meaning: "ความกล้าหาญ" },
      { word: "Stand up to (v. phrase)", meaning: "ยืนหยัดต่อสู้ / ไม่ยอมก้มหัวให้" },
      { word: "Enemy (n.)", meaning: "ศัตรู / ฝ่ายตรงข้าม" }
    ]
  },
  {
    id: "m2",
    category: "action",
    movieGenre: "💥 มหาศึกฮีโร่ (Superhero Action)",
    sceneDescription: "ฉากฮีโร่พูดเตือนสติเพื่อนร่วมทีมก่อนออกไปกู้โลก",
    quoteEn: "Part of the journey is the end. Whatever it takes, we will fix this.",
    quoteTh: "การอวสานก็คือส่วนหนึ่งของการเดินทาง ไม่ว่าจะต้องแลกด้วยอะไรก็ตาม พวกเราจะแก้ไขเรื่องนี้ให้ได้",
    targetWord: "Whatever it takes",
    ipa: "/wɒtˈev.ər ɪt teɪks/",
    partOfSpeech: "idiom",
    meaningTh: "ไม่ว่าจะต้องแลกด้วยอะไรก็ตาม / ไม่ว่าจะยากแค่ไหนก็ตาม",
    spokenTip: "สำนวนนี้เจอบ่อยมากในหนังแนว action/hero ใช้พูดเมื่อตั้งใจทำอะไรบางอย่างอย่างเด็ดเดี่ยว",
    breakdown: [
      { word: "Whatever it takes", meaning: "ทำทุกวิถีทาง / ไม่ว่าจะต้องแลกด้วยอะไร" },
      { word: "Part of...", meaning: "ส่วนหนึ่งของ..." },
      { word: "Fix (v.)", meaning: "ซ่อมแซม / แก้ไขปัญหา" }
    ]
  },
  {
    id: "m3",
    category: "sci-fi",
    movieGenre: "🚀 สำรวจอวกาศ (Sci-Fi / Space)",
    sceneDescription: "ฉากกัปตันยานอวกาศพูดก่อนทะยานเข้าสู่รูหนอนเพื่อหาดาวดวงใหม่",
    quoteEn: "We've always defined ourselves by the ability to overcome the impossible.",
    quoteTh: "มนุษยชาติเรานิยามตัวเองด้วยความสามารถในการก้าวข้ามสิ่งที่เป็นไปไม่ได้เสมอมา",
    targetWord: "Overcome",
    ipa: "/ˌəʊ.vəˈkʌm/",
    partOfSpeech: "verb",
    meaningTh: "ก้าวข้าม, เอาชนะอุปสรรค",
    spokenTip: "'Define ourselves by...' แปลว่า กำหนดหรือนิยามคุณค่าของตัวเองด้วยสิ่ง...",
    breakdown: [
      { word: "Overcome (v.)", meaning: "ก้าวข้ามอุปสรรค / เอาชนะ" },
      { word: "Impossible (adj.)", meaning: "ซึ่งเป็นไปไม่ได้" },
      { word: "Ability (n.)", meaning: "ความสามารถ" }
    ]
  },
  {
    id: "m4",
    category: "slang",
    movieGenre: "💬 สแลงในหนังบทสนทนา (Movie Slang)",
    sceneDescription: "ฉากตัวเอกตอบตกลงเพื่อนแบบสบายๆ ในร้านกาแฟ",
    quoteEn: "I'm down for that! Count me in.",
    quoteTh: "เอาดิ! ฉันเอาด้วยคน นับฉันรวมไปด้วยเลยนะ",
    targetWord: "I'm down",
    ipa: "/aɪm daʊn/",
    partOfSpeech: "slang",
    meaningTh: "ฉันเอาด้วย / สนใจร่วมด้วย (มีความหมายเดียวกับ I'm in)",
    spokenTip: "คำว่า 'I'm down' ในหนังไม่ได้เกี่ยวกับความเศร้าเลย! เป็นสแลงภาษาพูด แปลว่า 'เอาด้วย/ตกลง' (ตรงข้ามกับ I'm out)",
    breakdown: [
      { word: "I'm down", meaning: "ฉันเอาด้วย / ตกลง" },
      { word: "Count me in", meaning: "นับฉันรวมไปด้วยเลย" }
    ]
  },
  {
    id: "m5",
    category: "romance",
    movieGenre: "❤️ เรือรักโรแมนติก (Romance)",
    sceneDescription: "ฉากพระเอกสารภาพความในใจบนดาดฟ้าเรือช่วงพระอาทิตย์ตก",
    quoteEn: "Winning that ticket was the best thing that ever happened to me; it brought me to you.",
    quoteTh: "การชนะตั๋วใบนั้นคือสิ่งที่ดีที่สุดที่เคยเกิดขึ้นกับฉัน เพราะมันพาฉันมาพบกับคุณ",
    targetWord: "Happened to me",
    ipa: "/ˈhæp.ənd/",
    partOfSpeech: "phrase",
    meaningTh: "เกิดขึ้นกับฉัน",
    spokenTip: "ประโยค 'The best thing that ever happened to me' เป็นวลีโรแมนติกยอดฮิตในหนังรัก แปลว่า 'สิ่งที่ดีที่สุดในชีวิต'",
    breakdown: [
      { word: "Ticket (n.)", meaning: "ตั๋ว" },
      { word: "Brought (v. past of bring)", meaning: "นำพา / พามา" }
    ]
  },
  {
    id: "m6",
    category: "action",
    movieGenre: "💥 แอ็กชัน / สายลับ (Action Spy)",
    sceneDescription: "ฉากสายลับพูดเตือนเพื่อนร่วมทีมก่อนลอบเข้าไปในตึกบัญชาการ",
    quoteEn: "Keep your eyes peeled. We only have one shot at this.",
    quoteTh: "คอยจับตาดูให้ดีนะ พวกเรามีโอกาสแค่นี้ครั้งเดียวเท่านั้น",
    targetWord: "Keep your eyes peeled",
    ipa: "/kiːp jɔːr aɪz piːld/",
    partOfSpeech: "idiom",
    meaningTh: "เบิ่งตากว้างๆ คอยสังเกตการณ์อย่างระมัดระวัง",
    spokenTip: "คำว่า 'peeled' เปรียบเหมือนการปอกเปลือกตาออกเพื่อจ้องมองอย่างระมัดระวัง เป็นสำนวนสายลับและหนังบู๊",
    breakdown: [
      { word: "Keep your eyes peeled", meaning: "คอยสังเกตการณ์อย่างระมัดระวัง" },
      { word: "One shot", meaning: "โอกาสเดียวเท่านั้น" }
    ]
  }
];
