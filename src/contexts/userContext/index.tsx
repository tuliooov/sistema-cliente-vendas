"use client"

import { IUser } from '@/pages/api/oauth/login'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'material-ui-snackbar-provider'

export interface UserContextType {
  user: IUser
  changeUser: (newValue: IUser) => Promise<void>
}

export const UserContext = createContext({})

export const getUser = () => {
  const user =  typeof window !== "undefined" ? localStorage.getItem("user") : null
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

export const UserProvider = ({ children }: { children: any }) => {
  const { push } = useRouter()
  const snackbar = useSnackbar()
  const [user, setUser] = useState<IUser>(getUser())

  const handleMessage = useCallback((message = 'Something happened!') => {
    snackbar.showMessage(
      message,
    )
  }, [snackbar])


  const changeUser = async (value: IUser) => {
    localStorage.setItem('user', JSON.stringify(value))
    setUser(value)
  }

  const logOut = useCallback(() => {
    setUser({} as IUser)
    localStorage.removeItem('user')
    push('/')
  }, [push]	)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = user.accessToken;
    axios.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => {
      if(request && !request.url?.includes("/api/oauth")){
        if(!request.headers.Authorization){
          logOut()
          return Promise.reject(new Error('Token expirado'))
        }
      }
      return request
    })
    axios.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response
      },
      (err: any) => {
        debugger
        if(err && err.response.status === 403 && err.response.data.error === "Token expirado"){
          logOut()
        }
        console.log("err.response", err.response)
        handleMessage(err.response?.data?.error || err.message)
        return Promise.reject(err)
      },
    )
  }, [handleMessage, logOut, user.accessToken])

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = React.useContext(UserContext) as UserContextType
  if (!context) {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context
}