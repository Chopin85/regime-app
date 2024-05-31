'use server';
import db from '@/lib/prisma';
export const getFood = async () => {
  try {
    const shuffledFood = await db.food.findMany({
      where: {
        kcal: {
          lte: 900,
          gte: 50,
        },
      },
    });

    return shuffledFood[Math.floor(Math.random() * shuffledFood.length)];
  } catch (error) {
    return null;
  }
};
