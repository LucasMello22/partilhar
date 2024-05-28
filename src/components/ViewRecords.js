import React from 'react';

function ViewRecords() {
  const records = [
    { id: 1, patientName: 'João Silva', details: 'Consulta dia 01/01/2024' },
    { id: 2, patientName: 'Maria Souza', details: 'Consulta dia 02/02/2024' }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Visualizar Prontuários</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Aplica estilo para remover a bolinha e o padding */}
        {records.map((record) => (
          <li key={record.id} style={{ marginBottom: '1rem' }}> {/* Adiciona margem inferior de 1rem */}
            {record.patientName} - {record.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRecords;
