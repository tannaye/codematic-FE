import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDarkMode } from "../hooks/useDarkMode";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useDarkMode();
	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-md fixed bottom-4 right-4 bg-primary text-white"
		>
			{theme === "dark" ? (
				<MdLightMode fontSize="large" />
			) : (
				<MdDarkMode fontSize="large" />
			)}
		</button>
	);
};

export default ThemeToggle;
