// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HeartDatabase } from "@/@types/heart";
import { db } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  totalcount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const snapshot = (await get(ref(db, "hearts"))) || {};
  const data: HeartDatabase = snapshot.val() || {};
  const totalcount = Object.values(data)
    .map((heart) => heart.hearts)
    .filter((count) => (count < 1000 ? count : 1000))
    .reduce((p, c) => p + c, 0);
  res.status(200).json({ totalcount });
}
