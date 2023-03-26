import { DataSource } from "typeorm";
import CartRepositoryInterface from "../../../@shared/cart-repository-inteface";
import Cart from "../../../domain/entity/cart";
import ItemProduct from "../../../domain/entity/item_product";
import CartFactory from "../../../domain/factory/cart-factory";
import { CartEntity } from "./entities/cart-entity";
import { ItemProductEntity } from "./entities/item-entity";

export default class CartRepositoryTypeorm implements CartRepositoryInterface {

    private app;

    constructor() {
        this.app = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [
                CartEntity,
                ItemProductEntity
            ]
        })

    }

    async setup(): Promise<void> {
        this.app = await this.app.initialize()
    }

    async create(entity: Cart): Promise<void> {
        const cartRepository = this.app.getRepository(CartEntity)

        const cartEntityTypeorm = new CartEntity()
        cartEntityTypeorm.id = entity.getId()
        cartEntityTypeorm.userId = entity.getUser()
        cartEntityTypeorm.totalQuantity = entity.getTotalItemQuantity()
        cartEntityTypeorm.totalPrice = entity.getTotalPrice()

        await cartRepository.save(cartEntityTypeorm)

    }



    async find(id: string): Promise<Cart> {
        const cartRepository = this.app.getRepository(CartEntity)

        const cartEntityTypeorm = await cartRepository.findOneBy({ id: id })

        if (!cartEntityTypeorm) {
            throw new Error("Cart not found");

        }

        return new Cart(
            cartEntityTypeorm.id,
            cartEntityTypeorm.userId
        )


    }



    async list(): Promise<Cart[]> {
        const cartRepository = this.app.getRepository(CartEntity)

        const cartEntityTypeorm = await cartRepository.find()
        if (!cartEntityTypeorm) {
            throw new Error("Cart not found")
        }

        const carts: Cart[] = cartEntityTypeorm.map((c) => {
            return new Cart(
                c.id,
                c.userId
            )
        })

        return carts

    }



    async addItems(entity: Cart, item: ItemProduct[]): Promise<Cart> {
        const cartRepository = this.app.getRepository(CartEntity)

        const cartFound = await cartRepository.findOne({
            where: {
                id: entity.getId(),
            },
            relations: {
                items_products: true,
            }
        })

        if (!cartFound) {
            throw new Error("Cart not found");
        }


        let items_saved = [];

        for (let i = 0; i < item.length; i++) {
            const itemToBeSaved = new ItemProductEntity()
            itemToBeSaved.id = item[i].getId()
            itemToBeSaved.name = item[i].getName()
            itemToBeSaved.price = item[i].getPrice()
            const result = await this.app.manager.save(itemToBeSaved)
            items_saved.push(result)
            entity.addItemProduct(new ItemProduct(result.id, result.name, result.price))
        }

        cartFound.items_products = items_saved
        cartFound.totalPrice = entity.getTotalPrice()
        cartFound.totalQuantity = entity.getTotalItemQuantity()

        const saved = await cartRepository.save(cartFound)

        if (!saved) {
            throw new Error("Cart not saved")
        }

        return entity;
    }

    async removeItem(entity: Cart, item_id: string): Promise<Cart> {
        const cartRepository = this.app.getRepository(CartEntity)

        const cartFound = await cartRepository.findOne({
            where: {
                id: entity.getId(),
            },
            relations: {
                items_products: true,
            }
        })


        if (!cartFound) {
            throw new Error("Cart not found");
        }

        entity.removeItemProduct(item_id)

        cartFound.items_products = cartFound.items_products.filter(g => g.id !== item_id);
        cartFound.totalPrice = entity.getTotalPrice()
        cartFound.totalQuantity = entity.getTotalItemQuantity()

        const saved = await cartRepository.save(cartFound)

        if (!saved) {
            throw new Error("Cart not saved");
        }


        return entity;

    }
}