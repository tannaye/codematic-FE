import DOMPurify from "dompurify";
export const formatNumber = (number: number) => {
  return Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseHTML = (text: string) => {
  const lines = text.split(/\n+/);
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  const formattedLines = lines.map((line) => {
    const formattedLine = line.replace(
      urlPattern,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
    return `<p>${DOMPurify.sanitize(formattedLine)}</p>`;
  });

  return formattedLines.join("");
};

export function extractYoutubeId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
}
