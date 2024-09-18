"use client";
import Link from "next/link";
import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import swal from "sweetalert";

export default function Contact() {
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((body) => {
        return body.json();
      })
      .then((res) => {
        swal(
          "Email sent successfully !",
          "I will get back to you as soon as possible",
          "success"
        );
      })
      .catch((err) => {
        swal("Error", "Something went wrong, please try again later", "error");
      });
    e.target.reset();
  };

  return (
    <main
      className="container overflow-hidden max-w-[1300px] mx-auto px-4 flex flex-col items-center pt-20 md:px-10 lg:px-20"
    >
      <div className="flex flex-col items-center my-10 md:my-14">
        <h1 className="text-4xl md:text-5xl text-gray-800">
          How can we help you?
        </h1>
        <p className="mt-1 text-gray-600">
          Get in touch or send us an email directly on{" "}
          <span className="font-semibold text-gray-700 underline notranslate">
            <a href="mailto:support@kimih.com">help@kimih.com</a>.
          </span>
        </p>
      </div>
      <form
        onSubmit={submitForm}
        className="mt-2 grid w-full gap-3 font-semibold text-gray-700 md:grid-cols-2"
      >
        <div className="grid w-full gap-1">
          <label className="">Name</label>
          <input
            placeholder="Your name"
            required={true}
            minLength={5}
            maxLength={50}
            name="name"
            type="text"
            className="h-10 font-normal  rounded-md border-2 border-gray-600 bg-transparent p-2 focus:outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="">Email</label>
          <input
            placeholder="Your email"
            name="email"
            type="email"
            required={true}
            className="h-10 font-normal  rounded-md border-2 border-gray-600 bg-transparent p-2 focus:outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-1 md:col-span-2">
          <label className="">Subject</label>
          <input
            placeholder="Subject"
            minLength={3}
            name="subject"
            type="text"
            className="h-10 font-normal  rounded-md border-2 border-gray-600 bg-transparent p-2 focus:outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-1 md:col-span-2">
          <label className="">Message</label>
          <textarea
            placeholder="Type your message here..."
            required={true}
            minLength={5}
            maxLength={1000}
            name="message"
            className="h-28 font-normal rounded-md border-2 border-gray-600 bg-transparent p-2 focus:outline-none"
          />
        </div>
        <p className="mt-1 text-gray-600">
          <input className="mr-1" type="checkbox" required={true} />
          Accept <Link
            href="/privacy-policy"
            className="px-1 inline text-themeBlue underline transition-all duration-300 ease-in-out hover:text-violet-600"
          >
            Privacy Policy
          </Link>
          And
          <Link
            href="/terms-and-conditions"
            className="px-1 inline text-themeBlue underline transition-all duration-300 ease-in-out hover:text-violet-600"
          >
            Terms & Conditions
          </Link>.
        </p>
        <button
          type="submit"
          className="md:col-span-2 mt-2 h-10 w-full rounded-md border-2 border-gray-600 bg-gray-600 text-gray-100 hover:bg-gray-700 md:col-span-2-100"
        >
          Submit
        </button>
      </form>
      <Link
        href="/"
        className="mt-4 flex items-center justify-start gap-3 text-gray-600 hover:text-gray-800-100"
      >
        <h2 className="text-md">Go back home</h2>
        <div className="w-4 translate-y-[1px] animate-pulse">
          <FaArrowRightLong size="100%" />
        </div>
      </Link>
    </main>
  );
}
