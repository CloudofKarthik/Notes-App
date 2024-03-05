import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import Note from '../Note/Note'

function Dashboard() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const [noteUsers, setNoteUsers] = useState([]);
    const [newNote, setNewNote] = useState();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        console.log(user)
        const apiUrl = 'http://localhost:5000/getnotes';
        
    
        axios.get(apiUrl, {params: {user:JSON.stringify(user)},
          })
          .then(response => {
            // Set the fetched data to the state
            setNoteUsers(response.data);
            console.log(noteUsers)
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [shouldRender]);

    //const [notes, setNotes] = useState([])
    //const [user_id,setUser_id] = useState(user.user_id)
    //user_id = user.user_id
    if(!user) return <h1>Not Logged In</h1>


    const handleAddingNotes = async () => {
        const Endpoint = 'http://localhost:5000/setnotes';


        try {
            // Make a POST request with Axios

            const credentials = {
            'user_id' : user.user_id,
            'new_note' : newNote,
            };
            const response = await axios.post(Endpoint, credentials, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
            // Handle successful registration
            console.log(response.data);
            
      
            // Update the registration status
            ;
          } catch (error) {
            // Handle registration error
            console.error('Logout error:', error.response.data);
      
            // Update the registration status
            ;
          }

          const apiUrl = 'http://localhost:5000/getnotes';
        
    
        axios.get(apiUrl, {params: {user:JSON.stringify(user)},
          })
          .then(response => {
            // Set the fetched data to the state
            setNoteUsers(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
          setNewNote('')
    }

    const handleLogout = async () => {
        setUser(null)

    const Endpoint = 'http://localhost:5000/logout';

    try {
        // Make a POST request with Axios
        const response = await axios.post(Endpoint);
  
        // Handle successful registration
        console.log('Logout successful:', response.data);
  
        // Update the registration status
        ;
      } catch (error) {
        // Handle registration error
        console.error('Logout error:', error.response.data);
  
        // Update the registration status
        ;
      }
    }

    const handleButtonClick = async () => {

        console.log('testing')

        setShouldRender(prev => !prev);

    }      

    const handleUp = async () => {


    }    
    const handleDown = async () => {


    } 
    
    
  return (
    <div>
      Welcome! : {user.username}
      <div>
      <ul>
        {noteUsers.map(noteUser => (
          <Note id={noteUser.id} content={noteUser.content} onButtonClick={handleButtonClick} > </Note>
        ))}
      </ul>
      </div>
      <label>
          Add New Note: 
          <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          <button id ='Addnote' onClick={handleAddingNotes}>Add</button>
        </label>
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>    
    </div>
  )
}

export default Dashboard
