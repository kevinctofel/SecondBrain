Arch Linux doesn't include authentication for a fingerprint sensor by default. My Dell XPS15 has a fingerprint sensor on the power button. Would be nice to use for logins and system authentication.

---

[fprint](https://wiki.archlinux.org/title/Fprint) from the Arch Wiki details the solutions. Requires a supported sensor.

---

To check the sensor, install the _usbutils_ package and then run _lsusb_. That will show the supported devices. My fingerprint sensor is the Goodix device, which is on the list of supported devices

``` bash
lsusb

Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 003 Device 002: ID 27c6:63ac Shenzhen Goodix Technology Co.,Ltd. Goodix USB2.0 MISC
Bus 003 Device 003: ID 0c45:672e Microdia Integrated_Webcam_HD
Bus 003 Device 004: ID 8087:0026 Intel Corp. AX201 Bluetooth
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```
---

For initial support, I installed the _fprintd_ package. I then enrolled my fingerprint with the following command:

``` bash
fprintd-enroll
```

--- To add fingerprint support for login, the following was added to the /etc/pam.d/sddm file:

``` bash
auth 			[success=1 new_authtok_reqd=1 default=ignore]  	pam_unix.so try_first_pass likeauth nullok
auth 			sufficient  	pam_fprintd.so
```
