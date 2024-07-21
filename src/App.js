import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [plot, setPlot] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://srabackend.onrender.com/process', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResults(data.results);
    setPlot(data.plot);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SRAnalysis</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
        {results && (
          <div>
            <h2>Results:</h2>
            <pre>{results}</pre>
          </div>
        )}
        {plot && (
          <div>
            <h2>Plot:</h2>
            <img src={`data:image/png;base64,${plot}`} alt="Plot" />
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 SRAnalysis. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
