'use client'

import { useCart } from "@/contexts/CartContext"
import { ShoppingCartItem } from "@/types/ShoppingCartItem"
import { useEffect, useState } from "react"

export default function Cart() {

    let [items, setItems] = useState<ShoppingCartItem[]>([])
    const cartContext = useCart()

    useEffect(() => {
        const fetchData = async () => {
            let items = await cartContext.fetchGetAllItems()
            setItems(items)
        }
        fetchData()

    }, [cartContext])

    return (
        <div>
            {items && items.length > 0 ? (
                <div>
                    {items.map((item, index) =>
                    (
                        <div key={index}>
                            <h1>{item.subProductVariation.id}</h1>
                            <h1>{item.quantity}</h1>
                        </div>
                    ))}
                </div>
            ) : <></>}
        </div>
    )
}