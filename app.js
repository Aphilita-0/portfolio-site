// ==================== 文章数据 ====================
const articles = [
    {
        id: 1,
        title: "深入理解 JavaScript 闭包",
        excerpt: "闭包是 JavaScript 中一个重要且强大的概念。本文将带你深入理解闭包的原理、使用场景以及常见的陷阱，帮助你更好地掌握这一核心特性。",
        content: `# 深入理解 JavaScript 闭包

闭包是 JavaScript 中一个重要且强大的概念。让我带你深入理解它。

## 什么是闭包？

闭包是指一个函数能够访问其词法作用域外部的变量。简单来说，当一个内部函数引用了外部函数的变量时，就形成了闭包。

\`\`\`javascript
function outer() {
    const name = '博客主题';
    function inner() {
        console.log(name); // 闭包
    }
    return inner;
}
\`\`\`

## 闭包的经典应用

### 1. 数据私有化

\`\`\`javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        getCount: () => count
    };
}
\`\`\`

### 2. 函数柯里化

\`\`\`javascript
function currying(fn) {
    return function(a) {
        return function(b) {
            return fn(a, b);
        }
    }
}
\`\`\`

## 注意事项

- 闭包会导致内存泄漏，因为引用的变量不会被垃圾回收
- 谨慎在循环中创建闭包
- 合理使用闭包可以提高代码的可维护性

> 闭包是函数式编程的基础，理解它对于深入学习 JavaScript 至关重要。`,
        tags: ["JavaScript", "前端"],
        date: "2026-04-10",
        author: "博客作者"
    },
    {
        id: 2,
        title: "CSS Grid 布局完全指南",
        excerpt: "CSS Grid 是现代 CSS 布局的重要组成部分。本文全面介绍 CSS Grid 的语法、属性和使用技巧，让你轻松实现各种复杂布局。",
        content: `# CSS Grid 布局完全指南

CSS Grid 是二维布局系统，让你能同时控制行和列。

## 基本概念

- **Grid Container**: 网格容器
- **Grid Item**: 网格项
- **Grid Line**: 网格线
- **Grid Cell**: 网格单元格

## 常用属性

### 定义网格

\`\`\`css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}
\`\`\`

### 定位网格项

\`\`\`css
.item {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
\`\`\`

## 实用技巧

1. 使用 \`minmax()\` 创建响应式列
2. 使用 \`auto-fill\` 和 \`auto-fit\` 自动填充
3. 结合 \`place-items\` 快速对齐

> CSS Grid 让复杂的布局变得简单！`,
        tags: ["CSS", "前端", "布局"],
        date: "2026-04-05",
        author: "博客作者"
    },
    {
        id: 3,
        title: "React Hooks 最佳实践",
        excerpt: "React Hooks 彻底改变了我们编写 React 组件的方式。本文分享一些 Hooks 的最佳实践，帮助你写出更优雅的代码。",
        content: `# React Hooks 最佳实践

React Hooks 自 16.8 版本引入以来，彻底改变了我们编写 React 组件的方式。

## useState 的正确使用

\`\`\`jsx
// ❌ 避免
const [count, setCount] = useState(0);

// ✅ 推荐：使用函数式更新
const [count, setCount] = useState(0);
setCount(prev => prev + 1);
\`\`\`

## useEffect 清理

\`\`\`jsx
useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe();
}, []);
\`\`\`

## 自定义 Hook

提取可复用的逻辑到自定义 Hook：

\`\`\`jsx
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    // ...
    return size;
}
\`\`\`

## 性能优化

- 使用 \`useMemo\` 缓存计算结果
- 使用 \`useCallback\` 缓存函数
- 合理拆分组件避免不必要的重渲染

> Hooks 让逻辑复用变得更加简单！`,
        tags: ["React", "前端", "Hooks"],
        date: "2026-03-28",
        author: "博客作者"
    },
    {
        id: 4,
        title: "Node.js 异步编程详解",
        excerpt: "异步编程是 Node.js 的核心。本文深入讲解回调、Promise、async/await 的使用和最佳实践，帮助你更好地处理异步操作。",
        content: `# Node.js 异步编程详解

异步编程是 Node.js 的核心特性，理解它对于构建高效的 Node.js 应用至关重要。

## 回调模式

\`\`\`javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
\`\`\`

## Promise

\`\`\`javascript
const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
\`\`\`

## async/await

\`\`\`javascript
async function main() {
    try {
        const data = await readFile('file.txt');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
\`\`\`

## 错误处理

1. 总是使用 try/catch 处理 async/await
2. 可以在 Promise 链末尾添加 .catch()
3. 使用 \`process.on('unhandledRejection')\` 捕获未处理错误

> 掌握异步编程，才能真正驾驭 Node.js！`,
        tags: ["Node.js", "后端", "异步"],
        date: "2026-03-20",
        author: "博客作者"
    },
    {
        id: 5,
        title: "TypeScript 类型系统入门",
        excerpt: "TypeScript 为 JavaScript 添加了静态类型检查。本文介绍 TypeScript 的基本类型、接口、泛型等核心概念，助你构建更可靠的应用程序。",
        content: `# TypeScript 类型系统入门

TypeScript 是 JavaScript 的超集，为我们提供了强大的类型系统。

## 基本类型

\`\`\`typescript
let name: string = '博客主题';
let age: number = 25;
let isActive: boolean = true;
let list: number[] = [1, 2, 3];
\`\`\`

## 接口

\`\`\`typescript
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性
    readonly id: number; // 只读属性
}
\`\`\`

## 泛型

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}

interface Container<T> {
    value: T;
}
\`\`\`

## 联合类型与交叉类型

\`\`\`typescript
type StringOrNumber = string | number;
type WithName = { name: string };
type WithAge = { age: number };
type Person = WithName & WithAge;
\`\`\`

> TypeScript 让代码更加健壮和可维护！`,
        tags: ["TypeScript", "前端"],
        date: "2026-03-15",
        author: "博客作者"
    },
    {
        id: 6,
        title: "Git 工作流完全指南",
        excerpt: "掌握 Git 是每个开发者的必备技能。本文介绍 Git 的基本命令、分支管理策略以及常见的 Git 工作流，帮助你更好地管理代码版本。",
        content: `# Git 工作流完全指南

Git 是目前最流行的版本控制系统，本文详细介绍 Git 的使用技巧。

## 基本命令

\`\`\`bash
git init          # 初始化仓库
git clone         # 克隆仓库
git add .         # 添加更改
git commit -m     # 提交更改
git push          # 推送到远程
\`\`\`

## 分支管理

\`\`\`bash
git branch feature    # 创建分支
git checkout feature  # 切换分支
git merge feature     # 合并分支
git branch -d feature # 删除分支
\`\`\`

## Git Flow 工作流

1. **main**: 主分支，保持稳定
2. **develop**: 开发分支
3. **feature/**: 功能分支
4. **release/**: 发布分支
5. **hotfix/**: 热修复分支

## 常用技巧

- 使用 \`git stash\` 暂存更改
- 使用 \`git rebase\` 整理提交历史
- 使用 \`git cherry-pick\` 选择性合并

> 熟练使用 Git，让团队协作更加高效！`,
        tags: ["Git", "工具"],
        date: "2026-03-08",
        author: "博客作者"
    }
];

// ==================== 所有标签 ====================
const allTags = [...new Set(articles.flatMap(a => a.tags))].sort();

// ==================== 工具函数 ====================
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getArticlesByTag(tag) {
    return articles.filter(a => a.tags.includes(tag));
}

function getTagCount(tag) {
    return articles.filter(a => a.tags.includes(tag)).length;
}

// ==================== 路由系统 ====================
function router() {
    const hash = window.location.hash || '#/';
    const mainContent = document.getElementById('mainContent');
    
    // 移除 active 状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (hash === '#/' || hash === '') {
        renderHomePage(mainContent);
        document.querySelector('.nav-link[href="#/"]')?.classList.add('active');
    } else if (hash === '#/tags') {
        renderTagsPage(mainContent);
        document.querySelector('.nav-link[href="#/tags"]')?.classList.add('active');
    } else if (hash === '#/about') {
        renderAboutPage(mainContent);
        document.querySelector('.nav-link[href="#/about"]')?.classList.add('active');
    } else if (hash.startsWith('#/article/')) {
        const id = parseInt(hash.split('/')[2]);
        renderArticlePage(mainContent, id);
    } else if (hash.startsWith('#/tag/')) {
        const tag = decodeURIComponent(hash.split('/')[2]);
        renderTagArticlesPage(mainContent, tag);
    } else {
        renderHomePage(mainContent);
    }

    // 滚动到顶部
    window.scrollTo(0, 0);
}

// ==================== 页面渲染函数 ====================

// 首页 - 文章列表
function renderHomePage(container) {
    container.innerHTML = `
        <div class="page-header fade-in">
            <h1 class="page-title">最新文章</h1>
            <p class="page-subtitle">探索技术的无限可能</p>
        </div>
        <div class="article-list">
            ${articles.map(article => `
                <article class="article-card" onclick="window.location.hash='#/article/${article.id}'">
                    <div class="article-cover">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <div class="article-body">
                        <div class="article-tags">
                            ${article.tags.map(tag => `<span class="tag" onclick="event.stopPropagation(); window.location.hash='#/tag/${encodeURIComponent(tag)}'">${tag}</span>`).join('')}
                        </div>
                        <h2 class="article-title">${article.title}</h2>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <div class="article-meta">
                            <span class="article-meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                ${formatDate(article.date)}
                            </span>
                            <span class="article-meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                ${article.author}
                            </span>
                        </div>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}

// 文章详情页
function renderArticlePage(container, id) {
    const article = articles.find(a => a.id === id);
    
    if (!article) {
        container.innerHTML = `
            <div class="empty-state fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>文章未找到</h3>
                <p>抱歉，您访问的文章不存在</p>
                <br>
                <a href="#/" class="back-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    返回首页
                </a>
            </div>
        `;
        return;
    }

    const htmlContent = marked.parse(article.content);

    container.innerHTML = `
        <div class="article-detail fade-in">
            <a href="#/" class="back-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                返回列表
            </a>
            <div class="article-detail-header">
                <div class="article-detail-tags">
                    ${article.tags.map(tag => `<span class="tag" onclick="window.location.hash='#/tag/${encodeURIComponent(tag)}'">${tag}</span>`).join('')}
                </div>
                <h1 class="article-detail-title">${article.title}</h1>
                <div class="article-detail-meta">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -3px; margin-right: 4px;">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${formatDate(article.date)}
                    </span>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -3px; margin-right: 4px;">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        ${article.author}
                    </span>
                </div>
            </div>
            <div class="article-detail-content">
                ${htmlContent}
            </div>
        </div>
    `;
}

// 标签页面
function renderTagsPage(container) {
    container.innerHTML = `
        <div class="page-header fade-in">
            <h1 class="page-title">标签分类</h1>
            <p class="page-subtitle">按标签浏览所有文章</p>
        </div>
        <div class="tags-container">
            ${allTags.map(tag => {
                const tagArticles = getArticlesByTag(tag);
                return `
                    <div class="tag-section fade-in">
                        <div class="tag-header">
                            <div class="tag-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                            </div>
                            <span class="tag-name">${tag}</span>
                            <span class="tag-count">${tagArticles.length} 篇文章</span>
                        </div>
                        <div class="tag-articles">
                            ${tagArticles.map(article => `
                                <div class="tag-article-item" onclick="window.location.hash='#/article/${article.id}'">
                                    <div class="tag-article-title">${article.title}</div>
                                    <div class="tag-article-date">${formatDate(article.date)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// 标签文章列表页
function renderTagArticlesPage(container, tag) {
    const tagArticles = getArticlesByTag(tag);
    
    if (tagArticles.length === 0) {
        container.innerHTML = `
            <div class="empty-state fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>暂无文章</h3>
                <p>该标签下还没有文章</p>
                <br>
                <a href="#/tags" class="back-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    返回标签页
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="fade-in">
            <a href="#/tags" class="back-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                返回标签页
            </a>
            <div class="page-header">
                <h1 class="page-title">标签：${tag}</h1>
                <p class="page-subtitle">共 ${tagArticles.length} 篇文章</p>
            </div>
            <div class="article-list">
                ${tagArticles.map(article => `
                    <article class="article-card" onclick="window.location.hash='#/article/${article.id}'">
                        <div class="article-cover">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <div class="article-body">
                            <div class="article-tags">
                                ${article.tags.map(t => `<span class="tag" onclick="event.stopPropagation(); window.location.hash='#/tag/${encodeURIComponent(t)}'">${t}</span>`).join('')}
                            </div>
                            <h2 class="article-title">${article.title}</h2>
                            <p class="article-excerpt">${article.excerpt}</p>
                            <div class="article-meta">
                                <span class="article-meta-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    ${formatDate(article.date)}
                                </span>
                                <span class="article-meta-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    ${article.author}
                                </span>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

// 关于页面
function renderAboutPage(container) {
    container.innerHTML = `
        <div class="about-container fade-in">
            <div class="about-card">
                <div class="about-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <h1 class="about-name">博客作者</h1>
                <p class="about-title">全栈开发者 / 技术写作者</p>
                <p class="about-bio">
                    你好！我是博客主题的作者，一名热爱技术的全栈开发者。我热衷于分享编程知识、探讨技术最佳实践，以及记录工作中的点点滴滴。
                    <br><br>
                    在这个博客中，你会找到关于前端开发、后端技术、工具使用等方面的文章。希望这些内容能对你有所帮助，也欢迎交流讨论！
                </p>
                <div class="about-stats">
                    <div class="about-stat">
                        <div class="about-stat-value">${articles.length}</div>
                        <div class="about-stat-label">文章</div>
                    </div>
                    <div class="about-stat">
                        <div class="about-stat-value">${allTags.length}</div>
                        <div class="about-stat-label">标签</div>
                    </div>
                    <div class="about-stat">
                        <div class="about-stat-value">1</div>
                        <div class="about-stat-label">作者</div>
                    </div>
                </div>
                <div class="about-links">
                    <a href="https://github.com" target="_blank" class="about-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        GitHub
                    </a>
                    <a href="mailto:example@email.com" class="about-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        邮箱
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ==================== 移动端菜单 ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// 点击菜单项后关闭菜单
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
        mobileMenu.classList.remove('active');
    }
});

// ==================== 初始化 ====================
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// 配置 marked
marked.setOptions({
    breaks: true,
    gfm: true
});
