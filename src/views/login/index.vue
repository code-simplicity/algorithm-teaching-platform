<!--
 * @Author: bugdr
 * @Date: 2022-04-07 08:54:49
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-07 08:54:52
 * @FilePath: \algorithm-teaching-platform\src\views\login\index.vue
 * @Description: 
-->
<template>
	<div class="login-container">
		<div class="login-box animate__animated animate__bounceInRight">
			<div class="login-box-left">
				<el-image
					class="left-img"
					src="https://images.unsplash.com/photo-1636142527476-1a73bbf86ffc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
				></el-image>
			</div>
			<div class="login-box-right">
				<h2>数据结构·排序辅助教学平台</h2>
				<el-form
					:model="userModel"
					:rules="userRules"
					ref="userModel"
					label-width="60px"
				>
					<el-form-item prop="user_name">
						<template #label>
							<i class="el-icon-user"></i>
						</template>
						<el-input
							v-model="userModel.user_name"
							placeholder="用户名"
							type="text"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<template #label>
							<i class="el-icon-lock"></i>
						</template>
						<el-input
							v-model="userModel.password"
							placeholder="密码"
							type="password"
							clearable
							show-password
						></el-input>
					</el-form-item>
					<el-col :span="24">
						<el-button
							style="width: 100%"
							type="primary"
							@click="doLogin('userModel')"
							>登录</el-button
						>
					</el-col>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	props: {},
	data() {
		return {
			userModel: {
				user_name: "admin",
				password: "123456",
			},
			userRules: {
				user_name: [
					{ require: true, message: "请输入用户名", trigger: "blur" },
				],
				password: [{ require: true, message: "请输入密码", trigger: "blur" }],
			},
		};
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {
		doLogin(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 登录逻辑
					const { user_name, password } = this.userModel;
					if (user_name === "admin" && password === "123456") {
						this.$message({
							showClose: true,
							message: "登录成功",
							type: "success",
						});
						this.$router.replace({
							path: "/home",
						});
					} else {
						this.$message({
							message: "用户名/密码不正确",
							type: "error",
						});
					}
				}
			});
		},
	},
	components: {},
};
</script>

<style lang="less" scoped>
.login-container {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.login-box {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8px;
		.login-box-left {
			width: 360px;
			height: 380px;
			.left-img {
				width: 100%;
				height: 100%;
				background-size: 100%;
				border-radius: 8px 0 0 8px;
			}
		}
		.login-box-right {
			flex: 1;
			padding: 16px;
			h2 {
				margin-bottom: 20px;
			}

			/deep/.el-form-item__label {
				background-color: rgb(214, 221, 255);
				font-size: 22px;
				text-align: center;
				padding: 0;
				border-radius: 4px 0 0 4px;
			}
		}
	}
}
</style>
