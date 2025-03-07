import { NextResponse, NextRequest } from 'next/server';
import { getDataImpl, saveDataImpl, Task } from "../../../functions/taskData";

type ResponseData = {
  data: string;
};


export async function GET() {
  const tasks = await getDataImpl();
  const resData: ResponseData = {
    data: JSON.stringify(tasks),
  };
  return NextResponse.json(resData, { status: 200 }); 
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { name, taskData, completed } = body;

    if (!name || !taskData) {
      return NextResponse.json({ data: "Empty form" }, { status: 400 }); 
    }
    const task: Task = { name, taskData, completed };
    await saveDataImpl(task);
    return NextResponse.json({ data: "Saved succesffully" }, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "Server Error" }, { status: 500 }); 
  }
}