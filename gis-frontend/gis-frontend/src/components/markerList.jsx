import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import AddMarker from "../pages/addMarker";

const MarkerList = () => {
  const [markers, setMarkers] = useState([]);
  const [editingMarker, setEditingMarker] = useState(null);

  // Mengambil data marker saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await api.get("/api/markers");
        setMarkers(response.data); // Menyimpan daftar marker di state
      } catch (error) {
        console.error("Gagal mengambil marker:", error);
      }
    };

    fetchMarkers();
  }, []);

  // Fungsi untuk mengedit marker
  const handleEdit = (marker) => {
    setEditingMarker(marker);
  };

  // Fungsi untuk menghapus marker
  const handleDelete = async (markerId) => {
    try {
      await api.delete(`/api/markers/${markerId}`);
      setMarkers(markers.filter((marker) => marker._id !== markerId)); // Menghapus marker dari daftar
      alert("Marker berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus marker:", error);
      alert("Gagal menghapus marker");
    }
  };

  return (
    <div>
      <h2>Daftar Marker</h2>
      {markers.map((marker) => (
        <div key={marker._id} style={{ marginBottom: "20px" }}>
          <h4>{marker.title}</h4>
          <p>{marker.description}</p>
          <button onClick={() => handleEdit(marker)}>Edit</button>
          <button onClick={() => handleDelete(marker._id)}>Delete</button>
        </div>
      ))}

      {/* Jika sedang mengedit, tampilkan form edit */}
      {editingMarker && (
        <AddMarker
          onAddMarker={(newMarker) => setMarkers((prevMarkers) => prevMarkers.map((marker) => (marker._id === newMarker._id ? newMarker : marker)))}
          marker={editingMarker}
          lat={editingMarker.latitude}
          lng={editingMarker.longitude}
        />
      )}

      <AddMarker
        onAddMarker={(newMarker) => setMarkers((prevMarkers) => [...prevMarkers, newMarker])}
        lat={-8.3405} // Contoh latitude
        lng={115.092} // Contoh longitude
      />
    </div>
  );
};

export default MarkerList;
