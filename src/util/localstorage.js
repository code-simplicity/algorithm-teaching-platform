// 获取缓存
export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

// 设置缓存
export function setLocalStorage(key, value) {
	localStorage.setItem(key, value);
}

/**
 * 清除所有的缓存
 */
export function clearLocalStorage() {
	localStorage.clear();
}
