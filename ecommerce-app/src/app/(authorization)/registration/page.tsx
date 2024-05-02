'use client'

import { useAuth } from "@/contexts/AuthContext"
import { User } from "@/types/User"
import { useEffect, useState } from "react"

export default function Registration() {

    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })

    const authContext = useAuth()

    const handleChangeEmail = (email: string) => {
        setUser((prev) => ({ ...prev, email: email }))
    }

    const handleChangePassword = (password: string) => {
        setUser((prev) => ({ ...prev, password: password }))
    }

    const handleRegister = async () => {
        authContext.fetchSignUpUser(user)
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