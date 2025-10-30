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
    total_area: '',
  });
  const [mode, setMode] = useState('manual');
  const [projectTypes, setProjectTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [estimationResult, setEstimationResult] = useState(null);

  // Local county list (use this instead of fetching from backend)
  const COUNTY_LIST = [
    { id: 1, county_name: 'Mombasa' },
    { id: 2, county_name: 'Kwale' },
    { id: 3, county_name: 'Kilifi' },
    { id: 4, county_name: 'Tana River' },
    { id: 5, county_name: 'Lamu' },
    { id: 6, county_name: 'Taita-Taveta' },
    { id: 7, county_name: 'Garissa' },
    { id: 8, county_name: 'Wajir' },
    { id: 9, county_name: 'Mandera' },
    { id: 10, county_name: 'Marsabit' },
    { id: 11, county_name: 'Isiolo' },
    { id: 12, county_name: 'Meru' },
    { id: 13, county_name: 'Tharaka-Nithi' },
    { id: 14, county_name: 'Embu' },
    { id: 15, county_name: 'Kitui' },
    { id: 16, county_name: 'Machakos' },
    { id: 17, county_name: 'Makueni' },
    { id: 18, county_name: 'Nyandarua' },
    { id: 19, county_name: 'Nyeri' },
    { id: 20, county_name: 'Kirinyaga' },
    { id: 21, county_name: "Murang'a" },
    { id: 22, county_name: 'Kiambu' },
    { id: 23, county_name: 'Turkana' },
    { id: 24, county_name: 'West Pokot' },
    { id: 25, county_name: 'Samburu' },
    { id: 26, county_name: 'Trans Nzoia' },
    { id: 27, county_name: 'Uasin Gishu' },
    { id: 28, county_name: 'Elgeyo-Marakwet' },
    { id: 29, county_name: 'Nandi' },
    { id: 30, county_name: 'Baringo' },
    { id: 31, county_name: 'Laikipia' },
    { id: 32, county_name: 'Nakuru' },
    { id: 33, county_name: 'Narok' },
    { id: 34, county_name: 'Kajiado' },
    { id: 35, county_name: 'Kericho' },
    { id: 36, county_name: 'Bomet' },
    { id: 37, county_name: 'Kakamega' },
    { id: 38, county_name: 'Vihiga' },
    { id: 39, county_name: 'Bungoma' },
    { id: 40, county_name: 'Busia' },
    { id: 41, county_name: 'Siaya' },
    { id: 42, county_name: 'Kisumu' },
    { id: 43, county_name: 'Homa Bay' },
    { id: 44, county_name: 'Migori' },
    { id: 45, county_name: 'Kisii' },
    { id: 46, county_name: 'Nyamira' },
    { id: 47, county_name: 'Nairobi' }
  ];

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const { data } = await projectsAPI.getProjectTypes();
        setProjectTypes(data);
      } catch (err) {
        console.error('Failed to fetch project types:', err);
      }
    };
    fetchProjectTypes();
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
    if (!formData.total_area || Number(formData.total_area) <= 0) errors.total_area = 'Total area must be greater than 0';
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
      // Find a project_type id that matches selected buildingType category
      let project_type_id = null;
      if (projectTypes && projectTypes.length > 0) {
        const found = projectTypes.find(pt => pt.category === formData.buildingType);
        project_type_id = found ? found.id : projectTypes[0].id;
      }

      const payload = {
        project_type_id: project_type_id,
        location_id: parseInt(formData.location, 10),
        total_area: parseFloat(formData.total_area),
        contingency_percentage: 10.0
      };

      const { data } = await estimatesAPI.calculateCost(payload);
      setEstimationResult(data);
      toast.success('Estimate calculated');
    } catch (err) {
      // Improved error logging for debugging
      console.error('Failed to calculate estimate. Error object:', err);
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
        console.error('No response received. Request:', err.request);
      } else {
        console.error('Request setup error:', err.message);
      }
      toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Failed to calculate estimate');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanUpload = async (file) => {
    setIsLoading(true);
    try {
      // Pass file object directly - api wrapper will build FormData
  const response = await estimatesAPI.uploadEstimate(file);
      // Build estimationResult from uploaded estimate (server saved calculated fields)
      const est = response.data.estimate || response.data;
      if (est) {
        // compute breakdown similar to backend calculate_cost
        const adjusted = parseFloat(est.adjusted_cost_per_sqm || (est.base_cost_per_sqm * (est.location_multiplier || 1)));
        const total_area = parseFloat(est.total_area || 0);
        const base_total = adjusted * total_area;
        const contingency = parseFloat(est.contingency_amount || (base_total * (est.contingency_percentage || 10) / 100));
        const custom_items_total = 0;
        const final_total = parseFloat(est.total_estimated_cost || (base_total + contingency + custom_items_total));

        setEstimationResult({
          project_type: est.project_type_data || null,
          location: est.location_data || null,
          calculations: {
            total_area,
            base_cost_per_sqm: parseFloat(est.base_cost_per_sqm || 0),
            adjusted_cost_per_sqm: adjusted,
            base_total_cost: base_total,
            contingency_percentage: parseFloat(est.contingency_percentage || 10),
            contingency_amount: contingency,
            custom_items_total,
            final_total_cost: final_total
          },
          breakdown: {
            materials: base_total * 0.6,
            labor: base_total * 0.3,
            equipment: base_total * 0.1,
            contingency: contingency,
            custom_items: custom_items_total
          }
        });
      }
      toast.success('Plan uploaded successfully');
    } catch (err) {
      console.error('Failed to upload plan:', err);
      toast.error(err?.response?.data?.message || 'Failed to upload plan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const formatKES = (value) => {
    try {
      const v = Number(value) || 0;
      return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 2 }).format(v);
    } catch (e) {
      return `Ksh ${value}`;
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
                        {COUNTY_LIST && COUNTY_LIST.length > 0 ? (
                          COUNTY_LIST.map(county => (
                            <option key={county.id} value={county.id}>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Area (sqm)*</label>
                      <Input
                        type="number"
                        name="total_area"
                        value={formData.total_area || ''}
                        onChange={handleInputChange}
                        placeholder="Enter total area in sqm"
                        error={validationErrors.total_area}
                      />
                      {validationErrors.total_area && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.total_area}</p>
                      )}
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
                    <span className="font-medium">{formatKES(estimationResult?.calculations?.base_total_cost || 0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Materials</span>
                    <span className="font-medium">{formatKES(estimationResult?.breakdown?.materials || 0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Labor</span>
                    <span className="font-medium">{formatKES(estimationResult?.breakdown?.labor || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipment</span>
                    <span className="font-medium">{formatKES(estimationResult?.breakdown?.equipment || 0)}</span>
                  </div>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-primary-600">Contingency ({estimationResult?.calculations?.contingency_percentage || 0}%)</span>
                    <span className="font-medium text-primary-600">{formatKES(estimationResult?.calculations?.contingency_amount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-800 font-semibold">Total Estimated Cost</span>
                    <span className="font-bold text-primary-800">{formatKES(estimationResult?.calculations?.final_total_cost || 0)}</span>
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