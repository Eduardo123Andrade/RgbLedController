#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(10, 11); // RX, TX

int pinButton = 3;

int led = 2;

void changeRGBLedColor();

byte switchOn = 'E';
byte switchOff = 'D';

void setup()
{
  Serial.begin(9600);
  bluetoothSerial.begin(9600);
  Serial.write("working\r\n");
  // bluetoothSerial.write("AT+DEFAULT\r\n");
  // bluetoothSerial.write("AT+RESET\r\n");
  // bluetoothSerial.write("AT+NAME=Controller\r\n");
  // bluetoothSerial.write("AT+ROLE1\r\n");
  // bluetoothSerial.write("AT+TYPE1");

  pinMode(led, OUTPUT);
  pinMode(pinButton, INPUT_PULLUP);
}

void loop()
{
  if (bluetoothSerial.available())
  {
    byte receivedByte = bluetoothSerial.read();
    Serial.write(receivedByte);
    Serial.write("\r\n");

    if (receivedByte == switchOn)
    {
      digitalWrite(led, HIGH);
    }

    if (receivedByte == switchOff)
    {
      digitalWrite(led, LOW);
    }
  }

  if (Serial.available())
  {
    bluetoothSerial.write(Serial.read());
  }

  changeRGBLedColor();
}

void changeRGBLedColor()
{
  int buttonValue;
  static bool previousButtonValue;

  buttonValue = digitalRead(pinButton);

  if (buttonValue && (buttonValue != previousButtonValue))
  {
    bool ledValue = digitalRead(led);
    Serial.print(ledValue);
    Serial.write("\r\n");
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
    //   // redColor = randomNumber();
    //   // greenColor = randomNumber();
    //   // blueColor = randomNumber();
  }
  previousButtonValue = buttonValue;
  delay(100);
}