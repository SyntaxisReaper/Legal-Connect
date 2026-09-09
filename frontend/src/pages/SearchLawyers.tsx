import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal, User } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchLawyers = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialDomain = searchParams.get('domain') || '';
  
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [location, setLocation] = useState('');
  const [maxFee, setMaxFee] = useState('');
  const [minExperience, setMinExperience] = useState('');

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.append('search', searchTerm);
      if (initialDomain) query.append('domain', initialDomain);
      if (location) query.append('location', location);
      if (maxFee) query.append('maxFee', maxFee);
      if (minExperience) query.append('minExperience', minExperience);

      const response = await fetch(`http://localhost:5000/api/lawyers?${query.toString()}`);
      const data = await response.json();
      setLawyers(data);
    } catch (error) {
      console.error('Failed to fetch lawyers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [initialDomain]); // Only auto-fetch when domain param changes on mount

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLawyers();
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">
            {initialDomain ? `${initialDomain} Lawyers` : 'Find the Right Lawyer'}
          </h1>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 flex rounded-md shadow-sm bg-white overflow-hidden p-1">
              <div className="flex-1 flex items-center px-3 border-r border-gray-200">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full focus:outline-none text-gray-900"
                  placeholder="Name, specialty, language..."
                />
              </div>
              <div className="flex-1 flex items-center px-3 hidden md:flex">
                <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full focus:outline-none text-gray-900"
                  placeholder="Location (e.g. New York)"
                />
              </div>
            </div>
            <button type="submit" className="bg-secondary-500 hover:bg-secondary-600 px-8 py-3 text-white rounded-md font-bold transition whitespace-nowrap">
              Search Now
            </button>
          </form>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2 text-primary-600" /> Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Hourly Fee ($)</label>
                <select 
                  value={maxFee} 
                  onChange={(e) => setMaxFee(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Price</option>
                  <option value="200">Up to $200</option>
                  <option value="400">Up to $400</option>
                  <option value="600">Up to $600</option>
                  <option value="1000">Up to $1000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Experience</label>
                <select 
                  value={minExperience} 
                  onChange={(e) => setMinExperience(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Experience</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="20">20+ Years</option>
                </select>
              </div>

              <div className="md:hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 px-3 py-2 border"
                  placeholder="City or State"
                />
              </div>

              <button 
                onClick={fetchLawyers}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-md transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : lawyers.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {lawyers.map((lawyer: any) => (
                <motion.div 
                  key={lawyer.id} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition flex flex-col h-full"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    {lawyer.lawyerProfile?.imageUrl ? (
                      <img src={lawyer.lawyerProfile.imageUrl} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-100" />
                    ) : (
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        <User size={32} />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{lawyer.name}</h3>
                      <div className="text-primary-600 font-medium text-sm mt-1 mb-2">
                        {lawyer.lawyerProfile?.specialties || 'General Practice'}
                      </div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" /> {lawyer.lawyerProfile?.location || 'Location varies'}
                        </div>
                        <div className="flex items-center">
                          <Briefcase size={14} className="mr-1" /> {lawyer.lawyerProfile?.experienceYears || 0} years experience
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-lg">
                      <span className="font-bold text-gray-900">${lawyer.lawyerProfile?.consultationFee || 0}</span>
                      <span className="text-gray-500 text-sm"> / session</span>
                    </div>
                    <Link to={`/lawyers/${lawyer.id}`} className="bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium px-4 py-2 rounded-lg transition active:scale-95">
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
              <Filter className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Lawyers Found</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any lawyers matching your exact filters. Try adjusting your price, experience, or location criteria.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setLocation(''); setMaxFee(''); setMinExperience(''); fetchLawyers(); }}
                className="mt-6 text-primary-600 font-bold hover:text-primary-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchLawyers;
