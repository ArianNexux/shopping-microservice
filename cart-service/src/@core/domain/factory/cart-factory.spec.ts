import Cart from "../entity/cart"
import CartFactory from "../factory/cart-factory"
describe("Suit for test product factory", () => {
    it("should be able to create a Cart with uuid", () => {
        const cartFactory = CartFactory.create("U1")

        expect(cartFactory).toBeInstanceOf(Cart)
        expect(cartFactory.getUser()).toBe("U1")
    })
})