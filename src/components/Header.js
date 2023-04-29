'use client'

import Link from "next/link"

export default function Header() {

    return (
        <header className="w-full flex flex-col sm:flex-row items-center p-3 px-2 sm:px-8 text-white bg-slate-800">

            <div className="sm:mr-8 mb-4 sm:mb-0">
                <h1 className="text-2xl text-center">RiskThinking.AI <span className="whitespace-nowrap">Code Test</span></h1>
            </div>

            <nav className="flex sm:justify-end space-x-3 sm:space-x-4 text-sm sm:text-base whitespace-nowrap">
                <Link href="/">
                    Home
                </Link>
                <Link href="/problem1">
                    Problem 1
                </Link>
                <Link href="/problem2">
                    Problem 2
                </Link>
                <Link href="/problem3">
                    Problem 3
                </Link>
            </nav>

        </header>
    )
}