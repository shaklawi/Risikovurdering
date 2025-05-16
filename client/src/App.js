
import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    dato: '',
    deltagere: '',
    omraade: '',
    proces: '',
    risiko: '',
    losning: ''
  });

  const [rows, setRows] = useState([]);
  const [konsekvens, setKonsekvens] = useState(0);
  const [sandsynlighed, setSandsynlighed] = useState(0);

  const addRow = () => {
    setRows([...rows, { fare: '', k: 1, s: 1, action: '', ansvarlig: '', deadline: '' }]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const getRiskLevel = (score) => {
    if (score <= 3) return 'Lav';
    if (score <= 6) return 'Moderat';
    if (score <= 10) return 'Høj';
    return 'Kritisk';
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Risikovurdering</h1>
      <label>Dato: <input type="date" onChange={e => setForm({...form, dato: e.target.value})} /></label><br/><br/>
      <label>Deltagere: <input type="text" onChange={e => setForm({...form, deltagere: e.target.value})} /></label><br/><br/>
      <label>Område: <input type="text" onChange={e => setForm({...form, omraade: e.target.value})} /></label><br/><br/>
      <label>Arbejdsproces: <input type="text" onChange={e => setForm({...form, proces: e.target.value})} /></label><br/><br/>
      <label>Beskriv risikoen: <textarea onChange={e => setForm({...form, risiko: e.target.value})}></textarea></label><br/><br/>
      <label>Forslag til løsning: <textarea onChange={e => setForm({...form, losning: e.target.value})}></textarea></label><br/><br/>

      <h2>Risikomatrix</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>S\K</th>
            {[1, 2, 3, 4, 5].map(k => <th key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {[5, 4, 3, 2, 1].map(s => (
            <tr key={s}>
              <th>{s}</th>
              {[1, 2, 3, 4, 5].map(k => {
                const score = k * s;
                const bg = score <= 3 ? '#c8e6c9' : score <= 6 ? '#fff59d' : score <= 10 ? '#ffcc80' : '#ef9a9a';
                const highlight = (k === Number(konsekvens) && s === Number(sandsynlighed)) ? '2px solid black' : 'none';
                return <td key={k} style={{ background: bg, border: highlight }}>{score}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <label>Vælg Konsekvens: 
        <select onChange={e => setKonsekvens(e.target.value)}>
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </select>
      </label>
      <label style={{ marginLeft: 20 }}>Vælg Sandsynlighed: 
        <select onChange={e => setSandsynlighed(e.target.value)}>
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </select>
      </label>

      <h2>Risikovurderingslinjer</h2>
      <button onClick={addRow}>+ Tilføj række</button>
      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Fare</th><th>K</th><th>S</th><th>Risiko</th><th>Vurdering</th><th>Foranstaltning</th><th>Ansvarlig</th><th>Deadline</th><th>Fjern</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const score = row.k * row.s;
            return (
              <tr key={idx}>
                <td><input value={row.fare} onChange={e => updateRow(idx, 'fare', e.target.value)} /></td>
                <td><input type="number" value={row.k} min="1" max="5" onChange={e => updateRow(idx, 'k', Number(e.target.value))} /></td>
                <td><input type="number" value={row.s} min="1" max="5" onChange={e => updateRow(idx, 's', Number(e.target.value))} /></td>
                <td>{score}</td>
                <td>{getRiskLevel(score)}</td>
                <td><input value={row.action} onChange={e => updateRow(idx, 'action', e.target.value)} /></td>
                <td><input value={row.ansvarlig} onChange={e => updateRow(idx, 'ansvarlig', e.target.value)} /></td>
                <td><input type="date" value={row.deadline} onChange={e => updateRow(idx, 'deadline', e.target.value)} /></td>
                <td><button onClick={() => removeRow(idx)}>X</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
