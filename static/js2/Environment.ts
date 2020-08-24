export interface Environment{
	room: string
	initialPos:{x: number, y: number, z: number}
	initialRot:{x: number, y: number, z: number}
}

export const Environment:Environment = {
	room : "edges",
	initialPos : {x:0, y:14, z:0},
	initialRot :{x:0, y:0, z:0},
}

export function retrieveData(){
	return {nickname:"luis", uuid:""}
}
