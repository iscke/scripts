// ==UserScript==
// @name        showdown custom colors
// @description custom custom colors for ps
// @version     0.0.2
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @run-at      document-idle
// ==/UserScript==

(function () {
    var override = {
        'anubis': null,
        'asgdf': null,
        // your color here !
    };
    Object.assign(Config.customcolors, override);
})();
