import { useState,useEffect } from 'react';
import axios from "axios";

export default function MyList({ user, setUser }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [inputValues, setInputValues] = useState({
      id: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      list: []
    });

    const getData = () => {
          axios.get("http://localhost:4000/accounts/" + user.id)
            .then(function (result) {
                console.log(inputValues.list);
              setInputValues(result.data);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);
    
    // eslint-disable-next-line
    const [updateItem, setUpdateItem] = useState({
      id: '',
      task: '',
      priority: '',
      deadline: '',
      status:'Pending'
    });
  
    const addToList = () => {
        const newItem = {
          "id": generateRandomString(),
          "task": document.getElementById("task").value,
          "priority": document.getElementById("priority").value,
          "deadline": document.getElementById("deadline").value,
          "status":"Pending"
        };
    
        const newList = [...inputValues.list, newItem];
        
        axios.patch("http://localhost:4000/accounts/" + user.id, { list: newList })
          .then(response => {
            console.log(response.data);
            document.getElementById("task").value = null;
            document.getElementById("priority").value = null;
            document.getElementById("deadline").value = null;
          })
          .catch(error => console.error(error));
    
        setInputValues(prevState => ({ ...prevState, list: newList }));
    };
  
    const updateList = () => {
      const newItem = {
        "id": document.getElementById("idU").value,
        "task": document.getElementById("taskU").value,
        "priority": document.getElementById("priorityU").value,
        "deadline": document.getElementById("deadlineU").value,
        "status": document.getElementById("statusU").value
      };

      let list = [...inputValues.list];
      list = list.filter((tasks) => tasks.id !== newItem.id); 

      const newList = [...list, newItem];

      axios.patch("http://localhost:4000/accounts/" + user.id, { list: newList })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => console.error(error));
        
        setInputValues(prevState => ({ ...prevState, list: newList }));
        setIsUpdating(false);
    };
  
    const remove = (listItem) => {
        let newList = [...inputValues.list];
        newList = newList.filter((tasks) => tasks.id !== listItem); 
  
        axios.patch("http://localhost:4000/accounts/" + user.id, { list: newList })
            .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error));
    }
  
    const update = (listItem) => {
      setIsUpdating(true);
      setUpdateItem({
        id: listItem.id,
        task: listItem.task,
        priority: listItem.priority,
        deadline: listItem.deadline,
        status: listItem.status,
      });
  
      document.getElementById("idU").value = listItem.id;
      document.getElementById("idU").readOnly = true;
      document.getElementById("taskU").value = listItem.task;
      document.getElementById("priorityU").value = listItem.priority;
      document.getElementById("deadlineU").value = listItem.deadline;
      document.getElementById("statusU").value = listItem.status;
    }

    return(
        <div className='mylistContainer'>
            <div className='listBox w3-round-large w3-white w3-card-4'>
                <h1 style={{fontWeight:'500'}} className="w3-text-blue">To Do List</h1>
                <div className='listFormat w3-large'>
                    <div style={{width:"20vw",backgroundColor:'gray',padding:'1vw'}}>Deadline</div>
                    <div style={{width:"45vw",backgroundColor:'gray',padding:'1vw'}}>Task</div>
                    <div style={{width:"15vw",backgroundColor:'gray',padding:'1vw'}}>Priority</div>
                    <div style={{width:"10vw",backgroundColor:'gray',padding:'1vw'}}>Status</div>
                    <div style={{width:"10vw",backgroundColor:'gray',padding:'1vw'}}>Edit</div>
                </div>
                
                <div>
                    {inputValues.list.length?inputValues.list.map((items)=>(
                        <div key={items.id} className='taskItems' style={isExpired}>
                            <div style={{width:"20vw",paddingLeft:'1vw'}}>{items.deadline}</div>
                            <div style={{width:"45vw",paddingLeft:'1vw'}}>{items.task}</div>
                            {setPriority(items.priority)}
                            {setStatus(items)}
                            <div style={{width:"10vw",display:'flex',justifyContent:'space-evenly'}}>
                                <button style={{fontSize:'large',marginRight:'1vw',border:'none'}} onClick={() => update(items)}>&#9998;</button>
                                <button style={{fontSize:'x-large',marginRight:'1vw',border:'none'}} onClick={() => remove(items.id)}>&#128465;</button>
                            </div>
                        </div>
                    )):
                    <div>
                        No list items.<br/>
                    </div>
                    }
                </div>
            </div>
            
            <div className='listBox w3-round-large w3-white w3-card-4'>
                
                <div style={isUpdating?{display:'block',backgroundColor:'palegreen'}:{display:'none'}}>
                <h1 style={{fontWeight:'500'}} className="w3-text-blue">Update this task</h1>
                    <label htmlFor="idU">Item serial key</label><br />
                    <input type="text" id="idU" name="idU"/><br /><br />
                    <label htmlFor="taskU">Task</label><br />
                    <input type="text" id="taskU" name="taskU" /><br /><br />
                    <label htmlFor="priorityU">Priority</label><br />
                    <select name='priorityU' id='priorityU' >
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                    </select>    
                    <br /><br />
                    <label htmlFor="deadlineU">Deadline</label><br />
                    <input type="date" id="deadlineU" required/><br /><br />
                    <label htmlFor="statusU">Status</label><br />
                    <select name='statusU' id='statusU'>
                        <option value='Pending'>Pending</option>
                        <option value='Complete'>Complete</option>
                    </select><br /><br />
                    <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={updateList}>Update</button><br /><br />
                </div>

                <div style={!isUpdating?{display:'block'}:{display:'none'}}>
                <h1 style={{fontWeight:'500'}} className="w3-text-blue">Add tasks to the list</h1>
                    <label htmlFor="task">Task</label><br />
                    <input type="text" id="task" name="task"/><br /><br />
                    <label htmlFor="priority">Priority</label><br />
                    <select name='priority' id='priority'>
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                    </select>    
                    <br /><br />
                    <label htmlFor="deadline">Deadline</label><br />
                    <input type="date" id="deadline"/><br /><br />   
                    <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={addToList}>Add to list</button><br /><br />
                </div>
            </div>
        </div>
    );
}

function setPriority(priorityNum)
{
    if(priorityNum==='Low'){
        return(
            <div className='w3-green' style={{width:"15vw",paddingLeft:'1vw'}}>Low</div>
        );
    }
    if(priorityNum==='Medium'){
        return(
            <div className='w3-orange' style={{width:"15vw",paddingLeft:'1vw'}}>Medium</div>
        );
    }
    if(priorityNum==='High'){
        return(
            <div className='w3-red' style={{width:"15vw",paddingLeft:'1vw'}}>High</div>
        );
    }
}

function setStatus(item)
{
    if(item.status==='Pending'){
        return(
            <div className='w3-gray' style={{width:"10vw",color:'darkgray',paddingLeft:'1vw'}}>Pending</div>
        );
    }
    if(item.status==='Complete'){
        return(
            <div className='w3-blue' style={{width:"10vw",paddingLeft:'1vw'}}>Complete</div>
        );
    }
}
// eslint-disable-next-line
function isExpired(deadline)
{
    const date = new Date(deadline);
    console.log(date);

    const slash = str.indexOf('/');
    const dash = str.indexOf('-');

    if (slash !== -1) {
        
    }

    if (dash !== -1) {
        
    }

    return({});
}

function generateRandomString(){
    const characters = '0123456789';
    let randomString = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    
    return randomString;
};