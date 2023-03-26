import CartRepositoryInterface from "../@shared/cart-repository-inteface";
import { RemoveItemInputDTO, RemoveItemOutputDTO } from "../@shared/dto/remove-item-from-cart.dto";

export default class RemoveItemProductFromCart {
    constructor(
        private repository: CartRepositoryInterface
    ) {
    }

    async execute(input: RemoveItemInputDTO): Promise<RemoveItemOutputDTO> {

        const cart = await this.repository.find(input.cart);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const result = await this.repository.removeItem(cart, input.id);

        if (!result) {
            throw new Error("Item not found");
        }

        return {
            cart: cart
        }
    }
}