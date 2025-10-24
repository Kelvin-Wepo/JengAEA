import React from 'react';
import { FileText, Download, Share, Eye, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatDate, formatCurrency } from '../utils/helpers';

const ReportsPage = () => {
  // Mock data - in real app, this would come from API
  const reports = [
    {
      id: 1,
      title: '3-Bedroom House Cost Estimate',
      project: '3-Bedroom House',
      type: 'estimate',
      format: 'pdf',
      size: '2.4 MB',
      created_at: '2024-01-15T10:30:00Z',
      downloads: 3,
    },
    {
      id: 2,
      title: 'Commercial Building Report',
      project: 'Commercial Building',
      type: 'detailed',
      format: 'excel',
      size: '1.8 MB',
      created_at: '2024-01-14T14:20:00Z',
      downloads: 1,
    },
    {
      id: 3,
      title: 'Perimeter Wall Summary',
      project: 'Perimeter Wall',
      type: 'summary',
      format: 'pdf',
      size: '1.2 MB',
      created_at: '2024-01-13T09:15:00Z',
      downloads: 5,
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      estimate: 'bg-blue-100 text-blue-800',
      detailed: 'bg-green-100 text-green-800',
      summary: 'bg-yellow-100 text-yellow-800',
      comparison: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getFormatIcon = (format) => {
    return format === 'pdf' ? '📄' : '📊';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="mt-2 text-gray-600">
              Manage and download your construction cost reports.
            </p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Card>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select className="input">
                  <option value="">All Types</option>
                  <option value="estimate">Cost Estimate</option>
                  <option value="detailed">Detailed Breakdown</option>
                  <option value="summary">Summary Report</option>
                  <option value="comparison">Project Comparison</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="input">
                  <option value="">All Formats</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select className="input">
                  <option value="">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last 3 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Search reports..."
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getFormatIcon(report.format)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {report.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Project: {report.project}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {report.format.toUpperCase()} • {report.size}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(report.created_at)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        {report.downloads} downloads
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {reports.length === 0 && (
        <Card>
          <Card.Body className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600 mb-6">
              Generate your first construction cost report to get started.
            </p>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ReportsPage;



