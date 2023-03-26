import { v4 as uuid } from "uuid"
import Cart from "../entity/cart";

export default class CartFactory {
    static create(user: string): Cart {
        return new Cart(uuid(), user)
    }
}