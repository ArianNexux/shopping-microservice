import CartRepositoryInterface from "../@shared/cart-repository-inteface";
import { AddItemToCartInputDTO, AddItemToCartOutputDTO } from "../@shared/dto/add-item-to-cart.dto";
import Cart from "../domain/entity/cart";
import CartFactory from "../domain/factory/cart-factory";

export default class AddItemProductToCart {
    constructor(
        private repository: CartRepositoryInterface
    ) {

    }

    async execute(input: AddItemToCartInputDTO): Promise<AddItemToCartOutputDTO> {
        let cart: Cart;

        if (input.id)
            cart = await this.repository.find(input.id)
        else {
            cart = CartFactory.create(input.user)
            await this.repository.create(cart)
        }

        const output = await this.repository.addItems(cart, input.items)
        return {
            items: output.getItems().map(e => ({
                id: e.getId()
            }))
        };


    }

}