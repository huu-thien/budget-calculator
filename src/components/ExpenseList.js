import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

function ExpenseList({ expenses, handleDeleteItem, handleEditItem, clearItems }) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => (
          <Item
            key={expense.id}
            expense={expense}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn btn-clear" onClick={clearItems}>
          CLear Expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}

export default ExpenseList;
