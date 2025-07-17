import {
  Card,
  BlockStack,
  Tooltip,
  Button,
  Divider,
  Box,
  Text,
} from "@shopify/polaris";
import type { IconSource } from "@shopify/polaris";
import { ClipboardIcon } from "@shopify/polaris-icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  jsonLDString: string;
  isCopied: boolean;
  handleCopy: () => void;
};
const SchemaDisplay = ({ jsonLDString, isCopied, handleCopy }: Props) => {
  return (
    <Card padding={"0"} background="bg-fill-brand-selected">
      <BlockStack>
        <div
          style={{
            padding: "10px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "50px",
          }}
        >
          <Text variant="headingMd" as="h2" tone="text-inverse">
            Schema
          </Text>

          <div>
            <Tooltip content="Copy to clipboard" dismissOnMouseOut>
              {!isCopied ? (
                <Button
                  variant="plain"
                  onClick={handleCopy}
                  size="large"
                  icon={ClipboardIcon as IconSource}
                />
              ) : (
                <Text variant="bodyMd" tone="text-inverse" as="span">
                  Copied
                </Text>
              )}
            </Tooltip>
          </div>
        </div>
        <Divider borderColor="border-secondary" />
        <Box padding="500">
          <SyntaxHighlighter language="html" style={stackoverflowDark}>
            {jsonLDString}
          </SyntaxHighlighter>
        </Box>
      </BlockStack>
    </Card>
  );
};

export default SchemaDisplay;
