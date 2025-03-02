import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="text-center w-full">
        <h1 className="text-4xl text-white font-bold mb-4">Tailwind CSS is Working!</h1>
        <div className="card bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            count is {count}
          </button>
        </div>
        <p className="text-white mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
