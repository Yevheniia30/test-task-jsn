import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes, deleteHero } from "redux/heroes/heroesOperations";
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FormModal } from "components/Modal";
import { HeroForm } from "components/HeroForm";
import { FaTrash, FaEdit } from "react-icons/fa";

export const HeroesPage = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes);
  const loading = useSelector((state) => state.loading);

  const [isShow, setIsShow] = useState(false);
  const [actions, setActions] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null)
  console.log("isShow", isShow);
  console.log('itemToEdit', itemToEdit);

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch]);

 const handleEdit=(item)=>{
    setIsShow(true)
    setItemToEdit(item)
 }

  return (
    <>
      <Container>
        <Button onClick={() => setIsShow(true)}>Create new hero!</Button>
        <Row>
          {heroes?.map((item, k) => (
            <Col
              key={item.id}
              xs={12}
              md={4}
              lg={3}
              style={{ marginBottom: "20px" }}
            >
              <Card
                style={{ cursor: "pointer" }}
                onMouseOver={() => setActions(item.id)}
                onMouseLeave={()=>setActions(null)}
              >
                <Card.Img
                  src={`http://localhost:5000/${item.images}`}
                  alt={item.nickname}
                  style={{ objectFit: "cover", height: "300px" }}
                  
                />

                <Card.Body>
                  <Card.Title>{item.nickname}</Card.Title>
                  {actions===item.id && (
                    <div
                      style={{ position: "absolute", top: "0", right: "5px" }}
                    >
                      <FaEdit fill="#fff" onClick={()=>handleEdit(item)}/>
                      <FaTrash fill="#fff" onClick={()=>dispatch(deleteHero(item.id))} />
                    </div>
                  )}

                  {/* <Card.Text>{item.team_name}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <FormModal show={isShow} item={itemToEdit?.nickname} onHide={() => setIsShow(false)}>
        <HeroForm item={itemToEdit} onHide={() => setIsShow(false)}/>
      </FormModal>
    </>
  );
};
