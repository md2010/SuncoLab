import { SearchRequest } from "./search";

export class ContactForm {
    constructor(
    public id: string,
    public dateCreated: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public message: string,
    public resolved: boolean
  ) {}
}

export class ContactFormFilter extends SearchRequest {
    resolved?: boolean;
}