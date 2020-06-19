// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"AfVW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.response = void 0;

/**
 * this will return a valid `flowplayer()` configuration object
 * more often than not though, you may need to transform your
 * API response
 */
var FAKE_OPTS = {
  poster: "https://source.unsplash.com/random",
  title: "my ovp / fake",
  description: "this was loaded from a mocked API"
};
var FAKE_SRC = {
  src: ["https://edge.flowplayer.org/starwreck/hls/playlist.m3u8"],
  opts: FAKE_OPTS
};
/**
 * a bunch of fake error messages just for illustration
 */

var ERROR_MESSAGES = ["api not available", "media not found", "content not available in your region", "you have reached maximum free views per month"];
/**
 * this is a mock API response from some OVP platform
 * to illustrate the asynchronous loading of data
 */

var response = function response() {
  return Promise.resolve(Math.random() > 0.2 ? {
    ok: FAKE_SRC
  } : {
    err: fake_error()
  });
};
/**
 * get a fake error message just for demonstration purposes
 * because Error handling is **always** important
 */


exports.response = response;

var fake_error = function fake_error() {
  return {
    message: ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
  };
};
},{}],"Rgfk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERR = exports.OK = void 0;

/**
 * this is an example event based logical branching
 * it is a good idea to isolate your branches to events 
 * so that it's easier to handle separation of concerns
 * as integrations grow
 */
var OK = "my_api:ok";
exports.OK = OK;
var ERR = "my_api:err";
exports.ERR = ERR;
},{}],"UjIY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.my_loader = my_loader;
exports.MY_CUSTOM_TYPE = void 0;

var API = _interopRequireWildcard(require("./mocks/api"));

var APIEvents = _interopRequireWildcard(require("./events"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * it's a good idea to define this token as a constant you
 * can reference from anywhere in your application
 */
var MY_CUSTOM_TYPE = "my-ovp/id";
/**
 * loader plugins can determine their current state by the 
 * arity of the Arguments passed to them:
 * 
 * 3 arguments == normal plugin state
 * 4 arguments == loading a custom src
 * 
 * loader plugins must also implement a `.wants` function
 * so that `flowplayer()` can tell if this plugin wants
 * to intercept the src or not 
 */

exports.MY_CUSTOM_TYPE = MY_CUSTOM_TYPE;

function my_loader(opts, root, video, src) {
  if (arguments.length == 3) be_normal_plugin(opts, root, video);
  if (arguments.length == 4) load_from_my_ovp(video, src);
}
/**
 * all loader plugins expose a `wants` function that accepts a 
 * src object and returns true/false depending on if they want to
 * intercept the loading call
 */


my_loader.wants = function (_, src) {
  console.log("my_loader.wants(src: %o) -> %o", src, src.type == MY_CUSTOM_TYPE);
  return src.type == MY_CUSTOM_TYPE;
};
/**
 * if the arity is 3 we are just in "normal" mode
 */


function be_normal_plugin(opts, root, video) {
  /**
   * by passing the loading response back tot he "normal" context
   * we can be sure that all of the flowplayer UI exists and everything
   * has been loaded
   * 
   * utilizing the Event-based organization structure will also lead to 
   * much more maintainable code (and is how Flowplayer is organized internally)
   */
  video.on(APIEvents.OK, function (e) {
    // we are just using a basic setSrc here, but you could also call
    // any of the other player api methods like `setOpts`
    console.log("Event(type: %s, data: %o)", e.type, e.data);
    if (e.data.src) video.setSrc(e.data.src);
    if (e.data.opts) video.setOpts(e.data.opts);
  });
  video.on(APIEvents.ERR, function (e) {
    var err = e.data; // this would be a great place to add your own error tracking if necessary.
    // no example for HTTP demos is complete without error handling!

    console.log("Event(type: %s, data: %o)", e.type, e.data);
    video.emit(flowplayer.events.ERROR, err);
  });
}
/**
 * if the arity was 4 we are in the "loader" mode
 * and should attempt to load this src from our API
 */


function load_from_my_ovp(video, src) {
  console.log("my_loader.load_from_my_ovp(src: %o)", src);
  API.response().then(function (_ref) {
    var ok = _ref.ok,
        err = _ref.err;
    if (ok) return video.emit(APIEvents.OK, ok);
    if (err) return video.emit(APIEvents.ERR, err);
    throw new Error("unhandled case in load_from_my_ovp()\nthis should never happen");
  });
}
},{"./mocks/api":"AfVW","./events":"Rgfk"}],"vZyd":[function(require,module,exports) {
"use strict";

var _loader = require("./loader");

flowplayer(_loader.my_loader);
var my_ovp_src = {
  src: "some-fake-id",
  type: _loader.MY_CUSTOM_TYPE
};
flowplayer("#player", {
  src: [my_ovp_src],
  token: "eyJraWQiOiJMaDBuRm02UGxMbEkiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjIjoie1wiYWNsXCI6NixcImlkXCI6XCJMaDBuRm02UGxMbElcIn0iLCJpc3MiOiJGbG93cGxheWVyIn0.JnTSd2fXkJaBtM5ruW7wrhBmgSDYYF2biyNcnEx33D_7SX2cP6Gbf4iZDkZn2K_NqLjltLB2McNvINhvMw83eg"
});
},{"./loader":"UjIY"}]},{},["vZyd"], null)
//# sourceMappingURL=app.69d3a46e.js.map