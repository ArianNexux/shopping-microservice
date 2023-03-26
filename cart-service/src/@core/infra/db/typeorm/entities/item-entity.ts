import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('items_carts')
export class ItemProductEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    price: number

}