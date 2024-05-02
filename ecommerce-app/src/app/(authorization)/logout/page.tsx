'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { notFound } from "next/navigation"
import { useEffect } from "react"

export default function LogOut() {
    let authContext = useAuth()

    useEffect(() => {
        let token = getToken()
        if (token) {
            return notFound()
        }

    }, [])

    const handleLogOut = async () => {
        await authContext.fetchLogout()
    }

    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}