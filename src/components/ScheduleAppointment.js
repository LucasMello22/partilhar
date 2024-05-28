import React, { useState, useEffect } from 'react';

function ScheduleAppointment() {
  const [appointment, setAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    doctor: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Carrega os pacientes salvos do localStorage ao carregar a página
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);

    // Carrega os médicos salvos do localStorage ou de outra fonte de dados
    const savedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(savedDoctors);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para marcar consulta
    console.log('Consulta marcada:', appointment);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2>Marcar Consulta</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome do Paciente:
            <select name="patientName" value={appointment.patientName} onChange={handleChange} style={{ width: '100%', height: '2rem' }}>
              <option value="">Selecione o Paciente</option>
              {patients.map((patient, index) => (
                <option key={index} value={patient.name}>{patient.name}</option>
              ))}
            </select>
          </label>
          <label>
            Data:
            <input type="date" name="date" value={appointment.date} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          <label>
            Hora:
            <input type="time" name="time" value={appointment.time} onChange={handleChange} style={{ width: '100%' }} />
          </label>
          <label>
            Médico:
            <select name="doctor" value={appointment.doctor} onChange={handleChange} style={{ width: '100%', height: '2rem' }}>
              <option value="">Selecione o Médico</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
          </label>
          <button type="submit" style={{ width: '100%' }}>Marcar Consulta</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
