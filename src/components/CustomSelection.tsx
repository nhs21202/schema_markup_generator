import React from "react";
import {
  Listbox,
  Combobox,
  Box,
  Text,
  Tag,
  InlineStack,
} from "@shopify/polaris";

type CustomSelectionProps = {
  selectedOptions: string[];
  onSelect: (selected: string) => void;
  onRemove: (selected: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  options: { label: string; value: string }[];
};
const CustomSelection = ({
  selectedOptions,
  onSelect,
  onRemove,
  inputValue,
  onInputChange,
  options,
}: CustomSelectionProps) => {
  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const selectedOptionsData = selectedOptions.map((selectedValue) => {
    const option = options.find((opt) => opt.value === selectedValue);
    return {
      value: selectedValue,
      label: option?.label || selectedValue,
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            autoComplete="off"
            onChange={onInputChange}
            label="Identification properties"
            value={inputValue}
            placeholder="Select options"
          />
        }
      >
        <Box>
          <Box padding="200">
            <Text variant="headingMd" as="h2">
              Identification properties
            </Text>
          </Box>
          {optionsMarkup ? (
            <Listbox onSelect={onSelect}>{optionsMarkup}</Listbox>
          ) : null}
        </Box>
      </Combobox>
      <InlineStack gap="100">
        {selectedOptionsData.map((option) => (
          <Box key={option.value} paddingInlineEnd="100" paddingBlockEnd="100">
            <Tag onRemove={() => onRemove(option.value)}>{option.label}</Tag>
          </Box>
        ))}
      </InlineStack>
    </div>
  );
};
export default CustomSelection;
