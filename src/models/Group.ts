export class Group {
  id: string;
  name: string;
  profile_picture_url: string;

  constructor(id: string, name: string, profile_picture_url: string) {
    this.id = id;
    this.name = name;
    this.profile_picture_url = profile_picture_url;
  }
}
