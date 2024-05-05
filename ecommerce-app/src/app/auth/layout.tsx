'use client'
import { useAuth } from "@/contexts/AuthContext"
import { ReactNode } from "react"
import Header from "./header"
import styles from './layout.module.css'

interface Props {
    children: ReactNode
    login: ReactNode,
    registration: ReactNode
}

export default function Layout({ children, login, registration }: Props) {
    const authContext = useAuth()

    return (
        <div>
            {authContext.currentSlot === 'login' ? (
                <div className={styles.mainContainer}>
                    <Header />
                    <div>
                        {login}
                    </div>
                </div>
            ) : (
                <div className={styles.mainContainer}>
                    <Header />
                    <div>
                        {registration}
                    </div>
                </div>
            )}
            <div>
                {children}
            </div>
        </div>
    )
}
