const heap = {
	path: "/heap",
	name: "Heap",
	redirect: "/heap/heap-markdown",
	component: () => import("@/views/heap/index.vue"),
	meta: {
		title: "堆排序",
		icon: "el-icon-document-checked",
	},
	children: [
		{
			path: "heap-markdown",
			name: "HeapMarkdown",
			component: () => import("@/views/heap/markdown.vue"),
			meta: {
				title: "内容介绍",
				icon: "el-icon-document",
			},
		},
		{
			path: "heap-video",
			name: "HeapVideo",
			component: () => import("@/views/heap/video.vue"),
			meta: {
				title: "视频教学",
				icon: "el-icon-video-camera",
			},
		},
		{
			path: "heap-animation",
			name: "HeapAnimation",
			component: () => import("@/views/heap/animation.vue"),
			meta: {
				title: "动画演示",
				icon: "el-icon-rank",
			},
		},
	],
};

export default heap;
