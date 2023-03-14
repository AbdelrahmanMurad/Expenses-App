import { useContext, useEffect } from "react";
import { AppContext } from "../context/app-context";
import { Row } from "./Row";

export let Table = () => {
    let appContext = useContext(AppContext);

    let fetchData = () => {
        fetch(`https://expenses-c32cb-default-rtdb.firebaseio.com/expenses.json`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                },
                // TODO| Here, we cant use body. why ?? 
                // TODO| Because here we are fetching data (fetching==GET) not storing=POST.
            }

        ).then((response) => { return response.json() })
            .then((objects) => {
                //*After api successful
                let fetchedExpenses = [];
                // console.log(objects);
                for (let objectAsKey in objects) {
                    // console.log("---");
                    // console.log(objectAsKey);
                    // console.log(objects[objectAsKey]);
                    let expenses = objects[objectAsKey];
                    expenses.id = objectAsKey;
                    fetchedExpenses.push(expenses);
                }
                appContext.addExpensesHandler(fetchedExpenses);
                // console.log("--------------");
                // console.log(objects);
            })
    }

    useEffect(fetchData, []);

    return (
        <div className="row mt-5 mb-5">
            <div className="custom-card ">
                <table className="table ">
                    <thead>
                        <tr>
                            <th> Title</th>
                            <th> Date</th>
                            <th> value</th>
                            <th> Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appContext.expensesHandler.map((element) => <Row row={element} key={element.id} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}