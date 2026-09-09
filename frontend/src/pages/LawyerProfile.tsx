import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, Briefcase, Calendar, Clock, GraduationCap, Languages, User, MessageSquare, Phone, Video } from 'lucide-react';
import toast from 'react-hot-toast';

const LawyerProfile = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('VIDEO');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingDocument, setBookingDocument] = useState<File | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchLawyer = () => {
    fetch(`http://localhost:5000/api/lawyers/${id}`)
      .then(res => res.json())
      .then(data => {
        setLawyer(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error('Failed to load lawyer profile.');
      });
  };

  useEffect(() => {
    fetchLawyer();
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to book an appointment.');
      navigate('/login');
      return;
    }
    
    setIsBooking(true);
    try {
      const formData = new FormData();
      formData.append('lawyerId', id!);
      formData.append('scheduledAt', bookingDate);
      formData.append('type', bookingType);
      formData.append('notes', bookingNotes);
      if (bookingDocument) {
        formData.append('document', bookingDocument);
      }

      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Appointment booked successfully!');
        setBookingDate('');
        setBookingNotes('');
        setBookingDocument(null);
        navigate('/dashboard');
      } else {
        toast.error(data.error || 'Failed to book appointment.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const res = await fetch(`http://localhost:5000/api/lawyers/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Review submitted successfully!');
        setReviewComment('');
        setReviewRating(5);
        fetchLawyer(); // Refresh to show new review
      } else {
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-100 flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-3 mt-2">
              <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded mt-4"></div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-96 bg-gray-100"></div>
        </div>
      </div>
    );
  }

  if (!lawyer || lawyer.error) {
    return <div className="text-center py-20 text-xl text-gray-500">Lawyer not found</div>;
  }

  const profile = lawyer.lawyerProfile;
  const reviews = lawyer.reviewsReceived || [];
  const averageRating = reviews.length 
    ? (reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : 'New';

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-primary-900 h-48 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {profile?.imageUrl ? (
                  <img src={profile.imageUrl} alt={lawyer.name} className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white -mt-16 sm:mt-0" />
                ) : (
                  <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shadow-md border-4 border-white -mt-16 sm:mt-0">
                    <User size={64} />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">{lawyer.name}</h1>
                    <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                      <Star size={20} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{averageRating}</span>
                      <span className="text-sm text-gray-500">({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})</span>
                    </div>
                  </div>
                  <p className="text-primary-600 font-medium text-lg mt-1">{profile?.specialties}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    {profile?.location && (
                      <div className="flex items-center"><MapPin size={16} className="mr-1.5 text-gray-400" /> {profile.location}</div>
                    )}
                    <div className="flex items-center"><Briefcase size={16} className="mr-1.5 text-gray-400" /> {profile?.experienceYears} Years Exp.</div>
                    {profile?.isVerified && (
                      <div className="flex items-center text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md"><Star size={16} className="mr-1.5" /> Verified</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{profile?.bio}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Credentials & Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {profile?.education && (
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-lg mr-4 text-gray-600"><GraduationCap size={20} /></div>
                      <div>
                        <h4 className="font-medium text-gray-900">Education</h4>
                        <p className="text-gray-500 text-sm mt-0.5">{profile.education}</p>
                      </div>
                    </div>
                  )}
                  {profile?.languages && (
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-lg mr-4 text-gray-600"><Languages size={20} /></div>
                      <div>
                        <h4 className="font-medium text-gray-900">Languages</h4>
                        <p className="text-gray-500 text-sm mt-0.5">{profile.languages}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4 text-gray-600"><Briefcase size={20} /></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bar Registration</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{profile?.barRegistrationNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Practice Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {profile?.domains?.map((d: any) => (
                    <span key={d.domain.id} className="bg-secondary-50 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full text-sm font-medium">
                      {d.domain.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Reviews</h2>
                
                {reviews.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-100">
                    <Star size={32} className="mx-auto mb-3 text-gray-300" />
                    <p>No reviews yet. Be the first to leave a review after your consultation!</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{review.client?.name}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={16} className={star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-200"} />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-gray-600 leading-relaxed text-sm">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {user?.role === 'CLIENT' && (
                  <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 mt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star size={28} className={star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment (Optional)</label>
                        <textarea
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Share your experience working with this lawyer..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-70"
                      >
                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Consultation Fee</p>
                <div className="text-4xl font-bold text-gray-900">${profile?.consultationFee || 0}</div>
                <p className="text-sm text-gray-500 mt-1">per 60-minute session</p>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-4">Book an Appointment</h3>
              
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="datetime-local"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingType('VIDEO')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${bookingType === 'VIDEO' ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      <Video size={20} className="mb-1" />
                      <span className="text-xs font-bold">Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('AUDIO')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${bookingType === 'AUDIO' ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      <Phone size={20} className="mb-1" />
                      <span className="text-xs font-bold">Audio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('CHAT')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${bookingType === 'CHAT' ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      <MessageSquare size={20} className="mb-1" />
                      <span className="text-xs font-bold">Chat</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for consultation</label>
                  <textarea
                    required
                    rows={3}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Briefly describe your legal issue..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attach Document (Optional)</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setBookingDocument(e.target.files[0]);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload PDF, DOCX, or Images</p>
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition flex justify-center items-center"
                >
                  {isBooking ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Request Consultation"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
