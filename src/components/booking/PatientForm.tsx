import { useState } from 'react';
import { useAppointment } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Phone, Calendar, Clock, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const PatientForm = () => {
  const { bookingState, setBookingStep, setPatientInfo, confirmBooking } = useAppointment();
  const [name, setName] = useState(bookingState.patientName);
  const [email, setEmail] = useState(bookingState.patientEmail);
  const [phone, setPhone] = useState(bookingState.patientPhone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setPatientInfo(name, email, phone);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    confirmBooking();
    setIsSubmitting(false);
  };

  return (
    <div className="animate-slide-up max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => setBookingStep(3)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Horários
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Confirme seus Dados
        </h2>
        <p className="text-muted-foreground">
          Revise os detalhes e complete o agendamento
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Appointment Summary */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Resumo da Consulta</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Especialidade</p>
                <p className="font-medium text-foreground">{bookingState.specialty?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={bookingState.doctor?.avatar}
                alt={bookingState.doctor?.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground">Médico</p>
                <p className="font-medium text-foreground">{bookingState.doctor?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Calendar className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium text-foreground">
                  {bookingState.date && format(bookingState.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="font-medium text-foreground">{bookingState.time}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Valor da consulta</span>
                <span className="text-xl font-bold text-primary">
                  R$ {bookingState.doctor?.consultationFee.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Seus Dados</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar Agendamento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
