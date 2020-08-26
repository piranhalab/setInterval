function checkName(uuid, nickname){
	if(uuid == Users[uuid].nickname) return false
	return true
}

function checkPos(uuid, pos){
	if(
		!(pos.hasOwnProperty('x')) ||
		!(pos.hasOwnProperty('y')) ||
		!(pos.hasOwnProperty('z')) ||
		!(typeof pos.x == "number") ||
		!(typeof pos.y == "number") ||
		!(typeof pos.z == "number") ||
		(pos == Users[uuid].pos) 
	) return false
        return true
}

function checkRot(uuid, rot){
	if(
		!(rot.hasOwnProperty('x')) ||
		!(rot.hasOwnProperty('y')) ||
		!(rot.hasOwnProperty('z')) ||
		!(typeof rot.x == "number") ||
		!(typeof rot.y == "number") ||
		!(typeof rot.z == "number") ||
		(rot == Users[uuid].rot) 
	) return false
        return true
}





interface addEvent extends CustomEvent{
	detail: { uuid: string } 
}

interface removeEvent extends CustomEvent{
	detail: { 
		uuid: string
		nickname: string
		pos: {x:number, y:number, z:number}
		rot: {x:number, y:number, z:number}
		room: string
	} 
}

interface renameEvent extends CustomEvent{
	detail: { 
		uuid: string
		oldName: string
	} 
}

interface moveEvent extends CustomEvent{
	detail: { 
		uuid: string
		pos: {x:number, y:number, z:number}
	} 
}

interface rotateEvent extends CustomEvent{
	detail: { 
		uuid: string
		rot: {x:number, y:number, z:number}
	} 
}


interface changeEvent extends CustomEvent{
	detail: { 
		uuid: string
		prop: string
		value: any
	} 
}


export interface User {
	uuid: string
	nickname: string
	pos: {x:number, y:number, z:number}
	rot: {x:number, y:number, z:number}
	room: string
	props:{
		avatar: any
		pass:number
	}
	add: addEvent
	leave: removeEvent
	rename: renameEvent
	move: moveEvent
	rotate: rotateEvent
	change: changeEvent
}

export interface Users{
	[key: string]: User
}

declare global {
    interface Window { Users: any; }
}

export class User implements User{
	constructor(
		{uuid="", nickname ="", pos={}, rot={}, room} : 
		{uuid?:string, nickname?: string, pos?:any, rot?:any, room?:string}  ){

		if(
			!pos.hasOwnProperty('x') || !(typeof pos.x === 'number') ||
			!pos.hasOwnProperty('y') || !(typeof pos.y === 'number') ||
			!pos.hasOwnProperty('z') || !(typeof pos.z === 'number') 
		){
			pos = {x:0, y:0, z:0}
		}

		if(
			!rot.hasOwnProperty('x') || !(typeof rot.x === 'number') ||
			!rot.hasOwnProperty('y') || !(typeof rot.y === 'number') ||
			!rot.hasOwnProperty('z') || !(typeof rot.z === 'number')
		){
			rot = {x:0, y:0, z:0}
		}

		if(!room){
			room = "default"
		}

		if(!uuid || uuid.length!=13){
			uuid = Math.random().toString(16).substr(2)
		}

		this.uuid = uuid
		this.nickname = nickname
		this.pos = pos
		this.rot = rot
		this.room = room
		this.props = {
			avatar: 0,
			pass:0
		}
		this.add = new CustomEvent('addUser', {
			detail: { uuid: uuid } 
		})

		this.leave = new CustomEvent('removeUser', {
			detail: { 
				uuid: this.uuid,
				nickname: this.nickname,
				pos:this.pos,
				rot:this.rot,
				room:this.room,
			} 
		})

		
		this.rename = new CustomEvent('renameUser', {
			detail: { 
				uuid: uuid,
				oldName: nickname
			} 
		})
		this.move = new CustomEvent('moveUser', {
			detail: { 
				uuid: uuid,
				pos: pos
			} 
		})

		this.rotate = new CustomEvent('rotateUser', {
			detail: { 
				uuid: uuid,
				rot:rot
			} 
		})
		
		this.change = new CustomEvent('changeUser', {
			detail: { 
				uuid: uuid,
				prop: "",
				value: ""
			} 
		})
	}
}


export const Users:Users = new Proxy({},{
	get: function(target:any, uuid:string){
		if(uuid == "me" && !target.hasOwnProperty("me")) return new User({})
		return target[uuid]
	},
	set: function(target:any, uuid:string, user:User):boolean{
		/*
		if(target.hasOwnProperty(uuid)){
			return false
		}*/
		if(uuid == 'me'){

			user.add.detail.uuid = 'me'
			user.rename.detail.uuid = 'me'
			user.leave.detail.uuid = 'me'
			user.change.detail.uuid = 'me'
			user.move.detail.uuid = 'me'
			user.rotate.detail.uuid = 'me'
			user.change.detail.uuid = 'me'

			target[uuid] = new Proxy(user,{
				get: function(target, prop){
					if(prop == "pos"){ 
						return new Proxy(target.pos,{
							get: function(pos, prop){
								return pos[prop]
							},
							set: function(pos, prop, value){
								if(
									!pos.hasOwnProperty(prop) ||
									!(typeof value == "number")
								) return false
								pos[prop] = value
								target.move.detail.pos = pos
								dispatchEvent(target.move)
								return true
							}
						})
					}
					if(prop == "rot"){
						return new Proxy(target.rot,{
							get: function(rot, prop){
								return rot[prop]
							},
							set: function(rot, prop, value){
								if(
									!rot.hasOwnProperty(prop) ||
									!(typeof value == "number")
								) return false
								rot[prop] = value
								target.rotate.detail.rot = rot
								dispatchEvent(target.rotate)
								return true
							}
						})
					}
					if(target.props.hasOwnProperty(prop))	return target.props[prop]
					return target[prop]
				},
				set: function(target, prop, value): boolean{

					if(prop == 'uuid' || prop == 'room') return false

					if(prop == 'nickname' && target.nickname!= value){
						target.rename.detail.oldName = target.nickname
						target.nickname = value
						dispatchEvent(target.rename)
						return true
					}else if(prop == 'pos' && target.pos != value){

						if(!checkPos('me', value)) return
						target.pos = value

						target.move.detail.pos = value
						dispatchEvent(target.move)
						return true
					}else if(prop == 'rot' && target.rot != value){
						console.debug(checkRot('me', value),"asdfsdfdsf")

						if(!checkRot('me', value)) return
						target.rot = value
						target.rotate.detail.rot = value
						dispatchEvent(target.rotate)
						return true
					}

					target.props[prop] = value
					
					target.change.detail.prop = prop.toString()
					target.change.detail.value = value

					dispatchEvent(target.change)

					return true
				}
			})
		}else{
			target[uuid] = user
		}

		return true
	},
	has: function(target, prop){
		return target.hasOwnProperty(prop)
	},
	deleteProperty: function(target, user){
		if(user in target){
			delete target[user]
		}
		return true
	}
})

window.Users = Users

window.addEventListener("addUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	console.info(`User '${Users[uuid].nickname}' (${uuid}) enter.`)
})


window.addEventListener("removeUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	const nickname = event.detail.uuid
	console.info(`User '${Users[uuid].nickname}' (${uuid}) left.`)
})

window.addEventListener("renameUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	let oldName = event.detail.oldName
	if(!(uuid == "me")) console.info(`\tUser '${oldName}' (${uuid}) renamed to ${Users[uuid].nickname}`)
})

window.addEventListener("changeUser", function(event:CustomEvent){
	const uuid = event.detail.uuid
	let prop = event.detail.prop
	let value = event.detail.value
	console.debug("chasdf",prop,value)
	if(!(uuid == "me")) console.info(`\tUser '${Users[uuid].nickname}' (${Users[uuid].uuid}) changed ${prop} to ${value}`)
})
