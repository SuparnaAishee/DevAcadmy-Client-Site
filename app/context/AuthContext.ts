// "use client"

// import { createContext, useContext, useEffect, useState } from "react"
// import { authService } from "@/app/service/AuthService"

// interface AuthContextType {
//   isLoggedIn: boolean
//   userRole: string | null
//   login: () => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userRole, setUserRole] = useState<string | null>(null)

//   useEffect(() => {
//     // Check login status on mount
//     const checkAuth = () => {
//       const loggedIn = authService.isLoggedIn()
//       setIsLoggedIn(loggedIn)
//       if (loggedIn) {
//         setUserRole(authService.getUserRole())
//       } else {
//         setUserRole(null)
//       }
//     }

//     checkAuth()
//   }, [])

//   const login = () => {
//     setIsLoggedIn(true)
//     setUserRole(authService.getUserRole())
//   }

//   const logout = () => {
//     authService.logout()
//     setIsLoggedIn(false)
//     setUserRole(null)
//   }

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
