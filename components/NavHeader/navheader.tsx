'use client'
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function NavHeader() {
  const path = usePathname()
  const sinBarra = (path :string) : any => {
    let split = path.split("");
    for(let i = 1; i <= split.length; i++){

     if(i == 1){
        split[i-1] = split[i].toLocaleUpperCase()
      } else{
        split[i-1] = split[i]
      }
    }
    
    return split.join("")
  }
  const newPath = sinBarra(path)


  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={`${path}`}>{newPath}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
