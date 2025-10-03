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