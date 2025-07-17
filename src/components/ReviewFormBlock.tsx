import {
  Box,
  Divider,
  FormLayout,
  TextField,
  Text,
  Button,
  type IconSource,
} from "@shopify/polaris";
import type { JsonLDData } from "../types/jsonld-data.type";
import { DeleteIcon } from "@shopify/polaris-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

type ReviewFormBlockProps = {
  index: number;
  jsonData: JsonLDData;
  handleFieldChange: (field: string, value: string) => void;
  handleSelect: (selected: string) => void;
  handleRemove: (index: number) => void;
  control: Control<JsonLDData>;
  errors: FieldErrors<JsonLDData>;
  highestRatingAllowed: number;
  lowestRatingAllowed: number;
};

const ReviewFormBlock = ({
  index,
  jsonData,
  handleFieldChange,
  handleRemove,
  control,
  errors,
}: ReviewFormBlockProps) => {
  return (
    <Box paddingBlockEnd="200">
      {index > 0 && <Divider borderColor="border-brand" />}
      <Box padding={"500"}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text as="h3" variant="headingMd">
            Review {index + 1}
          </Text>
          <Button
            size="large"
            variant="plain"
            tone="critical"
            icon={DeleteIcon as IconSource}
            onClick={() => handleRemove(index)}
          />
        </div>
        <FormLayout>
          <TextField
            label="Review Title"
            value={jsonData?.reviews[index]?.reviewTitle}
            onChange={(value) => handleFieldChange("reviewTitle", value)}
            autoComplete="off"
          />
          <TextField
            label="Review Body"
            value={jsonData?.reviews[index]?.reviewBody}
            onChange={(value) => handleFieldChange("reviewBody", value)}
            autoComplete="off"
          />
          <Controller
            name={`reviews.${index}.rating`}
            control={control}
            defaultValue={
              jsonData?.reviews[index]?.rating > 0
                ? jsonData?.reviews[index]?.rating
                : 1
            }
            rules={{
              min: {
                value: jsonData.lowestRatingAllowed,
                message: `Rating must be at least ${jsonData.lowestRatingAllowed}`,
              },
              max: {
                value: jsonData.highestRatingAllowed,
                message: `Rating must be at most ${jsonData.highestRatingAllowed}`,
              },
            }}
            render={({ field }) => (
              <TextField
                label="Rating Value"
                type="number"
                value={field.value?.toString()}
                onChange={(value) => {
                  const numericValue = Number(value);
                  field.onChange(numericValue);
                  handleFieldChange("rating", numericValue.toString());
                }}
                autoComplete="off"
                error={errors?.reviews?.[index]?.rating?.message}
              />
            )}
          />

          <TextField
            label="Date"
            type="date"
            value={jsonData?.reviews[index]?.date}
            onChange={(value) => handleFieldChange("date", value)}
            autoComplete="off"
          />
          <TextField
            label="Author"
            value={jsonData?.reviews[index]?.author}
            onChange={(value) => handleFieldChange("author", value)}
            autoComplete="off"
          />
          <TextField
            label="Publisher"
            value={jsonData?.reviews[index]?.publisher}
            onChange={(value) => handleFieldChange("publisher", value)}
            autoComplete="off"
          />
        </FormLayout>
      </Box>
    </Box>
  );
};

export default ReviewFormBlock;
