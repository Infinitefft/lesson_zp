// console.log("手搓react源码");
function createElement(type, props, ...children) {
  // console.log(type, props, children);
  // 返回 element 对象
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object'   // child 是对象（已经是虚拟 DOM）
        ? child  // 虚拟DOM 对象 element
        : createTextElement(child)  // 退出条件 文本节点
      )
    }
  }
}


// 创建文本节点
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(element, container) {
  // 递的过程创建

  // console.log(element, container);
  const dom = element.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type);

  // createElement返回的props定义了children，所以要过滤掉 children 属性
  const isProperty = key => key !== 'children';
  Object.keys(element.props)  // Object.keys()：遍历这个对象，拿到所有 key
  .filter(isProperty).forEach(name => {
    // console.log(name, '()()()()');
    dom[name] = element.props[name];
    // dom[name] = element.props[name];
    //     ^^^^                  ^^^^
    //     key                 取 value

    // dom['className'] = 'box';      // dom.className = 'box'
    // dom['style'] = 'color:red';    // dom.style = 'color:red'
  })
  element.props.children.forEach(child => render(child, dom));

  // 归的过程挂载
  container.appendChild(dom);
}


window.Didact = {
  createElement,  // 创建虚拟DOM
  render,  // 渲染虚拟DOM
}

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
  <div style="background:salmon">
    <h1>Hello, world!</h1>
    <h2 style="text-align:right">from Didact</h2>
  </div>
)

const container = document.getElementById('root');
Didact.render(element, container)