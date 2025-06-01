import Image from "next/image";

export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/premium-pixel-vault.gif"
          alt="Premium Pixel Vault Logo"
          width={120}
          height={120}
          className="rounded-full border-2 shadow mb-4"
        />
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">About Premium Pixel Vault</h1>
        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold text-indigo-600">Premium Pixel Vault</span>! We are passionate about providing you with the highest quality digital assets, including unique pixel art, icons, and creative resources for your projects.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to empower designers, developers, and creators by offering a curated collection of premium digital products. Whether you are building a website, designing a game, or working on a creative project, our vault has something for you.
        </p>
        <p className="text-gray-700">
          Thank you for choosing us as your trusted source for digital assets. If you have any questions or suggestions, feel free to <a href="/contact" className="text-indigo-600 underline">contact us</a>.
        </p>
      </div>
    </section>
  );
}