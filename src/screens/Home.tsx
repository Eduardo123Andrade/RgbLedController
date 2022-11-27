import { Button, StyleSheet, Text, View, } from "react-native"
import { PickerColor, RGBView, Screen } from "../components"
import { useEffect, useState } from "react"
import { convertToRGB } from "../utils"
import { RGBColor } from "../types"
import { useBluetooth } from "../hooks/useBluetooth"


export const Home = () => {
  const [currentColor, setCurrentColor] = useState<string>()
  const [rgbColor, setRgbColor] = useState<RGBColor>()
  // const [{ allDevices }, { scanForPeripherals }] = useBluetooth()
  // const [{ allDevices }, { scanForPeripherals }] = useBluetooth()
  const [{ }, { scanForPeripherals, disconnectDevice, write }] = useBluetooth()
  // const [{ }, { scanForPeripherals }] = useBluetooth()


  useEffect(() => {
    if (currentColor) {
      console.log({ currentColor })
      const replacedColor = currentColor.replace('#', '')
      const data = convertToRGB(replacedColor)

      setRgbColor(data)
    }
  }, [currentColor])


  const onStartScan = () => {
    scanForPeripherals()
  }

  const onDisconnect = () => {
    disconnectDevice()
  }

  const onLed = () => {
    write('L')
  }

  const closeLed = () => {
    write('D')
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.pickerColorContainer}>
        <PickerColor
          color={currentColor}
          onColorChange={setCurrentColor}
        />
      </View>
      <View style={styles.rbgContainer}>
        <RGBView
          colors={rgbColor}
        />
      </View>

      <View >
        {/* {!!connectedDevice && */}
        {false &&
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {`Device: ${connectedDevice.name}`}
            </Text>
          </View>
        }
        <View style={styles.containerActionButton}>
          <View style={styles.buttonAction}>
            <Button
              title="On"
              onPress={onLed}
            />
          </View>
          <View style={styles.buttonAction}>
            <Button
              title="Closed"
              onPress={closeLed}
            />
          </View>
        </View>

        <View style={styles.containerConnectionButton}>
          <View style={styles.buttonConnection}>
            <Button
              title="scan"
              onPress={onStartScan}
            />
          </View>
          <View style={styles.buttonConnection}>
            <Button
              title="disconnect"
              onPress={onDisconnect}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C3C3C3',
    justifyContent: 'space-between'

  },
  pickerColorContainer: {

  },
  rbgContainer: {
    paddingHorizontal: 20,
    paddingTop: 200
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  text: {
    color: '#000'
  },
  containerActionButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonAction: {
    width: "30%"
  },
  buttonConnection: {
    paddingVertical: 10
  },
  containerConnectionButton: {
    paddingVertical: 30
  }
})