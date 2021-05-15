import EventEmitter from 'events';
import fetch from 'node-fetch';

export class Watcher extends EventEmitter {
  endpoint = 'https://mainnet-tezos.giganode.io';
  started = false;

  constructor (endpoint?: string) {
    super()
    if (endpoint) {
      this.endpoint = endpoint
    }
  }

  async start() {
    this.started = true
    while(this.started) {
      try {
        const response = await fetch(`${this.endpoint}/chains/main/mempool/monitor_operations`)
        await response.json() // this throws error because response contains a unclosed list of mempoool operations
      } catch (e) {
        if(e.type === 'invalid-json' && e.message.includes('Unexpected token [ in JSON at position')) {
          this.emit('block')
        } else {
          this.emit('error', e)
        }
      }
    }
  }

  stop() {
    this.started = false
  }
}
