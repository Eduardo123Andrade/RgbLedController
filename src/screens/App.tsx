import React from 'react'
import { BluetoothProvider } from '../providers/BluetoothProvider'
import { Home } from './Home'

export const App = () => {
  return (
    <BluetoothProvider>
      <Home />
    </BluetoothProvider>
  )
}