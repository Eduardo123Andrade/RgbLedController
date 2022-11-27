import React, { createContext, useEffect, useMemo, useState } from "react"
import RNBluetoothClassic, {
  // BluetoothDevice
  // BluetoothSerial,

} from 'react-native-bluetooth-classic';
import { NativeModule, NativeModules } from 'react-native'
import { atob } from "react-native-quick-base64";


type BluetoothProviderState = {
  // bleManager: RNBluetoothClassic
  // allDevices: BluetoothDevice[]
  // connectedDevice: Device
}

type BluetoothProvideActions = {
  scanForPeripherals: () => void;
  // connectToDevice: (deviceId: BluetoothDevice) => Promise<void>,
  disconnectDevice: () => void
  write: (value: string) => void

}

type BluetoothProvideData = [
  state: BluetoothProviderState,
  actions: BluetoothProvideActions
]

export const BluetoothContext = createContext<BluetoothProvideData>({} as BluetoothProvideData)

type BluetoothProviderProps = {
  children: React.ReactNode
}

export const BluetoothProvider = (props: BluetoothProviderProps) => {
  const scanForPeripherals = () => {
    console.log("run")
    RNBluetoothClassic.isBluetoothAvailable()
    // list()
    // .then(value => console.log({ value }))
    // .catch(error => console.log({ error }))
  }

  // useEffect(() => {
  //   BluetoothSerial.on('BluetoothSerial', () => console.log('oi'))
  //   return BluetoothSerial.removeListener('BluetoothSerial', () => console.log('bye'))

  // }, [])

  const disconnectDevice = () => {
  };

  const write = (value: string) => {

  }


  return (
    <BluetoothContext.Provider
      {...props}
      value={[
        {
          // connectedDevice,
          // requestPermissions,
          // allDevices,
          // heartRate,
        },
        {
          scanForPeripherals,
          // connectToDevice,
          disconnectDevice,
          write,
        }
      ]}
    />
  )
}