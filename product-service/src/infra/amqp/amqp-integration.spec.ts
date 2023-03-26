import ProductFactory from "../../domain/factory/product-factory";
import Amqp from "./amqp";

describe("Suit of test to publish message to message queue", () => {
    it("should publish message to queue", async () => {
        const sut = new Amqp(
            "amqp://admin:passw123@localhost:5672/",
            "products_exhange",
            "prod",
            "products_queue"
        )
        const products = ProductFactory.create("p1", 10)

        await sut.setup();
        const result = await sut.produce(products.toJSon().toString())

        console.log(result)
        expect(result).toBe(true)
    });
})