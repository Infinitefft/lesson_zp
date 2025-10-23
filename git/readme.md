# git 分布式版本控制软件

- lesson_zp 本地项目文件夹,没有版本控制能力的
    文件版本无法退回
    多人协作的 git就是月光宝盒
- 远程仓库 
    gitee 码云
- git init
    本地代码仓库，可以存储文件的不同版本
    .git 隐藏目录 仓库
git 配置
- git config --global user.name "gustt"
  git config --global user.email "16337193+gustt@user.noreply.gitee.com"

- git add .   .代表添加所有的修改
    将文件添加到暂存区
- git commit -m '第一次提交' 确认提交
- git remote add origin ...
- git push orgin master 本地代码提交到远程的仓库