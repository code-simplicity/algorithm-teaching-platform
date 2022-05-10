<template>
	<div class="card-box">
		<h3 class="color-white">视频教程</h3>
		<div class="consoleDiv">
			<div id="video"></div>
		</div>
	</div>
</template>

<script>
import Player from "xgplayer/dist/core_player"; //引入西瓜视频库
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
				// rotateFullscreen: true,
				errorTips: `请<span>刷新</span>试试`,
				fluid: true,
				fitVideoSize: "auto",
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
.card-box {
	.consoleDiv {
		display: flex;
		align-items: center;
		position: relative;
		#video {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
