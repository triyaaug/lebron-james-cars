import React, { useState } from "react";

const LoanCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanDuration) * 12;
    const loanAmount = price - down;

    if (loanAmount <= 0 || isNaN(rate) || isNaN(months) || months <= 0) {
      alert("Please enter valid values.");
      return;
    }

    let payment;
    if (rate === 0) {
      payment = loanAmount / months;
    } else {
      payment =
        (loanAmount * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);
    }

    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div>
      <h2>Loan Calculator</h2>
      <div>
        <label>Vehicle Price ($): </label>
        <input
          type="number"
          value={vehiclePrice}
          onChange={(e) => setVehiclePrice(e.target.value)}
        />
      </div>
      <div>
        <label>Down Payment ($): </label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
        />
      </div>
      <div>
        <label>Interest Rate (% per year): </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>
      <div>
        <label>Loan Duration (years): </label>
        <input
          type="number"
          value={loanDuration}
          onChange={(e) => setLoanDuration(e.target.value)}
        />
      </div>
      <button onClick={calculateLoan}>Calculate</button>
      {monthlyPayment !== null && (
        <h3>Estimated Monthly Payment: ${monthlyPayment}</h3>
      )}
    </div>
  );
};

export default LoanCalculator;
