import { LucideDownload } from "lucide-react";

export default function LoadingSpin({size} : {size : number}){
  return(
    <div className="flex justify-center items-center">
      <LucideDownload size={size}/><p className="ml-2 text-base">Loading ...</p>
    </div>
  )
}