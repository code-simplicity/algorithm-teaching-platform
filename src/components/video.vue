<template>
	<el-row>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-card class="box-card" shadow="always">
				<div slot="header" style="text-align: center">
					<span>视频教程</span>
				</div>
				<div class="consoleDiv">
					<div style="height: 100%; width: 100%" id="video"></div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import Player from "xgplayer/dist/core_player";
import play from "xgplayer/dist/controls/play";
import fullscreen from "xgplayer/dist/controls/fullscreen";
import progress from "xgplayer/dist/controls/progress";
import volume from "xgplayer/dist/controls/volume";
import pip from "xgplayer/dist/controls/pip";
import flex from "xgplayer/dist/controls/flex";
export default {
	name: "Video",
	props: {
		videoUrl: String, // 视频地址
	},
	data() {
		return {
			// 播放器实例
			Player: {},
		};
	},
	computed: {},
	mounted() {
		this.getVideo();
	},
	methods: {
		getVideo() {
			this.Player = new Player({
				id: "video",
				url: this.videoUrl,
				fitVideoSize: "auto",
				volume: 0.6,
				rotateFullscreen: true,
				errorTips: `请<span>刷新</span>试试`,
				// fluid: true,
				playbackRate: [0.5, 0.75, 1, 1.5, 2],
				defaultPlaybackRate: 1,
				controlPlugins: [play, fullscreen, progress, volume, pip, flex],
				pip: true, //打开画中画功能
			});
		},
		// 销毁实例
		destroyPlayer() {
			this.Player.destroy(true);
		},
	},
	// 销毁视频实例
	destroyed() {
		this.destroyPlayer();
	},
};
</script>

<style scoped lang="less">
.box-card {
	margin: 0 0 10px 0;
	.consoleDiv {
		display: flex;
		align-items: center;
		justify-content: center;
		// width: 100%;
	}
}
</style>
