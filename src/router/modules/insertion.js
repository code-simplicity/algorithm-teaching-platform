const insertion = {
	path: "/insertion",
	name: "Insertion",
	redirect: "/insertion/insert-markdown",
	component: () => import("@/views/insertion/index.vue"),
	meta: {
		title: "插入排序",
		icon: "el-icon-set-up",
	},
	children: [
		{
			path: "insert-markdown",
			name: "InsertMarkdown",
			component: () => import("@/views/insertion/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "insert-video",
			name: "InsertVideo",
			component: () => import("@/views/insertion/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "insert-animation",
			name: "InsertAnimation",
			component: () => import("@/views/insertion/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default insertion;
