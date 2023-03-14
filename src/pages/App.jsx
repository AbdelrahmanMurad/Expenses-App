import "bootstrap/dist/css/bootstrap.css";
import "../resources/css/custom.css";
import MainImage from "../resources/img/m1.png";
import { Form } from "../components/Form";
import { Table } from "../components/Table";

export let App = () => {

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-6">
                    <img src={MainImage} className="img-fluid" alt="" />
                </div>
                <div className="col-sm-6 mt-5">
                    <div className="row tit">
                        <h4 className="">wellcom to Murad Expense Manager </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                    </div>
                    <Form />
                </div>
            </div>
            <Table />
        </div>
    );
}