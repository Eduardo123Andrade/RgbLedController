#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(10, 11); // RX, TX

int pinButton = 3;

int led = 2;

void changeRGBLedColor();

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
  //
  pinMode(led, OUTPUT);
  //      digitalWrite(led, HIGH);

  pinMode(pinButton, INPUT_PULLUP);
}

void loop()
{

  // listen for user input and send it to the HC-05
  //  if (Serial.available()){
  //    int value =  Serial.read();
  //
  //    Serial.println(value);
  //    bluetoothSerial.write(value);
  //  }

  // listen for a response from the HC-05 and write it to the serial monitor
  if (bluetoothSerial.available())
  {
    byte receivedByte = bluetoothSerial.read();
    Serial.write(receivedByte);
    Serial.write("\r\n");

    if (receivedByte == 'L')
    {
      digitalWrite(led, HIGH);
    }

    if (receivedByte == 'D')
    {
      digitalWrite(led, LOW);
    }

    //    Serial.write("available");
  }

  if (Serial.available())
  {
    //    byte input = Serial.read();
    //    Serial.write(input);
    bluetoothSerial.write(Serial.read());

    //      bluetoothSerial.write("AT");
    //    bluetoothSerial.write(Serial.read());
  }
  //    bluetoothSerial.write(Serial.read());

  // digitalWrite(led, HIGH);
  changeRGBLedColor();

  //  if (bluetoothSerial.available())
  //  {
  //    byte receivedByte = bluetoothSerial.read();
  //
  //    if (receivedByte == 'L')
  //    {
  //      digitalWrite(led, HIGH);
  //    }
  //
  //    if (receivedByte == 'D')
  //    {
  //      digitalWrite(led, LOW);
  //    }

  // boolean acao = bitRead(receivedByte, 5); // Lê se o comando é para ligar ou desligar
  // byte porta = bitClear(bitClear(receivedByte, 6), 5);

  // digitalWrite(pinPortas[porta - 1], !acao);
  //  }
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
      bluetoothSerial.write("D");
    }
    else
    {
      Serial.write("Ligado\r\n");
      digitalWrite(led, HIGH);
      bluetoothSerial.write("L");
    }
    //   // redColor = randomNumber();
    //   // greenColor = randomNumber();
    //   // blueColor = randomNumber();

    //   // RGBColor(redColor, greenColor, blueColor);

    //  isRetention = !isRetention;
  }
  previousButtonValue = buttonValue;
  delay(100);
}
