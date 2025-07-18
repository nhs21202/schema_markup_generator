import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Card,
  Text,
  BlockStack,
  Box,
  Divider,
  Button,
  type IconSource,
  Grid,
  InlineGrid,
  ButtonGroup,
} from "@shopify/polaris";
import { useForm } from "react-hook-form";
import ProductForm from "./components/ProductForm";
import type { JsonLDData } from "./types/jsonld-data.type";
import { PlusIcon } from "@shopify/polaris-icons";
import ReviewFormBlock from "./components/ReviewFormBlock";
import { toJsonLDProduct } from "./helper/data.helper";
import HeroBanner from "./components/HeroBanner";
import SchemaDisplay from "./components/SchemaDisplay";

const initialJsonData: JsonLDData = {
  productName: "",
  imageUrl: "",
  brand: "",
  description: "",
  sku: "",
  gtin8: "",
  gtin13: "",
  gtin14: "",
  mpn: "",
  isbn: "",
  ratingValue: 0,
  ratingCount: 0,
  selectedOptions: [],
  highestRatingAllowed: 5,
  lowestRatingAllowed: 1,
  reviews: [],
};
export default function App() {
  const [jsonData, setJsonData] = useState<JsonLDData>(initialJsonData);
  const [isCopied, setIsCopied] = useState(false);

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<JsonLDData>({
    mode: "onChange",
    defaultValues: initialJsonData,
  });

  const highestRatingAllowed = watch("highestRatingAllowed");
  const lowestRatingAllowed = watch("lowestRatingAllowed");

  useEffect(() => {
    if (jsonData.reviews.length > 0) {
      const reviewRatingFields = jsonData.reviews.map(
        (_, index) => `reviews.${index}.rating`
      );
      trigger(reviewRatingFields as (keyof JsonLDData)[]);
    }
  }, [
    highestRatingAllowed,
    lowestRatingAllowed,
    trigger,
    jsonData.reviews.length,
    jsonData.reviews,
  ]);

  const deselectedOptions = useMemo(
    () => [
      { label: "SKU", value: "sku" },
      { label: "GTIN-8", value: "gtin8" },
      { label: "GTIN-13", value: "gtin13" },
      { label: "GTIN-14", value: "gtin14" },
      { label: "MPN", value: "mpn" },
      { label: "ISBN", value: "isbn" },
    ],
    []
  );

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  const filteredOptions = useMemo(() => {
    if (jsonData.inputValue === "") return deselectedOptions;
    const filterRegex = new RegExp(
      escapeSpecialRegExCharacters(jsonData.inputValue || ""),
      "i"
    );
    return deselectedOptions.filter((option) =>
      option.label.match(filterRegex)
    );
  }, [jsonData.inputValue, deselectedOptions, escapeSpecialRegExCharacters]);

  const handleRemoveOption = useCallback((selected: string) => {
    setJsonData((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.filter(
        (option) => option !== selected
      ),
    }));
  }, []);

  const handleSelect = useCallback((selected: string) => {
    setJsonData((prev) => {
      const alreadySelected = prev.selectedOptions.includes(selected);
      return {
        ...prev,
        selectedOptions: alreadySelected
          ? prev.selectedOptions.filter((option) => option !== selected)
          : [...prev.selectedOptions, selected],
        inputValue: "",
      };
    });
  }, []);

  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      let newValue: string | number = value;

      if (
        field === "ratingValue" ||
        field === "ratingCount" ||
        field === "highestRatingAllowed" ||
        field === "lowestRatingAllowed"
      ) {
        const numericValue = Number(value);
        if (Number.isNaN(numericValue)) {
          return;
        }

        if (field === "ratingValue") {
          if (numericValue <= 0 || numericValue > 5) return;
        } else if (field === "ratingCount") {
          if (numericValue < 0) return;
        } else if (
          field === "highestRatingAllowed" ||
          field === "lowestRatingAllowed"
        ) {
          if (numericValue < 1 || numericValue > 5) return;
        }

        newValue = numericValue;
      }

      setValue(field as keyof JsonLDData, newValue);
      setJsonData((prev) => ({ ...prev, [field]: newValue }));
    },
    [setValue]
  );

  const handleReviewFieldChange = useCallback(
    (index: number, field: string, value: string) => {
      const newValue = field === "rating" ? Number(value) : value;
      setValue(`reviews.${index}.${field}` as keyof JsonLDData, newValue);
      setJsonData((prev) => {
        const newReviews = prev.reviews.map((review, i) =>
          i === index
            ? {
                ...review,
                [field]: newValue,
              }
            : review
        );
        return { ...prev, reviews: newReviews };
      });
    },
    [setValue]
  );

  const handleAddReview = useCallback(() => {
    const newReview = {
      reviewTitle: "",
      reviewBody: "",
      rating: lowestRatingAllowed || 1,
      date: "",
      author: "",
      publisher: "",
    };

    setJsonData((prev) => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));
  }, [lowestRatingAllowed]);

  const handleRemoveReview = useCallback((index: number) => {
    setJsonData((prev) => {
      const newReviews = prev.reviews.filter((_, i) => i !== index);
      return { ...prev, reviews: newReviews };
    });
  }, []);

  const jsonLDString = useMemo(() => {
    return `<script type="application/ld+json">\n${JSON.stringify(
      toJsonLDProduct(jsonData),
      null,
      2
    )}\n</script>`;
  }, [jsonData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonLDString);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.log(`Failed to copy: ${err}`);
    }
  };
  return (
    <div>
      <HeroBanner />
      <div style={{ maxWidth: "1400px", margin: "1rem auto", padding: "20px" }}>
        <InlineGrid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} gap="1000">
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
            <Box maxWidth="700px">
              <Card padding={"0"}>
                <BlockStack>
                  <Box
                    paddingBlock="400"
                    paddingInline="500"
                    background="bg-fill-secondary"
                  >
                    <Text variant="headingMd" as="h2">
                      Product details
                    </Text>
                  </Box>
                  <Divider />
                </BlockStack>
                <Box padding="500">
                  <ProductForm
                    jsonData={jsonData}
                    handleFieldChange={handleFieldChange}
                    handleSelect={handleSelect}
                    handleRemove={handleRemoveOption}
                    filteredOptions={filteredOptions}
                    control={control}
                    errors={errors}
                  />
                </Box>
                <Box>
                  <Divider borderColor="border-brand" />
                  <Box padding="500">
                    <Button
                      variant="primary"
                      onClick={handleAddReview}
                      tone="success"
                      size="large"
                      icon={PlusIcon as IconSource}
                    >
                      Add Review
                    </Button>
                  </Box>
                </Box>
                {jsonData.reviews.length > 0 &&
                  jsonData.reviews.map((_, idx) => (
                    <ReviewFormBlock
                      handleSelect={handleSelect}
                      index={idx}
                      jsonData={jsonData}
                      handleFieldChange={(field: string, value: string) =>
                        handleReviewFieldChange(idx, field, value)
                      }
                      handleRemove={handleRemoveReview}
                      control={control}
                      errors={errors}
                      highestRatingAllowed={highestRatingAllowed}
                      lowestRatingAllowed={lowestRatingAllowed}
                    />
                  ))}
              </Card>
            </Box>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
            <Box paddingBlockEnd="300">
              <ButtonGroup>
                <Button
                  onClick={() => {
                    window.location.href = "https://validator.schema.org/";
                  }}
                >
                  Test Structured Data
                </Button>
                <Button
                  onClick={() => {
                    window.location.href =
                      "https://search.google.com/test/rich-results";
                  }}
                  icon={
                    <img
                      src="/google.svg"
                      alt="Google"
                      style={{ display: "block", marginInline: "5px 2px" }}
                    />
                  }
                >
                  Rich Result Test
                </Button>
              </ButtonGroup>
            </Box>
            <Box maxWidth="700px">
              <SchemaDisplay
                jsonLDString={jsonLDString}
                isCopied={isCopied}
                handleCopy={handleCopy}
              />
            </Box>
          </Grid.Cell>
        </InlineGrid>
      </div>
    </div>
  );
}
