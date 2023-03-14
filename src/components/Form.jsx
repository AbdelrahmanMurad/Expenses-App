import { useContext, useRef } from "react";
import { AppContext } from "../context/app-context";

export let Form = () => {
    //1
    let nameRef = useRef();
    let dateRef = useRef();
    let valueRef = useRef();
    let descriptionRef = useRef();

    //2
    let onSubmitHandler = (event) => {
        event.preventDefault();
        if (checkData()) {
            save();
        }
    }

    //3
    let checkData = () => {
        if (nameRef.current.value !== "" &&
            dateRef.current.value !== "" &&
            valueRef.current.value !== "" &&
            descriptionRef.current.value !== ""
        )
            return true;
        else {
            alert("Please, Enter Requierd Data !!!");
            return false;
        }
    }

    //4
    let getData = () => {
        return {
            // id: Date.now(),
            // with firebase, we will make the name of expense in firebase as a key. 
            name: nameRef.current.value,
            date: dateRef.current.value,
            value: valueRef.current.value,
            description: descriptionRef.current.value
        }
    }

    //5
    let clear = () => {
        nameRef.current.value = "";
        dateRef.current.value = "";
        valueRef.current.value = "";
        descriptionRef.current.value = "";
    }
    //6
    let appContext = useContext(AppContext);
    let save = () => {
        let gettingData = getData();
        /*fetch(
            1.link
            2.method
            3.head{1.content-type 2.accept}
            4.body  
          )
        */
        //*http request
        fetch(`https://expenses-c32cb-default-rtdb.firebaseio.com/expenses.json`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify(gettingData)//encode
            }
            //*http response
        ).then((response) => { return response.json(); })//decode
            //response.json(); هيك غلط => without return
            .then((data) => {
                //*After api successful
                // console.log(data);
                // console.log(data.name);
                gettingData.id = data.name;
                appContext.addNewExpenseHandler(gettingData);
                clear();
            })
            .catch((error) => { console.log(error); })

    }


    return (
        <form className="row" onSubmit={onSubmitHandler}>
            <div className="mb-3 col-md-6">
                <label className="form-label">Title</label>
                <input type="text" className="form-control addTitle" aria-describedby="" ref={nameRef} />
            </div>

            <div className="mb-3 col-md-6">
                <label className="form-label">Date</label>
                <input type="date" className="form-control addDate" aria-describedby="" ref={dateRef} />
            </div>
            <div className="mb-3 col-md-6">
                <label className="form-label">Value</label>
                <input type="number" className="form-control addValue" aria-describedby="" ref={valueRef} />
            </div>
            <div className="mb-3 col-md-6">
                <label htmlFor="title" className="form-label">Description</label>
                <input type="text" className="form-control addDescrption" aria-describedby="" ref={descriptionRef} />
            </div>
            <div className="mb-3 col-md-12 text-right">
                <button type="submit" className="btn btn-primary addBtn">Add</button>
            </div>
        </form>
    );
}