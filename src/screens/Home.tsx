import { StyleSheet, View, } from "react-native"
import { PickerColor, RGBView, Screen } from "../components"
import { useEffect, useState } from "react"
import { convertToRGB } from "../utils"
import { RGBColor } from "../types"
import { useBluetooth } from "../hooks/useBluetooth"


export const Home = () => {
  const [currentColor, setCurrentColor] = useState<string>()
  const [rgbColor, setRgbColor] = useState<RGBColor>()
  const [{ allDevices }, { scanForPeripherals }] = useBluetooth()


  useEffect(() => {
    if (currentColor) {
      console.log({ currentColor })
      const replacedColor = currentColor.replace('#', '')
      const data = convertToRGB(replacedColor)

      setRgbColor(data)
    }
  }, [currentColor])

  useEffect(() => {
    setTimeout(() => {
      console.log('Start scan')
      scanForPeripherals()
    }, 1500)
  }, [scanForPeripherals])


  useEffect(() => {
    console.log({ allDevices })
  }, [allDevices])


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
    paddingBottom: 400
  }
})