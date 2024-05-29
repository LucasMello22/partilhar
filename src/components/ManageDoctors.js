import React, { useState, useEffect } from 'react';

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [modifiedName, setModifiedName] = useState('');
  const [modifyIndex, setModifyIndex] = useState(null);

  useEffect(() => {
    // Carrega os médicos do backend ao carregar a página
    fetch('http://localhost:3001/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleAddDoctor = () => {
    const newDoctor = { name: doctorName };
    fetch('http://localhost:3001/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDoctor)
    })
      .then(response => response.json())
      .then(data => setDoctors([...doctors, data]))
      .catch(error => console.error('Error adding doctor:', error));
    setDoctorName('');
  };

  const handleDeleteDoctor = (index) => {
    fetch(`http://localhost:3001/doctors/${index}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedDoctors = doctors.filter((_, i) => i !== index);
        setDoctors(updatedDoctors);
      })
      .catch(error => console.error('Error deleting doctor:', error));
  };

  const handleModifyDoctor = (index) => {
    // Define o nome a ser modificado e o índice do médico
    setModifiedName(doctors[index].name);
    setModifyIndex(index);
  };

  const handleSaveModifiedName = () => {
    if (modifyIndex !== null) {
      const updatedDoctor = { name: modifiedName };
      fetch(`http://localhost:3001/doctors/${modifyIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDoctor)
      })
        .then(response => response.json())
        .then(data => {
          const updatedDoctors = [...doctors];
          updatedDoctors[modifyIndex] = data;
          setDoctors(updatedDoctors);
          setModifiedName('');
          setModifyIndex(null);
        })
        .catch(error => console.error('Error modifying doctor:', error));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Gerenciar Médicos</h2>
        <input
          type="text"
          placeholder="Nome do Médico"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <button onClick={handleAddDoctor}>Adicionar Médico</button>
        <ul style={{ listStyle: 'none', paddingLeft: '0', paddingInlineStart: '0' }}>
          {doctors.map((doctor, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {modifyIndex === index ? (
                <input
                  type="text"
                  value={modifiedName}
                  onChange={(e) => setModifiedName(e.target.value)}
                />
              ) : (
                doctor.name
              )}
              {modifyIndex === index ? (
                <button style={{ marginLeft: '0.5rem', backgroundColor: 'green', color: 'white' }} onClick={handleSaveModifiedName}>Salvar</button>
              ) : (
                <>
                  <button style={{ marginLeft: '0.5rem', backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteDoctor(index)}>Excluir</button>
                  <button style={{ marginLeft: '0.5rem', backgroundColor: 'green', color: 'white' }} onClick={() => handleModifyDoctor(index)}>Modificar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageDoctors;
