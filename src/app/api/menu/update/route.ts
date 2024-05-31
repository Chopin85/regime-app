import { NextResponse } from 'next/server';
import { scrapPicard } from '../../../../utils/scrap';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    await prisma.food.deleteMany({ where: {} });
    const result = await scrapPicard();

    const createMany = await prisma.food.createMany({
      data: [...result],
      // skipDuplicates: true, // Skip 'Bobo'
    });

    return NextResponse.json(
      {
        message: `Updated ${createMany.count} item`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 400,
      },
    );
  }
}
