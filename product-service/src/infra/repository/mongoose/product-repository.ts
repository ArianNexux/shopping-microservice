import Product from "../../../domain/entity/product";
import ProductRepositoryInterface from "../../../domain/repository/product-repository";
import 
export default class ProductRepositoryMongoose implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {

    }

    async find(id: string): Promise<Product> {

    }

    async findAll(): Promise<Product[]> {

    }


}