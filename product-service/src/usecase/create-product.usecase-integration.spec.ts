import 'dotenv/config'
import CreateProductUseCase from "./create-product.usecase"
import ProductRepositoryMongoose from "../infra/repository/mongoose/product-repository.mongoose"
import mongoose from "mongoose"
import productModel from '../infra/repository/mongoose/product-schema'
import Amqp from '../infra/amqp/amqp'
describe("Suit of test of create product usecase", () => {

    const input = {
        name: "p1",
        price: 199
    }

    const amqp = new Amqp(
        "amqp://admin:passw123@localhost:5672/",
        "products_exhange",
        "prod",
        "products_queue"
    )
    beforeAll(async () => {

        await mongoose.connect(process.env.DATABASE_MONGOOSE_CONNECTION)
    })


    it("should create a product", async () => {
        const repository = new ProductRepositoryMongoose()
        await amqp.setup()
        const usecase = new CreateProductUseCase(repository, amqp)

        const result = await usecase.execute(input)


        const expectedOutput = {
            id: expect.any(String),
            name: result.name,
            price: result.price
        }

        expect(expectedOutput).toEqual(result)

    })

    afterAll(async () => {
        await productModel.deleteMany({})
        await mongoose.connection.close()
    })
})