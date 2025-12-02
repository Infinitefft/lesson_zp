/** 
 * @func EditInPlace 就地编辑
 * @params {string} vlaue 初始值
 * @params {element} parentElement 挂载点
 * @params {string} id 自身ID
 */
function EditInPlace(id, value, parentElement) {
    // 一开始会创建 {} 空对象  this指向它
    this.id = id;
    this.value = value || '这个家伙很懒，什么都没有留下';
    this.parentElement = parentElement;
    this.containerElement = null;  // 空对象
    this.saveButton = null;  // 保存
    this.cancelButton = null;  // 取消
    this.staticElement = null;  // 文本 span
    this.fieldElement = null;  // 输入框 input

    // 代码比较多，按照功能分成多个模块 拆函数
    this.createElement();   // DOM 对象创建
    this.attachEvents();  // 事件添加
}
EditInPlace.prototype = {
    // 封装了DOM 操作
    createElement: function() {
        // DOM 动态创建了一个 div 元素 (在内存里)
        this.containerElement = document.createElement('div');
        // this 绑定
        // console.log(this.containerElement, Object.prototype.toString.apply(this.containerElement));
        this.containerElement.id = this.id;
        this.staticElement = document.createElement('span');
        this.staticElement.innerHTML = this.value;
        this.containerElement.appendChild(this.staticElement);

        // 输入框
        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);
        this.parentElement.appendChild(this.containerElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = '保存';
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = '取消';
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();  // 切换到文本显示状态
    },
    convertToText: function() {
        this.fieldElement.style.display = 'none';  // 隐藏
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';  // 可见
    },
    convertToField: function() {
        this.fieldElement.style.display = 'inline';  // 隐藏
        this.fieldElement.value = this.value;
        this.saveButton.style.display = 'inline';  // 可见
        this.cancelButton.style.display = 'inline';  // 可见
        this.staticElement.style.display = 'none';   // 可见
    },
    attachEvents: function() {
        this.staticElement.addEventListener('click', () => {
            this.convertToField();   // 切换到输入框显示状态
        });
        this.saveButton.addEventListener('click', () => {
            this.save();
        });
        this.cancelButton.addEventListener('click', () => {
            this.cancel();
        });
    },
    save: function() {
        var value = this.fieldElement.value;
        this.value = value;
        // fetch 后端存储
        this.staticElement.innerHTML = value;
        this.convertToText();
    },
    cancel: function() {
        this.convertToText();
    }
}