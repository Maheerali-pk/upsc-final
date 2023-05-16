import moment from "moment";
import { routes } from "../utils/utils";
import { useRouter } from "next/router";
import classNames from "classnames";
import { jobStatusToText } from "../utils/data";
import { useState } from "react";
import JobStatusBadge from "./JobStatusBadge";

interface AllJobPostsTableProps {

}

const AllJobPostsTable: React.FC<AllJobPostsTableProps> = () => {
	const [posts, setPosts] = useState<IJobPostMini[]>([])

	const router = useRouter()
	return (
		<div className="flex flex-col  rounded-xl border border-gray-200 shadow-sm">
			<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center h-11">
				<div className="text-gray-600 font-medium text-xs pl-6">
					Position
				</div>
				<div className="text-gray-600 font-medium text-xs text-center">
					Status
				</div>
				<div className="text-gray-600 font-medium text-xs text-center">
					Applications
				</div>
				<div className="text-gray-600 font-medium text-xs text-center">
					Action
				</div>
				<div className="text-gray-600 font-medium text-xs text-center">
					Date
				</div>
			</div>
			{posts.map((post) => (
				<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center py-4 border-t border-gray-200">
					<div className="text-gray-900 font-medium text-sm pl-6">
						{post.position}
					</div>
					<div className="flex items-center justify-center">
						<JobStatusBadge status={post.status}></JobStatusBadge>
					</div>
					<div className="text-center text-gray-600 text-sm">
						{post.applications}
					</div>
					<div
						className="btn btn-link btn-primary text-sm"
						onClick={() =>
							router.push(routes.company.jobDetails(post._id))
						}
					>
						View
					</div>
					<div className="text-center text-gray-600 text-sm">
						{moment(new Date(post.createdAt)).format("DD MMM, YYYY")}
					</div>
				</div>
			))}
		</div>)
}

export default AllJobPostsTable;