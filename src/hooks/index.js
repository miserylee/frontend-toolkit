/**
 * 前端开发者工具箱 - 自定义 Hooks
 * 作者：小白（字节跳动前端技术顾问）
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ==================== useLocalStorage ====================

/**
 * 带持久化的 state
 * @param {string} key - storage 键名
 * @param {*} initialValue - 初始值
 * @returns {[*, Function]} [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// ==================== useDebounce ====================

/**
 * 防抖值
 * @param {*} value - 要防抖的值
 * @param {number} delay - 延迟时间（ms）
 * @returns {*} 防抖后的值
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ==================== useThrottle ====================

/**
 * 节流值
 * @param {*} value - 要节流的值
 * @param {number} delay - 延迟时间（ms）
 * @returns {*} 节流后的值
 */
export function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdated.current >= delay) {
      setThrottledValue(value);
      lastUpdated.current = now;
    } else {
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = Date.now();
      }, delay - (now - lastUpdated.current));

      return () => clearTimeout(handler);
    }
  }, [value, delay]);

  return throttledValue;
}

// ==================== useOnline ====================

/**
 * 监听网络状态
 * @returns {boolean} 是否在线
 */
export function useOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// ==================== useWindowSize ====================

/**
 * 监听窗口大小
 * @returns {{ width: number, height: number }} 窗口尺寸
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// ==================== useClickOutside ====================

/**
 * 点击外部区域触发
 * @param {Function} handler - 点击外部时的回调
 * @returns {React.RefObject} ref
 */
export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handler]);

  return ref;
}

// ==================== useKeyPress ====================

/**
 * 监听键盘按键
 * @param {string} targetKey - 目标按键
 * @param {Function} handler - 回调函数
 */
export function useKeyPress(targetKey, handler) {
  const downHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => window.removeEventListener('keydown', downHandler);
  }, [downHandler]);
}

// ==================== useCounter ====================

/**
 * 计数器
 * @param {number} initialValue - 初始值
 * @returns {{ count: number, increment: Function, decrement: Function, reset: Function }}
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// ==================== useToggle ====================

/**
 * 布尔值切换
 * @param {boolean} initialValue - 初始值
 * @returns {[boolean, Function]} [value, toggle]
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// ==================== useMount ====================

/**
 * 组件挂载时执行
 * @param {Function} fn - 回调函数
 */
export function useMount(fn) {
  useEffect(() => fn(), []);
}

// ==================== useUnmount ====================

/**
 * 组件卸载时执行
 * @param {Function} fn - 回调函数
 */
export function useUnmount(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
}

// ==================== 导出所有 ====================
export default {
  useLocalStorage,
  useDebounce,
  useThrottle,
  useOnline,
  useWindowSize,
  useClickOutside,
  useKeyPress,
  useCounter,
  useToggle,
  useMount,
  useUnmount,
};
