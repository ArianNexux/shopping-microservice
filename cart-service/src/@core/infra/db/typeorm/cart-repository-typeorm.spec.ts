import 'dotenv/config'
import CartFactory from "../../../domain/factory/cart-factory";
import CartRepositoryTypeorm from "./cart-repository-typeorm";
import { DataSource } from "typeorm";
import { CartEntity } from "./entities/cart-entity";
import { ItemProductEntity } from './entities/item-entity';
import ItemProductFactory from '../../../domain/factory/item-product-factory';

describe("Suit tests of Cart Repository with Typeorm", () => {

    const cartRepository = new CartRepositoryTypeorm()
    let AppDataSource: DataSource;
    beforeAll(async () => {
        await cartRepository.setup();
        AppDataSource = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [CartEntity, ItemProductEntity]
        })
        AppDataSource = await AppDataSource.initialize()
    })

    test("should create a cart", async () => {
        const cart = CartFactory.create("u1");
        await cartRepository.create(cart)
        const cartRepositoryTypeorm = AppDataSource.getRepository(CartEntity)

        const cartFound = await cartRepositoryTypeorm.findOneBy({
            id: cart.getId(),
        })

        expect(cartFound).toBeDefined()
        expect(cartFound?.id).toBe(cart.getId())

    })

    test("should find a cart", async () => {
        const cart = CartFactory.create("u1");

        await cartRepository.create(cart)

        const result = await cartRepository.find(cart.getId())
        const cartRepositoryTypeorm = AppDataSource.getRepository(CartEntity)

        const cartFound = await cartRepositoryTypeorm.findOneBy({
            id: cart.getId(),
        })

        expect(cartFound?.id).toBe(result.getId())

    })

    test("should list all carts", async () => {
        const cart = CartFactory.create("u1");

        await cartRepository.create(cart)

        const result = await cartRepository.list()

        expect(result?.length).toBeGreaterThan(0)
        expect(result[0]).toHaveProperty('getId')
    })

    test("should add items product in to carts", async () => {
        const cart = CartFactory.create("u1");

        await cartRepository.create(cart)

        const item_product1 = ItemProductFactory.create("p1", 100)
        const item_product2 = ItemProductFactory.create("p2", 200)

        const result = await cartRepository.addItems(cart, [item_product1, item_product2])

        expect(result.getItems().length).toBeGreaterThan(0)
        expect(result.getTotalPrice()).toBe(cart.getTotalPrice())
    })

    test("should remove items product from carts", async () => {
        const cart = CartFactory.create("u1");


        await cartRepository.create(cart)

        const item_product1 = ItemProductFactory.create("p1", 100)
        const item_product2 = ItemProductFactory.create("p2", 200)
        cart.addItemProduct(item_product1)
        cart.addItemProduct(item_product2)

        await cartRepository.addItems(cart, [item_product1, item_product2])

        const result = await cartRepository.removeItem(cart, item_product1.getId())


        expect(result.getItems().length).toBe(1)
        expect(result.getTotalPrice()).toBe(cart.getTotalPrice())
    })


    afterAll(async () => {
        //await AppDataSource.query("TRUNCATE cart_items;TRUNCATE carts; TRUNCATE item_carts;")
    })
})