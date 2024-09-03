"use client";
export default function BookNowButton() {
  const handleScroll = () => {
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={handleScroll}
      className="mt-6 text-xl text-white bg-gray-900 py-2 px-10 rounded-lg"
    >
      Book now
    </button>
  );
}
