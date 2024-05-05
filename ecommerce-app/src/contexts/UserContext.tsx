'use client'
import { getUserId, removeToken, removeUserId, setToken, setUserId } from "@/functions/storage";
import { Address } from "@/types/Address";
import { User } from "@/types/User";
import { ReactNode, createContext, useContext, useState } from "react";


type UserContextType = {
    currentSlot: string,
    setCurrentSlot: (slot: string) => void,
    fetchLogout: () => Promise<void>
    fetchAddUserAddress: (address: Address) => Promise<void>

}

interface UserProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/User'

export const UserContext = createContext<UserContextType>({
    currentSlot: '',
    setCurrentSlot: () => {},
    fetchLogout: async () => { },
    fetchAddUserAddress: async (address: Address) => {}


});

export const useUserContext = () => {
    return useContext(UserContext)
}

export default function UserProvider({ children }: UserProviderProps) {

    let [currentSlot, setCurrentSlot] = useState<string>("logout")
    const fetchLogout = async () => {
        await removeToken()
        await removeUserId()

    }


    const fetchAddUserAddress = async (address: Address) => {
        const userId = await getUserId()
        
        try {
            const url = `${baseUrl}/AddUserAddress/${userId}`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(address)
                }
            )

            if (response.ok) {
                const responseData = await response.text()
                console.log(responseData);
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }


    const contextValue: UserContextType = { currentSlot, setCurrentSlot,  fetchAddUserAddress, fetchLogout }
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

