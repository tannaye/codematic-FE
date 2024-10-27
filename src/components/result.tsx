import React, { useState } from "react";
import { Comment, VideoDetails } from "../models";
import {
	MdFavoriteBorder,
	MdOutlinePerson,
	MdVisibility,
} from "react-icons/md";
import { formatNumber } from "../utils";

interface YouTubeResultProps {
	loadMoreComments: () => void;
	videoDetails: VideoDetails | null;
	comments: Comment[];
	nextPageToken: string | null;
	loading: boolean;
}

const YouTubeResult: React.FC<YouTubeResultProps> = ({
	loadMoreComments,
	videoDetails,
	comments,
	nextPageToken,
	loading,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Function to check if the description is long enough for "Show More"
	const isDescriptionLong = (description: string): boolean => {
		const maxWordCount = 260;
		const textCount = description.length;
		return textCount > maxWordCount;
	};

	return (
		<div className="flex flex-col md:flex-row gap-6 w-full">
			{/* Video Details Section */}
			<div className="md:w-2/3 text-start flex flex-col items-start">
				{videoDetails && (
					<div className="relative">
						<div className="relative">
							<img
								src={videoDetails.thumbnail}
								alt={videoDetails.title}
								className="rounded-lg relative z-10 mb-4 w-full h-full"
							/>
						</div>
						<div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
							<h2 className="text-xl font-semibold">{videoDetails.title}</h2>
							<div className="flex gap-4">
								<p className="text-sm flex items-center gap-1 rounded-full bg-gray-200 dark:bg-bgSecondary p-2 px-4">
									<MdVisibility className="w-4 h-4" />{" "}
									<span> : {formatNumber(parseInt(videoDetails.viewCount))}</span>
								</p>
								<p className="text-sm flex items-center gap-1 rounded-full bg-gray-200 dark:bg-bgSecondary p-2 px-4">
									<MdFavoriteBorder className="w-4 h-4" />
									<span> : {formatNumber(parseInt(videoDetails.likeCount))}</span>
								</p>
							</div>
						</div>
						<p className={`text-sm mt-2 ${isExpanded ? "" : "line-clamp-2"}`}>
							{videoDetails.description}
						</p>
						{isDescriptionLong(videoDetails.description) && (
							<button
								onClick={() => setIsExpanded(prev => !prev)}
								className="underline text-sm mt-1"
							>
								{isExpanded ? "Show Less" : "Show More"}
							</button>
						)}
					</div>
				)}
			</div>

			{/* Comments Section */}
			<div className="md:w-1/3">
				<h3 className="text-lg font-semibold mb-4">
					Comments{" "}
					{videoDetails?.commentCount
						? `(${formatNumber(parseInt(videoDetails.commentCount))})`
						: ""}
				</h3>
				<div className="space-y-4 overflow-y-auto h-[calc(100vh_-_168px)]">
					{comments.map((comment, index) => (
						<div
							key={index}
							className="p-4 flex items-start gap-2 border-b dark:border-border"
						>
							<div className="bg-gray-200 dark:bg-bgSecondary rounded-full flex items-center justify-center min-w-10 min-h-10">
								<MdOutlinePerson className="w-6 h-6" />
							</div>
							<div>
								<p className="font-medium">{comment.author}</p>
								<p className="text-sm mt-1">{comment.comment}</p>
							</div>
						</div>
					))}

					{loading && <p>Loading more comments...</p>}
					{nextPageToken && !loading && (
						<button
							onClick={loadMoreComments}
							className="mt-4 px-4 py-2 text-textPrimary dark:text-white hover:text-white dark:bg-bgSecondary bg-gray-200 hover:bg-primary dark:hover:bg-primary transition rounded-full"
						>
							Load More
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default YouTubeResult;
