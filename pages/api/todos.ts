
import type { NextApiRequest, NextApiResponse } from "next";
import { delDataImpl, getDataImpl, saveDataImpl, Task } from "../../functions/taskData";


type ResponseData = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") 
    {
      
      const tasks = await getDataImpl();
      const resData: ResponseData = {
        data: JSON.stringify(tasks),
      };
      console.log(resData);
      res.status(200).json(resData);

    } else if (req.method === "POST"){
      const { name, taskData } = req.body;
      console.log(req.body);
      if (!name || !taskData) {
        return res.status(400).json({ data: 'Empty form'});;
      }
      const task: Task = { name, taskData };
      try {
        await saveDataImpl(task);
        res.status(200).json({ data: 'Saved succesffully'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ data: 'Server Error'});
      }
    }

    else if (req.method === "DELETE"){
      const { data } = req.body;
      console.log("request: "+ JSON.stringify(req.body));
      console.log("data:" + data);
      if (data == null) {
        return res.status(400).json({ data: 'Empty form'});;
      }
      try {
        await delDataImpl(data as number);
        res.status(200).json({ data: 'Deleted succesfully'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ data: 'Server Error'});
      }
    }


    else {
      res.status(405).json({ data: "Method Not Allowed"});
    }

}
