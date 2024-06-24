'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFood } from '../../../actions/getFood';
import { Prisma } from '@prisma/client';
import { recreateDB } from '../../../actions/recreateDb';
import { Input } from '@/components/ui/input';

type Food = Prisma.PromiseReturnType<typeof getFood>;

export default function Home() {
  const [formData, setFormData] = React.useState({
    kcalMin: 50,
    kcalMax: 900,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value),
    }));
  };

  const [food, setFood] = React.useState<Food>();

  const getFoodAction = async () => {
    const { kcalMin, kcalMax } = formData;
    const data = await getFood({ kcalMin, kcalMax });
    setFood(data);
  };

  return (
    <>
      <Button
        className="absolute up-0 left-0"
        onClick={() => recreateDB()}
        variant="secondary"
      >
        RECREATE DB
      </Button>

      <main className="flex  flex-col items-center p-10">
        <div className="flex mb-5">
          <Input
            type="number"
            id="kcalMin"
            name="kcalMin"
            placeholder="kcal Min"
            className="w-2  md:w-[100px] lg:w-[100px]"
            value={formData.kcalMin}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            id="kcalMax"
            name="kcalMax"
            placeholder="kcal Max"
            className="w-2  md:w-[100px] lg:w-[100px] ml-4"
            value={formData.kcalMax}
            onChange={handleInputChange}
          />
          <Button onClick={getFoodAction} variant="secondary" className="ml-4">
            SEARCH
          </Button>
        </div>
        {food && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg w-80 h-20">{food.name}</CardTitle>
              <CardDescription>{`${food.kcal.toString()} kcal`}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={food.image || ''}
                alt={food.image || ''}
                width="0"
                height="0"
                sizes="100vw"
                className="w-80 h-auto"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="w-full"
                onClick={() => window.open(food.url, '_blank')}
              >
                BUY
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </>
  );
}
