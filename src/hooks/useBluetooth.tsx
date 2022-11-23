import { useContext } from "react"
import { BluetoothContext } from "../providers/BluetoothProvider"


export const useBluetooth = () => {
  const context = useContext(BluetoothContext)

  if (!context)
    throw new Error("This hook need be wrapped by BluetoothProvider")

  return context
}