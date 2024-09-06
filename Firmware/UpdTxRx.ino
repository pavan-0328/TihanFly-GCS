#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
// Wi-Fi connection parameters
const char * wifi_ssid = "TiHAN";
const char * wifi_password = "testbed@123";
uint16_t Port = 14550;
WiFiUDP Udp;

void setup() {
  Serial.begin(9600);
  Serial.println("Booting...");
  connectToWiFi();
  Udp.begin(Port);
}

void connectToWiFi() {
  Serial.printf("Connecting to '%s'\n", wifi_ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_password);
  if (WiFi.waitForConnectResult() == WL_CONNECTED) {
    Serial.print("Connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Connection Failed!");
  }
}


void loop() {
  // Give processing time for ArduinoOTA
  uint8_t buffer[50] = "hello world";
  memset(buffer,0,50);
  Udp.beginPacket("192.168.20.162", Port);
  Udp.write("Hello ");
  Udp.write("Raju");
  Udp.endPacket();
  Udp.parsePacket();
  if(Udp.read(buffer,50) > 0){
    Serial.println("Sending");
    Serial.println((char *)buffer);
  }
  delay(1000);
}
