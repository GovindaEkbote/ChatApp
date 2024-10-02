import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getMyChat,
  newGroupChat,
  getMyGroup,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroup);
app.put("/addmembers", addMembers);
app.put("/removemembers", removeMembers);
app.delete("/leave/:id", leaveGroup);
app.post("/message", attachmentsMulter, sendAttachments);

app.route("/:id").get(getChatDetails).put(renameGroup);

export default app;
