import dynamic from "next/dynamic";
// import PaymentForm from "./PaymentForm";

const PaymentForm = dynamic(() => import("./PaymentForm"), {
  ssr: false,
});

function PaymentIndex() {
  return (
    <div className="w-full flex items-center justify-center mt-10">
    <div className="max-w-[500px]">
      <PaymentForm />
    </div>
    </div>
  );
}

export default PaymentIndex;
