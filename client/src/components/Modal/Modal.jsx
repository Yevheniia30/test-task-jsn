import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const FormModal=(props)=> {
    return (
      <Modal
        {...props}
        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new amazing hero!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {props.children}
        </Modal.Body>
        <Modal.Footer>
        {/* <Button >Save changes</Button>
          <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }