import { REVERSE_COMPONENT_NAME_LOOKUP } from "virtual:svine";
import { passageHistory, undoIndex } from "./passage";

const savesKey = "svine-saves";

export function save() {
    if (import.meta.env.DEV) return console.error("Saving is not allowed in dev mode")
    const save = {}
    for (let i = 0; window.localStorage.key(i) !== null; i++) {
        const key = window.localStorage.key(i);
        const value = JSON.parse(window.localStorage.getItem(key));
        if (key === savesKey) continue;
        const [keyPrefix, keySuffix] = key.split('-')
        if (!save[keyPrefix]) save[keyPrefix] = {}
        save[keyPrefix][keySuffix] = value;
    }
    window.localStorage.setItem(savesKey, JSON.stringify(save));
}

export function onLoad(callback) {
    // @ts-ignore
    onLoad.callbacks = onLoad.callbacks ? onLoad.callbacks : [];
    // @ts-ignore
    onLoad.callbacks.push(callback);
}

export function load() {
    if (import.meta.env.DEV) return console.error("Loading is not allowed in dev mode")
    const save = JSON.parse(window.localStorage.getItem(savesKey));
    for (const [key, value] of Object.entries(save)) {
        const { history: historyValue, undoIndex: undoIndexValue } = value;
        if (key === "passage") {
            const historyAsComponents = historyValue.map(value => REVERSE_COMPONENT_NAME_LOOKUP[value])
            undoIndex.set(undoIndexValue)
            passageHistory.set(historyAsComponents)
        } else {
            //@ts-ignore
            onLoad.callbacks.forEach(callback => callback(value))
        }
    }
}