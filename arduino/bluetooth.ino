#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(10, 11); // RX, TX

int pinButtonLed = 3;
int pinButtonRgb = 4;

int led = 2;
int redLightPin = 5;
int greenLightPin = 6;
int blueLightPin = 7;

void switchLed();
void changeRGBLedColor();
int randomNumber();

int redColor;
int greenColor;
int blueColor;

char switchOn[2] = "E";
char switchOff[2] = "D";
char rgbValueChar[12];
String rgbValue = String();

void setup()
{
  Serial.begin(9600);
  bluetoothSerial.begin(9600);
  Serial.write("working\r\n");

  pinMode(led, OUTPUT);
  pinMode(redLightPin, OUTPUT);
  pinMode(greenLightPin, OUTPUT);
  pinMode(blueLightPin, OUTPUT);

  pinMode(pinButtonLed, INPUT_PULLUP);
  pinMode(pinButtonRgb, INPUT_PULLUP);
}

void loop()
{

  if (bluetoothSerial.available())
  {
    String receivedMessage = bluetoothSerial.readString();

    if (receivedMessage == switchOn)
    {
      digitalWrite(led, HIGH);
    }
    else if (receivedMessage == switchOff)
    {
      digitalWrite(led, LOW);
    }
    else
    {
      int redColor = receivedMessage.substring(0, 3).toInt();
      int greenColor = receivedMessage.substring(3, 6).toInt();
      int blueColor = receivedMessage.substring(6, 9).toInt();

      setRGBColor(redColor, greenColor, blueColor);
    }
  }

  switchLed();
  changeRGBLedColor();
}

void switchLed()
{
  int buttonValue;
  static bool previousButtonValue;

  buttonValue = digitalRead(pinButtonLed);

  if (buttonValue && (buttonValue != previousButtonValue))
  {
    bool ledValue = digitalRead(led);

    if (ledValue)
    {
      Serial.write("Desligado\r\n");
      digitalWrite(led, LOW);
      bluetoothSerial.write(switchOff);
    }
    else
    {
      Serial.write("Ligado\r\n");
      digitalWrite(led, HIGH);
      bluetoothSerial.write(switchOn);
    }
  }
  previousButtonValue = buttonValue;
  delay(100);
}

void changeRGBLedColor()
{
  int buttonValue;
  static bool previousButtonValue;

  buttonValue = digitalRead(pinButtonRgb);

  if (buttonValue && (buttonValue != previousButtonValue))
  {
    redColor = randomNumber();
    greenColor = randomNumber();
    blueColor = randomNumber();

    setRGBColor(redColor, greenColor, blueColor);

    rgbValue = String(redColor) + "," + String(greenColor) + "," + String(blueColor);

    rgbValue.toCharArray(rgbValueChar, 12);
    bluetoothSerial.write(rgbValueChar);

    rgbValue = "";
  }
  previousButtonValue = buttonValue;
  delay(100);
}

int randomNumber()
{
  static int minRgbValue = 0;
  static int maxRgbValue = 255;

  int timeInMiliseconds = micros();
  timeInMiliseconds = timeInMiliseconds % ((minRgbValue - maxRgbValue) + 1) + minRgbValue;
  return abs(timeInMiliseconds);
}

void setRGBColor(int red_light_value, int green_light_value, int blue_light_value)
{
  analogWrite(redLightPin, red_light_value);
  analogWrite(greenLightPin, green_light_value);
  analogWrite(blueLightPin, blue_light_value);
}
