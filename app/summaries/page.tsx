import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getSummaries() {
  const summaries = await prisma.summary.findMany();
  return summaries;
}

export default async function SummariesPage() {
  const summaries = await getSummaries();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Summaries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaries.map((summary) => (
          <Link key={summary.id} href={`/summaries/${summary.id}`}>
            <a className="block p-4 border rounded-lg hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{summary.fileName}</h2>
              <p className="text-gray-500">
                {new Date(summary.createdAt).toLocaleDateString()}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
