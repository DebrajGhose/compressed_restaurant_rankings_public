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

  // ---- map of the top 10 --------------------------------------------------
  var mapObj = null;
  function buildMap() {
    var el = document.getElementById("map");
    if (typeof L === "undefined" || !el) return;        // Leaflet not loaded (offline)
    var top = (city._byType[activeType] || []).filter(function (r) {
      return typeof r.lat === "number" && typeof r.lng === "number";
    }).slice(0, 10);

    if (mapObj) { mapObj.remove(); mapObj = null; }
    if (!top.length) { el.innerHTML = "<div style='padding:16px;color:#737373;font-size:13px'>No coordinates in the data yet.</div>"; return; }
    el.innerHTML = "";

    mapObj = L.map(el, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(mapObj);

    var pts = [];
    top.forEach(function (r) {
      var color = PRICE_COLORS[r.price] || "#bdbdbd";
      var icon = L.divIcon({
        className: "",
        html: "<div class='pin' style='background:" + color + "'><b>" + r.rank + "</b></div>",
        iconSize: [26, 26], iconAnchor: [13, 26], tooltipAnchor: [0, -24]
      });
      var m = L.marker([r.lat, r.lng], { icon: icon }).addTo(mapObj);
      m.bindTooltip(r.rank + ". " + r.name, { className: "pin-label", direction: "top", permanent: true, opacity: 0.95 });
      m.on("click", function () { window.open(placeLink(r), "_blank", "noopener"); });
      pts.push([r.lat, r.lng]);
    });
    mapObj.fitBounds(pts, { padding: [40, 40] });
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
