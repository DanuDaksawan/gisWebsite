import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icon leaflet default
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

function AddMarkerOnClick({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    }
  });
  return null;
}

export default function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [tempMarker, setTempMarker] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const popupRef = useRef(null);

  const baseURL = "http://localhost:3000/api/markers"; // ✅ BASE URL langsung

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axios.get(baseURL);
        setMarkers(res.data);
      } catch (err) {
        console.error("Gagal ambil marker:", err);
      }
    };
    fetchMarkers();
  }, []);

  const handleMapClick = (latlng) => {
    setTempMarker(latlng);
    setForm({ title: "", description: "" });
    setEditId(null);
  };

  const handleAdd = async () => {
    try {
      const payload = {
        ...form,
        latitude: tempMarker.lat,
        longitude: tempMarker.lng
      };
      const res = await axios.post(baseURL, payload);
      setMarkers((prev) => [...prev, res.data]);
      setTempMarker(null);
      setForm({ title: "", description: "" });
    } catch (err) {
      alert("Gagal tambah marker");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert("Gagal hapus marker");
    }
  };

  const handleEdit = (marker) => {
    setEditId(marker.id);
    setForm({ title: marker.title, description: marker.description });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${baseURL}/${editId}`, form);
      setMarkers((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...form } : m))
      );
      setEditId(null);
      setForm({ title: "", description: "" });
    } catch (err) {
      alert("Gagal update marker");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🌏 Peta Interaktif - CRUD Marker
      </h2>

      <MapContainer
        center={[-8.4095, 115.1889]}
        zoom={10}
        scrollWheelZoom
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarkerOnClick onMapClick={handleMapClick} />

        {tempMarker && (
          <Marker position={[tempMarker.lat, tempMarker.lng]}>
            <Popup
              ref={popupRef}
              autoClose={false}
              autoPan={true}
              eventHandlers={{
                add: () => {
                  setTimeout(() => {
                    popupRef.current?.openOn(popupRef.current._map);
                  }, 100);
                }
              }}
            >
              <h4>Tambah Marker</h4>
              <input
                placeholder="Nama Marker"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <input
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <button onClick={handleAdd}>➕ Simpan</button>{" "}
              <button onClick={() => setTempMarker(null)}>Batal</button>
            </Popup>
          </Marker>
        )}

        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
            <Popup autoClose={false}>
              {editId === marker.id ? (
                <div>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                  <input
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <button onClick={handleSaveEdit}>💾 Simpan</button>{" "}
                  <button onClick={() => setEditId(null)}>Batal</button>
                </div>
              ) : (
                <div>
                  <strong>{marker.title}</strong>
                  <br />
                  {marker.description}
                  <br />
                  <button onClick={() => handleEdit(marker)}>✏️ Edit</button>{" "}
                  <button onClick={() => handleDelete(marker.id)}>🗑️ Hapus</button>
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
