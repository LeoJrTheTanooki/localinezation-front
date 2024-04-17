export interface IBlogItems {
  id: number;
  userID: number;
  publishedName: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tags: string;
  categories: string;
  isPublished: boolean;
  isDeleted: boolean;
}

//Get our token

export interface IToken {
  token: string;
}

// Updated IToken interface to have modal appear when failed login
// export interface IToken {
//     token: string | null;
// }

//For login and Create account fetch

export interface IUserInfo {
  username: string;
  password: string;
}

//This for getting our user's info Id and username

export interface IUserData {
  userId: number;
  publisherName: string;
}

export interface IMediaData {
  title: string;
  coverArt: string;
  originalLanguage: string;
  type: string;
  platform: string;
  requestLanguage?: Array<{
    englishUsa?: Array<ILanguageData>;
    spanishLatAm?: Array<ILanguageData>;
    spanishEu?: Array<ILanguageData>;
    englishUk?: Array<ILanguageData>;
    french?: Array<ILanguageData>;
    japanese?: Array<ILanguageData>;
    chineseTrad?: Array<ILanguageData>;
    chineseSimple?: Array<ILanguageData>;
    norwegian?: Array<ILanguageData>;
    swedish?: Array<ILanguageData>;
    irish?: Array<ILanguageData>;
  }>;
}

export interface ILanguageData {
  openRequests?: Array<{
    requestName: string;
    requestDialogue?: string;
    requestReferences?: Array<string>;
    submittedTranslations?: Array<{
      translatorUserName: string;
      isGuest: boolean;
      translatedDialogue: string;
      userScores?: Array<number>;
    }>;
  }>;
}
