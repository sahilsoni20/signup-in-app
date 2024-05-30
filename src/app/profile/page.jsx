"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetchUserData();
    },[]); //Fetch the data when component mounts

    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/getUserDetails");
        console.log("User details are:", res.data);
        setUserData(res.data.data._id); //set the user data into state
      } catch (error) {
        console.log("Error in fetching user details:", error);
        toast.error("Error in fetching user details");
      }
    };

    const signout = async () => {
      try {
        await axios.get("/api/users/signout");
        console.log("Logout Successful");
        toast.success("Logout Successful");
        router.push("/signup");
      } catch (error) {
        console.log("Logout unsuccessful:", error.message);
        toast.error("Logout unsuccessful: " + error.message);
      }
    };

  return (
    <div className="flex justify-center px-2 text-base items-center md:h-screen relative bottom-[3rem]">
      <div className="text-xl h-[380px] md:h-[480px] w-full md:w-[470px] bg-white shadow-2xl rounded-3xl">
        <div>
          <img
            src="/image/taylorbg.webp"
            alt="Taylor BG Image"
            className="rounded-t-3xl w-full"
          />
        </div>
        <div className="flex justify-center -mb-12">
          <img
            src="/image/taylor.jpg"
            alt="Taylor Image"
            className="rounded-full relative bottom-[4.2rem] border-[7px] border-white w-24 md:w-36"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-3xl">
          <div className="gap-2 flex text-violet-400">
            <p className="text-sm mt-2">Username:</p>{userData ? userData.username : 'Loading...'}
          </div>
          <div className="flex font-light text-lg text-pink-500 tracking-wide">
            <p className="text-sm mr-2 mt-1">Name of user:</p>{userData ? userData.fullName : 'Loading...'}
          </div>
        </div>
        <hr className="bg-black my-6" />
        <button onClick={signout} className="flex justify-center items-center p-2 ml-1 my w-full mt-8 bg-[#a36ccf] hover:bg-[#7036a0] rounded-lg shadow-ishd">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
