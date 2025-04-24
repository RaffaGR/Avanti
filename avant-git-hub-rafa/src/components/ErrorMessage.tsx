import React from 'react'

interface Props {
  message: string
  submessage?: string
}

export function ErrorMessage({ message, submessage }: Props) {
  return (
    <div className="w-[50%] p-6 rounded-lg shadow-xl bg-gray-200 text-red-800">
      <p className="text-red-600 text-center font-semibold">{message}</p>
      {submessage && (
        <p className="text-red-600 text-center font-semibold">{submessage}</p>
      )}
    </div>
  )
}
