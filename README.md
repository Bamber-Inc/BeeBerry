# BeeBerry
The BeeBerry is ready for action as a mounted unit, right on the hive enabling all the sensors to easily be installed into the hive without wires lying around and interfering with the bee's daily activities. Either can have an internal or external camera mounted on the hive focusing on the bee's activities, which can take random pictures.  These should and then either upload or save them while also providing a live stream of video.  I’m going to try make it as efficient as possible to buffer locally and then upload when the connection is available.


# Components
  1. Raspberry Pi Zero
  2. Pi Camera
  3. Solar panel (preferably a 12v) and 10w+
  4. Battery pack 6V


# Power consumption items
  Plaaning on using the below calculations:
  Zero idle - ~65 mA
  12 hours of no charge via solar panel for 65 mA
  12 hours of no charge via solar panel for 140 mA
    requires a 10aH battery running 4.86V to 5V (DC of course)

  Reduce your power by:
  1. No USB
  2. Raspbian Lite (official Jessie image)
  3. Disable HDMI (/usr/bin/tvservice -o, and put that in /etc/rc.local to make permanent)
  4. Disable the ACT LED - see below [## Raspberry Pi Zero - power saving]

## Raspberry Pi Zero - power saving
    The Pi Zero's values are opposite, and it only has one LED, led0 (labeled 'ACT' on the board). The LED defaults to on (brightness 0), and turns off (brightness 1) to indicate disk activity.

## Set the Pi Zero ACT LED trigger to 'none'.
    echo none | sudo tee /sys/class/leds/led0/trigger

## Turn off the Pi Zero ACT LED.
    echo 1 | sudo tee /sys/class/leds/led0/brightness
    To make these settings permanent, add the following lines to your Pi's /boot/config.txt file and reboot:

## Disable the ACT LED on the Pi Zero.
    dtparam=act_led_trigger=none
    dtparam=act_led_activelow=on


# To-Do List
  Here is my To-Do List list items with goodies I’m going to need:  3D printer for container / box Raspberry Pi Raspberry Pi Camera and IR LED’s Water tight cable connectors from the box Power 5VDC or micro-USB Water Temperature sensors x 2 (top and bottom) PH sensor will be nice Wifi or 433MHz transmitter if a Raspberry Pi Zero


# References:


Raspberry Pi power saving tips - https://www.jeffgeerling.com/blogs/jeff-geerling/controlling-pwr-act-leds-raspberry-pi
