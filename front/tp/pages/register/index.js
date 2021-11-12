import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Link from 'next/link';

export default function Register() {
    const router = useRouter();

    //username
    const [fullname, setfullname] = useState('');
    const [age, setage] = useState(0);

    const [value, setValue] = useState(null);

    const [email, setemail] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Register function
    const handleRegister = async () => {
        const userData = {
            "avatar": "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png",
            "fullname": fullname,
            "age": parseInt(age),
            "dateofborn": value,
            "email": email,
            "username": username,
            "password": password
        };
        try {
            let loginResponse = await fetch('http://localhost:3001/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            await loginResponse.json()

            if (fullname == "" || age == 0 || value == null || username == "" || password == "") {
                toast.warn("Por favor llena todos los campos");
            } else {
                toast.success("Registro Exitoso");
                router.push('/');
            }


        } catch (error) {
            toast.warn("Datos incorrectos");

        }

    }

    return (
        <div className="ContainerHome">
            <Form style={{ backgroundColor: '#ffffff', width: '30%', height: '40%', borderRadius: 30 }}>
                <br></br>
                <h2>TP TEST</h2>
                <Link href="/">
                    <Button variant="contained" style={{ backgroundColor: 'transparent', color: '#000000', borderRadius: 80, width: '30%' }}>
                        Volver
                    </Button>
                </Link>
                <br></br>
                <TextField id="standard-basic" label="Nombre Completo" variant="standard" style={{ width: '90%' }} onChange={fullname => setfullname(fullname.target.value)} />
                <br></br>
                <br></br>
                <TextField id="standard-basic" label="Edad" type="number" variant="standard" style={{ width: '90%' }} onChange={age => setage(age.target.value)} />
                <br></br>
                <br></br>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Fecha de nacimiento"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br></br>
                <br></br>
                <TextField id="standard-basic" label="Correo" variant="standard" style={{ width: '90%' }} onChange={email => setemail(email.target.value)} />
                <br></br>
                <br></br>
                <TextField id="standard-basic" label="Usuario" variant="standard" style={{ width: '90%' }} onChange={username => setUsername(username.target.value)} />
                <br></br>
                <br></br>
                <TextField id="standard-basic" label="Contraseña" type="password" variant="standard" style={{ width: '90%' }} onChange={password => setPassword(password.target.value)} />
                <br></br>
                <br></br>
                <Button variant="contained" style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '90%' }} onClick={handleRegister}>
                    Registrarse
                </Button>
                <br></br>
                <br></br>
            </Form>
        </div>
    )
}