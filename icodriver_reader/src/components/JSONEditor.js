import { useState } from "react";
import { saveAs } from "file-saver";

export default function JSONEditor() {
  const [jsonContent, setJsonContent] = useState("");
  const [parsedData, setParsedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonContent(e.target.result);
        try {
          const parsed = JSON.parse(e.target.result);
          setParsedData(parsed);
        } catch (error) {
          alert("Error: Archivo JSON inválido");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = (event) => {
    setJsonContent(event.target.value);
    try {
      setParsedData(JSON.parse(event.target.value));
    } catch (error) {
      setParsedData(null);
    }
  };

  const handleExport = () => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    saveAs(blob, "notas_rally_editadas.json");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">iCodriver Reader</h1>
      <input type="file" onChange={handleFileUpload} accept=".json" className="mb-4" />
      {jsonContent && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Detalles del Tramo</h2>
          {parsedData?.files && (
            <div>
              <p><strong>Nombre:</strong> {Object.values(parsedData.files)[0].info.name}</p>
              <p><strong>Número SS:</strong> {Object.values(parsedData.files)[0].info.ss_num}</p>
              <p><strong>Fecha:</strong> {Object.values(parsedData.files)[0].info.created}</p>
            </div>
          )}
          <h2 className="text-lg font-semibold mt-4">Editar JSON</h2>
          <textarea
            value={jsonContent}
            onChange={handleEdit}
            className="w-full h-60 p-2 border rounded"
          />
        </div>
      )}
      <button onClick={handleExport} disabled={!parsedData} className="w-full bg-blue-500 text-white py-2 rounded">
        Exportar JSON
      </button>
    </div>
  );
}