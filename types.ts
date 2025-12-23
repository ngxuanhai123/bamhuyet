export enum CategoryId {
  HEAD_NECK = 'HEAD_NECK',
  DIGESTIVE = 'DIGESTIVE',
  RESPIRATORY = 'RESPIRATORY',
  MUSCULOSKELETAL = 'MUSCULOSKELETAL',
  MENTAL = 'MENTAL',
  EMERGENCY = 'EMERGENCY'
}

export interface Acupoint {
  id: string;
  name: string; // Tên huyệt (e.g., Hợp Cốc)
  location: string; // Vị trí (This will be the fill-in-the-blank target mostly)
  function: string; // Tác dụng
  description: string; // Mô tả đầy đủ để học
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  acupoints: Acupoint[];
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  diseases: Disease[];
}

export type ViewState = 'HOME' | 'CATEGORY' | 'QUIZ' | 'STUDY';

export interface QuizQuestion {
  originalText: string;
  parts: {
    text: string;
    isBlank: boolean;
    userAnswer?: string;
  }[];
  answer: string;
  hint: string;
}