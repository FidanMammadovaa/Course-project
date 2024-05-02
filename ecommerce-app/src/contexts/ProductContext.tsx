'use client'
import { ReactNode, createContext, useContext } from "react";


type ProductContextType = {

}

interface ProductProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/Product'

export const ProductContext = createContext<ProductContextType>({
});

export const useProductContext = () => {
    return useContext(ProductContext)
}

export default function ProductProvider({ children }: ProductProviderProps) {

   

    const contextValue: ProductContextType = {  }
    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

