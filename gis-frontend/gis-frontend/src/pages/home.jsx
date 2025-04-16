import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; 
export default function Home() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>GIS Explorer</h1>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="navbar-item">Login</Link>
          <Link to="/register" className="navbar-item">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <h2>Welcome to GIS Explorer</h2>
        <p>Your platform for exploring geographical data!</p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Interactive Maps</h3>
          <p>Explore dynamic maps to visualize geographical data in real-time.</p>
        </div>
        <div className="feature">
          <h3>Data Analysis</h3>
          <p>Analyze geographic patterns and trends with advanced tools.</p>
        </div>
        <div className="feature">
          <h3>Custom Reports</h3>
          <p>Create and download custom reports based on your GIS data.</p>
        </div>
      </section>

      <footer className="footer">
        <p>GIS Explorer &copy; 2025</p>
      </footer>
    </div>
  );
}