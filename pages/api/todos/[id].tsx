import { NextApiRequest, NextApiResponse } from "next";
import { delDataImpl, setCompletedImpl } from "../../../functions/taskData";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ data: "Empty form" });
    }

    try {
      await delDataImpl(Number(id));
      res.status(200).json({ data: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: "Server Error" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ data: "Empty form" });
    }

    try {
      await setCompletedImpl(Number(id));
      res.status(200).json({ data: "Updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: "Server Error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method Not Allowed`);
  }
}
