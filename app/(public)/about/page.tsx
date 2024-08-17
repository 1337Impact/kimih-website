import Image from "next/image";

export default async function Home() {
  return (
    <main className="pt-32">
      <h1 className="text-5xl font-bold text-center">About us</h1>
      <section id="about-us" className="flex justify-between gap-10 mt-20 px-10">
          <Image
            className="object-cover rounded-lg h-[600px] w-[45%]"
            width={600}
            height={600}
            src={"/assets/images/about-us-team.jpg"}
            alt="About us team"
          />
        <div className="w-1/2">
          <h2 className="text-3xl font-bold">How we help?</h2>
          <p className="text-lg text-gray-600 mt-4 w-[80%]">
            Kimih is an innovative platform dedicated to transforming the beauty
            and wellness industry. Founded in 2024 and headquartered in the
            vibrant city of Dubai, Kimih provides cutting-edge software
            solutions that empower beauty and wellness businesses to scale,
            thrive, and succeed in a competitive market. Our Mission: At Kimih,
            our mission is to revolutionize the beauty and wellness industry by
            offering intuitive, scalable tools that cater to the unique needs of
            businesses. We are committed to helping our clients streamline their
            operations, connect with customers, and grow without the burden of
            subscription fees.
          </p>
        </div>
      </section>
    </main>
  );
}
