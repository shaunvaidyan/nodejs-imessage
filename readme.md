better-osa-imessage
====

![](https://img.shields.io/npm/dm/better-osa-imessage.svg?style=flat-square)
![](https://img.shields.io/npm/v/better-osa-imessage.svg?style=flat-square)
![](https://img.shields.io/npm/l/better-osa-imessage.svg?style=flat-square)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Send and receive iMessages through nodejs. Updated for ESM and modern NodeJS. better-osa-imessage can also get and send files.

Installation
===

**Requires OSX 10.10 Yosemite**

```bash
npm install better-osa-imessage --save
```

Usage
====

Be sure to import `better-osa-imessage`:

```js
import * as imessage from 'better-osa-imessage';
```

**Send a message**
```js
imessage.send('+15555555555', 'Hello World!');
```

**Send a file**
```js
imessage.sendFile('+15555555555', '/Users/timcook/Desktop/apple_logo.png');
```

**Receive messages**
```js
imessage.listen().on('message', (msg) => {
    if (!msg.fromMe) console.log(`'${msg.text}' from ${msg.handle}`);
});
```

**Send message to name**
```js
imessage.handleForName('Tim Cook').then(handle => {
    imessage.send(handle, 'Hello');
});
```

**Send message to group**
```js
imessage.send('chat000000000000000000', 'Hello everyone!');
```

**Send file to group**
```js
imessage.sendFile('chat000000000000000000', '/Users/timcook/Desktop/apple_logo2.png');
```

**Get recent chats**
```js
imessage.getRecentChats(20); // Defaults to 10
```

API
===

### Send a message

`send(handle, text) -> Promise`

Sends a message to the specified handle.

**handle**

Type: `string`

The user or group to send the message to, in one of the following forms:
- phone number (`+1555555555`)
- email address (`user@example.com`)
- group chat id (`chat000000000000000000`)

**text**

Type: `string`

The content of the message to be sent.

**return**

Type: `Promise<>`

A promise that resolves when the message is sent, and rejects if the
message fails to send.

### Send a file

`sendFile(handle, filepath) -> Promise`

Sends a file to the specified handle.

**handle**

Type: `string`

The user or group to send the message to, in one of the following forms:
- phone number (`+1555555555`)
- email address (`user@example.com`)
- group chat id (`chat000000000000000000`)

**filepath**

Type: `string`

The full path of the file to be sent.

**return**

Type: `Promise<>`

A promise that resolves when the file is sent, and rejects if the
file fails to send.

### Receive messages

`listen([interval]) -> EventEmitter`

Begins polling the local iMessage database for new messages.

**interval**

Type: `number`

The rate at which the database is polled for new messages. Defaults to the minimum of `1000 ms`.

**return**

Type: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

An event emitter with that listeners can be attached to. Currently it only has the `message` event.

Example message event
```js
{
    text: 'Hello, world!',
    handle: '+15555555555',
    group: null,
    date: new Date('2017-04-11T02:02:13.000Z'),
    fromMe: false,
    guid: 'F79E08A5-4314-43B2-BB32-563A2BB76177',
    file: '/Users/timcook/Library/Messages/Attachments/apple_logo3.heic',
    fileType: 'image/heic'
}
```

Example *group* message event
```js
{
    text: 'Hello, group!',
    handle: '+15555555555',
    group: 'chat000000000000000000',
    date: new Date('2017-04-23T21:18:54.943Z'),
    fromMe: false,
    guid: 'DCFE0EEC-F9DD-48FC-831B-06C75B76ACB9',
    file: null,
    fileType: null
}
```

### Get a handle for a given name

`handleForName(name) -> Promise<handle>`

**name**

Type: `string`

The full name of the desired contact, as displayed in `Messages.app`.

**return**

Type: `Promise<string>`

A promise that resolves with the `handle` of the contact, or rejects if nobody was found.

### Get the name associated with a given handle

`nameForHandle(handle) -> Promise<name>`

**handle**

Type: `string`

The handle of a contact.

**return**

Type: `Promise<string>`

A promise that resolved with the full name of the desired contact, as displayed in `Messages.app`.

### Get recents chats

`getRecentChats(limit) -> Promise`

**limit**

Type: `integer`

Amount of recent chats to return.

**return**

Type: `Promise`

A promise that resolves with an array of chats.
