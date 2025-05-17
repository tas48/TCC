import React, { useState } from "react";

const scanTypes = [
  { value: "scan-leve", label: "Scan Leve" },
  { value: "scan-medio", label: "Scan Médio" },
  { value: "scan-profundo", label: "Scan Profundo" }
];

interface ScheduledScan {
  id: string;
  target: string;
  scanType: string;
  date: string;
  time: string;
  status: "pending" | "running" | "completed" | "failed";
}

const Scheduling = () => {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduledScans, setScheduledScans] = useState<ScheduledScan[]>([]);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

  const handleSchedule = () => {
    if (!target || !scanType || !date || !time) {
      setToast({ type: "error", message: "Preencha todos os campos" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const newScan: ScheduledScan = {
      id: Date.now().toString(),
      target,
      scanType,
      date,
      time,
      status: "pending"
    };

    setScheduledScans(prev => [...prev, newScan]);
    setTarget("");
    setScanType("");
    setDate("");
    setTime("");
    setToast({ type: "success", message: "O scan foi agendado com sucesso" });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusColor = (status: ScheduledScan["status"]) => {
    switch (status) {
      case "pending": return "#B7791F"; // yellow-600
      case "running": return "#2B6CB0"; // blue-600
      case "completed": return "#319795"; // teal-500
      case "failed": return "#C53030"; // red-600
      default: return "#4A5568"; // gray-600
    }
  };

  const getStatusBg = (status: ScheduledScan["status"]) => {
    switch (status) {
      case "pending": return "#2d3748";
      case "running": return "#2d3748";
      case "completed": return "#2d3748";
      case "failed": return "#2d3748";
      default: return "#2d3748";
    }
  };

  const getStatusText = (status: ScheduledScan["status"]) => {
    switch (status) {
      case "pending": return "Pendente";
      case "running": return "Em execução";
      case "completed": return "Concluído";
      case "failed": return "Falhou";
      default: return "Desconhecido";
    }
  };

  return (
    <div style={{ background: "#1a202c", color: "#f7fafc", minHeight: "100vh", padding: 32, borderRadius: 16, maxWidth: 800, width: "100%", margin: "32px auto" }}>
      <h2 style={{ fontSize: 28, textAlign: "center", marginBottom: 24, color: "#f7fafc" }}>Agendamento de Scans</h2>
      {toast && (
        <div style={{
          background: toast.type === "error" ? "#C53030" : "#319795",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          textAlign: "center",
          fontWeight: 500
        }}>{toast.message}</div>
      )}
      <div style={{ background: "#2d3748", padding: 24, borderRadius: 12, border: "1px solid #4a5568", marginBottom: 32 }}>
        <h3 style={{ fontSize: 20, marginBottom: 16, color: "#f7fafc" }}>Novo Agendamento</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 600 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ color: "#e2e8f0", fontWeight: 500 }}>Target</label>
            <input
              type="text"
              placeholder="ex: dominio.com"
              value={target}
              onChange={e => setTarget(e.target.value)}
              style={{ background: "#2d3748", color: "#f7fafc", border: "1px solid #4a5568", borderRadius: 6, padding: 8, fontSize: 16, outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ color: "#e2e8f0", fontWeight: 500 }}>Tipo de Scan</label>
            <select
              value={scanType}
              onChange={e => setScanType(e.target.value)}
              style={{ background: "#2d3748", color: "#f7fafc", border: "1px solid #4a5568", borderRadius: 6, padding: 8, fontSize: 16 }}
            >
              <option value="" style={{ color: "#a0aec0" }}>Selecione o tipo de scan</option>
              {scanTypes.map(type => (
                <option key={type.value} value={type.value} style={{ color: "#1a202c" }}>{type.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ color: "#e2e8f0", fontWeight: 500 }}>Data</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ background: "#2d3748", color: "#f7fafc", border: "1px solid #4a5568", borderRadius: 6, padding: 8, fontSize: 16, outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ color: "#e2e8f0", fontWeight: 500 }}>Horário</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ background: "#2d3748", color: "#f7fafc", border: "1px solid #4a5568", borderRadius: 6, padding: 8, fontSize: 16, outline: "none" }}
            />
          </div>
        </div>
        <button
          onClick={handleSchedule}
          style={{
            background: "#319795",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 0",
            width: "100%",
            marginTop: 20,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Agendar Scan
        </button>
      </div>
      <div style={{ background: "#2d3748", padding: 24, borderRadius: 12, border: "1px solid #4a5568" }}>
        <h3 style={{ fontSize: 20, marginBottom: 16, color: "#f7fafc" }}>Scans Agendados</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {scheduledScans.length === 0 ? (
            <div style={{ color: "#a0aec0", textAlign: "center" }}>Nenhum scan agendado</div>
          ) : (
            scheduledScans.map(scan => (
              <div
                key={scan.id}
                style={{
                  background: "#1a202c",
                  padding: 16,
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #4a5568",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  transition: "border-color 0.2s",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "#f7fafc" }}>{scan.target}</div>
                  <div style={{ fontSize: 14, color: "#a0aec0" }}>
                    {scan.scanType} - {new Date(`${scan.date}T${scan.time}`).toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    background: getStatusBg(scan.status),
                    color: getStatusColor(scan.status),
                    padding: "4px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    border: `1px solid ${getStatusColor(scan.status)}`
                  }}
                >
                  {getStatusText(scan.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Scheduling; 