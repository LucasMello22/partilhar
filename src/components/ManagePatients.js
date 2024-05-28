import React, { useState, useEffect } from 'react';

function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [modifiedName, setModifiedName] = useState('');
  const [modifyIndex, setModifyIndex] = useState(null);

  useEffect(() => {
    // Carrega os pacientes salvos do localStorage ao carregar a página
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  const handleAddPatient = () => {
    const newPatient = { name: patientName };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    // Salva os pacientes atualizados no localStorage
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setPatientName('');
  };

  const handleDeletePatient = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
    // Salva os pacientes atualizados no localStorage após a exclusão
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleModifyPatient = (index) => {
    // Define o nome a ser modificado e o índice do paciente
    setModifiedName(patients[index].name);
    setModifyIndex(index);
  };

  const handleSaveModifiedName = () => {
    if (modifyIndex !== null) {
      const updatedPatients = [...patients];
      updatedPatients[modifyIndex].name = modifiedName;
      setPatients(updatedPatients);
      // Salva os pacientes atualizados no localStorage após a modificação
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      setModifiedName('');
      setModifyIndex(null);
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
