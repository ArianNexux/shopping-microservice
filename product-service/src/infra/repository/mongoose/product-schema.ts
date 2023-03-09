import { model, Schema, ObjectId } from "mongoose";

interface IProduct {
    _id: string
    name: string;
    price: number;
}

const productSchema = new Schema<IProduct>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
});


const productModel = model<IProduct>('Products', productSchema)

export default productModel
