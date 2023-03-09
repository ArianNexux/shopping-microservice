import InvalidDataProvided from "../errors/invalid-data";

export default class Product {

    constructor(
        private id: string,
        private name: string,
        private price: number
    ) {
        this.validate()
    }


    validate() {
        if (this.id == "") {
            throw new InvalidDataProvided("id")
        }

        if (this.name == "") {
            throw new InvalidDataProvided("name")
        }

        if (this.price <= 0) {
            throw new InvalidDataProvided("price")
        }
    }
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public changePrice(price: number): void {
        this.validate()
        this.price = price
    }

    public changeName(name: string): void {
        this.validate()
        this.name = name
    }
}