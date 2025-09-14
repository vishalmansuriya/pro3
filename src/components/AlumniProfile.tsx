import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Briefcase, GraduationCap, Languages, Star, Linkedin, Github, Twitter, MessageCircle, Users, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockAlumni } from './mockData';

const AlumniProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const alumni = mockAlumni.find(a => a.id === parseInt(id || '0'));

  if (!alumni) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumni not found</h2>
          <Link to="/alumni" className="text-blue-600 hover:text-blue-800">
            Back to Alumni Directory
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional data for profile details
  const profileData = {
    ...alumni,
    bio: "Data enthusiast passionate about leveraging AI to solve real-world problems in e-commerce.",
    interests: ["Data Visualization", "Badminton", "Travel Photography"],
    languages: ["English", "Hindi", "Bengali"],
    notableProject: "Customer Segmentation Model",
    achievements: [
      "Developed an AI model that improved product recommendations by 30%",
      "Led a team of 5 data scientists on ML projects",
      "Published research on recommendation systems"
    ]
  };

  const handleConnect = () => {
    // Connection logic would go here
  };

  const handleMessage = () => {
    // Message logic would go here
  };

  const handleMentorship = () => {
    // Mentorship logic would go here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/alumni" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Alumni Directory
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Profile Header */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img
                    src={alumni.profileImage}
                    alt={alumni.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{alumni.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{alumni.title} at {alumni.company}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {alumni.skills.map((skill) => (
                      <Badge key={skill} className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-blue-600 mb-2">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  <span className="font-medium">Education</span>
                </div>
                <p className="text-gray-900 font-medium">{alumni.degree}, Class of {alumni.graduationYear}</p>
              </div>

              {/* Industry */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-green-600 mb-2">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span className="font-medium">Industry</span>
                </div>
                <p className="text-gray-900 font-medium">{alumni.department}</p>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-red-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-gray-900 font-medium">{alumni.location}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-purple-600 mb-2">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="text-gray-900 font-medium">{alumni.email}</p>
              </div>

              {/* Languages */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-yellow-600 mb-2">
                  <Languages className="h-5 w-5 mr-2" />
                  <span className="font-medium">Languages</span>
                </div>
                <p className="text-gray-900 font-medium">{profileData.languages.join(", ")}</p>
              </div>

              {/* Notable Projects */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-purple-600 mb-2">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="font-medium">Notable Projects</span>
                </div>
                <p className="text-gray-900 font-medium">{profileData.notableProject}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="px-8 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {alumni.name.split(' ')[0]}</h2>
              <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
            </div>

            {/* Achievements Section */}
            <div className="px-8 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {profileData.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interests Section */}
            <div className="px-8 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <Badge key={interest} className="bg-green-100 text-green-700 border border-green-200 rounded-full px-3 py-1">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Connect Section */}
            <div className="px-8 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Connect with {alumni.name.split(' ')[0]}</h2>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                  <Linkedin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                  <Github className="h-6 w-6 text-gray-700" />
                </div>
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100">
                  <Twitter className="h-6 w-6 text-sky-600" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleConnect}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                
                <Button 
                  onClick={handleMessage}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                
                <Button 
                  onClick={handleMentorship}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Get 1 to 1 mentorship
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlumniProfile;