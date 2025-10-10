export class Image {
    id: string;
    fileId: string;
    description: string | undefined;
    albumId: string;
    file: ImageFile;

    constructor(id: string, name: string, fileId: string, file: ImageFile, albumId: string) {
    this.id = id;
    this.fileId = fileId;
    this.file = file;
    this.albumId = albumId;
  }
}

export class ImageFile {
    id: string;
    path: string;
    fileName: string
    fileExtension: string;

    constructor(id: string, path: string, fileName: string, fileExtension: string) {
    this.id = id;
    this.path = path;
    this.fileExtension = fileExtension;
    this.fileName = fileName;
  }
}

export interface FilesChangedEvent {
  files: File[];
  index?: number;
}