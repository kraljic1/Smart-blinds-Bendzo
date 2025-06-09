// React import not needed with new JSX transform

interface StructuredDataScriptProps {
  data: Record<string, unknown>[];
}

/**
 * Component for rendering structured data JSON-LD script
 */
export const StructuredDataScript = ({ data }: StructuredDataScriptProps) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data, null, 2)}
    </script>
  );
}; 