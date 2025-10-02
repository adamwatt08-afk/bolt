import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  HardDrive, 
  Zap, 
  DollarSign,
  Leaf,
  Clock,
  Users,
  FileText,
  Activity,
  BarChart3,
  PieChart,
  Target,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface DataInsight {
  id: string;
  title: string;
  category: 'performance' | 'cost' | 'quality' | 'usage' | 'optimization';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
  potentialSavings?: number;
  affectedAssets: number;
  lastUpdated: string;
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved';
}

const DataInsights: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const insights: DataInsight[] = [
    {
      id: '1',
      title: 'Duplicate Seismic Data Detected',
      category: 'optimization',
      severity: 'high',
      description: 'Found 347 GB of duplicate seismic surveys across multiple projects',
      impact: 'High storage costs and reduced system performance',
      recommendation: 'Implement automated deduplication process',
      potentialSavings: 50400,
      affectedAssets: 23,
      lastUpdated: '2024-12-21',
      status: 'new'
    },
    {
      id: '2',
      title: 'Underutilized Well Log Data',
      category: 'usage',
      severity: 'medium',
      description: '156 well logs have not been accessed in 18+ months',
      impact: 'Unnecessary storage costs for inactive data',
      recommendation: 'Archive old well logs to cold storage',
      potentialSavings: 33600,
      affectedAssets: 156,
      lastUpdated: '2024-12-20',
      status: 'acknowledged'
    },
    {
      id: '3',
      title: 'Data Quality Issues in Project Alpha',
      category: 'quality',
      severity: 'critical',
      description: 'Missing metadata and inconsistent naming conventions detected',
      impact: 'Reduced data reliability and search efficiency',
      recommendation: 'Standardize metadata schema and implement validation',
      affectedAssets: 45,
      lastUpdated: '2024-12-19',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Excessive License Usage',
      category: 'cost',
      severity: 'high',
      description: '35 software licenses are consistently underutilized',
      impact: 'Annual overspend on software licensing',
      recommendation: 'Optimize license allocation and implement usage monitoring',
      potentialSavings: 102000,
      affectedAssets: 35,
      lastUpdated: '2024-12-18',
      status: 'new'
    },
    {
      id: '5',
      title: 'Server Performance Degradation',
      category: 'performance',
      severity: 'medium',
      description: 'Processing servers showing 15% performance decline',
      impact: 'Slower data processing and analysis workflows',
      recommendation: 'Schedule maintenance and consider hardware upgrades',
      affectedAssets: 4,
      lastUpdated: '2024-12-17',
      status: 'acknowledged'
    },
    {
      id: '6',
      title: 'Optimal Data Tiering Opportunity',
      category: 'optimization',
      severity: 'low',
      description: '8.5 TB of data suitable for cheaper storage tiers',
      impact: 'Potential cost savings through intelligent data placement',
      recommendation: 'Implement automated data tiering based on access patterns',
      potentialSavings: 38400,
      affectedAssets: 127,
      lastUpdated: '2024-12-16',
      status: 'resolved'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return Zap;
      case 'cost': return DollarSign;
      case 'quality': return CheckCircle;
      case 'usage': return Activity;
      case 'optimization': return Target;
      default: return Lightbulb;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cost': return 'text-green-600 bg-green-50 border-green-200';
      case 'quality': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'usage': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'optimization': return 'text-teal-600 bg-teal-50 border-teal-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-300';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'in-progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || insight.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalPotentialSavings = insights
    .filter(insight => insight.potentialSavings)
    .reduce((sum, insight) => sum + (insight.potentialSavings || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Data Insights</h2>
          <p className="text-white mt-1">AI-powered recommendations for data optimization</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-cegal-secondary">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </button>
          <button className="btn-cegal-primary">
            <Lightbulb className="h-4 w-4 mr-2" />
            Run Analysis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Total Insights</p>
              <p className="text-2xl font-bold text-cegal-green">{insights.length}</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-cegal-green">
                {insights.filter(i => i.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Potential Savings</p>
              <p className="text-2xl font-bold text-cegal-green">{formatCurrency(totalPotentialSavings)}</p>
              <p className="text-xs text-cegal-gray-500">Annual</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Target className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Affected Assets</p>
              <p className="text-2xl font-bold text-cegal-green">
                {insights.reduce((sum, i) => sum + i.affectedAssets, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">Filters:</span>
          </div>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm bg-cegal-dark text-white"
          >
            <option value="all">All Categories</option>
            <option value="performance">Performance</option>
            <option value="cost">Cost</option>
            <option value="quality">Quality</option>
            <option value="usage">Usage</option>
            <option value="optimization">Optimization</option>
          </select>
          
          <select 
            value={selectedSeverity} 
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm bg-cegal-dark text-white"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="text-sm text-white">
            Showing {filteredInsights.length} of {insights.length} insights
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => {
          const CategoryIcon = getCategoryIcon(insight.category);
          
          return (
            <div key={insight.id} className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-cegal-primary/10 rounded-lg">
                    <CategoryIcon className="h-5 w-5 text-cegal-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cegal-green mb-2">{insight.title}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(insight.category)}`}>
                        {insight.category}
                      </div>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(insight.severity)}`}>
                        {insight.severity}
                      </div>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(insight.status)}`}>
                        {insight.status.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Description</p>
                  <p className="text-sm text-cegal-gray-300">{insight.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white mb-1">Impact</p>
                  <p className="text-sm text-cegal-gray-300">{insight.impact}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white mb-1">Recommendation</p>
                  <p className="text-sm text-cegal-gray-300">{insight.recommendation}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-cegal-gray-600">
                  <div>
                    <p className="text-xs text-cegal-gray-400">Affected Assets</p>
                    <p className="text-lg font-bold text-white">{insight.affectedAssets}</p>
                  </div>
                  {insight.potentialSavings && (
                    <div>
                      <p className="text-xs text-cegal-gray-400">Potential Savings</p>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(insight.potentialSavings)}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-3">
                  <button className="flex-1 btn-cegal-primary text-sm py-2 flex items-center justify-center space-x-2">
                    <span>Take Action</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <button className="flex-1 btn-cegal-secondary text-sm py-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredInsights.length === 0 && (
        <div className="card-cegal p-12 text-center bg-cegal-darker border-cegal-gray-700">
          <Lightbulb className="h-12 w-12 text-cegal-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Insights Found</h3>
          <p className="text-cegal-gray-400">No insights match your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DataInsights;