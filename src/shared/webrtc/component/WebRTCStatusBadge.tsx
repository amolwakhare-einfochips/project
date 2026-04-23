type Props = {
  label: string;
  type?: 'success' | 'error' | 'warning' | 'neutral';
};

export function WebRTCStatusBadge({ label, type = 'neutral' }: Props) {
  const styles = {
    success: 'bg-green-600/20 text-green-400',
    error: 'bg-red-600/20 text-red-400',
    warning: 'bg-yellow-600/20 text-yellow-400',
    neutral: 'bg-gray-600/20 text-gray-300',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[type]}`}>
      {label}
    </span>
  );
}