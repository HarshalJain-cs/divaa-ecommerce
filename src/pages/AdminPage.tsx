/**
 * @page AdminPage
 * @description Admin dashboard for gift card management
 */

import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, CreditCard, Users, Download, Search, Lock } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/ui/Header';
import { supabase } from '@/lib/supabase';
import type { AdminStats } from '@/types/admin.types';
import type { GiftCard } from '@/types/giftcard.types';

// Admin credentials (hardcoded for Phase 1)
const ADMIN_USERNAME = 'harry';
const ADMIN_PASSWORD = 'diva.saj';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState<AdminStats>({
    total_cards: 0,
    active_cards: 0,
    total_revenue: 0,
    total_redeemed: 0,
    cards_this_month: 0,
    revenue_this_month: 0,
  });
  const [recentCards, setRecentCards] = useState<GiftCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Check if already authenticated (in localStorage)
  useEffect(() => {
    const authToken = localStorage.getItem('admin_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'authenticated');
        toast.success('Login successful!');
        loadDashboardData();
      } else {
        toast.error('Invalid username or password');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    toast.success('Logged out successfully');
  };

  // Load dashboard data
  const loadDashboardData = async () => {
    setIsLoadingDashboard(true);

    try {
      // Fetch all gift cards
      const { data: cards, error } = await supabase
        .from('gift_cards')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching cards:', error);
        toast.error('Failed to load dashboard data');
        return;
      }

      // Calculate stats
      const { data: allCards } = await supabase
        .from('gift_cards')
        .select('*');

      if (allCards) {
        const total_revenue = allCards.reduce((sum, card) => sum + card.original_amount, 0);
        const total_redeemed = allCards.reduce((sum, card) => sum + (card.original_amount - card.current_balance), 0);
        const active_cards = allCards.filter(card => card.status === 'active').length;

        // Cards this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        const cardsThisMonth = allCards.filter(card => new Date(card.created_at) >= thisMonth);
        const cards_this_month = cardsThisMonth.length;
        const revenue_this_month = cardsThisMonth.reduce((sum, card) => sum + card.original_amount, 0);

        setStats({
          total_cards: allCards.length,
          active_cards,
          total_revenue,
          total_redeemed,
          cards_this_month,
          revenue_this_month,
        });
      }

      setRecentCards(cards || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  // Filter recent cards by search term
  const filteredCards = recentCards.filter(card =>
    card.card_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.recipient_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Login form
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            {/* Logo/Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B76E79] rounded-full mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
              <p className="text-gray-600">Gift Card Management Portal</p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-gradient-to-r from-[#B76E79] to-[#DE5D83] text-white font-bold rounded-lg hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Login
                    </>
                  )}
                </button>
              </form>

              {/* Phase 1 Note */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <strong>Phase 1 Note:</strong> Using hardcoded credentials. Full authentication system coming in Phase 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Admin Dashboard
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Gift Card Management & Analytics</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-semibold">Total Gift Cards</h3>
                <CreditCard className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.total_cards}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.active_cards} active cards</p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-semibold">Total Revenue</h3>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                ₹{stats.total_revenue.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ₹{stats.total_redeemed.toLocaleString('en-IN')} redeemed
              </p>
            </div>

            {/* This Month */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-semibold">This Month</h3>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.cards_this_month}</p>
              <p className="text-sm text-gray-500 mt-1">
                ₹{stats.revenue_this_month.toLocaleString('en-IN')} revenue
              </p>
            </div>
          </div>

          {/* Recent Gift Cards */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Gift Cards</h2>
              <div className="flex gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cards..."
                    className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] outline-none"
                  />
                </div>

                {/* Export Button (placeholder) */}
                <button className="flex items-center gap-2 px-4 py-2 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Cards Table */}
            {isLoadingDashboard ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#B76E79] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading dashboard...</p>
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No gift cards found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Card Number</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Recipient</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Balance</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCards.map((card) => (
                      <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-gray-800">{card.card_number}</td>
                        <td className="px-4 py-3 text-sm">
                          <div>
                            <p className="font-semibold text-gray-800">{card.recipient_name}</p>
                            <p className="text-xs text-gray-500">{card.recipient_email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                          ₹{card.original_amount.toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">
                          ₹{card.current_balance.toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            card.status === 'active' ? 'bg-green-100 text-green-700' :
                            card.status === 'used' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {card.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(card.created_at).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Phase 1 Note */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-2">Phase 1 - Limited Functionality</h3>
            <p className="text-sm text-blue-800 mb-2">
              This is a basic admin dashboard. Additional features coming in Phase 2:
            </p>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Advanced analytics and charts</li>
              <li>Card editing and management</li>
              <li>Bulk operations</li>
              <li>Promo code management</li>
              <li>Export to CSV/PDF</li>
              <li>Email notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
