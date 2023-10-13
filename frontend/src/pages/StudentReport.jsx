import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Table } from "reactstrap";
import { callApi } from '../services/ApiCaller';
import SiteLoading from '../components/SiteLoading/SiteLoading';
import Swal from "sweetalert2";

const StudentReport = () => {
  const [isLoad, setLoad] = useState(false);
  const [objInput, setInput] = useState({
    StudentID: 0,
    StudentName: "",
    Classroom: "",
    ContactPerson: "",
    Email: "",
    ContactNo: "",
    DateOfBirth: "",
  });
  const [arrTableData, setTableData] = useState([]);
  const [arrStudents, setStudents] = useState([]);

  useEffect(()=>{
    fnFetchStudents();
  }, []);

  const fnFetchStudents = async () => {
    setLoad(true);
    const { data, status } = await callApi({ url: '/api/students', method: 'GET' });
    setLoad(false);
    if(status){
      setStudents(data);
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

  const fnInputs = (type, id, label, value) =>{
    return (
      <>
        <FormGroup>
          <Label for={id}>{label}</Label>
          <Input
            id={id}
            name={id}
            type={type}
            value={value}
            disabled={true}
          />
        </FormGroup>
      </>
    );
  }

  const fnOnChangeStudent = (e) => {
    setTableData([]);
    setInput({
      StudentID: e.target.value,
      StudentName: "",
      Classroom: "",
      ContactPerson: "",
      Email: "",
      ContactNo: "",
      DateOfBirth: "",
    });

    if(e.target.value !== "default") fnFetchReportData(e.target.value);
  };
  const fnFetchReportData = async (StudentID) => {
    setLoad(true);
    const { data, status } = await callApi({ url: `/api/students/${StudentID}/report`, method: 'GET' });
    setLoad(false);
    if(status){
      setInput({
        StudentID: data.studentID,
        StudentName: data.studentName,
        Classroom: data.classroom,
        ContactPerson: data.contactPerson,
        Email: data.email,
        ContactNo: data.contactNo,
        DateOfBirth: new Date(data.dateOfBirth).toDateString(),
      });
      setTableData(data.teacherSubject);
    } else{
      fnAlert(false, data);
    }
  }

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container">
        <h4 className="">Student Detail</h4>
        <div className="row mt-2">
          <div className="col-12">
            <Form>
              <div className="row">
                <div className="col-6">
                  <FormGroup>
                    <Label for="StudentID">Student</Label>
                    <Input
                      id="StudentID"
                      name="StudentID"
                      type="select"
                      onChange={fnOnChangeStudent}
                    >
                      <option selected value="default">
                        Select a student
                      </option>
                      {arrStudents.map((val) => {
                        return (
                          <>
                            <option value={val.studentID}>
                              {val.firstName} {val.lastName}
                            </option>
                          </>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </div>
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "Classroom",
                    "Classroom",
                    objInput.Classroom
                  )}
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
                  {fnInputs("text", "Email", "Email", objInput.Email)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "ContactNo",
                    "Contact No.",
                    objInput.ContactNo
                  )}
                </div>
                <div className="col-6">
                  {fnInputs(
                    "text",
                    "DateOfBirth",
                    "Date Of Birth",
                    objInput.DateOfBirth
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>

        <h4 className="mt-4">Teacher & Subject Details</h4>
        <div className="row">
          <div className="col-12">
            <Table hover>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {arrTableData.map((val) => {
                  return (
                    <>
                      <tr>
                        <td>{val.teacherName}</td>
                        <td>{val.subjectName}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentReport;