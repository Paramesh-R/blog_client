import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';


function Header() {
    const { setUserInfo } = useContext(UserContext);
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:5000/users/profile', { credentials: 'include', }).then(response => {
            if (response.status === 200) {
                response.json().then(userDetails => { setUserInfo(userDetails) }).catch(err => console.log("Header UseEffect userDetailsJSON Error" + err))
            } else { console.log("token Expired") }
        }).catch(err => console.log("JWT Verify Header", err))
    }, [setUserInfo])

    function logout() {
        fetch('http://localhost:5000/users/logout', { credentials: "include", method: "POST" })
        setUserInfo(null)
        return <Navigate to="/" />
    }


    const username = userInfo?.username

    return (
        <>
            <Navbar key='sm' bg="dark" expand='sm' className="mb-3 navbar-dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to={"/"}>Blog App</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`} aria-labelledby={`offcanvasNavbarLabel-expand-sm`} placement="end">
                        <Offcanvas.Header closeButton><Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>Offcanvas</Offcanvas.Title></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {!username && (
                                    <>
                                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>

                                        <NavDropdown align={"end"} title="Account" id={`offcanvasNavbarDropdown-expand-sm`}>
                                            <NavDropdown.Item as={Link} to={"/login"}>Login</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to={'/register'}>Register</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}
                                {username && (
                                    <>
                                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                                        <Nav.Link as={Link} to={"/create"}>Create Post</Nav.Link>
                                        <NavDropdown align={"end"} title="Account" id={`offcanvasNavbarDropdown-expand-sm`}>
                                            <NavDropdown.Item as={Link} to={'/dashboard'}>My Dashboard</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className='text-secondary small' disabled>Signed in as: {username}</NavDropdown.Item>


                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    )
}

export default Header