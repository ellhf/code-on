import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Base64 } from 'js-base64';

import './UserProfile.css'

function useToken() {
  const payloadStr = localStorage.getItem('token')?.split('\.')[1] ?? null;
  if (payloadStr) {
    const user = JSON.parse(Base64.decode(payloadStr));
    if (user.exp * 1000 < +new Date()) {
      localStorage.removeItem('token');
      return null;
    } else {
      user.iat = new Date(user.iat * 1000);
      user.exp = new Date(user.exp * 1000);
      return user;
    }
  }
  else return null;
}

function UserProfile() {
  const user = useToken();
  const history = useHistory();
  const [ dropDownShow, setDropDownState ] = useState(false);
  return (
    <div className="ml-3 relative">
      {/* Profile dropdown */}
      <div>
        <button
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setDropDownState((val) => !val)}
        >
          <span className="sr-only">打开用户菜单</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://avatars.githubusercontent.com/u/57035785?s=460&u=f5d89751e98355a80c030fa1771880b98586fa75&v=4"
          />
        </button>
      </div>
      <div
        className={
          [
            'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5',
            'dropdown',
            dropDownShow ? ` dropdown--show` : ` dropdown--hidden`,
          ].join(' ')
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <NavLink
          to={`/user/${user.id}`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => setDropDownState(false)}
        >
          个人主页
        </NavLink>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          设置
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={() => {
            setDropDownState(false);
            localStorage.removeItem('token');
            history.replace('/');
          }}
        >
          登出
        </a>
      </div>
    </div>
  );
}

export default UserProfile;
