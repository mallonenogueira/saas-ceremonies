import { Router } from "express";
import { createAccount } from "./modules/accounts/create-account";
import { login } from "./modules/auth/login";
import { getUsers } from "./modules/users/get-users";
import { authMiddleware } from "./middlewares/auth-middleware";
import { createUser } from "./modules/users/create-user";
import { roleMiddleware } from "./middlewares/role-middleware";
import { paginationMiddleware } from "./middlewares/pagination-middleware";
import { editUser } from "./modules/users/edit-user";

const router = Router();

router.post("/account", createAccount);
router.post("/login", login);

router.use(authMiddleware);

router.get(
  "/users",
  roleMiddleware([roleMiddleware.ADMIN, roleMiddleware.USER]),
  paginationMiddleware,
  getUsers
);

router.post("/users", roleMiddleware([roleMiddleware.ADMIN]), createUser);
router.put("/users/:id", roleMiddleware([roleMiddleware.ADMIN]), editUser);

export { router };
