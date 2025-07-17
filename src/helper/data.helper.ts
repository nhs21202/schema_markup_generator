import { JsonLDData } from "../types/jsonld-data.type";

const trimString = (value: string | undefined | null): string => {
  if (!value) return "";
  return value.trim();
};

export const toJsonLDProduct = (data: JsonLDData) => {
  const selectedFields = data.selectedOptions.reduce((acc, key) => {
    const value = data[key as keyof JsonLDData] as string;
    acc[key] = trimString(value);
    return acc;
  }, {} as Record<string, string>);

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: trimString(data.productName),
    image: trimString(data.imageUrl),
    description: trimString(data.description),
        ...selectedFields,

    brand: {
      "@type": "Brand",
      name: trimString(data.brand),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.ratingValue,
      reviewCount: data.ratingCount,
      bestRating: data.highestRatingAllowed,
      worstRating: data.lowestRatingAllowed,
    },
    ...(data.reviews.length > 0 && {
      review: data.reviews.map((review) => ({
        "@type": "Review",
        name: trimString(review.reviewTitle),
        reviewBody: trimString(review.reviewBody),
        ...(review.rating > 0 && {
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: data.highestRatingAllowed,
            worstRating: data.lowestRatingAllowed,
          },
        }),
        datePublished: trimString(review.date),
        author: {
          "@type": "Person",
          name: trimString(review.author),
        },
        publisher: {
          "@type": "Organization",
          name: trimString(review.publisher),
        },
      })),
    }),
  };
};
  