"use client"

import { Clock, Coffee, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table } from "../../types/table"

interface TableCardProps {
  table: Table
  onClick: () => void
}

export function TableCard({ table, onClick }: TableCardProps) {
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
      return `${diffMins} min`
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

  const statusDetails = getStatusDetails(table.status)

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 w-full ${statusDetails.color}`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Mesa {table.number}</CardTitle>
          <Badge variant={table.status === "available" ? "outline" : "secondary"}>{statusDetails.text}</Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {table.capacity} pessoas
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {table.reservationName && (
          <div className="mb-2">
            <span className="text-sm font-medium">Reserva:</span>{" "}
            <span className="text-sm">{table.reservationName}</span>
          </div>
        )}

        {table.currentOrder && (
          <>
            <div className="mb-2">
              <span className="text-sm font-medium">Pedido:</span>{" "}
              <span className="text-sm">#{table.currentOrder.id.split("-")[1]}</span>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium">Total:</span>{" "}
              <span className="text-sm">{formatCurrency(table.currentOrder.total)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {getTimeElapsed(table.currentOrder.startTime)}
            </div>
          </>
        )}

        {table.status === "available" && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Coffee className="h-3.5 w-3.5" />
            Pronta para uso
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onClick}>
          Gerenciar Mesa
        </Button>
      </CardFooter>
    </Card>
  )
}

