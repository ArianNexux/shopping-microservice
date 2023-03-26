import ItemProduct from "../../domain/entity/item_product"

export interface ListCartOutputDTO {
    cart: CartOutputDTO[]
}

export type CartOutputDTO = {
    cartId: string
    userId: string
    totalPrice: number
    totalQuantity: number
    products: ItemProduct[]
}
export interface ListCartInputDTO {

}