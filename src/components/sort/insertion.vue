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
				:videoUrl="videoUrl"
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
import Markdown from "../markdown.vue";

export default {
	name: "selection",
	components: {
		SortHeader,
		SortMain,
		SortFooter,
		Markdown,
	},
	data() {
		return {
			// 视频地址
			videoUrl:
				"https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/video/insert-sort.mp4",
			// markdownTitle
			markdownTitle: "插入排序",
			markdownUrl: "./md/InsertionSort.md",
			line: 0,
			resetj: false,
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
			codeDataLsit: [
				`// 插入排序
 /*
 * 直接插入排序
 * 参数说明:
 *     a -- 待排序的数组
 *     n -- 数组的长度
 */
public static void insertSort(int[] a, int n) {
    int i, j, k;

    for (i = 1; i < n; i++) {

        //为a[i]在前面的a[0...i-1]有序区间中找一个合适的位置
        for (j = i - 1; j >= 0; j--)
            if (a[j] < a[i])
                break;

        //如找到了一个合适的位置
        if (j != i - 1) {
            //将比a[i]大的数据向后移
            int temp = a[i];
            for (k = i - 1; k > j; k--)
                a[k + 1] = a[k];
            //将a[i]放到正确位置上
            a[k + 1] = temp;
        }
    }
}`,
			],
		};
	},
	methods: {
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
		step: function () {
			let current = this.current;
			let line = this.line;
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
				this.line = 1.1;
			} else if (this.sortState === 1) {
				//开始排序状态

				//设置当前值
				if (this.line === 1) {
				} else if (this.line === 2) {
					this.resetj = true;
					//设置排序状态为排序中
					this.sortState = 2;
					this.step();
				}
				this.menuKey++;
			} else if (this.sortState === 2) {
				//排序中
				switch (line) {
					case 1.1:
						current.outside = 1;
						this.line = 1.2;
						this.menuKey++;
						break;
					case 1.2:
						//判断外循环
						if (current.outside < length) {
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
					case 1.3:
						current.outside++;
						this.line = 1.2;
						this.menuKey++;
						break;
					case 2.1:
						current.inner = current.outside;
						this.line = 2.2;
						this.menuKey++;
						break;
					case 2.2:
						if (current.inner > 0) {
							this.line = 2.3;
						} else {
							this.line = 1.3;
						}
						this.menuKey++;
						break;
					case 2.3:
						if (
							less(this.items[current.inner], this.items[current.inner - 1])
						) {
							this.textArr.unshift("当前值小于前一个值");
							this.line = 3;
						} else {
							this.textArr.unshift("当前值不小于前一个值");
							this.line = 1.3;
						}
						this.menuKey++;
						break;
					case 2.4:
						current.inner--;
						this.line = 2.2;
						this.menuKey++;
						break;
					case 3:
						this.textArr.unshift("交换数据");
						if (this.hasAnimation) {
							this.animation(current.inner - 1, current.inner);
						} else {
							exch(this.items, current.inner - 1, current.inner);
							this.menuKey++;
							this.line = 2.4;
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
		animation(a, b) {
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
			this.intervalIDanimation = setInterval(() => {
				if (conut === 10) {
					draggable_a.left += row - 9 * Math.floor(row / 10);
					draggable_b.left -= row - 9 * Math.floor(row / 10);
					draggable_a.top -= 10;
					draggable_b.top += 10;
					draggable_a.remove();
					draggable_b.remove();
					exch(this.items, a, b);
					this.line = 2.4;
					this.menuKey++;
					clearInterval(this.intervalIDanimation);
					this.intervalIDanimation = "";
					this.sort();
				} else {
					draggable_a.left += Math.floor(row / 10);
					draggable_b.left -= Math.floor(row / 10);
					conut++;
				}
			}, 90 - this.intervalTime);
		},
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
