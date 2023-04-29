import React, { useEffect } from 'react'
import Header from "../components/Header"
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>RiskThinking.AI Code Test</title>
            </Head>
            <Header />
            <main className={`${inter.className}`}>{children}</main>
        </>
    )
}