const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

const issIcon = L.icon({
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

async function updateISSPosition() {
  const response = await fetch('http://api.open-notify.org/iss-now.json');
  const data = await response.json();
  const { latitude, longitude } = data.iss_position;

  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude], map.getZoom());

  console.log(`ISS is at latitude ${latitude}, longitude ${longitude}`);
}

// Update every 5 seconds
updateISSPosition();
setInterval(updateISSPosition, 5000);
