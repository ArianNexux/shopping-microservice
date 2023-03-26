import Cart from "../../domain/entity/cart";

export interface RemoveItemOutputDTO {
    cart: Cart;
}
export interface RemoveItemInputDTO {
    cart: string
    id: string;
}