type Props = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function ErrorCard({ title, description, actions }: Props) {
  return (
    <div className="border border-red-500/30 bg-red-900/10 rounded-xl p-4 mb-4">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-gray-400 mb-3">{description}</div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}