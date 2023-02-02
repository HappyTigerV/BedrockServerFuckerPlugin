// https://github.com/xBoyMinemc/ScriptAPI-plus/blob/main/tscripts/server-plus/EventSignal.ts
// (modified)

import { PlayerJoinedEvent } from "./playerJoined"
export default class EventSignal {
    listeners:Set<Function> = new Set()
    subscribe(listener : (arg:PlayerJoinedEvent) => void) {
        this.listeners.add(listener)
        return listener
    }
    unsubscribe(listener: (arg:PlayerJoinedEvent) => void) {
        this.listeners.delete(listener)
    }
    trigger(ev: PlayerJoinedEvent) {
        this.listeners.forEach((listener: Function) => listener(ev))
    }
}