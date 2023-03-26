import { v4 as uuid } from "uuid"
import ItemProduct from "../entity/item_product";

export default class ItemProductFactory {
    static create(name: string, price: number): ItemProduct {
        return new ItemProduct(uuid(), name, price)
    }
}