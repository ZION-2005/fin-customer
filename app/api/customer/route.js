import connect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

// GET all customers
export async function GET() {
  await connect();
  const customers = await Customer.find();
  return NextResponse.json(customers);
}

// CREATE new customer
export async function POST(req) {
  await connect();
  const data = await req.json();
  const customer = new Customer(data);
  await customer.save();
  return NextResponse.json(customer, { status: 201 });
}
