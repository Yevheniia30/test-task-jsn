import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container, Button, Pagination } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getHeroes, deleteHero } from "redux/heroes/heroesOperations";
import { FormModal } from "components/Modal";
import { HeroForm } from "components/HeroForm";
import { Loader } from "components/Loader";

export const HeroesPage = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes);
  const loading = useSelector((state) => state.loading);
  const count = useSelector((state) => state.count);
  const error = useSelector((state) => state.error);

  const [isShow, setIsShow] = useState(false);
  const [actions, setActions] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(4);

  let limit = 4;

  const pagesCount = Math.ceil(count / limit);

  useEffect(() => {
    dispatch(getHeroes({ page, limit }));
  }, [dispatch, limit, page]);

  const handleEdit = (item) => {
    setIsShow(true);
    setItemToEdit(item);
  };

  const pages = [];
  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  // console.log("pages", pages);

  return (
    <>
      <Container>
        <div style={{ padding: "20px" }}>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={() => setIsShow(true)}>Create new hero!</Button>
          )}
        </div>
        {error && <p>Sorry, something went wrong, try again</p>}
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
                onMouseOver={() => setActions(item.id)}
                onMouseLeave={() => setActions(null)}
              >
                <Card.Img
                  src={`http://localhost:5000/${item.images}`}
                  alt={item.nickname}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <Card.Body>
                  <Link
                    to={`/${item.id}`}
                    title="See more interenting  information"
                  >
                    <Card.Title style={{ cursor: "pointer" }}>
                      {item.nickname}
                    </Card.Title>{" "}
                  </Link>
                  {actions === item.id && (
                    <div
                      style={{ position: "absolute", top: "0", right: "5px" }}
                    >
                      <FaEdit
                        fill="#fff"
                        onClick={() => handleEdit(item)}
                        style={{ cursor: "pointer" }}
                      />
                      <FaTrash
                        fill="#fff"
                        onClick={() => dispatch(deleteHero(item.id))}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  )}
                  {/* <Card.Text>{item.team_name}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination style={{ display: "flex", justifyContent: "center" }}>
          {pages.map((item) => (
            <Pagination.Item
              key={item}
              active={item === page}
              onClick={() => setPage(item)}
            >
              {item}{" "}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
      <FormModal
        show={isShow}
        item={itemToEdit?.nickname}
        onHide={() => setIsShow(false)}
      >
        <HeroForm item={itemToEdit} onHide={() => setIsShow(false)} />
      </FormModal>
    </>
  );
};
