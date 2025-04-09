"use client"

import { useState } from "react"
import { Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { TableDialog } from "./table-dialog"
import { TableFilters } from "./table-filters"
import { TableCard } from "./table-card"
import { Table } from "../../types/table"

// Sample data for tables
const initialTables: Table[] = [
  {
    id: "1",
    number: 1,
    status: "available",
    capacity: 4,
    currentOrder: null,
    reservationName: null,
    timeOccupied: null,
  },
  {
    id: "2",
    number: 2,
    status: "occupied",
    capacity: 2,
    currentOrder: {
      id: "ord-123",
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 15.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Sparkling Water", quantity: 2, price: 3.99 },
      ],
      total: 32.96,
      startTime: new Date(Date.now() - 45 * 60000).toISOString(),
    },
    reservationName: "Martinez",
    timeOccupied: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: "3",
    number: 3,
    status: "waiting",
    capacity: 6,
    currentOrder: {
      id: "ord-124",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 14.99 },
        { name: "Bruschetta", quantity: 1, price: 7.99 },
      ],
      total: 22.98,
      startTime: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    reservationName: "Johnson",
    timeOccupied: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: "4",
    number: 4,
    status: "reserved",
    capacity: 4,
    currentOrder: null,
    reservationName: "Smith",
    timeOccupied: null,
  },
  {
    id: "5",
    number: 5,
    status: "cleaning",
    capacity: 4,
    currentOrder: null,
    reservationName: null,
    timeOccupied: null,
  },
  {
    id: "6",
    number: 6,
    status: "available",
    capacity: 8,
    currentOrder: null,
    reservationName: null,
    timeOccupied: null,
  },
  {
    id: "7",
    number: 7,
    status: "occupied",
    capacity: 2,
    currentOrder: {
      id: "ord-125",
      items: [
        { name: "Steak", quantity: 1, price: 29.99 },
        { name: "Mashed Potatoes", quantity: 1, price: 5.99 },
        { name: "Red Wine", quantity: 2, price: 8.99 },
      ],
      total: 53.96,
      startTime: new Date(Date.now() - 30 * 60000).toISOString(),
    },
    reservationName: "Garcia",
    timeOccupied: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: "8",
    number: 8,
    status: "available",
    capacity: 4,
    currentOrder: null,
    reservationName: null,
    timeOccupied: null,
  },
]

export function Tables() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  // Filter tables based on search query and status filter
  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      searchQuery === "" ||
      table.number.toString().includes(searchQuery) ||
      (table.reservationName && table.reservationName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = !statusFilter || table.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort tables by number
  const sortedTables = [...filteredTables].sort((a, b) => a.number - b.number)

  const handleTableUpdate = (updatedTable: Table) => {
    setTables(tables.map((table) => (table.id === updatedTable.id ? updatedTable : table)))
    setSelectedTable(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mesas do Restaurante</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Mesa
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por número ou reserva..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="occupied">Ocupada</SelectItem>
              <SelectItem value="waiting">Aguardando Pedido</SelectItem>
              <SelectItem value="reserved">Reservada</SelectItem>
              <SelectItem value="cleaning">Em Limpeza</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && <TableFilters onClose={() => setShowFilters(false)} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTables.map((table) => (
          <TableCard key={table.id} table={table} onClick={() => setSelectedTable(table)} />
        ))}
      </div>

      {sortedTables.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-center text-muted-foreground">Nenhuma mesa encontrada com os filtros atuais.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setStatusFilter(null)
              }}
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedTable && (
        <TableDialog
          table={selectedTable}
          open={!!selectedTable}
          onOpenChange={(open) => !open && setSelectedTable(null)}
          onUpdate={handleTableUpdate}
        />
      )}
    </div>
  )
}

