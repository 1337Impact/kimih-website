"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./styles.css";

const businessFaqs = [
  {
    question: "How do I set up my business on Kimih?",
    answer: () => (
      <>
        <ul>
          <li>
            <strong>Login</strong>
            <ul>
              <li>Click the login button.</li>
              <li>Enter your email address.</li>
              <li>If an account exists, you will be logged in.</li>
              <li>If not, you will be redirected to the registration form.</li>
            </ul>
          </li>
          <li>
            <strong>Registration</strong>:
            <ul>
              <li>
                Fill out the registration form with your business name and
                website address.
              </li>
              <li>Click "Continue."</li>
            </ul>
          </li>
          <li>
            <strong>Services Selection</strong>:
            <ul>
              <li>Choose the services you need.</li>
              <li>Click "Continue."</li>
            </ul>
          </li>
          <li>
            <strong>Team Size</strong>:
            <ul>
              <li>Select your team size.</li>
              <li>Click "Continue."</li>
            </ul>
          </li>
          <li>
            <strong>Business Location</strong>:
            <ul>
              <li>Enter your business location details.</li>
              <li>Submit the form.</li>
            </ul>
          </li>
          <li>
            <strong>Completion</strong>:
            <ul>
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
        <ul>
          <li>Go to your dashboard.</li>
          <li>Click on your profile avatar.</li>
          <li>Select "Profile."</li>
          <li>Navigate to the "Business Details" tab.</li>
          <li>Here, you can update or add your business location.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I customize my business profile",
    answer: () => (
      <>
        <p>
          To change or add your business location, please follow these steps:
        </p>
        <ul>
          <li>Go to your dashboard.</li>
          <li>Click on your profile avatar.</li>
          <li>Select "Profile."</li>
          <li>Navigate to the "Profile" tab.</li>
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
        <ul>
          <li>Click on the "Catalogue" icon in the sidebar.</li>
          <li>A dropdown menu will appear; select "Services."</li>
          <li>
            A new interface will be displayed with an "Add Services" button.
          </li>
          <li>Click on the "Add Services" button.</li>
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
        <ul>
          <li>Click on the "Team" option in the sidebar.</li>
          <li>A dropdown menu will appear; select "Team Members."</li>
          <li>You will be navigated to the Team Members page.</li>
          <li>Click on the "Add Team Member" button.</li>
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
        <ul>
          <li>Click on the "Sales" option in the sidebar.</li>
          <li>Select the "Appointments" option from the dropdown menu.</li>
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
        <ul>
          <li>
            On the front page, click on the "Store" to view available
            appointments.
          </li>
          <li>Select the "Book Now" option.</li>
          <li>
            A modal will open; choose your desired appointment and click
            "Continue."
          </li>
          <li>Select the date for your appointment and click "Continue."</li>
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
        <ul>
          <li>Click on the "Menu" from the navbar.</li>
          <li>Select "My Appointments" from the dropdown.</li>
          <li>All your booked appointments will be displayed.</li>
          <li>
            To cancel an appointment, click on the "Cancel" option next to the
            desired appointment.
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
          A reminder message will be sent to the client's number 24 hours before
          the scheduled appointment date.
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
        <ul>
          <li>Click on the "Calendar" option in the sidebar.</li>
          <li>Your appointments will be displayed on the calendar.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I reschedule appointments?",
    answer: () => (
      <>
        <p>No currently not.</p>
      </>
    ),
  },
  {
    question: "How do I set up online booking?",
    answer: () => (
      <>
        <p>To book an appointment, follow these steps:</p>
        <ul>
          <li>
            On the front page, click on the "Store" to view available
            appointments.
          </li>
          <li>Select the "Book Now" option.</li>
          <li>
            A modal will open; choose your desired appointment and click
            "Continue."
          </li>
          <li>Select the date for your appointment and click "Continue."</li>
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
        <ul>
          <li>Click on the "Marketing" option in the sidebar.</li>
          <li>Select "Leads" from the dropdown menu and add your leads.</li>
          <li>
            Click on the "Email Marketing" option from the Marketing menu.
          </li>
          <li>Fill out the form and send emails to your clients.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I add or remove staff members?",
    answer: () => (
      <>
        <p>To remove a staff member, follow these steps:</p>
        <ul>
          <li>Click on the "Team" option in the sidebar.</li>
          <li>Select "Team Members" from the dropdown menu.</li>
          <li>A list of all team members will be displayed.</li>
          <li>From this list, select the staff member you wish to remove.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I set different permissions for my staff?",
    answer: () => (
      <>
        <p>To set permissions for staff, follow these steps:</p>
        <ul>
          <li>Click on the "User Management" option in the sidebar.</li>
          <li>Select the "Permissions" option.</li>
          <li>
            A list of roles with their associated permissions will be displayed.
          </li>
          <li>
            You can change existing permissions or set new ones from this page.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I add new clients to my database?",
    answer: () => (
      <>
        <p>To add new clients to your database, follow these steps:</p>
        <ul>
          <li>Click on the "Clients" option in the sidebar.</li>
          <li>A dropdown menu will appear; select "Clients List."</li>
          <li>The list of your clients will be displayed.</li>
          <li>Click on the "Add New Client" button.</li>
          <li>Fill out the form to add a new client.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I import client information from another system?",
    answer: () => (
      <>
        <p>No currently not.</p>
      </>
    ),
  },
  {
    question: "How do I manage client appointments?",
    answer: () => (
      <>
        <p>To view and edit your client's appointments, follow these steps:</p>
        <ul>
          <li>Click on the "Sales" option in the sidebar.</li>
          <li>Select the "Appointments" option from the dropdown menu.</li>
          <li>All your appointments will be displayed.</li>
          <li>You can edit appointments directly from this page.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I contact Kimih support?",
    answer: () => (
      <>
        <p>To contact Kimih support, follow these steps:</p>
        <ul>
          <li>Click on the "Help" option in the sidebar.</li>
          <li>Select the "Contact Us" option from the dropdown menu.</li>
          <li>Fill out the form and submit it to reach support.</li>
        </ul>
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
        <ul>
          <li>Visit the Kimih homepage and browse the services available.</li>
          <li>Click on "Book Now" for the service you’re interested in.</li>
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
        <ul>
          <li>Login to your Kimih account.</li>
          <li>Click on your profile avatar in the top right corner.</li>
          <li>Select "My Appointments" from the dropdown menu.</li>
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
        <ul>
          <li>Go to the "My Appointments" section in your profile.</li>
          <li>Find the appointment you wish to cancel or reschedule.</li>
          <li>
            Click on "Cancel" to cancel or "Reschedule" to choose a new time and
            date.
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
        <ul>
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
        <ul>
          <li>Login to your account.</li>
          <li>Click on your profile avatar in the top right corner.</li>
          <li>Select "Profile" from the dropdown menu.</li>
          <li>
            Here, you can update your personal details, contact information, and
            preferences.
          </li>
          <li>Click "Save" to confirm your changes.</li>
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
        <ul>
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
        <ul>
          <li>Click on the "Help" option in the footer of the website.</li>
          <li>Select "Contact Us" from the options provided.</li>
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
        <ul>
          <li>Go to the "My Appointments" section in your profile.</li>
          <li>Select the completed appointment you wish to review.</li>
          <li>Click on "Leave a Review" and rate the service.</li>
          <li>You can also add comments about your experience.</li>
          <li>Click "Submit" to post your review.</li>
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
        <ul>
          <li>
            Check the "Offers" section on the homepage or in the "My Account"
            area.
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
        <ul>
          <li>Click on the "Refer a Friend" option in your account menu.</li>
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
        <Accordion className="mt-4" type="single" collapsible>
          {active === "client"
            ? clientFaqs.map((faq, index) => (
                <AccordionItem key={index} value={faq.question}>
                  <AccordionTrigger className="text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
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
