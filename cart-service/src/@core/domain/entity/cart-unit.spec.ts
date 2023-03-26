import Cart from "./cart"
import ItemProduct from "./item_product"

describe("Suit test of cart", () => {

    it("should throw an error when id is invalid", () => {
        expect(() => {
            let product = new Cart("", "c1")
        }).toThrowError("Invalid id provided")
    })

    it("should throw an error when name is invalid", () => {
        expect(() => {
            let product = new Cart("teste1", "")
        }).toThrowError("Invalid user provided")
    })

    it("should return the total price of cart", async () => {
        const cart = new Cart("12343", "321");
        const item1 = new ItemProduct("123", "item1", 10)
        const item2 = new ItemProduct("134", "item2", 20)

        cart.addItemProduct(item1)
        cart.addItemProduct(item2)

        let totalPrice = item1.getPrice() + item2.getPrice();

        expect(cart.getTotalPrice()).toBe(totalPrice)
    })

    it("should return the total quantity of items", async () => {
        const cart = new Cart("12343", "321");
        const item1 = new ItemProduct("123", "item1", 10)
        const item2 = new ItemProduct("134", "item2", 20)

        cart.addItemProduct(item1)
        cart.addItemProduct(item2)

        expect(cart.getTotalItemQuantity()).toBe(2)
    })

})