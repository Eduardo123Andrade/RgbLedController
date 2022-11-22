import { RGBColor } from './../types/RgbColor';

const rightOperator = (value1: any, value2: number = 0) => (value1 >> value2) & 255

export const convertToRGB = (hexcolor: string): RGBColor => {
  let splittedHexColor = hexcolor.split('');

  if (splittedHexColor.length == 3) {
    const [localRed, localGreen, localBlue] = splittedHexColor
    splittedHexColor = [
      localRed, localRed,
      localGreen, localGreen,
      localBlue, localBlue
    ]
  }
  const joinedHexColor = '0x' + splittedHexColor.join('');

  const red = rightOperator(joinedHexColor, 16)
  const green = rightOperator(joinedHexColor, 8)
  const blue = rightOperator(joinedHexColor)

  return {
    red,
    green,
    blue
  }
}
