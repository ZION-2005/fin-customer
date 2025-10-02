import connect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

// GET customer by ID
export async function GET(req, { params }) {
  await connect();
  const customer = await Customer.findById(params.id);
  return NextResponse.json(customer);
}

// PUT update customer
export async function PUT(req, { params }) {
  await connect();
  const data = await req.json();
  const updated = await Customer.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

// DELETE customer
export async function DELETE(req, { params }) {
  await connect();
  await Customer.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Customer deleted" });
}
