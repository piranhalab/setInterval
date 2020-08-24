import { User, Users } from "./Users.js"
import { Environment, retrieveData } from "./Environment.js"

declare global {
    interface Window { Server: any; }
}

export interface Server{
	init: Function
	disconnect: Function
	socket: any
}

export const Server: Server ={
	socket: null,
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

			socket.on("add",function(data){
				console.debug("asfasdfsfasdf", data)
				function check(data){
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

				let res = check(data)

				if(!res) return

				let {room, pos, rot, nickname, uuid}:{room:string, pos:string|any, rot:string|any, nickname:string, uuid:string} = res

				let user = new User({
					uuid:uuid,
					nickname: nickname,
					pos:pos,
					rot:rot,
					room:room
				})

				Users[uuid] = user
				dispatchEvent(user.add)
			})

			socket.on("leave",function(uuid){
				console.info(`user ${uuid}`)
			})	
		})
	},
	disconnect: function(){

	}
}

window.Server = Server
