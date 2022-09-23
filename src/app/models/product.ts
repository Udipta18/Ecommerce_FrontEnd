export class Product{
     productName: string;
     productDesc: string;
     productPrice: number;
     productQuantity: number;
     live: boolean;
     stock: boolean;
     imageName: string;
     categoryId: number;

     constructor(productName: string, productDesc: string, productPrice: number, productQuantity: number, live: boolean, stock: boolean, imageName: string, categoryId: number) {
        this.productName = productName
        this.productDesc = productDesc
        this.productPrice = productPrice
        this.productQuantity = productQuantity
        this.live = live
        this.stock = stock
        this.imageName = imageName
        this.categoryId = categoryId
    }

    public getProductName(): string {
        return this.productName;
    }

    public setProductName(productName: string): void {
        this.productName = productName;
    }

    public getProductDesc(): string {
        return this.productDesc;
    }

    public setProductDesc(productDesc: string): void {
        this.productDesc = productDesc;
    }

    public getProductPrice(): number {
        return this.productPrice;
    }

    public setProductPrice(productPrice: number): void {
        this.productPrice = productPrice;
    }

    public getProductQuantity(): number {
        return this.productQuantity;
    }

    public setProductQuantity(productQuantity: number): void {
        this.productQuantity = productQuantity;
    }

    public isLive(): boolean {
        return this.live;
    }

    public setLive(live: boolean): void {
        this.live = live;
    }

    public isStock(): boolean {
        return this.stock;
    }

    public setStock(stock: boolean): void {
        this.stock = stock;
    }

    public getImageName(): string {
        return this.imageName;
    }

    public setImageName(imageName: string): void {
        this.imageName = imageName;
    }

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }



    


}