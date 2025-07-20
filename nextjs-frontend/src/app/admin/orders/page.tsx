'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { getOrders, updateOrderStatus } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  orderDate: string;
  createdAt: string;
  notes?: string;
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'preparing', label: 'Preparing', color: 'bg-orange-100 text-orange-800' },
  { value: 'ready', label: 'Ready', color: 'bg-purple-100 text-purple-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      const ordersData = response.data || [];
      
      // Sort orders by creation date (newest first)
      const sortedOrders = ordersData.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));
      
      // Update selected order if it's open
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status) || ORDER_STATUSES[0];
    return (
      <Badge className={statusConfig.color}>
        {statusConfig.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'ready': return <Package className="h-4 w-4" />;
      case 'out_for_delivery': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="mt-2 text-gray-600">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">
                {orders.length === 0 ? 'No orders found' : 'No orders match your filters'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      #{order.id.slice(-8)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.items.slice(0, 2).map(item => item.name).join(', ')}
                          {order.items.length > 2 && '...'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.total)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        
                        <Select
                          value={order.status}
                          onValueChange={(status) => handleStatusUpdate(order.id, status)}
                        >
                          <SelectTrigger className="w-32">
                            <Edit className="h-4 w-4 mr-1" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUSES.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Order Details - #{selectedOrder.id.slice(-8)}
              </DialogTitle>
              <DialogDescription>
                View complete order information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.status)}
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-sm">{selectedOrder.deliveryAddress}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{selectedOrder.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Status:</span>
                      <Badge variant={selectedOrder.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                        {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {formatCurrency(item.price)} each
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">x{item.quantity}</p>
                          <p className="text-sm font-bold">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {selectedOrder.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Update Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status">Status:</Label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(status) => {
                        handleStatusUpdate(selectedOrder.id, status);
                        setSelectedOrder({ ...selectedOrder, status });
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
