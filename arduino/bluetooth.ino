#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(10, 11); // RX, TX

int pinButton = 3;

int led = 2;

void switchLed();

char switchOn[2] = "E";
char switchOff[2] = "D";

void setup()
{
  Serial.begin(9600);
  bluetoothSerial.begin(9600);
  Serial.write("working\r\n");

  pinMode(led, OUTPUT);
  pinMode(pinButton, INPUT_PULLUP);
}

void loop()
{
  if (bluetoothSerial.available())
  {
    String receivedMessage = bluetoothSerial.readString();
    Serial.print(receivedMessage);
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

  switchLed();
}

void switchLed()
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