type AsyncStateWrapperProps = {
    isLoading?: boolean;
    error?: string | null;
    children: React.ReactNode;
};

export function AsyncStateWrapper({
    isLoading,
    error,
    children,
}: AsyncStateWrapperProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32 text-yellow-400">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-32 text-red-500">
                {error}
            </div>
        );
    }

    return <>{children}</>;
}