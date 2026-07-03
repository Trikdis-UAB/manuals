# iO-8 Input/Output Expander

<div style="text-align: center;">
  <img src="./cover.webp" alt="Photo of the green iO-8 expander circuit board with terminal blocks for +DC, -DC, A, B, and AUX power on the left and eight numbered input/common terminals (1 through 8 with C between each) along the bottom." width="400">
</div>

With expander iO-8 you can increase the number of inputs and outputs in a compatible TRIKDIS device.

iO-8 has 8 contacts, which can be set to either input or output mode.

Visit [iO-8 page on *trikdis.com*](http://www.trikdis.com/) for device specifications and an up-to-date list of compatible TRIKDIS devices.

Compatible with [SP3](../../control-panels/sp3/index.md), [CG17](../../control-panels/cg17/index.md), [GT+](../../alarm-communicators/cellular/gt-plus/index.md), [GT](../../alarm-communicators/cellular/gt/index.md), [G16](../../alarm-communicators/cellular/g16/index.md), [G16T](../../alarm-communicators/cellular/g16t/index.md), [G17F](../../alarm-communicators/fire-panels/g17f/index.md), [E16](../../alarm-communicators/e16/index.md), [E16T](../../alarm-communicators/e16t/index.md), [GATOR Cellular](../../gate-controllers/gator/index.md) and [GATOR WiFi](../../gate-controllers/gator-wifi/index.md).

**Follow these steps to set up iO-8:**

1.  Wire iO-8 to a compatible TRIKDIS device as shown:

<img alt="Wiring diagram showing a TRIKDIS device's +DC, -DC, 485 A, and 485 B terminals connected by four parallel wires labeled (+12 V) to the iO-8 module's corresponding +DC, -DC, A, and B terminals." src="./image1.webp" style="display: block; margin: 1rem auto; max-width: 350px; height: auto;" />

2.  Wire inputs as shown:

<img alt="Three wiring diagrams showing an iO-8 input (xIN) and common (C) terminal wired to a normally open switch, a normally closed switch, and a normally open/closed switch combined with a 2.2k (10k) end-of-line resistor." src="./image2.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

The input wiring diagrams and resistor values are determined by the main unit to which the iO-8 module is connected.

3.  Wire outputs as shown:

<img alt="Two wiring diagrams showing the iO-8 AUX+ and xOUT terminals connected to a relay coil whose switch contacts expose NC, C, and NO terminals, and separately to a 2k2 resistor in series with an LED." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 530px; height: auto;" />

4.  Connect a USB cable to the main TRIKDIS device and open TrikdisConfig software. Press **Read [F4]**.

5.  Go to Modules window, and click on a free row in the "RS485 modules" pane. Select "iO-8 expander" in the drop-down list as shown:

<img alt="Screenshot of TrikdisConfig software's Modules screen showing the RS485 modules table with a drop-down list open on row 1, &quot;iO-8 expander&quot; highlighted among options like Not available, iO expander, iO-WL radio expander, TM17 Reader, RF-SH wireless transceiver, FLS fuel sensor, E485 communicator, and W485 (W17u) module." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

6.  Enter iO-8 Serial No. (numbers only) in the cell to the right. You will find this number on the sticker on iO-8.

7.  In the **Input** and **PGM Output** drop-down menu selection (Zones and PGM window), you will now see the iO-8 inputs and outputs, which you can enable:

    <img alt="Screenshot of TrikdisConfig software's Zones screen showing the Input drop-down for zone 1 open, listing options including Disable, CG17 1 IN, and RS485 Expander ID1 IO2 through IO8, with &quot;RS485 Expander ID1, IO2&quot; highlighted." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

The setup may differ depending on the main TRIKDIS device. Configure settings for zones and PGM outputs according to the manual of the main device.

8.  Once finished, press **Write [F5**] and disconnect USB cable.

9.  Trigger the inputs and switch outputs to test the installation.
