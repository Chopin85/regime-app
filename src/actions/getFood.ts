'use server';
import db from '@/lib/prisma';

export const getFood = async ({
  kcalMin,
  kcalMax,
}: {
  kcalMin: number;
  kcalMax: number;
}) => {
  try {
    const shuffledFood = await db.food.findMany({
      where: {
        kcal: {
          lte: kcalMax,
          gte: kcalMin,
        },
      },
    });

    return shuffledFood[Math.floor(Math.random() * shuffledFood.length)];
  } catch (error) {
    return null;
  }
};
