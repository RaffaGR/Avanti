import React from 'react'
import { GithubProfile } from '../types'

interface Props {
    profile: GithubProfile
}

export function ProfileCard({ profile }: Props) {
    return (
        <div className="w-[50%] p-6 rounded-lg shadow-xl bg-gray-300 text-gray-800">
            <div className="flex flex-col sm:flex-row items-center">
                <img
                    src={profile.avatar_url}
                    alt={`Foto de perfil de ${profile.name || profile.login}`}
                    className="w-24 h-24 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0 border-4 border-blue-500"
                />
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold mb-1">{profile.name || profile.login}</h2>
                    <p className="text-gray-700">{profile.bio || 'Bio não disponível.'}</p>
                </div>
            </div>
        </div>
    )
}
