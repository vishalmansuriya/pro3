import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, GraduationCap, Linkedin, Twitter, Github, Star, Users } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockAlumni, Alumni } from './mockData';
import Footer from './Footer';

const AlumniDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredAlumni = useMemo(() => {
    return mockAlumni.filter(alumni => {
      const matchesSearch = searchTerm === '' || 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchTerm]);

  const handleConnect = (e: React.MouseEvent, alumniName: string) => {
    e.stopPropagation();
    // Connection logic would go here
  };

  const handleProfileClick = (alumniId: number) => {
    navigate(`/alumni/${alumniId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-lg px-4 py-2 mb-6">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 text-sm">Alumni Network</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Discover Amazing Alumni
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Connect with fellow alumni, expand your professional network, and discover 
            exciting opportunities within our vibrant community.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search alumni by name, company, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">
              {filteredAlumni.length} alumni in our network
            </span>
          </div>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAlumni.map((alumni) => (
            <Card 
              key={alumni.id} 
              className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
              onClick={() => handleProfileClick(alumni.id)}
            >
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={alumni.profileImage}
                          alt={alumni.name}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{alumni.name}</h3>
                        <p className="text-gray-600 text-sm">{alumni.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-amber-100 rounded-lg px-3 py-1">
                      <Star className="h-3 w-3 text-amber-500 fill-current" />
                      <span className="text-amber-700 text-xs font-medium">{alumni.match}%</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Company & Location */}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="h-4 w-4 mr-3 text-blue-600" />
                      {alumni.company}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                      {alumni.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <GraduationCap className="h-4 w-4 mr-3 text-blue-600" />
                      Class of {alumni.graduationYear}
                    </div>
                  </div>

                  {/* Department Badge */}
                  <div>
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200 rounded-lg px-3 py-1">
                      {alumni.department}
                    </Badge>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-gray-900 font-medium text-sm mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {alumni.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} className="bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs px-2 py-1">
                          {skill}
                        </Badge>
                      ))}
                      {alumni.skills.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs px-2 py-1">
                          +{alumni.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Achievement */}
                  <div>
                    <p className="text-gray-900 font-medium text-sm mb-1">Latest Achievement</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{alumni.achievements}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                        <Github className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-100">
                        <Twitter className="h-4 w-4 text-sky-600" />
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => handleConnect(e, alumni.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-6"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
              <Search className="h-12 w-12 text-blue-400" />
            </div>
            <p className="text-gray-900 text-xl mb-2">No alumni found</p>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AlumniDirectory;