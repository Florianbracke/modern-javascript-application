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
})({"js/getWeather.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = void 0;
var array = [];

var getWeather = function getWeather() {
  var cityName = document.querySelector(".city").value;
  var key = "e83c0d271e5edc4f99d6d218e446d655";
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityName, "&appid=").concat(key); //fetch data

  fetch(api).then(function (response) {
    return response.json();
  }).then(function (data) {
    var temperatureNow = data.list[array.length].main.temp - 273;
    var cloudsNow = data.list[Number(array.length)].clouds.all;
    var windspeedNow = data.list[Number(array.length)].main.temp_max - 273; //to get time data 

    var timeZoneHour = Number(data.city.timezone - 3600) / 3600;
    var cityTimeZoneHour = new Date().getHours() + timeZoneHour; // put data into HTML

    document.getElementById("date").innerHTML = "in " + cityName + ", " + data.city.country + " it now is " + cityTimeZoneHour + "'o clock ";
    document.getElementById("temperatureNow").innerHTML = "Outside temperature is " + "<strong>" + temperatureNow.toFixed(2) + " </strong>" + "°C!";
    document.getElementById("cloudsNow").innerHTML = "The sky is covered for " + "<strong>" + cloudsNow + "</strong>" + "% with clouds.";
    document.getElementById("windspeedNow").innerHTML = "You can expect windspeed at " + "<strong>" + (windspeedNow * 3.6).toFixed(2) + "</strong> km/h";
    console.log("werkt et???");
  });
};

exports.getWeather = getWeather;
},{}],"js/randomCity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomCity = void 0;

var randomCity = function randomCity() {
  var apiCity = "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json";
  fetch(apiCity).then(function (response) {
    return response.json();
  }).then(function (data) {
    // get (random) array out of object 
    var randomArray = Object.values(data)[Math.floor(Math.random() * Object.keys(data).length)]; // get random index out of array

    var randomIndex = Math.floor(Math.random() * randomArray.length);
    document.querySelector(".city").value = randomArray[randomIndex];
    getWeather();
  });
};

exports.randomCity = randomCity;
},{}],"js/graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graph = void 0;

var graph = function graph(arraydata, arrayYaxis, arrayXaxis) {
  //variables 
  var cityName = document.querySelector(".city").value;
  var key = "e83c0d271e5edc4f99d6d218e446d655";
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityName, "&appid=").concat(key); //fetch data

  fetch(api).then(function (response) {
    return response.json();
  }).then(function (data) {
    var i = ""; //prepare arrays for X- & Y-axis

    arraydata = [];

    for (i = 0; i < 40; i += 2) {
      arraydata.push(Math.floor(Number(data.list[i].main.temp) - 273));
    }

    arrayYaxis = [];

    for (i = -15; i < 40; i++) {
      arrayYaxis.push(i);
    }

    arrayXaxis = [];

    for (i = 0; i < 40; i += 2) {
      arrayXaxis.push(data.list[i].dt_txt);
    } // arrayXaxis.push(timeZoneHours)}
    //graph data + styling


    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: arrayXaxis,
        datasets: [{
          data: arraydata,
          borderWidth: 1,
          backgroundColor: "gold",
          label: "temperature",
          borderColor: "white",
          color: "white",
          fill: false
        }]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 100
          }
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              drawOnChartArea: false,
              tickMarkLength: false,
              drawBorder: false
            }
          }],
          yAxes: [{
            display: true
          }]
        },
        legend: {
          display: false
        }
      }
    });
  });
};

exports.graph = graph;
},{}],"js/backgroundPicture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backgroundPicture = void 0;
var i = [];
var timer = 12000;

var backgroundPicture = function backgroundPicture() {
  document.querySelector("body").style.background = "url(./../src/css/images/sunnycold.jpg)";
  document.querySelector("body").style.backgroundSize = "cover";
  setInterval(function () {
    if (i.length < 9) {
      i.push("Supercalifragilisticexpialidocious");
    } else if (i.length = 9) {
      document.querySelector("body").style.background = "url(./../src/css/images/sunnycold  .jpg)";
      document.querySelector("body").style.backgroundSize = "cover";
    }

    document.querySelector("body").style.background = "url(./../src/css/images/".concat(i.length, ".jpg)");
    document.querySelector("body").style.backgroundSize = "cover";
  }, timer);
};

exports.backgroundPicture = backgroundPicture;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _getWeather = require("./../src/js/getWeather.js");

var _randomCity = require("./../src/js/randomCity.js");

var _graph = require("./../src/js/graph.js");

var _backgroundPicture = require("./../src/js/backgroundPicture.js");

//TODO: function accordion
//import { addThreeHours } from "./addThreeHours.js";
//import { minusThreeHours } from "./minusThreeHours.js";
// calling functions
(0, _backgroundPicture.backgroundPicture)();
document.querySelector("#run").addEventListener("click", function () {
  (0, _getWeather.getWeather)();
  (0, _graph.graph)();
});
document.querySelector("#run3").addEventListener("click", function () {
  (0, _randomCity.randomCity)();
  (0, _getWeather.getWeather)();
  (0, _graph.graph)();
}); // document.querySelector("#run1").addEventListener("click", () => {
//     minusThreeHours();
//     getWeather();   
// })
// document.querySelector("#run2").addEventListener("click", () => {
//     addThreeHours(); 
//     getWeather(); 
// })
},{"./../src/js/getWeather.js":"js/getWeather.js","./../src/js/randomCity.js":"js/randomCity.js","./../src/js/graph.js":"js/graph.js","./../src/js/backgroundPicture.js":"js/backgroundPicture.js"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58176" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map