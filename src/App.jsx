import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [status, setStatus] = useState("Durum bilgisi yükleniyor...");
  const [simulationData, setSimulationData] = useState("Simülasyon verisi yükleniyor...");
  const [log, setLog] = useState("Log bilgisi yükleniyor...");
  const [isSettings, setIsSettings] = useState(false); // state to toggle between dashboard and settings

  useEffect(() => {
    fetch("http://localhost:5000/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.message));

    fetch("http://localhost:5000/simulation")
      .then((res) => res.json())
      .then((data) => setSimulationData(data.message));

    fetch("http://localhost:5000/log")
      .then((res) => res.json())
      .then((data) => setLog(data.message));
  }, []);

  const goToSettings = () => {
    setIsSettings(true);
  };

  const goBackToDashboard = () => {
    setIsSettings(false);
  };

  return (
    <div className="dashboard-container">
      <div className="nav-bar">
        <button className="nav-button" onClick={goBackToDashboard}>Ana Sayfa</button>
        <button className="nav-button" onClick={goToSettings}>Ayarlar</button>
        <button className="nav-button">Hakkında</button>
        <button className="nav-button">Log</button>
      </div>

      {/* Conditional Rendering for Dashboard or Settings */}
      {!isSettings ? (
        <>
          <div className="status-screen">
            <h2>Durum Ekranı</h2>
            <p>{status}</p>
          </div>
          <div className="buttons-panel">
            <h2>Butonlar</h2>
            <button className="start-button">Başlat</button>
          </div>
          <div className="simulation-screen">
            <h2>Simülasyon Ekranı</h2>
            <p>{simulationData}</p>
          </div>
          <div className="log-panel">
            <h2>Log</h2>
            <p>{log}</p>
          </div>
        </>
      ) : (
        <div className="settings-screen">
          <div className="camera-view">
            <h2>KAMERA GÖRÜNTÜSÜ</h2>
            <p>Burada kamera görüntüsü yer alacak.</p>
          </div>
          <div className="telemetry-view">
            <h2>TELEMETRİLER</h2>
            <p>Burada telemetri verisi yer alacak.</p>
          </div>
        </div>
      )}
    </div>
  );
}