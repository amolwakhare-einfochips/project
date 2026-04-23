// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCardSkeleton from "../../shared/ui/ProductCardSkeleton";

const meta: Meta<typeof ProductCardSkeleton> = {
  title: "Week1/Shared/ProductCardSkeleton",
  component: ProductCardSkeleton,
};

export default meta;

type Story = StoryObj<typeof ProductCardSkeleton>;

export const Loading: Story = {};