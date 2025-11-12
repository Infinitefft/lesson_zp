// 监听按钮点击事件
document.getElementById('changeColor').addEventListener('click', async () => {
    // 获取当前活动标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // 向当前标签页注入脚本，改变背景颜色
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // 改变页面背景色为绿色
                document.body.style.backgroundColor = '#4CAF50';
                // 也可以考虑改变一些常见元素的背景色，确保效果更好
                const elements = document.querySelectorAll('div, section, main, article');
                elements.forEach(el => {
                    const currentBg = window.getComputedStyle(el).backgroundColor;
                    // 只改变白色或透明背景的元素
                    if (currentBg === 'rgb(255, 255, 255)' || currentBg === 'rgba(0, 0, 0, 0)' || currentBg === 'transparent') {
                        el.style.backgroundColor = '#4CAF50';
                    }
                });
            }
        });
        
        // 可以添加一个简单的反馈
        alert('背景色已更改为绿色！');
    } catch (error) {
        console.error('执行脚本时出错:', error);
        alert('更改背景色失败，请重试。');
    }
});