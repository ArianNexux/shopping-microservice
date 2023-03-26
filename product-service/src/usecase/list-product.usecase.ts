import { CreateProductUseCaseInputDTO, CreateProductUseCaseOutputDTO } from "../@shared/dto/create-product-usecase.dto";
import { ListProductUseCaseInputDTO, ListProductUseCaseOutputDTO } from "../@shared/dto/list-product-usecase.dto";
import product from "../domain/entity/product";
import Product from "../domain/entity/product";
import ProductFactory from "../domain/factory/product-factory";
import ProductRepositoryInterface from "../domain/repository/product-repository";

export default class ListProductUseCase {

    constructor(
        private productRepository: ProductRepositoryInterface
    ) {

    }


    async execute(input: ListProductUseCaseInputDTO): Promise<ListProductUseCaseOutputDTO> {

        const result = await this.productRepository.findAll()

        let output = result.map(e => ({
            id: e.getId(),
            name: e.getName(),
            price: e.getPrice()
        })
        )

        return {
            data: output
        }

    }
}