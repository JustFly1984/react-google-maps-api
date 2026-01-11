import { Check } from 'lucide-react';
import { Link } from 'react-router';

const features = [
  'Full access to all components',
  'Commercial use license',
  'Priority email support',
  'Access to premium examples',
  'One year of updates',
  'Unlimited projects',
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get a commercial license to use React Google Maps API in your
            production applications.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="card p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600" />

            <h2 className="text-2xl font-bold text-gray-900">Commercial License</h2>
            <p className="mt-2 text-gray-600">Perfect for production apps</p>

            <div className="mt-6">
              <span className="text-5xl font-bold text-gray-900">$12</span>
              <span className="text-gray-600">/year</span>
            </div>

            <ul className="mt-8 space-y-4 text-left">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/signup" className="mt-8 w-full btn-primary py-3 block">
              Get Started
            </Link>

            <p className="mt-4 text-sm text-gray-500">
              30-day money-back guarantee
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Open Source Usage
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            React Google Maps API is free for open source projects. If you're
            building something for the community, you can use it without a
            license.
          </p>
        </div>
      </div>
    </div>
  );
}
