import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, Clock, Users, Plus, BarChart3, Briefcase, TrendingUp, Filter, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockJobs, Job } from './mockData';
import CreateJobForm from './CreateJobForm';
import Footer from './Footer';

const JobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Job' | 'Internship'>('All');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'All' || job.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter, jobs]);

  const handleCreateJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'applicants'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.max(...jobs.map(j => j.id)) + 1,
      postedDate: 'Just now',
      applicants: 0,
      isUserCreated: true
    };
    
    // Add the new job to the top of the list
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  const handleApply = (jobTitle: string, company: string) => {
    alert(`Application submitted for ${jobTitle} at ${company}!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-lg px-4 py-2 mb-6">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 text-sm">Career Opportunities</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Discover Your Next Role
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Access exclusive job postings, mentorship opportunities, and professional networking 
            that will accelerate your career growth and advancement.
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search jobs by title, company, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-lg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsCreateJobOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-6 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Post Job
              </Button>
              <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                AI Insights
              </Button>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            <Button
              variant={categoryFilter === 'All' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('All')}
              className={`rounded-lg px-6 py-2 flex items-center gap-2 ${
                categoryFilter === 'All' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              All ({jobs.length})
            </Button>
            <Button
              variant={categoryFilter === 'Job' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('Job')}
              className={`rounded-lg px-6 py-2 flex items-center gap-2 ${
                categoryFilter === 'Job' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Jobs ({jobs.filter(job => job.category === 'Job').length})
            </Button>
            <Button
              variant={categoryFilter === 'Internship' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('Internship')}
              className={`rounded-lg px-6 py-2 flex items-center gap-2 ${
                categoryFilter === 'Internship' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-4 w-4" />
              Internships ({jobs.filter(job => job.category === 'Internship').length})
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">
              {filteredJobs.length} {categoryFilter.toLowerCase()} opportunities available
            </span>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                      <Badge className={`rounded-lg ${
                        job.category === 'Internship' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {job.category === 'Internship' ? (
                          <>
                            <Users className="h-3 w-3 mr-1" />
                            Internship
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Hot
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-xl text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <div className="flex gap-3 mt-4 lg:mt-0">
                    {job.isUserCreated && (
                      <Button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    )}
                    <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm">
                      Save
                    </Button>
                    <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm">
                      Share
                    </Button>
                  </div>
                </div>

                {/* Job Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center text-blue-600 mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">Location</span>
                    </div>
                    <p className="text-gray-900 text-sm">{job.location}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center text-blue-600 mb-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">Salary</span>
                    </div>
                    <p className="text-gray-900 text-sm">{job.salary}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center text-blue-600 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">Type</span>
                    </div>
                    <p className="text-gray-900 text-sm">{job.type}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center text-blue-600 mb-1">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">Applicants</span>
                    </div>
                    <p className="text-gray-900 text-sm">{job.applicants} applied</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-gray-900 font-medium mb-2">About this role</h4>
                  <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </div>

                {/* Skills Required */}
                <div className="mb-6">
                  <h4 className="text-gray-900 font-medium mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((skill) => (
                      <Badge key={skill} className="bg-blue-100 text-blue-700 border border-blue-200 rounded-lg px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200 gap-4">
                  <p className="text-gray-500 text-sm">Posted {job.postedDate}</p>
                  <Button 
                    onClick={() => handleApply(job.title, job.company)}
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-8 py-3 font-medium"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-emerald-400" />
            </div>
            <p className="text-gray-900 text-xl mb-2">No jobs found</p>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Create Job Form */}
      <CreateJobForm
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onSubmit={handleCreateJob}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobBoard;