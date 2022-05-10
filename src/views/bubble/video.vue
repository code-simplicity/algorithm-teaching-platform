<template>
	<div class="animation-container">
		<Video :videoUrl="videoUrl"></Video>
	</div>
</template>

<script>
import Video from "../../components/video.vue";

export default {
	name: "BubbleVideo",
	props: {},
	components: {
		Video,
	},
	data() {
		return {
			// 视频地址
			videoUrl:
				"https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/video/bubble-sort.mp4",
		};
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {},
};
</script>

<style scoped lang="less"></style>
