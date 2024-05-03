'use client'

import { useProductContext } from "@/contexts/ProductContext"
import { getToken } from "@/functions/storage"
import { Color } from "@/types/Color"
import { ProductVariation } from "@/types/Product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Products() {
    let productContext = useProductContext()
    const [productVariations, setProductVariations] = useState<ProductVariation[]>([])
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            if (!token) {
                router.push('/not-found')
            }
        }
        fetchData()

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            let productVariations = await productContext.fetchProductVariations()
            console.log(productVariations);
            setProductVariations(productVariations)
            
        }
        fetchData()
    }, [productContext])

    return (
        <div>
            {productVariations.length > 0 ? productVariations.map((productVariation) =>
            (
                <div key={productVariation.id}>
                    <h1>{productVariation.product.name}</h1>
                    <Link href={`/products/${productVariation.id}`}>
                        <img style={{ width: 300, height: 300 }} src={`data:image/jpeg;base64,${productVariation.productImages[0].imageData}`} alt={productVariation.product.name} />
                    </Link>
                    <h1>{Color[productVariation.color]}</h1>
                </div>
            )) : <></>}
        </div>
    )
}