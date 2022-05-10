const merge = {
	path: "/merge",
	name: "Merge",
	redirect: "/merge/merge-markdown",
	component: () => import("@/views/merge/index.vue"),
	meta: {
		title: "归并排序",
		icon: "el-icon-collection-tag",
	},
	children: [
		{
			path: "merge-markdown",
			name: "MergeMarkdown",
			component: () => import("@/views/merge/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "merge-video",
			name: "MergeVideo",
			component: () => import("@/views/merge/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "merge-animation",
			name: "MergeAnimation",
			component: () => import("@/views/merge/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default merge;
