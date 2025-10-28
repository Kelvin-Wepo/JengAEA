import React, { useState, useEffect } from 'react';
import { Calculator, Save, Share, Download, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PlanUploader from '../components/common/PlanUploader';
import { estimatesAPI, projectsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const EstimatePage = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    constructionType: 'new_construction',
    buildingType: '',
    location: '',
    dataPeriod: '3months',
    projectDescription: '',
  });
  const [mode, setMode] = useState('manual');
  const [counties, setCounties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [uploadedPlan, setUploadedPlan] = useState(null);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const { data } = await projectsAPI.getLocations();
        setCounties(data);
      } catch (err) {
        console.error('Failed to fetch counties:', err);
        toast.error('Failed to load counties');
      }
    };
    fetchCounties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'projectDescription') {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.projectName.trim()) errors.projectName = 'Project name is required';
    if (!formData.buildingType) errors.buildingType = 'Building type is required';
    if (!formData.location) errors.location = 'Location is required';
    if (formData.projectDescription.length > 150) {
      errors.projectDescription = 'Description must not exceed 150 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await estimatesAPI.createEstimate(formData);
      toast.success('Estimate created successfully');
    } catch (err) {
      console.error('Failed to create estimate:', err);
      toast.error(err?.response?.data?.message || 'Failed to create estimate');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanUpload = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await estimatesAPI.uploadEstimate(formData);
      setUploadedPlan(response.data);
      toast.success('Plan uploaded successfully');
    } catch (err) {
      console.error('Failed to upload plan:', err);
      toast.error(err?.response?.data?.message || 'Failed to upload plan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Estimate</h1>
        <p className="mt-2 text-gray-600">Fill in the project details to generate a construction cost estimate.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
                <div className="flex items-center space-x-4">
                  {Object.keys(validationErrors).length > 0 && (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Please fix the errors below</span>
                    </div>
                  )}
                  <div className="flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => setMode('manual')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                        mode === 'manual'
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Manual Entry
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('upload')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                        mode === 'upload'
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Upload Plan
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            
            <Card.Body>
              {mode === 'upload' ? (
                <PlanUploader
                  onUpload={handlePlanUpload}
                  onCancel={() => setMode('manual')}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name*
                      </label>
                      <Input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        placeholder="Enter project name"
                        error={validationErrors.projectName}
                      />
                      {validationErrors.projectName && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.projectName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Construction Type*</label>
                      <select
                        name="constructionType"
                        value={formData.constructionType}
                        onChange={handleInputChange}
                        className="input w-full"
                      >
                        <option value="new_construction">New Construction</option>
                        <option value="repair">Repair</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Building Type*</label>
                      <select
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={handleInputChange}
                        className={`input w-full ${validationErrors.buildingType ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select building type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="industrial">Industrial</option>
                      </select>
                      {validationErrors.buildingType && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.buildingType}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location (County)*</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`input w-full ${validationErrors.location ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select county</option>
                        {counties && counties.length > 0 ? (
                          counties.map(county => (
                            <option key={county.id} value={county.county_code}>
                              {county.county_name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>Loading counties...</option>
                        )}
                      </select>
                      {validationErrors.location && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data Period</label>
                      <select
                        name="dataPeriod"
                        value={formData.dataPeriod}
                        onChange={handleInputChange}
                        className="input w-full"
                      >
                        <option value="3months">3 Months</option>
                        <option value="6months">6 Months</option>
                        <option value="9months">9 Months</option>
                        <option value="12months">12 Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description
                      <span className="text-gray-500 ml-1">({charCount}/150)</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      className={`input w-full ${validationErrors.projectDescription ? 'border-red-500' : ''}`}
                      rows={4}
                      placeholder="Describe your project..."
                      maxLength={150}
                    />
                    {validationErrors.projectDescription && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.projectDescription}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button type="submit" disabled={isLoading}>
                      <Calculator className="w-4 h-4 mr-2" />
                      Generate Estimate
                    </Button>
                  </div>
                </form>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Cost Summary</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base Cost</span>
                    <span className="font-medium">Ksh0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Materials</span>
                    <span className="font-medium">Ksh0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Labor</span>
                    <span className="font-medium">Ksh0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipment</span>
                    <span className="font-medium">Ksh0.00</span>
                  </div>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-primary-600">Contingency (10%)</span>
                    <span className="font-medium text-primary-600">Ksh0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-800 font-semibold">Total Estimated Cost</span>
                    <span className="font-bold text-primary-800">Ksh0.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button variant="secondary" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button variant="secondary" className="w-full">
                  <Share className="w-4 h-4 mr-2" />
                  Share Estimate
                </Button>
                <Button variant="secondary" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  This estimate is based on historical data from the selected period and location. 
                  Actual costs may vary based on market conditions and specific requirements.
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;