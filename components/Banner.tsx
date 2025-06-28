import Button from "./Button";

export default function Banner() {
  return (
    <div className="bg-orange-100">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-orange-600">
            Request a Free Quote Today<span className="text-black">.</span>
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <Button href="/quote">Request a Free Quote</Button>
          <a
            href="#"
            className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-gray-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
