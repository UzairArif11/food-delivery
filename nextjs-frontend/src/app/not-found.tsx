import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Animation/Icon */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
            <div className="w-24 h-24 mx-auto mb-6">
              <svg className="w-full h-full text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 2.152.878 4.1 2.291 5.5L4 20l5.5-.291z" />
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              🏠 Go to Home Page
            </Link>
            <Link 
              href="/menu" 
              className="inline-block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              🍽️ Browse Menu
            </Link>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Need help? <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">Contact us</Link></p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
