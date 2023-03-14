import { createContext, useState } from "react";

//creating process
export let AppContext = createContext(
    {//initialize
        expensesHandler: [],
        addNewExpenseHandler: (data) => { }, //void
        removeExpneseHandler: (id) => { },//void
        addExpensesHandler: (data) => { },
        //all expenses
    }
);

//make context the father of project.
export let AppContextProvider = (props) => {
    //structure
    let [expenses, setExpenses] = useState([]);

    //method1
    let addNewExpense = (newState) => {
        setExpenses((prevState) => {
            return [newState, ...prevState];
        })
    }

    //method2
    let removeExpense = (id) => {
        let data = expenses.filter((element) => element.id !== id)
        setExpenses(data);
    }

    //method3
    let addExpenses = (array) => {
        setExpenses(array);
    }

    return (
        <AppContext.Provider value={{
            //Generalization, store
            expensesHandler: expenses,
            addNewExpenseHandler: addNewExpense,
            removeExpneseHandler: removeExpense,
            addExpensesHandler: addExpenses,
        }}>
            {/* The father */}
            {props.children}
        </AppContext.Provider>
    )
}
