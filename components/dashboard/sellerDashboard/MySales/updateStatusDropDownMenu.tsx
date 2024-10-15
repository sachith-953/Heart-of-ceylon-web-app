import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StatusUpdateDropdownProps {
    onStatusChange: (newStatus: string) => void;
}

const StatusUpdateDropdown: React.FC<StatusUpdateDropdownProps> = ({ onStatusChange }) => {
    const [selectedStatus, setSelectedStatus] = React.useState("Update Status")

    const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED","CANCELLED"]
    // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status)
        onStatusChange(status)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 bg-blue-600 px-4 py-2 leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"> 
                    {selectedStatus}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                {statuses.map((status) => (
                    <DropdownMenuItem key={status} onSelect={() => handleStatusSelect(status)}>
                        {status}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StatusUpdateDropdown