import Cart from "../domain/entity/cart"
import CartFactory from "../domain/factory/cart-factory"
import ItemProductFactory from "../domain/factory/item-product-factory"
import RemoveItemProductFromCart from "./remove-item-to-cart-usecase"

describe("Suit test to remove item in cart", () => {
    const cartEntity = CartFactory.create("u1")
    const item = ItemProductFactory.create("item1", 10)
    const item2 = ItemProductFactory.create("item2", 20)

    cartEntity.addItemProduct(item)
    cartEntity.addItemProduct(item2)

    const MockRepository = () => {
        return {
            list: jest.fn(),
            addItems: jest.fn(),
            find: jest.fn().mockReturnValue(cartEntity),
            removeItem: jest.fn(async (cart: Cart, id: string) => {
                cart.removeItemProduct(id);
                return true;
            }),
            create: jest.fn()
        }
    }

    it("should remove item from cart", async () => {
        const repository = MockRepository()

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
