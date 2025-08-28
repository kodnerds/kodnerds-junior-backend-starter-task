import {Router} from "express";
import * as dataController from "../controllers/dataController"
import { validate,createSchema, paginationSchema, updateSchema } from "../utils/validation";


const router = Router();

router.get("/all",validate(paginationSchema),dataController.allData);
router.get("/:id/single", dataController.singleData);
router.post("/create",validate(createSchema),dataController.createData);
router.put("/:id/edit",validate(updateSchema),dataController.editData);
router.delete("/:id/delete", dataController.deleteData);

export default router;