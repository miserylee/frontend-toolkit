# 前端开发者工具箱 - 在线小工具

## 1. JSON 格式化

```javascript
/**
 * JSON 格式化工具
 */
export function formatJSON(json, indent = 2) {
  try {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    return JSON.stringify(json, null, indent);
  } catch (e) {
    return `无效 JSON: ${e.message}`;
  }
}

/**
 * JSON 压缩
 */
export function minifyJSON(json) {
  try {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    return JSON.stringify(json);
  } catch (e) {
    return `无效 JSON: ${e.message}`;
  }
}
```

## 2. 时间戳转换

```javascript
/**
 * 时间戳转日期字符串
 */
export function timestampToDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(timestamp);
  return formatDate(date, format);
}

/**
 * 日期字符串转时间戳
 */
export function dateToTimestamp(dateStr) {
  return new Date(dateStr).getTime();
}

/**
 * 获取当前时间戳
 */
export function now() {
  return Date.now();
}
```

## 3. Base64 编解码

```javascript
/**
 * Base64 编码
 */
export function base64Encode(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return `编码失败：${e.message}`;
  }
}

/**
 * Base64 解码
 */
export function base64Decode(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return `解码失败：${e.message}`;
  }
}
```

## 4. 颜色格式转换

```javascript
/**
 * HEX 转 RGB
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * RGB 转 HEX
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * 生成随机颜色
 */
export function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}
```

## 5. URL 参数工具

```javascript
/**
 * 解析 URL 参数
 */
export function parseURLParams(url = window.location.href) {
  const params = {};
  const queryString = url.split('?')[1] || '';
  
  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });
  
  return params;
}

/**
 * 构建 URL 参数
 */
export function buildURLParams(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
```

## 下一步

- [ ] 实现 React 组件版本
- [ ] 添加 CSS 生成器（阴影、渐变）
- [ ] 添加正则表达式测试
- [ ] 添加 Markdown 预览
