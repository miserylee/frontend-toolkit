/**
 * 前端开发者工具箱 - 工具函数库
 * 作者：小白（字节跳动前端技术顾问）
 * 用途：收集常用工具函数，提升开发效率
 */

// ==================== 日期处理 ====================

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象/字符串/时间戳
 * @param {string} format - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间（多久以前）
 * @param {Date|string|number} date - 日期
 * @returns {string} 相对时间描述
 */
export function getRelativeTime(date) {
  const now = Date.now();
  const target = new Date(date).getTime();
  const diff = now - target;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < week) return `${Math.floor(diff / day)}天前`;
  if (diff < month) return `${Math.floor(diff / week)}周前`;
  if (diff < year) return `${Math.floor(diff / month)}个月前`;
  return `${Math.floor(diff / year)}年前`;
}

// ==================== 字符串处理 ====================

/**
 * 生成随机字符串
 * @param {number} length - 长度
 * @param {string} chars - 字符集
 * @returns {string} 随机字符串
 */
export function randomString(length = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * 脱敏处理（手机号、身份证等）
 * @param {string} str - 原始字符串
 * @param {number} start - 开始保留位数
 * @param {number} end - 结尾保留位数
 * @returns {string} 脱敏后的字符串
 */
export function maskString(str, start = 3, end = 4) {
  if (!str) return '';
  const len = str.length;
  if (len <= start + end) return '*'.repeat(len);
  return str.slice(0, start) + '*'.repeat(len - start - end) + str.slice(-end);
}

// ==================== 数组/对象操作 ====================

/**
 * 数组去重
 * @param {Array} arr - 原数组
 * @param {string} key - 去重依据的键（用于对象数组）
 * @returns {Array} 去重后的数组
 */
export function uniqueArray(arr, key) {
  if (!Array.isArray(arr)) return [];
  if (!key) return [...new Set(arr)];
  const map = new Map();
  return arr.filter(item => !map.has(item[key]) && map.set(item[key], 1));
}

/**
 * 深拷贝
 * @param {*} obj - 要拷贝的对象
 * @returns {*} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * 对象扁平化
 * @param {Object} obj - 原对象
 * @param {string} prefix - 前缀
 * @returns {Object} 扁平化后的对象
 */
export function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {});
}

// ==================== URL 参数处理 ====================

/**
 * 解析 URL 参数
 * @param {string} url - URL 字符串
 * @returns {Object} 参数对象
 */
export function parseQuery(url = window.location.href) {
  const queryString = url.split('?')[1] || '';
  const params = {};
  
  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });
  
  return params;
}

/**
 * 序列化对象为 URL 参数
 * @param {Object} params - 参数对象
 * @returns {string} URL 参数字符串
 */
export function stringifyQuery(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

// ==================== 防抖节流 ====================

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（ms）
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（ms）
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, delay = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// ==================== localStorage 封装 ====================

const STORAGE_PREFIX = 'xiaobai_toolkit_';

/**
 * 设置 localStorage
 * @param {string} key - 键
 * @param {*} value - 值
 * @param {number} expire - 过期时间（秒），0 表示永不过期
 */
export function setStorage(key, value, expire = 0) {
  const data = {
    value,
    expire: expire ? Date.now() + expire * 1000 : 0,
  };
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

/**
 * 获取 localStorage
 * @param {string} key - 键
 * @returns {*} 值
 */
export function getStorage(key) {
  const str = localStorage.getItem(STORAGE_PREFIX + key);
  if (!str) return null;
  
  try {
    const data = JSON.parse(str);
    if (data.expire && Date.now() > data.expire) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    return data.value;
  } catch {
    return null;
  }
}

/**
 * 删除 localStorage
 * @param {string} key - 键
 */
export function removeStorage(key) {
  localStorage.removeItem(STORAGE_PREFIX + key);
}

/**
 * 清空所有 storage
 */
export function clearStorage() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

// ==================== 导出所有 ====================
export default {
  formatDate,
  getRelativeTime,
  randomString,
  maskString,
  uniqueArray,
  deepClone,
  flattenObject,
  parseQuery,
  stringifyQuery,
  debounce,
  throttle,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
};
