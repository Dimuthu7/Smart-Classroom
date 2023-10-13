import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Table from '../components/Table';
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const AllocateClassroom = () => {
  const [datasetGrid, setDatasetGrid] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    TeacherID: "default",
    ClassroomID: "default",
  });

  const [arrTeachers, setTeachers] = useState([]);
  const [arrClassroom, setClassroom] = useState([]);

  useEffect(()=>{
    fnFetchTeachers();
    fnFetchClassroom();
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
  const fnFetchClassroom = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/classrooms', method: 'GET' });
    setLoad(false);
    if(status){
      setClassroom(data);
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

    if(e.target.value !== "default") fnFetchAllocatedClassroom(e.target.value);
  };
  const fnFetchAllocatedClassroom = async (TeacherID) => {
    setLoad(true);
    const { data, status } = await callApi({ url: `/api/teachers/${TeacherID}/classrooms`, method: 'GET' });
    setLoad(false);
    if(status){
      setDatasetGrid(data);
    } else{
      fnAlert(false, data);
    }
  }

  const fnOnChangeClassroom = (e) =>{
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
    e.preventDefault();
    const filteredDatasetGrid = datasetGrid.filter((classroom) => classroom.classroomID !== row.classroomID);
    setDatasetGrid(filteredDatasetGrid);
  }

  const fnValidateData = () => {
    if(objInput.TeacherID === "default") return { isValid: false, err: "Please select teachers." }
    else if(datasetGrid.length === 0) return { isValid: false, err: "Please add classrooms." }
    else return { isValid: true, err: "" }
  }
  const fnSave = async () => {
    const {isValid, err} = fnValidateData();
    if(!isValid) return fnAlert(false, err);
    setLoad(true);
    const arrClassrooms = datasetGrid.map(val => val.classroomID);
    const { data, status } = await callApi({
      url: `/api/teachers/${objInput.TeacherID}/classrooms`,
      method: "POST",
      data: arrClassrooms,
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
    if(objInput.ClassroomID === "default") 
      return fnAlert(false, "Please select classroom.");

    if(datasetGrid.filter((classroom) => classroom.classroomID === parseInt(objInput.ClassroomID)).length > 0)
      return fnAlert(false, "This classroom already inserted.");

    const objData = {
      classroomID: parseInt(objInput.ClassroomID),
      classroomName: arrClassroom.filter(classroom => classroom.classroomID === parseInt(objInput.ClassroomID))[0].classroomName
    };

    const newDataset = [...datasetGrid, objData];
    setDatasetGrid(newDataset);
  }

  const fnReset = () => {
    setDatasetGrid([]);
    setInput({
      TeacherID: "default",
      ClassroomID: "default",
    });
    document.getElementById("TeacherID").selectedIndex  = 0;
    document.getElementById("ClassroomID").selectedIndex  = 0;
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Allocate Classroom</h4>

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
                    <Label for="ClassroomID">Classroom</Label>
                    <Input id="ClassroomID" name="ClassroomID" type="select" onChange={fnOnChangeClassroom}>
                      <option selected value="default">
                        Select a classroom
                      </option>
                      {arrClassroom.map((val) => {
                        return (
                          <>
                            <option value={val.classroomID}>{val.classroomName}</option>
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

export default AllocateClassroom;