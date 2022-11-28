/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'virtual:svine' {
    const hello: String;
    const COMPONENT_NAME_LOOKUP: { [any]: String }
    const REVERSE_COMPONENT_NAME_LOOKUP: { [String]: any }
}