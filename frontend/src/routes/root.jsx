import { NavBar } from "../components/templates/nav";
import { Footer } from "../components/templates/footer";
//outlet = a todos los componentes que estén dentro del router
import { Outlet } from "react-router-dom";
import { NavBarLogged } from "../components/templates/navLogged";


export const Root = () => {
    return (
        <>
            <NavBar />
            <div className="bg-[#272424] min-h-screen flex flex-col items-center justify-center max-sm:p-8 overflow-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export const RootLogged = () => {
    return (
        <>
            <NavBarLogged />
            <div className="bg-[#272424] min-h-screen flex items-center overflow-auto md:justify-center">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}