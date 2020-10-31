#include <Arduino_LSM9DS1.h>
#include "loramodem.h"
#include "secrets.h"
#define N 1000  //Number of points
#define MINPOINTS 10
#define THR 0.009

double data[N];
bool prevMachineState = false;
bool currentMachineState = false;




LoRaWANModem modem;

double readAccelerometerZ() {
  float x, y, z;
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    return double(z);
  }
  return -999;
}

bool getMachineState() {
  // determine if the machine is ON (true) or OFF (false)
  int count = 0;
  for (int i=0; i<N; i++) {
    if (abs(data[i]) > THR)
      count++;
  }

  return count > MINPOINTS;
}

void joinModem() {
  modem.begin();
  modem.info();
  modem.join(appeui, appkey);

  unsigned long current_time = millis();
  while (modem.is_joining()) {
    if ((millis()-current_time) > 1000) {
      current_time = millis();
      Serial.println("waiting ...");
    }
  }
  Serial.println("joined");
}

void setup() {
  Serial.begin(115200);
  while (!Serial);
  delay(10000);
  
  joinModem();
  
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }  
  
  Serial.println("Ready");
}

void loop() {
  for (int i=0; i<N; i++) {
    data[i] = readAccelerometerZ();
    if (data[i] == -999) {
      Serial.println ("Error reading accelerometer");
    }
    delay(10);
  }
  
  currentMachineState = getMachineState();
  if (currentMachineState != prevMachineState) {
    // send lora
    uint8_t payload[1] = { currentMachineState};
    modem.send(payload, 1);

    prevMachineState = currentMachineState;
  }

  // deep sleep
  delay(60000 * 5);  // 5 min
}
