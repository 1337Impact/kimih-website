import Link from "next/link";
import "./styles.css";

export default function PricingCard() {
  return (
    <div className="card">
      <h1 className="card-title">Popular</h1>
      <p className="card-description">What You'll Get</p>
      <ul className="card-get_list">
        <li className="card-get_list__item">No subscription fees</li>
        <li className="card-get_list__item">
          Only 2.5% on each successful booking
        </li>
        <li className="card-get_list__item">You only pay when you profit</li>
        <li className="card-get_list__item">Fully optimized platform</li>
        <li className="card-get_list__item">
          Perfect for businesses of all sizes
        </li>
      </ul>
      <div className="card-price">
        <h2>$0</h2>/<span className="card-price_month">month</span>
      </div>
      <Link href="/business/signup">
        <button className="card-main_button">Select</button>
      </Link>
    </div>
  );
}
