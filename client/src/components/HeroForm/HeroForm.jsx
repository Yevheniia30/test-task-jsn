import { InputGroup, Button, Form } from "react-bootstrap";
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
          Images: '',
        }
  );

  const {
    nickname,
    real_name,
    catch_phrase,
    origin_description,
    superpowers,
    Images,
  } = state;

  // const initialValues = {
  //   nickname: "",
  //   real_name: "",
  //   catch_phrase: "",
  //   origin_description: "",
  //   superpowers: "",
  //   images: "",
  // };

  console.log("STATE", state);

  const handleChange = (e) => {
    console.log("e target", e.target.files);
    if (e.target.name === "Images") {
      setState((prevValues) => ({
        ...prevValues,
        // we use the name to tell Formik which key of `values` to update
        [e.target.name]: e.target.files,
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

    // for (let i = 0; i < Images.length; i++) {
    //   formData.append(`Images`, Images[i]);
    // }
    for (let i = 0 ; i < state.Images.length ; i++) { formData.append("Images", state.Images[i]); }

    // formData.append("Images", state.Images);
    if (item) {
      formData.append("id", item.id);
    }
    console.log("formdata", formData);
    item ? dispatch(updateHero(formData)) : dispatch(createHero(formData));
    setState((prevValues) => ({
      ...prevValues,
      [e.target.name]: "",
    }));
    onHide();
  };

  return (
    <Form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter nickname"
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
          placeholder="Enter real name"
          name="real_name"
          value={real_name}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          The real name must be unique
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Catch phrase</Form.Label>
        <Form.Control
          type="text"
          placeholder="Catch phrase"
          name="catch_phrase"
          value={catch_phrase}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          name="origin_description"
          value={origin_description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Superpowers</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          name="superpowers"
          value={superpowers}
          onChange={handleChange}
        />
      </Form.Group>

      {/* <form encType="multipart/form-data"> */}
      {/* <label for="file" class="label"></label> */}
      <input
        type="file"
        name="Images"
        files={Images}
        multiple
        onChange={handleChange}
      />

      {/* </form> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
      {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <Button
        variant="primary"
        type="submit"
        disabled={!nickname || !real_name}
      >
        Submit
      </Button>
    </Form>
  );
};
