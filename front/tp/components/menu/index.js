import { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Menu() {
    const router = useRouter();

    //Logout function
    const handleLogout = (e) => {
        localStorage.clear();
        e.preventDefault();
        router.push('/');
    }

    //Routes
    const handlePostsRoute = () => {
        router.push('/home');
    }
    const handleProfileRoute = () => {
        router.push('/profile');
    }

    const verifiedToken = async () => {
        try {
            let response = await fetch('http://localhost:3001/users/check-token', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            let responseData = await response.json();

            if (responseData.token == true) {
            } else {
                router.push('/');
            }
        } catch (error) {
            router.push('/');
        }

    }

    useEffect(() => {
        verifiedToken();
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: '#1785E1' }}>
            <Container>
                <Navbar.Brand href="/home">TP TEST</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link style={{ color: '#ffffff' }} onClick={handlePostsRoute}>Publicaciones</Nav.Link>
                        <Nav.Link href="#pricing" style={{ color: '#ffffff' }} onClick={handleProfileRoute}>Perfil</Nav.Link>
                    </Nav>
                    <Nav style={{ color: '#ffffff' }}>
                        <Nav.Link style={{ color: '#ffffff' }} onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                        {/* <NavDropdown title="Opciones" id="collasible-nav-dropdown" style={{ color: '#ffffff' }}> */}

                            {/* <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item> */}
                        {/* </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}