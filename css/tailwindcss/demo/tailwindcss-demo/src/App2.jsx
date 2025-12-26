const ArticleCard = () => {
  // JSX + TailWindCss(UI的一部分) = UI
  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">Tailwindcss</h2>
      <p className="text-gray-500 mt-2">
        用utlity class 快速构建 UI
      </p>
    </div>
  )
}


export default function App() {
  return (
    // <div className="flex justify-center items-center bg-blue-500">
    //   1111
    // </div>
    // Fragment
    <>
      <h1>111</h1>
      <h2>222</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">提交</button>
      <button className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">默认</button>
      <ArticleCard/>
    </>
  )
}