// ============================================================
//  MUAY THAI INTELLIGENCE — BOOTH KIOSK CONFIG
//  แก้ข้อความ / วีดีโอ / ตาราง / partner ได้ที่ไฟล์นี้ไฟล์เดียว
// ============================================================
window.KIOSK = {
  idleSeconds: 60, // ไม่มีใครแตะกี่วินาที กลับหน้า loop

  attract: {
    bg: "media/bg_vertical.mp4",
    reel: "media/muaythai_intel.mp4", // วีดีโอใน band กลางจอ (mute)
    kicker: "BOOTH · LIVE DEMO"
  },

  // ---------- วีดีโอหลักของบูธ ----------
  mainVtr: {
    no: "VTR", title: "MUAY THAI INTELLIGENCE",
    th: "ข้อมูลการเคลื่อนไหวของนักมวยระดับตำนาน",
    desc: "จากการจับท่าด้วยกล้อง 8 ตัว และฟุตเทจเก่า สู่ข้อมูล 3D ที่ใช้ต่อได้ทั้งเกม กีฬาวิทยาศาสตร์ และงานบันเทิง",
    video: "media/muaythai_intel.mp4", poster: "media/poster_muaythai.jpg", accent: "#ff2a2a"
  },

  partnerVtr: {
    no: "PARTNER VTR · verse.", title: "AI SHOWREEL", th: "AI-GENERATED PRODUCTION",
    desc: "งานโปรดักชันที่สร้างด้วย AI โดยพาร์ทเนอร์ของเรา",
    video: "media/ai_showreel.mp4", poster: "media/poster_showreel.jpg", accent: "#ffc400"
  },

  // ---------- HOW IT WORKS : แต่ละระบบกดดูทีละขั้น ----------
  tracks: [
  {
    "id": "tape",
    "no": "01",
    "accent": "#3da5ff",
    "title": "FROM TAPE",
    "th": "ถอดท่ามวยจากเทปการแข่งขันเก่า",
    "sum": "เทปถ่ายทอดสดในอดีตมีภาพจากกล้องเดียว AI ตามตัวนักมวยแต่ละฝั่ง แล้วยกท่าขึ้นเป็น 3D",
    "poster": "media/p_arc_3d.jpg",
    "flow": [
      [
        "FOOTAGE",
        "เทปถ่ายทอดสด กล้องเดียว"
      ],
      [
        "TRACK",
        "AI จับโครงร่างทีละฝั่ง"
      ],
      [
        "LIFT",
        "ยกจาก 2D เป็น 3D"
      ],
      [
        "LABEL",
        "ระบุอาวุธทีละครั้ง"
      ]
    ],
    "steps": [
      {
        "k": "2D TRACKING",
        "th": "AI จับโครงร่างนักมวยทีละฝั่ง",
        "desc": "AI หาข้อต่อของนักมวยทั้งสองฝั่งทุกเฟรมจากเทปเก่า แล้วล็อกฝั่งแดง/น้ำเงินไว้ไม่ให้สลับกันตลอดยก",
        "get": "ท่าทางของนักมวยในอดีต ที่ไม่เคยถูกเก็บเป็นข้อมูลมาก่อน",
        "video": "media/arc_2d.mp4",
        "poster": "media/p_arc_2d.jpg",
        "note": "กล้องเดียววัดระยะจริงไม่ได้ ความเร็วจึงเป็น SPEED INDEX ไว้เทียบกัน ไม่ใช่ m/s"
      },
      {
        "k": "ARCHIVE → 3D",
        "th": "ยกท่าจากเทป ขึ้นมาเป็น 3D",
        "desc": "ท่าที่ตามได้จากภาพ 2D ถูกยกขึ้นเป็นโครงร่าง 3D บนเวทีเสมือน วางข้างภาพเทปต้นฉบับให้เทียบกันได้",
        "get": "หมุนดูจังหวะจากมุมที่กล้องถ่ายทอดสดไม่เคยมี",
        "video": "media/arc_3d_a.mp4",
        "poster": "media/p_arc_3d_a.jpg"
      },
      {
        "k": "STRIKE LABEL",
        "th": "ระบุอาวุธ บนข้อมูล 3D",
        "desc": "แต่ละจังหวะถูกติดป้ายว่าใครออกอาวุธอะไร เช่น FIGHTER A เตะขวา, FIGHTER B เตะซ้าย",
        "get": "ไล่ดูเกมการชกย้อนหลังได้ทีละอาวุธ",
        "video": "media/arc_3d.mp4",
        "poster": "media/p_arc_3d.jpg"
      }
    ]
  },
  {
    "id": "studio",
    "no": "02",
    "accent": "#ff2a2a",
    "title": "FROM STUDIO",
    "th": "จับท่าจากนักมวยจริง ด้วยกล้อง 8 ตัว",
    "sum": "ไม่ต้องติด marker บนตัว กล้องรอบพื้นที่ช่วยกันคำนวณโครงกระดูก 3D ทุกเฟรม",
    "poster": "media/p_cap_8cam.jpg",
    "flow": [
      [
        "CAPTURE",
        "กล้อง 8 ตัว 60 fps"
      ],
      [
        "SYNC",
        "calibrate + ซิงก์เวลา"
      ],
      [
        "SOLVE",
        "โครงกระดูก 3D ทุกเฟรม"
      ],
      [
        "ANALYZE",
        "วัดความเร็ว นับอาวุธ"
      ]
    ],
    "steps": [
      {
        "k": "CAPTURE",
        "th": "กล้อง 8 ตัว ถ่ายพร้อมกัน",
        "desc": "กล้อง 8 ตัวรอบพื้นที่ซ้อม ถ่ายพร้อมกันที่ 60 fps ทุกกล้องรู้ตำแหน่งตัวเองจากการ calibrate และใช้นาฬิกาเวลาเดียวกัน",
        "get": "นักมวยไม่ต้องใส่ชุดหรือติด marker ชกได้เต็มที่แบบปกติ",
        "video": "media/cap_8cam.mp4",
        "poster": "media/p_cap_8cam.jpg"
      },
      {
        "k": "3D SKELETON",
        "th": "รวมภาพทุกมุม เป็นโครงกระดูก 3D",
        "desc": "ระบบเอาภาพจากทุกมุมมาหาตำแหน่งข้อต่อในพื้นที่ 3 มิติทีละเฟรม มุมที่ถูกบังจะมีกล้องตัวอื่นเห็นแทน",
        "get": "โครงกระดูก 3D ที่หมุนดูได้รอบทิศ",
        "video": "media/cap_skeleton.mp4",
        "poster": "media/p_cap_skeleton.jpg"
      },
      {
        "k": "2 FIGHTERS",
        "th": "ตามนักมวย 2 คนพร้อมกัน",
        "desc": "แยกโครงกระดูกของนักมวยแต่ละฝั่งออกจากกัน แม้ตอนเข้าวงในหรือปะทะกันใกล้ๆ",
        "get": "เห็นระยะ จังหวะ และการตอบโต้ของทั้งสองฝั่งในฉากเดียว",
        "video": "media/cap_bones.mp4",
        "poster": "media/p_cap_bones.jpg"
      },
      {
        "k": "STRIKE ANALYSIS",
        "th": "วัดความเร็ว นับหมัด เตะ เข่า ศอก",
        "desc": "ข้อมูล 3D บอกความเร็วจริงของมือและเท้าเป็นเมตร/วินาที ทีมงานยืนยันประเภทอาวุธทีละครั้ง ก่อนขึ้นเป็น HUD บนภาพจริง",
        "get": "สถิติอาวุธและความเร็ว ที่ตรวจสอบได้",
        "video": "media/cap_hud.mp4",
        "poster": "media/p_cap_hud.jpg"
      }
    ]
  },
  {
    "id": "ring",
    "no": "03",
    "accent": "#ffc400",
    "title": "TO THE RING",
    "th": "สู่เวทีแข่งจริง ที่ THAI FIGHT",
    "sum": "ติดกล้องเหนือเวทีการแข่งขันจริง calibrate เวที และบันทึกการชกจริงต่อหน้าคนดู",
    "poster": "media/p_ring_fight.jpg",
    "flow": [
      [
        "RING SETUP",
        "ติดกล้องเหนือเวที"
      ],
      [
        "CALIBRATE",
        "เดินบอร์ดรอบเวที"
      ],
      [
        "FIGHT NIGHT",
        "บันทึกการแข่งจริง"
      ],
      [
        "LIVE 3D",
        "นับอาวุธ + ความเร็ว (ระบบสาธิต)"
      ]
    ],
    "steps": [
      {
        "k": "CALIBRATE",
        "th": "ตั้งค่ากล้องบนเวทีจริง",
        "desc": "ทีมงานเดินถือบอร์ด calibrate ไปทั่วเวที ให้ระบบรู้ขนาดเวทีและตำแหน่งของกล้อง ก่อนเริ่มการแข่งขัน",
        "get": "ภาพจากเวทีจริงที่ผูกกับพิกัดของเวที พร้อมสำหรับคำนวณต่อ",
        "video": "media/ring_calib.mp4",
        "poster": "media/p_ring_calib.jpg"
      },
      {
        "k": "FIGHT NIGHT",
        "th": "บันทึกการแข่งจริง จากมุมสูง",
        "desc": "กล้องเหนือเวทีบันทึกการชกจริงตลอดรายการ เห็นนักมวยทั้งสองฝั่งครบทั้งเวที",
        "get": "ฟุตเทจการแข่งจริงหลายชั่วโมง สำหรับต่อยอดเป็นข้อมูล",
        "video": "media/ring_fight.mp4",
        "poster": "media/p_ring_fight.jpg",
        "note": "ฟุตเทจจากเวทีจริงชุดนี้ ยังไม่ได้ประมวลผลเป็น 3D"
      },
      {
        "k": "LIVE 3D",
        "th": "นับอาวุธและความเร็ว ระหว่างแข่ง",
        "desc": "ระบบสาธิต 4 กล้อง: จับโครงร่าง 2D รวมเป็น 3D บนเวที แล้วนับหมัด เตะ เข่า ศอก ของฝั่ง A / B พร้อมความเร็ว",
        "get": "ข้อมูลประกอบการแข่ง สำหรับกรรมการ ผู้บรรยาย และกราฟิกถ่ายทอดสด",
        "video": "media/live_3d.mp4",
        "poster": "media/p_live_3d.jpg"
      }
    ]
  },
  {
    "id": "data",
    "no": "04",
    "accent": "#2ee6a6",
    "title": "DATA → USE",
    "th": "นำข้อมูลไปใช้ และพัฒนาต่อ",
    "sum": "ข้อมูลการเคลื่อนไหวเก็บเป็นไฟล์มาตรฐาน ใช้ต่อได้ และเป็นฐานพัฒนาระบบในขั้นต่อไป",
    "poster": "media/p_cap_motion.jpg",
    "flow": [
      [
        "EXPORT",
        "FBX / BVH / CSV"
      ],
      [
        "ARCHIVE",
        "คลังท่ามวยไทยจากนักมวยตัวจริง"
      ],
      [
        "DEVELOP",
        "ต่อยอดสู่ระบบบนเวทีจริง"
      ]
    ],
    "steps": [
      {
        "k": "MOTION DATA",
        "th": "เก็บเป็นไฟล์ ใช้ต่อได้",
        "desc": "ทุกข้อต่อทุกเฟรมถูกส่งออกเป็นไฟล์มาตรฐาน FBX / BVH / CSV เปิดได้ในโปรแกรม 3D และงานวิเคราะห์",
        "get": "คลังท่ามวยไทยของนักมวยตัวจริง เก็บไว้ศึกษาและใช้งานต่อ",
        "video": "media/cap_motion.mp4",
        "poster": "media/p_cap_motion.jpg"
      },
      {
        "k": "NEXT",
        "th": "พัฒนาต่อ: จากสตูดิโอ สู่เวทีจริง",
        "desc": "เป้าหมายคือทำแบบเดียวกับสตูดิโอบนเวทีแข่งจริง กล้องรอบเวทีคำนวณ 3D นับอาวุธ และวัดความเร็วระหว่างแข่ง",
        "get": "ระบบที่ใช้กับการแข่งขันจริง ทั้งการวิเคราะห์และการถ่ายทอดสด",
        "video": "media/live_overview_a.mp4",
        "poster": "media/p_live_overview_a.jpg",
        "note": "ขั้นนี้กำลังพัฒนา ภาพที่เห็นคือระบบสาธิต"
      }
    ]
  }
],

  // ---------- PARTNERS (โลโก้จาก logo.psd) ----------
  // line / videos / track / url ใส่เพิ่มได้ ถ้าอยากให้กดโลโก้แล้วมีรายละเอียด
  partners: {
    poweredBy: { id: "originals", name: "ORIGINALS STUDIO", logo: "brand/partners/originals.png" },
    groups: [
      { title: "PARTNERS", items: [
        { id: "thaifight", name: "THAI FIGHT", logo: "brand/partners/thaifight.png" },
        { id: "codehard", name: "Code(Hard);", logo: "brand/partners/codehard.png" },
        { id: "verse", name: "verse.", logo: "brand/partners/verse.png",
          line: "AI-GENERATED PRODUCTION", url: "https://www.versemedia.io", urlLabel: "WWW.VERSEMEDIA.IO",
          videos: [{ title: "AI SHOWREEL", video: "media/ai_showreel.mp4", poster: "media/poster_showreel.jpg" }] },
        { id: "chyron", name: "Chyron", logo: "brand/partners/chyron.png" },
        { id: "mosys", name: "mo-sys", logo: "brand/partners/mosys.png" }
      ]},
      { title: "SUPPORTED BY", items: [
        { id: "mhesi", name: "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม", logo: "brand/partners/mhesi.png" },
        { id: "pmuc", name: "บพข.", logo: "brand/partners/pmu-c.png" },
        { id: "kmitl", name: "KMITL", logo: "brand/partners/kmitl.png" },
        { id: "ciim", name: "CIIM", logo: "brand/partners/ciim.png" }
      ]}
    ]
  },

  // ---------- ตาราง "วันนี้ใครมา" ----------
  schedule: {
    "2026-11-05": [
      // ตัวอย่าง: { time: "ช่วงบ่าย", name: "เลิศศิลา ชุ่มไพรทัวร์", role: "Muay Thai Legend", note: "Meet & Greet" }
    ],
    "2026-11-06": [],
    "2026-11-07": [],
    "2026-11-08": []
  },
  // (ไม่บังคับ) Google Sheet → Publish to web → CSV  คอลัมน์: date,time,name,role,note
  scheduleCsvUrl: "",

  // ---------- ติดต่อบูธ ----------
  // ใส่ลิงก์จริงแล้ว QR จะขึ้นเอง (ว่าง = ไม่โชว์ QR)
  contact: { qrUrl: "", label: "", th: "สนใจใช้ข้อมูล หรือร่วมงานกับเรา", sub: "คุยกับทีมงานที่บูธได้เลย" }
};
