import CartFactory from "../domain/factory/cart-factory"
import ItemProductFactory from "../domain/factory/item-product-factory"
import ListCart from "./list-cart-usecase"

const cart = CartFactory.create("u1")
const cart2 = CartFactory.create("u1")
const item = ItemProductFactory.create("item1", 10)
const item2 = ItemProductFactory.create("item2", 10)

cart.addItemProduct(item)
cart2.addItemProduct(item2)

const MockRepository = () => {
    return {
        addItems: jest.fn(),
        find: jest.fn(),
        removeItem: jest.fn(),
        create: jest.fn(),
        list: jest.fn().mockReturnValue([cart, cart2]),
    }
}

describe("Suit test to list cart usecases", () => {

    test("Suit test to list carts usecases", async () => {
        const repository = MockRepository()

        const sut = new ListCart(repository)

        const output = await sut.execute({});

        expect(output.cart.length).toBe(2)
        expect(output.cart[0].cartId).toBe(cart.getId())
        expect(output.cart[1].cartId).toBe(cart2.getId())

    })
})