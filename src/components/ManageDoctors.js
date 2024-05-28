import React, { useState, useEffect } from 'react';

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [modifiedName, setModifiedName] = useState('');
  const [modifyIndex, setModifyIndex] = useState(null);

  useEffect(() => {
    // Carrega os médicos salvos do localStorage ao carregar a página
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    }
  }, []);

  const handleAddDoctor = () => {
    const newDoctor = { name: doctorName };
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    // Salva os médicos atualizados no localStorage
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    setDoctorName('');
  };

  const handleDeleteDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
    // Salva os médicos atualizados no localStorage após a exclusão
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  const handleModifyDoctor = (index) => {
    // Define o nome a ser modificado e o índice do médico
    setModifiedName(doctors[index].name);
    setModifyIndex(index);
  };

  const handleSaveModifiedName = () => {
    if (modifyIndex !== null) {
      const updatedDoctors = [...doctors];
      updatedDoctors[modifyIndex].name = modifiedName;
      setDoctors(updatedDoctors);
      // Salva os médicos atualizados no localStorage após a modificação
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      setModifiedName('');
      setModifyIndex(null);
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
