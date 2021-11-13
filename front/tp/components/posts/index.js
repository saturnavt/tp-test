import Container from 'react-bootstrap/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Router from "next/router";

//zustand 
import useStore from "../zustand";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0
    },
    "&:before": {
        display: "none"
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        // badgeContent={props.commentsA}
        expandIcon={
            <Badge color="primary">
                <ChatIcon color="action" />
            </Badge>
        }
        {...props}

        style={{ backgroundColor: '#ffffff' }}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)"
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "0px solid rgba(0, 0, 0, .125)",
    borderColor: "rgba(255, 255, 255, .)"
}));


export default function Posts() {
    const router = useRouter();
    const [post, setPost] = useState('');

    const [postsdata, setPostDatas] = useState([]);
    const [postsLikes, setPostlikes] = useState([]);

    const [expanded, setExpanded] = useState("panel1");

    //zustand
    const iLike = useStore(state => state.iLike);
    const whenRemoveILike = useStore(state => state.whenRemoveILike);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        getComments(panel);
    };


    //Post function
    const handleNewPost = async () => {
        const userData = {
            "description": post,
            "userId": parseInt(localStorage.getItem('id'))
        };

        try {
            let loginResponse = await fetch('http://localhost:3001/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });

            let loginResponsedecoded = await loginResponse.json()

            if (loginResponsedecoded.message) {
                toast.warn("Hubo un error");
            } else {
                toast.success('Has echo una nueva publicación');
                setPost('');
                await getPosts();
            }


        } catch (error) {
            toast.warn("Hubo un error");
        }

    }

    const [comment, setcomment] = useState('');
    const [comments, setcomments] = useState([]);

    //handle comment posts
    const handleNewComment = async (postId) => {
        const userData = {
            "comment": comment,
            "postId": postId,
            "userId": parseInt(localStorage.getItem('id'))
        };

        try {
            let loginResponse = await fetch('http://localhost:3001/comments', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });

            let loginResponsedecoded = await loginResponse.json()

            if (loginResponsedecoded.message) {
                toast.warn("Hubo un error");
            } else {
                toast.success('Has escrito un comentario');
                await getComments(postId);
                setcomment('');
            }


        } catch (error) {
            toast.warn("Hubo un error");
        }

    }

    const getComments = async (postId) => {
        const userData = {
            "postId": postId,
        };
        try {
            let response = await fetch('http://localhost:3001/comments/filter', {
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
                setcomments(responseData)
            }
        } catch (error) {
            toast.warn("Hubo un error al traer los comentarios");
        }

    }
    const [countComments, setCountComments] = useState([]);

    const CountComments = async (postId) => {
        const userData = {
            "postId": postId,
        };
        try {
            let response = await fetch('http://localhost:3001/comments/filter', {
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
                setCountComments(responseData);
            }
        } catch (error) {
            // toast.warn("Hubo un error al traer los comentarios");
        }

    }

    const handlePostLikes = async (postId) => {
        const userData = {
            "likes": true,
            "postId": postId,
            "userId": parseInt(localStorage.getItem('id'))
        };
        try {
            let loginResponse = await fetch('http://localhost:3001/posts-likes', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });

            let loginResponsedecoded = await loginResponse.json()

            if (loginResponsedecoded.message) {
                toast.warn("Hubo un error");
            } else {
                if (loginResponsedecoded.post == "Se Agrego a los que te gusta") {
                    toast.success('Se agrego a los que te gustan');
                } else {
                    toast.warn('Se quito de los que te gustan');
                }
                await getPosts();
                await getPostsLikes();
                iLike();
                // Router.reload();
                // window.location.reload(false);

            }

        } catch (error) {
            toast.warn("Hubo un error");
        }

    }

    function getFormatedStringFromDays(date) {
        let diffTime = new Date().valueOf() - new Date(date).valueOf();
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]



        var years = Math.floor(Math.abs(days) / 365);
        var months = Math.floor(Math.abs(days) % 365 / 30);
        var dayss = Math.floor(Math.abs(days) % 365 % 30);

        var yearsDisplay = years > 0 ? years + (years == 1 ? " año, " : " años, ") : "";
        var monthsDisplay = months > 0 ? months + (months == 1 ? " mes, " : " meses, ") : "";
        var daysDisplay = dayss > 0 ? Math.abs(days) + (dayss == 1 ? " día," : " días,") : "";
        return yearsDisplay + monthsDisplay + daysDisplay + ' ' + Math.abs(hours) + 'h' + ', ' + Math.abs(minutes) + 'm' + ', ' + Math.abs(secs) + 's';
    }

    const getPosts = async () => {
        try {
            let response = await fetch('http://localhost:3001/posts', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            let responseData = await response.json();

            if (responseData.message) {
            } else {
                setPostDatas(responseData)
            }
        } catch (error) {
            toast.warn("Hubo un error al traer las publicaciones");
        }

    }


    const getPostsLikes = async () => {
        try {
            let response = await fetch('http://localhost:3001/posts-likes', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            let responseData = await response.json();

            if (responseData.message) {
            } else {
                setPostlikes(responseData)
            }
        } catch (error) {
            toast.warn("Hubo un error al traer las publicaciones");
        }

    }

    const findMyLikes = (likeId) => {
        const search = what => postsLikes.find(element => element.postId === what && element.likes === true && element.userId == parseInt(localStorage.getItem('id')));
        if (search(likeId)) {
            return <FavoriteIcon sx={{ color: 'red' }} />;
        } else {
            return <FavoriteIcon />;
        }

    }

    useEffect(() => {
        getPosts();
        getPostsLikes();
    }, [whenRemoveILike]);


    return (
        <div>
            <TextField
                id="standard-multiline-static"
                label="Di algo"
                multiline
                rows={4}
                variant="standard"

                style={{ minWidth: '100%' }}

                onChange={post => setPost(post.target.value)}
                value={post}
            />
            <br></br>
            <br></br>
            <Button variant="contained" style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '90%' }} onClick={handleNewPost}>
                Publicar
            </Button>
            <br></br>
            <br></br>
            {
                postsdata.map((data, index) => {
                    return (
                        <div key={index}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#1785E1' }} aria-label="recipe">
                                            <Avatar alt="Remy Sharp" src={data.users.avatar} />
                                            {/* {data.users.fullname.charAt(0)} */}
                                        </Avatar>

                                    }
                                    title={data.users.fullname}
                                    subheader={getFormatedStringFromDays(data.createdAt)}
                                />
                                <CardContent>
                                    {/* <Typography variant="h5" component="div">
                                        {data.users.fullname}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        hace {getFormatedStringFromDays(data.createdAt)}
                                    </Typography> */}
                                    <Typography variant="body2">
                                        {data.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="add to favorites" onClick={() => handlePostLikes(data.id)}>
                                        {

                                            (postsLikes) ?
                                                (
                                                    findMyLikes(data.id)
                                                ) :
                                                (
                                                    <FavoriteIcon />
                                                )

                                        }

                                    </IconButton>

                                    <Accordion
                                        expanded={expanded === data.id}
                                        onChange={handleChange(data.id)}
                                        style={{ border: '0px solid', borderColor: '#ffffff' }}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                        // commentsA={0}
                                        ></AccordionSummary>
                                        <AccordionDetails>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Comentar"
                                                multiline
                                                rows={4}

                                                variant="standard"
                                                style={{ width: '100%' }}
                                                onChange={comment => setcomment(comment.target.value)}
                                                value={comment}
                                            />
                                            <br></br>
                                            <br></br>
                                            <Button variant="contained" style={{ backgroundColor: '#1785E1', color: '#ffffff', borderRadius: 50, width: '100%' }} onClick={() => handleNewComment(data.id)}>
                                                Comentar
                                            </Button>
                                            <br></br>
                                            <br></br>
                                            <h5>Comentarios</h5>
                                            {
                                                comments.map((data) => {
                                                    return (
                                                        <div>
                                                            <Card sx={{ minWidth: 275 }}>
                                                                <CardHeader
                                                                    avatar={
                                                                        <Avatar sx={{ bgcolor: '#1785E1' }} aria-label="recipe">
                                                                            <Avatar alt="Remy Sharp" src={data.users.avatar} />
                                                                            {/* {data.users.fullname.charAt(0)} */}
                                                                        </Avatar>
                                                                    }
                                                                    title={data.users.fullname}
                                                                    subheader={getFormatedStringFromDays(data.createdAt)}
                                                                />
                                                                <CardContent>
                                                                    {/* <Typography variant="h5" component="div">
                                                                        {data.users.fullname}
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                        hace {getFormatedStringFromDays(data.createdAt)}
                                                                    </Typography> */}
                                                                    <Typography variant="body2">
                                                                        {data.comment}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                            <br></br>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </AccordionDetails>
                                    </Accordion>
                                </CardActions>
                            </Card>
                            <br></br>
                        </div>
                    )
                })
            }
        </div>
    )
}
