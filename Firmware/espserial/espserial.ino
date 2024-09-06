#include <SoftwareSerial.h>

// Define the pins for TX and RX
#define RX_PIN 3  // GPIO3 (RX pin)
#define TX_PIN 1  // GPIO1 (TX pin)

// Create a SoftwareSerial object
SoftwareSerial mySerial(RX_PIN, TX_PIN);

void setup() {
  // Start the hardware serial port for debugging
  Serial.begin(115200);
  
  // Start the software serial port at the desired baud rate
  mySerial.begin(9600);  // Adjust the baud rate as needed
}

void loop() {
  // Check if data is available on the software serial port
  
    // Read the data and print it to the Serial Monitor
    char incomingByte = mySerial.read();
    Serial.print(incomingByte);
  
 
}
