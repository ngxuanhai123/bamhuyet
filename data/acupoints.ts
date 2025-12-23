import { Category, CategoryId } from '../types';

export const ACUPOINT_DATA: Category[] = [
  {
    id: CategoryId.HEAD_NECK,
    name: "Đau Đầu & Cổ Vai Gáy",
    icon: "🧠",
    diseases: [
      {
        id: "headache",
        name: "Đau đầu / Nửa đầu",
        description: "Các huyệt giúp giảm đau đầu, thư giãn thần kinh.",
        acupoints: [
          {
            id: "hop-coc",
            name: "Hợp Cốc",
            location: "Nằm ở giữa ngón cái và ngón trỏ, trên mu bàn tay.",
            function: "Trị đau đầu, đau răng, cảm mạo.",
            description: "Hợp Cốc là huyệt nguyên của kinh Đại Trường, có tác dụng giảm đau rất mạnh."
          },
          {
            id: "thai-duong",
            name: "Thái Dương",
            location: "Ở chỗ lõm phía sau đuôi lông mày khoảng 1 thốn.",
            function: "Trị đau đầu, đau nửa đầu, mỏi mắt.",
            description: "Thường được day ấn khi bị đau đầu do căng thẳng."
          },
          {
            id: "phong-tri",
            name: "Phong Trì",
            location: "Ở chỗ lõm phía sau gáy, tạo bởi cơ thang và cơ ức đòn chũm.",
            function: "Trị đau đầu, cứng cổ, cảm mạo.",
            description: "Huyệt quan trọng để khu phong, tán hàn."
          }
        ]
      },
      {
        id: "neck-pain",
        name: "Đau mỏi cổ vai gáy",
        description: "Giảm cứng cổ, đau vai do ngồi nhiều.",
        acupoints: [
          {
            id: "kien-tinh",
            name: "Kiên Tỉnh",
            location: "Nằm trên điểm cao nhất của vai, giữa đường nối huyệt Đại Chùy và mỏm cùng vai.",
            function: "Trị cứng cổ, đau vai, không giơ tay lên được.",
            description: "Huyệt chủ đạo trong điều trị đau vai gáy."
          }
        ]
      }
    ]
  },
  {
    id: CategoryId.DIGESTIVE,
    name: "Tiêu Hóa & Dạ Dày",
    icon: "🍎",
    diseases: [
      {
        id: "stomach-pain",
        name: "Đau dạ dày / Khó tiêu",
        description: "Hỗ trợ giảm đau bao tử, đầy bụng.",
        acupoints: [
          {
            id: "tuc-tam-ly",
            name: "Túc Tam Lý",
            location: "Dưới mắt gối ngoài 3 thốn, cách mào chày 1 khoát ngón tay.",
            function: "Điều hòa tỳ vị, tăng cường miễn dịch, trị đau dạ dày.",
            description: "Huyệt cường tráng cơ thể, rất quan trọng trong dưỡng sinh."
          },
          {
            id: "trung-quan",
            name: "Trung Quản",
            location: "Nằm trên đường giữa bụng, từ rốn đo lên 4 thốn.",
            function: "Trị đau dạ dày, nôn mửa, đầy bụng.",
            description: "Huyệt mộ của Vị, nơi khí của Vị tụ lại."
          }
        ]
      }
    ]
  },
  {
    id: CategoryId.MENTAL,
    name: "Thần Kinh & Giấc Ngủ",
    icon: "zzz",
    diseases: [
      {
        id: "insomnia",
        name: "Mất ngủ / Stress",
        description: "Giúp an thần, dễ đi vào giấc ngủ.",
        acupoints: [
          {
            id: "than-mon",
            name: "Thần Môn",
            location: "Nằm trên nếp gấp cổ tay, phía ngón út, chỗ lõm giữa xương đậu và đầu dưới xương trụ.",
            function: "An thần, thanh tâm hỏa, trị mất ngủ.",
            description: "Huyệt nguyên của kinh Tâm, chuyên trị các bệnh về tâm thần."
          },
          {
            id: "tam-am-giao",
            name: "Tam Âm Giao",
            location: "Từ đỉnh mắt cá trong đo lên 3 thốn, sát bờ sau xương chày.",
            function: "Bổ âm, dưỡng huyết, an thần.",
            description: "Giao điểm của 3 kinh âm: Tỳ, Can, Thận. Phụ nữ có thai cấm châm cứu."
          },
          {
            id: "dung-tuyen",
            name: "Dũng Tuyền",
            location: "Chỗ lõm ở gan bàn chân, tại điểm nối 1/3 trước và 2/3 sau đoạn nối đầu ngón 2 và gót chân.",
            function: "Giáng hỏa, bình can, trị mất ngủ, ngất.",
            description: "Huyệt tỉnh của kinh Thận, giúp đưa hỏa xuống, trị mất ngủ rất tốt."
          }
        ]
      }
    ]
  },
  {
    id: CategoryId.RESPIRATORY,
    name: "Hô Hấp & Cảm Cúm",
    icon: "hơi thở",
    diseases: [
      {
        id: "cold",
        name: "Cảm cúm / Nghẹt mũi",
        description: "Thông mũi, giảm triệu chứng cảm.",
        acupoints: [
          {
            id: "nghinh-huong",
            name: "Nghinh Hương",
            location: "Nằm ngay cạnh cánh mũi, trên rãnh mũi má, cách cánh mũi khoảng 0.5 thốn.",
            function: "Thông mũi, trị viêm mũi dị ứng, nghẹt mũi.",
            description: "Huyệt chuyên trị các bệnh về mũi."
          }
        ]
      }
    ]
  },
    {
    id: CategoryId.MUSCULOSKELETAL,
    name: "Cơ Xương Khớp",
    icon: "🦴",
    diseases: [
      {
        id: "back-pain",
        name: "Đau Lưng",
        description: "Giảm đau vùng thắt lưng.",
        acupoints: [
          {
            id: "than-du",
            name: "Thận Du",
            location: "Dưới mỏm gai đốt sống thắt lưng 2 sang ngang 1.5 thốn.",
            function: "Bổ thận, trị đau lưng, ù tai.",
            description: "Huyệt du của Thận, rất quan trọng trị đau lưng mãn tính."
          },
          {
            id: "uy-trung",
            name: "Ủy Trung",
            location: "Điểm giữa nếp lằn khoeo chân.",
            function: "Trị đau lưng, đau thần kinh tọa.",
            description: "Huyệt hợp của kinh Bàng Quang, 'Eo lưng cầu Ủy Trung'."
          }
        ]
      }
    ]
  }
];