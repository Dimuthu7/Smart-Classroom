import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const StudentDetails = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    StudentID: 0,
    FirstName: "",
    LastName: "",
    ContactPerson: "",
    ContactNo: "",
    Email: "",
    DateOfBirth: "",
    Age: 0,
  });

  useEffect(()=>{
    fnFetchData();
  }, []);

  const fnFetchData = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/students', method: 'GET' });
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
      name: "Student ID",
      selector: row => row.studentID,
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
      name: "Contact Person",
      selector: row => row.contactPerson,
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
    {
      name: "DateOfBirth",
      selector: row => row.dateOfBirth,
      omit: true,
    },
    {
      name: "Age",
      selector: row => row.age,
      omit: true,
    },
  ];
  const fnGridClick = (e, row) => {
    fnReset();
    e.preventDefault()
    setInput({
      StudentID: row.studentID,
      FirstName: row.firstName,
      LastName: row.lastName,
      ContactPerson: row.contactPerson,
      ContactNo: row.contactNo,
      Email: row.email,
      DateOfBirth: convertDateFormat(row.dateOfBirth),
      Age: row.age,
    });
  }
  const convertDateFormat = (date) => {
    let today = new Date(date);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  const fnChangeDoB = (e) => {
    const age = calculateAge(e.target.value);
    setInput((objInput) => ({
      ...objInput,
      DateOfBirth: e.target.value,
      Age: age
    }));
  }
  const calculateAge = (selectedDate) => {
    const today = new Date();
    const age = today.getFullYear() - new Date(selectedDate).getFullYear();
    return age;
  };

  const fnValidateData = () => {
    if(objInput.FirstName === "") return { isValid: false, err: "Please enter first name." }
    else if(objInput.LastName === "") return { isValid: false, err: "Please enter last name." }
    else if(objInput.ContactPerson === "") return { isValid: false, err: "Please enter contact person." }
    else if(objInput.ContactNo === "") return { isValid: false, err: "Please enter contact no." }
    else if(objInput.Email === "") return { isValid: false, err: "Please enter email." }
    else if(objInput.DateOfBirth === "") return { isValid: false, err: "Please enter date of birth." }
    else if(new Date(objInput.DateOfBirth) > new Date()) return { isValid: false, err: "Please enter valid date of birth." }
    else return { isValid: true, err: "" }
  }
  const fnSave = () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);

    if(objInput.StudentID === 0){
      fnAdd();
    } else {
      fnUpdate();
    }
  }

  const fnAdd = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/students', method: 'POST', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/students/${objInput.StudentID}`, method: 'PUT', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/students/${objInput.StudentID}`, method: 'DELETE' });
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
      StudentID: 0,
      FirstName: "",
      LastName: "",
      ContactPerson: "",
      ContactNo: "",
      Email: "",
      DateOfBirth: "",
      Age: 0,
    });
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Student Details</h4>

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
                    "ContactPerson",
                    "Contact Person",
                    objInput.ContactPerson
                  )}
                </div>
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "ContactNo",
                    "Contact No",
                    objInput.ContactNo
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  {fnInputs("email", "Email", "Email Address", objInput.Email)}
                </div>
                <div className="col-4">
                  <FormGroup>
                    <Label for="DateOfBirth">
                    Date of birth {" "} <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      id="DateOfBirth"
                      name="DateOfBirth"
                      placeholder="Date of birth"
                      type="date"
                      onChange={(e) => fnChangeDoB(e)}
                      value={objInput.DateOfBirth}
                    />
                  </FormGroup>
                </div>
                <div className="col-2">
                  {fnInputs("text", "Age", "Age", objInput.Age, false, true)}
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
                    title="Existing Students"
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

export default StudentDetails;