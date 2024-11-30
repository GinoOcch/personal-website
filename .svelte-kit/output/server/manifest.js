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
		client: {"start":"_app/immutable/entry/start.YcW3kvpg.js","app":"_app/immutable/entry/app.LkkjHO4G.js","imports":["_app/immutable/entry/start.YcW3kvpg.js","_app/immutable/chunks/entry.B5659aHm.js","_app/immutable/chunks/runtime.B0XSerag.js","_app/immutable/chunks/index.DMxuETTk.js","_app/immutable/entry/app.LkkjHO4G.js","_app/immutable/chunks/runtime.B0XSerag.js","_app/immutable/chunks/render.CFL4-76y.js","_app/immutable/chunks/disclose-version.DmvOwJqb.js","_app/immutable/chunks/index-client.DCZV8hLY.js","_app/immutable/chunks/this.B8AdM8m1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
