import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, BookingState, Specialty, Doctor } from '@/types/appointment';
import { getStoredAppointments, saveAppointment } from '@/data/mockData';

interface AppointmentContextType {
  appointments: Appointment[];
  bookingState: BookingState;
  setBookingStep: (step: number) => void;
  selectSpecialty: (specialty: Specialty) => void;
  selectDoctor: (doctor: Doctor) => void;
  selectDate: (date: Date) => void;
  selectTime: (time: string) => void;
  setPatientInfo: (name: string, email: string, phone: string) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  cancelAppointment: (id: string) => void;
  refreshAppointments: () => void;
}

const initialBookingState: BookingState = {
  step: 1,
  specialty: null,
  doctor: null,
  date: null,
  time: null,
  patientName: '',
  patientEmail: '',
  patientPhone: '',
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);

  useEffect(() => {
    refreshAppointments();
  }, []);

  const refreshAppointments = () => {
    setAppointments(getStoredAppointments());
  };

  const setBookingStep = (step: number) => {
    setBookingState(prev => ({ ...prev, step }));
  };

  const selectSpecialty = (specialty: Specialty) => {
    setBookingState(prev => ({ ...prev, specialty, step: 2, doctor: null }));
  };

  const selectDoctor = (doctor: Doctor) => {
    setBookingState(prev => ({ ...prev, doctor, step: 3 }));
  };

  const selectDate = (date: Date) => {
    setBookingState(prev => ({ ...prev, date, time: null }));
  };

  const selectTime = (time: string) => {
    setBookingState(prev => ({ ...prev, time, step: 4 }));
  };

  const setPatientInfo = (name: string, email: string, phone: string) => {
    setBookingState(prev => ({
      ...prev,
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
    }));
  };

  const confirmBooking = () => {
    if (!bookingState.doctor || !bookingState.specialty || !bookingState.date || !bookingState.time) {
      return;
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: bookingState.patientName,
      patientEmail: bookingState.patientEmail,
      patientPhone: bookingState.patientPhone,
      doctorId: bookingState.doctor.id,
      specialtyId: bookingState.specialty.id,
      date: bookingState.date.toISOString(),
      time: bookingState.time,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppointment);
    refreshAppointments();
    setBookingState(prev => ({ ...prev, step: 5 }));
  };

  const resetBooking = () => {
    setBookingState(initialBookingState);
  };

  const cancelAppointment = (id: string) => {
    const stored = getStoredAppointments();
    const updated = stored.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    refreshAppointments();
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        bookingState,
        setBookingStep,
        selectSpecialty,
        selectDoctor,
        selectDate,
        selectTime,
        setPatientInfo,
        confirmBooking,
        resetBooking,
        cancelAppointment,
        refreshAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
