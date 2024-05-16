export const langFormat = /* (language: string | null) */ (language: any) => {
  switch (language) {
    case "englishUsa":
      return "English (US)";
    case "spanishLatAm":
      return "Spanish (Latin American)";
    case "spanishEu":
      return "Spanish (European)";
    case "englishUk":
      return "English (UK)";
    case "french":
      return "French";
    case "japanese":
      return "Japanese";
    case "chineseTrad":
      return "Chinese (Traditional)";
    case "chineseSimple":
      return "Chinese (Simplified)";
    case "norwegian":
      return "Norwegian";
    case "swedish":
      return "Swedish";
    case "irish":
      return "Irish";
    default:
      return language;
  }
};

export const languageList = [
  "englishUsa",
  "spanishLatAm",
  "spanishEu",
  "englishUk",
  "french",
  "japanese",
  "chineseTrad",
  "chineseSimple",
  "norwegian",
  "swedish",
  "irish",
];
