/**
 * 统计数据组件
 * 用于展示项目的关键统计数据
 */

class StatsComponent {
    constructor() {
        // 统计数据
        this.stats = [
            { label: '项目数量', value: 0, target: 100, icon: '📁' },
            { label: '满意用户', value: 0, target: 1000, icon: '😊' },
            { label: '代码行', value: 0, target: 50000, icon: '💻' },
            { label: '贡献者', value: 0, target: 50, icon: '👥' }
        ];
        
        this.isAnimating = false;
        this.animationDuration = 2000; // 动画持续时间（毫秒）
        this.frameDuration = 16; // 每帧持续时间（约60fps）
        this.totalFrames = Math.round(this.animationDuration / this.frameDuration);
        this.easeOutQuad = (t) => t * (2 - t); // 缓动函数
    }
    
    // 创建统计组件HTML结构
    createStatsHTML() {
        const statsSection = document.createElement('section');
        statsSection.className = 'stats';
        statsSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">项目统计</h2>
                <div class="stats-grid" id="statsGrid">
                    <!-- 统计卡片将动态生成 -->
                </div>
            </div>
        `;
        
        // 将统计组件插入到关于部分之前
        const aboutSection = document.querySelector('.about');
        if (aboutSection && aboutSection.parentNode) {
            aboutSection.parentNode.insertBefore(statsSection, aboutSection);
        }
        
        // 添加统计卡片
        this.renderStatsCards();
    }
    
    // 渲染统计卡片
    renderStatsCards() {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;
        
        this.stats.forEach(stat => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML = `
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-value" data-target="${stat.target}">${this.formatNumber(stat.value)}</div>
                <div class="stat-label">${stat.label}</div>
            `;
            statsGrid.appendChild(card);
        });
        
        // 添加样式
        this.addStatsStyles();
    }
    
    // 添加统计组件样式
    addStatsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .stats {
                padding: var(--spacing-xl) 0;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: var(--white-color);
            }
            
            .stats .section-title {
                color: var(--white-color);
            }
            
            .stats .section-title::after {
                background-color: var(--white-color);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--spacing-lg);
                margin-top: var(--spacing-lg);
            }
            
            .stat-card {
                text-align: center;
                padding: var(--spacing-lg);
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: var(--border-radius-lg);
                backdrop-filter: blur(10px);
                transition: transform var(--transition-normal), background-color var(--transition-normal);
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .stat-icon {
                font-size: var(--font-size-xxl);
                margin-bottom: var(--spacing-sm);
            }
            
            .stat-value {
                font-size: var(--font-size-xl);
                font-weight: 700;
                margin-bottom: var(--spacing-xs);
            }
            
            .stat-label {
                font-size: var(--font-size-normal);
                opacity: 0.9;
            }
            
            @media (max-width: 480px) {
                .stats-grid {
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                }
                
                .stat-card {
                    padding: var(--spacing-md);
                }
                
                .stat-value {
                    font-size: var(--font-size-large);
                }
                
                .stat-icon {
                    font-size: var(--font-size-xl);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 动画计数效果
    animateCounters() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        let frame = 0;
        
        const animate = () => {
            frame++;
            const progress = this.easeOutQuad(frame / this.totalFrames);
            
            this.stats.forEach((stat, index) => {
                const newCount = Math.round(stat.target * progress);
                const valueElement = document.querySelectorAll('.stat-value')[index];
                if (valueElement) {
                    valueElement.textContent = this.formatNumber(newCount);
                }
            });
            
            if (frame < this.totalFrames) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
            }
        };
        
        animate();
    }
    
    // 格式化数字（添加千位分隔符）
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // 检查元素是否在视口中
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // 初始化组件
    init() {
        // 创建统计组件
        this.createStatsHTML();
        
        // 添加滚动监听
        window.addEventListener('scroll', () => {
            const statsSection = document.querySelector('.stats');
            if (statsSection && this.isElementInViewport(statsSection) && !this.isAnimating) {
                this.animateCounters();
            }
        });
        
        // 初始检查（如果页面加载时统计组件就在视口中）
        const statsSection = document.querySelector('.stats');
        if (statsSection && this.isElementInViewport(statsSection)) {
            this.animateCounters();
        }
    }
}

// 导出组件
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StatsComponent;
} else {
    window.StatsComponent = StatsComponent;
}

// 如果直接在浏览器中运行，自动初始化
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const statsComponent = new StatsComponent();
        statsComponent.init();
    });
}