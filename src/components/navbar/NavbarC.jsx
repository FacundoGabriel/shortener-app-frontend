import { Navbar, Nav, Button } from "react-bootstrap";
import "./NavbarC.css";

export const NavbarC = () => {
  return (
    <>
    <div>
    <Navbar expand="lg" className=" w-100" >
        <div className="container-xl">
        <Navbar.Brand href="#home" className="text-light">Shortener</Navbar.Brand>
        {/* <Nav className="">
          <Button className="custom-btn">
            Iniciar sesión
          </Button>
          <Button  className="custom-btn">
            Registro
          </Button>
        </Nav> */}
        </div>
      </Navbar>
 
       

    </div>
    </>
  );
};
