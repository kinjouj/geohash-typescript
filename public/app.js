const geohash = new GeoHash(8);

document.getElementById("btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((res) => {
    const coords = res.coords;
    alert(geohash.encode(coords.latitude, coords.longitude));
  });
});
