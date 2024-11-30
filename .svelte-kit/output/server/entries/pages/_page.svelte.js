import { a7 as current_component, _ as spread_attributes, S as pop, Y as sanitize_props, Q as push } from "../../chunks/index.js";
import { h as html } from "../../chunks/html.js";
import Cite from "citation-js";
import "@citation-js/plugin-bibtex";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  "background-color": "currentColor"
};
const coloredProps = {
  "background-color": "transparent"
};
const propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
const propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html2 = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html2);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key in styles) {
    customStyle += key + ": " + styles[key] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    return null;
  }
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$sanitized_props.onLoad === "function") {
      $$sanitized_props.onLoad(icon);
    }
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
  });
  {
    const iconData = checkIconState($$sanitized_props.icon, state, mounted, loaded, onLoad);
    data = iconData ? generateIcon(iconData.data, $$sanitized_props) : null;
    if (data && iconData.classes) {
      data.attributes["class"] = (typeof $$sanitized_props["class"] === "string" ? $$sanitized_props["class"] + " " : "") + iconData.classes.join(" ");
    }
  }
  if (data) {
    $$payload.out += "<!--[-->";
    if (data.svg) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg${spread_attributes({ ...data.attributes }, void 0, void 0, 3)}>${html(data.body)}</svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span${spread_attributes({ ...data.attributes })}></span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const pubbib = `@Article{10.1126/science.adp2447,
  author       = {Hayden M. Carder and Gino Occhialini and Giovanni Bistoni and Christoph Riplinger and Eugene E. Kwan and Alison E. Wendlandt},
  title        = {The sugar cube: Network control and emergence in stereoediting reactions},
  number       = {6707},
  pages        = {456--463},
  volume       = {385},
  abstract     = {Stereochemical editing strategies have recently enabled the transformation of readily accessible substrates into rare and valuable products. Typically, site selectivity is achieved by minimizing kinetic complexity by using protecting groups to suppress reactivity at undesired sites (substrate control) or by using catalysts with tailored shapes to drive reactivity at the desired site (catalyst control). We propose “network control,” a contrasting paradigm that exploits hidden interactions between rate constants to greatly amplify modest intrinsic biases and enable precise multisite editing. When network control is applied to the photochemical isomerization of hexoses, six of the eight possible diastereomers can be selectively obtained. The amplification effect can be viewed as a mesoscale phenomenon between the limiting regimes of kinetic control in simple chemical systems and metabolic regulation in complex biological systems. Chemists typically aim to optimize a single reaction pathway to a desired product. Isomerization of complex molecules poses a challenge to this approach because tweaking one portion of the molecule can influence the sensitivity of others in the vicinity, leading to multiple competing processes. Carder et al. meticulously mapped out the rates of photo-driven stereoisomerization among the hexose sugars. By better understanding the full network of reactivity, they could then tune reaction times and catalyst design to select for particular isomers across the complex landscape. —Jake S. Yeston},
  date         = {2024},
  doi          = {10.1126/science.adp2447},
  journaltitle = {Science},
}

@Article{10.1038/s41586-024-07988-8,
  author       = {Gu, Xin and Zhang, Yu-An and Zhang, Shuo and Wang, Leon and Ye, Xiyun and Occhialini, Gino and Barbour, Jonah and Pentelute, Bradley L. and Wendlandt, Alison E.},
  title        = {Synthesis of non-canonical amino acids through dehydrogenative tailoring},
  issn         = {1476-4687},
  number       = {8033},
  pages        = {352--358},
  volume       = {634},
  abstract     = {Amino acids are essential building blocks in biology and chemistry. Whereas nature relies on a small number of amino acid structures, chemists desire access to a vast range of structurally diverse analogues1-3. The selective modification of amino acid side-chain residues represents an efficient strategy to access non-canonical derivatives of value in chemistry and biology. While semisynthetic methods leveraging the functional groups found in polar and aromatic amino acids have been extensively explored, highly selective and general approaches to transform unactivated C-H bonds in aliphatic amino acids remain less developed4,5. Here we disclose a stepwise dehydrogenative method to convert aliphatic amino acids into structurally diverse analogues. The key to the success of this approach lies in the development of a selective catalytic acceptorless dehydrogenation method driven by photochemical irradiation, which provides access to terminal alkene intermediates for downstream functionalization. Overall, this strategy enables the rapid synthesis of new amino acid building blocks and suggests possibilities for the late-stage modification of more complex oligopeptides.},
  date         = {2024},
  doi          = {10.1038/s41586-024-07988-8},
  journaltitle = {Nature},
  refid        = {Gu2024},
}

@Article{10.1021/jacs.1c12043,
author       = {Occhialini, Gino and Palani, Vignesh and Wendlandt, Alison E.},
title        = {Catalytic, contra-Thermodynamic Positional Alkene Isomerization},
issn         = {0002-7863},
number       = {1},
pages        = {145--152},
volume       = {144},
comment      = {doi: 10.1021/jacs.1c12043},
date         = {2022-01},
doi          = {10.1021/jacs.1c12043},
journaltitle = {J. Am. Chem. Soc.},
publisher    = {American Chemical Society},
}

@Article{10.1021/jacs.7b05555,
  author       = {Thompson, Christina M. and Occhialini, Gino and McCandless, Gregory T. and Alahakoon, Sampath B. and Cameron, Victoria and Nielsen, Steven O. and Smaldone, Ronald A.},
  title        = {Computational and Experimental Studies on the Effects of Monomer Planarity on Covalent Organic Framework Formation},
  issn         = {0002-7863},
  number       = {30},
  pages        = {10506--10513},
  volume       = {139},
  comment      = {doi: 10.1021/jacs.7b05555},
  date         = {2017-08},
  doi          = {10.1021/jacs.7b05555},
  journaltitle = {J. Am. Chem. Soc.},
  publisher    = {American Chemical Society},
}

@Article{10.1002/adma.201700131,
  author       = {Xiong, Hu and Zuo, Hao and Yan, Yunfeng and Occhialini, Gino and Zhou, Kejin and Wan, Yihong and Siegwart, Daniel J.},
  title        = {High-Contrast Fluorescence Detection of Metastatic Breast Cancer Including Bone and Liver Micrometastases via Size-Controlled pH-Activatable Water-Soluble Probes},
  number       = {29},
  pages        = {1700131},
  volume       = {29},
  abstract     = {Breast cancer metastasis is the major cause of cancer death in women worldwide. Early detection would save many lives, but current fluorescence imaging probes are limited in their detection ability, particularly of bone and liver micrometastases. Herein, probes that are capable of imaging tiny (<1 mm) micrometastases in the liver, lung, pancreas, kidneys, and bone, that have disseminated from the primary site, are reported. The influence of the poly(ethylene glycol) (PEG) chain length on the performance of water-soluble, pH-responsive, near-infrared 4,4′-difluoro-4-bora-3a,4a-diaza-s-indacene (BODIPY) probes is systematically investigated to demonstrate that PEG tuning can provide control over micrometastasis tracking with high tumor-to-background contrast (up to 12/1). Optimized probes can effectively visualize tumor boundaries and successfully detect micrometastases with diameters <1 mm. The bone-metastasis-targeting ability of these probes is further enhanced by covalent functionalization with bisphosphonate. This improved detection of both bone and liver micrometastases (<2 mm) with excellent tumor-to-normal contrast (5.2/1). A versatile method is thus introduced to directly synthesize modular water-soluble probes with broad potential utility. Through a single intravenous injection, these materials can image micrometastases in multiple organs with spatiotemporal resolution. They thus hold promise for metastasis diagnosis, image-guided surgery, and theranostic PEGylated drug therapies.},
  date         = {2017},
  doi          = {10.1002/adma.201700131},
  fjournal     = {Advanced Materials},
  journaltitle = {Adv. Mater.},
  keywords     = {fluorescence, imaging, metastasis, pH, water-soluble probes},
}

@Article{10.1002/cssc.201700120,
  author       = {Alahakoon, Sampath B. and Thompson, Christina M. and Occhialini, Gino and Smaldone, Ronald A.},
  title        = {Design Principles for Covalent Organic Frameworks in Energy Storage Applications},
  number       = {10},
  pages        = {2116--2129},
  volume       = {10},
  abstract     = {Abstract Covalent organic frameworks (COFs) are an exciting class of porous materials that have been explored as energy-storage materials for more than a decade. This review discusses efforts to develop these materials for applications in gas and electrical power storage. Some of the design strategies for developing the gas sorption properties of COFs and mechanistic studies on their formation are also discussed.},
  date         = {2017},
  doi          = {10.1002/cssc.201700120},
  journaltitle = {ChemSusChem},
  keywords     = {covalent organic frameworks, electrochemistry, energy storage, mesoporous materials, polymers},
}

@Article{10.1039/C7CE00598A,
author ="Alahakoon, Sampath B. and Occhialini, Gino and McCandless, Gregory T. and Karunathilake, Arosha A. K. and Nielsen, Steven O. and Smaldone, Ronald A.",
title  ="Experimental and theoretical insight into the effect of fluorine substituents on the properties of azine linked covalent organic frameworks",
journal  ="CrystEngComm",
year  ="2017",
volume  ="19",
issue  ="33",
pages  ="4882-4885",
publisher  ="The Royal Society of Chemistry",
doi  ="10.1039/C7CE00598A",
url  ="http://dx.doi.org/10.1039/C7CE00598A",
abstract  ="Herein we report a combined experimental and computational study on the effect of fluorine atom incorporation on the materials properties of azine-linked COFs. We found that increasing the ratio of fluorinated to non-fluorinated monomers led to substantial improvements in both crystallinity and porosity. Computational models suggest that this improvement might be explained by a substantial energetic stabilization in the face-to-face stacking interaction of the fluorinated COF monomers."}

@Article{10.1039/C5CC10408D,
  author       = {Alahakoon, Sampath B. and Thompson, Christina M. and Nguyen, Amy X. and Occhialini, Gino and McCandless, Gregory T. and Smaldone, Ronald A.},
  title        = {An azine-linked hexaphenylbenzene based covalent organic framework},
  pages        = {2843--2845},
  volume       = {52},
  abstract     = {In this communication{,} we report an azine linked covalent organic framework based on a six-fold symmetric hexphenylbenzene (HEX) monomer functionalized with aldehyde groups. HEX-COF 1 has an average pore size of 1 nm{,} a surface area in excess of 1200 m2 g−1 and shows excellent sorption capability for carbon dioxide (20 wt%) and methane (2.3 wt%) at 273 K and 1 atm.},
  date         = {2016},
  doi          = {10.1039/C5CC10408D},
  issue        = {13},
  journaltitle = {Chem. Commun.},
  publisher    = {The Royal Society of Chemistry},
}












`;
const acsfmtcsl = `
<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" page-range-format="expanded" default-locale="en-US">
  <info>
    <title>Modified American Chemical Society</title>
    <title-short>ACSmod</title-short>
    <id>acsmod</id>
    <link href="http://www.zotero.org/styles/american-chemical-society" rel="self"/>
    <link href="https://pubs.acs.org/doi/full/10.1021/acsguide.40303" rel="documentation"/>
    <link href="https://pubs.acs.org/doi/book/10.1021/acsguide" rel="documentation"/>
    <author>
      <name>Julian Onions</name>
      <email>julian.onions@gmail.com</email>
    </author>
    <contributor>
      <name>Ivan Bushmarinov</name>
      <email>ib@ineos.ac.ru</email>
    </contributor>
    <contributor>
      <name>Sebastian Karcher</name>
    </contributor>
    <contributor>
      <name>Patrick O'Brien</name>
    </contributor>
    <category citation-format="numeric"/>
    <category field="chemistry"/>
    <summary>The American Chemical Society style</summary>
    <updated>2022-11-13T02:40:31+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="editortranslator" form="short">
        <single>ed. and translator</single>
        <multiple>eds. and translators</multiple>
      </term>
      <term name="translator" form="short">
        <single>translator</single>
        <multiple>translators</multiple>
      </term>
      <term name="collection-editor" form="short">
        <single>series ed.</single>
        <multiple>series eds.</multiple>
      </term>
    </terms>
  </locale>
  <macro name="editor">
    <group delimiter="; ">
      <names variable="editor translator" delimiter="; ">
        <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
        <label form="short" prefix=", " text-case="title"/>
      </names>
      <names variable="collection-editor">
        <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
        <label form="short" prefix=", " text-case="title"/>
      </names>
    </group>
  </macro>
  <macro name="author">
    <names variable="author" suffix=".">
      <name sort-separator=", " initialize-with=". " name-as-sort-order="all" delimiter="; " delimiter-precedes-last="always"/>
      <label form="short" prefix=", " text-case="capitalize-first"/>
    </names>
  </macro>
  <macro name="publisher">
    <choose>
      <if type="thesis" match="any">
        <group delimiter=", ">
          <text variable="publisher"/>
          <text variable="publisher-place"/>
        </group>
      </if>
      <else>
        <group delimiter=": ">
          <text variable="publisher"/>
          <text variable="publisher-place"/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <choose>
      <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
        <text variable="title" text-case="title" font-style="italic"/>
      </if>
      <else>
        <text variable="title" text-case="title"/>
      </else>
    </choose>
  </macro>
  <macro name="volume">
    <group delimiter=" ">
      <text term="volume" form="short" text-case="capitalize-first"/>
      <text variable="volume"/>
    </group>
  </macro>
  <macro name="series">
    <text variable="collection-title"/>
  </macro>
  <macro name="pages">
    <label variable="page" form="short" suffix=" " strip-periods="true"/>
    <text variable="page"/>
  </macro>
  <macro name="book-container">
    <group delimiter=". ">
      <text macro="title"/>
      <choose>
        <if type="entry-dictionary entry-encyclopedia" match="none">
          <group delimiter=" ">
            <text term="in" text-case="capitalize-first"/>
            <text variable="container-title" font-style="italic"/>
          </group>
        </if>
        <else>
          <text variable="container-title" font-style="italic"/>
        </else>
      </choose>
    </group>
  </macro>
  <macro name="issued">
    <date variable="issued" delimiter=" ">
      <date-part name="year"/>
    </date>
  </macro>
  <macro name="full-issued">
    <date variable="issued" delimiter=" ">
      <date-part name="month" form="long" suffix=" "/>
      <date-part name="day" suffix=", "/>
      <date-part name="year"/>
    </date>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition" suffix="."/>
      </else>
    </choose>
  </macro>
  <macro name="access">
    <choose>
      <if variable="DOI" match="any">
        <text variable="DOI" prefix="https://doi.org/"/>
      </if>
      <else-if type="article-journal book chapter entry-encyclopedia entry-dictionary paper-conference" match="none">
        <choose>
          <if variable="URL">
            <group delimiter=" ">
              <text variable="URL"/>
              <group delimiter=" " prefix="(" suffix=")">
                <text term="accessed"/>
                <date variable="accessed">
                  <date-part name="year"/>
                  <date-part name="month" prefix="-" form="numeric-leading-zeros"/>
                  <date-part name="day" prefix="-" form="numeric-leading-zeros"/>
                </date>
              </group>
            </group>
          </if>
        </choose>
      </else-if>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout delimiter="," vertical-align="sup">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography second-field-align="flush" entry-spacing="0">
    <layout suffix=".">
      <text variable="citation-number" prefix="(" suffix=")"/>
      <text macro="author" suffix=" "/>
      <choose>
        <if type="article-journal review" match="any">
          <group delimiter=" ">
            <text macro="title" suffix="."/>
            <text variable="container-title" font-style="italic" form="short"/>
            <group delimiter=", ">
              <text macro="issued" font-weight="bold"/>
              <choose>
                <if variable="volume">
                  <group delimiter=" ">
                    <text variable="volume" font-style="italic"/>
                  </group>
                </if>
                <else>
                  <group delimiter=" ">
                    <text term="issue" form="short" text-case="capitalize-first"/>
                    <text variable="issue"/>
                  </group>
                </else>
              </choose>
              <text variable="page"/>
            </group>
          </group>
        </if>
        <else-if type="article-magazine article-newspaper article" match="any">
          <group delimiter=" ">
            <text macro="title" suffix="."/>
            <text variable="container-title" font-style="italic" suffix="."/>
            <text macro="edition"/>
            <text macro="publisher"/>
            <group delimiter=", ">
              <text macro="full-issued"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="thesis">
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="genre"/>
            </group>
            <text macro="publisher"/>
            <text macro="issued"/>
            <text macro="volume"/>
            <text macro="pages"/>
          </group>
        </else-if>
        <else-if type="bill book graphic legal_case legislation motion_picture report song" match="any">
          <group delimiter="; ">
            <group delimiter=", ">
              <text macro="title"/>
              <text macro="edition"/>
            </group>
            <text macro="editor" prefix=" "/>
            <text macro="series"/>
            <choose>
              <if type="report">
                <group delimiter=" ">
                  <text variable="genre"/>
                  <text variable="number"/>
                </group>
              </if>
            </choose>
            <group delimiter=", ">
              <text macro="publisher"/>
              <text macro="issued"/>
            </group>
            <group delimiter=", ">
              <text macro="volume"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="patent">
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="number"/>
            </group>
            <date variable="issued" form="text"/>
          </group>
        </else-if>
        <else-if type="chapter paper-conference entry-dictionary entry-encyclopedia" match="any">
          <group delimiter="; ">
            <text macro="book-container"/>
            <text macro="editor"/>
            <text macro="series"/>
            <group delimiter=", ">
              <text macro="publisher"/>
              <text macro="issued"/>
            </group>
            <group delimiter=", ">
              <text macro="volume"/>
              <text macro="pages"/>
            </group>
          </group>
        </else-if>
        <else-if type="webpage post post-weblog" match="any">
          <group delimiter=". ">
            <text variable="title" font-style="italic"/>
            <text variable="container-title"/>
          </group>
        </else-if>
        <else>
          <group delimiter=", ">
            <group delimiter=". ">
              <text macro="title"/>
              <text variable="container-title" font-style="italic"/>
            </group>
            <group delimiter=", ">
              <text macro="issued"/>
              <text variable="volume" font-style="italic"/>
              <text variable="page"/>
            </group>
          </group>
        </else>
      </choose>
    </layout>
  </bibliography>
</style>
`;
function _page($$payload, $$props) {
  push();
  let config = Cite.plugins.config.get("@csl");
  config.templates.add("acs", acsfmtcsl);
  const cite = new Cite(pubbib);
  let acscitations = cite.format("bibliography", {
    format: "html",
    template: "acs",
    lang: "en-US"
  });
  const cslEntryClass = "csl-entry my-4 text-slate-900 dark:text-slate-300";
  acscitations = acscitations.replace(/class="csl-entry"/g, `class="${cslEntryClass}"`);
  acscitations = acscitations.replace(/class="csl-left-margin"/g, 'class="csl-left-margin inline mr-5"');
  acscitations = acscitations.replace(/class="csl-right-inline"/g, 'class="csl-right-inline inline"');
  acscitations = acscitations.replace(new RegExp(`<div data-csl-entry-id="([^"]+)" class="${cslEntryClass}">`, "g"), `<div data-csl-entry-id="$1" class="${cslEntryClass}"><a href="https://doi.org/$1" target="_blank">`);
  acscitations = acscitations.replace(/<\/div>\s*<\/div>/g, "</a></div></div>");
  $$payload.out += `<div class="text-justify text-lg my-4 text-slate-900 dark:text-slate-300"><div class="mx-auto flex flex-row justify-center items-center mb-4"><img src="/images/profile.jpg" class="h-52 mr-10 rounded-full"> <div><h1 class="text-2xl font-bold text-center mb-2">Gino Occhialini</h1> <p class="text-center font-bold">Postdoctoral Fellow</p> <p class="text-center mb-2">California Institute of Technology</p> <div class="flex justify-center space-x-4"><a href="/">`;
  Icon($$payload, { icon: "mdi:home", class: "text-3xl" });
  $$payload.out += `<!----></a> <a href="https://orcid.org/0000-0001-9682-1740">`;
  Icon($$payload, { icon: "academicons:orcid", class: "text-3xl" });
  $$payload.out += `<!----></a> <a href="https://scholar.google.com/citations?user=5o3wF_IAAAAJ&amp;hl=en">`;
  Icon($$payload, {
    icon: "academicons:google-scholar-square",
    class: "text-3xl"
  });
  $$payload.out += `<!----></a> <a href="https://www.linkedin.com/in/gino-occhialini-4bb670103">`;
  Icon($$payload, { icon: "mdi:linkedin", class: "text-3xl" });
  $$payload.out += `<!----></a></div></div></div> <p class="mb-5">I received my Ph.D. in Chemistry from the Massachusetts Institute of Technology in 2024, where I
		conducted research under the supervision of <a href="https://wendlandtlab.com/">Prof. Alison Wendlandt</a> as an NSF graduate research
		fellow on the development of new methods for selective catalysis in particular the use of light
		to drive uphill editing reactions, for example in the context of terminally selective olefin
		isomerization. While studying one such epimerization reaction, we discovered an underlying
		network structure that contributed kinetic complexity and enabled, rather than eroded, selective
		catalysis. This study sparked my interests in using computational methods to study complex
		reactivity, for example numerically integrated kinetic models. I am now a postdoctoral fellow in
		the lab of <a href="http://reismangroup.caltech.edu/">Prof. Sarah Reisman</a> at the California Institute of Technology, where I am excited to
		develop and apply new methods for the synthesis of complex natural products. I am particularly
		interested in how high-throughput experimentation and machine learning can enable synthetic
		efforts.</p> <p class="mb-5">Prior to MIT, I received my B.S. in Chemistry from the University of Texas at Dallas, where I
		was a Goldwater scholar and conducted research in the lab of <a href="https://labs.utdallas.edu/smaldone/">Prof. Ron Smaldone</a> on the synthesis
		and modeling of covalent organic frameworks and porous polymers. I am originally from central
		Texas and enjoy cooking, 3D printing, and experimenting with technology.</p></div> <div class="text-justify text-lg mb-4"><p class="mb-5 text-lg font-bold text-slate-900 dark:text-slate-300">Publications:</p> ${html(acscitations)}</div>`;
  pop();
}
export {
  _page as default
};
