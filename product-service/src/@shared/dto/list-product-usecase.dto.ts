type ProductData = {
    id: string
    name: string
    price: number
}

export interface ListProductUseCaseInputDTO {

}

export interface ListProductUseCaseOutputDTO {
    data: ProductData[]
}