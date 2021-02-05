import React from 'react';
import { Base64 } from 'js-base64';
import { NavLink, Switch, Route } from 'react-router-dom';

import logo from '/assets/logo.png';
import UserProfile from './UserProfile';

export function CHeaderFillBanner() {
  return (
    <div className="bg-gray-900 bg-bottom bg-cover bg-no-repeat bg-code h500px">
      <div className="h-full pt-48 pl-16 flex items-left flex-col font-light">
        <p className="text-white text-6xl italic">
          {'VSCode上号'.split('').map((text) => (
            <span className="slipin" key={text}>
              <i>{text}</i>
            </span>
          ))}
        </p>
        <p className="text-white text-6xl h-24 italic pl-24 mt-8">
          {'一起Coding'.split('').map((text) => (
            <span className="slipin" key={text}>
              <i>{text}</i>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export function CHeaderFillBackground() {
  return <div className="w-full h-16 bg-blackolive" />;
}

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

export function CPureHeader(props: any) {
  const user = useToken();
  return (
    <header>
      <div className="flex justify-between w-full absolute h-16 px-12 top-0 z-10 bg-black bg-opacity-50">
        <nav className="flex items-center justify-center h-16">
          <NavLink to="/" className="text-bittersweet flex items-center h-full">
            <img src={logo} className="h-8" />
            <span className="inline-block text-2xl font-semibold ml-4">
              Code On
            </span>
          </NavLink>
          <div className="ml-12">
            {props?.navlinks?.map((nav: any) => (
              <NavLink
                to={nav.path}
                key={nav.path}
                className="navlink inline-block text-lg h-full font-normal relative transition-all text-ivory py-1 px-3 rounded ml-12 hover:bg-gray-600 hover:bg-opacity-50"
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="flex items-center justify-center h-16 space-x-8">
          {user ? <UserProfile /> : <NavLink
            to="/account"
            className="text-green-500 border-green-500 text-base rounded border-2 px-5 py-1 hover:text-white hover:border-white transition-all"
          >登陆 / 注册</NavLink>}
        </div>
      </div>
      {props.children}
    </header>
  );
}

export function CHeader() {
  return (
    <CPureHeader
      navlinks={[
        { path: '/article', name: '文章' },
        { path: '/about', name: '关于' },
      ]}
    >
      <Switch>
        <Route exact path="/" component={CHeaderFillBanner} />
        <Route path="*" component={CHeaderFillBackground} />
      </Switch>
    </CPureHeader>
  );
}
