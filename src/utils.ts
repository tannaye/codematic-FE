export const formatNumber = (number: number) => {
	return Number(number)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function extractYoutubeId(url: string): string | null {
	const regExp =
		/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[7].length == 11 ? match[7] : null;
}
