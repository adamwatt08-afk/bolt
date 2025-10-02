import React from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface ChartData {
  name: string;
  value: number;
}

interface ChartCardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  data?: ChartData[];
  chartType?: 'bar' | 'pie' | 'line';
}

const ChartCard: React.FC<ChartCardProps> = ({
  title = 'Storage Optimization Trend',
  description = 'Monthly storage usage patterns',
  icon: Icon,
  data = [
    { name: 'Jan', value: 52 },
    { name: 'Feb', value: 49 },
    { name: 'Mar', value: 47 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 43 },
    { name: 'Jun', value: 41 }
  ],
  chartType = 'bar'
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  const colors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-rose-500',
  ];

  return (
    <div className="bg-cegal-dark rounded-xl border border-cegal-gray-700 overflow-hidden">
      <div className="p-6 border-b border-cegal-gray-700">
        <div className="flex items-center gap-3 mb-1">
          {Icon && <Icon className="w-5 h-5 text-cegal-primary" />}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-sm text-cegal-gray-400">{description}</p>
      </div>

      <div className="p-6">
        {chartType === 'line' ? (
          <div className="relative h-80">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#00d4aa', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00a8cc', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00d4aa', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#00d4aa', stopOpacity: 0 }} />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
              ))}

              {/* Area under the line */}
              <path
                d={`M 0 ${100 - ((data[0].value - Math.min(...data.map(d => d.value))) / (maxValue - Math.min(...data.map(d => d.value)))) * 100} ${data
                  .map((item, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - ((item.value - Math.min(...data.map(d => d.value))) / (maxValue - Math.min(...data.map(d => d.value)))) * 100;
                    return `L ${x} ${y}`;
                  })
                  .join(' ')} L 100 100 L 0 100 Z`}
                fill="url(#areaGradient)"
              />

              {/* Line */}
              <path
                d={data
                  .map((item, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - ((item.value - Math.min(...data.map(d => d.value))) / (maxValue - Math.min(...data.map(d => d.value)))) * 100;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((item.value - Math.min(...data.map(d => d.value))) / (maxValue - Math.min(...data.map(d => d.value)))) * 100;
                return (
                  <g key={item.name}>
                    <circle cx={x} cy={y} r="1" fill="#00d4aa" />
                    <circle cx={x} cy={y} r="0.5" fill="white" />
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-4 text-xs text-cegal-gray-400">
              {data.map((item, index) => (
                <span key={item.name} className={index % 2 === 0 ? '' : 'opacity-0'}>
                  {item.name}
                </span>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-cegal-gray-400 -ml-12">
              <span>{maxValue.toFixed(1)} TB</span>
              <span>{((maxValue + Math.min(...data.map(d => d.value))) / 2).toFixed(1)} TB</span>
              <span>{Math.min(...data.map(d => d.value)).toFixed(1)} TB</span>
            </div>
          </div>
        ) : chartType === 'bar' ? (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cegal-gray-300">{item.name}</span>
                  <span className="text-sm font-semibold text-white">{item.value} TB</span>
                </div>
                <div className="w-full bg-cegal-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-cegal h-3 rounded-full transition-all duration-500 hover:opacity-80"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <div className="flex-1 space-y-3">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full`} />
                    <span className="text-sm text-cegal-gray-300">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{item.value} TB</div>
                    <div className="text-xs text-cegal-gray-400">
                      {((item.value / totalValue) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {data.map((item, index) => {
                  const startAngle = data
                    .slice(0, index)
                    .reduce((sum, d) => sum + (d.value / totalValue) * 360, 0);
                  const angle = (item.value / totalValue) * 360;
                  const largeArcFlag = angle > 180 ? 1 : 0;

                  const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const endX = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                  const endY = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);

                  return (
                    <path
                      key={item.name}
                      d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      className={colors[index % colors.length].replace('bg-', 'fill-')}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;