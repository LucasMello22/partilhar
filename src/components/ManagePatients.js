import React, { useState, useEffect } from 'react';

function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [modifiedName, setModifiedName] = useState('');
  const [modifyIndex, setModifyIndex] = useState(null);

  useEffect(() => {
    // Carrega os pacientes do backend ao carregar a página
    fetch('http://localhost:3001/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleAddPatient = () => {
    const newPatient = { name: patientName };
    fetch('http://localhost:3001/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPatient)
    })
      .then(response => response.json())
      .then(data => setPatients([...patients, data]))
      .catch(error => console.error('Error adding patient:', error));
    setPatientName('');
  };

  const handleDeletePatient = (index) => {
    fetch(`http://localhost:3001/patients/${index}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedPatients = patients.filter((_, i) => i !== index);
        setPatients(updatedPatients);
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  const handleModifyPatient = (index) => {
    // Define o nome a ser modificado e o índice do paciente
    setModifiedName(patients[index].name);
    setModifyIndex(index);
  };

  const handleSaveModifiedName = () => {
    if (modifyIndex !== null) {
      const updatedPatient = { name: modifiedName };
      fetch(`http://localhost:3001/patients/${modifyIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPatient)
      })
        .then(response => response.json())
        .then(data => {
          const updatedPatients = [...patients];
          updatedPatients[modifyIndex] = data;
          setPatients(updatedPatients);
          setModifiedName('');
          setModifyIndex(null);
        })
        .catch(error => console.error('Error modifying patient:', error));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Gerenciar Pacientes</h2>
        <input
          type="text"
          placeholder="Nome do Paciente"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <button onClick={handleAddPatient}>Adicionar Paciente</button>
        <ul style={{ listStyle: 'none', paddingLeft: '0', paddingInlineStart: '0' }}>
          {patients.map((patient, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {modifyIndex === index ? (
                <input
                  type="text"
                  value={modifiedName}
                  onChange={(e) => setModifiedName(e.target.value)}
                />
              ) : (
                patient.name
              )}
              {modifyIndex === index ? (
                <button style={{ marginLeft: '0.5rem', backgroundColor: 'green', color: 'white' }} onClick={handleSaveModifiedName}>Salvar</button>
              ) : (
                <>
                  <button style={{ marginLeft: '0.5rem', backgroundColor: 'red', color: 'white' }} onClick={() => handleDeletePatient(index)}>Excluir</button>
                  <button style={{ marginLeft: '0.5rem', backgroundColor: 'green', color: 'white' }} onClick={() => handleModifyPatient(index)}>Modificar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManagePatients;
