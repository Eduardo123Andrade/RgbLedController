import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { BleManager, Device, ScanMode } from 'react-native-ble-plx';

import { atob, btoa } from "react-native-quick-base64";


const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb"
const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb"


type BluetoothProviderState = {
  connectedDevice: Device,
  receivedMessage: String
}

type BluetoothProvideActions = {
  scanForPeripherals: () => void;
  disconnectDevice: () => void
  write: (value: string) => void
  resetReceivedMessage: () => void
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
  const bleManager = useMemo(() => new BleManager({

  }), [])
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  const [receivedMessage, setReceivedMessage] = useState<string>()

  const onStartListener = useCallback(async () => {
    if (connectedDevice) {

      await connectedDevice.discoverAllServicesAndCharacteristics()
        .then(async (result) => {
          const [customCharacteristic] = await result.characteristicsForService(SERVICE_UUID)
          console.debug(JSON.stringify(customCharacteristic, null, 2))
          result.monitorCharacteristicForService(
            customCharacteristic.serviceUUID,
            customCharacteristic.uuid,
            (error, characteristic) => {
              if (characteristic) {
                const message = atob(characteristic.value)
                setReceivedMessage(message)
                return console.log({ message })
              }
              if (error)
                return console.warn({})
            }
          )
        })
    }

  }, [connectedDevice])

  useEffect(() => {
    onStartListener()
  }, [onStartListener])

  useEffect(() => {
    setAllDevices((prevState: any) => {
      if (!prevState.includes(connectedDevice))
        return [...prevState, connectDevice]

      return [...prevState]
    })
  }, [connectedDevice])


  const isDuplicatedDevice = (nextDevice: Device) =>
    allDevices.some(device => device.id === nextDevice.id)

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(
      null,
      {
        scanMode: ScanMode.Balanced,
        allowDuplicates: false,
      },
      (error, scannedDevice) => {
        if (error) {
          console.log({ error })
          return
        }
        const foundedDevice = scannedDevice.name === 'HMSoft'
        if (foundedDevice && !isDuplicatedDevice(scannedDevice)) {
          connectDevice(scannedDevice)
          stopScan()
        }
      }
    )
  }

  const connectDevice = async (device: Device) => {
    const bleDevice = await bleManager.connectToDevice(device.id, {
      autoConnect: true,
    })

    setConnectedDevice(bleDevice)
    console.log('connected')
  }

  const stopScan = () => {
    bleManager.stopDeviceScan()
    console.log('stopped scan')
  }


  const write = async (value: string) => {
    if (connectedDevice) {
      await connectedDevice.discoverAllServicesAndCharacteristics()
        .then(async (result) => {
          const [customCharacteristic] = await result.characteristicsForService(SERVICE_UUID)

          bleManager.writeCharacteristicWithResponseForDevice(
            customCharacteristic.deviceID,
            customCharacteristic.serviceUUID,
            customCharacteristic.uuid,
            btoa(value)
          )
            .then(value => console.log({ value }))
            .catch(error => console.log({ error }))
        })
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

  const resetReceivedMessage = () => setReceivedMessage(undefined)


  return (
    <BluetoothContext.Provider
      {...props}
      value={[
        {
          connectedDevice,
          receivedMessage
        },
        {
          scanForPeripherals,
          disconnectDevice,
          write,
          resetReceivedMessage
        }
      ]}
    />
  )
}