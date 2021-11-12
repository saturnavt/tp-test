import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../../components/menu';
import MyPosts from '../../components/myPosts';
import OtherPosts from '../../components/otherposts';
import PostsILike from '../../components/post-i-like';
import Container from 'react-bootstrap/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Profile() {
    const [userData, setuserData] = useState([]);
    //username
    const [fullname, setfullname] = useState('');
    const [age, setage] = useState(0);

    const [value, setValue] = useState(null);

    const [email, setemail] = useState('');


    const [image, setImage] = useState(null)
    const [modalShow, setModalShow] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setImage(userData.avatar);
        setfullname(userData.fullname);
        setage(userData.age);
        setemail(userData.email);
        setValue(userData.dateofborn);
    }
    const handleClose = () => setOpen(false);

    const getUserData = async () => {
        const userData = {
            "userId": parseInt(localStorage.getItem('id'))
        };
        try {
            let response = await fetch('http://localhost:3001/users/profile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });
            let responseData = await response.json();

            if (responseData.message) {
            } else {
                setuserData(responseData)
            }
        } catch (error) {
            toast.warn("Hubo un error al traer usuario");
        }

    }

    const updateUserData = async () => {
        const userData = {
            "avatar": image,
            "fullname": fullname,
            "age": parseInt(age),
            "dateofborn": value,
            "email": email,
            "userId": parseInt(localStorage.getItem('id'))
        };
        try {
            let response = await fetch('http://localhost:3001/users/update', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });
            await response.json();

            toast.success("Perfil Actualizado");
            getUserData();
        } catch (error) {
            toast.warn("Hubo un error al traer usuario");
        }

    }

    function formatDates(date) {
        return new Date(date);
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // function MyVerticallyCenteredModal(props) {

    //     setfullname(userData.fullname);
    //     setage(userData.age);
    //     setemail(userData.email);
    //     setValue(userData.dateofborn);


    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Editando Perfil
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <Form style={{ backgroundColor: '#ffffff', height: '40%', borderRadius: 30 }}>
    //                     <input type="file" onChange={onImageChange} className="filetype" />
    //                     <img src={image} alt="preview image" width="200" />
    //                     <br></br>
    //                     <TextField id="standard-basic" label="Nombre Completo" variant="standard" style={{ width: '90%' }} onChange={fullname => setfullname(fullname.target.value)} value={fullname} />
    //                     <br></br>
    //                     <br></br>
    //                     <TextField id="standard-basic" label="Edad" type="number" variant="standard" style={{ width: '90%' }} onChange={age => setage(age.target.value)} value={age} />
    //                     <br></br>
    //                     <br></br>
    //                     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //                         <DatePicker
    //                             label="Fecha de nacimiento"
    //                             value={value}
    //                             onChange={(newValue) => {
    //                                 setValue(newValue);
    //                             }}
    //                             renderInput={(params) => <TextField {...params} />}
    //                         />
    //                     </LocalizationProvider>
    //                     <br></br>
    //                     <br></br>
    //                     <TextField id="standard-basic" label="Correo" variant="standard" style={{ width: '90%' }} onChange={email => setemail(email.target.value)} value={email} />
    //                     <br></br>
    //                     <br></br>
    //                 </Form>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onClick={props.onHide}>Cerrar</Button>
    //                 <Button onClick={updateUserData}>Actualizar</Button>
    //             </Modal.Footer>

    //         </Modal>
    //     );
    // }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div >
            {/* <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}
            <Menu />
            <Container>
                <br></br>
                <Row>
                    <Col>
                        <h4>Perfil</h4>
                        <br></br>
                        <Col>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={userData.avatar}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {userData.fullname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Correo: {userData.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Nacimiento: {userData.dateofborn}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Edad: {userData.age}
                                    </Typography>
                                    <br></br>

                                    <Button variant="primary" style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '90%' }} onClick={handleOpen}>
                                        Editar Perfil
                                    </Button>
                                </CardContent>
                            </Card>
                        </Col>
                        <br></br>
                    </Col>


                    <Col>

                        <Col>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="profile" title="Tus Publicaciones">
                                    <MyPosts />
                                </Tab>
                                <Tab eventKey="Otras Publicaciones" title="Otras Publicaciones">
                                    <OtherPosts />
                                </Tab>
                            </Tabs>
                        </Col>
                        <br></br>
                    </Col>
                    <Col>
                        <h4>Publicaciones que te gustan</h4>
                        <br></br>
                        <Col>
                            <PostsILike />
                        </Col>
                        <br></br>
                    </Col>
                </Row>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form style={{ backgroundColor: '#ffffff', height: '40%', borderRadius: 30 }}>
                        <input type="file" onChange={onImageChange} className="filetype" />
                        <img src={image} alt="preview image" width="300" />
                        <br></br>
                        <br></br>
                        <TextField id="standard-basic" label="Nombre Completo" variant="standard" style={{ width: '90%' }} onChange={fullname => setfullname(fullname.target.value)} value={fullname} />
                        <br></br>
                        <br></br>
                        <TextField id="standard-basic" label="Edad" type="number" variant="standard" style={{ width: '90%' }} onChange={age => setage(age.target.value)} value={age} />
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
                        <TextField id="standard-basic" label="Correo" variant="standard" style={{ width: '90%' }} onChange={email => setemail(email.target.value)} value={email} />
                        <br></br>
                        <br></br>
                        <Button style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '90%' }} onClick={updateUserData}>Actualizar</Button>
                    </Form>
                </Box>
            </Modal>
        </div>
    )
}
