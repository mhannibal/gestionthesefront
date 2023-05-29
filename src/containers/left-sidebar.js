import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useAuth } from '../app/auth-context';
import { useGetStudentProfilesQuery, useGetUsersQuery } from '../service';
import { parseJwt } from '../service/jwt_utils';
import UserIcon from '@heroicons/react/24/outline/UserIcon';

function LeftSideBar({ routes, userType }) {
    const location = useLocation();
    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    const authContext = useAuth();
    const userQuery = useGetUsersQuery()
    const user_id = parseJwt(authContext.accessToken).user_id;


    if (userQuery.isSuccess) {
        const user = userQuery.data.filter(u => u.id == user_id)[0];
        const username = `${user.first_name} ${user.last_name}`;
        return (
            <div className="drawer-side ">
                <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
                <ul className="menu  pt-2 w-80 bg-base-100 text-base-content">
                    <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                        <XMarkIcon className="h-5 inline-block w-5" />
                    </button>

                    <li className="mb-2 font-semibold text-xl">

                        <Link to={'/app/dashboard'}><img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo" />{userType}</Link> </li>
                        <h1 className='px-4 pb-2 flex flex-row items-center font-semibold'>
                            <UserIcon className='w-8 h-8' />
                            {username} 
                        </h1>
                    {
                        routes.map((route, k) => {
                            return (
                                <li className="" key={k}>
                                    {
                                        (<NavLink
                                            end
                                            to={`/app${route.path}`}
                                            className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default LeftSideBar;