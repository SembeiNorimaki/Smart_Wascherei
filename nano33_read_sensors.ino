#include <Arduino_LSM9DS1.h>

void read_sensors() {
  // Reads the Magnetoscope, Gyroscope and Accelerometer
  // Transmits the data via Serial port so it can be logged
  // by the ESP32 into an SD card
  
  float x, y, z;
  
  Serial.print(millis());
  Serial.print(",");
  
  if (IMU.magneticFieldAvailable()) {
    IMU.readMagneticField(x, y, z);
    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.print(z);
    Serial.print(",");
  }

  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(x, y, z);
    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.print(z);
    Serial.print(",");
  }

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
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
  Serial.println("Millis, Mag X, Mag Y, Mag Z, Gyr X, Gyr Y, Gyr Z, Acc X, Acc Y, Acc Z");
  
}

void loop() {
  read_sensors();
  delay(10);
}
