// app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Connect to the database, can be modified for actual database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "buckner14283", 
    database: "testdb", 
  });

  // Assuming amenities is an array and tags is an array
  const [result] = await connection.execute(
    `INSERT INTO properties 
      (landlord_id, address, description, bedrooms, bathrooms, monthly_rent, tags, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      1, // Replace with the actual landlord_id
      `${data.streetAddress1} ${data.streetAddress2}`,
      data.description,
      data.bedrooms,
      data.bathrooms,
      data.price,
      JSON.stringify(data.amenities || []), // Saving amenities as JSON in tags column
      data.status,
    ]
  );

  await connection.end();

  return NextResponse.json({ success: true, id: (result as any).insertId });
}