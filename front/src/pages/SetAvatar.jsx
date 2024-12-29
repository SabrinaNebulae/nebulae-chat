import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    };

    const SetProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error("Veuillez sélectionner un avatar", toastOptions);
            return;
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }

            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('chat-user')) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            { isLoading ? (
                <Container className="flex justify-center items-center w-full h-screen bg-black">
                    <img src={loader} alt="loader" />
                </Container>
                ) : (
                <Container className ="flex flex-col justify-center items-center gap-3 w-full h-screen bg-black">
                <div className="title">
                    <h1 className="text-white text-2xl mb-4">Choisissez votre avatar</h1>
                </div>
                <div
                    className="avatars flex gap-4"
                >
                    { avatars.map((avatar, index) => {
                        return (
                            <div
                                key={index}
                                className = {`avatar ${selectedAvatar === index ? 'selected' : ''}  w-full h-[172px] rounded-full grow-0 border-[0.4rem] border-transparent selected:border-blue-400  cursor-pointer transition duration-300 ease-in-out`}
                            >
                                <img
                                    className="h-40"
                                    src={`data:image/svg+xml;base64, ${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button
                    className="submit-btn bg-white text-black px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition duration-300 ease-in-out"
                    onClick={SetProfilePicture}
                >
                    Choisir comme photo de profil
                </button>

                <ToastContainer />
            </Container>
            )}
        </div>
    );
}

const Container = styled.div``;


