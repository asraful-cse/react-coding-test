import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [userItems, setUserItems] = useState({});
    const [userNewItems, setUserNewItems] = useState([]);

      const handleSubmit = (event) => {
        event.preventDefault();
        const allNewItems = [...userNewItems, userItems];
        // console.log(allNewItems);
        setUserNewItems(allNewItems);
        localStorage.setItem("userItems", JSON.stringify(allNewItems));
        itemShowAll();
      };

      const handleFeildValue = (event) => {
        const fieldName = event.target.name;
        // console.log(fieldName);
        const fieldValue = event.target.value;
        // console.log(fieldValue);
        const NameItems = { ...userItems };
        NameItems[fieldName] = fieldValue;
        setUserItems(NameItems);
      };

      const itemShowAll = () => {
        const active = JSON.parse(localStorage.getItem("userItems")).filter(
          (item) => item.status === "Active"
        );
        const completed = JSON.parse(localStorage.getItem("userItems")).filter(
          (item) => item.status === "Completed"
        );
        const other = JSON.parse(localStorage.getItem("userItems")).filter(
          (item) => item.status !== "Active" && item.status !== "Completed"
        );
        const all = [...active, ...completed, ...other];
        setUserNewItems(all);
      };

     const handleClick = (type) =>{
        setShow(type);
        if (type === "all") {
          itemShowAll();
        } else {
          const typeUser = JSON.parse(localStorage.getItem("userItems")).filter(
            (item) =>  item?.status?.toLowerCase() === type
          );
          setUserNewItems(typeUser);
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name"
                            name="name"
                            onChange={handleFeildValue}
                            />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status"  name="status" onChange={handleFeildValue}/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userNewItems ? userNewItems.map((item, idx) => (
                          <tr key={idx}>
                             <td>{item.name}</td>
                             <td>{item.status}</td>
                          </tr>
                           ))
                          : <></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;