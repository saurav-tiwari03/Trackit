"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()

  const [light,setLight] = React.useState(false);
  
  const themeChanger = () => {
    if(light) {
      setTheme("dark")
      setLight(false)
    } else {
      setTheme("light")
      setLight(true)
    }
  }

  return (
    <div>
      <button className="p-2" onClick={themeChanger}>
        {
          light? (
            <Sun />
          ) : (
            <Moon />
          )

  
        }
      </button>
    </div>
  )
}
