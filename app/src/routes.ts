import { Router } from "express";

import { StudentController } from "./controller/student/StudentController";
import { RoomController } from "./controller/room/RoomController";
import { TeacherController } from "./controller/teacher/TeacherController";

const routes = Router();

const studentController = new StudentController();
const roomController = new RoomController();
const teacherController = new TeacherController();

routes.post("/student", studentController.create);
routes.get("/student", studentController.findAll);
routes.get("/student/:name", studentController.findByName);
routes.put("/student/:id", studentController.update);
routes.delete("/student/:id", studentController.delete);
routes.post("/connectStudent/:studentId/:roomId", studentController.connect);

routes.post("/room", roomController.create);
routes.get("/room", roomController.findAll);
routes.get("/room/:id", roomController.find);
routes.put("/room/:id", roomController.update);
routes.delete("/room/:id", roomController.delete);
routes.post("/room/addTeacher/:id", roomController.connectTeacher);

routes.post("/teacher", teacherController.create);
routes.get("/teacher", teacherController.findAll);
routes.post("/teacher/:name", teacherController.findByName);
routes.put("/teacher/:id", teacherController.update);
routes.delete("/teacher/:id", teacherController.delete);

export { routes };
