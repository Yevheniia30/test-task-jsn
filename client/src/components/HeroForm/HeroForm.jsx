import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useDispatch } from 'react-redux';
import { createHero } from '../../redux/heroes/heroesOperations';




export const HeroForm=()=> {

  const initialValues={
    nickname:'',
    real_name: '',
    catch_phrase:'',
    origin_description:'',
    superpowers:''
  }

const handleSubmit=(e)=>{
  e.preventDefault()
console.log('e.target', e.target);
}

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nickname</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name="nickname"/>
        <Form.Text className="text-muted">
          The nickname must be unique
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Real name</Form.Label>
        <Form.Control type="text" placeholder="Password" name="real_name"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Catch phrase</Form.Label>
        <Form.Control type="text" placeholder="Password" name="catch_phrase"/>
      </Form.Group>


      <InputGroup>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" name="origin_description"/>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Superpowers</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" name="superpowers"/>
      </InputGroup>

      {/* <form encType="multipart/form-data">
      <label for="file" class="label"></label> */}
      <input encType="multipart/form-data" type="file" multiple />
     
    {/* </form> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

