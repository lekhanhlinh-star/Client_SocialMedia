import axios from "axios";
import React, {useEffect} from "react";
import Header_chat from "../../components/Chat/Header_chat"


export const Chat_page = () => {
    useEffect(() => {

        const fetchChats = async () => {
            const token = localStorage.getItem("token");

            await axios.get("http://localhost:5000/api/v1/chat", {
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
        fetchChats()

    }, []);

    return (<>
        <div>
            <Header_chat avatar={""}></Header_chat>


        </div>

    </>);
};