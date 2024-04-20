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
import { addClienteVenta } from "@/redux/features/productosSlice"
import { useDispatch } from "react-redux"
type Status = {
  value: string
  label: string
  id: string
}



export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  const dispatch = useDispatch();
  let statuses: Status[] = []
  const clientes = useAppSelector((state) => state.productosReducer.clientes)
  
  clientes.map((item) =>{
    statuses.push({value:item.nombre,label:item.nombre,id:item.id});
  })
  
  React.useEffect(()=>{
    dispatch(addClienteVenta(selectedStatus))
  },[selectedStatus])
  
  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Agregar a</p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <div className="flex items-end gap-x-7 justify-end">{selectedStatus.label}<X onClick={()=> setSelectedStatus(null)} size={18}></X></div> : <>+ Cliente</>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" side="left" align="start">
          <Command>
            <CommandInput placeholder="Cliente..." />
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
