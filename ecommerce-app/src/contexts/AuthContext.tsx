'use client'
import { User } from "@/types/User";
import { ReactNode, createContext, useContext, useState } from "react";


type AuthContextType = {
    userToken: string | null
    fetchSignUpUser: (user: User) => Promise<void>
    fetchLoginUser: (user: User) => Promise<void>
    fetchSignOut: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/User'

export const AuthContext = createContext<AuthContextType>({
    userToken: null,
    fetchSignUpUser: async (user: User) => { },
    fetchLoginUser: async (user: User) => { },
    fetchSignOut: async () => { }
});

export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [userToken, setUserToken] = useState<string | null>(null)

    const fetchSignUpUser = async (user: User) => {
        try {
            const url = `${baseUrl}/Registration`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )

            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData);
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchLoginUser = async (user: User) => {
        try {
            const url = `${baseUrl}/Login`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )

            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData);
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchSignOut = async () => {

    }

    const contextValue: AuthContextType = { userToken, fetchLoginUser, fetchSignUpUser, fetchSignOut }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

