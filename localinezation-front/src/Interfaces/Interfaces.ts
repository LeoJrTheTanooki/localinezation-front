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
// --------------------------------------------------
// --------------------------------------------------

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

export interface IMediaItems {
  id: number; // Unique identifier for the media
  userID: number; // ID of the user who owns or uploaded the media
  title: string; // Title of the media
  coverArt: string; // URL or path to the media's cover art image
  originalLanguage: string; // The original language of the media
  type?: string; // Type of the media, e.g., "TV Show/Movie", "Video Game", optional
  platform?: string; // Platform where the media is published, optional (YouTube, TV...)
  translationRequests: string; // Translation requests e.g. input field "Need translations for Spanish, French",
  isPublished: boolean;
  isDeleted: boolean;
}

export interface IMediaItems {
  id: number; // Unique identifier for the media
  userID: number; // ID of the user who owns or uploaded the media
  title: string; // Title of the media
  coverArt: string; // URL or path to the media's cover art image
  originalLanguage: string; // The original language of the media
  type?: string; // Type of the media, e.g., "TV Show/Movie", "Video Game", optional
  platform?: string; // Platform where the media is published, optional (YouTube, TV...)
  translationRequests: string; // Translation requests e.g. input field "Need translations for Spanish, French",
  isPublished: boolean;
  isDeleted: boolean;
}

export interface ILanguageData {
  openRequests?: Array<{
    id: number,
    requestName: string;
    requestDialogue?: string;
    requestReferences?: Array<string>;
    submittedTranslations: Array<{
      translatorUserName: string;
      isGuest: boolean;
      translatedDialogue: string;
      userScores?: Array<{
        userId: number;
        userScore: number;
      }>;
    }>;
  }>;
}

// -----------------------------------------------------------------------------
// Modifications for the last two interfaces above by Ashur
// Defines the structure of a media object.
export interface IMedia {
  id: number;  // Unique identifier for the media
  userId: number;  // ID of the user who owns or uploaded the media
  title: string;  // Title of the media
  coverArt: string;  // URL or path to the media's cover art image
  originalLanguage: string;  // The original language of the media
  type?: string;  // Type of the media, e.g., "movie", "book", optional
  platform?: string;  // Platform where the media is published, optional
  translationRequests?: ITranslationRequest[];  // Array of translation requests
}

// Represents a request to translate the media into a different language.
export interface ITranslationRequest {
  //optional id?: might not be present, especially during the creation of a new translation request, where the backend typically generates an id
  id?: number; //(Translation request ID) Unique identifier for the translation request also Making 'id' optional
  mediaId: number; // ID of the media this translation request is for
  requestLanguage: string; // The language to which the translation is requested
  translations?: ITranslation[]; // Submitted translations for this request
}

// Details about a specific translation submitted by a user.
export interface ITranslation {
  id: number;                       // Unique identifier for the translation
  translationRequestId: number;    // ID of the translation request this translation belongs to
  translatorUserName: string;     // Username of the user who submitted the translation
  isGuest: boolean;              // Indicates if the translator was a guest user
  translatedText: string;       // The actual translated text
  translatorUserId: number;
  language: string;
  isApproved: boolean;
  mediaId: number;
}

// -----------------------------------------------------------------------------
// Modifications for the last two interfaces above by Ashur
// Defines the structure of a media object.
export interface IMedia {
  id: number; // Unique identifier for the media
  userID: number; // ID of the user who owns or uploaded the media
  title: string; // Title of the media
  coverArt: string; // URL or path to the media's cover art image
  originalLanguage: string; // The original language of the media
  type?: string; // Type of the media, e.g., "movie", "book", optional
  platform?: string; // Platform where the media is published, optional
  translationRequests?: ITranslationRequest[]; // Array of translation requests
}

// Represents a request to translate the media into a different language.

export interface ITranslationRequest {
  requestorUserId: number;
  mediaId: number;
  requestLanguage: string;
  requestName?: string;
  requestDialogue?: string;
  requestReferences?: [
    {
      src: string;
      isVideo: boolean;
    }
  ];
}

// Details about a specific translation submitted by a user.
export interface ITranslation {
  id: number; // Unique identifier for the translation
  translationRequestId: number; // ID of the translation request this translation belongs to
  translatorUserName: string; // Username of the user who submitted the translation
  isGuest: boolean; // Indicates if the translator was a guest user
  translatedText: string; // The actual translated text
}

export interface IRequestTranslation {}


