import * as imessage from '../index.js';

imessage.listen().on('message', (msg) => {
    if (!msg.fromMe) {
        imessage.send(msg.handle, msg.text);
    }
});
