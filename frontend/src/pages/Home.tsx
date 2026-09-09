import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Scale, ShieldCheck, Calendar, Star, ArrowRight, MessageSquare, FileText, Briefcase, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/lawyers?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/lawyers');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col bg-white">
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Law Library" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-medium text-sm mb-8 border border-primary-100 shadow-sm">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span>Over 10,000 successful consultations</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6">
              Expert legal advice, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                when you need it most.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with top-rated, verified attorneys across all specialties. Book secure online consultations instantly from anywhere.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex rounded-xl shadow-xl overflow-hidden border-2 border-primary-100 bg-white focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 transition-all duration-300">
                <div className="flex items-center px-4 bg-white text-gray-400">
                  <Search size={24} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 w-full px-4 py-4 text-lg focus:outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Find a lawyer, specialty, or location..."
                />
                <button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8 text-white font-bold transition-colors text-lg flex items-center">
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">500+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Verified Lawyers</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">24/7</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Online Booking</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">98%</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Client Satisfaction</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">6</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Legal Domains</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">Get legal help in three simple steps.</p>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          >
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 -z-10"></div>

            <motion.div variants={fadeInUp} className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10 text-primary-600">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Find an Expert</h3>
              <p className="text-gray-500">Search our network of verified attorneys by specialty, location, or price.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-primary-100 rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10 text-primary-600">
                <Calendar size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Book Securely</h3>
              <p className="text-gray-500">Choose an available time slot and book your consultation instantly online.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-primary-600 border-4 border-primary-200 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6 relative z-10 text-white">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Counsel</h3>
              <p className="text-gray-500">Meet with your lawyer virtually and get the legal guidance you need.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Specialized Legal Domains</h2>
              <p className="text-xl text-gray-400">Whatever your legal challenge, we have a specialist ready to help.</p>
            </div>
            <button onClick={() => navigate('/practice-areas')} className="mt-6 md:mt-0 flex items-center text-primary-400 hover:text-primary-300 font-bold group">
              View all domains <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Law', icon: Briefcase, desc: 'Business formation, M&A, and contracts.' },
              { title: 'Family Law', icon: User, desc: 'Divorce, custody, and family disputes.' },
              { title: 'Criminal Defense', icon: ShieldCheck, desc: 'Defense against felony and misdemeanor charges.' },
            ].map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/lawyers?domain=${encodeURIComponent(area.title)}`)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:bg-gray-700 cursor-pointer transition group"
              >
                <div className="bg-gray-700 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition text-gray-300 group-hover:text-white">
                  <area.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-400">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-16">Trusted by Thousands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "I needed a corporate lawyer for my startup but didn't know where to look. Found an amazing expert here in 5 minutes.", author: "Sarah T.", role: "Founder & CEO" },
              { text: "The booking process is incredibly smooth. I had a video consultation the next day and got all my questions answered.", author: "Michael R.", role: "Small Business Owner" },
              { text: "High-quality professionals and completely transparent pricing. Knowing exactly what I'd pay upfront gave me huge peace of mind.", author: "Elena J.", role: "Client" },
            ].map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
              >
                <Star size={32} className="text-yellow-400 fill-yellow-400 absolute top-8 right-8 opacity-20" />
                <div className="flex text-yellow-400 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{test.author}</h4>
                    <span className="text-xs text-gray-500">{test.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
