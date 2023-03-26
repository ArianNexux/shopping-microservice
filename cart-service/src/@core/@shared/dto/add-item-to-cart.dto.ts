import ItemProduct from "../../domain/entity/item_product"

type Items = {
    id: string
}
export interface AddItemToCartInputDTO {
    id?: string,
    user: string,
    items: ItemProduct[]

}

export interface AddItemToCartOutputDTO {
    items: Items[]
}