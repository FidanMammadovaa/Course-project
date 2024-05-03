import { SubProductVariation } from "./Product"

export type ShoppingCartItem =
{
    id: number
    quantity: number,
    totalPrice: number,
    subProductVariation: SubProductVariation
}