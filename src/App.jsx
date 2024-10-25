function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind CSS is Working! 🎉
        </h1>

        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Blue Button
          </button>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Green Button
          </button>

          <div className="flex gap-2">
            <div className="bg-red-200 rounded-full w-8 h-8"></div>
            <div className="bg-yellow-200 rounded-full w-8 h-8"></div>
            <div className="bg-blue-200 rounded-full w-8 h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
