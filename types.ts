export interface SacredCode {
  code: number;
  name: string;
  description: string;
  category: string;
}

export interface Rune {
  name: string;
  description: string;
  category: string;
  // Runes don't have a 'code' property
}

export type CodeOrRune = SacredCode | Rune;

export interface JournalEntry {
    id: string;
    date: string;
    type: string; // e.g., 'Código Sagrado', 'Runa'
    name: string;
    intention: string;
    result: string;
}

export type Theme = 'light' | 'dark';