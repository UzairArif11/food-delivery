import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Founded in 1989 by Muhammad Zafar, Shangrila Restaurant has been serving authentic Pakistani cuisine in Lahore for over three decades. Now proudly run by Chaudhary Ishrat Mahmood.',
  keywords: 'shangrila restaurant history, muhammad zafar, chaudhary ishrat mahmood, lahore restaurant, pakistani cuisine, authentic desi food, family-owned restaurant',
  openGraph: {
    title: 'About Us | shangrilaresturant',
    description: 'Discover the story of Shangrila Restaurant - a family legacy of authentic Pakistani cuisine since 1989.',
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
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over three decades, Shangrila has served the heart of Lahore with unforgettable desi dishes. 
              What started as a small family-owned kitchen is now a culinary icon — welcoming everyone from students and families to advocates and professionals.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Family-Owned Legacy</h2>
              <p className="text-gray-600 mb-4">
                Shangrila was originally founded in 1989 by Muhammad Zafar, who was also the co-founder of the renowned IN-Canel Restaurant in Muslim Town, Lahore. 
                Today, his legacy continues under the leadership of his son, Chaudhary Ishrat Mahmood, who has carried forward the same passion for quality, hospitality, and tradition.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a humble family-owned restaurant quickly became a local treasure, known for delivering the true taste of Pakistani desi food, 
                crafted from recipes passed down through generations. Shangrila's menu is a tribute to the soul of Pakistani cuisine.
              </p>
              <p className="text-gray-600">
                Shangrila is where tradition lives, taste reigns, and every meal tells a story worth sharing. 
                Whether you're a student from a nearby hostel, an advocate from the courts, or a family gathering for dinner — Shangrila feels like home.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/images/ok2.webp"
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
              <h3 className="text-xl font-semibold mb-2">Authentic Desi Taste</h3>
              <p className="text-gray-600">At Shangrila, we take pride in offering some of the best desi flavors in Lahore. From our legendary Fari Daal to rich, home-style vegetable dishes, every plate celebrates traditional Pakistani cuisine.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chef’s Recommendations</h3>
              <p className="text-gray-600">From Shahi Daal to Kalagi and Mutton Joint, every dish is made from timeless recipes with modern-day precision. It's not just food — it's a taste that reminds you of home.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">To bring people together through timeless Pakistani flavors, heartfelt service, and a legacy of quality that spans generations. At Shangrila, we believe great food isn't just eaten — it's experienced, remembered, and shared.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl text-gray-600">👨‍🍳</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Muhammad Zafar</h3>
                <p className="text-gray-600 mb-2">Founder (1989)</p>
                <p className="text-sm text-gray-500">Co-founder of IN-Canel Restaurant, visionary behind Shangrila's authentic taste</p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl text-gray-600">👨‍💼</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Chaudhary Ishrat Mahmood</h3>
                <p className="text-gray-600 mb-2">Current Owner & Manager</p>
                <p className="text-sm text-gray-500">Carrying forward his father's legacy with the same passion for quality and tradition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
