import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const data = await req.json();

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await connection.execute(
    `UPDATE properties SET 
      title=?,
      description=?,
      bedrooms=?,
      bathrooms=?,
      monthly_rent=?,
      address=?,
      status=?,
      verification=?,
      images=?,
      thumbnail=?
    WHERE property_id=?`,
    [
      data.title,
      data.description,
      data.bedrooms,
      data.bathrooms,
      data.price,
      `${data.streetAddress1} ${data.streetAddress2}, ${data.city}, ${data.state} ${data.zipCode}`,
      data.status,
      data.verification,
      JSON.stringify(data.images),
      data.thumbnail,
      id
    ]
  );

  await connection.end();

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [result] = await connection.execute(
    "DELETE FROM properties WHERE property_id = ?",
    [id]
  );

  await connection.end();

  // Optionally, check result.affectedRows to confirm deletion
  return NextResponse.json({ success: true });
}