const db = require("../database");

exports.getMarkers = (req, res) => {
  db.query("SELECT * FROM markers", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.createMarker = (req, res) => {
  const { title, description, latitude, longitude } = req.body;
  db.query(
    "INSERT INTO markers (title, description, latitude, longitude) VALUES (?, ?, ?, ?)",
    [title, description, latitude, longitude],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ id: result.insertId, title, description, latitude, longitude });
    }
  );
};

exports.updateMarker = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.query(
    "UPDATE markers SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Marker not found" });
      res.json({ id, title, description });
    }
  );
};

exports.deleteMarker = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM markers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Marker not found" });
    res.json({ message: "Marker deleted successfully" });
  });
};
