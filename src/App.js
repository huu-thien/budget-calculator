import { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

// const initialExpenses = [
//   { id: uuidv4(), charge: 'rent', amount: 1600 },
//   { id: uuidv4(), charge: 'car payment', amount: 400 },
//   { id: uuidv4(), charge: 'credit card bill', amount: 1200 },
// ];
const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  // *********** state values ************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense, amount
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [isEdit, setIsEdit] = useState(false);
  // edit item
  const [idEdit, setIdEdit] = useState(0);
  // *********** useEffect ************

  useEffect(() => {
    console.log('we call useEffect');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, []);

  // *********** Functionaly ************

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (isEdit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === idEdit ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setIsEdit(false);
        handleAlert({ type: 'success', text: 'Item edited successfully' });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'Item added successfully' });
      }
      setCharge('');
      setAmount('');
    } else {
      // handle alert called
      handleAlert({
        type: 'danger',
        text: `Charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };
  // handle clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'Delete all items successfully' });
  };
  // handle delete item
  const handleDeleteItem = (id) => {
    let tempExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'Delete item successfully' });
  };
  // handle edit item
  const handleEditItem = (id) => {
    let expense = expenses.find((expense) => expense.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setIsEdit(true);
    setIdEdit(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
        <ExpenseList
          expenses={expenses}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total spending:{' '}
        <span className="total">
          $ {expenses.reduce((acc, curr) => (acc += parseInt(curr.amount)), 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
