export interface CreateProductUseCaseInputDTO {
    name: string
    price: number
}

export interface CreateProductUseCaseOutputDTO {
    id: string,
    name: string,
    price: number
}