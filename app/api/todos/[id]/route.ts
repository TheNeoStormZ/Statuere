import { NextResponse, NextRequest } from 'next/server';
import { delDataImpl, setCompletedImpl } from "../../../../functions/taskData";

type Data = {
  data: string;
};


export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const id = params.id;

  if (!id) {
    return NextResponse.json({ data: "Empty form" }, { status: 400 });
  }

  try {
    await delDataImpl(Number(id));
    return NextResponse.json({ data: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const id = params.id;


  if (!id) {
    return NextResponse.json({ data: "Empty form" }, { status: 400 });
  }

  try {

    await setCompletedImpl(Number(id));

    return NextResponse.json({ data: "Updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "Server Error" }, { status: 500 });
  }
}