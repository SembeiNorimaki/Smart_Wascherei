# Smart Wäscherei
Smart Wäscherei is a project of the MakeZurich 2020 Hackaton.

In this project we aim to detect when a washing machine is in use and when it becomes available. 

A vibration sensor will be attached to the washing machine and notify about availability of the machine via LORAWAN. 

The user can then visualize the availability of the washing machines from his/her smartphone without having to go to the basement.

TODO:

- Test vibration sensor on a washing machine.
    The vibration sensor provided uses a physical spring that is only triggered by a hard vibration.
    Vibration from washing machines might be insufficient to trigger the sensor.
    Alternative: The Arduino 33 has a Accelerometer, Gyroscope and Magnetometer, as well as a Microphone.
        This sensors should be sensitive enough to get the vibration of the washing machine.
    
- Log vibration data when the machines are running and when are not running.
    Isaac: I have a ESP32 with a SD card integrated. 
        Developing code to transmit the data from the Arduino 33 sensors to the SD card so I can log vibrations from the washing machine.

- Analyze the data and come up with a method to distinguish the two states.

- Upload data to The things network using the provided LORA module

- Make an App that gets the data from The Things Network and shows the user the availability of the washing machine.
