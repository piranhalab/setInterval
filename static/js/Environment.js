export const Environment = {
    room: "edges",
    initialPos: { x: 0, y: 14, z: 0 },
    initialRot: { x: 0, y: 0, z: 0 },
};
function saveData() {
}
export function retrieveData() {
    /*
    let params:any = {}

    let uuid:string|null = localStorage.getItem("uuid")
    let nickname:string|null = localStorage.getItem("nickname")
    let props:string|null = localStorage.getItem("props")


    if(!uuid || uuid.length!=13){
        uuid = Math.random().toString(16).substr(2)
    }

    if(!nickname){
        nickname = `anon-${Math.random().toString(16).substr(2,4)}`
    }

    if(!props){
        try{
            props = JSON.parse(props)
        }catch(e){
            props = `{}`
        }
    }



    let url = new URL(window.location.href);

    nickname:string = url.searchParams.get("nickname");
    let avatar:string = url.searchParams.get("avatar");
     */
    return { nickname: "luis", uuid: "" };
}
