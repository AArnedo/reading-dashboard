import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
