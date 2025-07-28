import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
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
              <div className="flex items-center text-white">
                <Plus className="mr-2 w-5 h-5" />
                New Summary
              </div>
            </Button>
          </div>
          <div className="mb-6">
            <div className=" bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You have reached the limits of 5 upload on the basic plan
              </p>
              <Link
                href="/pricing"
                className="text-rose-800 underline-font-medium underline-offset-4 inline-flex items-center"
              >
                Click here to upgrade to pro
                <ArrowRight className="w-4 h-4 inline-block" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
