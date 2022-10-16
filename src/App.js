import { useRef, useState } from "react";
import { data } from "./data";
import "./App.css";
import { makeApiCall, typeOfIntent } from "./utils";

function App() {
  const [messages,updateMesaages] = useState([]);
  const [isWaiting,setIsWaiting] = useState(false);
  const inputRef = useRef(null);
  const handleSubmit = async()=>{
    const message = inputRef.current?.value || "";
    if(message.trim()){
      updateMesaages((prevState)=>[...prevState,{user:'you',message}]);
      setIsWaiting(true);
      // inputRef.current.value = "";

      try{
         const response = await makeApiCall('',{text:message},'POST',true);
         console.log(response);
         const intent = typeOfIntent(response);
         if(intent.isAPICall){

         }else{
          setIsWaiting(false);
          updateMesaages((prevState)=>[...prevState,{user:'bot',message:intent.value}]);
         }
      }catch(err){
          console.log(err);
          setIsWaiting(false);
          updateMesaages((prevState)=>[...prevState,{user:'bot',message:'Something Went Wrong !!'}]);
      }
    }
  }  
  return (
    <main className="chat_box">
      <header className="chat_header">
             <h2 className="chat_header_text">Book EV</h2>
      </header>
      <div className="chat_container">
        {messages.map((message,id)=>{
          return <MessageBox key={id} user={message.user} message={message.message}/>
        })}
        {isWaiting && <span className="typing_message"> bot is typing...</span>}
      </div>
      <div className="chat_footer">
        <input className="chat_input" ref={inputRef} placeholder="type message..."/>
        <button className="send_button" onClick={handleSubmit}>Send</button>
      </div>
    </main>
  );
}

const MessageBox = ({message='',user='bot'})=>{
  return <div className={`message_box ${user==="bot"?"bot_message_container_box":"user_message_box"}`}>
           <div  className={`${user==="bot"?"bot_message_container":"user_message_container" } message_container`}>
               <div className="message_label">{user==='bot'?'Bot':'You'}</div>
               <div className="message_text">{message}</div>
           </div>
         </div>
}

export default App;
