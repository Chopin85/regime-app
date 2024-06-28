'use client';

import * as React from 'react';
import { Link, usePathname } from '@/lib/navigations';
import { Menu, Moon, Sun } from 'lucide-react';
import { IoFastFood } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { LanguageSelector } from '../LanguagesSelector';

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const path = usePathname();
  const { setTheme } = useTheme();

  const menus = [
    { title: 'Shuffle', path: '/shuffle' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'About Us', path: '/dashboard' },
    { title: 'Contact Us', path: '/dashboard' },
  ];

  React.useEffect(() => {
    setState(false);
  }, [path]);

  return (
    <nav className="bg-transparent w-full border-b md:border-0 fixed backdrop-blur z-50">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="flex flex-row items-baseline text-3xl font-bold text-primary gap-3">
              <IoFastFood /> Regime app
            </h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx}>
                <Button
                  variant="link"
                  asChild
                  className={path === item.path ? 'underline' : ''}
                >
                  <Link className="text-lg" href={item.path}>
                    {item.title}
                  </Link>
                </Button>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
