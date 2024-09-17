import React from "react";

export default function Page() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 flex flex-col pt-20 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold text-center my-10 lg:my-16">
        Cancellation Policy for Customers and Merchants
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">For Customers</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Notice Period:</strong> To avoid any charges, customers must
            cancel their appointments at least 24 hours before the scheduled
            time.
          </li>
          <li>
            <strong>Late Cancellations:</strong> Cancellations made within 24
            hours of the appointment will incur a charge of 100% of the service
            cost.
          </li>
          <li>
            <strong>No-Shows:</strong> If a customer does not show up for their
            appointment without prior notice, they will be charged 100% of the
            service cost.
          </li>
          <li>
            <strong>Full Refund:</strong> If a customer cancels more than 24
            hours before the appointment, they will receive a full refund or a
            credit towards future services.
          </li>
          <li>
            <strong>No Refunds for Late Cancellations and No-Shows:</strong> No
            refunds will be issued for cancellations made within 24 hours or for
            no-shows.
          </li>
          <li>
            <strong>Emergency Cancellations:</strong> In the case of
            emergencies, customers should contact the merchant as soon as
            possible. Each case will be reviewed individually, and exceptions
            may be made at the discretion of the merchant.
          </li>
          <li>
            <strong>Repeated Cancellations:</strong> Customers who frequently
            cancel appointments may be required to provide a deposit for future
            bookings.
          </li>
          <li>
            <strong>How to Cancel:</strong> Customers can cancel their
            appointments through their Kimih account or contact the merchant
            directly to cancel their appointments.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">For Merchants</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Late Cancellations:</strong> Cancellations made within 24
            hours of the appointment should be communicated promptly to the
            customer, and a valid reason should be provided.
          </li>
          <li>
            <strong>Full Refund:</strong> Customers will receive a full refund
            or credit for future services if the merchant cancels more than 24
            hours before the appointment.
          </li>
          <li>
            <strong>Compensation:</strong> If the cancellation causes
            significant inconvenience to the customer, merchants may offer
            additional compensation, such as a discount on future services.
          </li>
          <li>
            <strong>Emergency Cancellations:</strong> In the case of
            emergencies, merchants should notify customers as soon as possible
            and provide a valid reason. Each case will be handled individually,
            and customers should be offered rescheduling options or refunds.
          </li>
          <li>
            <strong>Rescheduling:</strong> Merchants should prioritize
            rescheduling affected customers at their earliest convenience and
            offer multiple rescheduling options to accommodate the customer’s
            availability.
          </li>
          <li>
            <strong>Customer Communication:</strong> Merchants must notify
            customers of cancellations as soon as possible, preferably via phone
            and email, and handle cancellations professionally and courteously.
          </li>
          <li>
            <strong>Repeated Cancellations:</strong> Merchants who frequently
            cancel appointments may face penalties or be required to provide
            additional customer assurances. Kimih will review the cancellation
            patterns of merchants to ensure compliance with the platform’s
            standards.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Platform Enforcement</h2>
        <p className="text-gray-700">
          Kimih reserves the right to enforce these policies and take action
          against customers or merchants who repeatedly violate the cancellation
          terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
        <p className="text-gray-700">
          Both customers and merchants will be notified of any changes to the
          cancellation policy via email and platform notifications.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700">
          For any questions or concerns regarding these policies, please contact
          us at:
        </p>
        <ul className="text-gray-700 list-disc list-inside space-y-2 mt-2">
          <li className="font-semibold">
            Kimih Information Technology CO. L.L.C
          </li>
          <li className="font-semibold">
            Email:
            <a
              href="mailto:help@kimih.com"
              className="text-blue-600 hover:underline ml-2"
            >
              help@kimih.com
            </a>
          </li>
          <li className="font-semibold">Registration no: 2361735</li>
          <li className="font-semibold">
            Address: Office 43-44, Building of Dubai Municipality,
          </li>
          <li className="font-semibold">United Arab Emirates</li>
        </ul>
      </section>
    </main>
  );
}
