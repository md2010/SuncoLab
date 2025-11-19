import { Image } from "./image";

export class Album {
    id: string;
    name: string;
    description: string | undefined;
    show: boolean;
    coverImage?: Image;

    constructor(id: string, name: string, description: string | undefined, show: boolean, coverImage: Image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.show = show;
    this.coverImage = coverImage;
  }
}

export class AlbumFilter {
  visibleOnly: boolean = false;
  name: string | undefined;

  constructor(visibleOnly?: boolean, name?: string) {
    this.visibleOnly = visibleOnly ?? false;
    this.name = name;
  }
}
