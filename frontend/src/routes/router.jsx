//importamos al componente principal por decirlo así kadjasdakd
import { Root, RootLogged } from "./root";
//createBrowserRouter = creador de router
import { createBrowserRouter } from "react-router-dom";

//página de error
import { ErrorPage } from "./error-page";

//menu
import MenuOptions from "../components/productsMenu/menu";
import MenuUser from "../components/productsMenu/menuUser";
// import { MenuAppetizers } from "../components/productsMenu/menuAppetizers";
// import { MenuMainDishes } from "../components/productsMenu/menuMainDishes";
// import { MenuBeverages } from "../components/productsMenu/menuBeverages";
// import { MenuDesserts } from "../components/productsMenu/menuDesserts";

//componentes usuario anónimo
import { Index } from "../components/indexPage/Index";
import { AboutUs } from "../components/indexPage/aboutUs";
import { LoginForm } from "../components/authentication/login";
import { SignUpForm } from "../components/authentication/signup";
import { ResetPasswordForm } from "../components/authentication/resetPassword";

//componentes cliente logueado
import { SetTableForm } from "../components/customer/tableForm";
import { CustomerIndex } from "../components/customer/customerHome";
import { AddCommentForm } from "../components/customer/sendComment";

//componentes staff
import { StaffIndex } from "../components/staff/staffHome";
import { PendingOrders } from "../components/staff/pendingOrders";

//componente administrador 
import { AdminIndex } from "../components/admin/adminHome";
import { TablaUsuarios } from "../components/admin/staff/employees";
import { CreateEmployeesForm } from "../components/admin/staff/create";
//productos
import { ProductsOptions } from "../components/admin/menu/productOptions";
import { TablaEntradas } from "../components/admin/menu/appetizers";
import { TablaMainDishes } from "../components/admin/menu/mainDishes";
import { TablaBebidas } from "../components/admin/menu/beverages";
import { TablaPostres } from "../components/admin/menu/desserts";
import { AddProductForm } from "../components/admin/menu/addProduct";
//editar producto
import { EditProductsOptions } from "../components/admin/menu/edit/editProductOptions";
import { EditProductForm } from "../components/admin/menu/edit/updateProduct";
import { EditProductPictureForm } from "../components/admin/menu/edit/editPicture";
//comentarios
import { Comentarios } from "../components/admin/comentarios";

//editar usuarios (administrador)
import { EditOptions } from "../components/admin/staff/edit/editOptions";//menu de opciones edicion admin
import { PasswordEditionForm } from "../components/admin/staff/edit/passwordEdition";
import { EmploymentDataEditionForm } from "../components/admin/staff/edit/employmentData";


//editar perfil
import { EditUserOptions } from "../components/editProfile/editUserOptions"; //menu de opciones usuario
import { UserGeneralEditionForm } from "../components/editProfile/generalEdition"; //componente compartido con admin
import { UserPasswordEditionForm } from "../components/editProfile/editPassword";
import { SecurityQuestionForm } from "../components/editProfile/securityQuestion";


import { NavSu } from "../components/templates/navbarr";


export const PagesRouter = createBrowserRouter([
  // rutas para usuario anónimo
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/menu",
        element: <MenuUser />
      },
      // {
      //   path: "/menu/appetizers",
      //   element: <MenuAppetizers />
      // },
      // {
      //   path: "/menu/MainDishes",
      //   element: <MenuMainDishes />
      // },
      // {
      //   path: "/menu/beverages",
      //   element: <MenuBeverages />
      // },
      // {
      //   path: "/menu/desserts",
      //   element: <MenuDesserts />
      // },
      {
        path: "/authentication",
        element: <LoginForm />,
      },
      {
        path: "/authentication/signup",
        element: <SignUpForm />,
      },
      {
        path: "/authentication/resetPassword",
        element: <ResetPasswordForm />,
      },
    ],
  },
  // rutas para usuario logueado
  {
    path: "/customer",
    element: <RootLogged />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/customer",
        element: <CustomerIndex />
      },
      {
        path: "/customer/setTable",
        element: <SetTableForm />
      },
      {
        path: "/customer/menu",
        element: <MenuUser />
      },
      {
        path: "/customer/addComment",
        element: <AddCommentForm />
      },
      //editar perfil
      {
        path: "/customer/editOptions/:id_usuario",
        element: <EditUserOptions />
      },
      {
        path: "/customer/editOptions/general/:id_usuario",
        element: <UserGeneralEditionForm />
      },
      {
        path: "/customer/editOptions/password/:id_usuario",
        element: <UserPasswordEditionForm />
      },
      {
        path: "/customer/editOptions/securityQuestion/:id_usuario",
        element: <SecurityQuestionForm />
      }
    ]
  },
  //rutas para staff
  {
    path: "/staff",
    element: <RootLogged />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/staff",
        element: <StaffIndex />
      },
      {
        path: "/staff/menuOptions",
        element: <MenuOptions />
      },
      {
        path: "/staff/pendingOrders",
        element: <PendingOrders />
      },
      //editar perfil
      {
        path: "/staff/editOptions/:id_usuario",
        element: <EditUserOptions />
      },
      {
        path: "/staff/editOptions/general/:id_usuario",
        element: <UserGeneralEditionForm />
      },
      {
        path: "/staff/editOptions/password/:id_usuario",
        element: <UserPasswordEditionForm />
      },
      {
        path: "/staff/editOptions/securityQuestion/:id_usuario",
        element: <SecurityQuestionForm />
      }
    ]
  },
  //rutas para administrador
  {
    path: "/admin",
    element: <RootLogged />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <AdminIndex />,
      },
      {
        path: "/admin/editOptions/:id_usuario",
        element: <EditUserOptions />
      },
      {
        path: "/admin/editOptions/general/:id_usuario",
        element: <UserGeneralEditionForm />
      },
      {
        path: "/admin/editOptions/password/:id_usuario",
        element: <UserPasswordEditionForm />
      },
      {
        path: "/admin/editOptions/securityQuestion/:id_usuario",
        element: <SecurityQuestionForm />
      },
      //editar perfil de administrador
      {
        path: "/admin/editOptions/:id_usuario",
        element: <EditUserOptions />
      },
      //crud de empleados
      {
        path: "/admin/Employees",
        element: <TablaUsuarios />,
      },
      {
        path: "/admin/Employees/Create",
        element: <CreateEmployeesForm />,
      },
      {
        path: "/admin/Employees/editOptions/:id_usuario",
        element: <EditOptions />
      },
      {
        path: "/admin/Employees/editOptions/general/:id_usuario",
        element: <UserGeneralEditionForm />,
      },
      {
        path: "/admin/Employees/editOptions/password/:id_usuario",
        element: <PasswordEditionForm />,
      },
      {
        path: "/admin/Employees/editOptions/employmentData/:id_usuario",
        element: <EmploymentDataEditionForm />,
      },
      //comentarios
      {
        path: "/admin/comments",
        element: <Comentarios />
      },
      //productos
      {
        path: "/admin/productsOptions",
        element: <ProductsOptions />
      },
      {
        path: "/admin/productsOptions/appetizers",
        element: <TablaEntradas />
      },
      {
        path: "/admin/productsOptions/mainDishes",
        element: <TablaMainDishes />
      },
      {
        path: "/admin/productsOptions/desserts",
        element: <TablaPostres />
      },
      {
        path: "/admin/productsOptions/beverages",
        element: <TablaBebidas />
      },
      {
        path: "/admin/addProduct",
        element: <AddProductForm />
      },
      {
        path: "/admin/products/edit/:id_producto",
        element: <EditProductsOptions />
      },
      {
        path: "/admin/products/editInformation/:id_producto",
        element: <EditProductForm />
      },
      {
        path: "/admin/products/editPicture/:id_producto",
        element: <EditProductPictureForm />
      },

    ],
  },
  {
      path: "nav",
      element: <NavSu />
  }
]);
