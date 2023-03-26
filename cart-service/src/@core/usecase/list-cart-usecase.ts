import CartRepositoryInterface from "../@shared/cart-repository-inteface";
import { ListCartInputDTO, ListCartOutputDTO } from "../@shared/dto/list-cart.dto";

export default class ListCart {
    constructor(
        private repository: CartRepositoryInterface
    ) {

    }

    async execute(input: ListCartInputDTO): Promise<ListCartOutputDTO> {

        const cart = await this.repository.list({});

        if (!cart) {
            throw new Error("No cart found")
        }


        return {
            cart: cart.map(item => {
                return {
                    cartId: item.getId(),
                    userId: item.getUser(),
                    totalPrice: item.getTotalPrice(),
                    totalQuantity: item.getTotalItemQuantity(),
                    products: item.getItems()
                }
            })
        };
    }

}