const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Caminho para os arquivos JSON
const patientsFilePath = './patients.json';
const doctorsFilePath = './doctors.json';
const appointmentsFilePath = './appointments.json';

// Funções para ler e escrever arquivos JSON
const readData = (filePath) => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Endpoints para pacientes
app.get('/patients', (req, res) => {
  const patients = readData(patientsFilePath);
  res.json(patients);
});

app.post('/patients', (req, res) => {
  const newPatient = req.body;
  const patients = readData(patientsFilePath);
  patients.push(newPatient);
  writeData(patientsFilePath, patients);
  res.status(201).json(newPatient);
});

app.delete('/patients/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const patients = readData(patientsFilePath);
  if (index >= 0 && index < patients.length) {
    patients.splice(index, 1);
    writeData(patientsFilePath, patients);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Paciente não encontrado' });
  }
});

app.put('/patients/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedPatient = req.body;
  const patients = readData(patientsFilePath);
  if (index >= 0 && index < patients.length) {
    patients[index] = updatedPatient;
    writeData(patientsFilePath, patients);
    res.status(200).json(updatedPatient);
  } else {
    res.status(404).json({ error: 'Paciente não encontrado' });
  }
});

// Endpoints para médicos
app.get('/doctors', (req, res) => {
  const doctors = readData(doctorsFilePath);
  res.json(doctors);
});

app.post('/doctors', (req, res) => {
  const newDoctor = req.body;
  const doctors = readData(doctorsFilePath);
  doctors.push(newDoctor);
  writeData(doctorsFilePath, doctors);
  res.status(201).json(newDoctor);
});

app.delete('/doctors/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const doctors = readData(doctorsFilePath);
  if (index >= 0 && index < doctors.length) {
    doctors.splice(index, 1);
    writeData(doctorsFilePath, doctors);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Médico não encontrado' });
  }
});

app.put('/doctors/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedDoctor = req.body;
  const doctors = readData(doctorsFilePath);
  if (index >= 0 && index < doctors.length) {
    doctors[index] = updatedDoctor;
    writeData(doctorsFilePath, doctors);
    res.status(200).json(updatedDoctor);
  } else {
    res.status(404).json({ error: 'Médico não encontrado' });
  }
});

// Endpoint para consultas
app.get('/appointments', (req, res) => {
  const appointments = readData(appointmentsFilePath);
  res.json(appointments);
});

app.post('/appointments', (req, res) => {
  const newAppointment = req.body;
  const appointments = readData(appointmentsFilePath);

  // Verifica se já existe uma consulta marcada para a mesma data e hora
  const conflict = appointments.some(appointment => {
    return (
      appointment.date === newAppointment.date &&
      appointment.time === newAppointment.time
    );
  });

  if (conflict) {
    return res.status(400).json({ error: 'Já existe uma consulta marcada para este horário.' });
  }

  // Se não houver conflito, adiciona a nova consulta
  appointments.push(newAppointment);
  writeData(appointmentsFilePath, appointments);
  res.status(201).json(newAppointment);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
