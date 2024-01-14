export class Configs {
  furbots: boolean;
  stickerSpamLimit: number;
  timeWithoutSendingImages: number;
  timeCaptcha: number;
  functionsFun: boolean;
  functionsUtility: boolean;
  sfw: boolean;
  language: "pt" | "en" | "es";
  publisherPost: boolean;
  publisherAsk: boolean;
  threadPosts: string;
  maxPosts: number;


  constructor() {
    this.furbots = false;
    this.stickerSpamLimit = 0;
    this.timeWithoutSendingImages = 0;
    this.timeCaptcha = 0;
    this.functionsFun = false;
    this.functionsUtility = false;
    this.sfw = false;
    this.language = "en";
    this.publisherPost = false;
    this.publisherAsk = false;
    this.threadPosts = "";
    this.maxPosts = 0;
  }
}

export class Rules {
  rules: string;


  constructor() {
    this.rules = "";
  }
}

export class Welcomes {
  message: string;


  constructor() {
    this.message = "";
  }
}

export class GroupSettings {
  configs: Configs;
  rules: Rules;
  welcomes: Welcomes;


  constructor() {
    this.configs = new Configs();
    this.rules = new Rules();
    this.welcomes = new Welcomes;
  }
}