'use client'
import { Product, ProductVariation, SubProductVariation } from "@/types/Product";
import { ReactNode, createContext, useContext, useState } from "react";


type ProductContextType = {
    products: Product[]
    fetchProductVariations: () => Promise<ProductVariation[]>,
    fetchSubProductVarById: (id: number) => Promise<SubProductVariation>,
    fetchProductVarById: (id: number) => Promise<ProductVariation>,
    fetchProductVariationsByProductId: (id: number) => Promise<ProductVariation[]>,
    fetchSubProductVarsByProductVarId: (id: number) => Promise<SubProductVariation[]>,
    fetchProductsByGender: (gender: number) => Promise<Product[]>
}

interface ProductProviderProps {
    children: ReactNode
}

const baseUrl1 = 'https://localhost:7041/Product'
const baseUrl2 = 'https://localhost:7041/ProductVariation'
const baseUrl3 = 'https://localhost:7041/SubProductVariation'

export const ProductContext = createContext<ProductContextType>({
    products: [],
    fetchProductVariations: async () => [],
    fetchSubProductVarById: async (id: number) => ({} as SubProductVariation),
    fetchProductVarById: async (id: number) => ({} as ProductVariation),
    fetchProductVariationsByProductId: async (id: number) => [],
    fetchSubProductVarsByProductVarId: async (id: number) => [],
    fetchProductsByGender: async (gender: number) => []


});

export const useProductContext = () => {
    return useContext(ProductContext)
}

export default function ProductProvider({ children }: ProductProviderProps) {

    const [products, setProducts] = useState<Product[]>([])
    const fetchProductsByGender = async (gender: number) => {
        try {
            const url = `${baseUrl1}/Gender/${gender}`
            const response = await fetch(url)
            const data = await response.json()
            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchProductVariations = async () => {
        try {
            const url = `${baseUrl2}`
            const response = await fetch(url)
            const data = await response.json()
            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchSubProductVarsByProductVarId = async (id: number) => {
        try {
            const url = `${baseUrl3}/ProductVariation/${id}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchSubProductVarById = async (id: number) => {
        try {
            const url = `${baseUrl3}/${id}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchProductVarById = async (id: number) => {
        try {
            const url = `${baseUrl2}/${id}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }



    const fetchProductVariationsByProductId = async (id: number) => {
        try {
            const url = `${baseUrl2}/Product/${id}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data);

            // setProducts(data)
            return data
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const contextValue: ProductContextType = { products, fetchSubProductVarById, fetchProductVarById, fetchProductVariationsByProductId, fetchSubProductVarsByProductVarId, fetchProductVariations, fetchProductsByGender }
    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

