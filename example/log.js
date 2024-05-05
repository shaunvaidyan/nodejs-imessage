import * as imessage from '../index.js';

imessage.listen().on('message', (msg) => {
    console.log(msg);
});
