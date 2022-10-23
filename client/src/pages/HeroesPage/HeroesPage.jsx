import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesOperations";
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, Row, Col, Container } from "react-bootstrap";
import { FormModal } from "../../components/Modal";
import { HeroForm } from "../../components/HeroForm";



export const HeroesPage = () => {
const dispatch=useDispatch()
const heroes=useSelector(state=>state.heroes)
const loading =useSelector(state=>state.loading)

const [isShow, setIsShow] = useState(false)
console.log('isShow', isShow);

useEffect(() => {
  dispatch(getHeroes())
}, [dispatch])

// const handleShowDetails=item=>{
//     setIsShow(item)
// }


    return (
        <>
        <Container>
        <Button onClick={()=>setIsShow(true)}>Create new hero!</Button>
        <Row>
            {heroes?.rows?.map((item, k) => (
                <Col key={item.id} xs={12} md={4} lg={3}>
                    <Card style={{cursor: 'pointer'}} onClick={()=>setIsShow(item)}>
                        <Card.Img src={`http://localhost:5000/${item.images}`} alt={item.nickname}  />

                        <Card.Body>
                            <Card.Title>{item.nickname}</Card.Title>
                            {/* <Card.Text>{item.team_name}</Card.Text> */}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    <FormModal show={isShow} onHide={()=>setIsShow(false)}>
        <HeroForm/>
        </FormModal>
    </>
    
       
    );
}

