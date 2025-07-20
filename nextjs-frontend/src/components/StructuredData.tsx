import Script from 'next/script';

const StructuredData = () => {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "FoodDelivery",
    "description": "Delicious food delivered fast with fresh ingredients and exceptional service",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/logo192.png`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/assets/images/og-image.jpg`,
    "telephone": "+92-42-123-4567",
    "email": "info@fooddelivery.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "H856+M3J, Mozang Chungi",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.5598980",
      "longitude": "74.3101817"
    },
    "openingHours": [
      "Mo-Su 09:00-23:00"
    ],
    "priceRange": "$",
    "servesCuisine": "International",
    "acceptsReservations": false,
    "hasDeliveryService": {
      "@type": "DeliveryService",
      "deliveryArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "31.5598980",
          "longitude": "74.3101817"
        },
        "geoRadius": "10 km"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    },
    "sameAs": [
      "https://facebook.com/fooddelivery",
      "https://instagram.com/fooddelivery",
      "https://twitter.com/fooddelivery"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
      }
    ]
  };

  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
};

export default StructuredData;
