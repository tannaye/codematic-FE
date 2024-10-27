// src/components/Input.tsx
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx"; // Optional: For conditional classnames

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
	<input
		{...props}
		className={clsx(
			"w-full px-4 py-2 bg-background text-textPrimary border border-border rounded-md focus:outline-none focus:border-primary",
			"dark:bg-secondary dark:text-white dark:border-gray-600", // Dark mode styles
			className
		)}
	/>
);

export default Input;
