export class GroupSettings {
  id: string;
  language: string;
  threadPosts: string;
  furbots: boolean;
  functionsFun: boolean;
  functionsUtility: boolean;
  sfw: boolean;
  publisherPost: boolean;
  publisherAsk: boolean;
  stickerSpamLimit: number;
  timeWithoutSendingImages: number;
  timeCaptcha: number;
  maxPosts: number;
  welcomeMessage: string;
  rulesMessage: string;

  constructor(
    id: string,
    furbots: boolean,
    functionsFun: boolean,
    functionsUtility: boolean,
    sfw: boolean,
    publisherPost: boolean,
    publisherAsk: boolean,
    stickerSpamlimit: number,
    timeWithoutSendingImages: number,
    timeCaptcha: number,
    maxPosts: number,
    language: string,
    threadPosts: string,
    welcomeMessage: string,
    rulesMessage: string
  ) {
    this.id = id;
    this.furbots = furbots;
    this.stickerSpamLimit = stickerSpamlimit;
    this.timeWithoutSendingImages = timeWithoutSendingImages;
    this.timeCaptcha = timeCaptcha;
    this.functionsFun = functionsFun;
    this.functionsUtility = functionsUtility;
    this.sfw = sfw;
    this.language = language;
    this.publisherPost = publisherPost;
    this.publisherAsk = publisherAsk;
    this.threadPosts = threadPosts;
    this.maxPosts = maxPosts;
    this.welcomeMessage = welcomeMessage;
    this.rulesMessage = rulesMessage;
  }
}
