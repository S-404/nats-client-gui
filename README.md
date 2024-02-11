# NATS.js Client

gui for nats.js client

inspired by <a href="https://github.com/AlexxNB/natsman" target="_blank">natsman</a> 

![img_6.png](public/img_6.png)

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

![img.png](public/img.png)


### add subject

at the ``Subjects`` block press the ``add`` button.\
this will create empty ``Subject`` 

![img_1.png](public/img_1.png)

or

press the ``load`` button\
this will open a modal window with stored subjects 

![img_2.png](public/img_2.png)


### publish message

put ``subject`` and ``payload`` and press one of the buttons corresponding to the Nats methods

![img_3.png](public/img_3.png)

result of ``request`` or ``subscribtion`` will be shown at ``messages`` block

![img_5.png](public/img_5.png)

### save subject

press ``save`` button on ``subject`` for saving it at storage

![img_4.png](public/img_4.png)
