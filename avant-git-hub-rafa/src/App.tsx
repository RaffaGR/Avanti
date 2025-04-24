import React, { useState } from 'react'
import { SearchForm } from './components/SearchForm'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'
import { ProfileCard } from './components/ProfileCard'
import { GithubProfile } from './types'

export function App() {
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<GithubProfile | null>(null)
  const [error, setError] = useState<{ message: string; submessage?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchGithubProfile = async () => {
    if (!username.trim()) {
      setError({ message: 'Por favor, digite um nome de usuário.' })
      setProfile(null)
      return
    }

    setError(null)
    setProfile(null)
    setIsLoading(true)

    try {
      const res = await fetch(`https://api.github.com/users/${username}`)
      if (res.status === 404) {
        setError({ message: 'Nenhum perfil foi encontrado com esse nome de usuário.', submessage: 'Tente novamente.' })
      } else if (!res.ok) {
        setError({ message: `Ocorreu um erro ao buscar o perfil: ${res.status}` })
      } else {
        const data: GithubProfile = await res.json()
        setProfile(data)
      }
    } catch (err: any) {
      setError({ message: `Ocorreu um erro na requisição: ${err.message}` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-10">
      <header className="flex flex-col items-center mb-8">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Logo GitHub"
          className="w-12 h-12 mb-2"
        />
        <h1 className="text-4xl font-bold">Perfil GitHub</h1>
      </header>

      <SearchForm
        username={username}
        setUsername={setUsername}
        onSearch={fetchGithubProfile}
      />

      {isLoading && <LoadingSpinner />}

      {error && <ErrorMessage message={error.message} submessage={error.submessage} />}

      {profile && <ProfileCard profile={profile} />}
    </div>
  )
}

export default App
