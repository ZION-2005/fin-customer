import connect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

// GET one customer by ID
export async function GET(req, { params }) {
  await connect();
  const customer = await Customer.findById(params.id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(customer);
}

// UPDATE customer by ID
export async function PUT(req, { params }) {
  await connect();
  const data = await req.json();
  const customer = await Customer.findByIdAndUpdate(params.id, data, { new: true });
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(customer);
}

// DELETE customer by ID
export async function DELETE(req, { params }) {
  await connect();
  const customer = await Customer.findByIdAndDelete(params.id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted successfully" });
}
