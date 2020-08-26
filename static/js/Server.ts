import { User, Users } from "./Users.js"
import { Environment, retrieveData } from "./Environment.js"
import {check, checkName, checkPos, checkRot, checkProp, checkChat} from "./Validation.js"

declare global {
    interface Window { Server: any; }
}
	
export interface Server{
	init: Function
	reconnect: boolean
	disconnect: Function
	socket: any
}
	/*
function check(data:any[]):boolean|any{
	if(!data) return false
	if(
		!(Array.isArray(data)) ||
		data.length != 9
	) return false
	
	const uuid = data[0];
	const nickname = data[1];
	const pos = {
		x: data[2],
		y: data[3],
		z: data[4],
	};
	
	const rot = {
		x: data[5],
		y: data[6],
		z: data[7],
	};

	const room = data[8]

	if(
		!(typeof uuid === "string") ||
		!(typeof nickname === "string") ||
		!(typeof room === "string") ||
		!(uuid.length == 13 ) 
	) return false

	if(
		!pos.hasOwnProperty('x') || !(typeof pos.x === 'number') ||
		!pos.hasOwnProperty('y') || !(typeof pos.y === 'number') ||
		!pos.hasOwnProperty('z') || !(typeof pos.z === 'number')
	) return false
	
	if(
		!rot.hasOwnProperty('x') || !(typeof rot.x === 'number') ||
		!rot.hasOwnProperty('y') || !(typeof rot.y === 'number') ||
		!rot.hasOwnProperty('z') || !(typeof rot.z === 'number')
	) return false


	return {
		uuid: uuid,
		nickname: nickname,
		room: room,
		pos: pos,
		rot: rot
	}			
}

function checkName(data){
        if(
                !(Array.isArray(data) && data.length==2) ||
                !(typeof data[0] === "string" && data[0].length == 13) ||
                !(typeof data[1] === "string")
        ) return false
        let uuid = data[0]
        let nickname = data[1]

        if(uuid == Users.me.uuid) return false
        if(nickname == Users[uuid].nickname) return false
        return {nickname: nickname, uuid: uuid}
}

function checkPos(data){
	if(
		!(Array.isArray(data) && data.length==4) ||
		!(typeof data[0] === "string" && data[0].length == 13) ||
		!(typeof data[1] === "number") || 
		!(typeof data[2] === "number") || 
		!(typeof data[3] === "number")
	) return false
        let uuid = data[0]
	let pos = {
		x: data[1],
		y: data[2],
		z: data[3]
	}
        if(uuid == Users.me.uuid) return false
	if(pos == Users[uuid].pos) return false
	return {
		uuid:uuid,
		pos:pos
	}	
}

function checkRot(data){
	if(
		!(Array.isArray(data) && data.length==4) ||
		!(typeof data[0] === "string" && data[0].length == 13) ||
		!(typeof data[1] === "number") || 
		!(typeof data[2] === "number") || 
		!(typeof data[3] === "number")
	) return false
        let uuid = data[0]
	let rot = {
		x: data[1],
		y: data[2],
		z: data[3]
	}
        if(uuid == Users.me.uuid) return false
	if(rot == Users[uuid].rot) return false
	return {
		uuid:uuid,
		rot:rot
	}
}

function checkProp(data){
        if(
                !(Array.isArray(data) && data.length==3) ||
                !(typeof data[0] === "string" && data[0].length == 13) ||
                !(typeof data[1] === "string") 
        ) return false

        let uuid = data[0]
        let prop = data[1]
        let value = data[2]

        if(uuid == Users.me.uuid) return false
        if(!Users[uuid].props.hasOwnProperty(prop)) return false
        if(value == Users[uuid].props[prop]) return false
        return {
                uuid: uuid,
                prop: prop,
                value: value
        }
}


function checkChat(data){
        if(
                !(Array.isArray(data) && data.length==2) ||
                !(typeof data[0] === "string" && data[0].length == 13) ||
                !(typeof data[1] === "string") 
        ) return false

        let uuid = data[0]
	let msg = data[1]

	if(uuid == Users.me.uuid) return false
	if(msg.length>200) return false
	return {
		uuid: uuid,
		msg: msg
	}
}
*/
export const Server: Server ={
	socket: null,
	reconnect:true,
	init: function(){
		let {nickname, uuid} = retrieveData()
		let pos = Environment.initialPos
		let rot = Environment.initialRot
		let room = Environment.room
		
		let user = new User({
			uuid:uuid,
			nickname: nickname,
			pos:pos,
			rot:rot,
			room:room
		})		

		const socket = io("http://localhost:3000",{query:`uuid=${user.uuid}&room=${user.room}&nickname=${user.nickname}&pos=${JSON.stringify(user.pos)}&rot=${JSON.stringify(user.rot)}`})

		Users.me = user
		
		socket.on("connect", function(conn:any){
			Server.socket = socket

			socket.on("add",function(data){
				
				let res = check(data)

				if(!res) return

				let {room, pos, rot, nickname, uuid}:{room:string, pos:string|any, rot:string|any, nickname:string, uuid:string} = res


				if(!Users.hasOwnProperty(uuid) && Users.me.uuid!=uuid){
					let user = new User({
						uuid:uuid,
						nickname: nickname,
						pos:pos,
						rot:rot,
						room:room
					})
					Users[uuid] = user
					dispatchEvent(user.add)
				}
			})

			socket.on("leave",function(uuid){
				if(Users.me.uuid == uuid) return
				dispatchEvent(Users[uuid].leave)
				delete Users[uuid]
			})	
			
			socket.on("rename",function(data){
				let res = checkName(data)
				if(!res) return

				let {uuid, nickname} = res

				Users[uuid].rename.detail.oldName = Users[uuid].nickname
				Users[uuid].nickname = nickname

				dispatchEvent(Users[uuid].rename)
			})	
			
			socket.on("move",function(data){
				let res = checkPos(data)
				if(!res) return

				let {uuid, pos} = res

				Users[uuid].move.detail.pos = pos
				Users[uuid].pos = pos

				dispatchEvent(Users[uuid].move)
			})	

			socket.on("rotate",function(data){
				let res = checkRot(data)
				if(!res) return

				let {uuid, rot} = res

				Users[uuid].rotate.detail.rot = rot
				Users[uuid].rot = rot

				dispatchEvent(Users[uuid].rotate)
			})	

			socket.on("change",function(data){
				let res = checkProp(data)
				if(!res) return

				let {uuid, prop, value} = res

				Users[uuid].change.detail.prop = prop
				Users[uuid].change.detail.value = value

				Users[uuid].props[prop] = value
				dispatchEvent(Users[uuid].change)
			})	

			socket.on("chat",function(data){
				console.debug("CHAT",data)
                                let res = checkChat(data)
				console.debug("CHAT", res)
                                if(!res) return

				let {uuid, msg} = res

				let chatEvent = new CustomEvent("chat",{
					detail:{
						uuid: uuid,
						msg: msg
					}
				})

                                dispatchEvent(chatEvent)
                        })

			socket.on('disconnect', function() {
				Server.socket.socket.reconnect();
			})
		})
	},
	disconnect: function(){

	}
}

window.Server = Server

window.addEventListener("renameUser", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let oldName = event.detail.oldName
	if(uuid == "me" && Server.socket){
		Server.socket.emit("rename",Users[uuid].nickname)
	}
})

window.addEventListener("moveUser", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let pos = event.detail.pos
	if(uuid == "me" && Server.socket){
		Server.socket.emit("move",[pos.x, pos.y, pos.z])
	}
})

window.addEventListener("rotateUser", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let rot = event.detail.rot
	if(uuid == "me" && Server.socket){
		Server.socket.emit("rotate",[rot.x, rot.y, rot.z])
	}
})

window.addEventListener("changeUser", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let prop = event.detail.prop
	let value = event.detail.value

	if(uuid == "me" && Server.socket){
		Server.socket.emit("change",[prop,value])
	}
})

window.addEventListener("chat", function(event:CustomEvent){
        const uuid = event.detail.uuid
	let msg = event.detail.msg
	console.debug("asfsdf","eventochat")
	if(uuid == "me" && Server.socket){
		Server.socket.emit("chat",msg)
	}
})
