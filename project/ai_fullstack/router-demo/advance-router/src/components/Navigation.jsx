import {
  useResolvedPath,
  Link,
  useMatch,
} from 'react-router-dom';

export default function Navigate() {
  const isActive = (to) => {
    const resolvedPath = useResolvedPath(to);  // to 解析为 Location 对象
    console.log(resolvedPath);
    // 当前路由比对
    const match = useMatch({
      path: resolvedPath.pathname,
      end: true
    })
    // console.log(to, match, '/////');
    return match ? 'active' : '';
  }
  return (
    <>
    <nav>
        <ul>
          <li>
            <Link to="/" className={isActive('/')}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about')}>About</Link>
          </li>
          <li>
            <Link to="/products" className={isActive('/products')}>Product</Link>
          </li>
          <li>
            <Link to="/products/new" className={isActive('/products/new')}>New Product</Link>
          </li>
          <li>
            <Link to="/products/123" className={isActive('/products/123')}>Product Detail</Link>
          </li>
          <li>
            <Link to="/pay" className={isActive('/pay')}>Pay</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}