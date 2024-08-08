import { Router } from "express";
import { authMiddleware } from "./middlewares/auth-middleware";
import { roleMiddleware } from "./middlewares/role-middleware";
import { paginationMiddleware } from "./middlewares/pagination-middleware";
import { createAccount } from "./modules/accounts/create-account";
import { login } from "./modules/auth/login";
import { getUsers } from "./modules/users/get-users";
import { createUser } from "./modules/users/create-user";
import { editUser } from "./modules/users/edit-user";

import { getAddress } from "./modules/address/get-address";
import { createAddress } from "./modules/address/create-address";
import { editAddress } from "./modules/address/edit-address";
import { getCeremonies } from "./modules/ceremonies/get-ceremonies";
import { createCeremony } from "./modules/ceremonies/create-ceremony";
import { editCeremony } from "./modules/ceremonies/edit-ceremony";

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

router.get(
  "/address",
  roleMiddleware([roleMiddleware.ADMIN, roleMiddleware.USER]),
  paginationMiddleware,
  getAddress
);
router.post("/address", roleMiddleware([roleMiddleware.ADMIN]), createAddress);
router.put("/address/:id", roleMiddleware([roleMiddleware.ADMIN]), editAddress);

router.get(
  "/ceremonies",
  roleMiddleware([roleMiddleware.ADMIN, roleMiddleware.USER]),
  paginationMiddleware,
  getCeremonies
);
router.post(
  "/ceremonies",
  roleMiddleware([roleMiddleware.ADMIN, roleMiddleware.USER]),
  createCeremony
);

router.put(
  "/ceremonies/:id",
  roleMiddleware([roleMiddleware.ADMIN, roleMiddleware.USER]),
  editCeremony
);

export { router };
