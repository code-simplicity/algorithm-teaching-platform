const quick = {
	path: "/quick",
	name: "Quick",
	redirect: "/quick/quick-markdown",
	component: () => import("@/views/quick/index.vue"),
	meta: {
		title: "快速排序",
		icon: "el-icon-document",
	},
	children: [
		{
			path: "quick-markdown",
			name: "QuickMarkdown",
			component: () => import("@/views/quick/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "quick-video",
			name: "QuickVideo",
			component: () => import("@/views/quick/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "quick-animation",
			name: "QuickAnimation",
			component: () => import("@/views/quick/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default quick;
