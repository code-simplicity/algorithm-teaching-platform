<!--
 * @Author: bugdr
 * @Date: 2022-04-09 17:35:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-10 09:21:11
 * @FilePath: \algorithm-teaching-platform\src\components\sort\bubble.vue
 * @Description: 冒泡排序
-->
<template>
	<div class="select-box">
		<div class="select-info">
			<Markdown
				:markdownTitle="markdownTitle"
				:markdownUrl="markdownUrl"
			></Markdown>
		</div>
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
				method="bubble"
				:demo-tag="demoTag"
				:sort-state="sortState"
			/>
		</div>
		<div class="el-footer-box">
			<SortFooter
				:text-arr="textArr"
				method="bubble"
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
import Markdown from "../markdown.vue";
export default {
	name: "bubble",
	props: {},
	components: {
		SortHeader,
		SortMain,
		SortFooter,
		Markdown,
	},
	data() {
		return {
			// markdownTitle
			markdownTitle: "冒泡排序",
			markdownUrl: "./md/BubbleSort.md",
			line: 0,
			// 重置j
			resetj: false,
			demoTag: [
				{ text: "未排序元素", type: "info" },
				{ text: "比较元素", type: "danger" },
				{ text: "交换元素", type: "warning" },
				{ text: "已排序元素", type: "success" },
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
			// 是否暂停
			isStop: false,
			//定时器速度
			intervalTime: 99,
			// 代码
			codeDataLsit: [
				`
 /*
 * 冒泡排序
 *
 * 参数说明:
 *     a -- 待排序的数组
 *     n -- 数组的长度
 */
public static void bubbleSort1(int[] a, int n) {
    int i, j;

    for (i = n - 1; i > 0; i--) {
        // 将a[0...i]中最大的数据放在末尾
        for (j = 0; j < i; j++) {

            if (a[j] > a[j + 1]) {
                // 交换a[j]和a[j+1]
                int tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
            }
        }
    }
}`,
			],
		};
	},
	computed: {
		//是否排序完成
		isSort() {
			return this.sortState === 3;
		},
		hasAnimation() {
			return this.$store.state.hasAnimation;
		},
		lineNum() {
			return this.$store.state.lineNum;
		},
	},
	created() {},
	mounted() {},
	watch: {},
	methods: {
		// 排序
		sort() {
			this.isStop = false;
			if (this.items.length <= 0) {
				this.$message({
					message: "数组为空",
					type: "warning",
				});
				return;
			}
			this.intervalID = setInterval(() => {
				this.step();
			}, 1000 - this.intervalTime * 10);
		},

		// 下一步
		step: function () {
			// 当前内外循环下标
			let current = this.current;
			// 当前的行
			let line = this.line;
			// 当前数组长度
			const length = this.items.length;
			if (length <= 0) {
				this.$message({
					message: "数组为空",
					type: "warning",
				});
				return;
			}
			//判断排序状态
			if (this.sortState === 0) {
				//未排序状态
				//设置排序状态为开始排序
				this.sortState = 2;
				this.textArr.unshift("开始排序");
				//复制数组
				this.items.forEach((value, index) =>
					this.$set(this.oldArr, index, value)
				);
				// 开始line为1.1
				this.line = 1.1;
			} else if (this.sortState === 1) {
				//开始排序状态

				//设置当前值，判断当前的行是否等于2，等于2就进行排序
				if (this.line === 2.1) {
					current.inner = 0;
					this.resetj = true;
					//设置排序状态为排序中
					this.sortState = 2;
					this.step();
				}
				this.menuKey++;
			} else if (this.sortState === 2) {
				//排序中
				switch (line) {
					// 给外层循环小标赋初值
					case 1.1:
						current.outside = length - 1;
						this.line = 1.2;
						break;
					case 1.2:
						this.line = 1.3;
						this.menuKey++;
						break;
					case 1.3:
						//判断外循环下标是否大于0
						if (current.outside > 0) {
							this.line = 2.1;
						} else {
							//外循环结束
							//排序完成
							this.textArr.unshift("排序完成");
							this.$message({
								message: "排序完成",
								type: "success",
							});
							this.sortState = 3;
							this.current = {};
							this.line = 0;
							this.stop();
						}
						this.menuKey++;
						break;
					case 1.4:
						// 外循环下标减
						current.outside--;
						this.line = 1.2;
						this.menuKey++;
						break;
					case 2.1:
						// 给内层下标设置初始值为0
						current.inner = 0;
						this.line = 2.2;
						break;
					case 2.2:
						// 判断内循环的下标是否小于外循环的,如果为真，进入2.2
						if (current.inner < current.outside) {
							this.line = 2.4;
						} else {
							this.line = 1.4;
						}
						this.menuKey++;
						break;
					case 2.3:
						// 内层循环下标++
						current.inner++;
						// 进入2.1
						this.line = 2.2;
						this.menuKey++;
						break;
					case 2.4:
						// 判断相邻两个元素直接的值的大小关系，如果是第一个大于第二个，那么交换位置，否者继续走到2.1
						if (
							less(this.items[current.inner], this.items[current.inner + 1])
						) {
							this.textArr.unshift(
								`当前值：${this.items[current.inner]},下一个值：${
									this.items[current.inner + 1]
								},当前值小于下一个值`
							);
							this.line = 2.3;
						} else {
							// 交换元素
							this.textArr.unshift(
								`当前值：${this.items[current.inner]},下一个值：${
									this.items[current.inner + 1]
								},当前值不小于下一个值`
							);
							this.line = 3;
						}
						this.menuKey++;
						break;

					case 3:
						this.textArr.unshift("交换数据");
						if (this.hasAnimation) {
							// 下一个值和当前值交换动作
							this.animation(current.inner, current.inner + 1);
						} else {
							// 交换位置
							exch(this.items, current.inner, current.inner + 1);
							this.menuKey++;
							// 返回2.3进行内层++
							this.line = 2.3;
						}
						break;
				}
			} else if (this.sortState === 3) {
				//已排序
				this.$message({
					message: "排序已经完成",
					type: "warning",
				});
				this.stop();
			}
		},
		/**
		 * 改变当前值
		 * @param flag 是否结束当前循环
		 */
		changeCurrent(flag) {
			let current = this.current;
			const length = this.items.length;
			if (flag) {
				//结束内循环
				//判断外循环
				if (current.outside < length) {
					//外循环加一
					current.inner = ++current.outside;
				} else {
					//外循环结束
					//排序完成
					this.textArr.unshift("排序完成");
					this.sortState = 3;
					this.current = {};
					this.stop();
				}
			} else {
				if (current.inner > 0) {
					//继续内循环
					current.inner--;
				} else {
					//结束内循环
					this.changeCurrent(true);
				}
			}
			this.menuKey++;
		},
		//创建数组
		create(imput) {
			this.refresh();
			createArr(imput, this.items);
		},
		// 清除控制台按钮
		clear() {
			this.textArr = [];
		},
		//跳过按钮点击事件
		finished() {
			this.stop();
			this.finished = true;
			while (this.items.length > 0 && !this.isSort) {
				this.step();
			}
			this.finished = false;
		},
		//暂停按钮
		stop() {
			clearInterval(this.intervalID);
			this.intervalID = -1;
		},
		changeInterval(time) {
			this.intervalTime = time;
			this.stop();
			this.sort();
		},
		// 重置按钮
		refresh() {
			this.stop();
			this.clear();
			if (this.oldArr.length > 0) {
				this.oldArr.forEach((value, index) =>
					this.$set(this.items, index, value)
				);
			}
			this.current = {};
			this.sortState = 0;
			this.line = 0;
			++this.menuKey;
		},
		// 改变位置
		animation(a, b) {
			let current = this.current;
			if (a === b) {
				this.line = 1;
				return;
			}
			this.stop();
			//a所在的行
			const a_row = Math.floor(a / this.lineNum);
			//a所在的列
			const a_col = Math.floor(a % this.lineNum);
			//b所在的行
			const b_row = Math.floor(b / this.lineNum);
			//b所在的列
			const b_col = Math.floor(b % this.lineNum);
			let draggable_a = new PlainDraggable(
				this.$refs.main.$refs["tag" + a][0].$el
			);
			let draggable_b = new PlainDraggable(
				this.$refs.main.$refs["tag" + b][0].$el
			);
			draggable_a.top += 10 + (b_row - a_row) * 52;
			draggable_b.top -= 10 + (b_row - a_row) * 52;
			let conut = 1;
			const row = (b_col - a_col) * 65;
			const ina = setInterval(() => {
				if (conut === 10) {
					draggable_a.left += row - 9 * Math.floor(row / 10);
					draggable_b.left -= row - 9 * Math.floor(row / 10);
					draggable_a.top -= 10;
					draggable_b.top += 10;
					draggable_a.remove();
					draggable_b.remove();
					//交换
					exch(this.items, current.outside, current.min);
					this.line = 1;
					this.menuKey++;
					clearInterval(ina);
					this.sort();
				} else {
					draggable_a.left += Math.floor(row / 10);
					draggable_b.left -= Math.floor(row / 10);
					conut++;
				}
			}, 100 - this.intervalTime);
		},
	},
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
