import PropTypes from "prop-types";  // prop 类型约定，校验

function Greeting(props) {
  console.log(props);
  const {
    message,
    name,
    showIcon,
  } = props;
  console.log(name, message);
  return (
    <div>
      {showIcon && <span>👋</span>}
      <h1>Hello,{name}</h1>
      <p>{message}</p>
    </div>
  )
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  message: {
    type: PropTypes.string,
    defaultValue: "欢迎加入狗熊岭！"
  },
  showIcon: PropTypes.bool,
}

Greeting.defaultProps = {
  message: "欢迎加入狗熊岭！"
}

export default Greeting