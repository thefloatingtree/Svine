import dir from 'node-dir';

export function svine({ dev }) {
    const virtualModuleId = 'virtual:svine';
    const resolvedVirtualModuleId = '\0' + virtualModuleId;

    const passageImportRecords = dir
        .files('./src/story', { sync: true })
        .filter(path => path.endsWith('.svelte'))
        .map(path => ({
            name: path
                .split("/").at(-1)
                .split('.').at(0),
            path: `/${path}`
        }));

    let imports = passageImportRecords.map(record => `import ${record.name} from "${record.path}"`);
    let componentNameLookupRows = passageImportRecords.map(record => {
        return `[${record.name}]: "${record.path}"`;
    });
    let reverseComponentNameLookupRows = passageImportRecords.map(record => {
        return `"${record.path}": ${record.name}`;
    });

    if (dev) {
        imports = [];
        componentNameLookupRows = [];
        reverseComponentNameLookupRows = [];
    }

    return {
        name: 'svine',
        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                return `
                    ${imports.join('\n')}
                    export const COMPONENT_NAME_LOOKUP = {${componentNameLookupRows.join(', ')}}
                    export const REVERSE_COMPONENT_NAME_LOOKUP = {${reverseComponentNameLookupRows.join(', ')}}
                    export const hello = "hello from svine!"
                `;
            }
        }
    };
}