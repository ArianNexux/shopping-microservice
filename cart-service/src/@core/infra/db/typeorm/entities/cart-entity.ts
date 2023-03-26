import { Entity, Column, ManyToMany, PrimaryColumn, JoinTable } from "typeorm"
import { ItemProductEntity } from "./item-entity"

@Entity('carts')
export class CartEntity {
    @PrimaryColumn()
    id: string

    @Column()
    userId: string

    @Column()
    totalQuantity: number

    @Column("text")
    totalPrice: number

    @ManyToMany(() => ItemProductEntity)
    @JoinTable({
        name: 'cart_items',
        joinColumns: [{ name: 'cart_id', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'item_id', referencedColumnName: 'id' }]
    })
    items_products: ItemProductEntity[]
}