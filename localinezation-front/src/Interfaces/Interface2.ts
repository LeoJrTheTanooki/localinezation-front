

interface Media {
    id: number;
    userID: number;
    title: string;
    coverArt: string;
    originalLanguage: string;
    tags: string;
    categories: string;
    type: string;
    platform: string;
    translationRequests: TranslationRequest[];
    isPublished: boolean;
    isDeleted: boolean;
  }

  interface TranslationRequest {
    id: number;
    mediaId: number;
    userId: number;  // ID of the user who translated the media
    language: string;  // The language of the translation
    content: string;  // The translated content
    dateSubmitted: Date;
    isApproved: boolean;  // Whether the translation has been approved by the media owner
  }

  