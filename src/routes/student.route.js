import express from "express";
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/student.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const studentRouter = express.Router();

studentRouter.route("/")
  .all(authMiddleware)
  .post(createStudent)
  .get(getAllStudents);

studentRouter.route("/:id")
  .all(authMiddleware)
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default studentRouter;
