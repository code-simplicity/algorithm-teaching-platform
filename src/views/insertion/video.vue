<template>
	<div class="animation-container">
		<Video :videoUrl="videoUrl"></Video>
	</div>
</template>

<script>
import Video from "../../components/video.vue";
export default {
	name: "InsertVideo",
	props: {},
	components: {
		Video,
	},
	data() {
		return {
			videoUrl:
				"https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/video/insert-sort.mp4",
		};
	},
	mounted() {},
	watch: {},
	methods: {},
};
</script>

<style scoped lang="less"></style>
