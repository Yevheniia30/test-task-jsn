import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { createHero, updateHero } from "redux/heroes/heroesOperations";

export const HeroForm = ({ item, onHide }) => {
  const dispatch = useDispatch();
  console.log("item", item);

  const [state, setState] = useState(
    item
      ? item
      : {
          nickname: "",
          real_name: "",
          catch_phrase: "",
          origin_description: "",
          superpowers: "",
          images: "",
        }
  );

  const {
    nickname,
    real_name,
    catch_phrase,
    origin_description,
    superpowers,
    images,
  } = state;

  // const [file, setfile] = useState("");

  // const initialValues = {
  //   nickname: "",
  //   real_name: "",
  //   catch_phrase: "",
  //   origin_description: "",
  //   superpowers: "",
  //   images: "",
  // };

  const handleChange = (e) => {
    console.log("e target", e.target);
    if (e.target.name === "images") {
      setState((prevValues) => ({
        ...prevValues,
        // we use the name to tell Formik which key of `values` to update
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setState((prevValues) => ({
        ...prevValues,
        // we use the name to tell Formik which key of `values` to update
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('values', values);
    let formData = new FormData();
    formData.append("nickname", state.nickname);
    formData.append("real_name", state.real_name);
    formData.append("catch_phrase", state.catch_phrase);
    formData.append("origin_description", state.origin_description);
    formData.append("superpowers", state.superpowers);
    formData.append("images", state.images);
    if(item){
      formData.append('id', item.id)
    }
    console.log("formdata", formData);
    item ? dispatch(updateHero(formData)) : dispatch(createHero(formData));
    setState((prevValues) => ({
      ...prevValues,
      // we use the name to tell Formik which key of `values` to update
      [e.target.name]: "",
    }));
    onHide();
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          name="nickname"
          value={nickname}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          The nickname must be unique
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Real name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Password"
          name="real_name"
          value={real_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Catch phrase</Form.Label>
        <Form.Control
          type="text"
          placeholder="Password"
          name="catch_phrase"
          value={catch_phrase}
          onChange={handleChange}
        />
      </Form.Group>

      <InputGroup>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          name="origin_description"
          value={origin_description}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Superpowers</InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          name="superpowers"
          value={superpowers}
          onChange={handleChange}
        />
      </InputGroup>

      {/* <form encType="multipart/form-data"> */}
      {/* <label for="file" class="label"></label> */}
      <input
        type="file"
        name="images"
        files={images}
        multiple
        onChange={handleChange}
      />

      {/* </form> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
      {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
