import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative h-[95vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1606011082438-5e55fea65538?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Two models wearing light grey sweatshirts"
        layout="fill"
        objectFit="cover"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      <span className="absolute left-4 bottom-4 text-white text-sm uppercase tracking-widest writing-mode-vertical">
        Timeless Design. Lasting Strength.
      </span>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Doors that Welcome, Wood that Lasts
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white">
          Create a lasting first impression with doors that feel like home.
        </p>
        <Button href="/shop" className="mt-8">
          EXPLORE NOW
        </Button>
      </div>
    </section>
  );
}
