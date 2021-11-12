import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../../components/menu';
import Posts from '../../components/posts';
import PostsILike from '../../components/post-i-like';
import Container from 'react-bootstrap/Container';
import Publicity from '../../components/publicity';

export default function Home() {
    return (
        <div >
            <Menu />
            <Container>
                <br></br>
                <Row>
                    <Col>
                        <h4>Publicidad</h4>
                        <br></br>
                        <Col>
                            <Publicity />
                        </Col>
                        <br></br>
                    </Col>


                    <Col>

                        <Col>
                            <Posts />
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
        </div>
    )
}
