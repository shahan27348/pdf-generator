import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getSummary(id: string) {
  const summary = await prisma.summary.findUnique({
    where: { id },
  });
  return summary;
}

export default async function SummaryPage({
  params,
}: {
  params: { id: string };
}) {
  const summary = await getSummary(params.id);

  if (!summary) {
    return <div>Summary not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{summary.fileName}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(summary.createdAt).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl">
        <p>{summary.content}</p>
      </div>
    </div>
  );
}
