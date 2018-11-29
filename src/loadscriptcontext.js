import { createContext } from 'react'

const LoadScriptContext = createContext('loadscript')

export const {
  Provider: LoadScriptContextProvider,
  Consumer: LoadScriptContextConsumer
} = LoadScriptContext
