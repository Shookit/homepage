## Install

Complete CD's GUI installer (user=shook, hostname=shook-vm)

```bash
sudo pacman -Syu
sudo pacman -S git sudo openssh open-vm-tools python-virtualenv
sudo vmhgfs-fuse .host:/Shook /mnt/windows
(Move ssh key to ~/.ssh/id_rsa)
git clone git@github.com:/Shookit/configs-scripts
Create virtualenv, run provisioning
```
