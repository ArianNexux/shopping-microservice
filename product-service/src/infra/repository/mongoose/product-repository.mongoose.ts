import Product from "../../../domain/entity/product";
import ProductRepositoryInterface from "../../../domain/repository/product-repository";
import productModel from './product-schema'
export default class ProductRepositoryMongoose implements ProductRepositoryInterface {

    async create(entity: Product): Promise<any> {

        const product = new productModel({
            _id: entity.getId(),
            name: entity.getName(),
            price: entity.getPrice()
        });
        const result = await product.save()

        return result;

    }

    async find(id: string): Promise<Product> {


        let output = await productModel.findById(id).exec()
        if (!output) {
            throw new Error("No Product Found with this Id")
        }
        const product = new Product(output._id, output.name, output.price)

        return product;

    }

    async findAll(): Promise<Product[]> {
        let output = await productModel.find().exec()
        if (!output) {
            throw new Error("No Product Found")
        }

        let result: Product[] = []

        result = output.map((elem) => new Product(elem.id, elem.name, elem.price))

        return result;

    }


}