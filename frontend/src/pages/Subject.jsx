import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const Subject = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    SubjectID: 0,
    SubjectName: "",
  });

  useEffect(()=>{
    fnFetchData();
  }, []);

  const fnFetchData = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/subjects', method: 'GET' });
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
      name: "Subject ID",
      selector: row => row.subjectID,
      omit: true,
    },
    {
      name: "Subject Name",
      selector: row => row.subjectName,
    },
  ];
  const fnGridClick = (e, row) => {
    fnReset();
    e.preventDefault()
    setInput({
      SubjectID: row.subjectID,
      SubjectName: row.subjectName,
    });
  }

  const fnValidateData = () => {
    if(objInput.SubjectName === "") return { isValid: false, err: "Please enter subject name." }
    else return { isValid: true, err: "" }
  }
  const fnSave = () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);

    if(objInput.SubjectID === 0){
      fnAdd();
    } else {
      fnUpdate();
    }
  }

  const fnAdd = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/subjects', method: 'POST', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/subjects/${objInput.SubjectID}`, method: 'PUT', data: objInput });
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
    const { data, status } = await callApi({ url: `/api/subjects/${objInput.SubjectID}`, method: 'DELETE' });
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
      SubjectID: 0,
      SubjectName: "",
    });
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Subject</h4>

        <div className="row mt-3">
          <div className="col-12">
            <Form>
              <div className="row">
                <div className="col-12">
                  <FormGroup>
                    <Label for="SubjectName">
                    Subject Name{" "}<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      id="SubjectName"
                      name="SubjectName"
                      placeholder="Subject Name"
                      type="text"
                      onChange={(e) => fnOnChange(e)}
                      value={objInput.SubjectName}
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
                    title="Existing Subjects"
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

export default Subject;