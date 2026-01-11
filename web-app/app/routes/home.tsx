import { ArrowRight, Code, Map, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router';

const features = [
  {
    name: 'Easy Integration',
    description: 'Drop-in React components for Google Maps with full TypeScript support.',
    icon: Code,
  },
  {
    name: 'High Performance',
    description: 'Optimized for performance with lazy loading and efficient re-renders.',
    icon: Zap,
  },
  {
    name: 'Commercial License',
    description: 'Affordable yearly license for commercial use with priority support.',
    icon: Shield,
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <Map className="h-4 w-4" />
              React Google Maps API
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Google Maps for{' '}
              <span className="text-blue-600">React</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              The most popular React library for Google Maps. Build beautiful,
              interactive maps with ease using our comprehensive component library.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs" className="btn-primary text-base px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary text-base px-8 py-3">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose React Google Maps API?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built for modern React applications with developer experience in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="card p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start building beautiful maps today with our comprehensive
              documentation and examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-base px-8 py-3">
                Create Account
              </Link>
              <Link to="/docs" className="btn-secondary text-base px-8 py-3">
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
