import serial, time, csv
# ser = serial.Serial('/dev/ttyUSB0',  115200, timeout = 0.1)
ser = serial.Serial('/dev/ttyACM0',  115200, timeout = 0.1)
ser.flushInput()
with open("test_data.csv","a") as f:
    writer = csv.writer(f, delimiter=",")
    for _ in range(30000):
        ser_bytes = ser.readline()
        # decoded_bytes = float(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
        if len(ser_bytes):
            # print(str(ser_bytes, 'utf-8'))
            writer.writerow([ser_bytes[:-2]])
        