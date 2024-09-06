// app/payment-callback/page.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentCallback = () => {
  const router = useRouter();
  const { tap_id } = router.query;

  useEffect(() => {
    if (tap_id) {
      // Call your verify payment API to check payment status
      fetch(`/api/verify-payment?tap_id=${tap_id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Payment Status:', data);
          // Handle success or failure based on the response
        });
    }
  }, [tap_id]);

  return <div>Processing your payment...</div>;
};

export default PaymentCallback;
