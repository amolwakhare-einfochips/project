// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../../shared/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Week1/Shared/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
};