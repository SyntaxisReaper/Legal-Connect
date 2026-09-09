import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, ShieldAlert, Home, Landmark, BookOpen } from 'lucide-react';

const domains = [
  { name: 'Corporate Law', icon: <Briefcase size={32} />, desc: 'Business formation, M&A, contracts, and corporate defense.' },
  { name: 'Family Law', icon: <Users size={32} />, desc: 'Divorce, child custody, alimony, and adoption matters.' },
  { name: 'Criminal Defense', icon: <ShieldAlert size={32} />, desc: 'Defense against misdemeanors and felony charges.' },
  { name: 'Real Estate', icon: <Home size={32} />, desc: 'Property disputes, leasing, zoning, and closings.' },
  { name: 'Civil Litigation', icon: <Landmark size={32} />, desc: 'Lawsuits, personal injury, and non-criminal disputes.' },
  { name: 'Intellectual Property', icon: <BookOpen size={32} />, desc: 'Patents, trademarks, copyrights, and trade secrets.' }
];

const PracticeAreas = () => {
  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Practice Areas</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Our verified legal experts cover a wide spectrum of legal domains. Select an area below to find lawyers specializing in your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => (
            <Link 
              key={domain.name} 
              to={`/lawyers?search=${encodeURIComponent(domain.name)}`}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition group flex flex-col items-center text-center"
            >
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.name}</h3>
              <p className="text-gray-500">{domain.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreas;
