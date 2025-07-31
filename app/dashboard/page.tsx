import EmptySummaryState from "@/components/empty-summary state";
import SummaryCard from "@/components/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { title } from "process";
import React from "react";

const Dashboard = async () => {
  const uploadLimit = 5; // Example limit, replace with actual logic
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) return redirect("/sign-in");
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <div className="container max-auto flex flex-col gap-4 text-black">
        <div className=" px-24 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className=" flex flex-col gap-2">
              <h1 className="font-extrabold text-4xl  tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your pdf's into concise, actionable insights
              </p>
            </div>
            <Button
              variant="default"
              className="bg-rose-500 hover:bg-rose-600 text-white "
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="mr-2 w-5 h-5" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className=" bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You have reached the limits of {uploadLimit} on the basic plan
              </p>
              <Link
                href="/pricing"
                className="text-rose-800 underline-font-medium underline-offset-4 inline-flex items-center"
              >
                Click here to upgrade your plan
                <ArrowRight className="w-4 h-4 inline-block" />
              </Link>
            </div>
          </div>
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3sm:px-0">
              {summaries.map((summary: any, index: any) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
