'use server';
import db from '@/lib/prisma';
import { scrapPicard } from '@/utils/scrap';
export const recreateDB = async () => {
  try {
    let findConstumersId = await db.constumers.findFirst({
      where: {
        name: 'picard',
      },
    });

    if (!findConstumersId?.id) {
      findConstumersId = await db.constumers.create({
        data: {
          name: 'picard',
        },
      });
    }

    await db.food.deleteMany({ where: { constumersId: findConstumersId?.id } });

    const result = await scrapPicard(findConstumersId?.id);

    const createMany = await db.food.createMany({
      data: [...result],
    });

    return { message: `Updated ${createMany.count} item` };
  } catch (error) {
    return null;
  }
};
