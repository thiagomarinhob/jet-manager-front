"use client"
import React, { useEffect, useState } from 'react';
import { X, Clock, CheckCircle, Truck, Coffee, Search, Eye, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import PageContainer from '@/components/layout/page-container';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { updateStatusOrder } from '@/http/update-status-order';

// Dados de exemplo
const initialOrders = [
  {
    id: '001',
    customer: 'João Silva',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - Jardim Primavera',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 45.90, notes: 'Sem cebola' },
      { name: 'Refrigerante Cola 2L', quantity: 1, price: 12.00, notes: '' }
    ],
    total: 57.90,
    status: 'pending',
    time: '18:45',
    paymentMethod: 'Cartão de Crédito',
    createdAt: new Date(2025, 2, 22, 18, 45)
  },
  {
    id: '002',
    customer: 'Maria Oliveira',
    phone: '(11) 91234-5678',
    address: 'Av. Principal, 456 - Centro',
    items: [
      { name: 'Combo XBurguer', quantity: 2, price: 34.90, notes: 'Um sem picles' },
      { name: 'Batata Frita Grande', quantity: 1, price: 18.90, notes: '' },
      { name: 'Milkshake Chocolate', quantity: 2, price: 14.90, notes: 'Um sem chantilly' }
    ],
    total: 118.50,
    status: 'preparing',
    time: '19:05',
    paymentMethod: 'PIX',
    createdAt: new Date(2025, 2, 22, 19, 5)
  },
  {
    id: '003',
    customer: 'Carlos Mendes',
    phone: '(11) 97777-8888',
    address: 'Rua dos Pinheiros, 789 - Vila Verde',
    items: [
      { name: 'Yakisoba Especial', quantity: 1, price: 42.90, notes: 'Extra de legumes' },
      { name: 'Rolinho Primavera', quantity: 2, price: 10.00, notes: '' }
    ],
    total: 62.90,
    status: 'ready',
    time: '19:15',
    paymentMethod: 'Dinheiro',
    createdAt: new Date(2025, 2, 22, 19, 15)
  },
  {
    id: '004',
    customer: 'Ana Pereira',
    phone: '(11) 95555-6666',
    address: 'Alameda Santos, 234 - Jardim América',
    items: [
      { name: 'Salada Caesar', quantity: 1, price: 28.90, notes: 'Sem croutons' },
      { name: 'Suco de Laranja', quantity: 1, price: 9.90, notes: 'Sem açúcar' }
    ],
    total: 38.80,
    status: 'delivering',
    time: '18:30',
    paymentMethod: 'Cartão de Débito',
    createdAt: new Date(2025, 2, 22, 18, 30)
  }
];

interface IProps {
  count: number;
  date: string;
  orders: unknown[];
}

// Componente principal
const DeliveryOrderManagement = (props: IProps) => {
  const data = props;
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (data && data.orders && data.orders.length > 0) {
      setOrders(data.orders)
    }
  }, [data])


  // Status possíveis e suas configurações
  const statusConfig = {
    pending: {
      name: 'Pendente',
      icon: <Clock className="h-4 w-4" />,
      color: 'bg-amber-500',
      variant: 'warning',
      lightBg: 'bg-amber-50'
    },
    preparing: {
      name: 'Preparando',
      icon: <Coffee className="h-4 w-4" />,
      color: 'bg-blue-500',
      variant: 'secondary',
      lightBg: 'bg-blue-50'
    },
    ready: {
      name: 'Pronto',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-green-500',
      variant: 'success',
      lightBg: 'bg-green-50'
    },
    delivering: {
      name: 'Em Entrega',
      icon: <Truck className="h-4 w-4" />,
      color: 'bg-purple-500',
      variant: 'outline',
      lightBg: 'bg-purple-50'
    },
    completed: {
      name: 'Entregue',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-gray-500',
      variant: 'outline',
      lightBg: 'bg-gray-50'
    },
    canceled: {
      name: 'Cancelado',
      icon: <X className="h-4 w-4" />,
      color: 'bg-red-500',
      variant: 'destructive',
      lightBg: 'bg-red-50'
    }
  };

  // Filtragem de pedidos
  // const filteredOrders = orders.filter(order =>
  //   order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   order.id.includes(searchTerm)
  // );

  // Agrupamento de pedidos por status
  const ordersByStatus = {
    pending: orders.filter(order => order.status === 'pending'),
    preparing: orders.filter(order => order.status === 'preparing'),
    ready: orders.filter(order => order.status === 'ready'),
    delivering: orders.filter(order => order.status === 'delivering'),
    completed: orders.filter(order => order.status === 'completed')
  };

  // Atualizar status de um pedido
  const updateOrderStatus = async (restaurant_id, order_id, status) => {
    try {
      const res = await updateStatusOrder({ restaurant_id, order_id, status });
      console.log("🚀 ~ updateOrderStatus ~ res:", res)
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === order_id ? { ...order, status: status } : order
        )
      );
      return res;
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw error;
    }

    // Se o pedido detalhado foi atualizado, também atualize sua visualização
    // if (selectedOrder && selectedOrder.id === orderId) {
    //   setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    // }
  };

  // Abrir detalhes de um pedido
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  // Formatar preço
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Formatar hora
  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Formatar data
  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('pt-BR');
  };

  // Calcular tempo desde a criação
  const getTimeElapsed = (dateObj) => {
    const now = new Date();
    const diffMs = now - dateObj;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins} min`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  };

  // Função auxiliar para determinar o próximo status
  function getNextStatus(currentStatus) {
    const statusFlow = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'delivering',
      delivering: 'completed',
      completed: 'completed'
    };

    return statusFlow[currentStatus] || currentStatus;
  }

  // Para obter a variante do Badge com base no status
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'secondary';
      case 'ready': return 'success';
      case 'delivering': return 'default';
      case 'completed': return 'outline';
      default: return 'default';
    }
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold">Pedidos Delivery</h1>
          <div className="mt-3 sm:mt-0 flex items-center">
            <div className="relative mr-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 w-[200px] md:w-[300px]"
                placeholder="Buscar pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <Button>
              <Plus className="h-4 w-4 mr-2" /> Novo Pedido
            </Button> */}
          </div>
        </div>

        <Separator />

        {/* Orders board */}
        <div className="flex gap-4 flex-wrap">
          {Object.entries(statusConfig).map(([status, config]) => status !== "canceled" && (
            <div key={status} className="flex-shrink-0 w-[290px]">
              <Card>
                <CardHeader className={`p-4 ${config.lightBg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`flex h-6 w-6 rounded-full items-center justify-center ${config.color} text-white`}>
                        {config.icon}
                      </div>
                      <CardTitle className="text-base text-black">{config.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="font-medium text-black">
                      {ordersByStatus[status]?.length || 0}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 max-h-[calc(100vh-220px)] overflow-y-auto space-y-3">
                  {ordersByStatus[status]?.map(order => (
                    <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => openOrderDetails(order)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="font-semibold">{order.code}</span>
                            <h4 className="font-medium">{order.customer_name}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">{formatTime(new Date(order.created_at))}</span>
                            <p className="font-medium">{formatPrice(order.total_amount)}</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2 truncate">{order.delivery_address}</div>
                        <div className="border-t pt-2 mt-2 text-sm text-muted-foreground">
                          {order.order_items.length} item(s) • pix
                        </div>
                        <div className="flex justify-between mt-3">
                          <div className="flex space-x-1">
                            <a href={`https://wa.me/55${order.customer_phone.replace(/\D/g, '')}`} target="_blank" >
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                            </a>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                openOrderDetails(order);
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                          {status !== 'completed' &&
                            <div className="flex">
                              <Button
                                variant={statusConfig[getNextStatus(status)].variant}
                                size="sm"
                                className="text-xs h-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.restaurant_id, order.id, getNextStatus(status));
                                }}
                              >
                                → {statusConfig[getNextStatus(status)].name}
                              </Button>
                            </div>
                          }
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {ordersByStatus[status]?.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                      Nenhum pedido com este status
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Order detail modal */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center space-x-2">
                <DialogTitle>Pedido {selectedOrder?.code}</DialogTitle>
                {selectedOrder && (
                  <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>
                    {statusConfig[selectedOrder.status].name}
                  </Badge>
                )}
              </div>
            </DialogHeader>

            {selectedOrder && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Informações do Cliente</h3>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <p className="text-sm"><span className="font-medium">Nome:</span> {selectedOrder.customer_name}</p>
                        <p className="text-sm"><span className="font-medium">Telefone:</span> {selectedOrder.customer_phone}</p>
                        <p className="text-sm"><span className="font-medium">Endereço:</span> {selectedOrder.delivery_address}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2">Informações do Pedido</h3>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <p className="text-sm"><span className="font-medium">Data:</span> {formatDate(new Date(selectedOrder.created_at))}</p>
                        <p className="text-sm"><span className="font-medium">Horário:</span> {formatTime(new Date(selectedOrder.created_at))}</p>
                        <p className="text-sm"><span className="font-medium">Tempo:</span> {getTimeElapsed(new Date(selectedOrder.created_at))}</p>
                        <p className="text-sm"><span className="font-medium">Pagamento:</span> PIX</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-muted-foreground mb-2">Itens do Pedido</h3>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Qtd</TableHead>
                          <TableHead className="text-right">Preço</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.order_items.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>{item.product.name}</div>
                              {item.product.notes && <div className="text-xs text-muted-foreground mt-1">{item.product.notes}</div>}
                            </TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">
                            Total do Pedido
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatPrice(selectedOrder.total_amount)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-muted-foreground mb-3">Atualizar Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusConfig).map(([status, config]) => status !== "canceled" && (
                      <Button
                        key={status}
                        variant={selectedOrder.status === status ? config.variant : "outline"}
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() => updateOrderStatus(selectedOrder.restaurant_id, selectedOrder.id, status)}
                      >
                        <span>{config.icon}</span>
                        <span className="ml-1">{config.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar Pedido
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar cancelamento</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja cancelar o pedido #{selectedOrder.id}? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            updateOrderStatus(selectedOrder.restaurant_id, selectedOrder.id, 'canceled');
                            setIsDetailOpen(false);
                          }}
                        >
                          Sim, cancelar pedido
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                      Fechar
                    </Button>
                    <Button>
                      Imprimir
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default DeliveryOrderManagement;