'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { ShuffledFood } from './api/menu/route';

export default function Home() {
  const [food, setFood] = React.useState<ShuffledFood | null>();

  const updatePicardDb = () => {
    const updatePicardDb = async () => {
      const response = await fetch('/api/menu/update', {
        method: 'GET',
      });
      return response.json();
    };
    updatePicardDb();
  };

  const shuffleFood = () => {
    const suffleFoodFromDb = async () => {
      const response = await fetch('/api/menu', {
        method: 'GET',
      });
      return response.json();
    };
    suffleFoodFromDb().then((data) => {
      setFood(data);
    });
  };

  return (
    <>
      <Button
        className="absolute up-0 left-0"
        onClick={updatePicardDb}
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

      <main className="flex min-h-screen flex-col items-center justify-between p-20">
        <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        {food && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg w-80 h-20">{food.name}</CardTitle>
              <CardDescription>{`${food.kcal.toString()} kcal`}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={food.image}
                alt={food.image}
                width="0"
                height="0"
                sizes="100vw"
                className="w-80 h-auto"
              />
            </CardContent>
            {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
          </Card>
        )}

        <Button onClick={shuffleFood} variant="secondary">
          SHUFFLE FOOD
        </Button>
      </main>
    </>
  );
}
