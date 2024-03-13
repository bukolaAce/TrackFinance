import { useState, useEffect } from "react";

const TrackFinance = () => {
  // TWO WAY BINDING
  const [InputValue, SetInputValue] = useState({
    Amount: "",
    Statement: "",
    Type: "Income",
  });

  const handleChange = (e) => {
    SetInputValue({
      ...InputValue,
      [e.target.name]: e.target.value,
    });
  };

  // INPUT VALIDATION
  const [showError, setShowError] = useState({
    Amount: false,
    Statement: false,
    // Confirm: false,
  });

  // STORING REPORT STATEMENT
  const [inventory, setInventory] = useState([]);

  // SUMMATION
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = inventory.reduce((sum, { Amount2, Type2 }) => {
      if (Type2 === "Expense") {
        return sum - parseFloat(Amount2);
      } else {
        return sum + parseFloat(Amount2);
      }
    }, 0);
    setTotal(newTotal);
  }, [inventory]);

  // RENDER SUM TOTAL
  const Render = () => {
    if (total > 0) {
      return (
        <div className="m-5 ">
          <h1 className="text-4xl font-bold text-green-600">
            +${Math.abs(total)}
          </h1>
        </div>
      );
    } else if (total < 0) {
      return (
        <div className="m-5 ">
          <h1 className="text-4xl font-bold text-red-600">
            -${Math.abs(total)}
          </h1>
        </div>
      );
    } else {
      return (
        <div className="m-5 ">
          <h1 className="text-4xl font-bold">0</h1>
        </div>
      );
    }
  };

  const handleError = () => {
    const { Amount, Statement, Type } = InputValue;

    if (!Amount) {
      return setShowError({
        Amount: true,
        Statement: false,
      });
    } else if (!Statement) {
      return setShowError({
        Amount: false,
        Statement: true,
      });
    } else {
      setShowError({
        // Confirm: true,
        Amount: false,
        Statement: false,
      });
      // STORING REPORT STATEMENT
      setInventory([
        ...inventory,
        {
          Amount2: parseFloat(Amount).toFixed(2),
          Statement2: Statement,
          Type2: Type,
          Date: new Date().toDateString(),
          Time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    SetInputValue({
      Amount: "",
      Statement: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#D2B48c] min-h-screen">
      {Render()}
      {/* {JSON.stringify(inventory)} */}
      <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]">
        <div className="flex flex-col items-center">
          {/* <label className="text-sm text-gray-400 w-36">Income/Expense</label> */}
          <input
            type="number"
            placeholder="Income or Expense"
            className={`px-2 py-2 w-full border-b-2 ${
              showError.Amount ? "border-b-red-600" : "border-b-gray-500"
            } focus:border-[#333] outline-none text-sm bg-white`}
            name="Amount"
            value={InputValue.Amount}
            onChange={handleChange}
          />
          {showError.Amount ? <h1 className="text-red-600">Required</h1> : ""}
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Statement"
            className={`px-2 py-2 w-full border-b-2 ${
              showError.Statement ? "border-b-red-600" : "border-b-gray-500"
            }  focus:border-[#333] outline-none text-sm bg-white`}
            name="Statement"
            value={InputValue.Statement}
            onChange={handleChange}
          />
          {showError.Statement ? (
            <h1 className="text-red-600">Required</h1>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-center">
          <select value={InputValue.Type} onChange={handleChange} name="Type">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <button
          type="button"
          className={`px-6 py-2 w-full  ${
            showError.Confirm ? "bg-green-500" : "bg-blue-400"
          } rounded-lg text-sm text-white mx-auto block`}
          onClick={handleError}
        >
          Submit
        </button>
      </form>
      {inventory.map((items) => {
        return (
          <>
            <div
              key={items.Time}
              className="flex gap-4 p-4 mt-5 font-bold border-2 border-blue-400 rounded-lg"
            >
              <div>
                <h1>{items.Statement2}</h1>
              </div>
              <div className="flex gap-4">
                <h1>{items.Date}</h1>
                <h1>{items.Time}</h1>
              </div>
              <div>
                {items.Type2 === "Expense" ? (
                  <h1 className="text-red-500">-${items.Amount2}</h1>
                ) : (
                  <h1 className="text-green-500">+${items.Amount2}</h1>
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default TrackFinance;
