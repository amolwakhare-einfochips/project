// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const InputField = () => (
  <input
    className="border px-2 py-1"
    placeholder="Enter value"
  />
);

export default {
  title: "Week1/Shared/InputField",
  component: InputField,
} as Meta;

export const Default: StoryObj = {};