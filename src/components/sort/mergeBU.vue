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
				:key="menuKey"
				:current="current"
				:items="items"
				method="mergeBU"
				:demo-tag="demoTag"
				:sort-state="sortState"
			/>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-card class="box-card" shadow="hover">
						<div slot="header">
							<span>左侧数组</span>
						</div>
						<div>
							<el-tag
								class="tagClass"
								v-for="(item, index) in aux"
								v-if="index >= current.i && index <= current.mid"
								>{{ item }}</el-tag
							>
						</div>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="box-card" shadow="hover">
						<div slot="header">
							<span>右侧数组</span>
						</div>
						<div>
							<el-tag
								class="tagClass"
								v-for="(item, index) in aux"
								v-if="index >= current.j && index <= current.hi"
								:key="index"
								>{{ item }}</el-tag
							>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="el-footer-box">
			<SortFooter
				:text-arr="textArr"
				method="mergeBU"
				@clear="clear"
				:codeDataLsit="codeDataLsit"
			/>
		</div>
	</div>
</template>

<script>
import { less, createArr } from "../../util/util";
import SortHeader from "./modules/SortHeader";
import SortMain from "./modules/SortMain";
import SortFooter from "./modules/SortFooter";
import Markdown from "../markdown.vue";
export default {
	name: "mergeBU",
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
				"https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/video/merge-sort2.mp4",
			// markdownTitle
			markdownTitle: "归并排序2",
			markdownUrl: "./md/MergeSort.md",
			demoTag: [
				{ text: "未排序元素", type: "info", effect: "plain" },
				{ text: "当前归并的元素范围", type: "warning", effect: "plain" },
				{ text: "当前归并的元素", type: "danger", effect: "plain" },
			],
			menuKey: 1,
			//当前值
			current: {
				//左侧下标
				i: "",
				//右侧下标
				j: "",
				//当前下标
				k: "",
				//外循环
				sz: "",
				//内循环
				lo: "",
				//中间值
				mid: "",
				hi: "",
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
			//辅助数组
			aux: [],
			//未排序数组
			oldArr: [],
			//控制台数组
			textArr: [],
			//定时器编号
			intervalID: -1,
			//定时器速度
			intervalTime: 50,
			// 代码
			codeDataLsit: [
				`// 归并排序
/*
 * 将一个数组中的两个相邻有序区间合并成一个
 *
 * 参数说明:
 *     a -- 包含两个有序区间的数组
 *     start -- 第1个有序区间的起始地址。
 *     mid   -- 第1个有序区间的结束地址。也是第2个有序区间的起始地址。
 *     end   -- 第2个有序区间的结束地址。
 */
public static void merge(int[] a, int start, int mid, int end) {
    int[] tmp = new int[end - start + 1];    // tmp是汇总2个有序区的临时区域
    int i = start;            // 第1个有序区的索引
    int j = mid + 1;        // 第2个有序区的索引
    int k = 0;                // 临时区域的索引

    while (i <= mid && j <= end) {
        if (a[i] <= a[j])
            tmp[k++] = a[i++];
        else
            tmp[k++] = a[j++];
    }

    while (i <= mid)
        tmp[k++] = a[i++];

    while (j <= end)
        tmp[k++] = a[j++];

    // 将排序后的元素，全部都整合到数组a中。
    for (i = 0; i < k; i++)
        a[start + i] = tmp[i];

    tmp = null;
}

/*
 * 归并排序(从上往下)
 *
 * 参数说明:
 *     a -- 待排序的数组
 *     start -- 数组的起始地址
 *     endi -- 数组的结束地址
 */
public static void mergeSortUp2Down(int[] a, int start, int end) {
    if (a == null || start >= end)
        return;

    int mid = (end + start) / 2;
    mergeSortUp2Down(a, start, mid); // 递归排序a[start...mid]
    mergeSortUp2Down(a, mid + 1, end); // 递归排序a[mid+1...end]

    // a[start...mid] 和 a[mid...end]是两个有序空间，
    // 将它们排序成一个有序空间a[start...end]
    merge(a, start, mid, end);
}`,
			],
		};
	},
	methods: {
		sort() {
			this.intervalID = setInterval(this.step, 1000 - this.intervalTime * 10);
		},
		step: function () {
			let current = this.current;
			const length = this.items.length;
			if (length <= 0) {
				this.$message({
					message: "数组为空",
					type: "warning",
				});
				this.stop();
				return;
			}
			//判断排序状态
			if (this.sortState === 0) {
				//未排序状态
				//设置排序状态为开始排序
				this.sortState = 1;
				this.textArr.unshift("开始排序");
				this.step();
			} else if (this.sortState === 1) {
				//开始排序状态
				//设置当前值
				this.changeCurrent();
				//设置排序状态为排序中
				this.sortState = 2;
			} else if (this.sortState === 2) {
				//排序中
				//归并当前函数栈中
				if (current.i > current.mid) {
					this.textArr.unshift("左侧数组用完 放右侧元素");
					this.$set(this.items, current.k++, this.aux[current.j++]);
				} else if (current.j > current.hi) {
					this.textArr.unshift("右侧数组用完 放左侧元素");
					this.$set(this.items, current.k++, this.aux[current.i++]);
				} else if (less(this.aux[current.i], this.aux[current.j])) {
					this.textArr.unshift("左侧元素比右侧元素小 放左侧元素");
					this.$set(this.items, current.k++, this.aux[current.i++]);
				} else {
					this.textArr.unshift("左侧元素不比右侧元素小 放右侧元素");
					this.$set(this.items, current.k++, this.aux[current.j++]);
				}
				//设置当前值
				this.changeCurrent();
			} else if (this.sortState === 3) {
				//已排序
				this.$message({
					message: "排序已经完成",
					type: "warning",
				});
				this.stop();
			}
		},
		changeAux() {
			for (let k = this.current.lo; k <= this.current.hi; k++) {
				this.$set(this.aux, k, this.items[k]);
			}
		},
		/**
		 * 改变当前值
		 * @param flag 是否结束当前循环
		 */
		changeCurrent(flag) {
			let current = this.current;
			if (this.sortState === 1) {
				current.sz = 1;
				current.lo = 0;
				current.mid = 0;
				current.hi = 1;
				current.i = 0;
				current.j = 1;
				current.k = 0;
				this.changeAux();
				//复制数组
				this.items.forEach((value, index) =>
					this.$set(this.oldArr, index, value)
				);
			} else {
				if (current.k > current.hi) {
					//当前范围归并结束
					if (current.lo > this.items.length - 3 * current.sz) {
						//内循环结束
						if (current.sz * 2 > this.items.length) {
							//排序完成
							this.textArr.unshift("排序完成");
							this.sortState = 3;
							this.current = {};
							this.stop();
						} else {
							//继续外循环
							current.sz *= 2;
							current.lo = 0;
							current.mid = current.sz - 1;
							current.hi = Math.min(current.sz * 2 - 1, this.items.length - 1);
							current.i = current.lo;
							current.j = current.mid + 1;
							current.k = current.lo;
							this.changeAux();
						}
					} else {
						//继续内循环
						current.lo += current.sz * 2;
						current.mid = current.lo + current.sz - 1;
						current.hi = Math.min(
							current.lo + current.sz * 2 - 1,
							this.items.length - 1
						);
						current.i = current.lo;
						current.j = current.mid + 1;
						current.k = current.lo;
						this.changeAux();
					}
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
			while (this.items.length > 0 && !this.isSort) {
				this.step();
			}
		},
		//暂停按钮
		stop() {
			clearInterval(this.intervalID);
			this.intervalID = -1;
		},
		changeInterval() {
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
			++this.menuKey;
		},
	},
	computed: {
		//是否排序完成
		isSort() {
			return this.sortState === 3;
		},
	},
};
</script>

<style lang="less" scoped>
.tagClass {
	margin: 10px;
}
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
