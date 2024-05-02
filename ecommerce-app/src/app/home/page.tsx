'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { notFound } from "next/navigation"
import { useEffect } from "react"

export default function Home()
{
    let authContext = useAuth()
    useEffect(() => {
        if (authContext.currentUserId) {
            let token = getToken(authContext.currentUserId)
            if (!token) {
                return notFound()
            }
        }
    }, [authContext])


    return (
        <div>
            Home
        </div>
    )
}