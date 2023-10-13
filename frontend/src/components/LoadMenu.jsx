import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "../style/home.style.css";
import { useNavigate } from "react-router-dom";

const LoadMenu = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {props.arrMenuItems.map((val, index) => {
            return (
              <>
                <div
                  className="col-3 mt-5 menu-card-div"
                  id={index}
                  onClick={() => navigate(val.path)}
                >
                  <Card style={{ height: "35vh" }} className="menu-card">
                    <CardBody className="align-middle">
                      <CardTitle
                        tag="h5"
                        className="d-flex justify-content-center"
                      >
                        {val.title}
                      </CardTitle>
                      <img
                        src={val.image}
                        alt={val.title}
                        className="card-img-top rounded mx-auto d-block pt-3"
                        style={{ width: "10vw" }}
                      />
                    </CardBody>
                  </Card>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LoadMenu;
