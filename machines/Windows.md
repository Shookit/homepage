Windows
=======

After every reinstall
---------------------

- Uninstall all non-critical applications from add/remove programs
- Uninstall all non-critical applications from start menu

### Scoop


Open a non-admin powershell

```
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
scoop install git
scoop bucket add extras

# base:
scoop install 7zip discord draw.io firefox greenshot imageglass joplin keepass neovim slack sumatrapdf windirstat winmerge

# optional:
scoop install audacity carnac obs-studio steam vlc
```


### Chocolatey

Open a Powershell with admin rights

```
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco feature enable -n allowGlobalConfirmation

# base:
cinst todoist veracrypt

# optional:
cinst calibre
```


### Windows OS tweaks

- Drivers
    - Install all drivers in `Z:\Drivers`
- Explorer
    - Desktop
        - Right click -> Sort by -> Item type
        - Right click -> View -> Auto arrange icons
    - Go to "Shook" (or other user) folder
        - Double-click 'View' tab to keep ribbon open
        - View tab
            - Show file name extensions
            - Select 'details' view, remove any "group by" options
            - Options
                - Open file explorer to "this PC"
                - Uncheck show recently used files in quick access
                - Uncheck show frequently used folders in quick access
                - View tab -> Apply to Folders
    - Right click on task bar -> Cortana -> Hidden
    - Right click on task bar -> Show task view button
    - Right click on task bar -> Show people on the taskbar
    - Right click on clock -> adjust date/time -> Set time zone
    - Quick access -> unpin all but Shook, Desktop, Downloads
- Elevated powershell
    - `powercfg -h off` (Disables hibernate)
    - `control userpasswords2` (Autologin; just on desktop, not laptop)

- Start menu
    - "power sleep"
        - Turn off screen after 1hr
        - Never sleep
    - "touchpad"
        - Increase touchpad sensitivity to '8'
    - "pc name"
        - Rename this PC
    - "arrange windows"
        - Turn off
            - When I snap a window, automatically size it to fill available space
            - When I snap a window, show what I can snap next to it
            - When I resize a snapped window, simultaneously resize any adjacent snapped window
    - "display"
        - Set monitor scale (1080p laptop = 125%, 4K 27" = 150%)
        - Night light on -> Night light settings -> set color, schedule 7PM
    - "wallpaper"
        - select wallpaper
    - "gpedit.msc"
        - Computer Configuration -> Administrative Templates -> Windows Components
            - BitLocker Drive Encryption -> Operating System Drives
                - Require additional authentication at startup -> Disabled
    - "bitlocker"
        - Turn on bitlocker
        - Print key file to PDF
    - "start"
        - Show recently added apps -> Off
    - "regedit"
        - HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System (create any missing dirs)
        - Create a new DWORD 32-bit named DisableLockWorkstation, set to "1"

### Application setup

- Firefox
    - Install bitwarden
    - Log into bitwarden
        - Set timeout to "4 hours" or "never"
        - Allow autofill
    - Log into firefox sync
    - Wait for extensions to install
    - Remove unnecessary whitespace and buttons, add toolbar
- Just log in
    - Todoist (via google)
    - Slack (4cinsights.slack.com, matthannah.slack.com)
- Setpoint (on desktop)
    - Increase mouse speed
    - Button 4 = Next
    - Button 5 = Previous
- 7zip
    - Open as an admin
    - Associate types
    - Add to shell context menu
- Greenshot
    - Open app
    - Right click on system tray icon -> Preferences
    - Start on Windows boot
- Imageglass
    - Open imageglass, set defaults via wizard
- Spotify
    - Enable HQ streaming
- neovim
    ```
    md ~\AppData\Local\nvim\autoload
    $uri = 'https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
    (New-Object Net.WebClient).DownloadFile($uri, $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath("~\AppData\Local\nvim\autoload\plug.vim"))
    ```
    - From VM, run `cp .vimrc windows/AppData/Local/nvim/init.vim`
    - Add "C:\Users\Shook\scoop\apps\neovim\current\bin;C:\Users\Shook\scoop\apps\git\current\bin" to path
- Open a file extension with application to set as default app
    - Sumatra (.pdf)
    - Keepass (.kdbx)
    - Neovim (.txt)
- WSL
```
# WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
Reboot
Install WSL2 Kernel update (.msi package)
Install Windows Terminal
wsl --set-default-version 2

# Add ssh keys
# Clone configs_scripts
# Run ansible for WSL (Run sudo su to validate sudo, and also copy id_rsa to /root/.ssh)
```
- windows terminal (add to settings)
```
# Global
`"copyOnSelect": true`
`"defaultProfile": <WSL's GUID>`

# Azure and Cmd
`"hidden": true`

# WSL
Add `"startingDirectory": "\\\\wsl$\\Ubuntu-20.04\\home\\shook"`

# Keybindings
// Copy and paste are bound to Ctrl+Shift+C and Ctrl+Shift+V in your defaults.json.
// These two lines additionally bind them to Ctrl+C and Ctrl+V.
// To learn more about selection, visit https://aka.ms/terminal-selection
{ "command": {"action": "copy", "singleLine": false }, "keys": "ctrl+c" },
{ "command": "paste", "keys": "ctrl+v" },

// Press Ctrl+Shift+F to open the search box
{ "command": "find", "keys": "ctrl+shift+f" },

// Press Alt+Shift+D to open a new pane.
// - "split": "auto" makes this pane open in the direction that provides the most surface area.
// - "splitMode": "duplicate" makes the new pane use the focused pane's profile.
// To learn more about panes, visit https://aka.ms/terminal-panes
{ "command": { "action": "splitPane", "split": "auto", "splitMode": "duplicate" }, "keys": "alt+shift+d" }
```


### After installations are done

- Right click on task bar -> Task Manager -> check startup menu (after chocolatey is done)
- Set up taskbar icons
    - Explorer
    - Firefox
    - Todoist
    - Spotify
    - Slack
    - Outlook
    - Teams
    - VMWare
- "clean"
    - Disk cleanup -> Clean up system files -> check all -> OK

WSL drive mount
---------------

### Temporary

```
sudo mount -t drvfs Z: /mnt/z
```

### Permanent

```
Open /etc/fstab and add a line such as the following:
Z: /mnt/z drvfs defaults 0 0
```


Windows 10 Hotkeys
------------------

- Win+Tab
- Win+Ctrl+Left/Right


Monitor setup
-------------

- If using monitors w/ different DPI, make sure the monitor with the lower resolution is set as the 'main' monitor, otherwise text will appear fuzzy.
- Can unlock toolbars and drag-drop them if you want the system tray to be on a different monitor other than the main one.


Deleting Windows.old or other undeletable directories
-----------------------------------------------------

- TAKEOWN /f %DIRECTORY_NAME% /r /d y
- ICACLS %DIRECTORY_NAME% /grant administrators:F /t
