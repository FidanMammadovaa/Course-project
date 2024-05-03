'use client'

import { useProductContext } from "@/contexts/ProductContext"
import { Color } from "@/types/Color"
import { ProductVariation, SubProductVariation } from "@/types/Product"
import Link from "next/link"
import { useEffect, useState } from "react"


interface Props {
    params:
    {
        id: string
    }
}
export default function ProductDetails({ params }: Props) {

    let { id } = params
    let [productVariation, setProductVariation] = useState<ProductVariation | null>(null)
    let [subProductVariations, setSubProductVariations] = useState<SubProductVariation[] | null>(null)
    let [subProductVariation, setSubProductVariation] = useState<SubProductVariation | null>(null)
    let [productVariations, setProductVariations] = useState<ProductVariation[] | null>(null)

    const productContext = useProductContext()
    useEffect(() => {
        const fetchData = async () => {
            let subProductVariations = await productContext.fetchSubProductVarsByProductVarId(Number(id))
            console.log(subProductVariations);
            setSubProductVariations(subProductVariations)
            setSubProductVariation(subProductVariations[0])
        }
        fetchData()
    }, [id])


    useEffect(() => {
        const fetchData = async () => {
            if (subProductVariation) {
                let productVariations = await productContext.fetchProductVariationsByProductId(subProductVariation.productVariation.product.id)
                console.log(productVariations);

                if (productVariations) {
                    setProductVariations(productVariations)
                }
            }
        }
        fetchData()
    }, [subProductVariation])

    const handleChangeSubProductVar = async (id: number) => {
        let subProductVariation = await productContext.fetchSubProductVarById(id)
        if (subProductVariation) {
            setSubProductVariation(subProductVariation)
        }
    }

    const handleChangeProductVariation = async (id: number) => {

    }


    return (
        <div>
            {subProductVariations && subProductVariation ? (
                <div>
                    <h1>
                        {subProductVariation.productVariation.product.name}
                    </h1>
                    <h1>
                        {subProductVariation.price}
                    </h1>
                    <h1>
                        {subProductVariation.productVariation.product.description}
                    </h1>

                    <img style={{ width: 300, height: 300 }} src={`data:image/jpeg;base64,${subProductVariation.productVariation.productImages[0].imageData}`} alt={subProductVariation.productVariation.product.name} />


                    {productVariations && productVariations.length > 0 ?
                        (
                            <div>
                                {productVariations.map((productVariation) =>
                                (
                                    <div key={productVariation.id}>
                                        <Link href={`/products/${productVariation.id}`}>
                                            <h1>{Color[productVariation.color]}</h1>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                        : <></>}

                    <div>
                        {subProductVariations.map((subProductVariation) =>
                        (
                            <div key={subProductVariation.id}>
                                <button onClick={() => handleChangeSubProductVar(subProductVariation.id)}>
                                    <h1>{subProductVariation.size}</h1>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}