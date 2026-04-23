// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const ErrorComponent = () => (
  <div className="text-red-400">
    Failed to load data
    <button className="ml-2 border px-2">Retry</button>
  </div>
);

export default {
  title: "Week1/Shared/ErrorState",
  component: ErrorComponent,
} as Meta;

export const Default: StoryObj = {};