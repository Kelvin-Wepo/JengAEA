import React from 'react';
import { Building2, Search, Filter, MapPin } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ProjectSelectionPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Select Your Project</h1>
        <p className="mt-2 text-gray-600">
          Choose from our predefined project types or create a custom estimate.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <Card>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search projects..."
                  icon={Search}
                />
              </div>
              <div>
                <select className="input">
                  <option value="">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <select className="input">
                  <option value="">All Locations</option>
                  <option value="kenya">Kenya</option>
                  <option value="uganda">Uganda</option>
                  <option value="tanzania">Tanzania</option>
                </select>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Project Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Residential Projects */}
        <Card className="hover:shadow-lg transition-shadow">
          <Card.Body>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Residential</h3>
              <p className="text-gray-600 mb-4">
                Houses, apartments, and residential buildings
              </p>
              <Button className="w-full">
                Browse Residential Projects
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Commercial Projects */}
        <Card className="hover:shadow-lg transition-shadow">
          <Card.Body>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Commercial</h3>
              <p className="text-gray-600 mb-4">
                Offices, retail spaces, and commercial buildings
              </p>
              <Button className="w-full">
                Browse Commercial Projects
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Infrastructure Projects */}
        <Card className="hover:shadow-lg transition-shadow">
          <Card.Body>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Roads, bridges, and infrastructure projects
              </p>
              <Button className="w-full">
                Browse Infrastructure Projects
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Don't see what you're looking for?
        </p>
        <Button variant="secondary">
          Create Custom Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectSelectionPage;



