'use client'

import { useProductContext } from "@/contexts/ProductContext"
import { Product } from "@/types/Product"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Props {
    params:
    {
        id: string
    }
}
export default function Products({ params }: Props) {
    const { id } = params
    let [products, setProducts] = useState<Product[]>([])
    const productContext = useProductContext()

    useEffect(() => {
        const fetchData = async () => {
            let products = await productContext.fetchProductsByCategoryId(Number(id))
            setProducts(products)
        }
        fetchData()
    }, [id])
    return (
        <div>
            {products.map((product) =>
            (
                <div key={product.id}>
                    {product.name}
                    {product.productVariations.map((productVariation) =>
                    (
                        <div key={productVariation.id}>
                            <Link href={`/products/${productVariation.id}`}>
                                <img style={{ width: 300, height: 300 }} src={`data:image/jpeg;base64,${productVariation.productImages[0].imageData}`} />
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )

}