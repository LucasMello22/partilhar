import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Carrega os registros de consultas do servidor ao carregar a página
    axios.get('http://localhost:3001/appointments')
      .then(response => setRecords(response.data))
      .catch(error => console.error('Erro ao carregar registros:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Visualizar Consultas Marcadas</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Aplica estilo para remover a bolinha e o padding */}
        {records.map((record) => (
          <li key={record.id} style={{ marginBottom: '1rem' }}> {/* Adiciona margem inferior de 1rem */}
            {record.patientName} - {record.date} - {record.time} - {record.doctor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRecords;
