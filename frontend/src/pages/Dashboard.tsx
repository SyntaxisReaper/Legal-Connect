import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Clock, LayoutDashboard, Settings, FileText, CheckCircle, XCircle, Video, Phone, MessageSquare, DollarSign, Activity, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (activeTab === 'appointments' && token) {
      setLoadingAppts(true);
      fetch('http://localhost:5000/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setAppointments(data);
          setLoadingAppts(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingAppts(false);
          toast.error("Failed to load appointments.");
        });
    } else if (activeTab === 'profile' && token) {
      fetch('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          bio: data.lawyerProfile?.bio || '',
          barRegistrationNumber: data.lawyerProfile?.barRegistrationNumber || '',
          experienceYears: data.lawyerProfile?.experienceYears || '',
          consultationFee: data.lawyerProfile?.consultationFee || '',
          specialties: data.lawyerProfile?.specialties || '',
          location: data.lawyerProfile?.location || '',
          languages: data.lawyerProfile?.languages || '',
          education: data.lawyerProfile?.education || ''
        });
      })
      .catch(err => console.error(err));
    }
  }, [activeTab, token, user, navigate]);

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
        toast.success(`Appointment marked as ${status}`);
      } else {
        toast.error(`Failed to update appointment`);
      }
    } catch (err) {
      toast.error(`An error occurred.`);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profileData,
          experienceYears: profileData.experienceYears ? parseInt(profileData.experienceYears) : undefined,
          consultationFee: profileData.consultationFee ? parseFloat(profileData.consultationFee) : undefined,
        })
      });
      if (res.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (err) {
      toast.error('Error updating profile.');
    }
    setIsSavingProfile(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">PENDING</span>;
      case 'CONFIRMED': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">CONFIRMED</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-200">CANCELLED</span>;
      case 'COMPLETED': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">COMPLETED</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  if (!user) return null;

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-[calc(100vh-64px)]">
      
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 z-10 sticky top-16 h-auto md:h-[calc(100vh-64px)]">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">{user.name}</h2>
              <p className="text-xs text-primary-600 font-medium uppercase tracking-wide">{user.role}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'appointments', icon: Calendar, label: 'Appointments' },
              { id: 'profile', icon: Settings, label: 'Settings' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center group
                  ${activeTab === tab.id 
                    ? 'bg-primary-50 text-primary-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <tab.icon className={`w-5 h-5 mr-3 transition-colors ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} /> 
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-5xl mx-auto"
          >
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
                  <p className="text-gray-500 mt-2 text-lg">Here's what's happening with your account today.</p>
                </div>
                
                {user.role === 'LAWYER' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Earnings</p>
                        <p className="text-3xl font-black text-gray-900 mt-2">
                          ${(appointments.filter(a => a.status === 'COMPLETED').length * (profileData.consultationFee || 0)).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                        <DollarSign size={28} />
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Completed Cases</p>
                        <p className="text-3xl font-black text-gray-900 mt-2">
                          {appointments.filter(a => a.status === 'COMPLETED').length}
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                        <CheckCircle size={28} />
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pending Requests</p>
                        <p className="text-3xl font-black text-gray-900 mt-2">
                          {appointments.filter(a => a.status === 'PENDING').length}
                        </p>
                      </div>
                      <div className="bg-amber-100 text-amber-600 p-4 rounded-xl">
                        <Activity size={28} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => setActiveTab('appointments')}>
                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Calendar size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Appointments</h3>
                    <p className="text-gray-500 leading-relaxed">
                      {user.role === 'LAWYER' 
                        ? 'Review your upcoming schedule, confirm new client requests, or update session statuses.' 
                        : 'Check the status of your legal consultations and prepare for upcoming sessions.'}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => setActiveTab('profile')}>
                    <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Settings size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Account Settings</h3>
                    <p className="text-gray-500 leading-relaxed">
                      {user.role === 'LAWYER' 
                        ? 'Keep your professional profile up to date to attract more clients. Update credentials, fees, and bio.' 
                        : 'Update your personal information and contact details.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Your Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage your consultation schedule.</p>
                  </div>
                </div>

                {loadingAppts ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse h-32"></div>
                    ))}
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <FileText className="w-16 h-16 text-gray-200 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Appointments Yet</h3>
                    <p className="text-gray-500 mb-6">
                      {user.role === 'LAWYER' ? "You don't have any consultation requests at the moment." : "You haven't booked any legal consultations yet."}
                    </p>
                    {user.role === 'CLIENT' && (
                      <button onClick={() => navigate('/lawyers')} className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                        Find a Lawyer
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map(apt => (
                      <div key={apt.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 flex-shrink-0">
                            <Clock size={24} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-bold text-lg text-gray-900">
                                {user.role === 'CLIENT' ? apt.lawyer?.name : apt.client?.name}
                              </h4>
                              {getStatusBadge(apt.status)}
                            </div>
                            <div className="text-sm font-medium text-primary-600 flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5"/> {new Date(apt.scheduledAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(apt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              <span className="mx-2 text-gray-300">|</span>
                              {apt.type === 'VIDEO' && <><Video className="w-4 h-4 mr-1"/> Video</>}
                              {apt.type === 'AUDIO' && <><Phone className="w-4 h-4 mr-1"/> Audio</>}
                              {apt.type === 'CHAT' && <><MessageSquare className="w-4 h-4 mr-1"/> Chat</>}
                            </div>
                            {apt.notes && (
                              <p className="text-gray-600 mt-3 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 italic">"{apt.notes}"</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                          {apt.documentUrl && (
                            <button 
                              onClick={() => {
                                fetch(`http://localhost:5000/api/appointments/${apt.id}/document`, {
                                  headers: { 'Authorization': `Bearer ${token}` }
                                })
                                .then(res => {
                                  if (!res.ok) throw new Error('Failed to download');
                                  return res.blob();
                                })
                                .then(blob => {
                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `Document_${apt.id}`;
                                  a.click();
                                  window.URL.revokeObjectURL(url);
                                })
                                .catch(err => toast.error('Error downloading document'));
                              }}
                              className="flex items-center bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold transition"
                            >
                              <FileText size={16} className="mr-1.5 text-gray-500" /> Document
                            </button>
                          )}
                          {user.role === 'LAWYER' && apt.status === 'PENDING' && (
                            <>
                              <button onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')} className="flex items-center bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold transition">
                                <CheckCircle size={16} className="mr-1.5" /> Accept
                              </button>
                              <button onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')} className="flex items-center bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold transition">
                                <XCircle size={16} className="mr-1.5" /> Decline
                              </button>
                            </>
                          )}
                          {user.role === 'CLIENT' && (apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                            <button onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')} className="flex items-center bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold transition">
                              Cancel
                            </button>
                          )}
                          {user.role === 'CLIENT' && apt.status === 'COMPLETED' && (
                            <button onClick={() => navigate(`/lawyers/${apt.lawyerId}`)} className="flex items-center bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-lg text-sm font-bold transition">
                              <Star size={16} className="mr-1.5" /> Leave Review
                            </button>
                          )}
                          {user.role === 'LAWYER' && apt.status === 'CONFIRMED' && (
                            <button onClick={() => updateAppointmentStatus(apt.id, 'COMPLETED')} className="flex items-center bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 px-4 py-2 rounded-lg text-sm font-bold transition">
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <div className="mb-8 border-b border-gray-200 pb-4">
                  <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
                  <p className="text-gray-500 mt-1">Update your personal and professional information.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-3xl">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input type="text" value={profileData.name || ''} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input type="email" value={profileData.email || ''} onChange={e => setProfileData({...profileData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-gray-50 text-gray-500" required disabled />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                      </div>
                    </div>

                    {user.role === 'LAWYER' && (
                      <>
                        <div className="border-t border-gray-100 pt-6 mt-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Bar Registration Number</label>
                              <input type="text" value={profileData.barRegistrationNumber || ''} onChange={e => setProfileData({...profileData, barRegistrationNumber: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" required />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                              <input type="text" value={profileData.location || ''} onChange={e => setProfileData({...profileData, location: e.target.value})} placeholder="e.g. New York, NY" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Experience (Years)</label>
                              <input type="number" min="0" value={profileData.experienceYears || ''} onChange={e => setProfileData({...profileData, experienceYears: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" required />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Hourly Fee ($)</label>
                              <input type="number" min="0" value={profileData.consultationFee || ''} onChange={e => setProfileData({...profileData, consultationFee: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" required />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Education</label>
                              <input type="text" value={profileData.education || ''} onChange={e => setProfileData({...profileData, education: e.target.value})} placeholder="e.g. Harvard Law School" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Languages Spoken</label>
                              <input type="text" value={profileData.languages || ''} onChange={e => setProfileData({...profileData, languages: e.target.value})} placeholder="e.g. English, Spanish" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" />
                            </div>
                          </div>

                          <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Specialties</label>
                            <input type="text" value={profileData.specialties || ''} onChange={e => setProfileData({...profileData, specialties: e.target.value})} placeholder="e.g. Corporate Law, M&A" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio</label>
                            <textarea rows={5} value={profileData.bio || ''} onChange={e => setProfileData({...profileData, bio: e.target.value})} placeholder="Tell clients about your background and approach..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none"></textarea>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isSavingProfile} 
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded-xl transition flex items-center shadow-sm disabled:opacity-70"
                      >
                        {isSavingProfile ? (
                          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Saving...</>
                        ) : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
