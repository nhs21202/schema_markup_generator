import { FormLayout, TextField, Box, Grid } from "@shopify/polaris";
import CustomSelection from "./CustomSelection";
import type { JsonLDData } from "../types/jsonld-data.type";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { IMAGE_URL_REGEX } from "../constant/regex";

type ProductFormProps = {
  jsonData: JsonLDData;
  handleFieldChange: (field: string, value: string) => void;
  handleSelect: (selected: string) => void;
  handleRemove: (selected: string) => void;
  filteredOptions: { label: string; value: string }[];
  control: Control<JsonLDData>;
  errors: FieldErrors<JsonLDData>;
};

const ProductForm = ({
  jsonData,
  handleFieldChange,
  handleSelect,
  handleRemove,
  filteredOptions,
  control,
  errors,
}: ProductFormProps) => {
  return (
    <Box>
      <FormLayout>
        <TextField
          label="Product name"
          value={jsonData.productName}
          onChange={(value) => handleFieldChange("productName", value)}
          autoComplete="off"
        />
        <Controller
          name="imageUrl"
          control={control}
          defaultValue={jsonData.imageUrl}
          rules={{
            pattern: {
              value: IMAGE_URL_REGEX,
              message: "Invalid image URL",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Image URL"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                handleFieldChange("imageUrl", value);
              }}
              autoComplete="off"
              error={errors.imageUrl?.message}
            />
          )}
        />
        <TextField
          label="Product description"
          value={jsonData.description}
          onChange={(value) => handleFieldChange("description", value)}
          multiline={6}
          autoComplete="off"
        />
        <CustomSelection
          selectedOptions={jsonData.selectedOptions}
          onSelect={handleSelect}
          onRemove={handleRemove}
          inputValue={jsonData.inputValue || ""}
          options={filteredOptions}
          onInputChange={(value) => handleFieldChange("inputValue", value)}
        />
        <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          {jsonData.selectedOptions.map((option) => (
            <Grid.Cell
              key={option}
              columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
            >
              <TextField
                autoComplete="off"
                label={
                  filteredOptions.find((o) => o.value === option)?.label ||
                  option
                }
                value={(jsonData[option as keyof JsonLDData] as string) || ""}
                onChange={(value) => handleFieldChange(option, value)}
              />
            </Grid.Cell>
          ))}
        </Grid>

        <FormLayout.Group>
          <Controller
            name="ratingValue"
            control={control}
            defaultValue={jsonData.ratingValue}
            rules={{
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 5, message: "Rating must be at most 5" },
            }}
            render={({ field }) => (
              <TextField
                label="Aggregate rating value"
                value={field.value.toString()}
                onChange={(value) => {
                  field.onChange(value);
                  handleFieldChange("ratingValue", value);
                }}
                type="number"
                autoComplete="off"
                error={errors.ratingValue?.message}
              />
            )}
          />

          <Controller
            name="ratingCount"
            control={control}
            defaultValue={jsonData.ratingCount}
            rules={{
              min: { value: 0, message: "Number of rating cannot be negative" },
            }}
            render={({ field }) => (
              <TextField
                label="Number of rating"
                value={field.value.toString()}
                onChange={(value) => {
                  field.onChange(value);
                  handleFieldChange("ratingCount", value);
                }}
                type="number"
                autoComplete="off"
                error={errors.ratingCount?.message}
              />
            )}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <Controller
            name="highestRatingAllowed"
            control={control}
            defaultValue={jsonData.highestRatingAllowed}
            rules={{
              min: { value: 1, message: "The value must be at least 1" },
              max: { value: 5, message: "The value must be at most 5" },
            }}
            render={({ field }) => (
              <TextField
                label="Highest rating allowed"
                value={field.value.toString()}
                onChange={(value) => {
                  field.onChange(value);
                  handleFieldChange("highestRatingAllowed", value);
                }}
                type="number"
                autoComplete="off"
                error={errors.highestRatingAllowed?.message}
              />
            )}
          />

          <Controller
            name="lowestRatingAllowed"
            control={control}
            defaultValue={jsonData.lowestRatingAllowed}
            rules={{
              min: { value: 1, message: "The value must be at least 1" },
              max: { value: 5, message: "The value must be at most 5" },
            }}
            render={({ field }) => (
              <TextField
                label="Lowest rating allowed"
                value={field.value.toString()}
                onChange={(value) => {
                  field.onChange(value);
                  handleFieldChange("lowestRatingAllowed", value);
                }}
                type="number"
                autoComplete="off"
                error={errors.lowestRatingAllowed?.message}
              />
            )}
          />
        </FormLayout.Group>
      </FormLayout>
    </Box>
  );
};

export default ProductForm;
