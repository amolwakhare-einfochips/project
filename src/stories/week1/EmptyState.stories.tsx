// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const EmptyComponent = () => (
  <div className="text-gray-400">No data available</div>
);

export default {
  title: "Week1/Shared/EmptyState",
  component: EmptyComponent,
} as Meta;

export const Default: StoryObj = {};