import React from 'react'
import { BluetoothProvider } from '../providers'
import { Home } from './Home'

export const App = () => {
  return (
    <BluetoothProvider>
      <Home />
    </BluetoothProvider>
  )
}