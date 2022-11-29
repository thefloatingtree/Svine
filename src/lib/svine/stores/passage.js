import { createLocalStorage } from "@macfja/svelte-persistent-store";
import { persist } from "@macfja/svelte-persistent-store";
import { derived, writable } from "svelte/store";
import { createComponentListLocalStorage } from "../lib/createComponentListLocalStorage";

function buildAtoms(persistUndoIndex, persistPassageHistory) {
    const undoIndex = persistUndoIndex(writable(0));
    const passageHistory = persistPassageHistory(writable([]));
    const currentPassage = derived([passageHistory, undoIndex], ([$passageHistory, $undoIndex]) => {
        // @ts-ignore
        if (!$passageHistory.length) return null;
        // @ts-ignore
        const currentIndex = $passageHistory.length - 1 - $undoIndex;
        return $passageHistory[currentIndex];
    });

    return {
        undoIndex,
        passageHistory,
        currentPassage,
    };
}

function buildPersist(storage, key) {
    return (atom) => {
        return persist(atom, storage(), key);
    };
}

export const undoIndexKey = 'passage-undoIndex'
export const passageHistoryKey = 'passage-history'
export const { undoIndex, passageHistory, currentPassage } = import.meta.env.DEV ?
    buildAtoms(
        (atom) => atom,
        (atom) => atom
    ) :
    buildAtoms(
        buildPersist(createLocalStorage, undoIndexKey),
        buildPersist(createComponentListLocalStorage, passageHistoryKey)
    );

function getCurrentUndoIndex() {
    let undoIndexValue = 0;
    undoIndex.subscribe(value => undoIndexValue = value);
    return undoIndexValue;
}

function getCurrentPassageHistoryLength() {
    let passageHistoryLengthValue = 0;
    passageHistory.subscribe(value => passageHistoryLengthValue = value.length);
    return passageHistoryLengthValue;
}

export function onPushPassage(callback) {
    // @ts-ignore
    onPushPassage.callbacks = onPushPassage.callbacks ? onPushPassage.callbacks : [];
    // @ts-ignore
    onPushPassage.callbacks.push(callback);
}

export function pushPassage(/** @type {any} */ passage) {
    const undoIndexValue = getCurrentUndoIndex();
    passageHistory.update(prev => [...prev.slice(0, prev.length - undoIndexValue), passage]);
    undoIndex.set(0);
    // @ts-ignore
    onPushPassage.callbacks.forEach(callback => callback(onPushPassage.didInit !== true));
    // @ts-ignore
    onPushPassage.didInit = true;
}

export function onUndo(callback) {
    // @ts-ignore
    onUndo.callbacks = onUndo.callbacks ? onUndo.callbacks : [];
    // @ts-ignore
    onUndo.callbacks.push(callback);
}

export function canUndo() {
    const undoIndexValue = getCurrentUndoIndex();
    const passageHistoryLengthValue = getCurrentPassageHistoryLength();
    return (passageHistoryLengthValue - 1 - undoIndexValue) > 0;
}

export function undo() {
    if (!canUndo())
        return;
    undoIndex.update(prev => prev + 1);
    // @ts-ignore
    onUndo.callbacks.forEach(callback => callback());
}

export function onRedo(callback) {
    // @ts-ignore
    onRedo.callbacks = onRedo.callbacks ? onRedo.callbacks : [];
    // @ts-ignore
    onRedo.callbacks.push(callback);
}

export function canRedo() {
    const undoIndexValue = getCurrentUndoIndex();
    return undoIndexValue != 0;
}

export function redo() {
    if (!canRedo())
        return;
    undoIndex.update(prev => prev - 1);
    // @ts-ignore
    onRedo.callbacks.forEach(callback => callback());
}

export function onRestart(callback) {
    // @ts-ignore
    onRestart.callbacks = onRestart.callbacks ? onRestart.callbacks : [];
    // @ts-ignore
    onRestart.callbacks.push(callback);
}

export function restart(StartPassage) {
    passageHistory.set([StartPassage]);
    undoIndex.set(0);
    // @ts-ignore
    onRestart.callbacks.forEach(callback => callback());
}