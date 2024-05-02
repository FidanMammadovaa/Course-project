'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { User } from "@/types/User"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Registration() {

    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })

    let authContext = useAuth()

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            console.log(token);

            if (token) {
                router.push('/home')
            }
        }
        fetchData()
    }, [authContext])

    const handleChangeEmail = (email: string) => {
        setUser((prev) => ({ ...prev, email: email }))
    }

    const handleChangePassword = (password: string) => {
        setUser((prev) => ({ ...prev, password: password }))
    }

    const handleRegister = async () => {
        await authContext.fetchSignUpUser(user)
        let token = await getToken()

        if (token) {
            router.push('/home')
        }
    }


    return (
        <div>
            <input
                type="email"
                value={user.email}
                onChange={(e) => handleChangeEmail(e.target.value)}
                placeholder="Enter email" />
            <input
                type="password"
                value={user.password}
                onChange={(e) => handleChangePassword(e.target.value)}
                placeholder="Enter password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}