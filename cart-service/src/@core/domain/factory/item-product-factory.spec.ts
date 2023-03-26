import ItemProduct from "../entity/item_product"
import ItemProductFactory from "./item-product-factory"

describe("Suit for test product factory", () => {
    it("should be able to create a product with id", () => {
        const itemProduct = ItemProductFactory.create("P1", 10.12)

        expect(itemProduct).toBeInstanceOf(ItemProduct)
        expect(itemProduct.getName()).toBe("P1")
        expect(itemProduct.getPrice()).toBe(10.12)
    })
})