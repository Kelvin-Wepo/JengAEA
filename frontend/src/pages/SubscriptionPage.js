import React from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/helpers';

const SubscriptionPage = () => {
  const { currentSubscription, usage } = { currentSubscription: null, usage: null }; // Mock data

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      duration: 'Forever',
      description: 'Perfect for trying out our platform',
      features: [
        '5 estimates per month',
        'Basic project types',
        'PDF reports',
        'Email support',
      ],
      limitations: ['Limited project types', 'No priority support'],
      popular: false,
      icon: Zap,
    },
    {
      id: '6months',
      name: 'Professional',
      price: 49,
      duration: '6 months',
      description: 'Ideal for contractors and small teams',
      features: [
        'Unlimited estimates',
        'All project types',
        'PDF & Excel reports',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
      ],
      limitations: [],
      popular: true,
      icon: Star,
    },
    {
      id: '12months',
      name: 'Enterprise',
      price: 89,
      duration: '12 months',
      description: 'For large construction companies',
      features: [
        'Everything in Professional',
        'Team collaboration',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Training sessions',
      ],
      limitations: [],
      popular: false,
      icon: Crown,
    },
  ];

  const currentPlan = currentSubscription?.has_subscription 
    ? plans.find(plan => plan.id === currentSubscription.plan?.plan_type)
    : plans[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="mt-2 text-gray-600">
          Choose the plan that best fits your construction estimation needs.
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <div className="mb-8">
          <Card>
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Current Plan: {currentPlan?.name}
                  </h2>
                  <p className="text-gray-600">
                    {currentSubscription.has_subscription 
                      ? `Active until ${new Date(currentSubscription.subscription?.end_date).toLocaleDateString()}`
                      : 'Free trial active'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {currentSubscription.has_subscription 
                      ? formatCurrency(currentPlan?.price || 0)
                      : 'Free'
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    per {currentPlan?.duration}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Usage Statistics */}
      {usage && (
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {usage.estimates_used}
                  </div>
                  <div className="text-sm text-gray-600">Estimates Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {usage.estimates_remaining || '∞'}
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {usage.usage_percentage || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Usage</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan?.id === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''
              } ${isCurrentPlan ? 'bg-primary-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card.Body className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.id === 'free' ? 'bg-gray-100' :
                  plan.id === '6months' ? 'bg-primary-100' : 'bg-yellow-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    plan.id === 'free' ? 'text-gray-600' :
                    plan.id === '6months' ? 'text-primary-600' : 'text-yellow-600'
                  }`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </div>
                  <div className="text-gray-600">
                    per {plan.duration}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    isCurrentPlan ? 'bg-gray-400 cursor-not-allowed' : ''
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Can I change my plan at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                What happens if I exceed my quota?
              </h3>
              <p className="text-gray-600">
                You'll be notified when you're approaching your limit. You can upgrade your plan or wait for the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SubscriptionPage;



