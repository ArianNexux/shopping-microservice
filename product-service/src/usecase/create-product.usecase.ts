import MessageBroker from "../@shared/amqp/message-broker-interface";
import { CreateProductUseCaseInputDTO, CreateProductUseCaseOutputDTO } from "../@shared/dto/create-product-usecase.dto";
import Product from "../domain/entity/product";
import ProductFactory from "../domain/factory/product-factory";
import ProductRepositoryInterface from "../domain/repository/product-repository";

export default class CreateProductUseCase {

    constructor(
        private productRepository: ProductRepositoryInterface,
        private message_broker: MessageBroker
    ) {

    }


    async execute(input: CreateProductUseCaseInputDTO): Promise<CreateProductUseCaseOutputDTO> {
        const product = ProductFactory.create(input.name, input.price)

        await this.productRepository.create(product)

        await this.message_broker.produce(product.toString())

        return {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice()
        }
    }
}