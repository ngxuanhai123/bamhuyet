import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateMnemonic = async (acupointName: string, location: string, func: string): Promise<string> => {
  if (!ai) return "Vui lòng cấu hình API Key để sử dụng tính năng AI.";

  try {
    const prompt = `
      Hãy đóng vai một chuyên gia châm cứu và giáo dục hài hước.
      Hãy tạo ra một câu vè, một câu thơ lục bát, hoặc một mẹo ghi nhớ ngắn gọn (mnemonic) dễ nhớ cho huyệt sau:
      - Tên huyệt: ${acupointName}
      - Vị trí: ${location}
      - Tác dụng: ${func}
      
      Yêu cầu: Ngắn gọn, vần điệu, dễ thuộc. Chỉ trả về nội dung câu vè/mẹo.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Không thể tạo mẹo ghi nhớ lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Có lỗi khi kết nối với AI Tutor.";
  }
};

export const askAiAboutAcupoint = async (question: string, context: string): Promise<string> => {
  if (!ai) return "Vui lòng cấu hình API Key để sử dụng tính năng AI.";

  try {
    const prompt = `
      Ngữ cảnh: Người dùng đang học về huyệt đạo: ${context}.
      Câu hỏi của người dùng: "${question}"
      
      Hãy trả lời ngắn gọn, chính xác theo y học cổ truyền, dễ hiểu cho người mới bắt đầu.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Không có câu trả lời.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Có lỗi khi kết nối với AI.";
  }
};