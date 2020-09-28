import {Users} from "./Users.js"
import {checkChat} from "./Validation.js"

declare global{
	interface Window { Chat:any}
}

interface chatEvent extends CustomEvent{
	detail: {
		uuid: string
		msg: string
	}
}

export interface Chat{
	init: Function
	send: Function
	receive: Function
	log: Function
	chat: chatEvent
}


export const Chat: Chat = {
	init: function(){
	},
	send: function(msg){
		if(!checkChat(msg)) return false

		Chat.chat.detail.uuid = "me"
		Chat.chat.detail.msg = msg
		dispatchEvent(Chat.chat)
	},
	receive: function(sender, msg){
		console.info(`${sender} -> "${msg}"`)
	},
	log: function(){

	},
	chat: new CustomEvent("chat",{
		detail:{
			uuid: "me",
			msg: ""
		}
	}),
}


window.addEventListener("chat", function(event:CustomEvent){
        let uuid = event.detail.uuid
        let msg = event.detail.msg

	if(uuid != "me"){
		Chat.receive(uuid, msg)
        }
	
	let cont = document.createElement("p")
	let label = document.createElement("label")

	label.setAttribute("uuid", uuid)

	label.classList.add("badge")
	label.classList.add("badge-success")

	label.textContent = Users[uuid].nickname

	cont.classList.add("text-left")
	cont.classList.add("my-0")
	cont.textContent = msg

	let labels = document.querySelectorAll(".chat-msg label")
	if(labels.length == 0 || labels[labels.length-1].getAttribute("uuid") != uuid) document.querySelector(".chat-msg").appendChild(label)
	document.querySelector(".chat-msg").appendChild(cont)
	document.querySelector(".chat-msg").scrollTo(0, document.querySelector(".chat-msg").scrollHeight)
})

window.addEventListener("renameUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	const oldname = event.detail.oldName

	if(uuid == "me"){
		document.querySelector("label#nickname").textContent = Users["me"].nickname 
        }

	
	let label = document.createElement("label")

	label.classList.add("badge")
	label.classList.add("badge-info")
	label.classList.add("text-wrap")
	label.textContent =  `\t "${oldname}" ahora se llama "${Users[uuid].nickname}"`

	document.querySelector(".chat-msg").appendChild(label)
})

document.querySelectorAll(".chat-header").forEach(function(header){
	header.addEventListener("click", function(event){
		let displaying = (document.querySelector(".chat-body") as HTMLElement).style.display
		if(displaying == "none"){
			 document.querySelectorAll(".chat-body").forEach(function(panel:HTMLElement){
				 	panel.style.display = ""
					document.querySelector(".chat-msg").scrollTo(0, document.querySelector(".chat-msg").scrollHeight)
			 })
		}else{
			 document.querySelectorAll(".chat-body").forEach(function(panel:HTMLElement){
				 	panel.style.display = "none"
			 })
		}
	})
})

document.querySelector(".chat-input button").addEventListener("click",function(event){
	let selection = (document.querySelector(".chat-input textarea") as HTMLInputElement)
	Chat.send(selection.value)
	selection.value = ""
	event.preventDefault()
})

document.querySelector(".chat-input textarea").addEventListener("keyup",function(event:KeyboardEvent){
	let selection = (document.querySelector(".chat-input textarea") as HTMLInputElement)
	if(event.code == "Enter" && event.ctrlKey){
		Chat.send(selection.value)
		selection.value = ""
	}	
})

window.Chat = Chat
