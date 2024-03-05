import React, { useState } from 'react'
import axios from 'axios';

function Note({id, content, onButtonClick}) {
    

    const [varcontent,setContent] = useState(content)

    const handleUpdate = async () => {

    const Endpoint = 'http://localhost:5000/update';

    try {
        // Make a POST request with Axios

        const credentials = {
        'id' : id,
        'updated_note' : varcontent,
        };
        console.log(credentials)
        const response = await axios.put(Endpoint, credentials, {
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
        console.log('Update error:', error);
  
        // Update the registration status
        ;
      }

    }

    const handleDelete = async () => {

        const Endpoint = 'http://localhost:5000/deletenote';
    
        try {
            // Make a POST request with Axios
    
            const credentials = {
            'id' : id,
            };
            console.log(credentials)
            const response = await axios.post(Endpoint, credentials, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
            // Handle successful registration
            console.log(response.data);
            onButtonClick()
            
      
            // Update the registration status
            ;
          } catch (error) {
            // Handle registration error
            console.log('Update error:', error);
      
            // Update the registration status
            ;
          }
    
        }

        
  return (
    <div>
      <textarea value={varcontent} onChange={(e) => setContent(e.target.value)}></textarea>
      <button type="Update" onClick={handleUpdate}>Update</button>&nbsp;
      <button type="button"  onClick={() => {
          handleDelete();
          onButtonClick();
        }}>Delete</button>
    </div>
  )
}

export default Note
