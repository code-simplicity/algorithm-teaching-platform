const quick3way = {
	path: "/quick3way",
	name: "Quick3way",
	redirect: "/quick3way/quick3way-markdown",
	component: () => import("@/views/quick3way/index.vue"),
	meta: {
		title: "三分快速排序",
		icon: "el-icon-mouse",
	},
	children: [
		{
			path: "quick3way-markdown",
			name: "Quick3wayMarkdown",
			component: () => import("@/views/quick3way/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "quick3way-video",
			name: "Quick3wayVideo",
			component: () => import("@/views/quick3way/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "quick3way-animation",
			name: "Quick3wayAnimation",
			component: () => import("@/views/quick3way/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default quick3way;
