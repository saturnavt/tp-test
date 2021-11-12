import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  //username
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Login function
  const handleLogin = async () => {
    const userData = {
      username: username,
      password: password
    };

    try {
      let loginResponse = await fetch('http://localhost:3001/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      let loginResponsedecoded = await loginResponse.json()

      if (loginResponsedecoded.message) {
        toast.warn("Datos incorrectos");
        router.push('/');
      } else {
        if (loginResponsedecoded.Error === 'Datos incorrectos') {
          toast.warn("Datos incorrectos");
        } else {
          toast.success("Bienvenido " + loginResponsedecoded.userName);
          localStorage.setItem('token', loginResponsedecoded.token);
          localStorage.setItem('id', loginResponsedecoded.userId);

          router.push('/home');
        }
      }


    } catch (error) {
      toast.warn("Datos incorrectos");
      router.push('/');
    }

  }

  return (
    <div className="ContainerHome">
      <Form style={{ backgroundColor: '#ffffff', width: '30%', height: '40%', borderRadius: 30 }}>
        <br></br>
        <h2>TP TEST</h2>
        <br></br>
        <TextField id="standard-basic" label="Usuario" variant="standard" style={{ width: '90%' }} onChange={username => setUsername(username.target.value)} />
        <br></br>
        <br></br>
        <TextField id="standard-basic" label="Contraseña" type="password" variant="standard" style={{ width: '90%' }} onChange={password => setPassword(password.target.value)} />
        <br></br>
        <br></br>
        <Link href="/register">
          <Button variant="contained" style={{ backgroundColor: 'transparent', color: '#000000', borderRadius: 80, width: '30%' }}>
            Registrarse
          </Button>
        </Link>

        <br></br>
        <br></br>
        <Button variant="contained" style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '90%' }} onClick={handleLogin}>
          Ingresar
        </Button>
        <br></br>
        <br></br>
      </Form>
    </div>
  )
}
