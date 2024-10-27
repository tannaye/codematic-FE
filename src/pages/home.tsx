import { useState } from "react";
import YoutubeLogo from "../assets/icons/youtube-logo";
import SearchBar from "../components/forms/search";
import SkeletonLoader from "../components/skeleton-loader";
import YouTubeResult from "../components/result";
import { VideoDetails, Comment } from "../models";
import axios from "axios";

const BASE_URL = "https://codematic-be.onrender.com/api/v1";

export default function HomePage() {
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fetchingComments, setfetchingComments] = useState(false);
	const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
	const [comments, setComments] = useState<Comment[]>([]);
	const [nextPageToken, setNextPageToken] = useState<string | null>(null);
	const [videoId, setvideoId] = useState<string | null>(null);

	const handleSearch = async (query: string) => {
		setLoading(true);
		setIsSearching(true); // Move search bar to the top
		setvideoId(query);
		setComments([]);
		setNextPageToken(null);

		try {
			await fetchVideoDetails(query);
			await fetchAllComments(query);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch video details
	const fetchVideoDetails = async (videoId: string) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/video/details/${videoId}`);

			const video = data?.data;
			console.log(video);
			if (video) {
				setVideoDetails(video);
			} else {
				throw new Error("Video not found.");
			}
		} catch (error) {
			console.error("Error fetching video details:", error);
			throw error; // Re-throw to handle in handleSearch
		}
	};

	// Fetch comments
	const fetchAllComments = async (videoId: string, pageToken?: string) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/video/comments`, {
				params: {
					videoId,
					nextPageToken: pageToken,
				},
			});

			const contents = data?.data;
			console.log(contents);
			setComments(prev => [...prev, ...(contents?.comments || [])]);
			setNextPageToken(contents.nextPageToken || null);
		} catch (error) {
			console.error("Error fetching comments:", error);
			throw error; // Re-throw to handle in handleSearch
		}
	};

	// Load more comments
	const loadMoreComments = async () => {
		setfetchingComments(true);

		try {
			if (nextPageToken && videoId) await fetchAllComments(videoId, nextPageToken);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setfetchingComments(false);
		}
	};

	return (
		<div className="min-h-screen bg-background text-textPrimary dark:bg-secondary dark:text-white p-4 md:p-6">
			{/* Header */}
			<header
				className={`items-center gap-4 mb-6 ${
					isSearching ? "flex justify-between" : "flex justify-start"
				}`}
			>
				<YoutubeLogo />
				{isSearching && (
					<div className="flex-grow max-w-lg">
						<SearchBar onSearch={handleSearch} />
					</div>
				)}
			</header>

			{/* Main Content */}
			<main
				className={`flex justify-center transition-all duration-500 ${
					isSearching ? "mt-0" : "min-h-[calc(100vh_-_60px)]"
				}`}
			>
				{!isSearching ? (
					<div className="flex mt-[25vh] flex-col gap-2 w-full max-w-[540px]">
						<h1 className="text-4xl font-semibold text-center mb-2">
							YouTube Search
						</h1>
						<SearchBar onSearch={handleSearch} />
					</div>
				) : loading ? (
					<div className="flex w-full flex-col md:flex-row gap-6">
						<div className="md:w-2/3 flex flex-col gap-2 items-start">
							<SkeletonLoader className="rounded-lg mb-2 aspect-video" />
							<SkeletonLoader className="h-4 w-full max-w-xl" />
							<SkeletonLoader className="h-4 w-[80%] md:max-w-md" />
						</div>
						<div className="md:w-1/3">
							<h3 className="text-lg font-semibold mb-4">Comments</h3>
							{[...Array(8)].map((_, index) => (
								<SkeletonLoader
									className="!h-14 w-full mb-2"
									key={`skeleton_${index}`}
								/>
							))}
						</div>
					</div>
				) : (
					<YouTubeResult
						loading={fetchingComments}
						nextPageToken={nextPageToken}
						videoDetails={videoDetails}
						comments={comments}
						loadMoreComments={loadMoreComments}
					/>
				)}
			</main>
		</div>
	);
}
