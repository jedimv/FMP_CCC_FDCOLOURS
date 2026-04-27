// ==UserScript==
// @name         FMP - CCC First Divisions color update.
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  simple script to adjust the colors and guide to help managers on table analyse.
// @author       jedimv
// @homepageURL  https://github.com/jedimv/FMP_CCC_FDCOLOURS
// @updateURL    https://raw.githubusercontent.com/jedimv/FMP_CCC_FDCOLOURS/main/ccc_colour_change.user.js
// @downloadURL  https://raw.githubusercontent.com/jedimv/FMP_CCC_FDCOLOURS/main/ccc_colour_change.user.js
// @match        *://footballmanagerproject.com/Matches/Champ?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ─── LEAGUE CONFIG (blue/cyan = nº de vagas, orange/red lidos do DOM) ────
    const LEAGUE_CONFIG = {
        "2778": { blue: 1, cyan: 1, continent: "europe" }, // albania
        "2793": { blue: 1, cyan: 1, continent: "europe" }, // austria
        "2662": { blue: 3, cyan: 2, continent: "europe" }, // belgium
        "2610": { blue: 3, cyan: 2, continent: "europe" }, // bosnia
        "2795": { blue: 1, cyan: 1, continent: "europe" }, // bulgaria
        "2700": { blue: 3, cyan: 2, continent: "europe" }, // croatia
        "2828": { blue: 1, cyan: 1, continent: "europe" }, // cyprus
        "2787": { blue: 3, cyan: 2, continent: "europe" }, // czech republic
        "2649": { blue: 2, cyan: 1, continent: "europe" }, // denmark
        "2601": { blue: 4, cyan: 3, continent: "europe" }, // england
        "2631": { blue: 1, cyan: 1, continent: "europe" }, // estonia
        "2633": { blue: 1, cyan: 1, continent: "europe" }, // finland
        "2613": { blue: 4, cyan: 3, continent: "europe" }, // france
        "2784": { blue: 1, cyan: 1, continent: "europe" }, // georgia
        "2623": { blue: 2, cyan: 2, continent: "europe" }, // germany
        "2655": { blue: 1, cyan: 1, continent: "europe" }, // greece
        "2694": { blue: 1, cyan: 1, continent: "europe" }, // hungary
        "2775": { blue: 2, cyan: 1, continent: "europe" }, // iceland
        "2635": { blue: 3, cyan: 2, continent: "europe" }, // ireland
        "2595": { blue: 4, cyan: 7, continent: "europe" }, // italy
        "2880": { blue: 1, cyan: 1, continent: "europe" }, // latvia
        "2698": { blue: 3, cyan: 2, continent: "europe" }, // lithuania
        "2852": { blue: 1, cyan: 1, continent: "europe" }, // luxembourg
        "2856": { blue: 1, cyan: 1, continent: "europe" }, // malta
        "2834": { blue: 1, cyan: 1, continent: "europe" }, // moldova
        "2835": { blue: 1, cyan: 1, continent: "europe" }, // montenegro
        "2681": { blue: 2, cyan: 1, continent: "europe" }, // netherlands
        "2836": { blue: 1, cyan: 1, continent: "europe" }, // north macedonia
        "2837": { blue: 1, cyan: 1, continent: "europe" }, // northern ireland
        "2773": { blue: 1, cyan: 1, continent: "europe" }, // norway
        "2642": { blue: 3, cyan: 3, continent: "europe" }, // poland
        "2626": { blue: 2, cyan: 1, continent: "europe" }, // portugal
        "2684": { blue: 2, cyan: 2, continent: "europe" }, // romania
        "2666": { blue: 2, cyan: 2, continent: "europe" }, // russia
        "2860": { blue: 1, cyan: 1, continent: "europe" }, // scotland
        "2629": { blue: 1, cyan: 1, continent: "europe" }, // serbia
        "2790": { blue: 2, cyan: 1, continent: "europe" }, // slovakia
        "2691": { blue: 1, cyan: 1, continent: "europe" }, // slovenia
        "2619": { blue: 3, cyan: 3, continent: "europe" }, // spain
        "2696": { blue: 2, cyan: 2, continent: "europe" }, // sweden
        "2689": { blue: 2, cyan: 1, continent: "europe" }, // switzerland
        "2657": { blue: 2, cyan: 1, continent: "europe" }, // turkey
        "2668": { blue: 1, cyan: 1, continent: "europe" }, // ukraine
        "2785": { blue: 1, cyan: 1, continent: "europe" }, // wales

        "2896": { blue: 1, cyan: 1, continent: "asia" }, // armenia
        "2692": { blue: 3, cyan: 3, continent: "asia" }, // australia
        "2897": { blue: 1, cyan: 1, continent: "asia" }, // azerbaijan
        "2841": { blue: 4, cyan: 4, continent: "asia" }, // china
        "2878": { blue: 1, cyan: 1, continent: "asia" }, // india
        "2870": { blue: 3, cyan: 2, continent: "asia" }, // indonesia
        "2867": { blue: 1, cyan: 1, continent: "asia" }, // iran
        "2877": { blue: 2, cyan: 1, continent: "asia" }, // iraq
        "2640": { blue: 4, cyan: 3, continent: "asia" }, // japan
        "2892": { blue: 1, cyan: 1, continent: "asia" }, // kazakhstan
        "2891": { blue: 1, cyan: 1, continent: "asia" }, // malaysia
        "2854": { blue: 3, cyan: 2, continent: "asia" }, // new zealand
        "2890": { blue: 1, cyan: 1, continent: "asia" }, // oman
        "2879": { blue: 1, cyan: 1, continent: "asia" }, // qatar
        "2792": { blue: 2, cyan: 2, continent: "asia" }, // saudi arabia
        "2832": { blue: 3, cyan: 2, continent: "asia" }, // south korea
        "2881": { blue: 1, cyan: 1, continent: "asia" }, // syria
        "2858": { blue: 2, cyan: 1, continent: "asia" }, // thailand
        "2882": { blue: 2, cyan: 1, continent: "asia" }, // UAE
        "2883": { blue: 3, cyan: 2, continent: "asia" }, // uzbekistan

        "2840": { blue: 3, cyan: 2, continent: "africa" }, // algeria
        "2884": { blue: 1, cyan: 1, continent: "africa" }, // burkina faso
        "2885": { blue: 1, cyan: 1, continent: "africa" }, // cabo verde
        "2830": { blue: 2, cyan: 1, continent: "africa" }, // cameroon
        "2772": { blue: 4, cyan: 3, continent: "africa" }, // congo DR
        "2637": { blue: 3, cyan: 2, continent: "africa" }, // egypt
        "2893": { blue: 1, cyan: 1, continent: "africa" }, // gambia
        "2777": { blue: 4, cyan: 3, continent: "africa" }, // ghana
        "2886": { blue: 1, cyan: 1, continent: "africa" }, // guinea
        "2862": { blue: 2, cyan: 1, continent: "africa" }, // ivory coast
        "2894": { blue: 1, cyan: 1, continent: "africa" }, // libya
        "2869": { blue: 2, cyan: 2, continent: "africa" }, // mali
        "2831": { blue: 2, cyan: 2, continent: "africa" }, // morocco
        "2780": { blue: 4, cyan: 4, continent: "africa" }, // nigeria
        "2839": { blue: 3, cyan: 3, continent: "africa" }, // senegal
        "2874": { blue: 3, cyan: 2, continent: "africa" }, // south africa
        "2864": { blue: 2, cyan: 1, continent: "africa" }, // tunisia
        "2895": { blue: 1, cyan: 1, continent: "africa" }, // uganda

        "2677": { blue: 4, cyan: 3, continent: "south_america" }, // argentina
        "2670": { blue: 4, cyan: 3, continent: "south_america" }, // brasil
        "2887": { blue: 1, cyan: 1, continent: "south_america" }, // bolivia
        "2863": { blue: 2, cyan: 1, continent: "south_america" }, // chile
        "2838": { blue: 2, cyan: 2, continent: "south_america" }, // colombia
        "2872": { blue: 1, cyan: 1, continent: "south_america" }, // ecuador
        "2865": { blue: 2, cyan: 1, continent: "south_america" }, // paraguai
        "2797": { blue: 3, cyan: 2, continent: "south_america" }, // peru
        "2768": { blue: 3, cyan: 2, continent: "south_america" }, // uruguay
        "2876": { blue: 1, cyan: 1, continent: "south_america" }, // venezuela
        "2054": { blue: 1, cyan: 4, continent: "south_america" }, // brasil div2

        "2770": { blue: 3, cyan: 3, continent: "north_america" }, // canada
        "2866": { blue: 2, cyan: 1, continent: "north_america" }, // costa rica
        "2889": { blue: 1, cyan: 1, continent: "north_america" }, // el salvador
        "2888": { blue: 1, cyan: 1, continent: "north_america" }, // honduras
        "2873": { blue: 1, cyan: 1, continent: "north_america" }, // jamaica
        "2679": { blue: 3, cyan: 2, continent: "north_america" }, // mexico
        "2868": { blue: 2, cyan: 2, continent: "north_america" }, // panama
        "2651": { blue: 4, cyan: 4, continent: "north_america" }, // USA
    };

    // ─── LABELS POR CONTINENTE ────────────────────────────────────────────────
    const CONTINENT_LABELS = {
        south_america: {
            'Promovidos':   'Libertadores',
            'Repescagem ↑': 'Copa Americana',
            'Repescagem ↓': 'Repescagem ↓',
            'Rebaixados':   'Despromoção ↓',
        },
        europe: {
            'Promovidos':   'Champions',
            'Repescagem ↑': 'Europa Cup',
            'Repescagem ↓': 'Repescagem ↓',
            'Rebaixados':   'Despromoção ↓',
        },
        asia: {
            'Promovidos':   'AFC Champions',
            'Repescagem ↑': 'AFC Cup',
            'Repescagem ↓': 'Repescagem ↓',
            'Rebaixados':   'Despromoção ↓',
        },
        africa: {
            'Promovidos':   'CAF Champions',
            'Repescagem ↑': 'CAF Cup',
            'Repescagem ↓': 'Repescagem ↓',
            'Rebaixados':   'Despromoção ↓',
        },
        north_america: {
            'Promovidos':   'Libertadores',
            'Repescagem ↑': 'Copa Americana',
            'Repescagem ↓': 'Repescagem ↓',
            'Rebaixados':   'Despromoção ↓',
        },
    };
    // ─────────────────────────────────────────────────────────────────────────

    const leagueId = new URLSearchParams(window.location.search).get('champid')
                  || new URLSearchParams(window.location.search).get('leagueid');

    const config = LEAGUE_CONFIG[leagueId];
    if (!config) return;

    const LABEL_MAP = CONTINENT_LABELS[config.continent] || {};

    const ZONE_COLORS = {
        blue:   ['rgb(9,9,58)',    'rgb(7,7,45)'],
        cyan:   ['rgb(15,51,80)',  'rgb(12,39,60)'],
        green:  ['rgb(33,74,15)',  'rgb(27,60,14)'],
        orange: ['rgb(103,40,2)', 'rgb(86,33,1)'],
        red:    ['rgb(72,1,1)',    'rgb(56,0,0)'],
    };

    const GAME_CLASSES   = ['hblue', 'hcyan', 'hgreen', 'horange', 'hred'];
    const CUSTOM_CLASSES = ['match-blue', 'match-cyan', 'match-green', 'match-orange', 'match-red'];

    // Lê do DOM quais posições começam o orange e o red
    function getZoneBoundaries() {
        const rows = document.querySelectorAll('#chartList tr[id^="trow"]');
        let firstOrange = null, firstRed = null;

        rows.forEach((row, index) => {
            const pos = index + 1;
            if (row.classList.contains('horange') && firstOrange === null) firstOrange = pos;
            if (row.classList.contains('hred')    && firstRed    === null) firstRed    = pos;
        });

        const total = rows.length;
        return {
            orange: firstOrange ?? total + 1,
            red:    firstRed    ?? total + 1,
        };
    }

    function getZone(pos, b) {
        const cyanEnd = config.blue + config.cyan;
        if (pos <= config.blue)   return 'blue';
        if (pos <= cyanEnd)       return 'cyan';
        if (pos < b.orange)       return 'green';
        if (pos >= b.red)         return 'red';
        if (pos >= b.orange)      return 'orange';
        return 'green';
    }

    const style = document.createElement('style');
    style.textContent = `
        #chartList tr[class*="match-"] td { background: transparent !important; color: #fff !important; }
    `;
    document.head.appendChild(style);

    const zoneCounters = {};

    function applyColors() {
        const b = getZoneBoundaries();
        Object.keys(ZONE_COLORS).forEach(z => zoneCounters[z] = 0);

        document.querySelectorAll('#chartList tr[id^="trow"]').forEach((row, index) => {
            const pos   = index + 1;
            const zone  = getZone(pos, b);

            row.classList.remove(...GAME_CLASSES, ...CUSTOM_CLASSES);

            const nth   = zoneCounters[zone]++;
            const color = ZONE_COLORS[zone][nth % 2];

            row.style.setProperty('background-color', color, 'important');
            row.style.setProperty('border-left', `4px solid ${color}`, 'important');
        });
    }

    function applyLabels() {
        document.querySelectorAll('.champt.legenda').forEach(el => {
            const txt = el.textContent.trim();
            if (LABEL_MAP[txt]) el.textContent = LABEL_MAP[txt];
        });
    }

    function applyAll() { applyColors(); applyLabels(); }

    applyAll();

    const target = document.querySelector('#chartList');
    if (!target) return;

    const observer = new MutationObserver(() => {
        observer.disconnect();
        applyAll();
        observer.observe(target, { childList: true, subtree: true });
    });
    observer.observe(target, { childList: true, subtree: true });
})();
