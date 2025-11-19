export class CarouselItem {
    id: string;
    path: string;
    imageId: string;
    sortOrder: number;

    constructor(id: string, path: string, imageId: string, sortOrder: number) {
        this.id = id;
        this.path = path;
        this.imageId = imageId;
        this.sortOrder = sortOrder;
    }
}

export class CarouselItemPreview {
    id: string;
    path: string;

    constructor(id: string, path: string) {
        this.id = id;
        this.path = path;
    }
}

export class EditCarouselItem {
    sortOrder: number | undefined;
    imageId: string | undefined;
    
    constructor(sortOrder?: number, imageId? : string) {
        this.imageId = imageId;
        this.sortOrder = sortOrder;
    }
}

export class AddCarouselItem {
    imageId: string;
    path: string;
    sortOrder: number | undefined;

    constructor(imageId : string, path: string, sortOrder?: number) {
        this.imageId = imageId;
        this.sortOrder = sortOrder;
        this.path = path;
    }
}