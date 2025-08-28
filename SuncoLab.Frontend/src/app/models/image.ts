export class Image {
    id: string;
    fileId: string;
    description: string | undefined;
    albumId: string;
    file: ImageFile;
    showInMosaic: boolean;

    constructor(id: string, name: string, fileId: string, file: ImageFile, albumId: string, showInMosaic: boolean) {
    this.id = id;
    this.fileId = fileId;
    this.file = file;
    this.albumId = albumId;
    this.showInMosaic = showInMosaic;
  }
}

export class ImageFile {
    id: string;
    relativePath: string;
    fileName: string
    fileExtension: string;

    constructor(id: string, relativePath: string, fileName: string, fileExtension: string) {
    this.id = id;
    this.relativePath = relativePath;
    this.fileExtension = fileExtension;
    this.fileName = fileName;
  }
}