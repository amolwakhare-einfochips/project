import type { Meta, StoryObj } from "@storybook/react-vite";
import CatalogList from "../../../assignments/week1/components/CatalogList";
import type { Product } from "../../../assignments/week1/types/product";
import React from "react";


const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    category: ["Audio", "Peripherals", "Accessories"][
      i % 3
    ] as Product["category"],
  }));
};


type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-400">
          ⚠ Something went wrong
        </div>
      );
    }

    return this.props.children;
  }
}


const meta: Meta<typeof CatalogList> = {
  title: "Week3/Catalog Scale",
  component: CatalogList,
};

export default meta;

type Story = StoryObj<typeof CatalogList>;


export const LoadingFew: Story = {
  args: {
    data: [],
    isLoading: true,
    isError: false,
    onRetry: () => {},
  },
};

export const LoadingDense: Story = {
  args: {
    data: [],
    isLoading: true,
    isError: false,
    onRetry: () => {},
  },
  render: (args) => (
    <div className="grid grid-cols-3 gap-2">
      <CatalogList {...args} />
    </div>
  ),
};

export const SmallData: Story = {
  args: {
    data: generateProducts(5),
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};

export const LargeData: Story = {
  args: {
    data: generateProducts(50),
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};

export const HugeData: Story = {
  args: {
    data: generateProducts(100),
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};

export const ErrorState: Story = {
  args: {
    data: [],
    isLoading: false,
    isError: true,
    onRetry: () => alert("Retry clicked"),
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    isLoading: false,
    isError: false,
    onRetry: () => {},
  },
};

export const ErrorBoundaryFallback: Story = {
  render: () => {
    const CrashComponent = () => {
      throw new Error("Crash test");
    };

    return (
      <ErrorBoundary>
        <CrashComponent />
      </ErrorBoundary>
    );
  },
};