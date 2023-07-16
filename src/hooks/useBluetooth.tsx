import { useContext } from 'react'
import { BluetoothContext } from '../providers'

export const useBluetooth = () => {
  const context = useContext(BluetoothContext)

  if (!context)
    throw new Error("This hook needs be wrapped by BluetoothProvider");

  return context
}