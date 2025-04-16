import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const AddMarker = ({ onAddMarker, lat, lng, marker }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Jika sedang mengedit marker, pre-populate form dengan data marker
  useEffect(() => {
    if (marker) {
      setName(marker.title);
      setDescription(marker.description);
    }
  }, [marker]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMarker = {
      title: name,
      description,
      latitude: lat,
      longitude: lng,
    };

    try {
      let response;
      if (marker) {
        // Mengupdate marker yang ada
        response = await api.put(`/api/markers/${marker._id}`, newMarker);
        alert("Marker berhasil diperbarui!");
      } else {
        // Menambahkan marker baru
        response = await api.post("/api/markers", newMarker);
        alert("Marker berhasil ditambahkan!");
      }

      onAddMarker(response.data); // Update peta dengan marker yang baru atau yang sudah diperbarui

      // Reset form setelah pengiriman data
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Gagal mengelola marker:", error);
      alert("Gagal mengelola marker");
    }
  };

  return (
    <div style={{ margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "400px", backgroundColor: "#f9f9f9" }}>
      <h3 style={{ marginBottom: "10px" }}>{marker ? "Edit Marker" : "Tambah Marker Baru"}</h3>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "5px" }}>Nama Lokasi</label>
        <input
          type="text"
          placeholder="Contoh: Pura Ulun Danu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <label style={{ display: "block", marginBottom: "5px" }}>Deskripsi</label>
        <input
          type="text"
          placeholder="Contoh: Tempat ibadah di pinggir danau"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {marker ? "Perbarui Marker" : "Simpan Marker"}
        </button>
      </form>
    </div>
  );
};

export default AddMarker;
