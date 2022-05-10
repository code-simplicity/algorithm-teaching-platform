const bubble = {
	path: "/bubble",
	name: "Bubble",
	redirect: "/bubble/bubble-markdown",
	component: () => import("@/views/bubble/index.vue"),
	meta: {
		title: "冒泡排序",
		icon: "el-icon-attract",
	},
	children: [
		{
			path: "bubble-markdown",
			name: "BubbleMarkdown",
			component: () => import("@/views/bubble/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "bubble-video",
			name: "BubbleVideo",
			component: () => import("@/views/bubble/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "bubble-animation",
			name: "BubbleAnimation",
			component: () => import("@/views/bubble/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default bubble;
