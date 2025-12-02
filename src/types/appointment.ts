export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  crm: string;
  avatar: string;
  rating: number;
  experience: string;
  consultationFee: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  specialtyId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingState {
  step: number;
  specialty: Specialty | null;
  doctor: Doctor | null;
  date: Date | null;
  time: string | null;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}
