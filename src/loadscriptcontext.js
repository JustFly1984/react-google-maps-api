import { createContext } from 'react'

export const LoadScriptContext = createContext('loadscript')

export const {
  Provider: LoadScriptContextProvider,
} = LoadScriptContext
