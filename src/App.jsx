/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const TipCalculatorContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
`;

const OutputContainer = styled.div`
  margin-top: 20px;
`;

const OutputText = styled.h3`
  font-weight: bold;
`;

function App() {
  return (
    <AppContainer>
      <TipCalculator />
    </AppContainer>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage, setPercentage] = useState(20);

  const tip = (bill * percentage) / 100;
  const total = bill + tip;

  const handleBillChange = (e) => {
    setBill(Number(e.target.value));
  };

  const handlePercentageChange = (e) => {
    setPercentage(Number(e.target.value));
  };

  const handleReset = () => {
    setBill(0);
    setPercentage(20);
  };

  return (
    <TipCalculatorContainer>
      <BillTotal bill={bill} handleBillChange={handleBillChange} />
      <Percentage
        percentage={percentage}
        handlePercentageChange={handlePercentageChange}
      >
        How much do you want to tip?
      </Percentage>

      {bill > 0 && (
        <OutputContainer>
          <Output bill={bill} tip={tip} total={total} />
          <Reset handleReset={handleReset} />
        </OutputContainer>
      )}
    </TipCalculatorContainer>
  );
}

function BillTotal({ bill, handleBillChange }) {
  return (
    <div>
      <Label htmlFor="totalBill">How much is the bill?</Label>
      <Input type="text" onChange={handleBillChange} value={bill} min="0" />
    </div>
  );
}

function Percentage({ percentage, handlePercentageChange, children }) {
  return (
    <div>
      <Label htmlFor="percentage">{children}</Label>
      <Select value={percentage} onChange={handlePercentageChange}>
        <option value="20">Awesome (20%)</option>
        <option value="15">Great (15%)</option>
        <option value="10">Good (10%)</option>
        <option value="5">Fair (5%)</option>
        <option value="0">No Tip (0%)</option>
      </Select>
    </div>
  );
}

function Output({ bill, tip, total }) {
  return (
    <OutputText>
      You pay ${total} (${bill} + ${tip} tip)
    </OutputText>
  );
}

function Reset({ handleReset }) {
  return <Button onClick={handleReset}>Reset</Button>;
}

export default App;
