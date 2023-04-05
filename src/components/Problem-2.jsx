import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Problem2 = () => {
  // all countries contact and details state managemet-------------
  const [allContactCountries, setAllContactCountries] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  // modal on true / false state managemnt------------
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [titleOfModal, setTitleOfModal] = useState("");
  // all modales handler------------------------
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setTitleOfModal("");
    setShow(false);
  };
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  // data loading -----------------------
  useEffect(() => {
    const url = "https://contact.mediusware.com/api/contacts/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllContactCountries(data.results);
      });
  }, []);

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

  // handle event no: ------searching function-------
  const handleEventNo = (e) => {
    if (e.target.checked) {
      const evenContactLists = allContacts.filter(
        (contact) => contact.id % 2 === 0
      );
      setAllContacts(evenContactLists);
    } else {
      if (titleOfModal === "US Contacts") {
        const usContacts = allContactCountries.filter(
          (contact) => contact.country.name === "United States"
        );
        setAllContacts(usContacts);
      } else {
        setAllContacts(allContactCountries);
      }
    }
  };

  // handle for countries details----------
  const countryDetail = (id) => {
    const singleCoutryDetail = allContactCountries.find(
      (country) => country.id === id
    );
    setContactDetails(singleCoutryDetail);
    handleShowDetail();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button   className="btn btn-lg btn-outline-primary"   type="button" onClick={handleAllContacts} >All Contacts</button>
          <button  className="btn btn-lg btn-outline-warning"  type="button" onClick={handleUsContacts} >US Contacts</button>   
        </div>
      </div>

      {allContacts.length > 0 && (
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{titleOfModal}</Modal.Title>
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
            <Modal.Footer className='flex justify-content-between align-items-center'>
              <Form>
                <div className="mb-3" onChange={(e) => handleEventNo(e)}>
                  <Form.Check label="Show Even" />
                </div>
              </Form>

              <button
                style={{ backgroundColor: "#46139f",  border: "1px solid #46139f" ,color:'white' , borderRadius:'5px'}}  
                onClick={handleAllContacts}
              >
                All Contacts
              </button>

              <button
                style={{ backgroundColor: "#ff7f50",  border: "1px solid #ff7f50" ,color:'white' , borderRadius:'5px'}}
                onClick={handleUsContacts}
              >
                US Contacts
              </button>

              <button
                style={{ backgroundColor: "#46139f",  border: "1px solid #46139f" ,color:'white' , borderRadius:'5px'}}
                onClick={handleClose}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      )}

      {showDetail && (
        <Modal show={showDetail} onHide={handleCloseDetail}>
          <Modal.Header variant="secondary" closeButton className="bg-info">
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-warning bg-dark">
            <small className="me-4">ID: {contactDetails.id}</small>
            <small className="me-4">Phone: {contactDetails.phone}</small>
            <small className="me-4">
              Country: {contactDetails?.country?.name}
            </small>
          </Modal.Body>
               <Modal.Footer className=" bg-dark"> 
                  <button
                    style={{ backgroundColor: "#46139f",  border: "1px solid #46139f" ,color:'white' , borderRadius:'5px'}}
                    onClick={handleCloseDetail}
               >
                    Close
                  </button>
              </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Problem2;
