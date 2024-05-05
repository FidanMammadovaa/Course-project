import { ShoppingCartItem } from "./ShoppingCartItem"

export type ShoppingCart = 
{
    id: number,
    totalQuantity: number,
    totalPrice: number,
    shoppingCartItems: ShoppingCartItem[]
}