import Cart from "../domain/entity/cart"
import ItemProduct from "../domain/entity/item_product"

export default interface CartRepositoryInterface {
    addItems(entity: Cart, item: ItemProduct[]): Promise<Cart>
    removeItem(entity: Cart, idItemRemove: string): Promise<Cart>
    find(id: string): Promise<Cart>
    create(entity: Cart): Promise<void>
    list({ }): Promise<Cart[]>
}