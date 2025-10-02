import React, { useState } from 'react';
import { 
  DollarSign, 
  Leaf, 
  Server, 
  Users, 
  Database, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  HardDrive,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Info,
  Calculator,
  BarChart3,
  PieChart
} from 'lucide-react';

interface OptimizationAction {
  id: string;
  title: string;
  category: 'data' | 'infrastructure' | 'licensing';
  description: string;
  costSavings: {
    monthly: number;
    annual: number;
  };
  carbonReduction: {
    monthly: number; // kg CO2
    annual: number; // kg CO2
  };
  performanceImpact: {
    level: 'none' | 'low' | 'medium' | 'high';
    description: string;
    mitigations: string[];
  };
  risks: string[];
  benefits: string[];
  implementationTime: string;
  effort: 'low' | 'medium' | 'high';
  dataSize?: string;
  affectedSystems?: string[];
  userImpact?: string;
}

const ImpactAnalysis: React.FC = () => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const optimizationActions: OptimizationAction[] = [
    {
      id: '1',
      title: 'Delete Duplicate Seismic Data',
      category: 'data',
      description: 'Remove 347 GB of duplicate seismic surveys across 23 datasets',
      costSavings: {
        monthly: 4200,
        annual: 50400
      },
      carbonReduction: {
        monthly: 180,
        annual: 2160
      },
      performanceImpact: {
        level: 'low',
        description: 'Minimal impact on system performance, improved search speeds',
        mitigations: ['Verify data integrity before deletion', 'Maintain backup copies for 90 days']
      },
      risks: ['Accidental deletion of unique data variants', 'Loss of historical processing versions'],
      benefits: ['Faster data searches', 'Reduced storage costs', 'Improved data organization'],
      implementationTime: '2-3 weeks',
      effort: 'medium',
      dataSize: '347 GB',
      affectedSystems: ['Seismic Archive', 'Processing Workflows'],
      userImpact: 'Minimal - users will see cleaner data catalogs'
    },
    {
      id: '2',
      title: 'Archive Obsolete Well Logs',
      category: 'data',
      description: 'Move 156 legacy well logs (18+ months unused) to cold storage',
      costSavings: {
        monthly: 2800,
        annual: 33600
      },
      carbonReduction: {
        monthly: 95,
        annual: 1140
      },
      performanceImpact: {
        level: 'medium',
        description: 'Archived data will have 2-5 minute retrieval time vs instant access',
        mitigations: ['Implement predictive pre-loading', 'Maintain index for quick searches']
      },
      risks: ['Slower access to archived data', 'Potential retrieval delays during peak usage'],
      benefits: ['Significant storage cost reduction', 'Improved active system performance'],
      implementationTime: '1-2 weeks',
      effort: 'low',
      dataSize: '2.3 TB',
      affectedSystems: ['Well Data Management', 'Reporting Systems'],
      userImpact: 'Low - occasional delays when accessing old data'
    },
    {
      id: '3',
      title: 'Optimize License Allocation',
      category: 'licensing',
      description: 'Reduce unused licenses: 12 Petrel seats, 8 Kingdom seats, 15 Office365 seats',
      costSavings: {
        monthly: 8500,
        annual: 102000
      },
      carbonReduction: {
        monthly: 45,
        annual: 540
      },
      performanceImpact: {
        level: 'high',
        description: 'Potential user access issues during peak demand periods',
        mitigations: ['Implement license sharing pools', 'Monitor usage patterns', 'Maintain emergency licenses']
      },
      risks: ['User productivity loss during peak periods', 'Project delays if licenses unavailable'],
      benefits: ['Substantial cost savings', 'Better license utilization tracking'],
      implementationTime: '3-4 weeks',
      effort: 'high',
      affectedSystems: ['License Management', 'User Authentication'],
      userImpact: 'High - users may need to wait for available licenses'
    },
    {
      id: '4',
      title: 'Decommission Legacy Servers',
      category: 'infrastructure',
      description: 'Shutdown 4 underutilized servers (avg 15% CPU usage)',
      costSavings: {
        monthly: 12000,
        annual: 144000
      },
      carbonReduction: {
        monthly: 850,
        annual: 10200
      },
      performanceImpact: {
        level: 'medium',
        description: 'Reduced redundancy and failover capacity',
        mitigations: ['Migrate workloads to cloud', 'Implement auto-scaling', 'Maintain backup systems']
      },
      risks: ['Reduced system redundancy', 'Potential performance bottlenecks during peak loads'],
      benefits: ['Major cost and energy savings', 'Simplified infrastructure management'],
      implementationTime: '4-6 weeks',
      effort: 'high',
      affectedSystems: ['Compute Infrastructure', 'Backup Systems'],
      userImpact: 'Medium - possible slower response times during peak usage'
    },
    {
      id: '5',
      title: 'Implement Data Tiering',
      category: 'data',
      description: 'Move 8.5 TB of infrequently accessed data to cheaper storage tiers',
      costSavings: {
        monthly: 3200,
        annual: 38400
      },
      carbonReduction: {
        monthly: 120,
        annual: 1440
      },
      performanceImpact: {
        level: 'low',
        description: 'Slightly slower access times for tiered data (30-60 seconds)',
        mitigations: ['Intelligent caching', 'Predictive data movement', 'User notifications']
      },
      risks: ['Increased data retrieval times', 'Complexity in data management'],
      benefits: ['Cost-effective storage', 'Improved hot data performance'],
      implementationTime: '2-3 weeks',
      effort: 'medium',
      dataSize: '8.5 TB',
      affectedSystems: ['Storage Management', 'Data Access Layer'],
      userImpact: 'Low - minor delays for infrequently accessed data'
    },
    {
      id: '6',
      title: 'Consolidate Development Environments',
      category: 'infrastructure',
      description: 'Merge 6 development environments into 2 shared environments',
      costSavings: {
        monthly: 5500,
        annual: 66000
      },
      carbonReduction: {
        monthly: 280,
        annual: 3360
      },
      performanceImpact: {
        level: 'high',
        description: 'Resource contention during development peaks, potential conflicts',
        mitigations: ['Implement resource quotas', 'Scheduled environment access', 'Container isolation']
      },
      risks: ['Development conflicts', 'Reduced development velocity', 'Testing interference'],
      benefits: ['Significant infrastructure savings', 'Standardized development practices'],
      implementationTime: '6-8 weeks',
      effort: 'high',
      affectedSystems: ['Development Infrastructure', 'CI/CD Pipelines'],
      userImpact: 'High - developers may experience resource constraints'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data': return Database;
      case 'infrastructure': return Server;
      case 'licensing': return Users;
      default: return Calculator;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'data': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'infrastructure': return 'text-green-600 bg-green-50 border-green-200';
      case 'licensing': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPerformanceImpactColor = (level: string) => {
    switch (level) {
      case 'none': return 'text-green-600 bg-green-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSelectAction = (id: string) => {
    setSelectedActions(prev => 
      prev.includes(id) 
        ? prev.filter(actionId => actionId !== id)
        : [...prev, id]
    );
  };

  const getSelectedTotals = () => {
    const selected = optimizationActions.filter(action => selectedActions.includes(action.id));
    return {
      monthlySavings: selected.reduce((sum, action) => sum + action.costSavings.monthly, 0),
      annualSavings: selected.reduce((sum, action) => sum + action.costSavings.annual, 0),
      monthlyCarbon: selected.reduce((sum, action) => sum + action.carbonReduction.monthly, 0),
      annualCarbon: selected.reduce((sum, action) => sum + action.carbonReduction.annual, 0),
      count: selected.length
    };
  };

  const totals = getSelectedTotals();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCarbon = (kg: number) => {
    if (kg >= 1000) {
      return `${(kg / 1000).toFixed(1)} tons`;
    }
    return `${kg} kg`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Impact Analysis</h2>
          <p className="text-white mt-1">Analyze cost savings, carbon impact, and performance trade-offs</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="btn-cegal-secondary"
          >
            {viewMode === 'grid' ? <BarChart3 className="h-4 w-4 mr-2" /> : <PieChart className="h-4 w-4 mr-2" />}
            {viewMode === 'grid' ? 'Table View' : 'Grid View'}
          </button>
          <button className="btn-cegal-primary">
            <Calculator className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Total Potential Savings</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(optimizationActions.reduce((sum, a) => sum + a.costSavings.annual, 0))}</p>
              <p className="text-xs text-cegal-gray-500">Annual</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Carbon Reduction</p>
              <p className="text-2xl font-bold text-white">{formatCarbon(optimizationActions.reduce((sum, a) => sum + a.carbonReduction.annual, 0))}</p>
              <p className="text-xs text-cegal-gray-500">Annual CO2</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Selected Actions</p>
              <p className="text-2xl font-bold text-white">{totals.count}</p>
              <p className="text-xs text-cegal-gray-500">of {optimizationActions.length}</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">ROI Potential</p>
              <p className="text-2xl font-bold text-white">340%</p>
              <p className="text-xs text-cegal-gray-500">First year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Actions Summary */}
      {selectedActions.length > 0 && (
        <div className="card-cegal p-6 bg-gradient-to-r from-cegal-primary/5 to-cegal-accent/5 border-l-4 border-cegal-primary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Selected Actions Impact</h3>
            <button
              onClick={() => setSelectedActions([])}
              className="text-sm text-white hover:text-cegal-primary"
            >
              Clear Selection
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-cegal-green">{formatCurrency(totals.annualSavings)}</p>
              <p className="text-sm text-white">Annual Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cegal-green">{formatCurrency(totals.monthlySavings)}</p>
              <p className="text-sm text-white">Monthly Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cegal-green">{formatCarbon(totals.annualCarbon)}</p>
              <p className="text-sm text-white">CO2 Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totals.count}</p>
              <p className="text-sm text-white">Actions Selected</p>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Actions */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {optimizationActions.map((action) => {
            const CategoryIcon = getCategoryIcon(action.category);
            const isSelected = selectedActions.includes(action.id);
            
            return (
              <div 
                key={action.id} 
                className={`card-cegal p-6 cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-cegal-primary bg-cegal-primary/5' : 'hover:shadow-cegal-lg'
                }`}
                onClick={() => handleSelectAction(action.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectAction(action.id)}
                      className="mt-1 rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CategoryIcon className="h-5 w-5 text-cegal-primary" />
                        <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(action.category)}`}>
                          {action.category}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                      <p className="text-sm text-cegal-gray-600 mb-4">{action.description}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Impact */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Cost Savings</span>
                    </div>
                    <p className="text-lg font-bold text-green-700">{formatCurrency(action.costSavings.annual)}</p>
                    <p className="text-xs text-green-600">Annual</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Carbon Reduction</span>
                    </div>
                    <p className="text-lg font-bold text-green-700">{formatCarbon(action.carbonReduction.annual)}</p>
                    <p className="text-xs text-green-600">Annual CO2</p>
                  </div>
                </div>

                {/* Performance Impact */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-lg font-semibold text-white">Performance Impact</span>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceImpactColor(action.performanceImpact.level)}`}>
                      {action.performanceImpact.level}
                    </div>
                  </div>
                  <p className="text-sm text-cegal-gray-600 mb-2">{action.performanceImpact.description}</p>
                </div>

                {/* Implementation Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-lg font-semibold text-white">Timeline: </span>
                    <span className="text-cegal-gray-600">{action.implementationTime}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-800">Effort: </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEffortColor(action.effort)}`}>
                      {action.effort}
                    </span>
                  </div>
                </div>

                {/* Risks and Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Risks</span>
                    </div>
                    <ul className="text-xs text-red-600 space-y-1">
                      {action.risks.slice(0, 2).map((risk, index) => (
                        <li key={index}>• {risk}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Benefits</span>
                    </div>
                    <ul className="text-xs text-green-600 space-y-1">
                      {action.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="card-cegal">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cegal-gray-50 border-b border-cegal-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedActions.length === optimizationActions.length}
                      onChange={() => setSelectedActions(
                        selectedActions.length === optimizationActions.length 
                          ? [] 
                          : optimizationActions.map(a => a.id)
                      )}
                      className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Annual Savings</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Carbon Impact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Performance Impact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Effort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cegal-gray-200">
                {optimizationActions.map((action) => {
                  const CategoryIcon = getCategoryIcon(action.category);
                  const isSelected = selectedActions.includes(action.id);
                  
                  return (
                    <tr 
                      key={action.id} 
                      className={`hover:bg-cegal-gray-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-cegal-primary/5' : ''
                      }`}
                      onClick={() => handleSelectAction(action.id)}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectAction(action.id)}
                          className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-cegal-dark">{action.title}</p>
                          <p className="text-xs text-cegal-gray-500">{action.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-2 px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(action.category)}`}>
                          <CategoryIcon className="h-3 w-3" />
                          <span className="capitalize">{action.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-green-700">{formatCurrency(action.costSavings.annual)}</p>
                          <p className="text-xs text-cegal-gray-500">{formatCurrency(action.costSavings.monthly)}/month</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-green-700">{formatCarbon(action.carbonReduction.annual)}</p>
                          <p className="text-xs text-cegal-gray-500">CO2 reduction</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPerformanceImpactColor(action.performanceImpact.level)}`}>
                          {action.performanceImpact.level}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getEffortColor(action.effort)}`}>
                          {action.effort}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactAnalysis;