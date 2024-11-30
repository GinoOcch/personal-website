import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.-DwOY1DC.js","_app/immutable/chunks/disclose-version.B6I5G3Gc.js","_app/immutable/chunks/runtime.DMwnETrt.js","_app/immutable/chunks/legacy.BZcxPuTT.js","_app/immutable/chunks/render.B44UvGAj.js","_app/immutable/chunks/attributes.BK6dI9iW.js","_app/immutable/chunks/index-client.Ct_vkslI.js","_app/immutable/chunks/this.97_PQvwp.js","_app/immutable/chunks/index.5oUA5jB1.js"];
export const stylesheets = ["_app/immutable/assets/0.DAUaHgIh.css"];
export const fonts = [];
