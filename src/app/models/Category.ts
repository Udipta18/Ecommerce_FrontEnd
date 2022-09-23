export class Category{


   title:string;
    categoryId:number

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }


    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }


    constructor(title:string,categotyId:number){
        this.title=title
        this.categoryId=categotyId


    }


}