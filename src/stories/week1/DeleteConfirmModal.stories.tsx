// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DeleteConfirmModal from "../../assignments/week1/components/DeleteConfirmModal";

const meta: Meta<typeof DeleteConfirmModal> = {
  title: "Week1/Modal/DeleteConfirmModal",
  component: DeleteConfirmModal,
};

export default meta;

type Story = StoryObj<typeof DeleteConfirmModal>;

export const Open: Story = {
  args: {
    productName: "Mouse",
    onCancel: () => {},
    onConfirm: () => {},
  },
};