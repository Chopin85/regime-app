'use client';
import React from 'react';
import Image from 'next/image';
import buildingImg from '../../public/images/image.jpg';

export default function Home() {
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl font-bold text-center mb-8">
          Welcome to Your Health Journey!
        </h1>
        <h3 className="text-primary px-20 text-center">
          At Regime app, were dedicated to helping you achieve your health and
          wellness goals. Our tailored diet programs are designed to fit your
          lifestyle, whether youre looking to lose weight, build muscle, manage
          a health condition, or simply eat healthier.
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center bg-secondary">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <Image
                width="100"
                height="100"
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={buildingImg}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Company retreats
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                Incredible accommodation for your team
              </a>
              <p className="mt-2 text-slate-500">
                Looking to take your team away on a retreat to enjoy awesome
                food and take in some sunshine? We have a list of places to do
                just that.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
