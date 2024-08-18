"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import styles from "./styles.module.css";
const businessFaqs = [
  {
    question: "How do I set up my business on Kimih?",
    answer: () => (
      <>
        <ul className="list-decimal">
          <li>
            <strong>Login</strong>
            <ul className="list-decimal">
              <li>Click the login button.</li>
              <li>Enter your email address.</li>
              <li>If an account exists, you will be logged in.</li>
              <li>If not, you will be redirected to the registration form.</li>
            </ul>
          </li>
          <li>
            <strong>Registration</strong>:
            <ul className="list-decimal">
              <li>
                Fill out the registration form with your business name and
                website address.
              </li>
              <li>Click &quot;Continue.&quot;</li>
            </ul>
          </li>
          <li>
            <strong>Services Selection</strong>:
            <ul className="list-decimal">
              <li>Choose the services you need.</li>
              <li>Click &quot;Continue.&quot;</li>
            </ul>
          </li>
          <li>
            <strong>Team Size</strong>:
            <ul className="list-decimal">
              <li>Select your team size.</li>
              <li>Click &quot;Continue.&quot;</li>
            </ul>
          </li>
          <li>
            <strong>Business Location</strong>:
            <ul className="list-decimal">
              <li>Enter your business location details.</li>
              <li>Submit the form.</li>
            </ul>
          </li>
          <li>
            <strong>Completion</strong>:
            <ul className="list-decimal">
              <li>Your business account will be set up successfully.</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I add my business location?",
    answer: () => (
      <>
        <p>
          To change or add your business location, please follow these steps:
        </p>
        <ul className="list-decimal">
          <li>Go to your dashboard.</li>
          <li>Click on your profile avatar.</li>
          <li>Select &quot;Profile.&quot;</li>
          <li>Navigate to the &quot;Business Details&quot; tab.</li>
          <li>Here, you can update or add your business location.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I customize my business profile?",
    answer: () => (
      <>
        <p>
          To change or add your business location, please follow these steps:
        </p>
        <ul className="list-decimal">
          <li>Go to your dashboard.</li>
          <li>Click on your profile avatar.</li>
          <li>Select &quot;Profile.&quot;</li>
          <li>Navigate to the &quot;Profile&quot; tab.</li>
          <li>Here, you can update or add your business location.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I add my services?",
    answer: () => (
      <>
        <p>To add new services, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Catalogue&quot; icon in the sidebar.</li>
          <li>A dropdown menu will appear; select &quot;Services.&quot;</li>
          <li>
            A new interface will be displayed with an &quot;Add Services&quot;
            button.
          </li>
          <li>Click on the &quot;Add Services&quot; button.</li>
          <li>A form will appear; complete the form to add your services.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I add my staff members?",
    answer: () => (
      <>
        <p>To add a new team member, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Team&quot; option in the sidebar.</li>
          <li>A dropdown menu will appear; select &quot;Team Members.&quot;</li>
          <li>You will be navigated to the Team Members page.</li>
          <li>Click on the &quot;Add Team Member&quot; button.</li>
          <li>
            A form will appear; complete the form to add the new team member.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I customize my appointment settings?",
    answer: () => (
      <>
        <p>To view and edit your appointments, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Sales&quot; option in the sidebar.</li>
          <li>
            Select the &quot;Appointments&quot; option from the dropdown menu.
          </li>
          <li>All your appointments will be displayed.</li>
          <li>You can edit appointments directly from this page.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I book an appointment?",
    answer: () => (
      <>
        <p>To book an appointment, follow these steps:</p>
        <ul className="list-decimal">
          <li>
            On the front page, click on the &quot;Store&quot; to view available
            appointments.
          </li>
          <li>Select the &quot;Book Now&quot; option.</li>
          <li>
            A modal will open; choose your desired appointment and click
            &quot;Continue.&quot;
          </li>
          <li>
            Select the date for your appointment and click &quot;Continue.&quot;
          </li>
          <li>
            Complete the payment process to finalize your appointment booking.
          </li>
        </ul>
        <p>
          Your appointment will be successfully booked upon completion of these
          steps.
        </p>
      </>
    ),
  },
  {
    question: "Can I edit or cancel an appointment?",
    answer: () => (
      <>
        <p>To view and manage your appointments, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Menu&quot; from the navbar.</li>
          <li>Select &quot;My Appointments&quot; from the dropdown.</li>
          <li>All your booked appointments will be displayed.</li>
          <li>
            To cancel an appointment, click on the &quot;Cancel&quot; option
            next to the desired appointment.
          </li>
          <li>Confirm the cancellation when prompted.</li>
        </ul>
        <p>Your appointment will be successfully canceled upon confirmation.</p>
      </>
    ),
  },
  {
    question: "How do I send appointment reminders to clients?",
    answer: () => (
      <>
        <p>
          A reminder message will be sent to the client&apos;s number 24 hours
          before the scheduled appointment date.
        </p>
      </>
    ),
  },
  {
    question: "Can I set up recurring appointments?",
    answer: () => (
      <>
        <p>No, currently not.</p>
      </>
    ),
  },
  {
    question: "How do I view my appointment calendar?",
    answer: () => (
      <>
        <p>To view all your appointments on a calendar, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Calendar&quot; option in the sidebar.</li>
          <li>Your appointments will be displayed on the calendar.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I reschedule appointments?",
    answer: () => (
      <>
        <p>No, currently not.</p>
      </>
    ),
  },
  {
    question: "How do I set up online booking?",
    answer: () => (
      <>
        <p>To book an appointment, follow these steps:</p>
        <ul className="list-decimal">
          <li>
            On the front page, click on the &quot;Store&quot; to view available
            appointments.
          </li>
          <li>Select the &quot;Book Now&quot; option.</li>
          <li>
            A modal will open; choose your desired appointment and click
            &quot;Continue.&quot;
          </li>
          <li>
            Select the date for your appointment and click &quot;Continue.&quot;
          </li>
          <li>
            Complete the payment process to finalize your appointment booking.
          </li>
        </ul>
        <p>
          Your appointment will be successfully booked upon completion of these
          steps.
        </p>
      </>
    ),
  },
  {
    question: "Can I send marketing emails to my clients?",
    answer: () => (
      <>
        <p>To send marketing emails, follow these steps:</p>
        <ul className="list-decimal">
          <li>Click on the &quot;Marketing&quot; option in the sidebar.</li>
          <li>
            Select &quot;Leads&quot; from the dropdown menu and add your leads.
          </li>
          <li>
            Click on the &quot;Email Marketing&quot; option in the sidebar to
            send marketing emails.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I integrate with third-party services?",
    answer: () => (
      <>
        <p>
          To integrate with a third-party service, navigate to the{" "}
          <a href="#settings" className="underline">
            settings
          </a>{" "}
          page.
        </p>
        <p>
          Click on the &quot;Integrations&quot; tab and select the service you
          want to integrate.
        </p>
        <p>
          Follow the on-screen instructions to complete the integration process.
        </p>
      </>
    ),
  },
];

const clientFaqs = [
  {
    question: "How do I book an appointment on Kimih?",
    answer: () => (
      <>
        <p>To book an appointment, follow these steps:</p>
        <ul className="list-decimal">
          <li>Visit the Kimih homepage and browse the services available.</li>
          <li>
            Click on &quot;Book Now&quot; for the service you’re interested in.
          </li>
          <li>A modal will open; choose your preferred date and time.</li>
          <li>Enter your contact information and proceed to payment.</li>
          <li>
            Once the payment is completed, you’ll receive a confirmation of your
            booking.
          </li>
        </ul>
        <p>Your appointment is now successfully booked!</p>
      </>
    ),
  },
  {
    question: "How do I view my upcoming appointments?",
    answer: () => (
      <>
        <p>To view your upcoming appointments, follow these steps:</p>
        <ul className="list-decimal">
          <li>Login to your Kimih account.</li>
          <li>Click on your profile avatar in the top right corner.</li>
          <li>Select &quot;My Appointments&quot; from the dropdown menu.</li>
          <li>
            Here, you’ll see a list of all your upcoming and past appointments.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer: () => (
      <>
        <p>Yes, you can cancel or reschedule your appointment. Here’s how:</p>
        <ul className="list-decimal">
          <li>
            Go to the &quot;My Appointments&quot; section in your profile.
          </li>
          <li>Find the appointment you wish to cancel or reschedule.</li>
          <li>
            Click on &quot;Cancel&quot; to cancel or &quot;Reschedule&quot; to
            choose a new time and date.
          </li>
          <li>Follow the prompts to confirm your changes.</li>
        </ul>
        <p>
          Note: Please check the cancellation policy of the service provider as
          some may have specific conditions.
        </p>
      </>
    ),
  },
  {
    question: "How do I receive reminders for my appointments?",
    answer: () => (
      <p>
        Kimih will automatically send you a reminder via SMS or email 24 hours
        before your scheduled appointment.
      </p>
    ),
  },
  {
    question: "Can I book recurring appointments?",
    answer: () => (
      <p>
        No, currently the platform does not support recurring appointments. You
        will need to book each appointment individually.
      </p>
    ),
  },
  {
    question: "How do I find a specific service or provider on Kimih?",
    answer: () => (
      <>
        <p>To find a specific service or provider, follow these steps:</p>
        <ul className="list-decimal">
          <li>
            Use the search bar at the top of the homepage to enter the service
            or provider name.
          </li>
          <li>
            Filter your search results by location, ratings, and availability.
          </li>
          <li>
            Select your preferred provider to view their profile and available
            services.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I update my profile information?",
    answer: () => (
      <>
        <p>To update your profile information, follow these steps:</p>
        <ul className="list-decimal">
          <li>Login to your account.</li>
          <li>Click on your profile avatar in the top right corner.</li>
          <li>Select &quot;Profile&quot; from the dropdown menu.</li>
          <li>
            Here, you can update your personal details, contact information, and
            preferences.
          </li>
          <li>Click &quot;Save&quot; to confirm your changes.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I save my payment information for future bookings?",
    answer: () => (
      <>
        <p>
          Yes, you can save your payment information securely for faster future
          bookings. Here’s how:
        </p>
        <ul className="list-decimal">
          <li>
            During the payment process, check the option to save your card
            details.
          </li>
          <li>
            Next time you book, your saved payment method will be available for
            use.
          </li>
        </ul>
        <p>
          All payment information is stored securely following industry
          standards.
        </p>
      </>
    ),
  },
  {
    question: "How do I contact customer support?",
    answer: () => (
      <>
        <p>
          If you need assistance, you can contact Kimih customer support by
          following these steps:
        </p>
        <ul className="list-decimal">
          <li>
            Click on the &quot;Help&quot; option in the footer of the website.
          </li>
          <li>Select &quot;Contact Us&quot; from the options provided.</li>
          <li>Fill out the form with your query and submit it.</li>
          <li>Our support team will get back to you as soon as possible.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I leave a review for a service provider?",
    answer: () => (
      <>
        <p>
          After your appointment, you can leave a review by following these
          steps:
        </p>
        <ul className="list-decimal">
          <li>
            Go to the &quot;My Appointments&quot; section in your profile.
          </li>
          <li>Select the completed appointment you wish to review.</li>
          <li>Click on &quot;Leave a Review&quot; and rate the service.</li>
          <li>You can also add comments about your experience.</li>
          <li>Click &quot;Submit&quot; to post your review.</li>
        </ul>
        <p>Your feedback helps others make informed decisions!</p>
      </>
    ),
  },
  {
    question: "Can I receive promotions or discounts on services?",
    answer: () => (
      <>
        <p>
          Yes, Kimih offers promotions and discounts from time to time. Here’s
          how you can find them:
        </p>
        <ul className="list-decimal">
          <li>
            Check the &quot;Offers&quot; section on the homepage or in the
            &quot;My Account&quot; area.
          </li>
          <li>
            You’ll see a list of available discounts or promotional codes.
          </li>
          <li>
            Apply the code during the booking process to avail of the discount.
          </li>
        </ul>
        <p>Be sure to check back regularly for new offers!</p>
      </>
    ),
  },
  {
    question: "How do I refer friends to Kimih?",
    answer: () => (
      <>
        <p>To refer friends to Kimih, follow these steps:</p>
        <ul className="list-decimal">
          <li>
            Click on the &quot;Refer a Friend&quot; option in your account menu.
          </li>
          <li>
            You’ll receive a unique referral link that you can share with your
            friends.
          </li>
          <li>
            When your friend signs up and books a service using your link, you
            both receive a reward.
          </li>
        </ul>
        <p>Terms and conditions apply.</p>
      </>
    ),
  },
];

export default function Faq() {
  const [active, setActive] = useState("client");
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <h1 className="text-4xl font-bold text-center my-10 md:my-20">
        Frequently Asked Questions
      </h1>
      <section className="w-full md:px-2">
        <div className="flex gap-2 items-end">
          <h4 className="text-xl font-semibold mr-2">Filter By:</h4>
          <button
            onClick={() => setActive("client")}
            className={`px-6 py-[4px] ${
              active === "client"
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "text-gray-800 hover:bg-gray-100"
            } font-semibold rounded-full`}
          >
            client
          </button>
          <button
            onClick={() => setActive("business")}
            className={`px-6 py-[4px] ${
              active === "business"
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "text-gray-800 hover:bg-gray-100"
            } font-semibold rounded-full`}
          >
            business
          </button>
        </div>
        <Accordion className={`${styles.faq} mt-4`} type="single" collapsible>
          {active === "client"
            ? clientFaqs.map((faq, index) => (
                <AccordionItem key={index} value={faq.question}>
                  <AccordionTrigger className="text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[1.1rem] text-gray-700">
                    <faq.answer />
                  </AccordionContent>
                </AccordionItem>
              ))
            : businessFaqs.map((faq, index) => (
                <AccordionItem key={index} value={faq.question}>
                  <AccordionTrigger className="text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <faq.answer />
                  </AccordionContent>
                </AccordionItem>
              ))}
        </Accordion>
      </section>
    </main>
  );
}
