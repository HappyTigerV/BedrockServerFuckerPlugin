// https://github.com/xBoyMinemc/ScriptAPI-plus/blob/main/tscripts/server-plus/EventSignal.ts
// (modified)
export default class EventSignal {
    constructor() {
        this.listeners = new Set();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return listener;
    }
    unsubscribe(listener) {
        this.listeners.delete(listener);
    }
    trigger(ev) {
        this.listeners.forEach((listener) => listener(ev));
    }
}
