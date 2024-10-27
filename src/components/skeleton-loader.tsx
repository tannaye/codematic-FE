const SkeletonLoader: React.FC<{
	className?: string;
}> = ({ className = "" }) => (
	<div className={`animate-pulse w-full ${className}`}>
		<div className="h-full bg-gray-300 dark:bg-gray-600 mb-4 rounded-md" />
	</div>
);

export default SkeletonLoader;
