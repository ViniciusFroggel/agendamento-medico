import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-6 shadow-card transition-all duration-300 hover:shadow-card-hover",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm mt-2",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% vs mês anterior</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
