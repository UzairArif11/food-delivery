import Script from 'next/script';

const StructuredData = () => {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Shangrila Restaurant",
    "alternateName": "shangrilaresturant",
    "description": "Since 1989, Shangrila has been Lahore's go-to destination for authentic Pakistani cuisine. Founded by Muhammad Zafar and now run by Chaudhary Ishrat Mahmood.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/logo192.png`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/assets/images/og-image.jpg`,
    "telephone": "+92-42-123-4567",
    "email": "info@shangrilaresturant.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mozang Anarkali",
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
    "priceRange": "$$",
    "servesCuisine": ["Pakistani", "Desi", "South Asian"],
    "acceptsReservations": true,
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
      "https://facebook.com/shangrilaresturant",
      "https://instagram.com/shangrilaresturant",
      "https://twitter.com/shangrilaresturant"
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
