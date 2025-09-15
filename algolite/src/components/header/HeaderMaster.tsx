"use client"
import { useState } from "react"

import Link from "next/link"

import { Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";
import Image from "next/image"

export default function HeaderMaster({
  strategy_server_state,
  set_strategy_server_state,
  broker_server_state,
  set_broker_server_state,
}: {
  strategy_server_state: boolean
  set_strategy_server_state: React.Dispatch<React.SetStateAction<boolean>>
  broker_server_state: boolean
  set_broker_server_state: React.Dispatch<React.SetStateAction<boolean>>
}) {


  return (
    <>
      <div className="flex mt-2 mb-2">
        <div className="flex gap-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <div className="text-2xl ">
              <Link
                href="/"
              >
                Algolite
              </Link>
            </div>


          </Button>

          <Badge variant="outline" className="flex items-center gap-2 text-md shadow-md">
            <span
              className={`h-2 w-2 rounded-full ${strategy_server_state ? "bg-green-700" : "bg-red-700"
                }`}
            />
            Strategy Server Status
          </Badge>

          <Badge variant="outline" className="flex items-center gap-2 text-md shadow-md">
            <span
              className={`h-2 w-2 rounded-full ${broker_server_state ? "bg-green-700" : "bg-red-700"
                }`}

            />
            Broker Server Status
          </Badge>

        </div>

        <div className="flex ml-auto gap-2 mr-4">

          <Button variant="outline" className="flex items-center gap-2 shadow-md" asChild>
            <Link
              href="https://github.com/ShuChenDev/Algolite-public/releases"
              target="_blank"
            >
              Download Strategy Server
            </Link>
          </Button>


          <Button variant="outline" className="flex items-center gap-2 shadow-md" asChild>
            <Link
              href="https://www.interactivebrokers.ca/en/trading/ibgateway-latest.php"
              target="_blank"
            >
              Download Broker Server
            </Link>
          </Button>
          {/* 
          <Button variant="outline" className="flex items-center gap-2 shadow-md">
            Help
          </Button> */}

          <Button variant="outline" className="flex items-center gap-2 shadow-md" asChild>
            <Link
              href="/docs"
              target="_blank"
            >
              #Doc
            </Link>
          </Button>

          <Button
            variant="outline"
            className="flex items-center p-4 justify-center shadow-md"
            asChild
          >
            <Link
              href="https://github.com/ShuChenDev/Algolite-public"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/img/github-mark.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="mr-1"
              />
              Github
            </Link>
          </Button>
        </div>


      </div >
    </>
  )
}