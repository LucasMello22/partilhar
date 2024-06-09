import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleAppointment() {
  const [appointment, setAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    doctor: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Carrega os pacientes salvos do servidor ao carregar a página
    axios.get('http://localhost:3001/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Erro ao carregar pacientes:', error));

    // Carrega os médicos salvos do servidor ao carregar a página
    axios.get('http://localhost:3001/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Erro ao carregar médicos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar se todos os campos estão preenchidos
    if (!appointment.patientName || !appointment.date || !appointment.time || !appointment.doctor) {
      setModalMessage('Por favor, preencha todos os campos.');
      setShowModal(true);
      return;
    }

    // Verificar se já existe uma consulta marcada na mesma data e hora
    const existingAppointment = patients.find(patient => {
      return patient.date === appointment.date && patient.time === appointment.time;
    });

    if (existingAppointment) {
      setModalMessage('Já existe uma consulta marcada para esta data e hora.');
      setShowModal(true);
      return;
    }

    // Enviar dados da consulta para o servidor
    axios.post('http://localhost:3001/appointments', appointment)
      .then(response => {
        console.log('Consulta marcada:', response.data);
        // Limpar os campos do formulário após a submissão bem-sucedida
        setAppointment({
          patientName: '',
          date: '',
          time: '',
          doctor: ''
        });
        // Exibir modal com mensagem de sucesso
        setModalMessage('Consulta marcada com sucesso!');
        setShowModal(true);
      })
      .catch(error => {
        console.error('Erro ao marcar consulta:', error);
        // Exibir modal com mensagem de erro
        setModalMessage('Erro ao marcar consulta. Já existe uma consulta nesse horario.');
        setShowModal(true);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2 style={ {width:'100%' }}>Marcar Consulta</h2>
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
            <input type="date" name="date" value={appointment.date} onChange={handleChange} style={{ width: '90%' }} />
          </label>
          <label>
            Hora:
            <input type="time" name="time" value={appointment.time} onChange={handleChange} style={{ width: '90%' }} />
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
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
              <p>{modalMessage}</p>
              <button onClick={handleModalClose}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleAppointment;
