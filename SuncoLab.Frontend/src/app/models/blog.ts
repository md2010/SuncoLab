import { Image } from "./image";

export class Blog {
    id: string = '';
    name: string = '';
    description?: string;
    body: string = '';
    show: boolean = true;
    coverImage?: Image;

    constructor (id: string, name: string, html: string, show: boolean, description: string|undefined, coverImage: Image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.body = html;
        this.show = show;
        this.coverImage = coverImage;
    }
}