import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/i18n";
import "../src/index.css";

// ✅ Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // better for Storybook
    },
  },
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client= { queryClient } >
      <Story />
      </QueryClientProvider>
    ),
  ],

parameters: {
  controls: {
    matchers: {
      color: /(background|color)$/i,
        date: /Date$/i,
      },
  },

  a11y: {
    test: "todo",
    },
},
};

export default preview;