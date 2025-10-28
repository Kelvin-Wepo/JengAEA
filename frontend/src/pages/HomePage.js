import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Calculator, 
  MapPin, 
  FileText, 
  Star,
  ArrowRight,
  Users,
  Shield
} from 'lucide-react';
import heroImage from '../assets/images/hero-bg.jpg';
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
      <section className="relative min-h-[700px] flex items-center text-white overflow-hidden">
        {/* Animated Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 transform scale-105 animate-slowZoom" 
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Enhanced Gradient Overlay with Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/75 via-blue-800/70 to-indigo-900/80 backdrop-blur-sm animate-gradientFlow" />
        </div>
        
        {/* Animated Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10 animate-floatingPattern"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpolygon points="0 0 20 0 10 10"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            {/* Glowing Effect for Logo with Enhanced Animation */}
            <div className="inline-block mb-4 animate-fadeIn">
              <div className="w-20 h-20 mx-auto mb-6 relative group hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full opacity-20 blur-xl animate-spin-slow" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-20 blur-xl animate-reverse-spin" />
                <div className="relative bg-white bg-opacity-10 rounded-full p-4 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300">
                  <Building2 className="w-12 h-12 text-blue-100 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Enhanced Typography */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <div className="flex items-center justify-center gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-500 to-secondary-600 animate-pulse">
                  Jenga
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                  Africa
                </span>
              </div>
              <span className="block text-3xl md:text-4xl mt-4 font-normal text-blue-200">
                Cost Estimation
              </span>
            </h1>

            {/* Enhanced Description with Animations */}
            <div className="space-y-4 animate-slideUp opacity-0" style={{ animationDelay: '0.3s' }}>
              <p className="text-xl md:text-2xl text-blue-50/90 max-w-3xl mx-auto leading-relaxed">
                Get accurate, location-based project cost breakdowns for the African construction industry. 
                <span className="block mt-2 text-blue-200 font-light">
                  Plan efficiently and reduce cost overruns.
                </span>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-primary-500/20 rounded-full blur-3xl animate-blob" />
              <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* CTA Buttons with Animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0" style={{ animationDelay: '0.6s' }}>
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-secondary-500/25"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 animate-bounce" />
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
      <section className="bg-gradient-to-r from-primary-50 via-neutral-100 to-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center rounded-xl shadow-md bg-white/80 p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2 animate-gradient bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-700 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-4 tracking-tight animate-fadeIn">Everything You Need for Construction Cost Estimation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideUp">Our platform combines data-driven intelligence with an intuitive interface to help you make informed construction decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center bg-white/90 shadow-xl rounded-2xl hover:scale-105 transition-transform duration-300 border border-primary-100">
                  <Card.Body>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Icon className="w-7 h-7 text-primary-600 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-700 mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white bg-gradient-to-br from-primary-50 via-neutral-100 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-700 mb-4 tracking-tight animate-fadeIn">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideUp">Get accurate construction cost estimates in just a few simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center bg-white/90 rounded-2xl shadow-lg p-8 border border-secondary-100 hover:scale-105 transition-transform duration-300 animate-fadeIn">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-extrabold text-white drop-shadow-lg">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">Select Project Type</h3>
              <p className="text-gray-600 text-base leading-relaxed">Choose from residential, commercial, or infrastructure projects with predefined templates.</p>
            </div>

            <div className="text-center bg-white/90 rounded-2xl shadow-lg p-8 border border-secondary-100 hover:scale-105 transition-transform duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-extrabold text-white drop-shadow-lg">2</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-700 mb-3">Set Location & Details</h3>
              <p className="text-gray-600 text-base leading-relaxed">Specify your project location and details. Our system automatically adjusts pricing based on regional variations.</p>
            </div>

            <div className="text-center bg-white/90 rounded-2xl shadow-lg p-8 border border-accent-100 hover:scale-105 transition-transform duration-300 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl font-extrabold text-white drop-shadow-lg">3</span>
              </div>
              <h3 className="text-xl font-bold text-accent-700 mb-3">Get Instant Estimates</h3>
              <p className="text-gray-600 text-base leading-relaxed">Receive detailed cost breakdowns and generate professional reports for your clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-accent-700 mb-4 tracking-tight animate-fadeIn">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slideUp">Join thousands of construction professionals who trust JengaEafrica for their cost estimation needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/90 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 border border-accent-100">
                <Card.Body>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-bounce" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="text-center">
                    <div className="font-bold text-primary-700">{testimonial.name}</div>
                    <div className="text-sm text-secondary-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight animate-fadeIn">Ready to Start Your Construction Project?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-slideUp">Join thousands of professionals who use JengaEafrica to make informed construction decisions. Start your free trial today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50 shadow-lg hover:scale-105 transition-transform duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 animate-bounce" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600 shadow-lg hover:scale-105 transition-transform duration-300">
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



