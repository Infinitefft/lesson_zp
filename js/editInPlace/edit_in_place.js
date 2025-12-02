/** 
 * @func EditInPlace 就地编辑
 * @params {string} vlaue 初始值
 * @params {element} parentElement 挂载点
 * @params {string} id 自身ID
 */
function EditInPlace(id, value, parentElement) {
    // {} 空对象  this指向它
    this.id = id;
    this.value = value || '这个家伙很懒，什么都没有留下';
    this.parentElement = parentElement;
    this.createElement();
}
EditInPlace.prototype = {
    createElement: function() {
    //     // DOM 动态创建了一个 div 元素 (在内存里)
        this.containerElement = document.createElement('div');
    //     // this 绑定
    //     console.log(this.containerElement, Object.prototype.toString.apply(this.containerElement));
        this.parentElement.appendChild(this.containerElement);
    },
}