// detectBadWords.ts
import { badWordsList } from "./badWordsList";

export const containsBadWords = (message: string): boolean => {
  const badWords = badWordsList['english'] || [];
  const badWordsRegex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'i');
  return badWordsRegex.test(message);
};
