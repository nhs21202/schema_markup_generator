export type JsonLDData = {
  productName: string;
  imageUrl: string;
  brand: string;
  description: string;
  sku: string;
  gtin8: string;
  gtin13: string;
  gtin14: string;
  mpn: string;
  isbn: string;
  ratingValue: number;
  ratingCount: number;
  selectedOptions: string[];
  inputValue?: string;
  highestRatingAllowed: number;
  lowestRatingAllowed: number;
  reviews: ReviewData[];
};

export type ReviewData = {
  reviewTitle: string;
  reviewBody: string;
  rating: number;
  date: string;
  author: string;
  publisher: string;
};