import Image from "next/image";
import { SignInButton } from '@clerk/nextjs';

export default function Hero({
  title = "Welcome to My Blog",
  description = "Sharing insights, stories, and experiences.",
  buttonText = "Start reading",
  imageSrc = "/hero.png",
  page,
  isImageVisible = true, 
}) {
  return (
    <section>
      <div className="max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl py-52 px-12 mx-auto lg:gap-8 xl:gap-4 lg:py-24 lg:grid lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-6">
          <h1 className="max-w-4xl mb-8 text-5xl font-medium leading-none md:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl mb-6 text-lg font-light text-gray-800 lg:mb-8 md:text-lg lg:text-2xl">
            {description}
          </p>
          <SignInButton
            aria-label="Sign in to start reading"
            className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-12 py-2"
          >
            {buttonText}
          </SignInButton>
        </div>

        {isImageVisible && (
          <div className="hidden lg:col-span-6 lg:flex justify-center">
            <Image
              src={imageSrc}
              alt={title} 
              width={1000}
              height={800}
              priority
              layout="intrinsic"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
