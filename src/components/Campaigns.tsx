import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  Target,
  Calendar,
  Heart,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { mockCampaigns } from "./mockData";
import Footer from './Footer';

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter((campaign) => {
      const matchesSearch =
        searchTerm === "" ||
        campaign.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        campaign.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const handleDonate = (campaignName: string) => {
    alert(
      `Thank you for your interest in donating to ${campaignName}!`,
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
            <Heart className="h-4 w-4 text-blue-100" />
            <span className="text-blue-100 text-sm">
              Make an Impact
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Support Our Campaigns
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
            The Donation Portal enables both alumni and the
            institution to contribute to and manage financial
            donations through meaningful campaigns that create
            lasting impact.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="sticky top-16 z-40 bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search campaigns by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              {filteredCampaigns.length} active campaigns
            </span>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="group bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Campaign Header */}
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {campaign.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {campaign.description}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-3 py-1">
                      {campaign.category}
                    </Badge>
                  </div>
                </div>

                {/* Campaign Body */}
                <div className="p-6 space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center text-blue-600 mb-1">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">
                          Supporters
                        </span>
                      </div>
                      <p className="text-gray-900 text-lg font-semibold">
                        {campaign.supporters}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center text-blue-600 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">
                          Ends
                        </span>
                      </div>
                      <p className="text-gray-900 text-sm font-medium">
                        {campaign.endDate}
                      </p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-900 font-medium">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                        Progress: {campaign.progress}%
                      </div>
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>

                    <div className="relative">
                      <Progress
                        value={campaign.progress}
                        className="h-3 bg-gray-200 rounded-full"
                      />
                      <div
                        className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${campaign.progress}%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="text-gray-600">
                        Raised:{" "}
                        <span className="text-gray-900 font-semibold">
                          {formatCurrency(campaign.raised)}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Goal:{" "}
                        <span className="text-gray-900 font-semibold">
                          {formatCurrency(campaign.goal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount Needed */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center text-blue-600 mb-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        Still needed to reach goal
                      </span>
                    </div>
                    <p className="text-gray-900 text-2xl font-bold">
                      {formatCurrency(
                        campaign.goal - campaign.raised,
                      )}
                    </p>
                  </div>

                  {/* Donate Button */}
                  <Button
                    onClick={() => handleDonate(campaign.name)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
              <Search className="h-12 w-12 text-blue-400" />
            </div>
            <p className="text-gray-900 text-xl mb-2">
              No campaigns found
            </p>
            <p className="text-gray-600">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Campaigns;