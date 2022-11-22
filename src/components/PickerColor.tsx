import { StyleSheet, Text, View } from "react-native"
import ColorPicker from 'react-native-wheel-color-picker'

type PickerColorProps = {
  color: string
  onColorChange: (color: string) => void
}

export const PickerColor = (props: PickerColorProps) => {
  return (
    <View style={styles.container}>
      <ColorPicker
        {...props}
        thumbSize={20}
        sliderHidden
        swatchesOnly={false}
        swatches={false}
        discrete
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
})