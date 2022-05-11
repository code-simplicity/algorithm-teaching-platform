import Vue from "vue";
import Vuex from "vuex";
import { getLocalStorage, setLocalStorage } from "../util/localstorage";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hasAnimation: false,
		lineNum: 1,
		size: "xl",
		// 顶部菜单栏是否收缩
		dropDownShow: false,
		// 侧边栏收缩
		isCollapse: false,
	},
	getters: {
		getIsCollapse: (state) => {
			return state.isCollapse || getLocalStorage("is_collapse_");
		},
		getDropDownShow: (state) => {
			return state.dropDownShow || getLocalStorage("drop_downShow_");
		},
	},
	mutations: {
		CHANGE_STATE: (state, data) => {
			state[data.key] = data.val;
		},
		setDropDownShow: (state, data) => {
			state.dropDownShow = data;
		},
		setIsCollapse: (state, data) => {
			state.isCollapse = data;
		},
	},
	actions: {
		changeState({ commit }, data) {
			commit("CHANGE_STATE", data);
		},
		changeDropDownShow({ commit }, data) {
			setLocalStorage("drop_downShow_", data);
			// 设置状态
			commit("setDropDownShow", data);
		},
		changeIsCollapse({ commit }, data) {
			setLocalStorage("is_collapse_", data);
			// 设置状态
			commit("setIsCollapse", data);
		},
	},
});

export default store;
