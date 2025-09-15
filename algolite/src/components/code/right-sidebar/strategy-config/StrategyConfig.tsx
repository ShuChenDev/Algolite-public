"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StrategyConfig() {
  return (
    <>
      <div className="flex flex-col gap-2 w-full p-2">
        <div className="flex-1">

          <div>
            <span className="text-2xl">Environment Variables</span>
          </div>

          <div className="flex gap-2 items-center mt-2">
            DATABASE_URL
            <Input
              type="password"
              placeholder="postgresql://<user><:password>@><netloc><:port></dbname><?param1=value1&...>"
              className="border border-black bg-stone-200 w-60 ml-auto"
            />
          </div>

          <div className="mt-4 flex gap-2 items-center">
          POLYGON_API_KEY
            <Input
              type="password"
              placeholder="W_AB3C4DEFG56J"
              className="border border-black bg-stone-200 w-60 ml-auto"
            />
          </div>
        </div>

        {/* <div className="w-full">   */}

        <div className="w-full border-t border-stone-600" />

        <div className="flex flex-col p-2 w-full gap-2">
          <Button
            variant="outline"
            className="w-full rounded-sm border border-black bg-stone-200 p-5 hover:bg-gray-400"
          >
            Save
          </Button>
        </div>

      </div>
    </>
  )
}