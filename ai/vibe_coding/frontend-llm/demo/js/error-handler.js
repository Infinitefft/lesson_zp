// 全局错误处理层 - 捕获JavaScript错误并提供友好的用户反馈
(function() {
  // 添加全局错误处理器
  window.onerror = function(message, source, lineno, colno, error) {
    console.error('发生错误:', message, source, lineno, colno, error);
    
    // 检查是否是在main.js中的错误
    if (source && source.includes('main.js')) {
      // 显示友好的错误信息到页面上
      const replyElement = document.getElementById('reply');
      if (replyElement) {
        replyElement.textContent = '系统提示: 无法连接到API服务，请检查您的网络连接或API配置。';
        replyElement.style.color = '#ff6b6b';
      }
    }
    
    // 阻止默认错误处理
    return true;
  };
  
  // 处理Promise未捕获的拒绝
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise未处理的拒绝:', event.reason);
  });
  
  console.log('全局错误处理已加载');
})();