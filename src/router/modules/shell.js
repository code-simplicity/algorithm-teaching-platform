const shell = {
	path: "/shell",
	name: "Shell",
	redirect: "/shell/shell-markdown",
	component: () => import("@/views/shell/index.vue"),
	meta: {
		title: "希尔排序",
		icon: "el-icon-coin",
	},
	children: [
		{
			path: "shell-markdown",
			name: "ShellMarkdown",
			component: () => import("@/views/shell/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "shell-video",
			name: "ShellVideo",
			component: () => import("@/views/shell/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "shell-animation",
			name: "ShellAnimation",
			component: () => import("@/views/shell/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default shell;
