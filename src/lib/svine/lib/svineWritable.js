import { createLocalStorage, setSerialization } from "@macfja/svelte-persistent-store";
import { persist } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";
import { onPushPassage, onRedo, onRestart, onUndo } from "../stores/passage";
import { onLoad } from "../stores/save";

setSerialization((data) => JSON.stringify(data), (input) => JSON.parse(input));

export function svineWritable(initial, key = null) {
    const shouldPersist = import.meta.env.PROD && key;

    const undoIndexAtom = shouldPersist ?
        persist(writable(0), createLocalStorage(), key + "-undoIndex") :
        writable(0);
    const historyAtom = shouldPersist ?
        persist(writable([]), createLocalStorage(), key + "-history") :
        writable([]);
    const passageBoundAtom = writable(initial);
    const atom = writable(initial);

    const getCurrentUndoIndexAtom = () => {
        let undoIndexValue = 0;
        undoIndexAtom.subscribe(value => undoIndexValue = value);
        return undoIndexValue;
    };

    const getCurrentHistoryAtom = () => {
        let historyValue = [];
        historyAtom.subscribe(value => historyValue = value);
        return historyValue;
    };

    const getCurrentAtom = () => {
        let atomValue = initial;
        atom.subscribe(value => atomValue = value);
        return atomValue;
    };

    onPushPassage(() => {
        const atomValue = getCurrentAtom();
        const undoIndexValue = getCurrentUndoIndexAtom();
        passageBoundAtom.set(atomValue);
        historyAtom.update(prev => [...prev.slice(0, prev.length - undoIndexValue), atomValue]);
        undoIndexAtom.set(0);
    });

    onUndo(() => {
        const historyAtomValue = getCurrentHistoryAtom();
        const undoIndexValue = getCurrentUndoIndexAtom();
        const nextUndoIndex = undoIndexValue + 1;
        undoIndexAtom.set(nextUndoIndex);
        atom.set(historyAtomValue[historyAtomValue.length - 1 - nextUndoIndex]);
    });

    onRedo(() => {
        const historyAtomValue = getCurrentHistoryAtom();
        const undoIndexValue = getCurrentUndoIndexAtom();
        const nextUndoIndex = undoIndexValue - 1;
        undoIndexAtom.set(nextUndoIndex);
        atom.set(historyAtomValue[historyAtomValue.length - 1 - nextUndoIndex]);
    });

    onRestart(() => {
        undoIndexAtom.set(0);
        historyAtom.set([initial]);
        passageBoundAtom.set(initial);
        atom.set(initial);
    })

    onLoad((value) => {
        const { history, undoIndex } = value
        const currentValue = history[history.length - 1 - undoIndex]
        undoIndexAtom.set(undoIndex);
        historyAtom.set(history);
        passageBoundAtom.set(currentValue);
        atom.set(currentValue);
    })

    undoIndexAtom.subscribe((index) => {
        const historyAtomValue = getCurrentHistoryAtom();
        if (!historyAtomValue.length) return;
        atom.set(historyAtomValue[historyAtomValue.length - 1 - index]);
    });

    return atom;
}