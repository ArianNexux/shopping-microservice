import Product from "../entity/product"
import ProductFactory from "./product-factory"

describe("Suit for test product factory", () => {
    it("should be able to create a product with id", () => {
        const product = ProductFactory.create("P1", 10.12)

        expect(product).toBeInstanceOf(Product)
        expect(product.getName()).toBe("P1")
        expect(product.getPrice()).toBe(10.12)
    })
})