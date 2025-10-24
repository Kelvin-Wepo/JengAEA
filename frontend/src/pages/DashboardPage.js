import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  TrendingUp, 
  Users, 
  Building2,
  Calculator,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatCurrency, formatNumber } from '../utils/helpers';

const DashboardPage = () => {
  const { user } = useAuth();
  const { usage, getQuotaStatus } = useSubscription();

  const quotaStatus = getQuotaStatus();

  // Mock data - in real app, this would come from API
  const stats = {
    totalEstimates: 15,
    totalValue: 2500000,
    recentEstimates: 3,
    averageCost: 166667,
  };

  const recentEstimates = [
    {
      id: 1,
      name: '3-Bedroom House',
      location: 'Nairobi, Kenya',
      cost: 2500000,
      status: 'approved',
      created_at: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      name: 'Commercial Building',
      location: 'Kampala, Uganda',
      cost: 15000000,
      status: 'draft',
      created_at: '2024-01-14T14:20:00Z',
    },
    {
      id: 3,
      name: 'Perimeter Wall',
      location: 'Dar es Salaam, Tanzania',
      cost: 450000,
      status: 'pending',
      created_at: '2024-01-13T09:15:00Z',
    },
  ];

  const quickActions = [
    {
      title: 'New Estimate',
      description: 'Create a new construction cost estimate',
      icon: Calculator,
      href: '/estimate/new',
      color: 'bg-primary-600',
    },
    {
      title: 'Browse Projects',
      description: 'Explore predefined project templates',
      icon: Building2,
      href: '/projects',
      color: 'bg-green-600',
    },
    {
      title: 'View Reports',
      description: 'Access your generated reports',
      icon: FileText,
      href: '/reports',
      color: 'bg-blue-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.first_name || 'User'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's an overview of your construction cost estimation activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <Card.Body className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(stats.totalEstimates)}
            </div>
            <div className="text-sm text-gray-600">Total Estimates</div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(stats.totalValue)}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(stats.recentEstimates)}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(stats.averageCost)}
            </div>
            <div className="text-sm text-gray-600">Average Cost</div>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-600">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                  </Link>
                );
              })}
            </Card.Body>
          </Card>

          {/* Usage Quota */}
          {usage && (
            <Card className="mt-6">
              <Card.Header>
                <h2 className="text-lg font-semibold text-gray-900">Usage Quota</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Estimates Used</span>
                      <span className="font-medium">
                        {usage.estimates_used} / {usage.estimates_limit || '∞'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          quotaStatus.percentage > 80 ? 'bg-red-500' : 
                          quotaStatus.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(quotaStatus.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {quotaStatus.isUnlimited ? (
                      <span className="text-green-600 font-medium">Unlimited estimates</span>
                    ) : (
                      <span>
                        {usage.estimates_remaining} estimates remaining
                      </span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Recent Estimates */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Estimates</h2>
                <Link
                  to="/estimates"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                {recentEstimates.map((estimate) => (
                  <div
                    key={estimate.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{estimate.name}</h3>
                      <p className="text-sm text-gray-600">{estimate.location}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(estimate.created_at).toLocaleDateString()}
                        </span>
                        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          estimate.status === 'approved' ? 'bg-green-100 text-green-800' :
                          estimate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {estimate.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(estimate.cost)}
                      </div>
                      <Link
                        to={`/estimate/${estimate.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center mt-1"
                      >
                        View <Eye className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;



