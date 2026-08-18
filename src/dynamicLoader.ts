/**
 * Build a Trusted Types-safe expression for loading the generated background
 * runtime. The workbench CSP allows blob modules, while direct dynamic imports
 * of vscode-file URLs can be rejected by newer VS Code renderers.
 */
export function getDynamicModuleLoaderSource(dynamicUrlExpression: string): string {
    return `
                        fetch(${dynamicUrlExpression}).then((response) => {
                            if (!response.ok) {
                                throw new Error('Background runtime request failed: ' + response.status);
                            }
                            return response.text();
                        }).then((source) => {
                            const blobUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
                            return import(blobUrl).then(
                                (module) => {
                                    URL.revokeObjectURL(blobUrl);
                                    return module;
                                },
                                (error) => {
                                    URL.revokeObjectURL(blobUrl);
                                    throw error;
                                }
                            );
                        })`;
}
