export default function StrategyAction() {
  return (
    <>


      <div className="flex flex-col gap-2 p-5">

        <div className="flex-1">
          <button className="border p-2 hover:bg-gray-400 ml-2 w-full">Compile</button>
        </div>

        <div className="flex-1">
          <button className="border p-2 hover:bg-gray-400 ml-2 w-full">Backtest</button>
        </div>

        <div className="flex-1">
          <button className="border p-2 hover:bg-gray-400 ml-2 w-full">Deploy</button>
        </div>

      </div>

    </>
  )
}