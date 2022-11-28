import { COMPONENT_NAME_LOOKUP, REVERSE_COMPONENT_NAME_LOOKUP } from "virtual:svine";

export function createComponentListLocalStorage() {
    return {
        getValue(key) {
            const passageNameList = window.localStorage.getItem(key);
            if (!passageNameList) return [];
            return JSON.parse(passageNameList).map(passageName => REVERSE_COMPONENT_NAME_LOOKUP[passageName]);
        },
        deleteValue(key) {
            window.localStorage.removeItem(key);
        },
        setValue(key, passageList) {
            const value = JSON.stringify(
                passageList.map(Passage => COMPONENT_NAME_LOOKUP[Passage])
            );
            window.localStorage.setItem(key, value);
        }
    };
}