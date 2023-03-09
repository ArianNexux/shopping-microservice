import 'dotenv/config'
import ProductFactory from "../../../domain/factory/product-factory"
import ProductRepositoryMongoose from "./product-repository.mongoose"
import mongoose from "mongoose"
import Product from '../../../domain/entity/product'
import productModel from './product-schema'
describe("Suit test for Product Repository with Mongoose", () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_MONGOOSE_CONNECTION)
    })


    it("should find a product", async () => {
        const product = ProductFactory.create("P2", 10.8)
        const productRepository = new ProductRepositoryMongoose();
        await productRepository.create(product);

        let productOutput: Product = await productRepository.find(product.getId());
        expect(product.getId()).toBe(productOutput.getId())
        expect(product.getName()).toBe(productOutput.getName())
        expect(product.getPrice()).toBe(productOutput.getPrice())


    })

    it("should create a product", async () => {
        const product = ProductFactory.create("P1", 10.9)
        const productRepository = new ProductRepositoryMongoose();

        await productRepository.create(product);

        let productOutput = await productModel.findById(product.getId()).exec();
        expect(product.getId()).toBe(productOutput?._id)
        expect(product.getName()).toBe(productOutput?.name)
        expect(product.getPrice()).toBe(productOutput?.price)
    })


    it("should find all products", async () => {
        const product = ProductFactory.create("P1", 10.9)
        const product1 = ProductFactory.create("P2", 11.9)
        const productRepository = new ProductRepositoryMongoose();

        await productRepository.create(product);
        await productRepository.create(product1);
        let expectedArray = [product, product1];
        let productOutput = await productRepository.findAll();

        expect(expectedArray).toEqual(productOutput)
    })

    afterEach(async () => {
        await productModel.deleteMany({})
    })
})