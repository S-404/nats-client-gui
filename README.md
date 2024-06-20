# nats-js-client

gui for nats.js client

repository: https://github.com/S-404/nats-client-gui

releases: https://github.com/S-404/nats-client-gui/releases

inspired by <a href="https://github.com/AlexxNB/natsman" target="_blank">natsman</a>

![img_6.png](.github/readme/img_6.png)

<hr/>

## scripts


### installation

    npm i

### build

    npm run build

use compiled image from  ``/release`` directory

### development

    npm run dev

<hr/>

## how to

### connection

connect to the server, you can save the latest state to storage

![img.png](.github/readme/img.png)


### add subject

at the ``Subjects`` block press the ``+ (add)`` button.\
this will create empty ``Subject`` 

![img_1.png](.github/readme/img_1.png)

or

press the ``🔍 (search)`` button\
this will open a modal window with stored subjects 

![img_2.png](.github/readme/img_2.png)


### publish message

put ``subject`` and ``payload`` and press one of the buttons corresponding to the Nats methods

![img_3.png](.github/readme/img_3.png)

result of ``request`` or ``subscribtion`` will be shown at ``messages`` block

![img_5.png](.github/readme/img_5.png)

### save subject

press ``save`` button on ``subject`` for saving it at storage

![img_4.png](.github/readme/img_4.png)
