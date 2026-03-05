# Frontend Toolkit 🛠️

前端开发者工具箱 - 实用工具函数和自定义 Hooks 集合

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/miserylee/frontend-toolkit/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/frontend-toolkit.svg?style=flat)](https://www.npmjs.com/package/frontend-toolkit)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/miserylee/frontend-toolkit/pulls)

---

## ✨ 特性

- 📦 **开箱即用** - 无需配置，直接使用
- 🎯 **TypeScript 友好** - 完整的类型定义
- 🪶 **轻量无依赖** - 零外部依赖，体积小巧
- 🚀 **性能优化** - 经过实战验证的高效实现
- 📚 **文档完善** - 详细的使用示例和 API 文档

---

## 📦 安装

```bash
# npm
npm install frontend-toolkit

# yarn
yarn add frontend-toolkit

# pnpm
pnpm add frontend-toolkit
```

---

## 🚀 快速开始

### 工具函数使用

```javascript
import { formatDate, debounce, parseQuery } from 'frontend-toolkit';

// 日期格式化
formatDate(new Date(), 'YYYY-MM-DD'); // '2024-01-15'

// 防抖
const handleSearch = debounce((keyword) => {
  console.log('搜索:', keyword);
}, 300);

// URL 参数解析
const params = parseQuery('https://example.com?page=1&size=10');
// { page: '1', size: '10' }
```

### Hooks 使用

```javascript
import { useLocalStorage, useDebounce, useWindowSize } from 'frontend-toolkit';

function App() {
  // 持久化状态
  const [name, setName] = useLocalStorage('user-name', '');
  
  // 防抖值
  const debouncedName = useDebounce(name, 500);
  
  // 窗口大小
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>窗口尺寸: {width} x {height}</p>
    </div>
  );
}
```

---

## 📚 API 文档

### 🛠️ 工具函数 (Utils)

#### 日期处理

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `formatDate` | 格式化日期 | `date, format?` | `string` |
| `getRelativeTime` | 获取相对时间 | `date` | `string` |

#### 字符串处理

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `randomString` | 生成随机字符串 | `length?, chars?` | `string` |
| `maskString` | 脱敏处理 | `str, start?, end?` | `string` |

#### 数组/对象操作

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `uniqueArray` | 数组去重 | `arr, key?` | `Array` |
| `deepClone` | 深拷贝 | `obj` | `*` |
| `flattenObject` | 对象扁平化 | `obj, prefix?` | `Object` |

#### URL 参数处理

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `parseQuery` | 解析 URL 参数 | `url?` | `Object` |
| `stringifyQuery` | 序列化 URL 参数 | `params` | `string` |

#### 防抖节流

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `debounce` | 防抖函数 | `fn, delay?` | `Function` |
| `throttle` | 节流函数 | `fn, delay?` | `Function` |

#### Storage 封装

| 函数名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `setStorage` | 设置 localStorage | `key, value, expire?` | `void` |
| `getStorage` | 获取 localStorage | `key` | `*` |
| `removeStorage` | 删除 localStorage | `key` | `void` |
| `clearStorage` | 清空所有 storage | - | `void` |

---

### 🪝 自定义 Hooks (Hooks)

| Hook 名 | 说明 | 返回值 |
|---------|------|--------|
| `useLocalStorage` | 带持久化的 state | `[value, setValue]` |
| `useDebounce` | 防抖值 | `debouncedValue` |
| `useThrottle` | 节流值 | `throttledValue` |
| `useOnline` | 监听网络状态 | `isOnline` |
| `useWindowSize` | 监听窗口大小 | `{ width, height }` |
| `useClickOutside` | 点击外部区域触发 | `ref` |
| `useKeyPress` | 监听键盘按键 | `void` |
| `useCounter` | 计数器 | `{ count, increment, decrement, reset }` |
| `useToggle` | 布尔值切换 | `[value, toggle]` |
| `useMount` | 组件挂载时执行 | `void` |
| `useUnmount` | 组件卸载时执行 | `void` |

---

## 💡 使用场景

### 场景 1：搜索框防抖

```javascript
import { useDebounce } from 'frontend-toolkit';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedKeyword) {
      // 发起搜索请求
      searchAPI(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

### 场景 2：弹窗外部点击关闭

```javascript
import { useClickOutside, useToggle } from 'frontend-toolkit';

function Modal() {
  const [isOpen, toggle] = useToggle(false);
  const ref = useClickOutside(() => isOpen && toggle());

  return (
    <>
      <button onClick={toggle}>打开弹窗</button>
      {isOpen && (
        <div ref={ref} className="modal">
          弹窗内容
        </div>
      )}
    </>
  );
}
```

### 场景 3：表单数据持久化

```javascript
import { useLocalStorage } from 'frontend-toolkit';

function UserForm() {
  const [formData, setFormData] = useLocalStorage('user-form', {
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="姓名"
      />
      {/* 更多表单项... */}
    </form>
  );
}
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT © [小白](https://github.com/miserylee)

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

**Made with ❤️ by 小白（字节跳动前端技术顾问）**
