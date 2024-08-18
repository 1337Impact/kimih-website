import React from "react";

export default function Page() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 flex flex-col pt-20 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold text-center my-10 lg:my-16">
        Cancellation Policy for Customers and Merchants
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. General Policy</h2>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Notice Period:</strong> Customers must cancel their
            appointments at least 24 hours before the scheduled time to avoid
            any charges.
          </li>
          <li>
            <strong>Late Cancellations:</strong> Cancellations made within 24
            hours of the appointment will incur a cancellation fee of 50% of
            the service cost.
          </li>
          <li>
            <strong>No-Shows:</strong> If a customer does not show up for their
            appointment without prior notice, they will be charged 100% of the
            service cost.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-4">For Merchants</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Notice Period:</strong> Merchants must cancel appointments
            at least 24 hours before the scheduled time to avoid inconveniencing
            customers.
          </li>
          <li>
            <strong>Late Cancellations:</strong> Cancellations made within 24
            hours of the appointment should include a valid reason, and the
            customer should be informed immediately.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Refunds and Credits</h2>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Full Refund:</strong> If a customer cancels more than 24
            hours before the appointment, they will receive a full refund or
            credit towards future services.
          </li>
          <li>
            <strong>Partial Refund:</strong> For late cancellations, customers
            will receive a refund minus the cancellation fee or a partial credit
            towards future services.
          </li>
          <li>
            <strong>No Refunds for No-Shows:</strong> No refunds will be issued
            for no-shows.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-4">For Merchants</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Full Refund:</strong> Customers will receive a full refund
            or credit for future services if the merchant cancels the
            appointment.
          </li>
          <li>
            <strong>Compensation:</strong> If the cancellation causes
            significant inconvenience to the customer, merchants may offer
            additional compensation, such as a discount on future services.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Special Circumstances</h2>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <p className="text-gray-700">
          <strong>Emergency Cancellations:</strong> In the case of emergencies,
          customers should contact customer support as soon as possible. Each
          case will be reviewed individually, and exceptions may be made at the
          discretion of the merchant.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-4">For Merchants</h3>
        <p className="text-gray-700">
          <strong>Emergency Cancellations:</strong> In the case of emergencies,
          merchants should notify customers as soon as possible and provide a
          valid reason. Each case will be handled individually, and customers
          should be offered rescheduling options or refunds.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Repeated Cancellations</h2>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <p className="text-gray-700">
          <strong>Frequent Cancellations:</strong> Customers who frequently
          cancel appointments may be required to provide a deposit for future
          bookings.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-4">For Merchants</h3>
        <p className="text-gray-700">
          <strong>Monitoring:</strong> Merchants who frequently cancel
          appointments may face penalties or be required to provide additional
          customer assurances. Kimih will review the cancellation patterns of
          merchants to ensure compliance with the platform’s standards.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. How to Cancel</h2>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Online:</strong> Customers can cancel their appointments
            through their Kimih account.
          </li>
          <li>
            <strong>Contact:</strong> Alternatively, customers can contact the
            merchant directly to cancel their appointments.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Additional Notes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Platform Enforcement:</strong> Kimih reserves the right to
            enforce these policies and take action against customers or
            merchants who repeatedly violate the cancellation terms.
          </li>
          <li>
            <strong>Policy Updates:</strong> Both customers and merchants will
            be notified of any changes to the cancellation policy via email and
            platform notifications.
          </li>
        </ul>
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
              href="mailto:info@kimih.com"
              className="text-blue-600 hover:underline ml-2"
            >
              info@kimih.com
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
