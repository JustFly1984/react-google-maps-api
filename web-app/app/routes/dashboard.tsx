import { loadStripe } from '@stripe/stripe-js';
import { Calendar, Check, Copy, Key, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import * as v from 'valibot';
import { CheckoutResponseSchema, LicensesResponseSchema } from '../../shared/schemas';
import { useAuth } from '../contexts/auth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
const YEARLY_LICENSE_PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID || '';

interface License {
  id: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchLicenses();
    }
  }, [user]);

  const fetchLicenses = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/licenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const result = v.safeParse(LicensesResponseSchema, data);
        if (result.success) {
          setLicenses(result.output.licenses);
        }
      }
    } catch (error) {
      console.error('Error fetching licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) return;
    setPurchaseLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId: YEARLY_LICENSE_PRICE_ID }),
      });

      const data = await response.json();
      const result = v.safeParse(CheckoutResponseSchema, data);

      if (result.success) {
        const stripe = await stripePromise;
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId: result.output.sessionId });
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setPurchaseLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user.fullName || user.email}!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Licenses
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                ) : licenses.length === 0 ? (
                  <div className="text-center py-8">
                    <Key className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No licenses yet
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Purchase a commercial license to use React Google Maps API
                      in your projects.
                    </p>
                    <button
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className="mt-6 btn-primary"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {purchaseLoading ? 'Processing...' : 'Purchase License'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {licenses.map((license) => (
                      <div
                        key={license.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Key className="h-5 w-5 text-blue-600" />
                              <span className="font-mono font-medium">
                                {license.serialNumber}
                              </span>
                              <button
                                onClick={() => copyToClipboard(license.serialNumber)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                {copied === license.serialNumber ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Expires:{' '}
                                {new Date(license.expiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              license.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {license.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handlePurchase}
                  disabled={purchaseLoading}
                  className="w-full btn-primary"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {purchaseLoading ? 'Processing...' : 'Purchase License'}
                </button>
                <Link to="/docs" className="w-full btn-secondary block text-center">
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
