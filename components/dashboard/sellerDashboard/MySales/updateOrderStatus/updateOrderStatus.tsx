'use client'

import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

const orderStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const OrderStatusUpdater: React.FC<OrderStatusUpdaterProps> = ({ orderId, currentStatus, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleUpdate = async () => {
    if (selectedStatus === currentStatus) {
      toast({
        title: "No Change",
        description: "The selected status is the same as the current status.",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch('/api/update-order-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, orderStatus: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      await response.json();

      toast({
        title: "Success",
        description: `Order ${orderId} status updated to ${selectedStatus}`,
      });

      onStatusUpdate(orderId, selectedStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update status for order ${orderId}. Please try again.`,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select onValueChange={handleStatusChange} value={selectedStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {orderStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleUpdate} disabled={isUpdating || selectedStatus === currentStatus}>
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
    </div>
  );
};

export default OrderStatusUpdater;