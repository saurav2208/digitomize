import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useLoaderData, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { useUserAuth } from '../../context/UserAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import SignoutButton from "../components/SignoutButton"
import { useUserAuth } from '../../context/UserAuthContext';
import NewNavbar from "../../components/NewNavbar";
import { Skeleton } from "@mui/material";

export default function UserDashboard() {
  // const username = data.personal_data.username
  // const { user } = useUserAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  async function handleLogout() {
    await auth.signOut()
    toast.success("Logged out successfully")
    console.log("before");
    navigate('/login?message=Logged out successfully')
  }
  let user = false;
  useEffect(() => {
    // Assuming useUserAuth fetches user data asynchronously
    async function fetchUserData() {
      try {
        user  = await useUserAuth();
        console.log("HERRREE:", user);
        // Assuming there's a condition to check if user data is available
        if (user) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false); // Handle errors by setting loading to false
      }
    }

    fetchUserData();
  }, []);
  if (loading) {
    return (
      <div className="m-auto flex flex-col items-cente r w-4/5 my-12">
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%"}}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%"}}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.600", width:"30%" }}/>
        <Skeleton variant="text" sx={{ fontSize: "3rem", bgcolor: "grey.600"}}/>
        </div>
    )
  }
  if (!loading) {
    return (
      <>
        <ToastContainer />
        <NewNavbar />
        <div className='flex mt-8 md:mt-0'>
          <div className='flex w-full min-h-screen flex-col items-center md:pt-12 gap-12 '>
            <div className="w-[100%] md:w-3/4 flex items-center  justify-between  ">
              <div className=" Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full flex gap-3" >
                <img src={user.photoURL} alt="avatar" />
                <h2 className='text-2xl'>{`${user.displayName}'s Dashboard`}</h2>
              </div>
              <div className="">
                <SignoutButton isDisabled={false} btnName="sign out" backgroundColor="bg-red-600" onClickFunction={handleLogout} />
              </div>
            </div>

            <div className="container flex  items-center px-[5%] flex-col">
              <div className='flex items-start '>
                <nav className=''>
                  <ul className="flex flex-nowrap text-md font-medium text-center text-gray-400 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-4">
                      <NavLink to='personal' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>
                        Personal Info</NavLink>
                    </li>
                    <li className="mr-4">
                      <NavLink to='ratings' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Ratings</NavLink>
                    </li>
                    <li className="">
                      <NavLink to='github' className={({ isActive }) => isActive ? "inline-block p-4 rounded-t-lg text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 " : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "}>Github</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="container w-[100%]  h-fit bg-custom-bg rounded-[10px] border border-custom-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Outlet />
              </div>
            </div>
            {/* <SignoutButton /> */}
          </div>
        </div>
      </>
    )
  }
}









// <NavLink to='personal' className="border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl " >
//               Personal Info
//             </NavLink>

//             <NavLink to='ratings' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Ranking 
//             </NavLink>
//             <NavLink to='github' className="ms-8 md:ms-12 border-b-2 border-transparent hover:border-fuchsia-700 transition md:text-2xl">
//                 Github Repos
//             </NavLink>