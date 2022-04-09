<!--
 * @Author: bugdr
 * @Date: 2022-04-09 17:35:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-09 17:35:17
 * @FilePath: \algorithm-teaching-platform\src\components\sort\bubble.vue
 * @Description: 冒泡排序
-->
<template>
	<div class="select-box">
		<el-collapse class="select-info">
			<el-collapse-item title="冒泡排序">
				<MarkdownPro :value="htmlMD" theme="dark"></MarkdownPro>
			</el-collapse-item>
		</el-collapse>
		<div class="el-main-box">
			<SortHeader
				:current="current"
				:items="items"
				:interval-i-d="intervalID"
				:interval-time="intervalTime"
				:old-arr="oldArr"
				:sort-state="sortState"
				:text-arr="textArr"
				@step="step"
				@stop="stop"
				@refresh="refresh"
				@create="create"
				@changeInterval="changeInterval"
				@finished="finished"
				@sort="sort"
			></SortHeader>
			<SortMain
				ref="main"
				:key="menuKey"
				:current="current"
				:items="items"
				method="insert"
				:demo-tag="demoTag"
				:sort-state="sortState"
			/>
		</div>
		<div class="el-footer-box">
			<SortFooter
				:text-arr="textArr"
				method="insert"
				:codeDataLsit="codeDataLsit"
				:current="current"
				:line="line"
				@clear="clear"
			/>
		</div>
	</div>
</template>

<script>
import { exch, less, createArr } from "../../util/util";
import { PlainDraggable } from "../../util/plain-draggable-limit.min";
import SortHeader from "./modules/SortHeader";
import SortMain from "./modules/SortMain";
import SortFooter from "./modules/SortFooter";
import { MarkdownPro } from "vue-meditor";
import axios from "axios";
export default {
	name: "bubble",
	props: {},
	components: {
		SortHeader,
		SortMain,
		SortFooter,
		MarkdownPro,
	},
	data() {
		return {
			line: 0,
			resetj: false,
			htmlMD: "",
			demoTag: [
				{ text: "未排序元素", type: "info" },
				{ text: "比较元素", type: "danger" },
				{ text: "外循环元素", type: "warning" },
			],
			menuKey: 1,
			//当前值
			current: {
				//外循环下标
				outside: "",
				//内循环下标
				inner: "",
			},
			/**
			 * 排序状态
			 * 0:未排序
			 * 1:开始排序
			 * 2:排序中
			 * 3:排序完成
			 */
			sortState: 0,
			//待排序数组
			items: [],
			//未排序数组
			oldArr: [],
			//控制台数组
			textArr: [],
			//定时器编号
			intervalID: -1,
			//动画定时器
			intervalIDanimation: "",
			isStop: false,
			//定时器速度
			intervalTime: 99,
			// 代码
			codeDataLsit: [],
		};
	},
	computed: {},
	created() {
		const url = `./md/BubbleSort.md`;
		axios.get(url).then((response) => {
			this.htmlMD = response.data;
		});
	},
	mounted() {},
	watch: {},
	methods: {},
};
</script>

<style lang="less" scoped>
.select-box {
	.select-info {
		/deep/.el-collapse-item__header {
			padding: 0 10px;
			font-size: 14px;
		}
		/deep/.el-collapse-item__content {
			padding: 0 16px;
		}
	}
	.el-main-box {
		margin-top: 16px;
	}
	.el-footer-box {
		margin-top: 16px;
	}
}
</style>
