import Cart from "../domain/entity/cart"
import CartFactory from "../domain/factory/cart-factory"
import ItemProductFactory from "../domain/factory/item-product-factory"
import AddItemProductToCart from "./add-item-to-cart-usecase"


const cart = CartFactory.create("u1")
const item = ItemProductFactory.create("item1", 10)
const item2 = ItemProductFactory.create("item2", 10)

cart.addItemProduct(item)
cart.addItemProduct(item2)

const MockRepository = () => {
    return {
        list: jest.fn(),
        addItems: jest.fn().mockReturnValue(cart),
        removeItem: jest.fn(),
        find: jest.fn().mockReturnValue(cart),
        create: jest.fn()
    }
}
describe("Suit test to add item product to cart ", () => {
    it("should add item to cart when cart already exists", async () => {
        const repository = MockRepository()


        let input = {
            id: cart.getId(),
            user: cart.getUser(),
            items: cart.getItems()
        }
        const sut = new AddItemProductToCart(repository)

        const output = await sut.execute(input)

        expect(output.items.length).toBe(cart.getTotalItemQuantity())
        expect(output.items[0].id).toBe(item.getId())
        expect(output.items[1].id).toBe(item2.getId())
    })

    it("should add item to cart when cart not exists", async () => {
        const repository = MockRepository()
        let input = {
            user: "u1",
            items: [item, item2]
        }

        const usecase = new AddItemProductToCart(repository)

        const output = await usecase.execute(input)

        expect(output.items.length).toBe(cart.getTotalItemQuantity())
        expect(output.items[0].id).toBe(item.getId())
        expect(output.items[1].id).toBe(item2.getId())
    })
})