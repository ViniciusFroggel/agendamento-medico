import { useAppointment } from '@/contexts/AppointmentContext';
import BookingSteps from '@/components/booking/BookingSteps';
import SpecialtySelector from '@/components/booking/SpecialtySelector';
import DoctorSelector from '@/components/booking/DoctorSelector';
import DateTimeSelector from '@/components/booking/DateTimeSelector';
import PatientForm from '@/components/booking/PatientForm';
import BookingSuccess from '@/components/booking/BookingSuccess';

const Booking = () => {
  const { bookingState } = useAppointment();

  const renderStep = () => {
    switch (bookingState.step) {
      case 1:
        return <SpecialtySelector />;
      case 2:
        return <DoctorSelector />;
      case 3:
        return <DateTimeSelector />;
      case 4:
        return <PatientForm />;
      case 5:
        return <BookingSuccess />;
      default:
        return <SpecialtySelector />;
    }
  };

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <BookingSteps />
        {renderStep()}
      </div>
    </div>
  );
};

export default Booking;
