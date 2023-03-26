import InvalidDataProvided from "../errors/invalid-data"
import ItemProduct from "./item_product"

export default class Cart {


    private items_products: ItemProduct[] = [];

    constructor(
        private id: string,
        private user_id: string
    ) {
        this.validate()
    }

    validate() {
        if (this.id == "") {
            throw new InvalidDataProvided("id");
        }

        if (this.user_id == "") {
            throw new InvalidDataProvided("user");
        }
    }
    public getId(): string {
        return this.id;
    }

    public getTotalPrice() {
        let totalPrice = 0;
        this.items_products.map(e => {
            totalPrice += e.getPrice()
        })

        return totalPrice;
    }

    public getTotalItemQuantity() {
        return this.items_products.length;
    }

    public addItemProduct(item: ItemProduct) {
        this.items_products.push(item)
    }

    public removeItemProduct(idItem: string) {
        this.items_products = this.items_products.splice(this.items_products.findIndex(item => item.getId() == idItem), 1)
    }

    public getItems(): ItemProduct[] {
        return this.items_products;
    }

    public getUser(): string {
        return this.user_id
    }
}