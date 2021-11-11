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

export default function PostsILike() {
    const router = useRouter();


    const [postsdata, setPostDatas] = useState([]);
    const [postsLikes, setPostlikes] = useState([]);

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
        const userData = {
            "userId": parseInt(localStorage.getItem('id'))
        };
        try {
            let response = await fetch('http://localhost:3001/posts/i-like', {
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
                setPostDatas(responseData)
            }
        } catch (error) {
            toast.warn("Hubo un error al traer las publicaciones");
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
            }

        } catch (error) {
            toast.warn("Hubo un error");
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
            console.log(responseData)
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

        }

    }

    useEffect(() => {
        getPosts();
        getPostsLikes();
    }, []);


    return (
        <div>
            <br></br>
            {
                postsdata.map((data, index) => {
                    return (
                        <div key={index}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {data.posts.users.fullname}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        hace {getFormatedStringFromDays(data.posts.createdAt)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {data.posts.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="add to favorites" onClick={() => handlePostLikes(data.posts.id)}>
                                        {

                                            (postsLikes) ?
                                                (
                                                    findMyLikes(data.posts.id)
                                                ) :
                                                (
                                                    <FavoriteIcon />
                                                )

                                        }

                                    </IconButton>
                                    <IconButton aria-label="add to favorites">
                                        <ChatIcon />
                                    </IconButton>
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