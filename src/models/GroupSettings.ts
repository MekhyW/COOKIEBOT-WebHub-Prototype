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
    this.furbots = true;
    this.stickerSpamLimit = 5;
    this.timeWithoutSendingImages = 600;
    this.timeCaptcha = 300;
    this.functionsFun = true;
    this.functionsUtility = true;
    this.sfw = true;
    this.language = "pt";
    this.publisherPost = false;
    this.publisherAsk = true;
    this.threadPosts = "9999";
    this.maxPosts = 9999;
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