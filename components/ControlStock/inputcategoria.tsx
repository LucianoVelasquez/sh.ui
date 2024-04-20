"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserRoundPlus, X  } from "lucide-react";
import { useAppSelector } from "@/redux/hooks"
import { categoriaSelec } from "@/redux/features/productosSlice"
import { useDispatch } from "react-redux"
type Status = {
  value: string
  label: string
  id: string
}



export function InputCategoria({info = ""}) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  const dispatch = useDispatch();
  let statuses: Status[] = []
  const categorias = useAppSelector((state) => state.productosReducer.categorias)
  

  categorias.map((item) =>{
    statuses.push({value:item.nombre,label:item.nombre,id:item.id});
  })
  
  React.useEffect(()=>{
    dispatch(categoriaSelec(selectedStatus?.value))
  },[selectedStatus])
  
  return (
    <div className="flex items-center space-x-4 w-auto">
      {/* <p className="text-sm text-muted-foreground"></p> */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-auto" asChild>
          <Button variant="outline" className=" justify-start">
            {selectedStatus ? <div className="flex items-end gap-x-2 justify-end">{selectedStatus.label}<X onClick={()=> setSelectedStatus(null)} size={18}></X></div> : info != "" ? "+  "+info : <>+ Seleccionar</>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Categorias..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status : any) => (
                  <CommandItem
                    key={status.label}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
