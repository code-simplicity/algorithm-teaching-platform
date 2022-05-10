<template>
	<div class="container">
		<h3 class="color-white">{{ markdownTitle }}</h3>
		<div class="markdown-container">
			<MarkdownPro
				style="width: 100%"
				:value="htmlMD"
				theme="dark"
			></MarkdownPro>
		</div>
	</div>
</template>

<script>
import { MarkdownPro } from "vue-meditor";
import axios from "axios";
export default {
	name: "MarkDown",
	props: {
		markdownTitle: String,
		markdownUrl: String,
	},
	components: {
		MarkdownPro,
	},
	data() {
		return {
			// markdown内容介绍
			htmlMD: "",
		};
	},
	computed: {},
	created() {},
	mounted() {
		const url = this.markdownUrl;
		axios.get(url).then((response) => {
			this.htmlMD = response.data;
		});
	},
	watch: {},
	methods: {},
};
</script>

<style lang="less" scoped>
.container {
	height: 90vh;
	.markdown-container {
		position: absolute;
		left: 10px;
		right: 10px;
	}
}
</style>
