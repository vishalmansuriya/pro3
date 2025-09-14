import React, { useState, useMemo } from 'react';
import { Search, Calendar, MapPin, Users, Clock, DollarSign, Mic, PartyPopper } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockEvents } from './mockData';
import Footer from './Footer';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }, [searchTerm]);

  const handleRegister = (eventName: string) => {
    alert(`Registration successful for ${eventName}!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-lg px-4 py-2 mb-6">
            <PartyPopper className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 text-sm">Community Events</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Events & Reunions
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Seamless access to networking, career opportunities, and alumni events that 
            will strengthen connections and foster a vibrant, active community.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search events by name, location, or speaker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">
              {filteredEvents.length} upcoming events
            </span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Event Header */}
                <div className="relative p-8 bg-gradient-to-br from-blue-50 to-white">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">{event.date}</span>
                        <span className="mx-2">•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Badge 
                      className={`${
                        event.status === 'Open' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-red-100 text-red-700 border-red-200'
                      } border rounded-full px-4 py-2`}
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-8 space-y-6">
                  {/* Event Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center text-blue-600 mb-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Location</span>
                      </div>
                      <p className="text-gray-900 text-sm">{event.location}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center text-blue-600 mb-1">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Fee</span>
                      </div>
                      <p className="text-gray-900 text-sm font-medium">{event.fee}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center text-blue-600 mb-1">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Attendees</span>
                      </div>
                      <p className="text-gray-900 text-sm">{event.attendees} registered</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center text-blue-600 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Deadline</span>
                      </div>
                      <p className="text-gray-900 text-sm">{event.registrationDeadline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-gray-900 font-medium mb-2">About this event</h4>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>

                  {/* Speakers */}
                  <div>
                    <div className="flex items-center text-gray-900 font-medium mb-3">
                      <Mic className="h-4 w-4 mr-2 text-blue-600" />
                      Featured Speakers
                    </div>
                    <div className="space-y-2">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <p className="text-gray-800 text-sm">{speaker}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button 
                      onClick={() => handleRegister(event.name)}
                      disabled={event.status === 'Closed'}
                      className={`w-full py-3 rounded-xl font-medium transition-all ${
                        event.status === 'Open' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {event.status === 'Open' ? 'Register Now' : 'Registration Closed'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-gray-900 text-xl mb-2">No events found</p>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;