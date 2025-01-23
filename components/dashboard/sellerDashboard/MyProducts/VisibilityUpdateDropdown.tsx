"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

interface VisibilityUpdateDropdownProps {
  onStatusChange: (newStatus: string) => void;
  isLoading: boolean;
  currentStatus: string;
}

const VisibilityUpdateDropdown: React.FC<VisibilityUpdateDropdownProps> = ({
  onStatusChange,
  isLoading,
  currentStatus,
}) => {
  // Make sure these match exactly with your backend ProductVisibilityEnum values
  //Dropdown values
  const statuses = ["PRIVATE", "PUBLIC"];

  const handleStatusSelect = (status: string) => {
    if (status.toLowerCase() !== currentStatus.toLowerCase()) {
      onStatusChange(status);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-40 bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </div>
          ) : (
            "Change Visibility"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onSelect={() => handleStatusSelect(status)}
            className={
              status.toLowerCase() === currentStatus.toLowerCase()
                ? "bg-gray-100"
                : ""
            }
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityUpdateDropdown;