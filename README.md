# electron-fetch-transport

A transport for [`node-slack-sdk`](https://github.com/slackapi/node-slack-sdk) that uses Electron's [`net`](https://electron.atom.io/docs/api/net/) module. You can use this in place of the [default request transport](https://github.com/slackapi/node-slack-sdk/blob/master/lib/clients/transports/request.js) to allow the the web & rtm clients to reap the benefits of Chromium's networking stack from Electron's main process.

## Installation

```
npm i electron-fetch-transport --save
```

## Usage

``` js
import { RtmClient } from '@slack/client';
import netTransport from 'electron-fetch-transport';

// Use Electron's `net` module for requests
const rtm = new RtmClient(token, {
  transport: netTransport,
  ...
});
```