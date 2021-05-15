# tz-watch

Monitor onBlock events from the Tezos node

> yarn add tz-watch

```js
const { Watcher } = require('tz-watch')

const watcher = new Watcher("https://mainnet-tezos.giganode.io")

watcher.start()

watcher.on('block', () => {
  console.log(`New Block: ${new Date()}`)
})
```

Donations kindly accepted at **noforks.tez**
