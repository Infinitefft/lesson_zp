# learn git

- 同一个项目中不能有多个git 仓库
    管理代码，不能有多个仓库，乱
- git 加入前
    - 开发目录
    - 代码仓库 git init
    .git 隐藏目录 仓库
    默认创建master分支
    管理文件的不同版本
    大型项目、多人协作

- git status
    查看当前状态 非常基础且重要的命令，在任何决定前都用这行命令来了解仓库
    尚未提交 不在仓库
    未跟踪的文件 不在暂存区
    git add readme.txt 添加到暂存区（stage）
    git commit -m 'wrote readme.txt file' 提交到仓库 一定要根据功能表达好
    - 提交到仓库的当前（master）分支，有一个唯一的ID（sha算法，唯一的长串）
    为什么不用自增ID？
    多人协作的 自增ID容易出问题，hashID 唯一
    2 insertions 2行新增
    提交仓库的是文件的修改，生成的是文件的新的版本

- git diff 查看代码和仓库的差异
    重大提交前， 先diff 再提交， 好习惯
- 干净
- 3dfd4be (HEAD -> master) append GPL
    HEAD 指针 指向当前分支的最新提交
    移动指针去穿越
- 版本回退
    git reset --hard HEAD^
    HEAD 代表当前指针
    ^2 回退两个版本
    给版本号 回退到任何指定的版本

- git checkout -- readme.txt
    readme.txt在工作区的修改全部撤销