import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {
    return (
        <Container>
            <div className="ContainerHome" style={{marginTop: -130}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Usuario" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Button variant="contained"  style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '100%' }} type="submit">
                        Ingresar
                    </Button>
                </Form>
            </div>
        </Container>
    )
}