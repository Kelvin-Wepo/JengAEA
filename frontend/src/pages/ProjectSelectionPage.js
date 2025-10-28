import React from 'react';
import { Search, Home, Briefcase, Map } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ProjectCard from '../components/common/ProjectCard';

const ProjectSelectionPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Project Templates</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">Pick a template to jumpstart your estimate — fully customizable to your site and materials.</p>
      </div>

      {/* Search and Filters - refined */}
      <div className="mb-8">
        <Card>
          <Card.Body>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-4">
              <div className="flex-1">
                <Input placeholder="Search templates, features or keywords..." icon={Search} />
              </div>

              <div className="flex items-center space-x-3">
                <select className="input">
                  <option value="">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>

                <select className="input">
                  <option value="">All Locations</option>
                  <option value="kenya">Kenya</option>
                  <option value="uganda">Uganda</option>
                  <option value="tanzania">Tanzania</option>
                </select>

                <Button variant="secondary">Sort</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="3-Bedroom House"
          description="Typical single-family home with foundation, framing and finishes"
          icon={Home}
          color="bg-sky-500"
          href="/estimate/new?template=3-bedroom"
          tags={["Residential", "Medium"]}
          featured
        />

        <ProjectCard
          title="Commercial Office Block"
          description="Multi-storey office building with core & shell estimate"
          icon={Briefcase}
          color="bg-green-500"
          href="/estimate/new?template=office-block"
          tags={["Commercial", "Large"]}
        />

        <ProjectCard
          title="Perimeter Wall"
          description="Boundary wall with concrete footing and plaster finishes"
          icon={Map}
          color="bg-indigo-500"
          href="/estimate/new?template=perimeter-wall"
          tags={["Infrastructure", "Small"]}
        />

        {/* Placeholder for more templates - can be mapped from data */}
        <ProjectCard
          title="Retail Shop Fit-out"
          description="Internal fit-out estimate for retail spaces"
          icon={Briefcase}
          color="bg-amber-500"
          href="/estimate/new?template=retail-fitout"
          tags={["Commercial", "Medium"]}
        />

        <ProjectCard
          title="Apartment Block"
          description="Multi-unit residential block with communal services"
          icon={Home}
          color="bg-pink-500"
          href="/estimate/new?template=apartment-block"
          tags={["Residential", "Large"]}
        />

        <ProjectCard
          title="Roadworks (1km)"
          description="Typical 1km road construction with subbase and asphalt"
          icon={Map}
          color="bg-emerald-500"
          href="/estimate/new?template=road-1km"
          tags={["Infrastructure", "Large"]}
        />
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-4">Don't see a template that fits? Create a custom project with your own parameters.</p>
        <Button variant="secondary">Create Custom Project</Button>
      </div>
    </div>
  );
};

export default ProjectSelectionPage;



