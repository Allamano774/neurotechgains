// deposit.tsx
import React, { useEffect, useState } from "react";

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("mpesa");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = () => {
    if (!amount || amount < 20) return alert("Minimum deposit is KES 20");

    const handler = (window as any).PaystackPop.setup({
      key: "pk_live_c8d72323ec70238b1fb7ce3d5a42494560fbe815",
      email: "customer@example.com",
      amount: amount * 100,
      currency: "KES",
      ref: "DEPOSIT_" + Date.now(),
      callback: function (response: any) {
        alert("Payment successful! Reference: " + response.reference);
      },
      onClose: function () {
        alert("Payment not completed");
      },
    });

    handler.openIframe();
  };

  const quickAmounts = [20, 30, 50, 100, 250, 500];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add Funds</h2>
        <p className="text-sm text-gray-500 mb-6">
          Top up your account balance to start ordering services
        </p>

        <label className="block text-lg font-medium text-gray-700 mb-2">
          Deposit Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setSelectedAmount(null);
          }}
          placeholder="0.00"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-3 gap-2 mb-6">
          {quickAmounts.map((val) => (
            <button
              key={val}
              className={`border rounded-lg py-2 text-sm font-medium ${
                selectedAmount === val ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => {
                setAmount(val);
                setSelectedAmount(val);
              }}
            >
              KES {val}
            </button>
          ))}
        </div>

        <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === "mpesa"}
              onChange={() => setSelectedMethod("mpesa")}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">M-Pesa (Paystack)</p>
              <p className="text-xs text-gray-500">Pay with M-Pesa via Paystack</p>
            </div>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-not-allowed opacity-60">
            <input type="radio" name="paymentMethod" disabled className="mr-3" />
            <div>
              <p className="font-semibold">PayPal</p>
              <p className="text-xs text-gray-500">International payments (Coming Soon)</p>
            </div>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-not-allowed opacity-60">
            <input type="radio" name="paymentMethod" disabled className="mr-3" />
            <div>
              <p className="font-semibold">Credit/Debit Card</p>
              <p className="text-xs text-gray-500">Visa, MasterCard (Coming Soon)</p>
            </div>
          </label>
        </div>

        <button
          onClick={handlePay}
          disabled={!amount || selectedMethod !== "mpesa"}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50"
        >
          Pay KES {amount || 0} via M-Pesa
        </button>

        <div className="mt-8 text-sm text-gray-600 space-y-2">
          <p>• Minimum deposit amount is KES 20</p>
          <p>• M-Pesa and Airtel Money payments are processed via Paystack</p>
          <p>• Only M-Pesa and Airtel Money currently available – other methods coming soon</p>
          <p>• Deposits are usually processed instantly</p>
          <p>• Only successful deposits are displayed in the history</p>
          <p>• All payments are secure and encrypted</p>
          <p>• Contact support if you encounter any issues</p>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
