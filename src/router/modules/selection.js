const selection = {
	path: "/selection",
	name: "Selection",
	redirect: "/selection/selection-markdown",
	component: () => import("@/views/selection/index.vue"),
	meta: {
		title: "选择排序",
		icon: "el-icon-document-copy",
	},
	children: [
		{
			path: "selection-markdown",
			name: "SelectionMarkdown",
			component: () => import("@/views/selection/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "selection-video",
			name: "SelectionVideo",
			component: () => import("@/views/selection/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "selection-animation",
			name: "SelectionAnimation",
			component: () => import("@/views/selection/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default selection;
