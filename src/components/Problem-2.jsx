import {useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Problem2 = () => {
  // all countries contact and details state managemet-------------
  const [allContactCountries, setAllContactCountries] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
 
  // modal on true / false state managemnt------------
  const [show, setShow] = useState(false);

  const [titleOfModal, setTitleOfModal] = useState("");
  // all modales handler------------------------
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setTitleOfModal("");
    setShow(false);
  };

 // data loading -----------------------
    useEffect(() => {
        const url = 'https://contact.mediusware.com/api/contacts/';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllContactCountries(data.results); 
            })

    }, [])

    // handle allCountries data---------------------
  const handleAllContacts = () => {
    setAllContacts(allContactCountries);
    setTitleOfModal("All Countries Contacts");
    handleShow();
  };
  // handle only US data---------------------
  const handleUsContacts = () => {
    const usContacts = allContactCountries.filter(
      (contact) => contact.country.name === "United States"
    );
    setAllContacts(usContacts);
    setTitleOfModal("US Contacts");
    handleShow();
  };






    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button"  onClick={handleAllContacts} >All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" onClick={handleUsContacts} >US Contacts</button>
                </div>
                
            </div>

            {allContacts.length > 0 && (
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{titleOfModal}</Modal.Title>
            </Modal.Header>
            <Modal.Header>
              <Form>
                <div className="mb-3" onChange={(e) => handleEventNo(e)}>
                  <Form.Check label="Only Even" />
                </div>
              </Form>
            </Modal.Header>
            <Modal.Body>
              <div className="border border-bottom-0">
                <table className="table ">
                  <thead>
                    <tr className="bg-warning">
                      <th scope="col">ID</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allContacts.map((contact) => (
                      <tr
                        key={contact?.id}
                        onClick={() => countryDetail(contact.id)}
                      >
                        <td>
                          <small>{contact?.id}.</small>
                        </td>
                        <td>{<small>{contact?.phone}</small>}</td>
                        <td>
                          <small>{contact?.country?.name}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )} 

 



        </div>
    );
};

export default Problem2;