import Cart from "../domain/entity/cart"
import 'dotenv/config'
import CartFactory from "../domain/factory/cart-factory"
import ItemProductFactory from "../domain/factory/item-product-factory"
import CartRepositoryTypeorm from "../infra/db/typeorm/cart-repository-typeorm"
import RemoveItemProductFromCart from "./remove-item-to-cart-usecase"

describe("Suit test to remove item in cart", () => {
    const cartEntity = CartFactory.create("u1")
    const item = ItemProductFactory.create("item1", 10)
    const item2 = ItemProductFactory.create("item2", 20)

    cartEntity.addItemProduct(item)
    cartEntity.addItemProduct(item2)

    it("should remove item from cart", async () => {
        const repository = new CartRepositoryTypeorm()
        await repository.setup()

        const sut = new RemoveItemProductFromCart(repository)
        const input = {
            id: item.getId(),
            cart: cartEntity.getId()
        }

        expect(cartEntity.getItems().length).toBe(2)
        const { cart } = await sut.execute(input)
        expect(cart.getItems().length).toBe(1)
    })

})
