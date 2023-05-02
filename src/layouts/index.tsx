'use client'

import { useEffect } from 'react'
import Header from "../components/Header"
import Head from 'next/head'
import { useAppStore } from "../stores/app"

export default function Layout({children}:any) {

    const store = useAppStore()

    useEffect(() => {
        store.init()
    }, [])

    return (
        <div className="w-full h-full flex flex-col">
            <Head>
                <title>RiskThinking.AI Code Test</title>
            </Head>
            <Header />
            <main className="flex-1 w-full h-full">{children}</main>
        </div>
    )
}