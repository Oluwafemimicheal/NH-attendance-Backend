import express from "express";
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/student.js";


const studentRouter = express.Router();

studentRouter.route("/")
  .post(createStudent)   
  .get(getAllStudents);   

studentRouter.route("/:id")
  .get(getStudentById)    
  .put(updateStudent)    
  .delete(deleteStudent);

export default studentRouter;
