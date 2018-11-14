// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"qJ/N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  src: "eedf1500-78f9-4249-977a-974445a09db3"
}];
exports.default = _default;
},{}],"pPMV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  view: function view(_) {
    return m("div");
  },
  oncreate: function oncreate(vnode) {
    vnode.attrs.player = flowplayer(vnode.dom, vnode.attrs.video);
    console.log("Component.Native.oncreate():", vnode);
  },
  onbeforeremove: function onbeforeremove(vnode) {
    console.log("Component.Native.onbeforeremote():", vnode);
    vnode.attrs.player.destroy();
    vnode.attrs.player = 0;
  }
};
exports.default = _default;
},{}],"Lent":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _videos = _interopRequireDefault(require("./videos"));

var _native = _interopRequireDefault(require("./native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  root: document.querySelector("#app"),
  view: function view(_) {
    return _videos.default.map(function (video) {
      return m(_native.default, {
        video: video
      });
    });
  }
};
exports.default = _default;
},{"./videos":"qJ/N","./native":"pPMV"}],"FJ7B":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * simple loading animation for while the async assets are loaded
 */
var _default = {
  view: function view(_) {
    return m(".ripple", [m("div"), m("div")]);
  }
};
exports.default = _default;
},{}],"IBgI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./app"));

var _loading = _interopRequireDefault(require("./loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * demo app using:
 *  Mithril.js : https://mithril.js.org
 *  Flowplayer : flowplayer.com
 */
var _default = function () {
  // mount a loading animation
  m.mount(_app.default.root, _loading.default); // wait for the cloud player assets to load

  flowplayer.cloud.then(function () {
    // simulate latency in case the CDN is very fast
    setTimeout(function () {
      // mount the real app
      m.mount(_app.default.root, _app.default);
    }, 1000);
  });
}();

exports.default = _default;
},{"./app":"Lent","./loading":"FJ7B"}]},{},["IBgI"], null)
//# sourceMappingURL=/app.0e5cbce8.map