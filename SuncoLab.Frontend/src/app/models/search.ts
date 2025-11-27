export class PaginatedResponse<T> {
    items: T[] = [];
    count: number = 0;
}
  
export class SearchRequest {
    pageNumber: number = 1;
    pageSize: number = 10;

    constructor(pageNumber: number, pageSize: number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}