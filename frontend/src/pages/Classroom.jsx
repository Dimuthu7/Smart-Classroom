import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const Classroom = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    ClassroomID: 0,
    ClassroomName: "",
  });

  useEffect(()=>{
    fnFetchData();
  }, []);

  const fnFetchData = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/classrooms', method: 'GET' });
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
      name: "Classroom ID",
      selector: row => row.classroomID,
      omit: true,
    },
    {
      name: "Classroom Name",
      selector: row => row.classroomName,
    },
  ];
  const fnGridClick = (e, row) => {
    fnReset();
    e.preventDefault()
    setInput({
      ClassroomID: row.classroomID,
      ClassroomName: row.classroomName,
    });
  }

  const fnValidateData = () => {
    if(objInput.ClassroomName === "") return { isValid: false, err: "Please enter classroom name." }
    else return { isValid: true, err: "" }
  }
  const fnSave = () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);

    if(objInput.ClassroomID === 0){
      fnAdd();
    } else {
      fnUpdate();
    }
  }

  const fnAdd = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/classrooms', method: 'POST', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/classrooms/${objInput.ClassroomID}`, method: 'PUT', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/classrooms/${objInput.ClassroomID}`, method: 'DELETE' });
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
      ClassroomID: 0,
      ClassroomName: "",
    });
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Classroom</h4>

        <div className="row mt-3">
          <div className="col-12">
            <Form>
              <div className="row">
                <div className="col-12">
                  <FormGroup>
                    <Label for="ClassroomName">
                    Classroom Name{" "}<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      id="ClassroomName"
                      name="ClassroomName"
                      placeholder="Classroom Name"
                      type="text"
                      onChange={(e) => fnOnChange(e)}
                      value={objInput.ClassroomName}
                    />
                  </FormGroup>
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
                    title="Existing Classrooms"
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

export default Classroom;