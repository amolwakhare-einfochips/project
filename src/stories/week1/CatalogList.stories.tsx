// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CatalogList from "../../assignments/week1/components/CatalogList";

const mockData = [
  {
    id: 1,
    name: "Mouse",
    price: 500,
    category: "Peripherals",
  },
];

const meta: Meta<typeof CatalogList> = {
  title: "Week1/Catalog/CatalogList",
  component: CatalogList,
};

export default meta;

type Story = StoryObj<typeof CatalogList>;

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isError: false,
    onRetry: () => {},
  },
};

export const Error: Story = {
  args: {
    data: [],
    isLoading: false,
    isError: true,
    onRetry: () => alert("Retry clicked"),
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};

export const Success: Story = {
  args: {
    data: mockData,
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};