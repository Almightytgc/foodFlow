import express from 'express';

//FUNCIONES

//funciones de usuario anónimo
import { createUser } from '../controllers/authentication/signUp.mjs';
import { logIn } from '../controllers/authentication/logIn.mjs';
import { ResetPassword } from '../controllers/authentication/resetPassword.mjs';

//obtener información de usuario en específico
import { getUserById } from '../controllers/general/getUserById.mjs';

//funciones cliente logueado
import { addComment } from '../controllers/customer/addComment.mjs';
import { setTable } from '../controllers/customer/setTable.mjs';
import { getTableByUserId } from '../controllers/general/getTableInfo.mjs';

//editar perfil (usuarios) updateGeneralInformaion también es usado por el admin
import { updateGeneralInformation } from '../controllers/general/edit/generalInformation.mjs';
import { changeUserPassword } from '../controllers/general/edit/changePassword.mjs';
import { editSecurityQuestion } from '../controllers/general/edit/securityQuestion.mjs';


//controladores meseros
import { sendOrder } from '../controllers/staff/sendOrder.mjs';
import { getTables } from '../controllers/staff/getTables.mjs';
import { changeTableState } from '../controllers/staff/changeTableState.mjs';

//chef
import { getPendingOrders } from '../controllers/staff/getPendingOrders.mjs';
import { orderDelivered } from '../controllers/staff/markOrderAsDelivered.mjs';

//funciones de admninistradores
import { getEmployees } from '../controllers/admin/staff/getEmployees.mjs';
import { createEmployees } from '../controllers/admin/staff/createEmployees.mjs';
import { deleteEmployees } from '../controllers/admin/staff/deleteEmployees.mjs';
import { getComments } from '../controllers/admin/getComments.mjs';
import { updateEmploymentData } from '../controllers/admin/staff/update/employmentData.mjs';
import { updatePassword } from '../controllers/admin/staff/update/changePassword.mjs';
//productos

import { uploadProducto } from '../controllers/admin/menu/uploadMenu.mjs';
import { uploadProductPicture } from '../controllers/admin/menu/updateProductPicture.mjs';
import { getProductById } from '../controllers/admin/menu/getProductById.mjs';
import { deleteProduct } from '../controllers/admin/menu/deleteProduct.mjs';
import { updateProduct } from '../controllers/admin/menu/updateMenu.mjs';
import { getBeverages } from '../controllers/admin/menu/getProduct.mjs';
import { getAppetizers } from '../controllers/admin/menu/getProduct.mjs';
import { getMainDishes } from '../controllers/admin/menu/getProduct.mjs';
import { getDesserts } from '../controllers/admin/menu/getProduct.mjs';

//Chef
import { createOrder } from '../controllers/staff/orderController.mjs';

//RUTAS
const foodFlowRouter = express.Router();

//funciones de cliente anónimo
foodFlowRouter.post('/authentication', logIn);
foodFlowRouter.post('/authentication/signup', createUser);
foodFlowRouter.patch('/authentication/resetPassword', ResetPassword);


//funciones de cliente logueado
foodFlowRouter.post('/customer/setTable/:id_usuario', setTable);
foodFlowRouter.post("/customer/addComment", addComment);
foodFlowRouter.get("/users/getTableById/:id_usuario", getTableByUserId)


//obtener información de usuario en específico
foodFlowRouter.get('/users/getUserById/:id_usuario', getUserById);

//editar perfil general
foodFlowRouter.patch('/users/editProfile/general/:id_usuario', updateGeneralInformation);
foodFlowRouter.patch('/users/editProfile/password/:id_usuario', changeUserPassword);
foodFlowRouter.patch('/users/editProfile/securityQuestion/:id_usuario', editSecurityQuestion);

//funciones staff
foodFlowRouter.get('/staff/getTables', getTables);
foodFlowRouter.patch('/staff/usedTables/:id_mesa', changeTableState);
foodFlowRouter.post("/staff/sendOrder", sendOrder);

//chefs
foodFlowRouter.get("/staff/getPendingOrders", getPendingOrders);
foodFlowRouter.delete("/staff/orderDelivered/:id_orden", orderDelivered); 

//funciones de administrador
foodFlowRouter.get('/admin/Employees', getEmployees);
foodFlowRouter.delete('/admin/Employee/:id_usuario',deleteEmployees);
foodFlowRouter.post('/admin/Employees/Create', createEmployees);
//agregar producto
foodFlowRouter.post("/admin/products/upload", uploadProducto);
//obtener productos
foodFlowRouter.get("/products/getProductById/:id_producto", getProductById);
foodFlowRouter.get("/products/getAppetizers", getAppetizers);
foodFlowRouter.get("/products/getBeverages", getBeverages);
foodFlowRouter.get("/products/getMainDishes", getMainDishes);
foodFlowRouter.get("/products/getDesserts", getDesserts);
//actualizar productos
foodFlowRouter.patch("/admin/products/editProduct/:id_producto", updateProduct);
foodFlowRouter.patch("/admin/products/editProductPicture/:id_producto", uploadProductPicture)
//eliminar producto
foodFlowRouter.delete("/admin/products/deleteProduct/:id_producto", deleteProduct);

//obtener comentarios
foodFlowRouter.get("/admin/getComments", getComments);
//editar perfil empleados
foodFlowRouter.patch('/admin/Employees/editOptions/general/:id_usuario', updateGeneralInformation);
foodFlowRouter.patch('/admin/Employees/editOptions/password/:id_usuario', updatePassword);
foodFlowRouter.patch('/admin/Employees/editOptions/employmentData/:id_usuario', updateEmploymentData);


//Chef
foodFlowRouter.post('/staff/createOrder/confirm', createOrder);



export default foodFlowRouter;