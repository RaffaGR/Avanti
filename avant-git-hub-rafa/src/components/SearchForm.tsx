import React, { FormEvent } from 'react'

interface Props {
    username: string
    setUsername: (u: string) => void
    onSearch: () => void
}

export function SearchForm({ username, setUsername, onSearch }: Props) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex mb-8"
        >
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.currentTarget.value)}
                placeholder="Digite um usuário do Github"
                className="flex-grow p-3 rounded-l-lg border-none focus:outline-none text-gray-900 bg-gray-200"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    )
}
