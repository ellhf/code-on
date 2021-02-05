import React from 'react';

import builtWithLove from '/assets/built-with-love.svg';
import containsCatGifs from '/assets/contains-cat-gifs.svg';
import poweredByElectricity from '/assets/powered-by-electricity.svg';
import usesHtml from '/assets/uses-html.svg';

function AboutRoute() {
  return (
    <main className="text-sm pb-10">
      <section className="flex flex-row justify-center bg-ivory w-full h-16 items-center shadow-lg">
        <span className="text-lg font-mono italic px-8 text-turquoise">--&gt;&gt;</span>
        {[
          builtWithLove, containsCatGifs, poweredByElectricity, usesHtml
        ].map((url) => <img className="h-7 mx-2" src={url} key={url} />)}
        <span className="text-lg font-mono italic px-8 text-turquoise">&lt;&lt;--</span>
      </section>
      <div className="space-y-8">
        <section className="mx-56 mt-12">
          <p>
            <em>
              <q>
                Tell me and I forget. Teach me and I remember. Involve me
                and I learn.
              </q>{' '}
              -- Benjamin Franklin
            </em>
          </p>
        </section>
        <section className="space-y-1 mx-56">
          <h1 className="my-4 text-center">本网站</h1>
          <p>「Code-On」是一个由刘海峰设计，建立并运行的网站。</p>
          <p>
            本网站旨在帮助前端人学习并掌握前端知识，内容分享涵盖HTML、CSS、JavaScript、Node.js、数据库、前端框架及其他前沿知识。
          </p>
          <p>此网站开设的另一大用途是记录自己对知识的总结。</p>
        </section>
        <section className="space-y-1 mx-56">
          <h1 className="my-4 text-center">作者</h1>
          <p>刘海峰</p>
          <p>
            Github：
            <a
              className="underline italic"
              target="_blank"
              href="https://github.com/velkinto"
            >
              velkinto
            </a>
          </p>
          <p>
            联系方式：
            <a
              className="underline italic"
              href="mailto:velkinta@gmail.com"
            >
              velkinta@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default AboutRoute;
