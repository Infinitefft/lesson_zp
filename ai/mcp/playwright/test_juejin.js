const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  console.log('启动浏览器...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('访问掘金首页...');
  await page.goto('https://juejin.cn/');

  console.log('等待页面加载...');
  await page.waitForLoadState('networkidle');

  console.log('查找并点击"插件"链接...');
  // 掘金顶部导航栏的插件链接通常包含文本 "插件"
  // 我们可以尝试通过文本内容来定位
  const pluginLink = page.getByRole('link', { name: '插件' });
  
  if (await pluginLink.count() > 0) {
      await pluginLink.click();
      console.log('已点击"插件"链接');
  } else {
      console.log('未找到直接的"插件"链接，尝试更宽泛的选择器');
      // 备用选择器，根据实际页面结构可能需要调整
      await page.click('text=插件');
  }

  console.log('等待页面跳转及加载...');
  await page.waitForLoadState('networkidle');
  // 稍微多等待一下以确保动态内容加载
  await page.waitForTimeout(2000);

  const screenshotPath = path.join(__dirname, 'juejin_plugins.png');
  console.log(`截图并保存到: ${screenshotPath}`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log('检查页面内容...');
  const content = await page.content();
  const hasPluginContent = content.includes('插件');
  
  if (hasPluginContent) {
    console.log('验证成功：页面包含"插件"相关内容。');
  } else {
    console.log('验证警告：页面未检测到"插件"相关文本。');
  }

  await browser.close();
  console.log('测试完成。');
})();
