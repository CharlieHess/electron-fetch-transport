# electron-fetch-transport

A transport for [`node-slack-sdk`](https://github.com/slackapi/node-slack-sdk) that uses Electron's [`net`](https://electron.atom.io/docs/api/net/) module.
This allows you to use the the web & rtm clients from Electron's main process and still reap the benefits of Chromium's networking stack.

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