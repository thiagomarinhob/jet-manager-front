"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Grid3X3, List, Search, Users, Edit3, CheckCircle, Calendar, Sparkles } from "lucide-react"

type TableStatus = "livre" | "ocupada" | "reservada" | "limpeza"

interface Table {
  id: number
  number: string
  status: TableStatus
  capacity: number
  customerName?: string
  partySize?: number
  occupiedSince?: Date
  reservationTime?: Date
  description?: string
  position: { x: number; y: number }
}

const initialTables: Table[] = [
  { id: 1, number: "01", status: "livre", capacity: 4, position: { x: 1, y: 1 } },
  {
    id: 2,
    number: "02",
    status: "ocupada",
    capacity: 2,
    customerName: "João Silva",
    partySize: 2,
    occupiedSince: new Date(Date.now() - 45 * 60000),
    position: { x: 2, y: 1 },
  },
  {
    id: 3,
    number: "03",
    status: "reservada",
    capacity: 6,
    customerName: "Maria Santos",
    partySize: 4,
    reservationTime: new Date(Date.now() + 30 * 60000),
    position: { x: 3, y: 1 },
  },
  { id: 4, number: "04", status: "limpeza", capacity: 4, position: { x: 4, y: 1 } },
  { id: 5, number: "05", status: "livre", capacity: 2, position: { x: 1, y: 2 } },
  {
    id: 6,
    number: "06",
    status: "ocupada",
    capacity: 8,
    customerName: "Carlos Oliveira",
    partySize: 6,
    occupiedSince: new Date(Date.now() - 90 * 60000),
    position: { x: 2, y: 2 },
  },
  { id: 7, number: "07", status: "livre", capacity: 4, position: { x: 3, y: 2 } },
  {
    id: 8,
    number: "08",
    status: "reservada",
    capacity: 2,
    customerName: "Ana Costa",
    partySize: 2,
    reservationTime: new Date(Date.now() + 60 * 60000),
    position: { x: 4, y: 2 },
  },
  { id: 9, number: "09", status: "livre", capacity: 6, position: { x: 1, y: 3 } },
  {
    id: 10,
    number: "10",
    status: "ocupada",
    capacity: 4,
    customerName: "Pedro Lima",
    partySize: 3,
    occupiedSince: new Date(Date.now() - 20 * 60000),
    position: { x: 2, y: 3 },
  },
  { id: 11, number: "11", status: "livre", capacity: 2, position: { x: 3, y: 3 } },
  { id: 12, number: "12", status: "limpeza", capacity: 4, position: { x: 4, y: 3 } },
]

const statusConfig = {
  livre: {
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    label: "Livre",
    icon: CheckCircle,
  },
  ocupada: { color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50", label: "Ocupada", icon: Users },
  reservada: {
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    label: "Reservada",
    icon: Calendar,
  },
  limpeza: {
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    label: "Em Limpeza",
    icon: Sparkles,
  },
}

export default function RestaurantTableManagement() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TableStatus | "all">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [editForm, setEditForm] = useState({
    customerName: "",
    partySize: "",
    description: "",
    status: "livre" as TableStatus,
  })

  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const matchesSearch =
        table.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || table.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [tables, searchTerm, statusFilter])

  const handleTableClick = (table: Table) => {
    setSelectedTable(table)
    setIsDetailsOpen(true)
  }

  const handleEditTable = (table: Table) => {
    setSelectedTable(table)
    setEditForm({
      customerName: table.customerName || "",
      partySize: table.partySize?.toString() || "",
      description: table.description || "",
      status: table.status,
    })
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!selectedTable) return

    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTable.id
          ? {
            ...table,
            customerName: editForm.customerName || undefined,
            partySize: editForm.partySize ? Number.parseInt(editForm.partySize) : undefined,
            description: editForm.description || undefined,
            status: editForm.status,
            occupiedSince:
              editForm.status === "ocupada" && table.status !== "ocupada" ? new Date() : table.occupiedSince,
            reservationTime:
              editForm.status === "reservada" && table.status !== "reservada"
                ? new Date(Date.now() + 30 * 60000)
                : table.reservationTime,
          }
          : table,
      ),
    )
    setIsEditOpen(false)
    setSelectedTable(null)
  }

  const handleQuickAction = (tableId: number, action: "reserve" | "occupy" | "free" | "clean") => {
    setTables((prev) =>
      prev.map((table) => {
        if (table.id !== tableId) return table

        switch (action) {
          case "reserve":
            return { ...table, status: "reservada", reservationTime: new Date(Date.now() + 30 * 60000) }
          case "occupy":
            return { ...table, status: "ocupada", occupiedSince: new Date() }
          case "free":
            return {
              ...table,
              status: "livre",
              customerName: undefined,
              partySize: undefined,
              occupiedSince: undefined,
              reservationTime: undefined,
            }
          case "clean":
            return { ...table, status: "limpeza" }
          default:
            return table
        }
      }),
    )
  }

  const formatDuration = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    const hours = Math.floor(minutes / 60)
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`
  }

  const TableCard = ({ table }: { table: Table }) => {
    const config = statusConfig[table.status]
    const StatusIcon = config.icon

    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-md ${config.bgColor} border-2 ${selectedTable?.id === table.id ? "border-primary" : "border-transparent"
          }`}
        onClick={() => handleTableClick(table)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
              <span className="font-semibold text-lg text-muted">Mesa {table.number}</span>
            </div>
            <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{table.capacity} lugares</span>
            </div>

            {table.customerName && <div className="font-medium">{table.customerName}</div>}

            {table.partySize && <div className="text-muted-foreground">{table.partySize} pessoas</div>}

            {table.occupiedSince && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(table.occupiedSince)}</span>
              </div>
            )}

            {table.reservationTime && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{table.reservationTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            )}
          </div>

          <Badge variant="secondary" className={`mt-2 ${config.textColor}`}>
            {config.label}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  const TableListItem = ({ table }: { table: Table }) => {
    const config = statusConfig[table.status]
    const StatusIcon = config.icon

    return (
      <Card className="cursor-pointer hover:shadow-md" onClick={() => handleTableClick(table)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className="font-semibold">Mesa {table.number}</span>
              </div>

              <Badge variant="secondary" className={config.textColor}>
                {config.label}
              </Badge>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{table.capacity}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {table.customerName && <span className="font-medium">{table.customerName}</span>}

              {table.occupiedSince && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(table.occupiedSince)}</span>
                </div>
              )}

              <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Controle de Mesas</h1>
          <p className="text-muted-foreground">Gerencie as mesas do seu restaurante de forma eficiente</p>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por número da mesa ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TableStatus | "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="livre">Livre</SelectItem>
              <SelectItem value="ocupada">Ocupada</SelectItem>
              <SelectItem value="reservada">Reservada</SelectItem>
              <SelectItem value="limpeza">Em Limpeza</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = tables.filter((t) => t.status === status).length
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <span className="text-sm font-medium">{config.label}</span>
                </div>
                <div className="text-2xl font-bold mt-1">{count}</div>
              </CardContent>
            </Card>
          )
        })}
      </div> */}

      {/* Lista/Grade de Mesas */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTables.map((table) => (
            <TableListItem key={table.id} table={table} />
          ))}
        </div>
      )}

      {/* Dialog de Detalhes */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mesa {selectedTable?.number}</DialogTitle>
            <DialogDescription>Detalhes e ações para a mesa selecionada</DialogDescription>
          </DialogHeader>

          {selectedTable && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusConfig[selectedTable.status].color}`} />
                <Badge variant="secondary" className={statusConfig[selectedTable.status].textColor}>
                  {statusConfig[selectedTable.status].label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Capacidade</Label>
                  <div className="font-medium">{selectedTable.capacity} pessoas</div>
                </div>

                {selectedTable.customerName && (
                  <div>
                    <Label className="text-muted-foreground">Cliente</Label>
                    <div className="font-medium">{selectedTable.customerName}</div>
                  </div>
                )}

                {selectedTable.partySize && (
                  <div>
                    <Label className="text-muted-foreground">Pessoas</Label>
                    <div className="font-medium">{selectedTable.partySize}</div>
                  </div>
                )}

                {selectedTable.occupiedSince && (
                  <div>
                    <Label className="text-muted-foreground">Tempo ocupada</Label>
                    <div className="font-medium">{formatDuration(selectedTable.occupiedSince)}</div>
                  </div>
                )}

                {selectedTable.reservationTime && (
                  <div>
                    <Label className="text-muted-foreground">Reserva para</Label>
                    <div className="font-medium">
                      {selectedTable.reservationTime.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}
              </div>

              {selectedTable.description && (
                <div>
                  <Label className="text-muted-foreground">Observações</Label>
                  <div className="text-sm mt-1">{selectedTable.description}</div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-wrap">
              {selectedTable?.status !== "reservada" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleQuickAction(selectedTable!.id, "reserve")
                    setIsDetailsOpen(false)
                  }}
                >
                  Reservar
                </Button>
              )}

              {selectedTable?.status !== "ocupada" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleQuickAction(selectedTable!.id, "occupy")
                    setIsDetailsOpen(false)
                  }}
                >
                  Ocupar
                </Button>
              )}

              {selectedTable?.status !== "livre" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleQuickAction(selectedTable!.id, "free")
                    setIsDetailsOpen(false)
                  }}
                >
                  Liberar
                </Button>
              )}

              {selectedTable?.status !== "limpeza" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleQuickAction(selectedTable!.id, "clean")
                    setIsDetailsOpen(false)
                  }}
                >
                  Limpeza
                </Button>
              )}
            </div>

            <Button onClick={() => handleEditTable(selectedTable!)} className="w-full sm:w-auto">
              <Edit3 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Mesa {selectedTable?.number}</DialogTitle>
            <DialogDescription>Atualize as informações da mesa</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) => setEditForm((prev) => ({ ...prev, status: value as TableStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="livre">Livre</SelectItem>
                  <SelectItem value="ocupada">Ocupada</SelectItem>
                  <SelectItem value="reservada">Reservada</SelectItem>
                  <SelectItem value="limpeza">Em Limpeza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input
                id="customerName"
                value={editForm.customerName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, customerName: e.target.value }))}
                placeholder="Nome do cliente"
              />
            </div>

            <div>
              <Label htmlFor="partySize">Número de Pessoas</Label>
              <Input
                id="partySize"
                type="number"
                value={editForm.partySize}
                onChange={(e) => setEditForm((prev) => ({ ...prev, partySize: e.target.value }))}
                placeholder="Número de pessoas"
                min="1"
                max={selectedTable?.capacity}
              />
            </div>

            <div>
              <Label htmlFor="description">Observações</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Observações sobre a mesa..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
