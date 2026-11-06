// ============================================================
// MUAY THAI INTELLIGENCE — BOOTH KIOSK CONFIG (TH / EN)
// ข้อความทุกช่องมี th และ en  |  schedule: ใส่ {time,name,role} ต่อวัน แล้วจะขึ้นแถบ TODAY หน้าแรก
// ============================================================
window.KIOSK = {
 "idleSeconds": 45,
 "attract": {
  "bg": "media/bg_vertical.mp4",
  "reel": "media/muaythai_intel.mp4"
 },
 "ui": {
  "tap": {
   "th": "แตะเพื่อเริ่ม",
   "en": "Tap to start"
  },
  "tapSub": {
   "th": "ดูว่าเราเก็บข้อมูลมวยไทยจากไหน และนำไปใช้อย่างไร",
   "en": "See where our Muay Thai data comes from, and how it is used"
  },
  "sub": {
   "th": "ข้อมูลการเคลื่อนไหวของนักมวยไทย จากอดีตถึงปัจจุบัน",
   "en": "Muay Thai movement data, from past to present"
  },
  "homeKicker": {
   "th": "ระบบทำงานยังไง",
   "en": "How it works"
  },
  "homeH1": {
   "th": "เก็บจาก 3 แหล่ง",
   "en": "3 sources of data"
  },
  "homeH2": {
   "th": "สู่การใช้งานจริง",
   "en": "Put to real use"
  },
  "secCapture": {
   "th": "เก็บข้อมูล",
   "en": "Capture"
  },
  "secUse": {
   "th": "นำไปใช้",
   "en": "Put to use"
  },
  "back": {
   "th": "กลับ",
   "en": "Back"
  },
  "get": {
   "th": "ได้อะไร",
   "en": "What it gives"
  },
  "ask": {
   "th": "มีคำถาม? ถามทีมงานที่บูธได้เลย",
   "en": "Questions? Ask our team at the booth"
  },
  "partners": {
   "th": "พาร์ทเนอร์ของเรา",
   "en": "Our partners"
  },
  "partnersSub": {
   "th": "แตะโลโก้เพื่อดูงานที่ทำร่วมกัน",
   "en": "Tap a logo to see our work together"
  },
  "askStaff": {
   "th": "ถามทีมงานที่บูธ เพื่อดูงานที่ทำร่วมกัน",
   "en": "Ask our team at the booth to see our work together"
  },
  "scan": {
   "th": "สแกนเพื่อดูงานเพิ่มเติม",
   "en": "Scan to see more"
  },
  "next": {
   "th": "ขั้นต่อไป",
   "en": "Next step"
  },
  "done": {
   "th": "กลับหน้าหลัก",
   "en": "Back to home"
  },
  "navBack": {
   "th": "ย้อนกลับ",
   "en": "Back"
  },
  "navHome": {
   "th": "หน้าหลัก",
   "en": "Home"
  },
  "navPartners": {
   "th": "พาร์ทเนอร์",
   "en": "Partners"
  },
  "nextChapter": {
   "th": "บทต่อไป",
   "en": "Next chapter"
  },
  "hint": {
   "th": "แตะหัวข้อที่สนใจ เพื่อดูวิดีโอและคำอธิบาย",
   "en": "Tap any topic to see the video and how it works"
  },
  "demo": {
   "th": "กำลังสาธิต · แตะหน้าจอเพื่อใช้งานเอง",
   "en": "Demo mode · Touch the screen to explore"
  },
  "caseKicker": {
   "th": "ตัวอย่างการใช้งานจริงโดยพาร์ทเนอร์",
   "en": "PARTNER USE CASE"
  },
  "caseTitle": {
   "th": "SIAM RUMBLE",
   "en": "SIAM RUMBLE"
  },
  "caseSub": {
   "th": "verse. นำข้อมูลท่ามวยไทยไปสร้างแอนิเมชัน",
   "en": "verse. turns Muay Thai movement data into animation"
  },
  "caseTile": {
   "th": "ข้อมูลจริง สู่แอนิเมชัน",
   "en": "From real data to animation"
  },
  "sound": {
   "th": "เปิดเสียง",
   "en": "Sound on"
  },
  "soundOff": {
   "th": "ปิดเสียง",
   "en": "Sound off"
  }
 },
 "tracks": [
  {
   "id": "tape",
   "group": "capture",
   "no": "01",
   "accent": "#3da5ff",
   "title": "FROM TAPE",
   "sub": {
    "th": "เก็บจากเทปการแข่งขันในอดีต",
    "en": "Captured from archive fight tapes"
   },
   "poster": "media/p_arc_3d.jpg",
   "flow": [
    [
     "FOOTAGE",
     {
      "th": "เทปเก่า ภาพจากกล้องเดียว",
      "en": "Archive tape, one camera"
     }
    ],
    [
     "TRACK",
     {
      "th": "AI จับโครงร่างทีละฝั่ง",
      "en": "AI tracks each fighter"
     }
    ],
    [
     "LIFT",
     {
      "th": "ยกท่าจาก 2D เป็น 3D",
      "en": "Lift 2D poses into 3D"
     }
    ],
    [
     "LABEL",
     {
      "th": "ระบุอาวุธทีละครั้ง",
      "en": "Label every strike"
     }
    ]
   ],
   "steps": [
    {
     "k": "2D TRACKING",
     "h": {
      "th": "AI จับโครงร่างนักมวยทีละฝั่ง",
      "en": "AI tracks each fighter"
     },
     "d": {
      "th": "AI หาข้อต่อของนักมวยทั้งสองฝั่งทุกเฟรมจากเทปเก่า แล้วล็อกฝั่งแดงและน้ำเงินไว้ไม่ให้สลับกันตลอดยก",
      "en": "AI finds both fighters' joints in every frame of the old tape, keeping red and blue locked to the right fighter for the whole round."
     },
     "g": {
      "th": "ท่าทางของนักมวยในอดีต ที่ไม่เคยถูกเก็บเป็นข้อมูลมาก่อน",
      "en": "Past fighters' movement, recorded as data for the first time"
     },
     "video": "media/arc_2d.mp4",
     "poster": "media/p_arc_2d.jpg",
     "n": {
      "th": "กล้องเดียววัดระยะจริงไม่ได้ ความเร็วจึงเป็นค่าเทียบ (SPEED INDEX) ไม่ใช่เมตรต่อวินาที",
      "en": "One camera cannot measure real distance, so speed is a relative SPEED INDEX, not m/s."
     }
    },
    {
     "k": "ARCHIVE → 3D",
     "h": {
      "th": "ยกท่าจากเทป ขึ้นมาเป็น 3D",
      "en": "From tape to 3D"
     },
     "d": {
      "th": "ท่าที่ตามได้จากภาพ 2D ถูกยกเป็นโครงร่าง 3D บนเวทีเสมือน วางข้างภาพเทปต้นฉบับให้เทียบกันได้",
      "en": "Poses tracked in 2D are lifted into 3D figures on a virtual ring, shown beside the original tape for comparison."
     },
     "g": {
      "th": "หมุนดูจังหวะจากมุมที่กล้องถ่ายทอดสดไม่เคยมี",
      "en": "See the action from angles the broadcast never had"
     },
     "video": "media/arc_3d_a.mp4",
     "poster": "media/p_arc_3d_a.jpg"
    },
    {
     "k": "STRIKE LABEL",
     "h": {
      "th": "ระบุอาวุธ บนข้อมูล 3D",
      "en": "Strike labels on 3D data"
     },
     "d": {
      "th": "แต่ละจังหวะถูกติดป้ายว่าใครออกอาวุธอะไร เช่น ฝั่ง A เตะขวา ฝั่ง B เตะซ้าย",
      "en": "Every exchange is labelled with who threw what, such as Fighter A right kick or Fighter B left kick."
     },
     "g": {
      "th": "ไล่ดูเกมการชกย้อนหลังได้ทีละอาวุธ",
      "en": "Replay past fights strike by strike"
     },
     "video": "media/arc_3d.mp4",
     "poster": "media/p_arc_3d.jpg"
    }
   ]
  },
  {
   "id": "studio",
   "group": "capture",
   "no": "02",
   "accent": "#ff2a2a",
   "title": "FROM STUDIO",
   "sub": {
    "th": "เชิญนักมวยตัวจริง มาเก็บท่าในสตูดิโอ",
    "en": "Real fighters, captured in the studio"
   },
   "poster": "media/p_cap_8cam.jpg",
   "flow": [
    [
     "CAPTURE",
     {
      "th": "กล้อง 8 ตัว 60 เฟรมต่อวินาที",
      "en": "8 cameras, 60 fps"
     }
    ],
    [
     "SYNC",
     {
      "th": "calibrate และซิงก์เวลา",
      "en": "Calibrate and sync"
     }
    ],
    [
     "SOLVE",
     {
      "th": "โครงกระดูก 3D ทุกเฟรม",
      "en": "3D skeleton every frame"
     }
    ],
    [
     "ANALYZE",
     {
      "th": "วัดความเร็ว นับอาวุธ",
      "en": "Speed and strike count"
     }
    ]
   ],
   "steps": [
    {
     "k": "CAPTURE",
     "h": {
      "th": "กล้อง 8 ตัว ถ่ายพร้อมกัน",
      "en": "8 cameras, all at once"
     },
     "d": {
      "th": "กล้อง 8 ตัวรอบพื้นที่ซ้อม ถ่ายพร้อมกันที่ 60 เฟรมต่อวินาที ทุกกล้องรู้ตำแหน่งตัวเองและใช้นาฬิกาเวลาเดียวกัน",
      "en": "Eight cameras around the training floor record together at 60 fps. Each camera knows its exact position and shares one clock."
     },
     "g": {
      "th": "นักมวยไม่ต้องใส่ชุดหรือติด marker ชกได้เต็มที่แบบปกติ",
      "en": "No suits or markers: fighters move naturally"
     },
     "video": "media/cap_8cam.mp4",
     "poster": "media/p_cap_8cam.jpg"
    },
    {
     "k": "3D SKELETON",
     "h": {
      "th": "รวมภาพทุกมุม เป็นโครงกระดูก 3D",
      "en": "Every angle, one 3D skeleton"
     },
     "d": {
      "th": "ระบบรวมภาพจากทุกมุม หาตำแหน่งข้อต่อในพื้นที่ 3 มิติทีละเฟรม มุมที่ถูกบังจะมีกล้องตัวอื่นเห็นแทน",
      "en": "The system combines every angle to locate each joint in 3D, frame by frame. When one camera is blocked, another one sees it."
     },
     "g": {
      "th": "โครงกระดูก 3D ที่หมุนดูได้รอบทิศ",
      "en": "A 3D skeleton you can view from any side"
     },
     "video": "media/cap_skeleton.mp4",
     "poster": "media/p_cap_skeleton.jpg"
    },
    {
     "k": "2 FIGHTERS",
     "h": {
      "th": "ตามนักมวย 2 คนพร้อมกัน",
      "en": "Two fighters tracked together"
     },
     "d": {
      "th": "แยกโครงกระดูกของนักมวยแต่ละฝั่งออกจากกัน แม้ตอนเข้าวงในหรือปะทะกันใกล้ๆ",
      "en": "Each fighter's skeleton is kept separate, even in the clinch or at close range."
     },
     "g": {
      "th": "เห็นระยะ จังหวะ และการตอบโต้ของทั้งสองฝั่งในฉากเดียว",
      "en": "Distance, timing and counters for both sides in one view"
     },
     "video": "media/cap_bones.mp4",
     "poster": "media/p_cap_bones.jpg"
    },
    {
     "k": "STRIKE ANALYSIS",
     "h": {
      "th": "วัดความเร็ว นับหมัด เตะ เข่า ศอก",
      "en": "Speed and strike count"
     },
     "d": {
      "th": "ข้อมูล 3D บอกความเร็วจริงของมือและเท้าเป็นเมตรต่อวินาที ทีมงานยืนยันประเภทอาวุธทีละครั้ง ก่อนขึ้นเป็นกราฟิกบนภาพจริง",
      "en": "3D data measures real hand and foot speed in m/s. Our team confirms each strike type before it appears as on-screen graphics."
     },
     "g": {
      "th": "สถิติอาวุธและความเร็ว ที่ตรวจสอบได้",
      "en": "Strike and speed statistics you can verify"
     },
     "video": "media/cap_hud.mp4",
     "poster": "media/p_cap_hud.jpg"
    }
   ]
  },
  {
   "id": "ring",
   "group": "capture",
   "no": "03",
   "accent": "#ffc400",
   "title": "FROM THE RING",
   "sub": {
    "th": "เก็บจากการแข่งขันจริง ที่เวที THAI FIGHT",
    "en": "Captured at live THAI FIGHT events"
   },
   "poster": "media/p_ring_4cam.jpg",
   "flow": [
    [
     "4 CAMERAS",
     {
      "th": "กล้อง 4 ตัวรอบเวที",
      "en": "4 cameras around the ring"
     }
    ],
    [
     "CALIBRATE",
     {
      "th": "เดินบอร์ด calibrate เวที",
      "en": "Calibrate with a board"
     }
    ],
    [
     "3D",
     {
      "th": "สร้างนักมวย 3D",
      "en": "Build 3D fighters"
     }
    ],
    [
     "COUNT",
     {
      "th": "นับอาวุธ วัดความเร็ว",
      "en": "Count strikes, measure speed"
     }
    ]
   ],
   "steps": [
    {
     "k": "4 CAMERAS",
     "h": {
      "th": "กล้อง 4 ตัว รอบเวทีแข่งจริง",
      "en": "4 cameras around a live ring"
     },
     "d": {
      "th": "ติดกล้อง 4 ตัวรอบเวที THAI FIGHT บันทึกการชกจริงตลอดรายการ ต่อหน้าคนดูเต็มฮอลล์",
      "en": "Four cameras surround the THAI FIGHT ring, recording real bouts all night in front of a packed hall."
     },
     "g": {
      "th": "ภาพการแข่งขันจริง จากหลายมุมพร้อมกัน",
      "en": "Real fight footage from several angles at once"
     },
     "video": "media/ring_4cam.mp4",
     "poster": "media/p_ring_4cam.jpg"
    },
    {
     "k": "CALIBRATE",
     "h": {
      "th": "ตั้งค่ากล้องบนเวทีจริง",
      "en": "Calibrating the real ring"
     },
     "d": {
      "th": "ก่อนเริ่มการแข่ง ทีมงานเดินถือบอร์ด calibrate ไปทั่วเวที ให้ระบบรู้ตำแหน่งกล้องและขนาดเวที",
      "en": "Before the fights, our team walks a calibration board across the ring so the system knows each camera's position and the size of the ring."
     },
     "g": {
      "th": "ทุกกล้องผูกกับพิกัดเวทีเดียวกัน พร้อมคำนวณ 3D",
      "en": "Every camera locked to the same ring coordinates, ready for 3D"
     },
     "video": "media/ring_calib.mp4",
     "poster": "media/p_ring_calib.jpg"
    },
    {
     "k": "3D + COUNT",
     "h": {
      "th": "นักมวย 3D นับอาวุธ วัดความเร็ว",
      "en": "3D fighters, strikes and speed"
     },
     "d": {
      "th": "ภาพจาก 4 กล้องถูกรวมเป็นนักมวย 3D บนเวที แล้วนับหมัด เตะ เข่า ศอก ของฝั่ง A และ B พร้อมความเร็วแต่ละครั้ง",
      "en": "Views from all four cameras combine into 3D fighters on the ring. The system counts punches, kicks, knees and elbows for Fighter A and B, with the speed of each."
     },
     "g": {
      "th": "สถิติการชก ที่วัดจากเวทีแข่งขันจริง",
      "en": "Fight statistics measured at a real event"
     },
     "video": "media/ring_3d.mp4",
     "poster": "media/p_ring_3d.jpg"
    }
   ]
  },
  {
   "id": "use",
   "group": "use",
   "no": "04",
   "accent": "#2ee6a6",
   "title": "PUT TO USE",
   "sub": {
    "th": "นำข้อมูลไปใช้ และพัฒนาต่อ",
    "en": "Using the data, and building on it"
   },
   "poster": "media/p_ring_3d.jpg",
   "flow": [
    [
     "REFEREE",
     {
      "th": "ผู้ช่วยกรรมการ",
      "en": "Referee assist"
     }
    ],
    [
     "COACHING",
     {
      "th": "โค้ชชิ่งและการศึกษา",
      "en": "Coaching and education"
     }
    ],
    [
     "DIGITAL IP",
     {
      "th": "สิทธิ์ดิจิทัลของนักมวย",
      "en": "Fighters' digital rights"
     }
    ],
    [
     "HERITAGE",
     {
      "th": "อนุรักษ์ภูมิปัญญา",
      "en": "Preserving heritage"
     }
    ],
    [
     "RESEARCH",
     {
      "th": "วิจัย อดีตถึงปัจจุบัน",
      "en": "Research, past to present"
     }
    ]
   ],
   "steps": [
    {
     "k": "REFEREE ASSIST",
     "h": {
      "th": "ผู้ช่วยกรรมการบนเวที",
      "en": "Referee assist"
     },
     "d": {
      "th": "จำนวนอาวุธและความเร็วของแต่ละฝั่ง เป็นข้อมูลประกอบให้กรรมการ ช่วยทบทวนจังหวะสำคัญระหว่างการแข่ง",
      "en": "Strike counts and speed for each side give referees extra information to review key moments during a fight."
     },
     "g": {
      "th": "การตัดสินที่มีข้อมูลรองรับ",
      "en": "Decisions backed by data"
     },
     "video": "media/ring_3d.mp4",
     "poster": "media/p_ring_3d.jpg",
     "n": {
      "th": "ระบบเป็นผู้ช่วยประกอบการตัดสิน ไม่ได้ตัดสินแทนกรรมการ",
      "en": "The system supports referees. It does not replace them."
     }
    },
    {
     "k": "COACHING",
     "h": {
      "th": "โค้ชชิ่ง และการศึกษา",
      "en": "Coaching and education"
     },
     "d": {
      "th": "นักมวยและโค้ชดูท่าของตัวเองแบบ 3D เทียบความเร็วและจังหวะกับต้นแบบ และใช้เป็นสื่อการสอนมวยไทย",
      "en": "Fighters and coaches review technique in 3D and compare speed and timing against a reference. The same data becomes material for teaching Muay Thai."
     },
     "g": {
      "th": "ฝึกและสอนจากข้อมูลจริง ไม่ใช่แค่ความรู้สึก",
      "en": "Train and teach from real data, not just feel"
     },
     "video": "media/cap_hud.mp4",
     "poster": "media/p_cap_hud.jpg"
    },
    {
     "k": "DIGITAL IP",
     "h": {
      "th": "บันทึก IP ปกป้องสิทธิ์ดิจิทัลของนักมวย",
      "en": "Protecting fighters' digital rights"
     },
     "d": {
      "th": "ท่า สไตล์ และจังหวะเฉพาะตัวของนักมวย ถูกบันทึกเป็นข้อมูลที่ระบุเจ้าของได้ ก่อนถูกนำไปใช้ในเกม แอนิเมชัน หรือ AI",
      "en": "A fighter's moves, style and timing are recorded as data with a clear owner, before they are used in games, animation or AI."
     },
     "g": {
      "th": "นักมวยเป็นเจ้าของข้อมูลการเคลื่อนไหวของตัวเอง",
      "en": "Fighters own their movement data"
     },
     "video": "media/cap_motion.mp4",
     "poster": "media/p_cap_motion.jpg"
    },
    {
     "k": "HERITAGE",
     "h": {
      "th": "อนุรักษ์ภูมิปัญญามวยไทย",
      "en": "Preserving Muay Thai heritage"
     },
     "d": {
      "th": "ท่ามวยของนักมวยรุ่นตำนานถูกเก็บเป็นข้อมูล 3D ไม่สูญหายไปตามกาลเวลา",
      "en": "The techniques of legendary fighters are kept as 3D data, so they are not lost over time."
     },
     "g": {
      "th": "คลังภูมิปัญญามวยไทย สำหรับคนรุ่นต่อไป",
      "en": "A Muay Thai knowledge archive for future generations"
     },
     "video": "media/arc_3d_a.mp4",
     "poster": "media/p_arc_3d_a.jpg"
    },
    {
     "k": "RESEARCH",
     "h": {
      "th": "มวยอดีตถึงปัจจุบัน ต่างกันอย่างไร",
      "en": "How Muay Thai has changed"
     },
     "d": {
      "th": "เทียบข้อมูลจากเทปเก่า กับข้อมูลจากสตูดิโอและเวทีปัจจุบัน ดูว่าท่า จังหวะ และสไตล์ของมวยไทยพัฒนาไปทางไหน",
      "en": "Compare data from archive tapes with today's studio and ring data to see how technique, timing and style have evolved."
     },
     "g": {
      "th": "ฐานข้อมูลสำหรับงานวิจัย และการศึกษามวยไทยต่อยอด",
      "en": "A foundation for Muay Thai research and study"
     },
     "video": "media/use_compare.mp4",
     "poster": "media/p_use_compare.jpg"
    }
   ]
  }
 ],
 "partners": {
  "poweredBy": {
   "name": "ORIGINALS STUDIO",
   "logo": "brand/partners/originals.png"
  },
  "groups": [
   {
    "title": {
     "th": "พาร์ทเนอร์",
     "en": "PARTNERS"
    },
    "items": [
     {
      "id": "thaifight",
      "name": "THAI FIGHT",
      "logo": "brand/partners/thaifight.png"
     },
     {
      "id": "codehard",
      "name": "Code(Hard);",
      "logo": "brand/partners/codehard.png"
     },
     {
      "id": "verse",
      "name": "verse.",
      "logo": "brand/partners/verse.png",
      "line": "AI-GENERATED PRODUCTION",
      "url": "https://www.versemedia.io",
      "urlLabel": "WWW.VERSEMEDIA.IO",
      "case": true
     },
     {
      "id": "chyron",
      "name": "Chyron",
      "logo": "brand/partners/chyron.png"
     },
     {
      "id": "mosys",
      "name": "mo-sys",
      "logo": "brand/partners/mosys.png"
     }
    ]
   },
   {
    "title": {
     "th": "สนับสนุนโดย",
     "en": "SUPPORTED BY"
    },
    "items": [
     {
      "id": "mhesi",
      "name": "MHESI",
      "logo": "brand/partners/mhesi.png"
     },
     {
      "id": "pmuc",
      "name": "PMU-C",
      "logo": "brand/partners/pmu-c.png"
     },
     {
      "id": "kmitl",
      "name": "KMITL",
      "logo": "brand/partners/kmitl.png"
     },
     {
      "id": "ciim",
      "name": "CIIM",
      "logo": "brand/partners/ciim.png"
     }
    ]
   }
  ]
 },
 "schedule": {
  "2026-11-05": [],
  "2026-11-06": [],
  "2026-11-07": [],
  "2026-11-08": []
 },
 "case": {
  "partner": "verse",
  "video": "media/case_siamrumble.mp4",
  "poster": "media/p_case_siamrumble.jpg"
 },
 "demoAfterSeconds": 12
};
