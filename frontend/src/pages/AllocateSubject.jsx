import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const AllocateSubject = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    TeacherID: "default",
    SubjectID: "default",
  });

  const [arrTeachers, setTeachers] = useState([]);
  const [arrSubject, setSubject] = useState([]);

  useEffect(()=>{
    fnFetchTeachers();
    fnFetchSubject();
  }, []);

  const fnFetchTeachers = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/teachers', method: 'GET' });
    setLoad(false);
    if(status){
      setTeachers(data);
    } else{
      fnAlert(false, data);
    }
  }
  const fnFetchSubject = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/subjects', method: 'GET' });
    setLoad(false);
    if(status){
      setSubject(data);
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

  const fnOnChangeTeacher = (e) => {
    setDatasetGrid([]);
    setInput((objInput) => ({
      ...objInput,
      [e.target.name]: e.target.value,
    }));

    if(e.target.value !== "default") fnFetchAllocatedSubject(e.target.value);
  };
  const fnFetchAllocatedSubject = async (TeacherID) => {
    setLoad(true);
    const { data, status } = await callApi({ url: `/api/teachers/${TeacherID}/subjects`, method: 'GET' });
    setLoad(false);
    if(status){
      setDatasetGrid(data);
    } else{
      fnAlert(false, data);
    }
  }

  const fnOnChangeSubject = (e) =>{
    setInput((objInput) => ({
      ...objInput,
      [e.target.name]: e.target.value,
    }));
  }

  const columns = [
    {
      name: "Action",
      grow: 0.5,
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-danger me-1 p-2"
            onClick={(e) => fnGridClick(e, row)}
          >
            <i className="fa fa-trash" />
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
    e.preventDefault();
    const filteredDatasetGrid = datasetGrid.filter((subject) => subject.subjectID !== row.subjectID);
    setDatasetGrid(filteredDatasetGrid);
  }

  const fnValidateData = () => {
    if(objInput.TeacherID === "default") return { isValid: false, err: "Please select teachers." }
    else if(datasetGrid.length === 0) return { isValid: false, err: "Please add subjects." }
    else return { isValid: true, err: "" }
  }
  const fnSave = async () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);
    setLoad(true);
    const arrSubjects = datasetGrid.map(val => val.subjectID);
    const { data, status } = await callApi({
      url: `/api/teachers/${objInput.TeacherID}/subjects`,
      method: "POST",
      data: arrSubjects,
    });
    setLoad(false);
    if(status){
      fnAlert(true, "Successfully saved.");
      fnReset();
    } else{
      fnAlert(false, data);
    }
  }

  const fnAllocate = () => {
    if(objInput.SubjectID === "default") 
      return fnAlert(false, "Please select subject.");

    if(datasetGrid.filter((subject) => subject.subjectID === parseInt(objInput.SubjectID)).length > 0)
      return fnAlert(false, "This subject already inserted.");

    const objData = {
      subjectID: parseInt(objInput.SubjectID),
      subjectName: arrSubject.filter(subject => subject.subjectID === parseInt(objInput.SubjectID))[0].subjectName
    };

    const newDataset = [...datasetGrid, objData];
    setDatasetGrid(newDataset);
  }

  const fnReset = () => {
    setDatasetGrid([]);
    setInput({
      TeacherID: "default",
      SubjectID: "default",
    });
    document.getElementById("TeacherID").selectedIndex  = 0;
    document.getElementById("SubjectID").selectedIndex  = 0;
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Allocate Subject</h4>

        <div className="row mt-3">
          <div className="col-12">
            <Form>
              <div className="row">
                <div className="col-6">
                  <FormGroup>
                    <Label for="TeacherID">Teachers</Label>
                    <Input id="TeacherID" name="TeacherID" type="select" onChange={fnOnChangeTeacher}>
                      <option selected value="default">
                        Select a teacher
                      </option>
                      {arrTeachers.map((val) => {
                        return (
                          <>
                            <option value={val.teacherID}>{val.firstName}{" "}{val.lastName}</option>
                          </>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <Button color="success" className="w-100" onClick={fnSave}>
                    Save
                  </Button>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-6">
                  <FormGroup>
                    <Label for="SubjectID">Subject</Label>
                    <Input id="SubjectID" name="SubjectID" type="select" onChange={fnOnChangeSubject}>
                      <option selected value="default">
                        Select a subject
                      </option>
                      {arrSubject.map((val) => {
                        return (
                          <>
                            <option value={val.subjectID}>{val.subjectName}</option>
                          </>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <Button color="warning" className="w-100" onClick={fnAllocate}>
                    Allocate
                  </Button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mt-3">
                  <Table
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

export default AllocateSubject;