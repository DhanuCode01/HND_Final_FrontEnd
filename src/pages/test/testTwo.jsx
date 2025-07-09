
import { useEffect } from "react";

export default function TestTwo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payNow = () => {
    // Callback functions
    window.payhere.onCompleted = function (orderId) {
      alert("✅ Payment completed! Order ID: " + orderId);
    };

    window.payhere.onDismissed = function () {
      alert("❌ Payment dismissed.");
    };

    window.payhere.onError = function (error) {
      alert("🚫 Error: " + error);
    };

    // Payment object
    const payment = {
      sandbox: true, // true = sandbox mode
      merchant_id: "1231129", // Replace this with your actual PayHere sandbox merchant ID
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      notify_url: "http://localhost:5000/api/payment/notify", // Must match backend

      order_id: "Order123",
      items: "T-shirt",
      amount: "1000.00",
      currency: "LKR",
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      phone: "0771234567",
      address: "123, Test Street",
      city: "Colombo",
      country: "Sri Lanka",
    };

    // Start payment popup
    window.payhere.startPayment(payment);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>💳 Test PayHere Payment</h2>
      <button onClick={payNow} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Pay Now
      </button>
    </div>
  );
}
