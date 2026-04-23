// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import EditProductModal from "../../assignments/week1/components/EditProductModal";

const meta: Meta<typeof EditProductModal> = {
  title: "Week1/Modal/EditProductModal",
  component: EditProductModal,
};

export default meta;

type Story = StoryObj<typeof EditProductModal>;

export const Open: Story = {
  args: {
    product: {
      name: "mouse",
      price: 344,
      category: "Peripherals",
    },
    products: [],
    onClose: () => {},
    onSave: () => {},
  },
};
