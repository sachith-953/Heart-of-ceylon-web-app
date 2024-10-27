'use client'

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface AdminData {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string;
    adminId: number;
}

const AdminDetails = () => {
    const [data, setData] = useState<AdminData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { toast } = useToast();

    const fetchAdminDetails = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/get-admin-data-list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(res.ok){
                const responseData: AdminData[] = await res.json();
                setData(responseData);
            }
            else if (res.status === 403) {
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("**** FetchAdminDetails >> 403 ****************")
                console.log("Redirecting to login. RT error")
                router.push("/seller-log-in");
            }
            else{
                const data = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request." + data.message,
                })
                console.error('Error fetching admin details:', res.status);
            }
        } catch (error) {
            console.error("Error fetching admin details:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const handleMoreClick = (adminId: number) => {
        // handle click button
        router.push(`/dashboard/adminDashboard/MoreDetails/${adminId}`);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="rounded-md border ml-1">
            <div className="rounded-md border hover:bg-transparent">
                <Table className="border-3 border-black-200">
                    <TableHeader className="bg-gray-300 rounded">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-black text-lg">ID</TableHead>
                            <TableHead className="text-black text-lg">User Name</TableHead>
                            <TableHead className="text-black text-lg">Full Name</TableHead>
                            <TableHead className="text-black text-lg">Email</TableHead>
                            <TableHead className="text-black text-lg">Admin Type</TableHead>
                            <TableHead className="text-black text-lg">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell className="font-medium text-black">{admin.id}</TableCell>
                                <TableCell className="font-medium text-black">{admin.userName}</TableCell>
                                <TableCell className="font-medium text-black">{`${admin.firstName} ${admin.lastName}`}</TableCell>
                                <TableCell className="font-medium text-black">{admin.email}</TableCell>
                                <TableCell className="font-medium text-black">{admin.roles}</TableCell>
                                <TableCell className="font-medium text-black">
                                    <Button
                                        onClick={() => handleMoreClick(admin.adminId)}
                                        variant="default"
                                        size="sm"
                                        className="bg-blue-500 hover:bg-blue-700 text-white"
                                    >
                                        More
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminDetails;