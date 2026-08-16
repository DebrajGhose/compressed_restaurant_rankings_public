/* Compressed Restaurant Rankings — renderer (city-agnostic).

   Reads window.CITIES[<id>] (see data/*.js) and draws the ranked board + top-10 map,
   split by type via a toggle: "Proper meals" vs "Quick bites". Each restaurant arrives
   with a precomputed `type`, `score` (0–100 within its type) and `rank` (within type).
   This file does NO scoring math and holds NO raw data — purely presentation.
   No build step, no dependencies. */

(function () {
  "use strict";

  var PRICE_COLORS = { 1: "#9cc9a7", 2: "#e7cf86", 3: "#e8af86", 4: "#e0909e" };
  var TYPES = [
    { key: "meal",  label: "Proper meals" },
    { key: "quick", label: "Quick bites" }
  ];

  // ---- pick the city -------------------------------------------------------
  var cities = window.CITIES || {};
  var ids = Object.keys(cities);
  if (!ids.length) { document.getElementById("title").textContent = "No city data loaded."; return; }
  var params = new URLSearchParams(location.search);
  var cityId = params.get("city");
  if (!cities[cityId]) cityId = ids[0];

  var board = document.getElementById("board");
  var city;                       // current city object
  var activeType = "meal";        // default view: proper meals

  // ---- setup ---------------------------------------------------------------
  function loadCity(id) {
    cityId = id;
    city = cities[id];

    // group precomputed rows by type, each ordered by its own rank
    city._byType = {};
    TYPES.forEach(function (t) {
      city._byType[t.key] = city.restaurants
        .filter(function (r) { return r.type === t.key; })
        .sort(function (a, b) { return a.rank - b.rank; });
    });
    if (!city._byType[activeType] || !city._byType[activeType].length) activeType = TYPES[0].key;

    document.getElementById("title").textContent = "Best restaurants in " + city.name;
    document.getElementById("asof").textContent = city.asOf ? "Ratings as of " + city.asOf : "";
    document.getElementById("description").textContent = city.description || "";

    buildSwitcher();
    buildTypeToggle();
    render();
  }

  function render() {
    buildTypeToggle();   // refresh active-button styling
    buildBoard();
    buildMap();
  }

  function buildSwitcher() {
    var box = document.getElementById("city-switcher");
    box.innerHTML = "";
    if (ids.length < 2) return;
    ids.forEach(function (id) {
      var b = document.createElement("button");
      b.className = "city-btn" + (id === cityId ? " active" : "");
      b.textContent = cities[id].name;
      b.onclick = function () {
        var u = new URL(location);
        u.searchParams.set("city", id);
        history.replaceState(null, "", u);
        loadCity(id);
      };
      box.appendChild(b);
    });
  }

  // ---- quick / meal toggle -------------------------------------------------
  function buildTypeToggle() {
    var box = document.getElementById("type-toggle");
    if (!box) return;
    box.innerHTML = "";
    TYPES.forEach(function (t) {
      var count = (city._byType[t.key] || []).length;
      if (!count) return;
      var b = document.createElement("button");
      b.className = "type-btn" + (t.key === activeType ? " active" : "");
      b.innerHTML = t.label + " <span>" + count + "</span>";
      b.onclick = function () {
        if (activeType === t.key) return;
        activeType = t.key;
        render();
      };
      box.appendChild(b);
    });
  }

  function activeLabel() {
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i].key === activeType) return TYPES[i].label.toLowerCase();
    return "";
  }

  // ---- the ranked board ----------------------------------------------------
  function buildBoard() {
    var rows = city._byType[activeType] || [];
    var total = rows.length;
    var frag = document.createDocumentFragment();

    rows.forEach(function (r) {
      var color = PRICE_COLORS[r.price] || "#bdbdbd";

      var row = document.createElement("div");
      row.className = "row";
      row.tabIndex = 0;
      row.addEventListener("click", function () { window.open(placeLink(r), "_blank", "noopener"); });
      row.addEventListener("keydown", function (e) { if (e.key === "Enter") window.open(placeLink(r), "_blank", "noopener"); });

      // value bar behind the content (width = value score)
      var bar = document.createElement("div");
      bar.className = "row-bar";
      bar.style.width = r.score + "%";
      bar.style.background = color;
      row.appendChild(bar);

      var content = document.createElement("div");
      content.className = "row-content";
      content.innerHTML =
        "<div class='rank'><b>" + r.rank + "</b><span>/" + total + "</span></div>" +
        "<div class='info'>" +
          "<span class='name'>" + esc(r.name) + "</span>" +
          "<span class='chip' style='background:" + color + "'>" + "$".repeat(r.price) + "</span>" +
          "<span class='go'>view location ↗</span>" +
        "</div>" +
        "<div class='score'>" + Math.round(r.score) + "<span>/100</span></div>";
      row.appendChild(content);
      frag.appendChild(row);
    });

    board.innerHTML = "";
    board.appendChild(frag);
    document.getElementById("board-count").textContent =
      total.toLocaleString() + " " + activeLabel() + ", best value first";
  }

  // ---- map: top 10 of whatever area is in view -----------------------------
  // The pins always show the 10 best-ranked spots inside the CURRENT viewport,
  // recomputed on every pan/zoom (zoom into a neighborhood to see its own top 10).
  // Pin numbers are the citywide rank, so they match the list below, which never
  // changes with the map.
  var mapObj = null;
  function buildMap() {
    var el = document.getElementById("map");
    if (typeof L === "undefined" || !el) return;        // Leaflet not loaded (offline)
    var all = (city._byType[activeType] || []).filter(function (r) {
      return typeof r.lat === "number" && typeof r.lng === "number";
    });                                                  // already rank-ordered

    if (mapObj) { mapObj.remove(); mapObj = null; }
    if (!all.length) { el.innerHTML = "<div style='padding:16px;color:#737373;font-size:13px'>No coordinates in the data yet.</div>"; setMapNote(""); return; }
    el.innerHTML = "";

    mapObj = L.map(el, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(mapObj);

    var markers = L.layerGroup().addTo(mapObj);

    function updateMarkers() {
      var bounds = mapObj.getBounds();
      var inView = all.filter(function (r) { return bounds.contains([r.lat, r.lng]); }).slice(0, 10);
      markers.clearLayers();
      var entries = [];
      inView.forEach(function (r) {
        var color = PRICE_COLORS[r.price] || "#bdbdbd";
        var icon = L.divIcon({
          className: "",
          html: "<div class='pin' style='background:" + color + "'><b>" + r.rank + "</b></div>",
          iconSize: [26, 26], iconAnchor: [13, 26], tooltipAnchor: [0, -24]
        });
        var m = L.marker([r.lat, r.lng], { icon: icon, title: r.name }).addTo(markers);
        m.bindTooltip(r.rank + ". " + r.name + " · " + Math.round(r.score) + "/100", { className: "pin-label", direction: "top", permanent: true, opacity: 0.95 });
        m.on("click", function () { window.open(placeLink(r), "_blank", "noopener"); });
        entries.push({ marker: m, r: r });
      });
      layoutLabels(entries);      // keep the labels from sitting on top of each other
      if (!inView.length) setMapNote("no ranked spots in view — zoom out");
      else if (inView.length < 10) setMapNote("the " + inView.length + " best in view — pan or zoom to explore");
      else setMapNote("the 10 best in view — pan or zoom to explore");
    }

    // Permanent labels overlap badly once pins cluster. Walk them best-rank first
    // and nudge each one to the first candidate spot that clears every pin and every
    // label already placed. Anything with nowhere to go is hidden: its numbered pin
    // stays put and the name is still available on hover.
    function layoutLabels(entries) {
      var box = el.getBoundingClientRect();
      var taken = [];                         // labels already placed

      var pins = entries.map(function (e) {   // pins block label space too
        var p = mapObj.latLngToContainerPoint([e.r.lat, e.r.lng]);
        return { x: p.x - 13, y: p.y - 26, w: 26, h: 26 };
      });

      entries.forEach(function (e, idx) {
        var tip = e.marker.getTooltip();
        var te = tip && tip.getElement();
        if (!te) return;
        te.style.marginLeft = "0px";
        te.style.marginTop = "0px";
        te.style.visibility = "";
        te.classList.remove("moved");

        var r0 = te.getBoundingClientRect();
        var base = { x: r0.left - box.left, y: r0.top - box.top, w: r0.width, h: r0.height };
        // search outward in rings: straight up first, then the sides and diagonals
        var stepY = base.h + 6, stepX = base.w / 2 + 20;
        var cands = [[0, 0]];
        [1, 1.6, 2.3, 3.1, 4].forEach(function (k) {
          var rx = stepX * k, ry = stepY * k;
          cands.push([0, -ry], [0, ry + 26], [-rx, 26], [rx, 26],
                     [-rx, 26 - ry], [rx, 26 - ry], [-rx, 26 + ry], [rx, 26 + ry]);
        });

        for (var i = 0; i < cands.length; i++) {
          var c = { x: base.x + cands[i][0], y: base.y + cands[i][1], w: base.w, h: base.h };
          if (c.x < 2 || c.y < 2 || c.x + c.w > box.width - 2 || c.y + c.h > box.height - 2) continue;
          if (overlaps(c, taken) || overlaps(c, pins, idx)) continue;   // skip its own pin
          te.style.marginLeft = cands[i][0] + "px";
          te.style.marginTop = cands[i][1] + "px";
          if (i > 0) te.classList.add("moved");   // drop the pointer arrow once moved
          taken.push(c);
          return;
        }
        te.style.visibility = "hidden";
      });
    }

    function overlaps(a, list, skip) {
      for (var i = 0; i < list.length; i++) {
        if (i === skip) continue;
        var b = list[i];
        if (a.x < b.x + b.w + 3 && a.x + a.w + 3 > b.x &&
            a.y < b.y + b.h + 3 && a.y + a.h + 3 > b.y) return true;
      }
      return false;
    }

    mapObj.on("moveend", updateMarkers);   // fires after every pan/zoom (and fitBounds)

    // start on the citywide top 10
    mapObj.fitBounds(all.slice(0, 10).map(function (r) { return [r.lat, r.lng]; }), { padding: [40, 40] });
    updateMarkers();
  }

  function setMapNote(text) {
    var n = document.getElementById("map-note");
    if (n) n.textContent = text;
  }

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]; }); }

  // Neutral "view location" link: drops a pin on OpenStreetMap (open-licensed, no
  // third-party data-source reference). Uses coords when present, else a name search.
  function placeLink(r) {
    if (typeof r.lat === "number" && typeof r.lng === "number")
      return "https://www.openstreetmap.org/?mlat=" + r.lat + "&mlon=" + r.lng + "#map=18/" + r.lat + "/" + r.lng;
    return "https://www.openstreetmap.org/search?query=" + encodeURIComponent(r.name + ", " + (city && city.name ? city.name : ""));
  }

  loadCity(cityId);
})();
