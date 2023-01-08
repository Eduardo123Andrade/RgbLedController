import { Button, StyleSheet, Switch, Text, View, } from "react-native"
import { PickerColor, RGBView, Screen } from "../components"
import { useEffect, useState } from "react"
import { convertToRGB } from "../utils"
import { RGBColor } from "../types"
import { useBluetooth } from "../hooks/useBluetooth"


const LED_ON = 'E'
const LED_OFF = 'D'

const BASE = 16

const sliceValue = (num: number) => ("000" + num).slice(-3)

const formatMessageToSend = (value: RGBColor) =>
  sliceValue(value.red) + sliceValue(value.green) + sliceValue(value.blue)


const convertDecimalToHex = (value: number) => {
  const hex = value.toString(BASE)
  return hex.length === 1 ? "0" + hex : hex
}

const convertToHexColor = (value: string) => {
  const { red, green, blue } = formatRgb(value)
  return convertDecimalToHex(red) + convertDecimalToHex(green) + convertDecimalToHex(blue)
}

const formatRgb = (value: string): RGBColor => {
  const [redColor, greenColor, blueColor] = value.split(",")

  return {
    red: Number(redColor),
    green: Number(greenColor),
    blue: Number(blueColor)
  }
}

export const Home = () => {
  const [currentColor, setCurrentColor] = useState<string>()
  const [switchValue, setSwitchValue] = useState(false)
  const [rgbColor, setRgbColor] = useState<RGBColor>()
  const [{ connectedDevice, receivedMessage }, { scanForPeripherals, disconnectDevice, write, resetReceivedMessage }] = useBluetooth()


  useEffect(() => {
    if (currentColor) {
      const replacedColor = currentColor.replace('#', '')
      const data = convertToRGB(replacedColor)
      const message = formatMessageToSend(data)

      write(message)
      setRgbColor(data)
    }
  }, [currentColor])

  useEffect(() => {
    if (receivedMessage === LED_ON) {
      resetReceivedMessage()
      return onLed()
    }
    if (receivedMessage === LED_OFF) {
      resetReceivedMessage()
      return closeLed()
    }
    if (receivedMessage) {
      const hexColor = convertToHexColor(receivedMessage)
      setCurrentColor(hexColor)
    }
  }, [receivedMessage])


  const onStartScan = () => {
    scanForPeripherals()
  }

  const onDisconnect = () => {
    disconnectDevice()
  }

  const onLed = () => {
    write(LED_ON)
    setSwitchValue(true)
  }

  const closeLed = () => {
    write(LED_OFF)
    setSwitchValue(false)
  }

  const toggleSwitch = () => {
    setSwitchValue((prevState) => !prevState)
    if (switchValue) {
      return closeLed()
    }
    onLed()
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
        {!!connectedDevice &&
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {`Device: ${connectedDevice.name}`}
            </Text>
          </View>
        }
        <View style={styles.containerActionButton}>
          <View style={styles.switchContainer}>
            <Text style={styles.text}>
              Led:
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchValue ? "#3c3" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={switchValue}
              onValueChange={toggleSwitch}
            />
          </View>

          <View style={styles.containerButton}>
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
  },
  switchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerButton: {
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