import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CX-YRKsE.js","_app/immutable/chunks/disclose-version.DmvOwJqb.js","_app/immutable/chunks/runtime.B0XSerag.js","_app/immutable/chunks/legacy.Bi2pCvzg.js","_app/immutable/chunks/render.CFL4-76y.js","_app/immutable/chunks/attributes.Bl8V0nSp.js","_app/immutable/chunks/index-client.DCZV8hLY.js","_app/immutable/chunks/this.B8AdM8m1.js","_app/immutable/chunks/index.DMxuETTk.js"];
export const stylesheets = ["_app/immutable/assets/0.DAUaHgIh.css"];
export const fonts = [];
