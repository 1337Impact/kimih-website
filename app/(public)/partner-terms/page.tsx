import React from "react";

export default function Page() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 flex flex-col pt-20 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold text-center my-10 lg:my-16">
        Partner Terms for Kimih Information Technology CO. L.L.C
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to Kimih Information Technology CO. L.L.C (“Kimih,” “we,”
          “us,” “our”). These Partner Terms (“Terms”) govern your use of our
          SaaS platform and marketplace services. By registering as a partner,
          you agree to these Terms. If you do not agree, please refrain from
          using our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
        <p className="text-gray-700">
          Kimih offers a digital marketplace that connects buyers with beauty
          and fashion service providers. Our platform enables service booking
          and payment processing through a third- party payment gateway using an
          Authorization Capture API. This API facilitates secure and efficient
          transactions by authorizing payments temporarily and only capturing
          the payment amount within 24 hours of the customer&apos;s appointment. This
          ensures that transactions are processed accurately and helps prevent
          chargebacks or disputes related to cancellations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Fees</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Transaction Fees:</strong> Kimih charges a transaction fee
            of 5% on each successful booking processed through our platform.
            This fee is applied to the total service cost and is deducted prior
            to disbursing funds to the partner.
          </li>
          <li>
            <strong>Additional Costs:</strong> Partners are responsible for any
            additional fees imposed by third-party services, including payment
            processing fees and other related costs.
          </li>
          <li>
            <strong>Fee Changes:</strong> Kimih reserves the right to adjust
            fees. Partners will be notified of any fee changes at least 30 days
            in advance via email or platform notifications.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          4. Payment and Dispute Resolution
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Payment Processing:</strong> Payments for services are
            processed through a third-party payment gateway using our
            Authorization Capture API. This API authorizes the payment amount
            temporarily and captures it within 24 hours before the customer&apos;s
            appointment. This method ensures that transactions are accurately
            processed and helps in managing cancellations or adjustments
            efficiently.
          </li>
          <li>
            <strong>Dispute Resolution:</strong> Kimih does not mediate disputes
            related to payment processing or service quality between partners,
            customers, and the payment gateway. Disputes concerning payments or
            service issues should be addressed directly with our customer
            service team or resolved through the appropriate channels.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Partner Obligations</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Compliance:</strong> Partners must comply with all
            applicable laws, regulations, and industry standards. Use of the
            platform for any illegal activities or unethical conduct is
            prohibited.
          </li>
          <li>
            <strong>Content:</strong> Partners are responsible for ensuring that
            all content and services provided through the platform are accurate,
            lawful, and do not infringe on any third- party rights. Content must
            be presented truthfully and in compliance with platform guidelines.
          </li>
          <li>
            <strong>Accuracy:</strong> Partners must keep their service
            information, including availability, pricing, and descriptions,
            accurate and up-to-date. Any changes must be promptly reflected on
            the platform.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. Data Protection and Privacy
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Data Use:</strong> Partners agree to adhere to our Privacy
            Policy, which outlines how we collect, use, and protect personal
            data. Partners are responsible for handling customer data in
            accordance with applicable data protection laws and regulations.
          </li>
          <li>
            <strong>Security:</strong> Partners must implement reasonable and
            appropriate security measures to protect their accounts and data.
            This includes safeguarding login credentials and access to their
            platform profiles.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Indemnification</h2>
        <p className="text-gray-700">
          Partners agree to indemnify, defend, and hold Kimih, its affiliates,
          and their respective officers, directors, employees, and agents
          harmless from any claims, damages, losses, and expenses, including
          reasonable legal fees, arising out of or related to their use of the
          platform or services. This includes any claims resulting from
          violations of these Terms or related to the partner&apos;s services or
          content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          8. Limitation of Liability
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Platform Use:</strong> Kimih is not liable for any indirect,
            incidental, special, consequential, or punitive damages resulting
            from the use or inability to use the platform. This includes, but is
            not limited to, loss of profits, data, or business opportunities.
          </li>
          <li>
            <strong>Service Issues:</strong> Kimih is not responsible for issues
            arising from services provided by partners, including
            dissatisfaction, disputes, or losses experienced by customers.
            Partners are responsible for addressing any service-related issues
            directly with their customers.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
        <p className="text-gray-700">
          Any disputes arising under these Terms should first be attempted to be
          resolved through informal negotiation. If such resolution is not
          possible, disputes shall be settled through mediation or arbitration.
          If mediation or arbitration does not resolve the dispute, it may be
          escalated to the courts located in the UAE.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">10. Force Majeure</h2>
        <p className="text-gray-700">
          Kimih shall not be liable for any failure to perform its obligations
          under these Terms if such failure results from an event beyond its
          reasonable control. This includes but is not limited to natural
          disasters, strikes, labor disputes, or government actions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          11. Intellectual Property
        </h2>
        <p className="text-gray-700">
          All intellectual property rights related to the platform and its
          content are owned by Kimih. Partners may not use, reproduce, or
          distribute any of Kimih&apos;s intellectual property without prior written
          consent. Unauthorized use of Kimih&apos;s intellectual property may result
          in legal action.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          12. Relationship of the Parties
        </h2>
        <p className="text-gray-700">
          The relationship between Kimih and partners is that of independent
          contractors. Nothing in these Terms shall be construed as creating a
          partnership, joint venture, or employment relationship between Kimih
          and any partner.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">13. Notices</h2>
        <p className="text-gray-700">
          All notices or communications under these Terms shall be sent via
          email to the address provided by the partner or to help@kimih.com.
          Notices sent via email shall be deemed effective upon receipt.
          Partners are responsible for ensuring their contact information is
          current and accurate.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
        <p className="text-gray-700">
          Kimih reserves the right to modify these Terms at any time. Any
          changes will be communicated to partners through email or platform
          notifications. Continued use of the platform following such changes
          constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by and construed in accordance with the laws
          of the UAE. Any legal disputes arising from these Terms shall be
          resolved in the courts located in the UAE.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this please contact us at:
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
          <li className="font-semibold">Registration No: 2361735</li>
          <li className="font-semibold">
            Address: Office 43-44, Building of Dubai Municipality,
          </li>
          <li className="font-semibold">United Arab Emirates</li>
        </ul>
      </section>
    </main>
  );
}
