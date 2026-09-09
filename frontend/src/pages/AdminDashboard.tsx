import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Users, Calendar as CalendarIcon, 
  LayoutDashboard, UserCheck, Activity, 
  Briefcase, CheckCircle, Clock, Search, Video, Phone, MessageSquare, BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
  const [stats, setStats] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [unverifiedLawyers, setUnverifiedLawyers] = useState<any[]>([]);
  const [allAppointments, setAllAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        if (activeTab === 'overview' || activeTab === 'analytics') {
          const res = await fetch('http://localhost:5000/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } });
          setStats(await res.json());
        } else if (activeTab === 'users') {
          const res = await fetch('http://localhost:5000/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } });
          setAllUsers(await res.json());
        } else if (activeTab === 'lawyers') {
          const res = await fetch('http://localhost:5000/api/admin/lawyers/unverified', { headers: { 'Authorization': `Bearer ${token}` } });
          setUnverifiedLawyers(await res.json());
        } else if (activeTab === 'appointments') {
          const res = await fetch('http://localhost:5000/api/admin/appointments', { headers: { 'Authorization': `Bearer ${token}` } });
          setAllAppointments(await res.json());
        }
      } catch (err) {
        toast.error("Failed to fetch admin data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, token]);

  const handleVerify = async (lawyerId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/lawyers/${lawyerId}/verify`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUnverifiedLawyers(prev => prev.filter(l => l.id !== lawyerId));
        toast.success("Lawyer verified successfully!");
      }
    } catch (err) {
      toast.error("Error verifying lawyer");
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const statusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">PENDING</span>;
      case 'CONFIRMED': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">CONFIRMED</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-200">CANCELLED</span>;
      case 'COMPLETED': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">COMPLETED</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-[calc(100vh-64px)]">
      
      <div className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 z-10 sticky top-16 h-auto md:h-[calc(100vh-64px)]">
        <div className="p-6">
          <div className="text-xl font-black text-white flex items-center mb-8 tracking-wide">
            <ShieldCheck className="mr-2 text-primary-400" /> ADMIN PORTAL
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'users', icon: Users, label: 'All Users' },
              { id: 'lawyers', icon: UserCheck, label: 'Verifications', badge: unverifiedLawyers.length },
              { id: 'appointments', icon: CalendarIcon, label: 'Appointments' },
              { id: 'analytics', icon: BarChart2, label: 'Analytics' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center group
                  ${activeTab === tab.id 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <tab.icon className={`w-5 h-5 mr-3 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-primary-400'}`} /> 
                {tab.label}
                {tab.badge ? (
                  <span className={`ml-auto py-0.5 px-2 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white text-primary-600' : 'bg-gray-700 text-white'}`}>
                    {tab.badge}
                  </span>
                ) : null}
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
            className="max-w-6xl mx-auto"
          >
            
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                <div className="mb-8 border-b border-gray-200 pb-4">
                  <h1 className="text-3xl font-extrabold text-gray-900">Platform Overview</h1>
                  <p className="text-gray-500 mt-1">High-level metrics and system activity.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Clients', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Total Lawyers', value: stats.totalLawyers, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                    { label: 'Pending Verifications', value: stats.pendingVerifications, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-100' },
                    { label: 'Total Appointments', value: stats.totalAppointments, icon: CalendarIcon, color: 'text-emerald-600', bg: 'bg-emerald-100' }
                  ].map((stat, idx) => (
                    <motion.div key={idx} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-4xl font-black text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                        <stat.icon size={28} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                  <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-400" /> Recent Activity (Appointments)
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {stats.recentAppointments.map((apt: any) => (
                      <div key={apt.id} className="p-5 hover:bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center transition">
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            <span className="text-primary-600">{apt.client.name}</span> <span className="text-gray-400 font-normal px-2">booked with</span> <span className="text-secondary-600">{apt.lawyer.name}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" /> {new Date(apt.scheduledAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                            <span className="mx-2 text-gray-300">•</span>
                            {apt.type === 'VIDEO' && <Video className="w-3.5 h-3.5 mr-1" />}
                            {apt.type === 'AUDIO' && <Phone className="w-3.5 h-3.5 mr-1" />}
                            {apt.type === 'CHAT' && <MessageSquare className="w-3.5 h-3.5 mr-1" />}
                            <span className="text-xs">{apt.type}</span>
                          </p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          {statusBadge(apt.status)}
                        </div>
                      </div>
                    ))}
                    {stats.recentAppointments.length === 0 && (
                      <div className="p-12 text-center text-gray-500">No recent activity found.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">View all registered accounts on the platform.</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 uppercase tracking-wider text-xs">User Details</th>
                          <th className="px-6 py-4 uppercase tracking-wider text-xs">Role</th>
                          <th className="px-6 py-4 uppercase tracking-wider text-xs">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {allUsers.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900">{u.name}</div>
                              <div className="text-gray-500 text-xs mt-0.5">{u.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border
                                ${u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                                ${u.role === 'LAWYER' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                                ${u.role === 'CLIENT' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                              `}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">{new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lawyers' && (
              <div>
                <div className="mb-8 border-b border-gray-200 pb-4">
                  <h1 className="text-3xl font-extrabold text-gray-900">Pending Verifications</h1>
                  <p className="text-gray-500 mt-1">Review and approve lawyer profiles to allow them to practice on the platform.</p>
                </div>

                {unverifiedLawyers.length === 0 ? (
                  <div className="bg-white p-16 text-center rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Inbox Zero!</h3>
                    <p className="text-gray-500 text-lg">There are currently no pending lawyer verifications.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {unverifiedLawyers.map(lawyer => (
                      <div key={lawyer.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                              {lawyer.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-900">{lawyer.name}</h3>
                              <p className="text-sm text-gray-500">{lawyer.email}</p>
                            </div>
                          </div>
                          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-200">AWAITING REVIEW</span>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex-grow">
                          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Submitted Credentials</h4>
                          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                            <div>
                              <span className="block text-gray-500 text-xs mb-0.5">Bar Registration</span>
                              <span className="font-bold text-gray-900">{lawyer.lawyerProfile?.barRegistrationNumber || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="block text-gray-500 text-xs mb-0.5">Experience</span>
                              <span className="font-bold text-gray-900">{lawyer.lawyerProfile?.experienceYears || 0} Years</span>
                            </div>
                            <div className="col-span-2">
                              <span className="block text-gray-500 text-xs mb-0.5">Location</span>
                              <span className="font-bold text-gray-900">{lawyer.lawyerProfile?.location || 'N/A'}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="block text-gray-500 text-xs mb-0.5">Specialties</span>
                              <span className="font-bold text-gray-900 leading-relaxed block">{lawyer.lawyerProfile?.specialties || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleVerify(lawyer.id)}
                          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold transition flex justify-center items-center mt-auto"
                        >
                          <UserCheck className="w-5 h-5 mr-2" /> Approve & Grant Access
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div>
                <div className="mb-8 border-b border-gray-200 pb-4">
                  <h1 className="text-3xl font-extrabold text-gray-900">System Appointments</h1>
                  <p className="text-gray-500 mt-1">Master view of all consultations scheduled on the platform.</p>
                </div>

                {allAppointments.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
                    <CalendarIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No appointments have been booked yet.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 uppercase tracking-wider text-xs">Date & Time</th>
                            <th className="px-6 py-4 uppercase tracking-wider text-xs">Client</th>
                            <th className="px-6 py-4 uppercase tracking-wider text-xs">Lawyer</th>
                            <th className="px-6 py-4 uppercase tracking-wider text-xs">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {allAppointments.map(apt => (
                            <tr key={apt.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-bold text-gray-900">
                                  {new Date(apt.scheduledAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="text-gray-500 text-xs mt-0.5 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" /> {new Date(apt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  <span className="mx-2 text-gray-300">•</span>
                                  {apt.type === 'VIDEO' && <Video className="w-3 h-3 mr-1" />}
                                  {apt.type === 'AUDIO' && <Phone className="w-3 h-3 mr-1" />}
                                  {apt.type === 'CHAT' && <MessageSquare className="w-3 h-3 mr-1" />}
                                  {apt.type}
                                </div>
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900">{apt.client?.name}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{apt.lawyer?.name}</td>
                              <td className="px-6 py-4">
                                {statusBadge(apt.status)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && stats && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-extrabold text-gray-900">Platform Analytics</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Consultation Trends (Last 6 Months)</h3>
                    <div className="h-80">
                      {stats?.trendData ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={stats.trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey="consultations" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">Not enough data to display</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Appointments by Status</h3>
                    <div className="h-80 flex items-center justify-center">
                      {stats?.appointmentsByStatus && stats.appointmentsByStatus.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stats.appointmentsByStatus}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={110}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {stats.appointmentsByStatus.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">No appointment data available</div>
                      )}
                    </div>
                    {stats?.appointmentsByStatus && (
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {stats.appointmentsByStatus.map((entry: any, index: number) => (
                          <div key={entry.name} className="flex items-center text-sm text-gray-600">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            {entry.name} ({entry.value})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
