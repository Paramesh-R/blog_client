import React, {  useContext, useEffect } from 'react'
// useState,
import { UserContext } from '../UserContext';

// Navbar Imports
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Router imports
import { Link, Navigate } from 'react-router-dom';


function Header() {
    const { setUserInfo } = useContext(UserContext);
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        console.log("Blog Header - UseEffect: Profile Validation start");
        fetch('http://localhost:5000/users/profile', {
            credentials: 'include',
        }).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(userDetails => { setUserInfo(userDetails); console.log(userDetails) })
                    .catch(err => console.log("Header UseEffect userDetailsJSON Error" + err))
            } else {
                console.log("token Expired")
            }

        })

        /*  fetch('http://localhost:5000/users/profile', {
            credentials: "include", // <= credentials (cookies) sent by the client
        })
        .then(response => {
            
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch(err => console.log("Token Expired"))
        })
        .catch(err => { console.log("Header UseEffect Error" + err) })
        */
        /* console.log("Token Response Status: " + response.status)
        if (response.status === 200) {
            console.log("Token validated")
            response.json()
                .then(info => {
                    setUserInfo(info);
                    console.log(userInfo);
                })
                .catch(err => console.log("Header UseEffect Error" + err))
        } else {
            console.log("Token Expired" + response.status)
        }
        */


        console.log("Blog Header - UseEffect: Profile Validation END*");

    }, [setUserInfo])

    function logout() {
        console.log('User clicked logout')
        fetch('http://localhost:5000/users/logout', {
            credentials: "include",
            method: "POST"
        })
        setUserInfo(null)
        return <Navigate to="/" />
    }

    const username = userInfo?.username

    return (
        <>
            {/* Navigation */}

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
                                            <NavDropdown.Item as={Link} to={'/mypost'}>My Dashboard</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className='text-secondary small' disabled>Signed in as: {username}</NavDropdown.Item>
                                            
                                           
                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}

                            </Nav>

                            {/* Search Bar */}
                            {/* <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    )
}

export default Header