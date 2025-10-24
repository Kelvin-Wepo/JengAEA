import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Calculator, 
  MapPin, 
  FileText, 
  CheckCircle, 
  Star,
  ArrowRight,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage = () => {
  const features = [
    {
      icon: Building2,
      title: 'Project Selection',
      description: 'Choose from predefined project types including residential, commercial, and infrastructure projects.',
    },
    {
      icon: MapPin,
      title: 'Location-Based Pricing',
      description: 'Dynamic pricing based on regional variations across African markets using Google Maps integration.',
    },
    {
      icon: Calculator,
      title: 'Real-Time Estimation',
      description: 'Get instant cost breakdowns with material, labor, equipment, and overhead calculations.',
    },
    {
      icon: FileText,
      title: 'Professional Reports',
      description: 'Generate and export detailed cost reports in PDF or Excel format with company branding.',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Role-based access for homeowners, contractors, engineers, and developers.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'OTP verification and secure data handling for all your construction projects.',
    },
  ];

  const testimonials = [
    {
      name: 'John Mwangi',
      role: 'Civil Engineer',
      company: 'Mwangi Construction',
      content: 'JengaEafrica has revolutionized how we estimate construction costs. The accuracy and speed are unmatched.',
      rating: 5,
    },
    {
      name: 'Sarah Ochieng',
      role: 'Project Manager',
      company: 'Ochieng Developers',
      content: 'The location-based pricing feature saves us hours of research. Highly recommended for African projects.',
      rating: 5,
    },
    {
      name: 'David Kimani',
      role: 'Homeowner',
      company: 'Nairobi',
      content: 'Finally, a tool that understands the African construction market. Got my 3-bedroom house estimate in minutes.',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Projects Estimated', value: '50,000+' },
    { label: 'Counties Covered', value: '7+' },
    { label: 'Cost Accuracy', value: '95%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              JengaEafrica
              <span className="block text-accent-400">Cost Estimation</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Get accurate, location-based project cost breakdowns for the African construction industry. 
              Plan efficiently and reduce cost overruns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Construction Cost Estimation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines data-driven intelligence with an intuitive interface to help you make informed construction decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <Card.Body>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate construction cost estimates in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Select Project Type
              </h3>
              <p className="text-gray-600">
                Choose from residential, commercial, or infrastructure projects with predefined templates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Set Location & Details
              </h3>
              <p className="text-gray-600">
                Specify your project location and details. Our system automatically adjusts pricing based on regional variations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Instant Estimates
              </h3>
              <p className="text-gray-600">
                Receive detailed cost breakdowns and generate professional reports for your clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of construction professionals who trust JengaEafrica for their cost estimation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <Card.Body>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who use JengaEafrica to make informed construction decisions. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;



