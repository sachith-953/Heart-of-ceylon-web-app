"use client";

import React, { FC, useEffect, useState } from "react";
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

interface Log {
  logId: number;
  timestamp: string;
  activity: string;
  adminEmail: string | null;
}

interface ApiResponse {
  content: Log[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

const GetLogs: FC = () => {
  const [data, setData] = useState<Log[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    currentPage: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    totalElements: number;
    pageSize: number;
  }>({
    currentPage: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
    totalElements: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const fetchLogs = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/Logs/GetLogs/get-logs-on-admin-dashboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedPage: page }),
        }
      );

      if (!res.ok) {
        if (res.status === 403) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please login again to continue.",
          });
          router.push("/log-in");
          return;
        }

        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch logs");
      }

      const responseData: ApiResponse = await res.json();
      
      setData(responseData.content);
      setPageInfo({
        currentPage: responseData.number,
        totalPages: responseData.totalPages,
        isFirst: responseData.first,
        isLast: responseData.last,
        totalElements: responseData.totalElements,
        pageSize: responseData.size,
      });
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to load logs. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load logs. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (!pageInfo.isLast) {
      fetchLogs(pageInfo.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!pageInfo.isFirst) {
      fetchLogs(pageInfo.currentPage - 1);
    }
  };

  useEffect(() => {
    fetchLogs(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-center">{error}</div>
        <Button onClick={() => fetchLogs(pageInfo.currentPage)} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  const startEntry = pageInfo.currentPage * pageInfo.pageSize + 1;
  const endEntry = Math.min(
    (pageInfo.currentPage + 1) * pageInfo.pageSize,
    pageInfo.totalElements
  );

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">System Logs</h2>
          <span className="text-sm text-gray-500">
            Showing {startEntry}-{endEntry} of {pageInfo.totalElements} entries
          </span>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-300 rounded">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-black font-semibold">Log ID</TableHead>
                <TableHead className="text-black font-semibold">Date</TableHead>
                <TableHead className="text-black font-semibold">Time</TableHead>
                <TableHead className="text-black font-semibold">Admin Email</TableHead>
                <TableHead className="text-black font-semibold">Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No logs found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((log) => (
                  <TableRow key={log.logId} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{log.logId}</TableCell>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell>{formatTime(log.timestamp)}</TableCell>
                    <TableCell>{log.adminEmail ?? "-"}</TableCell>
                    <TableCell>{log.activity === "-" ? "No activity" : log.activity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handlePreviousPage}
              disabled={pageInfo.isFirst}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={pageInfo.isLast}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GetLogs;