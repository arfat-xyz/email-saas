import { generateDynamicMetadata } from "@/hooks/meta-hook";
import { db } from "@/lib/db";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const details = await db.user.findUnique({
    where: {
      email: "arfatrahman08@gmail.com",
    },
  });

  return generateDynamicMetadata({
    description: details?.name,
    images: details?.image,
    title: details?.name,
  });
}
const DynamicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>My Post: {id}</div>;
};

export default DynamicPage;
