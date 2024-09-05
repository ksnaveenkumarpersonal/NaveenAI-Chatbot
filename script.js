const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "AIzaSyDnkuCn6O32onzjwjSQOUZEP02dlprvLvQ";
const API_URL=   `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const inputInitHeight = chatInput.scrollHeight;
const createChatLi =(message, ClassName) =>{
    // create a chat <li> with element a passed message a className->
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",ClassName);
    let chatContent = ClassName === "outgoing"? `<p></p>`:` <span class="material-symbols-outlined"> smart_toy </span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;

}

const generateResponse = async () => {
  const textElement = chatbox


  try{
    const response = await fetch(API_URL,{
      method:"Post",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        contents:[{
          role:"user",
          parts:[{text: userMessage}]
        }]
      })

    });
    const data = await response.json();

    const apiresponse = data?.candidates[0].content.parts[0].text;
    textElement.innerText = apiresponse;


  }catch(error){
    chatbox.classList.add("error");
    chatbox.textContent = "Oops! something went wrong. please try again.";
  }finally{
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
  }
}
    

 

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value ="";
    chatInput.style.height = `${inputInitHeight}px`;

    // append user message to the chat box-->
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(()=>{
        //display Thiniking message while waiting for the response-->
        chatbox.appendChild(createChatLi("Thinking..!","incoming"));
        generateResponse();
    },600);
}

chatInput.addEventListener("input",() => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
})


chatInput.addEventListener("keydown",(e) => {
  if (e.key === "Enter" && !e.shiftkey && window.innerWidth > 800 ) {
    e.preventDefault ();
    handleChat();
  }
});
 



chatbotCloseBtn.addEventListener('click',() => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener('click',() => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click" , handleChat);



// delete message --->
