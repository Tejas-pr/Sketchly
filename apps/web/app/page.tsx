import { headers } from "next/headers";
import Canvas from "@/components/Canvas";
import { trackVisit } from "./actions/actions";

export default async function Page() {
  const headerList = await headers();
  await trackVisit(headerList);

  return <Canvas />;
}
