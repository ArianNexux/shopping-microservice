import Product from "./product"

describe("Suit test for Products Entities", () => {

    it("should throw an error when id is invalid", () => {
        expect(() => {
            let product = new Product("", "P1", 0.99)
        }).toThrowError("Invalid id provided")
    })

    it("should throw an error when name is invalid", () => {
        expect(() => {
            let product = new Product("123", "", 0.99)
        }).toThrowError("Invalid name provided")
    })

    it("should throw an error when price is invalid", () => {
        expect(() => {
            let product = new Product("123", "P1", 0)
        }).toThrowError("Invalid price provided")
    })


    it("should change the price of product", () => {
        let product = new Product("123", "P1", 12.2)
        product.changePrice(10)

        expect(product.getPrice()).toBe(10)
    })

    it("should change the name of product", () => {
        let product = new Product("123", "P1", 12.2)
        product.changeName("P1-UPDATED")
        expect(product.getName()).toBe("P1-UPDATED")
    })
})