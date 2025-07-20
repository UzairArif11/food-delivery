import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about FoodDelivery, our mission to provide delicious food with exceptional service, and our commitment to quality ingredients.',
  keywords: 'about us, restaurant story, food quality, mission, vision',
  openGraph: {
    title: 'About Us | FoodDelivery',
    description: 'Learn about our mission to provide delicious food with exceptional service.',
    images: ['/assets/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">About FoodDelivery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about delivering not just food, but experiences that bring joy to your table. 
              Our commitment to quality, freshness, and exceptional service drives everything we do.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a simple mission: to make delicious, quality food accessible to everyone. 
                What started as a small kitchen has grown into a beloved food delivery service that serves 
                thousands of happy customers every day.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that great food brings people together, creates memories, and adds joy to everyday moments. 
                That's why we carefully source our ingredients, work with passionate chefs, and ensure every order 
                meets our high standards.
              </p>
              <p className="text-gray-600">
                From our family to yours, we're committed to delivering not just meals, but moments of happiness.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/images/cooking-food-concept-smiling-female-chef-cook-baker-with-fork-tomato-showing-ok-sign 1.png"
                alt="Our chef preparing food with care"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">We use only the freshest ingredients and maintain the highest standards in food preparation.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Your time is valuable. We ensure quick, reliable delivery without compromising quality.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Love</h3>
              <p className="text-gray-600">Every customer is family. We go above and beyond to ensure your satisfaction.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/assets/images/cooking-advertisement-food-concept-smiling-female-chef-cook-baker-holding-something-palm-hand-pointing-finger-it 1.jpg"
                    alt="Head Chef"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-gray-600 mb-2">Head Chef</p>
                <p className="text-sm text-gray-500">15+ years of culinary excellence</p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl text-gray-600">👨‍💼</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <p className="text-gray-600 mb-2">Operations Manager</p>
                <p className="text-sm text-gray-500">Ensuring smooth deliveries</p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl text-gray-600">👩‍💼</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Emily Rodriguez</h3>
                <p className="text-gray-600 mb-2">Customer Success</p>
                <p className="text-sm text-gray-500">Your satisfaction is our priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
