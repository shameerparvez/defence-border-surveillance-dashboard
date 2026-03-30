// =============================================
//  Defence & Border Surveillance Dashboard
//  Subject: Web Programming
// =============================================
 
// ---- LIVE CLOCK ----
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
  const el = document.getElementById('live-clock');
  if (el) el.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);
 
// ---- SIDEBAR TOGGLE ----
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
 
// ---- LEAFLET MAP ----
window.addEventListener('load', function () {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
 
  // Centred on India's northern border region (illustrative)
  const map = L.map('map', {
    center: [32.5, 76.5],
    zoom: 6,
    zoomControl: true,
  });
 
  // OpenStreetMap tiles — cited in footer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 18,
  }).addTo(map);
 
  // Custom marker icons using Font Awesome colours
  function makeIcon(color) {
    return L.divIcon({
      className: '',
      html: `<div style="
        width:14px;height:14px;
        background:${color};
        border-radius:50%;
        border:2px solid rgba(255,255,255,0.6);
        box-shadow:0 0 8px ${color};
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  }
 
  // Illustrative patrol/threat zones
  const zones = [
    { lat: 34.1, lng: 77.5, severity: 'high',   label: 'Sector 4-Alpha — Unauthorized crossing' },
    { lat: 33.5, lng: 76.0, severity: 'medium',  label: 'Sector 2-Charlie — Suspicious vehicle' },
    { lat: 32.8, lng: 78.2, severity: 'high',    label: 'Sector 6-Bravo — Motion in restricted zone' },
    { lat: 31.9, lng: 75.8, severity: 'low',     label: 'North Perimeter — Sensor 17B anomaly' },
    { lat: 33.0, lng: 74.5, severity: 'medium',  label: 'Eastern Corridor — Unregistered drone' },
    { lat: 34.5, lng: 75.2, severity: 'clear',   label: 'Sector 1 — All clear' },
    { lat: 32.0, lng: 77.0, severity: 'clear',   label: 'Sector 3 — All clear' },
  ];
 
  const colorMap = { high: '#ff3b3b', medium: '#ffb020', low: '#00c8ff', clear: '#00e676' };
 
  zones.forEach(zone => {
    L.marker([zone.lat, zone.lng], { icon: makeIcon(colorMap[zone.severity]) })
      .addTo(map)
      .bindPopup(`<b>${zone.label}</b><br>Severity: <b style="color:${colorMap[zone.severity]}">${zone.severity.toUpperCase()}</b>`);
  });
 
  // Style the map tiles to match dark theme
  mapEl.style.filter = 'brightness(0.75) saturate(0.6) hue-rotate(180deg)';
});