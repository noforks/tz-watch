"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watcher = void 0;
const events_1 = __importDefault(require("events"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Watcher extends events_1.default {
    constructor(endpoint) {
        super();
        this.endpoint = 'https://mainnet-tezos.giganode.io';
        this.started = false;
        if (endpoint) {
            this.endpoint = endpoint;
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.started = true;
            while (this.started) {
                try {
                    const response = yield node_fetch_1.default(`${this.endpoint}/chains/main/mempool/monitor_operations`);
                    yield response.json(); // this throws error because response contains a unclosed list of mempoool operations
                }
                catch (e) {
                    if (e.type === 'invalid-json' && e.message.includes('Unexpected token [ in JSON at position')) {
                        this.emit('block');
                    }
                    else {
                        this.emit('error', e);
                    }
                }
            }
        });
    }
    stop() {
        this.started = false;
    }
}
exports.Watcher = Watcher;
