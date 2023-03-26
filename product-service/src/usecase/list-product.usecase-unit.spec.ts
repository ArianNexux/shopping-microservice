import Product from "../domain/entity/product"
import ProductFactory from "../domain/factory/product-factory"
import CreateProductUseCase from "./create-product.usecase"
import ListProductUseCase from "./list-product.usecase"

describe("Suit of test of list products usecase", () => {

    const product1 = ProductFactory.create("P1", 10)
    const product2 = ProductFactory.create("P2", 10)
    const resultMock = [product1, product2]
    const MockRepositoryProduct = () => {
        return {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(resultMock)
        }
    }


    it("should find all products", async () => {
        const mockRepository = MockRepositoryProduct()
        const usecase = new ListProductUseCase(mockRepository)

        const result = await usecase.execute({})

        let output =
            [{
                id: product1.getId(),
                name: product1.getName(),
                price: product1.getPrice()
            },
            {
                id: product2.getId(),
                name: product2.getName(),
                price: product2.getPrice()
            }];


        expect(result.data).toEqual(output)

    })
})