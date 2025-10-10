export class MosaicItem {
    id: string;
    sortOrder: number;
    blogId: string;
    path: string;

    constructor(id: string, sortOrder: number, blogId: string, path: string) {
        this.id = id;
        this.sortOrder = sortOrder;
        this.blogId = blogId;
        this.path = path;
    }
}

export class EditMosaicItem {
    sortOrder: number | undefined;
    blogId: string | undefined;
    
    constructor(sortOrder?: number, blogId? : string) {
        this.blogId = blogId;
        this.sortOrder = sortOrder;
    }
}