
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:1880/data");

        if (!response.ok) {
          throw new Error("Unable to fetch Node-RED data");
        }

        const result = await response.json();
        setData(result);
        setStatus("Connected");
        setError("");
      } catch (err) {
        setStatus("Disconnected");
        setError(err.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Azure IoT Telemetry Dashboard</h1>
        <p>Real-time data using Azure IoT Hub and Node-RED</p>
      </header>

      <main className="dashboard">
        <section className="card">
          <h2>Student Details</h2>
          <p>
            <strong>Name:</strong> SUBIKSHAA C
          </p>
          <p>
            <strong>Roll Number:</strong> 24EIR098
          </p>
        </section>

        <section className="card">
          <h2>Connection Status</h2>
          <p
            className={
              status === "Connected" ? "connected" : "disconnected"
            }
          >
            ● {status}
          </p>
          {error && <p>{error}</p>}
        </section>

        <section className="card">
          <h2>Received ASCII Values</h2>
          <p className="values">
            {data?.receivedAsciiValues?.join(", ") ??
              "Waiting for data..."}
          </p>
        </section>

        <section className="card">
          <h2>Converted String</h2>
          <p className="string">
            {data?.convertedString ?? "Waiting for data..."}
          </p>
        </section>

        <section className="card">
          <h2>Last Event Timestamp</h2>
          <p>{data?.timestamp ?? "Waiting for data..."}</p>
        </section>
      </main>

      <footer>
        <p>Azure IoT Hub → Node-RED → React</p>
      </footer>
    </div>
  );
}

export default App;
