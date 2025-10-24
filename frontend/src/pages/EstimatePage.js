import React from 'react';
import { Calculator, Save, Share, Download } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const EstimatePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cost Estimation</h1>
        <p className="mt-2 text-gray-600">
          Create detailed construction cost estimates for your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Estimation Form */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Type
                    </label>
                    <select className="input">
                      <option value="">Select project type</option>
                      <option value="2bedroom">2-Bedroom House</option>
                      <option value="3bedroom">3-Bedroom House</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="wall">Perimeter Wall</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Area (sqm)
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="Enter total area"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description
                  </label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Describe your project..."
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Cost Summary */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Cost Summary</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Cost</span>
                  <span className="font-medium">Ksh0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials</span>
                  <span className="font-medium">Ksh00.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor</span>
                  <span className="font-medium">Ksh0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Equipment</span>
                  <span className="font-medium">Ksh0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contingency (10%)</span>
                  <span className="font-medium">Ksh0.00</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost</span>
                  <span>Ksh0.00</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Estimate
                </Button>
                <Button variant="secondary" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="secondary" className="w-full">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="secondary" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;



