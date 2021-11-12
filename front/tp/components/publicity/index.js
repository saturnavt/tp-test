import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Publicity() {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://as.com/meristation/imagenes/2020/11/30/noticias/1606748285_015436_1606748324_noticia_normal.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Assassin's Creed Valhalla
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Juega a AC Valhalla ahora
                    </Typography>
                </CardContent>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://areajugones.sport.es/wp-content/uploads/2021/11/battlefield-2042-prueba-gratis.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Battlefield 2042
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Juega a Battlefield 2042 ahora
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}