"use client"

import React, { FC, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Logs {
    logId: number;
    timestamp: string;
    activity: string;
}

const GetLogs: FC = () => {
    const [data, setData] = useState<Logs[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { toast } = useToast();

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const fetchLogs = async (pageNumber: number) => {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/Logs/GetLogs/get-logs-on-admin-dashboard', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ requestedPage: pageNumber }),
            });

            if (res.ok) {
                const responseData: Logs[] = await res.json();
                setData(responseData);
            } else if (res.status === 403) {
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                router.push("/log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request." + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching LOGS details:", error);
            setError("Failed to load LOGS data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    useEffect(() => {
        fetchLogs(currentPage);
    }, [currentPage]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <Card className="p-2">
            <div className="space-y-4">
                {/* <h2 className="text-2xl font-bold text-center mb-4">System Logs</h2> */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-gray-300 rounded">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-black text-lg">Log ID</TableHead>
                                <TableHead className="text-black text-lg">Date</TableHead>
                                <TableHead className="text-black text-lg">Time</TableHead>
                                <TableHead className="text-black text-lg">Activity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((log) => (
                                <TableRow key={log.logId} className="hover:bg-gray-50">
                                    <TableCell className="font-medium text-black">{log.logId}</TableCell>
                                    <TableCell className="font-medium text-black">{formatDate(log.timestamp)}</TableCell>
                                    <TableCell className="font-medium text-black">{formatTime(log.timestamp)}</TableCell>
                                    <TableCell className="font-medium text-black">
                                        {log.activity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <Button 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <span className="py-2 px-4 rounded-md bg-gray-100">
                        Page {currentPage}
                    </span>
                    <Button 
                        onClick={handleNextPage}
                        disabled={data.length === 0}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default GetLogs;