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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link } from '@radix-ui/react-navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { getFood } from './actions/getFood';
import { Prisma } from '@prisma/client';
import { recreateDB } from './actions/recreateDb';
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
      [name]: value,
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

      <NavigationMenu className="absolute up-0 right-0">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" asChild>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex min-h-screen flex-col items-center p-20">
        <div className="mb-5 before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className="flex mb-5">
          <Input
            type="number"
            id="kcalMin"
            placeholder="kcal Min"
            className="w-2  md:w-[100px] lg:w-[100px]"
            value={formData.kcalMin}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            id="kcalMax"
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
                variant="outline"
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
