import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../context/app-context";
import { useContext } from "react";

export let Row = (props) => {

    let appContext = useContext(AppContext);

    let onDeleteHnadler = () => {
        onDelete();
    }

    let onDelete = () => {
        fetch(`https://expenses-c32cb-default-rtdb.firebaseio.com/expenses/${props.row.id}.json`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            }
        ).then((response) => { return response.json() })
            .then(() => {
                appContext.removeExpneseHandler(props.row.id);
                console.log(props.row.id);
            })
    }

    return (
        <tr>
            <td> {props.row.name} </td>
            <td> {props.row.date}</td>
            <td>{props.row.value} </td>
            <td colSpan="2">{props.row.description} </td>
            <td className="text-right"><a href="/" className="delete" onClick={onDeleteHnadler}>
                <FontAwesomeIcon icon={faTrashCan} /></a></td>
        </tr>
    );
}