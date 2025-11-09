/**
 * @component CallbackRequestsView
 * @description Admin view for managing customer callback requests
 */
import { useState, useEffect } from 'react';
import { Phone, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface CallbackRequest {
  id: string;
  phone_number: string;
  created_at: string;
  called_at: string | null;
  status: 'pending' | 'called' | 'failed' | 'cancelled';
  notes: string | null;
  user_id: string | null;
}

export default function CallbackRequestsView() {
  const [requests, setRequests] = useState<CallbackRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'called'>('pending');

  // Fetch callback requests
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('callback_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'pending') {
        query = query.eq('status', 'pending');
      } else if (filter === 'called') {
        query = query.eq('status', 'called');
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching callback requests:', error);
        toast.error('Failed to load callback requests');
        return;
      }

      setRequests(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Update request status
  const updateRequestStatus = async (
    id: string,
    status: 'called' | 'failed' | 'cancelled',
    notes?: string
  ) => {
    try {
      const updateData: any = {
        status,
        called_at: status === 'called' ? new Date().toISOString() : null,
      };

      if (notes) {
        updateData.notes = notes;
      }

      const { error } = await supabase
        .from('callback_requests')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating callback request:', error);
        toast.error('Failed to update callback request');
        return;
      }

      toast.success('Callback request updated');
      fetchRequests();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  // Calculate time difference
  const getTimeDifference = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Check if request is overdue (>5 minutes)
  const isOverdue = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    return diffInMinutes > 5;
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Phone className="w-7 h-7 text-amber-600" />
            Callback Requests
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage customer callback requests from Digital Gold page
          </p>
        </div>
        <button
          onClick={fetchRequests}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition-all ${
            filter === 'all'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-600 hover:text-amber-600'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 font-medium transition-all ${
            filter === 'pending'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-600 hover:text-amber-600'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('called')}
          className={`px-4 py-2 font-medium transition-all ${
            filter === 'called'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-600 hover:text-amber-600'
          }`}
        >
          Called
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading callback requests...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && requests.length === 0 && (
        <div className="text-center py-12">
          <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No callback requests found</p>
        </div>
      )}

      {/* Requests List */}
      {!isLoading && requests.length > 0 && (
        <div className="space-y-4">
          {requests.map((request) => {
            const overdue = request.status === 'pending' && isOverdue(request.created_at);

            return (
              <div
                key={request.id}
                className={`border rounded-lg p-4 transition-all ${
                  overdue
                    ? 'border-red-300 bg-red-50'
                    : request.status === 'pending'
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <a
                        href={`tel:${request.phone_number}`}
                        className="text-lg font-bold text-gray-900 hover:text-amber-600 transition-colors"
                      >
                        {request.phone_number}
                      </a>

                      {/* Status Badge */}
                      {request.status === 'pending' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {request.status === 'called' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Called
                        </span>
                      )}
                      {request.status === 'failed' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </span>
                      )}

                      {/* Overdue Badge */}
                      {overdue && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-200 text-red-900 text-xs font-bold rounded-full animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          OVERDUE!
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Requested:</span>{' '}
                        {new Date(request.created_at).toLocaleString()} ({getTimeDifference(request.created_at)})
                      </p>
                      {request.called_at && (
                        <p>
                          <span className="font-medium">Called at:</span>{' '}
                          {new Date(request.called_at).toLocaleString()}
                        </p>
                      )}
                      {request.notes && (
                        <p>
                          <span className="font-medium">Notes:</span> {request.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {request.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          const notes = prompt('Add notes (optional):');
                          updateRequestStatus(request.id, 'called', notes || undefined);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium text-sm"
                      >
                        Mark as Called
                      </button>
                      <button
                        onClick={() => {
                          const notes = prompt('Reason for failure:');
                          if (notes) {
                            updateRequestStatus(request.id, 'failed', notes);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
                      >
                        Mark as Failed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
