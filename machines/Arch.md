Arch
====

Color config
------------

- To try a new color scheme
    - `npm install --global base16-builder`
    - `base16-builder ls schemes`
    - `base16-builder -s tube -t gnome-terminal -b dark > add_profile.bash`
    - May have to remove first line if brackets are weird
    - `bash add_profile.bash`
    - Select profile in gnome-terminal
    - `dconf dump / > dconf.bak` to see new profile content
- To use a new color scheme permanently
    - Move `palette background-color foreground-color bold-color` to dconf.bak in ansible


Multilib
--------

Gives access to 32-bit libs

```bash
vi /etc/pacman.conf:

[multilib]
Include = /etc/pacman.d/mirrorlist
```

AUR installs
------------

`packer` is used to install scripts from the user repository. To modify a buildfile before it's run, use the following command:

```bash
packer -S --preview packagename
```


HTPC video drivers
------------------

- Use open source drivesr
- In /etc/X11/xorg.conf: exavsync "on" if screen tearing

### HDMI audio passthrough

- To enable HDMI audio add radeon.audio=1 to kernel parameters
- See available audio out sources: pacmd list-sinks | grep -e 'name:' -e 'index'
- Change default audio out source: pacmd set-default-sink 0
- Have to statically load module (see /etc/pulse/default.pa snippet below) because hdmi doesn't come up right away; then set the default to 0 (the static hardware), not the automatically detected sink.
- If steam crackles w/ this audio, launch steam with: PULSE_LATENCY_MSEC=30 (edit the launcher w/ appropriate sh to set environment)

```bash
load-module module-alsa-sink device=hw:1,3
set-default-sink 0
```


Remove orphaned packages
------------------------

```bash
# Find explicitly installed packages
pacman -Qqe|sort > explicit
pacman -Qqg base base-devel xorg xorg-apps | sort > base
comm -13 base explicit
# Remove any unneeded packages

# Remove non-explicit dependencies
sudo pacman -Rs $(pacman -Qdtq)
sudo pacman -Rs $(pacman -Qdttq)
```


360 wireless controller
-----------------------

Install xboxdrv


```bash
vi /etc/system.d/somefilename
[Unit]
Description=Xboxdrv
[Service]
ExecStart=/usr/bin/xboxdrv --mimic-xpad
[Install]
WantedBy=multi-user.target
```

/etc/modprobe.d/blacklist.conf:

```bash
blacklist xpad
```

/etc/modules-load.d/autoload.conf:

```bash
uinput
```

