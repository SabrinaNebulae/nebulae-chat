import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect(() => {
        if(localStorage.getItem('chat-user')) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if(data.status === false ) {
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true) {
                localStorage.setItem('chat-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const { password, username } = values;
        if (username.length < 3) {
            toast.error(
                "Votre pseudo est trop court, il doit contenir au moins 4 caractères.",
                toastOptions
            );
            return false;
        } else if (username.length === 0) {
            toast.error(
                "Veuillez entrer un nom d'utilisateur valide.",
                toastOptions
            );
            return false;
        } else if (password.length === 0) {
            toast.error(
                "Veuillez entrer un mot de passe valide.",
                toastOptions
            );
            return false;
        }
        return true;
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        GM Chat
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Se connecter
                            </h1>
                            <FormContainer>
                                <form
                                    onSubmit={(event) => handleSubmit(event)}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Pseudo
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => handleChange(e)}
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Votre nom d'utilisateur"
                                            required=""
                                            minLength="3"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            onChange={(e) => handleChange(e)}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Se connecter
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Vous n'avez pas encore de compte ?{" "}
                                        <Link
                                            to="/register"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            S'inscrire
                                        </Link>
                                    </p>
                                </form>
                            </FormContainer>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const FormContainer = styled.div``;

export default Login;
