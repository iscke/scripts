// ==UserScript==
// @name        PS Server Chatlog Colors
// @description Colors usernames in /chatlog pages
// @version     0.0.2
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @run-at      document-idle
// ==/UserScript==

(function () {
    var addRow = HTMLRoom.prototype.addRow;
    HTMLRoom.prototype.addRow = function(line) {
        // make sure that we're a chatlog page, and that we're adding the html
        if (!this.id.startsWith('view-chatlog-')) return addRow.apply(this, arguments);
        if (!line || typeof line !== 'string') return;
        if (line.charAt(0) !== '|') line = '||' + line;
        var pipeIndex = line.indexOf('|', 1);
        var row;
        if (pipeIndex >= 0) {
            row = [line.slice(1, pipeIndex), line.slice(pipeIndex + 1)];
        } else {
            row = [line.slice(1), ''];
        }
        if (row[0] !== 'pagehtml') return addRow.apply(this, arguments);

        // doing this after the page has been added loses a lot of perf to repaints
        // use a documentfragment to avoid that
        var temp = document.createElement('template');
        temp.innerHTML = BattleLog.sanitizeHTML(row[1]);
        temp.content.querySelectorAll('.chat > strong').forEach(function (element) {
            element.style.color = BattleLog.usernameColor(toID(element.innerText));
        });

        // clear the page and add our content
        this.el.innerHTML = "";
        this.el.appendChild(temp.content);
    }
})()
