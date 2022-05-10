<template>
	<div class="animation-container">
		<Markdown
			:markdownTitle="markdownTitle"
			:markdownUrl="markdownUrl"
		></Markdown>
	</div>
</template>

<script>
import Markdown from "../../components/markdown.vue";
export default {
	name: "ShellMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			markdownTitle: "希尔排序",
			markdownUrl: "./md/ShellSort.md",
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
