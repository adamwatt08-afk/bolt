import React from 'react';
import { Video as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose';
  trend?: 'up' | 'down';
  change?: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  change,
  description,
}) => {
  const colorClasses = {
    blue: 'bg-blue-600/20 text-blue-400',
    purple: 'bg-purple-600/20 text-purple-400',
    amber: 'bg-amber-600/20 text-amber-400',
    emerald: 'bg-emerald-600/20 text-emerald-400',
    rose: 'bg-rose-600/20 text-rose-400',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const trendColor = trend === 'up' ? 'text-emerald-400' : 'text-rose-400';

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colorClasses[color]} rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        {TrendIcon && change && (
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-100">{value}</p>
      {description && <p className="text-sm text-slate-400 mt-2">{description}</p>}
    </div>
  );
};

export default MetricCard;