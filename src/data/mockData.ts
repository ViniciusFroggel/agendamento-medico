import { Specialty, Doctor, TimeSlot, Appointment } from '@/types/appointment';

export const specialties: Specialty[] = [
  {
    id: '1',
    name: 'Cardiologia',
    icon: '❤️',
    description: 'Coração e sistema cardiovascular',
    color: 'hsl(0 70% 55%)',
  },
  {
    id: '2',
    name: 'Dermatologia',
    icon: '🧴',
    description: 'Pele, cabelos e unhas',
    color: 'hsl(30 80% 55%)',
  },
  {
    id: '3',
    name: 'Ortopedia',
    icon: '🦴',
    description: 'Ossos, músculos e articulações',
    color: 'hsl(200 70% 50%)',
  },
  {
    id: '4',
    name: 'Neurologia',
    icon: '🧠',
    description: 'Sistema nervoso e cérebro',
    color: 'hsl(280 60% 55%)',
  },
  {
    id: '5',
    name: 'Oftalmologia',
    icon: '👁️',
    description: 'Olhos e visão',
    color: 'hsl(186 72% 42%)',
  },
  {
    id: '6',
    name: 'Pediatria',
    icon: '👶',
    description: 'Saúde infantil',
    color: 'hsl(340 70% 55%)',
  },
  {
    id: '7',
    name: 'Ginecologia',
    icon: '🩺',
    description: 'Saúde da mulher',
    color: 'hsl(320 60% 55%)',
  },
  {
    id: '8',
    name: 'Clínico Geral',
    icon: '🏥',
    description: 'Atendimento geral',
    color: 'hsl(152 60% 45%)',
  },
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    specialtyId: '1',
    crm: 'CRM/SP 123456',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    experience: '15 anos',
    consultationFee: 250,
  },
  {
    id: '2',
    name: 'Dra. Ana Santos',
    specialtyId: '1',
    crm: 'CRM/SP 234567',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    experience: '12 anos',
    consultationFee: 220,
  },
  {
    id: '3',
    name: 'Dr. Pedro Oliveira',
    specialtyId: '2',
    crm: 'CRM/SP 345678',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    experience: '10 anos',
    consultationFee: 200,
  },
  {
    id: '4',
    name: 'Dra. Maria Costa',
    specialtyId: '2',
    crm: 'CRM/SP 456789',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    experience: '18 anos',
    consultationFee: 280,
  },
  {
    id: '5',
    name: 'Dr. João Mendes',
    specialtyId: '3',
    crm: 'CRM/SP 567890',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
    rating: 4.6,
    experience: '8 anos',
    consultationFee: 180,
  },
  {
    id: '6',
    name: 'Dra. Fernanda Lima',
    specialtyId: '3',
    crm: 'CRM/SP 678901',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    experience: '14 anos',
    consultationFee: 240,
  },
  {
    id: '7',
    name: 'Dr. Ricardo Souza',
    specialtyId: '4',
    crm: 'CRM/SP 789012',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    experience: '20 anos',
    consultationFee: 350,
  },
  {
    id: '8',
    name: 'Dra. Juliana Alves',
    specialtyId: '5',
    crm: 'CRM/SP 890123',
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    experience: '11 anos',
    consultationFee: 210,
  },
  {
    id: '9',
    name: 'Dr. Bruno Ferreira',
    specialtyId: '6',
    crm: 'CRM/SP 901234',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    experience: '9 anos',
    consultationFee: 190,
  },
  {
    id: '10',
    name: 'Dra. Camila Rocha',
    specialtyId: '7',
    crm: 'CRM/SP 012345',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    experience: '16 anos',
    consultationFee: 260,
  },
  {
    id: '11',
    name: 'Dr. Marcos Teixeira',
    specialtyId: '8',
    crm: 'CRM/SP 112233',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
    rating: 4.6,
    experience: '7 anos',
    consultationFee: 150,
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  
  times.forEach((time, index) => {
    slots.push({
      id: `slot-${index}`,
      time,
      available: Math.random() > 0.3,
    });
  });
  
  return slots;
};

export const getStoredAppointments = (): Appointment[] => {
  const stored = localStorage.getItem('appointments');
  return stored ? JSON.parse(stored) : [];
};

export const saveAppointment = (appointment: Appointment): void => {
  const appointments = getStoredAppointments();
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): void => {
  const appointments = getStoredAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
};
