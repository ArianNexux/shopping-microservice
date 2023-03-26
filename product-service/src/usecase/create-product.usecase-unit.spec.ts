import mongoose from "mongoose"
import CreateProductUseCase from "./create-product.usecase"

describe("Suit of test of create product usecase", () => {

    const MockRepositoryProduct = () => {
        return {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    }

    const MockRepositoryAmqp = () => {
        return {
            produce: jest.fn().mockReturnValue(true),
        }
    }

    const input = {
        name: "p1",
        price: 199
    }

    it("should create a product", async () => {
        const mockRepository = MockRepositoryProduct()
        const mockAmqp = MockRepositoryAmqp()
        const usecase = new CreateProductUseCase(mockRepository, mockAmqp)

        const result = await usecase.execute(input)


        const expectedOutput = {
            id: expect.any(String),
            name: result.name,
            price: result.price
        }

        expect(expectedOutput).toEqual(result)

    })
})