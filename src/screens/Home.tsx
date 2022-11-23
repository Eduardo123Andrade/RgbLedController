import { StyleSheet, View, } from "react-native"
import { PickerColor, RGBView, Screen } from "../components"
import { useEffect, useState } from "react"
import { convertToRGB } from "../utils"
import { RGBColor } from "../types"
import { requestMultiplePermissions, requestPermission } from "../utils/requestPermission"

const RESULTS = {
  DENIED: "denied",
  GRANTED: "granted",
  NEVER_ASK_AGAIN: "never_ask_again"
}


export const Home = () => {
  const [currentColor, setCurrentColor] = useState<string>()
  const [rgbColor, setRgbColor] = useState<RGBColor>()


  const requestPermission2 = async () => {
    try {
      const granted = await requestMultiplePermissions([
        'ACCESS_FINE_LOCATION',
        'CAMERA',
        // 'BLUETOOTH_SCAN',
        'BLUETOOTH_CONNECT',
      ])
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: 'Permissao',
      //     message: "Preciso da permissao",
      //     buttonPositive: 'ok',
      //     buttonNegative: 'cancel'
      //   }
      // ).then(res => {
      //   console.log({ res })
      //   return res
      // }).catch(e => console.log({ e }))


      // console.log({ granted }, PermissionsAndroid.RESULTS)
      if (granted) {
        console.log('allowed')
      } else {
        console.log('denied')
      }
    } catch (error) {
      console.log({ error })
    }

  }

  useEffect(() => {
    setTimeout(() => {
      requestPermission2()
    }, 2000)
  }, [])

  useEffect(() => {
    if (currentColor) {
      console.log({ currentColor })
      const replacedColor = currentColor.replace('#', '')
      const data = convertToRGB(replacedColor)

      setRgbColor(data)
    }
  }, [currentColor])


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