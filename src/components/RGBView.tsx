import { Dimensions, StyleSheet, View } from "react-native"
import { RGBColor } from "../types"


const { height: HEIGHT, width: WIDTH } = Dimensions.get("window")


type RGBViewProps = {
  colors: RGBColor
}

export const RGBView = ({ colors }: RGBViewProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.colorContainer, { backgroundColor: `rgb(${colors?.red}, 0, 0)` }]} />
      <View style={[styles.colorContainer, { backgroundColor: `rgb(0, ${colors?.green}, 0)` }]} />
      <View style={[styles.colorContainer, { backgroundColor: `rgb(0, 0, ${colors?.blue})` }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorContainer: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.20
  }
})