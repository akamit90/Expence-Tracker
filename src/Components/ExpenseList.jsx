import React, { useEffect, useState } from 'react';

const getLocalItems = () => {
  let list = localStorage.getItem('expenseList');
  if (list) {
    return JSON.parse(localStorage.getItem('expenseList'));
  } else {
    return [];
  }
};

function ExpenseList() {
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState(getLocalItems());
  const [total, setTotal] = useState(0);

  // Load items from local storage on component mount
  useEffect(() => {
    localStorage.setItem('expenseList', JSON.stringify(list));
  }, [list]);
  

  const handleSubmit = () => {
    if (items === '' || amount === '') {
      alert('Please enter an item name and an amount');
    } else {
      const newItem = { items, amount };
      const newList = [...list, newItem];
      setList(newList);
      setItems('');
      setAmount('');
      setTotal(total + parseFloat(amount));
    }
  };

  const handleClear = () => {
    localStorage.removeItem('expenseList');
    setList([]);
    setTotal(0);
  };

  
  // const handleDelete = (id, amount) => {
  //       const deleteTask = [...list];
  //       deleteTask.splice(id, 1);           
  //       setList(deleteTask);
  //   }

  // const handleDelete=(i)=>{
  //   const isConfirm = window.confirm("Are you sure?")
  //       if(isConfirm){
  //           const filterItem = list.filter((item)=>(
  //               id != item.id 
  //           ))
  //           setList(filterItem)
  //       }
  // }

  // Delete item from list
  const handleDelete = (index, amount) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
    setTotal(total - parseFloat(amount));
  };
  
  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">Expense Tracker</h1>
      <div className="flex flex-col items-start mt-8 mx-auto max-w-md">
        <p className="text-xl text-black font-bold mb-1">Item Name:</p>
        <input
          type="text"
          className="w-full text-xl border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Item Name"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <p className="text-xl text-black font-bold mt-4 mb-1">Item Amount:</p>
        <input
          type="number"
          className="w-full text-xl border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button 
          className="bg-black text-white px-6 py-2 font-bold rounded-lg mt-4 transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={handleSubmit}>
          Add 
        </button>
      </div>
      <hr className="my-8 border-gray-300 w-[90%] mx-auto" />
      <div className="p-8 bg-slate-200 rounded-lg shadow-md max-w-md mx-auto">
        <ul>
          {list.map((task, index) => (
            <li key={index} className="mb-4 flex justify-between items-center">
              <span className="text-xl font-semibold">{task.items}</span>
              <span className="text-xl font-semibold">{task.amount} ₹</span>
              <button 
                className="bg-red-500 text-white px-4 py-2 font-bold rounded-lg transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => handleDelete(index, task.amount)}>
                Delete 
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-8">
          <span className="text-2xl font-bold">Total:</span>
          <span className="text-2xl font-bold">{total} ₹</span>
          <button 
            className="bg-red-500 text-white px-6 py-2 font-bold rounded-lg transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleClear}>
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

export default ExpenseList;
