import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export type ShuffledFood = {
  id: string;
  name: string;
  image: string;
  kcal: number;
};

export async function GET() {
  try {
    const shuffledFood = await prisma.food.findMany({
      where: {
        kcal: {
          lte: 900,
          gte: 50,
        },
      },
    });

    return NextResponse.json({
      ...shuffledFood[Math.floor(Math.random() * shuffledFood.length)],
    });
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
