export interface OrderItem {
    name: string
    quantity: number
    price: number
  }
  
  export interface Order {
    id: string
    items: OrderItem[]
    total: number
    startTime: string
  }
  
  export interface Table {
    id: string
    number: number
    status: "available" | "occupied" | "waiting" | "reserved" | "cleaning"
    capacity: number
    currentOrder: Order | null
    reservationName: string | null
    timeOccupied: string | null
  }
  
  