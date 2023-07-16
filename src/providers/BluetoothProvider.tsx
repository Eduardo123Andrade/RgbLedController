import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { BleManager, Device, ScanMode } from 'react-native-ble-plx';

import { atob, btoa } from "react-native-quick-base64";

type BluetoothProviderState = {
  connectedDevice: Device,
  receivedMessage: string
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
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  const [receivedMessage, setReceivedMessage] = useState<string>()

  const bleManager = useMemo(() => new BleManager(), [])

  const onStartListener = useCallback(async () => {
    if (connectedDevice?.isConnected) {
      await connectedDevice.discoverAllServicesAndCharacteristics()
        .then(async (result) => {
          const [serviceUUId] = connectedDevice.serviceUUIDs
          const [customCharacteristic] = await result.characteristicsForService(serviceUUId)

          result.monitorCharacteristicForService(
            customCharacteristic.serviceUUID,
            customCharacteristic.uuid,
            (_error, characteristic) => {
              if (characteristic) {
                const message = atob(characteristic.value)
                setReceivedMessage(message)
              }
            }
          )
        })
    }

  }, [connectedDevice])

  useEffect(() => {
    onStartListener()
  }, [onStartListener])


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
        if (foundedDevice) {
          connectDevice(scannedDevice)
          stopScan()
        }
      }
    )
  }

  const connectDevice = async (device: Device) => {
    await bleManager.connectToDevice(device.id, {
      autoConnect: true,
    }).then(() => {
      setConnectedDevice(device)
      console.log('connected')
    }).catch(error => console.warn({ error }))
  }

  const stopScan = () => {
    bleManager.stopDeviceScan()
    console.log('stopped scan')
  }


  const write = async (value: string) => {
    if (connectedDevice) {
      await connectedDevice.discoverAllServicesAndCharacteristics()
        .then(async (result) => {
          const [serviceUUId] = connectedDevice.serviceUUIDs
          const [customCharacteristic] = await result.characteristicsForService(serviceUUId)

          bleManager.writeCharacteristicWithoutResponseForDevice(
            customCharacteristic.deviceID,
            customCharacteristic.serviceUUID,
            customCharacteristic.uuid,
            btoa(value)
          )
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