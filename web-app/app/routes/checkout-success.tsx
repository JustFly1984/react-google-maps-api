import { Check, CheckCircle, Copy, Key } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import * as v from 'valibot';
import { LicenseResponseSchema } from '../../shared/schemas';

interface License {
  id: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
}

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchLicense();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchLicense = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/licenses/by-session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const result = v.safeParse(LicenseResponseSchema, data);
        if (result.success) {
          setLicense(result.output.license);
        }
      }
    } catch (error) {
      console.error('Error fetching license:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (license) {
      navigator.clipboard.writeText(license.serialNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your license is now active.
        </p>

        {license && (
          <div className="card p-6 mb-8 text-left">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Key className="h-4 w-4" />
              License Key
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <code className="flex-1 font-mono text-sm font-medium">
                {license.serialNumber}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Valid until {new Date(license.expiryDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/docs" className="btn-secondary">
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
