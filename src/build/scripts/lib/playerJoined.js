// https://github.com/xBoyMinemc/ScriptAPI-plus/blob/main/tscripts/server-plus/playerJoined.ts
// (MODIFIED by HappyTigerV)
import EventSignal from "./EventSignal";
import { world, system } from "@minecraft/server";
const debug = false;
const runCmd = (() => {
    const overworld = world.getDimension("minecraft:overworld");
    return (cmd) => { overworld.runCommandAsync(cmd); };
})();
class PlayerJoinedEventSignal extends EventSignal {
}
class PlayerJoinedEvent {
    constructor(player) {
        //@ts-ignore
        Object.defineProperty(this, "player", {
            value: player,
            writable: false
        });
    }
    kickPlayer() {
        runCmd(`kick "${this.player.name}"`);
    }
}
const signal = new PlayerJoinedEventSignal();
const joiningPlayers = new Set();
const ticking = () => {
    system.run(ticking);
    if (joiningPlayers.size === 0)
        return;
    Array.from(world.getPlayers()).forEach(pl => {
        if (joiningPlayers.has(pl)) {
            fireEvent(pl);
            joiningPlayers.delete(pl);
        }
    });
};
const fireEvent = (player) => {
    const event = new PlayerJoinedEvent(player);
    signal.trigger(event);
};
world.events.playerJoin.subscribe((event) => {
    joiningPlayers.add(Array.from(world.getPlayers({ name: event.playerName }))[0]);
});
system.run(ticking);
//在这里导出的，得用import { xxxx } from xxxxx导入
export { PlayerJoinedEvent, //事件类
PlayerJoinedEventSignal, //事件信号类
signal as PlayerJoined //事件信号
 };
//其实也可以直接import xxxxx from xxxx导入
export default signal;
