import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, ListGroup, Card, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { getHero } from "redux/heroes/heroesOperations";
import { Loader } from "components/Loader";

export const HeroPage = () => {
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const { id } = useParams();
  const navigate = useNavigate();

  //   console.log("id", id);

  useEffect(() => {
    dispatch(getHero(id));
  }, [dispatch, id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {loading && <Loader />}
      {error && (
        <>
          <p>Sorry, something went wrong </p>
          <Button variant="secondary" onClick={() => navigate("/")}>
            <FaArrowLeft /> Go to homepage
          </Button>
        </>
      )}
      {hero && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            <Button variant="secondary" onClick={goBack}>
              {" "}
              <FaArrowLeft /> Go back
            </Button>
          </div>

          <Card style={{ width: "50rem" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/${hero.images}`}
            />
            <Card.Body>
              <Card.Title>{hero.nickname}</Card.Title>
              <Card.Text>{hero.real_name}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{hero.origin_description}</ListGroup.Item>
              <ListGroup.Item>{hero.superpowers}</ListGroup.Item>
              <ListGroup.Item>{hero.catch_phrase}</ListGroup.Item>
            </ListGroup>
            {/* <Card.Body>
 <Card.Text>
     {hero.origin_description}
   </Card.Text>
   <Card.Text>
     {hero.superpowers}
   </Card.Text>
   <Card.Text>
     {hero.catch_phrase}
   </Card.Text>
   <Card.Link href="#">Card Link</Card.Link>
   <Card.Link href="#">Another Link</Card.Link>
 </Card.Body> */}
          </Card>
        </>
      )}
    </Container>
  );
};
