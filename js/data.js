/* ===================================================
   Data — All gate content, puzzles, cards, badges
   =================================================== */

const GATES_DATA = {
  1: {
    id: 1,
    title: "Lời Kêu Gọi",
    subtitle: "The Call to Arms",
    narrative: {
      paragraphs: [
        "Hơn 80 năm dưới ách thống trị của thực dân Pháp, nhân dân Việt Nam phải chịu cảnh lầm than, cơ cực. Từ những cánh đồng miền Nam đến những bản làng miền núi phía Bắc, người dân Việt Nam luôn ấp ủ khát vọng tự do, độc lập.",
        "Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Hà Nội, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Giọng Người vang lên giữa mùa thu Hà Nội: \"Tất cả mọi người đều sinh ra có quyền bình đẳng...\"",
        "Nhưng niềm vui độc lập chưa được bao lâu, thực dân Pháp quay trở lại với âm mưu xâm lược nước ta một lần nữa. Chúng mang theo vũ khí hiện đại, máy bay, xe tăng — quyết tâm chiếm lại Đông Dương.",
        "Trước tình hình đó, Chủ tịch Hồ Chí Minh ra lời kêu gọi toàn quốc kháng chiến: \"Hỡi đồng bào! Chúng ta phải đứng lên!\" Từ khắp mọi miền đất nước, thanh niên tình nguyện lên đường, nông dân gác cày cầm súng, và cả dân tộc bước vào cuộc kháng chiến trường kỳ chống thực dân Pháp."
      ],
      images: [null, "images/gates/gate1_ba_dinh.png"]
    },
    puzzle: {
      type: "decode",
      config: {
        instruction: "Sắp xếp các từ sau thành câu nói nổi tiếng của Chủ tịch Hồ Chí Minh:",
        words: ["Không", "có", "gì", "quý", "hơn", "Độc lập", "Tự do"],
        answer: ["Không", "có", "gì", "quý", "hơn", "Độc lập", "Tự do"],
        hint: "Đây là câu nói được Bác Hồ nhắc đi nhắc lại nhiều lần trong cuộc kháng chiến."
      }
    },
    character: {
      name: "Hồ Chí Minh",
      title: "Người Cha Già Của Dân Tộc",
      achievement: "Đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa ngày 2/9/1945.",
      quote: "\"Không có gì quý hơn Độc lập, Tự do.\"",
      image: "images/cards/ho_chi_minh.png"
    },
    badge: {
      name: "Ngọn Lửa Cách Mạng",
      icon: "🌟",
      description: "Hoàn thành Cổng 1 — Hiểu về lời kêu gọi kháng chiến"
    },
    hiddenFact: {
      title: "Bạn có biết?",
      content: "Bản Tuyên ngôn Độc lập mà Chủ tịch Hồ Chí Minh đọc ngày 2/9/1945 mở đầu bằng câu trích dẫn từ Tuyên ngôn Độc lập của nước Mỹ năm 1776: \"Tất cả mọi người đều sinh ra có quyền bình đẳng.\" Đây là cách Bác Hồ khéo léo nhắc nhở thế giới về giá trị phổ quát của tự do."
    }
  },

  2: {
    id: 2,
    title: "Cuộc Hành Quân",
    subtitle: "The March",
    narrative: {
      paragraphs: [
        "Đầu năm 1954, Đại tướng Võ Nguyên Giáp nhận lệnh từ Trung ương: chuẩn bị cho trận đánh lớn nhất — trận Điện Biên Phủ. Nhưng Điện Biên Phủ nằm sâu trong lòng chảo giữa núi rừng Tây Bắc, cách xa hậu phương hàng trăm cây số.",
        "Một bài toán tưởng chừng không thể giải: làm sao vận chuyển hàng ngàn tấn lương thực, vũ khí, đạn dược qua những con đường rừng hiểm trở? Câu trả lời nằm ở sức mạnh của nhân dân.",
        "Hàng vạn dân công từ khắp các tỉnh miền Bắc và miền Trung tình nguyện tham gia. Họ dùng xe đạp thồ — những chiếc xe đạp được gia cố đặc biệt, có thể chở tới 200-300 kg hàng hóa. Đoàn xe đạp thồ nối đuôi nhau trên những con đường mòn xuyên rừng, vượt đèo, lội suối.",
        "Không chỉ xe đạp, dân công còn gánh bộ, dùng ngựa thồ, voi chở, và cả bè mảng trên sông. Trong điều kiện bom đạn, mưa rừng, muỗi vắt, họ vẫn kiên trì ngày đêm tiếp tế cho tiền tuyến. Đây là kỳ tích hậu cần chưa từng có trong lịch sử quân sự thế giới."
      ],
      images: [null, null, "images/gates/gate2_bicycle_convoy.png"]
    },
    puzzle: {
      type: "matching",
      config: {
        instruction: "Nối mỗi loại vật tư với phương tiện vận chuyển phù hợp trong chiến dịch Điện Biên Phủ:",
        pairs: [
          { left: "🍚 Gạo (hàng trăm tấn)", right: "🚲 Xe đạp thồ" },
          { left: "💣 Đạn pháo nặng", right: "🐘 Voi chở" },
          { left: "💊 Thuốc men, băng bó", right: "👫 Gánh bộ dân công" },
          { left: "🔧 Linh kiện pháo lớn", right: "🛶 Bè mảng trên sông" }
        ]
      }
    },
    character: {
      name: "Dân Công",
      title: "Đoàn Quân Xe Đạp Thồ",
      achievement: "Hàng vạn dân công đã vận chuyển hơn 25.000 tấn lương thực và vũ khí bằng xe đạp thồ, gánh bộ, và các phương tiện thô sơ.",
      quote: "\"Xe chưa qua, nhà không tiếc.\"",
      image: "images/cards/dan_cong.png"
    },
    badge: {
      name: "Xe Đạp Thồ",
      icon: "🚲",
      description: "Hoàn thành Cổng 2 — Hiểu về cuộc hành quân vĩ đại"
    },
    hiddenFact: {
      title: "Bạn có biết?",
      content: "Anh hùng Cao Văn Khánh, một dân công, đã cải tiến xe đạp thồ có thể chở tới 352 kg trong một chuyến — gấp gần 5 lần trọng lượng cơ thể người! Tổng cộng, đoàn dân công đã vận chuyển hơn 25.000 tấn hàng hóa, tương đương sức chở của hàng trăm chuyến xe tải hiện đại."
    }
  },

  3: {
    id: 3,
    title: "Đào Chiến Hào",
    subtitle: "Digging the Trenches",
    narrative: {
      paragraphs: [
        "Điện Biên Phủ là một thung lũng lòng chảo rộng lớn, nơi quân Pháp xây dựng hệ thống cứ điểm kiên cố với 49 vị trí phòng thủ, bao gồm các ngọn đồi được đặt tên bằng tên phụ nữ: Béatrice, Gabrielle, Isabelle, Dominique, Éliane, Claudine, Huguette...",
        "Ban đầu, Đại tướng Võ Nguyên Giáp dự định dùng chiến thuật \"đánh nhanh, thắng nhanh\" — tấn công ồ ạt trong vài ngày. Nhưng sau khi phân tích kỹ tình hình, ông đưa ra quyết định lịch sử: thay đổi phương châm thành \"đánh chắc, tiến chắc.\"",
        "Đây là quyết định dũng cảm và sáng suốt nhất trong chiến dịch. Bộ đội bắt đầu đào hệ thống chiến hào bao vây, dần dần siết chặt vòng vây quanh quân Pháp. Hàng trăm km giao thông hào được đào bằng tay, trong đêm tối, dưới bom đạn.",
        "Từng mét chiến hào tiến gần hơn đến các cứ điểm của địch. Quân Pháp kinh hoàng nhận ra: mỗi sáng thức dậy, hệ thống chiến hào Việt Minh lại tiến thêm một bước, như những ngón tay khổng lồ đang bóp nghẹt cứ điểm từ mọi phía."
      ],
      images: [null, null, "images/gates/gate3_trenches.png"]
    },
    puzzle: {
      type: "chronological",
      config: {
        instruction: "Sắp xếp các quyết định quan trọng của Đại tướng Võ Nguyên Giáp theo thứ tự thời gian:",
        events: [
          { text: "Ra lệnh chuẩn bị chiến dịch Điện Biên Phủ", year: "12/1953", order: 1 },
          { text: "Đề ra phương châm \"đánh nhanh, thắng nhanh\"", year: "01/1954", order: 2 },
          { text: "Thay đổi phương châm thành \"đánh chắc, tiến chắc\"", year: "01/1954", order: 3 },
          { text: "Ra lệnh đào hệ thống giao thông hào bao vây", year: "02/1954", order: 4 },
          { text: "Mở màn tấn công cứ điểm Him Lam", year: "13/03/1954", order: 5 }
        ]
      }
    },
    character: {
      name: "Võ Nguyên Giáp",
      title: "Đại Tướng — Người Anh Cả Quân Đội",
      achievement: "Đưa ra quyết định thay đổi phương châm tác chiến từ \"đánh nhanh\" sang \"đánh chắc, tiến chắc\" — quyết định then chốt làm nên chiến thắng Điện Biên Phủ.",
      quote: "\"Thần tốc, thần tốc hơn nữa! Táo bạo, táo bạo hơn nữa!\"",
      image: "images/cards/vo_nguyen_giap.png"
    },
    badge: {
      name: "Chiến Sĩ Công Binh",
      icon: "⚒️",
      description: "Hoàn thành Cổng 3 — Hiểu về chiến thuật đào hào bao vây"
    },
    hiddenFact: {
      title: "Bạn có biết?",
      content: "Hệ thống giao thông hào ở Điện Biên Phủ dài tổng cộng hơn 600 km — tương đương khoảng cách từ Hà Nội đến Huế! Tất cả đều được đào bằng tay, ban đêm, dưới ánh sáng của đèn dầu và đạn pháo sáng của quân Pháp."
    }
  },

  4: {
    id: 4,
    title: "56 Ngày Đêm",
    subtitle: "56 Days and Nights",
    narrative: {
      paragraphs: [
        "Ngày 13 tháng 3 năm 1954, chiến dịch Điện Biên Phủ chính thức bắt đầu bằng trận tấn công cứ điểm Him Lam (Béatrice). Pháo binh Việt Minh — được kéo lên đỉnh núi bằng sức người — bất ngờ khai hỏa, khiến quân Pháp kinh hoàng.",
        "Trong 56 ngày đêm ác liệt, bộ đội Việt Nam lần lượt đánh chiếm các cứ điểm: Him Lam, Độc Lập (Gabrielle), Bản Kéo... Mỗi ngọn đồi, mỗi mét đất đều phải đổi bằng máu và nước mắt.",
        "Tại cứ điểm Him Lam, anh hùng Phan Đình Giót đã lấy thân mình lấp lỗ châu mai, dập tắt hỏa lực địch để đồng đội xung phong. Trên đường kéo pháo, anh hùng Tô Vĩnh Diện đã lấy thân chèn pháo không cho khẩu pháo lăn xuống vực.",
        "Những ngày ác liệt nhất diễn ra tại đồi A1 (Éliane 2) — nơi hai bên giằng co quyết liệt suốt 36 ngày đêm. Đồi A1 đổi chủ nhiều lần trước khi quân ta làm chủ hoàn toàn, mở đường cho trận tổng tấn công cuối cùng."
      ],
      images: [null, null, "images/gates/gate4_battle.png"]
    },
    puzzle: {
      type: "matching",
      config: {
        instruction: "Nối mỗi anh hùng với chiến công của họ trong trận Điện Biên Phủ:",
        pairs: [
          { left: "Phan Đình Giót", right: "Lấy thân mình lấp lỗ châu mai" },
          { left: "Tô Vĩnh Diện", right: "Lấy thân chèn pháo không cho lăn xuống vực" },
          { left: "Bế Văn Đàn", right: "Lấy vai làm giá súng cho đồng đội bắn" },
          { left: "Trần Can", right: "Cắm cờ chiến thắng trên đồi A1" }
        ]
      }
    },
    // Gate 4 has TWO character cards
    character: {
      name: "Phan Đình Giót",
      title: "Anh Hùng Lực Lượng Vũ Trang",
      achievement: "Lấy thân mình lấp lỗ châu mai tại cứ điểm Him Lam ngày 13/3/1954, dập tắt hỏa lực địch để đồng đội xung phong giành chiến thắng.",
      quote: "\"Quyết tử cho Tổ quốc quyết sinh!\"",
      image: "images/cards/phan_dinh_giot.png"
    },
    character2: {
      name: "Tô Vĩnh Diện",
      title: "Anh Hùng Pháo Binh",
      achievement: "Lấy thân chèn khẩu pháo nặng hàng tấn không cho lăn xuống vực trên đường kéo pháo vào trận địa.",
      quote: "\"Không để pháo rơi xuống vực!\"",
      image: "images/cards/to_vinh_dien.png"
    },
    badge: {
      name: "Anh Hùng Điện Biên",
      icon: "🎖️",
      description: "Hoàn thành Cổng 4 — Hiểu về 56 ngày đêm lịch sử"
    },
    hiddenFact: {
      title: "Bạn có biết?",
      content: "Trong chiến dịch Điện Biên Phủ, có tổng cộng 16 cá nhân và 3 đơn vị được phong tặng danh hiệu Anh hùng Lực lượng Vũ trang Nhân dân. Trận đánh đồi A1 kéo dài 36 ngày đêm là trận giằng co ác liệt nhất, với đồi đổi chủ nhiều lần trước khi bộ đội ta dùng khối thuốc nổ 1.000 kg đào hầm từ dưới lòng đất để phá hủy trận địa cố thủ cuối cùng."
    }
  },

  5: {
    id: 5,
    title: "Chiến Thắng",
    subtitle: "Historic Victory",
    narrative: {
      paragraphs: [
        "Chiều ngày 7 tháng 5 năm 1954, sau 56 ngày đêm chiến đấu anh dũng, quân đội Việt Nam mở trận tổng tấn công cuối cùng vào tập đoàn cứ điểm Điện Biên Phủ. Lá cờ \"Quyết chiến Quyết thắng\" phấp phới bay trên nóc hầm De Castries.",
        "Tướng De Castries cùng toàn bộ ban tham mưu bị bắt sống. Hơn 16.000 quân Pháp bị tiêu diệt và bắt làm tù binh. Tại thung lũng Điện Biên, quân Pháp phải giương cờ trắng đầu hàng.",
        "Chiến thắng Điện Biên Phủ \"lừng lẫy năm châu, chấn động địa cầu\" đã đặt dấu chấm hết cho gần 100 năm đô hộ của thực dân Pháp tại Việt Nam. Đây không chỉ là chiến thắng của quân đội Việt Nam, mà còn là biểu tượng cho tinh thần đấu tranh của các dân tộc bị áp bức trên toàn thế giới.",
        "Ngày 21 tháng 7 năm 1954, Hiệp định Genève được ký kết, công nhận độc lập, chủ quyền và toàn vẹn lãnh thổ của Việt Nam. Chiến thắng Điện Biên Phủ mãi mãi đi vào lịch sử dân tộc Việt Nam và lịch sử thế giới như một trong những chiến thắng vĩ đại nhất của thế kỷ 20."
      ],
      images: [null, null, "images/gates/gate5_victory.png"]
    },
    puzzle: {
      type: "jigsaw",
      config: {
        instruction: "Ghép các mảnh lại để hoàn thành bức tranh chiến thắng lịch sử — lá cờ tung bay trên nóc hầm De Castries:",
        gridSize: 3,
        image: "images/gates/gate5_victory.png"
      }
    },
    character: {
      name: "Lá Cờ Chiến Thắng",
      title: "Biểu Tượng Chiến Thắng Điện Biên Phủ",
      achievement: "Lá cờ \"Quyết chiến Quyết thắng\" được cắm trên nóc hầm De Castries chiều 7/5/1954, đánh dấu chiến thắng lịch sử của dân tộc Việt Nam.",
      quote: "\"Lừng lẫy năm châu, chấn động địa cầu!\"",
      image: "images/cards/victory_flag.png"
    },
    badge: {
      name: "Chấn Động Địa Cầu",
      icon: "🏆",
      description: "Hoàn thành Cổng 5 — Chiến thắng lịch sử Điện Biên Phủ"
    },
    hiddenFact: {
      title: "Bạn có biết?",
      content: "Sau chiến thắng Điện Biên Phủ, Hiệp định Genève 1954 được ký kết, chấm dứt chiến tranh Đông Dương lần thứ nhất. Chiến thắng này đã truyền cảm hứng cho phong trào giải phóng dân tộc ở Algeria (1954–1962), và khắp châu Phi, châu Á. Tướng Navarre sau này thừa nhận: \"Điện Biên Phủ là thảm họa quân sự lớn nhất trong lịch sử nước Pháp.\""
    }
  }
};
