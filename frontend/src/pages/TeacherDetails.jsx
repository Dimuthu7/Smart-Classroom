import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const TeacherDetails = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    TeacherID: 0,
    FirstName: "",
    LastName: "",
    ContactNo: "",
    Email: "",
  });

  useEffect(()=>{
    fnFetchData();
  }, []);

  const fnFetchData = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/teachers', method: 'GET' });
    setLoad(false);
    if(status){
      setDatasetGrid(data);
    } else{
      fnAlert(false, data);
    }
  }

  const fnAlert = (booSucess, msg) => {
    return Swal.fire({
      icon: booSucess ? "success" : "error",
      title: booSucess ? msg : "Something wrong!",
      text: !booSucess ? msg : "",
    });
  };

  const fnOnChange = (e) => {
    setInput((objInput) => ({
      ...objInput,
      [e.target.name]: e.target.value,
    }));
  };

  const fnInputs = (type, id, label, value, isRequired = true, isDisable = false) =>{
    return (
      <>
        <FormGroup>
          <Label for={id}>{label} {isRequired ? <span style={{color: "red"}}>*</span> : null}</Label>
          <Input
            id={id}
            name={id}
            placeholder={label}
            type={type}
            onChange={(e) => fnOnChange(e)}
            value={value}
            disabled={isDisable}
          />
        </FormGroup>
      </>
    );
  }

  const columns = [
    {
      name: "Action",
      grow: 0.5,
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-secondary me-1 p-2"
            onClick={(e) => fnGridClick(e, row)}
          >
            <i className="fa fa-pencil-square-o" />
          </button>
        </>
      ),
    },
    {
      name: "Teacher ID",
      selector: row => row.teacherID,
      omit: true,
    },
    {
      name: "First Name",
      selector: row => row.firstName,
    },
    {
      name: "Last Name",
      selector: row => row.lastName,
    },
    {
      name: "Contact No.",
      selector: row => row.contactNo,
    },
    {
      name: "Email",
      selector: row => row.email,
      omit: true,
    },
  ];
  const fnGridClick = (e, row) => {
    fnReset();
    e.preventDefault()
    setInput({
      TeacherID: row.teacherID,
      FirstName: row.firstName,
      LastName: row.lastName,
      ContactNo: row.contactNo,
      Email: row.email,
    });
  }

  const fnValidateData = () => {
    if(objInput.FirstName === "") return { isValid: false, err: "Please enter first name." }
    else if(objInput.LastName === "") return { isValid: false, err: "Please enter last name." }
    else if(objInput.ContactNo === "") return { isValid: false, err: "Please enter contact no." }
    else if(objInput.Email === "") return { isValid: false, err: "Please enter email." }
    else return { isValid: true, err: "" }
  }
  const fnSave = () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);

    if(objInput.TeacherID === 0){
      fnAdd();
    } else {
      fnUpdate();
    }
  }

  const fnAdd = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/teachers', method: 'POST', data: objInput });
    setLoad(false);
    if(status){
      fnAlert(true, "Successfully saved.");
      fnFetchData();
      fnReset();
    } else{
      fnAlert(false, data);
    }
  }

  const fnUpdate = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: `/api/teachers/${objInput.TeacherID}`, method: 'PUT', data: objInput });
    setLoad(false);
    if(status){
      fnAlert(true, "Successfully updated.");
      fnFetchData();
      fnReset();
    } else{
      fnAlert(false, data);
    }
  }

  const fnDelete = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: `/api/teachers/${objInput.TeacherID}`, method: 'DELETE' });
    setLoad(false);
    if(status){
      fnAlert(true, "Successfully deleted.");
      fnFetchData();
      fnReset();
    } else{
      fnAlert(false, data);
    }
  }

  const fnReset = () => {
    setInput({
      TeacherID: 0,
      FirstName: "",
      LastName: "",
      ContactNo: "",
      Email: "",
    });
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Teacher Details</h4>

        <div className="row mt-3">
          <div className="col-12">
            <Form>
              <div className="row">
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "FirstName",
                    "First Name",
                    objInput.FirstName
                  )}
                </div>
                <div className="col-6">
                  {fnInputs("text", "LastName", "Last Name", objInput.LastName)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "ContactNo",
                    "Contact No",
                    objInput.ContactNo
                  )}
                </div>
                <div className="col-6">
                  {fnInputs("email", "Email", "Email Address", objInput.Email)}
                </div>
              </div>
              <div className="row mt-2 d-flex justify-content-end">
                <div className="col-2">
                  <Button color="success" className="w-100" onClick={fnSave}>
                    Save
                  </Button>
                </div>
                <div className="col-2">
                  <Button color="danger" className="w-100" onClick={fnDelete}>
                    Delete
                  </Button>
                </div>
                <div className="col-2">
                  <Button color="warning" className="w-100" onClick={fnReset}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mt-3">
                  <Table
                    title="Existing Teachers"
                    columns={columns}
                    dataSet={datasetGrid}
                    strHeight={"40vh"}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDetails;