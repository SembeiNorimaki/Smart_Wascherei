#include <Arduino_LSM9DS1.h>

void read_sensors() {
  // Reads the Magnetoscope, Gyroscope and Accelerometer
  // Transmits the data via Serial port so it can be logged
  // by the ESP32 into an SD card
  
  float x, y, z;

  if (IMU.magneticFieldAvailable()) {
    IMU.readMagneticField(x, y, z);
    Serial.print(millis());
    Serial.print(",M,");
    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.println(z);
  }

  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(x, y, z);
    Serial.print(millis());
    Serial.print(",G,");
    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.println(z);
  }

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    Serial.print(millis());
    Serial.print(",A,");
    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.println(z);
  }
}


void setup() {
  Serial.begin(115200);
  while (!Serial);
  
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  // File header
  Serial.println("Millis,Sensor,X,Y,Z");
  
}

void loop() {
  read_sensors();
  delay(1);
}
