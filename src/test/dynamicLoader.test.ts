import * as assert from 'assert';
import { getDynamicModuleLoaderSource } from '../dynamicLoader';

const source = getDynamicModuleLoaderSource('withCacheBust(dynamicUrl)');

assert.ok(source.includes('fetch(withCacheBust(dynamicUrl))'));
assert.ok(source.includes('URL.createObjectURL'));
assert.ok(source.includes('new Blob'));
assert.ok(source.includes('URL.revokeObjectURL'));
assert.ok(!source.includes('import(withCacheBust(dynamicUrl))'));
assert.ok(!source.includes('script.src ='));

console.log('dynamic loader regression test passed');
