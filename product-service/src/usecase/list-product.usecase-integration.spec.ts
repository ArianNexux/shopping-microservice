import 'dotenv/config'
import mongoose from "mongoose"
import ProductFactory from "../domain/factory/product-factory"
import ListProductUseCase from "./list-product.usecase"
import ProductRepositoryMongoose from "../infra/repository/mongoose/product-repository.mongoose"
import productModel from "../infra/repository/mongoose/product-schema"
describe("Suit of test of list products usecase", () => {

    const product1 = ProductFactory.create("P1", 10)
    const product2 = ProductFactory.create("P2", 10)

    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_MONGOOSE_CONNECTION)
    })



    it("should find all products", async () => {
        const repository = new ProductRepositoryMongoose()

        await repository.create(product1)
        await repository.create(product2)

        const usecase = new ListProductUseCase(repository)

        const result = await usecase.execute({})
        console.log(result.data)
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


        await productModel.deleteMany({})
        await mongoose.connection.close()


    })


})