import React, { Children } from "react"
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native"


type ScreenProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const Screen = ({ children, style }: ScreenProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})