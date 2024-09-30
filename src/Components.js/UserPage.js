import React, { useState } from 'react';  

const UserPage = () => {  
  const [balanceHistory, setBalanceHistory] = useState([]);  
  const [income, setIncome] = useState(0);  
  const [expenditure, setExpenditure] = useState("");  
  const [category, setCategory] = useState("");  
  const [counter, setCounter] = useState(0);  
  const [editingIndex, setEditingIndex] = useState(null);  
  const [sum, setSum] = useState(0);  

  const handleIncomeChange = (e) => {  
    setIncome(parseFloat(e.target.value));  
  };  

  const handleClick1 = () => {  
    if (income > 0) {  
      setCounter(prevCounter => prevCounter + income);  
    } else {  
      alert("Income Invalid");  
    }  
    setIncome(0);  
    document.getElementById("inc").value = "";  
  };  

  const handleExpenditureChange = (e) => {  
    setExpenditure(parseFloat(e.target.value));  
  };  
 

  const handleClick2 = () => {  
    if (!expenditure || isNaN(expenditure)) {  
      alert('Enter the expenditure');  
      return;  
    }  
    
    if (expenditure <= 0) {  
      alert('Enter a valid expenditure');  
      return;  
    }  
    if (expenditure > counter) {  
      alert("Insufficient balance");  
      return;  
    }  
    if (category === "") {  
      alert("Select a category");  
      return;  
    }  
  
    if (editingIndex !== null) {  
      const updatedEntry = { ...balanceHistory[editingIndex], expenditure, category, date: new Date().toLocaleString() };  
      const newHistory = [...balanceHistory];  
      newHistory[editingIndex] = updatedEntry;  //over-ride
  
      setSum(prevSum => prevSum - balanceHistory[editingIndex].expenditure + expenditure);  
      setCounter(prevCounter => prevCounter + balanceHistory[editingIndex].expenditure - expenditure);  
      setBalanceHistory(newHistory);  
      setEditingIndex(null);  
    } else {  
      if (counter <= 0) {  
        alert('Balance is already 0');  
        return;  
      }  
  
      const date = new Date().toLocaleString();  
      setSum(sum + parseFloat(expenditure));  
      setBalanceHistory(prevHistory => [...prevHistory, { expenditure, category, date }]);  
      setCounter(prevCounter => prevCounter - expenditure);  
    }  
  
    document.getElementById("exp").value = "";  
  };

  const handleCategoryChange = (e) => {  
    setCategory(e.target.value);  
  };  

  const sortDate = () => {  
    const sortedHistory = [...balanceHistory].sort((a, b) => new Date(b.date) - new Date(a.date));  
    setBalanceHistory(sortedHistory);  
  };  

  const sortCategory = () => {  
    const sortedHistory = [...balanceHistory].sort((a, b) => a.category.localeCompare(b.category));  
    setBalanceHistory(sortedHistory);  
  };  

  const deleteEntry = (index) => {  
    const toDelete = balanceHistory[index];  
    const newArray = [...balanceHistory.slice(0, index), ...balanceHistory.slice(index + 1)];  
    setBalanceHistory(newArray);  

    setCounter(prevCounter => prevCounter + toDelete.expenditure);  
    setSum(prevSum => prevSum - toDelete.expenditure);  
  };  

  const handleEditEntry = (index) => {  
    setEditingIndex(index);  
    const entry = balanceHistory[index];  
    setExpenditure(entry.expenditure); 
    setCategory(entry.category); 
  };  

  return (  
    <div className="divStyle">  
      <h1>START TRACKING</h1>  
      <label>Income</label>  
      <input  
        type="number"  
        id="inc"  
        placeholder="Enter Amount Earned"  
        onChange={handleIncomeChange}  
      />  
      <button onClick={handleClick1}>Earned</button>  
      <br /><br />  

      <label>Expenditure</label>  
      <input  
        type="number"  
        id="exp"  
        placeholder="Enter Amount Spent"  
        value={expenditure}  
        onChange={handleExpenditureChange}  
      />  
      <br />  
      <label>Category</label>  
      <select name="category" id="category" value={category} onChange={handleCategoryChange}>  
        <option value="">Select</option>  
        <option value="Food">Food</option>  
        <option value="Travel">Travel</option>  
        <option value="HouseRent">HouseRent</option>  
        <option value="Medical">Medical</option>  
      </select>  
      <br /><br />  
      <button onClick={handleClick2}>Add to List</button>  

      <div>  
        <h4>Balance History:</h4>  
        <div className='filter'>  
          <h4>Filter:  
            <button onClick={sortDate}>DATE</button>  
            <button onClick={sortCategory}>CATEGORY</button>  
          </h4>  
        </div>  

        <table className='tables'>  
          <tbody>  
            <tr>  
              <th>Index</th>  
              <th>Amount Spent</th>  
              <th>Category</th>  
              <th>Date</th>  
              <th>Delete</th>  
              <th>Edit</th>  
            </tr>  
            {balanceHistory.map((balance, index) => (  
              <tr key={index}>  
                <td>{index + 1}</td>  
                <td>{balance.expenditure}</td>  
                <td>{balance.category}</td>  
                <td>{balance.date}</td>  
                <td><button onClick={() => deleteEntry(index)}>DELETE</button></td>  
                <td><button onClick={() => handleEditEntry(index)}>EDIT</button></td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
      <h4>Expenditure = {sum}</h4>  
      <h2>Balance = {counter}</h2>  
    </div>  
  );  
};  

export default UserPage;