export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/icon1.svg","images/icon1_dark.svg","images/profile.jpg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.tk_xn-lc.js","app":"_app/immutable/entry/app.CtI7SkGh.js","imports":["_app/immutable/entry/start.tk_xn-lc.js","_app/immutable/chunks/entry.CmsUTTot.js","_app/immutable/chunks/runtime.DMwnETrt.js","_app/immutable/chunks/index.5oUA5jB1.js","_app/immutable/entry/app.CtI7SkGh.js","_app/immutable/chunks/runtime.DMwnETrt.js","_app/immutable/chunks/render.B44UvGAj.js","_app/immutable/chunks/disclose-version.B6I5G3Gc.js","_app/immutable/chunks/index-client.Ct_vkslI.js","_app/immutable/chunks/this.97_PQvwp.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
