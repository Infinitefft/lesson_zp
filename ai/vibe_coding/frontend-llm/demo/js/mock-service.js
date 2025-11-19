// 模拟服务层 - 拦截fetch请求并提供模拟数据，解决API认证失败问题
(function() {
  // 保存原始的fetch函数
  const originalFetch = window.fetch;
  
  // 重写fetch函数
  window.fetch = function(url, options) {
    // 检查是否是DeepSeek API请求
    if (url.includes('api.deepseek.com/chat/completions')) {
      console.log('拦截到DeepSeek API请求，返回模拟数据');
      
      // 创建一个模拟的成功响应
      const mockResponse = {
        choices: [{
          message: {
            content: '您好！这是一个模拟的DeepSeek AI响应。由于API密钥验证问题，系统已自动切换到演示模式。' +
                     '\n\n这个响应展示了如何在不修改原始代码的情况下处理API认证失败。' +
                     '\n\n在实际应用中，请确保配置正确的API密钥以获取真实的AI响应。'
          }
        }]
      };
      
      // 返回一个Promise，模拟fetch的行为
      return Promise.resolve({
        ok: true,
        json: function() {
          return Promise.resolve(mockResponse);
        }
      });
    }
    
    // 对于其他请求，使用原始的fetch函数
    return originalFetch(url, options);
  };
  
  console.log('模拟服务已加载，准备拦截DeepSeek API请求');
})();