import React, { createContext, useEffect, useMemo, useState } from "react"

import { BleManager, Device, ScanCallbackType, ScanMode } from 'react-native-ble-plx'

import { atob } from "react-native-quick-base64";
// import { bleManager } from "../config/ble.config";


const SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb';


type BluetoothProviderState = {
  // bleManager: RNBluetoothClassic
  // allDevices: BluetoothDevice[]
  connectedDevice: Device
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
// const bleManager = new BleManager()


export const BluetoothProvider = (props: BluetoothProviderProps) => {
  // const x = bleManager
  // const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>();
  const bleManager = useMemo(() => new BleManager(), [])
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  const uuidDevices = allDevices.map(device => device.id)


  const isDuplicatedDevice = (devices: Device[], nextDevice: Device) =>
    devices.some(device => device.id === nextDevice.id)

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(
      null,
      {
        scanMode: ScanMode.Balanced,
        allowDuplicates: false,
      },
      (error, scannedDevice) => {
        console.log('oi')
        if (error) {
          console.log({ error })
          return
        }
        const foundedDevice = scannedDevice.name === 'HC-05'
        console.log(scannedDevice.name)
        if (foundedDevice) {
          connectDevice(scannedDevice)
        }
      }
    )

  }

  useEffect(() => {
    console.log(uuidDevices)
  }, [uuidDevices])

  useEffect(() => {

  }, [allDevices])

  const connectDevice = (device: Device) => {
    bleManager.connectToDevice(device.id)
      .then(value => {
        value.discoverAllServicesAndCharacteristics()
          .then((result => {
            console.log({
              serviceData: result.serviceData,
              uuids: result.serviceUUIDs,
            })
          }))
        setConnectedDevice(value)
        console.log('connected')
        stopScan()
      })
  }

  const stopScan = () => {
    bleManager.stopDeviceScan()
    console.log('stopped scan')
  }


  const write = (value: string) => {
    if (connectedDevice) {
      console.log(
        connectedDevice.serviceUUIDs
      )
      bleManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        '',
        '',
        value
      )
        .then(value => console.log({ value }))
        .catch(error => console.log({ error }))
    }
  }

  const disconnectDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id)
        .then(() => {
          console.log('Disconnected')
          setConnectedDevice(null);
        })
    }
  };



  return (
    <BluetoothContext.Provider
      {...props}
      value={[
        {
          connectedDevice,
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