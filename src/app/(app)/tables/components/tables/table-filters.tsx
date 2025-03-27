"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TableFiltersProps {
  onClose: () => void
}

export function TableFilters({ onClose }: TableFiltersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Filtros Avançados</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade</Label>
            <Select>
              <SelectTrigger id="capacity">
                <SelectValue placeholder="Qualquer capacidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer capacidade</SelectItem>
                <SelectItem value="2">2 pessoas</SelectItem>
                <SelectItem value="4">4 pessoas</SelectItem>
                <SelectItem value="6">6 pessoas</SelectItem>
                <SelectItem value="8+">8+ pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder="Todas as áreas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as áreas</SelectItem>
                <SelectItem value="inside">Área Interna</SelectItem>
                <SelectItem value="outside">Área Externa</SelectItem>
                <SelectItem value="bar">Próximo ao Bar</SelectItem>
                <SelectItem value="window">Próximo à Janela</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Tempo de Ocupação</Label>
            <Select>
              <SelectTrigger id="time">
                <SelectValue placeholder="Qualquer tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer tempo</SelectItem>
                <SelectItem value="15">Menos de 15 min</SelectItem>
                <SelectItem value="30">Menos de 30 min</SelectItem>
                <SelectItem value="60">Menos de 1 hora</SelectItem>
                <SelectItem value="90">Mais de 1 hora</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="order-value">Valor do Pedido</Label>
            <div className="flex gap-2">
              <Input id="min-value" placeholder="Mínimo" type="number" />
              <Input id="max-value" placeholder="Máximo" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reservation">Reserva</Label>
            <Select>
              <SelectTrigger id="reservation">
                <SelectValue placeholder="Todas as mesas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as mesas</SelectItem>
                <SelectItem value="with">Com reserva</SelectItem>
                <SelectItem value="without">Sem reserva</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Limpar Filtros</Button>
        <Button>Aplicar Filtros</Button>
      </CardFooter>
    </Card>
  )
}

