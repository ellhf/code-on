import axios from 'axios';
import { MD5 } from "crypto-js";
import { Base64 } from 'js-base64';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '/assets/logo.png';

function AccountRoute() {
  const history = useHistory();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function signin() {
    const authString = Base64.encode(`${username}:${MD5(password)}`);
    const authorization = `Basic ${authString}`;
    console.log(authorization);
    axios.post('/api/v1/sessions', {}, {
      headers: {
        'Authorization': authorization,
      }
    }).then((res) => {
      const { success, data } = res.data;
      if (success) {
        localStorage.setItem('token', data);
        history.replace('/');
      }
    }).catch((reason) => {
      console.log(reason);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登陆 Code On
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            或者{' '}
            <a
              href="#"
              className="font-medium text-red-600 hover:text-red-500"
            >
              点击注册
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                用户名 / 邮箱
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="用户名 / 邮箱"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="密码"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                记住我
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-red-600 hover:text-red-500"
              >
                忘记密码
              </a>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={signin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-red-700 group-hover:text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              登陆
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountRoute;
