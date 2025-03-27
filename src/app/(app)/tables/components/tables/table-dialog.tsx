"use client"

import { useState } from "react"
import { Clock, Coffee, Edit, Trash, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table } from "../../types/table"

interface TableDialogProps {
  table: Table
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (table: Table) => void
}

export function TableDialog({ table, open, onOpenChange, onUpdate }: TableDialogProps) {
  const [status, setStatus] = useState(table.status)

  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Function to format time elapsed
  const getTimeElapsed = (startTime: string) => {
    const start = new Date(startTime)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins} minutos`
    } else {
      const hours = Math.floor(diffMins / 60)
      const mins = diffMins % 60
      return `${hours}h ${mins}m`
    }
  }

  // Get status text and color
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "available":
        return { text: "Disponível", color: "bg-green-500" }
      case "occupied":
        return { text: "Ocupada", color: "bg-red-500" }
      case "waiting":
        return { text: "Aguardando Pedido", color: "bg-yellow-500" }
      case "reserved":
        return { text: "Reservada", color: "bg-blue-500" }
      case "cleaning":
        return { text: "Em Limpeza", color: "bg-purple-500" }
      default:
        return { text: "Desconhecido", color: "bg-gray-500" }
    }
  }

  const statusDetails = getStatusDetails(status)

  const handleUpdateStatus = () => {
    onUpdate({
      ...table,
      status,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className={`absolute left-0 right-0 top-0 h-2 ${statusDetails.color}`} />
        <DialogHeader className="pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Mesa {table.number}</DialogTitle>
            <Badge variant={status === "available" ? "outline" : "secondary"}>{statusDetails.text}</Badge>
          </div>
          <DialogDescription className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Capacidade para {table.capacity} pessoas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <label className="text-sm font-medium">Status da Mesa</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="occupied">Ocupada</SelectItem>
                  <SelectItem value="waiting">Aguardando Pedido</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                  <SelectItem value="cleaning">Em Limpeza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {table.reservationName && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 font-medium">Informações da Reserva</h3>
                <div className="flex items-center justify-between">
                  <p>Cliente: {table.reservationName}</p>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {table.currentOrder && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 font-medium">Detalhes do Pedido</h3>
                <div className="mb-2 flex items-center justify-between">
                  <p>Pedido #{table.currentOrder.id.split("-")[1]}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {getTimeElapsed(table.currentOrder.startTime)}
                  </div>
                </div>
                <div className="space-y-2">
                  {table.currentOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(table.currentOrder.total)}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Ver Pedido Completo
                  </Button>
                  <Button size="sm">Finalizar Conta</Button>
                </div>
              </div>
            </>
          )}

          {status === "available" && !table.currentOrder && !table.reservationName && (
            <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
              <Coffee className="h-5 w-5" />
              <p>Mesa disponível para novos clientes</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" className="w-full sm:w-auto">
            <Trash className="mr-2 h-4 w-4" />
            Remover Mesa
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={handleUpdateStatus} className="w-full sm:w-auto">
              Salvar Alterações
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

