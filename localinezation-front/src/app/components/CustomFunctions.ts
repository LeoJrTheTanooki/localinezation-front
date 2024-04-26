export const langFormat = (language: string) => {
  switch (language) {
    case "englishUsa":
      return "English (US)";
    case "spanishLatAm":
      return "Spanish (Latin American)";
    case "french":
      return "French";
  }
};
