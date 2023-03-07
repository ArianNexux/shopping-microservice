import { model, Schema } from "mongoose";


const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});


const product = model<IProduct>('Products', productSchema)

export default product