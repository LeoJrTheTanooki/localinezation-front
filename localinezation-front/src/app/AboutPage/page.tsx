"use client";

import React from "react";

const AboutPage = () => {
  const englishText = [
    <h1 className="text-center font-bold text-gray-700 text-4xl py-7">
      About Us
    </h1>,
    <p>What is LocaLINEzation?</p>,
    <p className="indent-8">
      LocaLINEzation is a community driven website dedicated to translating
      parts of foreign media for fans who may not know said language. We use an
      open response system in order to allow for any and all potential
      translatiors to find where their expertise can be used, creating a direct
      LINE between the requester and the translating community.
    </p>,
    <p>How to use LocaLINEzation</p>,
    <>
      <p className="indent-8 mb-8">
        If you want to <span className="font-bold">REQUEST</span> a media to be
        submitted, first check the recent translations page or use the search
        bar to see if that media has already been requested before, and if it
        hasnt then use the <span className="font-bold">SUBMIT A MEDIA</span>{" "}
        page.
      </p>
      <p className="indent-8">
        If you are looking to <span className="font-bold">TRANSLATE</span>, make
        sure that you have correctly selected your origin language and language
        to translate to, located to the left of your name in the top corner of
        the page, and then find something to translate!
      </p>
    </>,
    <p>Why is LocaLINEzation?</p>,
    <p className="indent-8">
      LocaLINEzation was made to help break the langauge barrier between foreign
      fans of any given media. While it doesn&rsquo;t provide full translations,
      it helps to make cracks into a given media&rsquo;s language barrier in
      hopes of eventually leading to a full translation and/or localization of
      said media. Individuals are also able to participate in the translation
      while improving their own skillsets in the process, and potentially
      getting a vital role in a full translation.
    </p>,
    <p>Why does this site look like this?</p>,
    <p className="indent-8">
      We&apos;re capturing a 2000s - 2010s web forum style with our website.
      Since our target users may reminisce about that era, we&apos;re trying to
      foster that energy within our website so they may have a pleasant viewing
      experience. In other words, this website looks outdated by design.
    </p>,
  ];

  const spanishText = [
    <h1 className="text-center font-bold text-gray-700 text-4xl py-7">
      Sobre Nosotros
    </h1>,
    <p>¿Qué es LocaLINEzation?</p>,
    <p className="indent-8">
      LocaLINEzation es un sitio web y comunidad dedicado a traducir partes de
      medios extranjeros para los fanáticos que tal vez no conozcan el idioma.
      Usamos un sistema de respuesta abierto para hacer posible que cualquier
      traductor dispuesto encuentra donde se puede usar su experiencia. Así
      creando un LINE entre el solicitante y la comunidad de traducción.
    </p>,
    <p>Como utilizar LocaLINEzation</p>,
    <>
      <p className="indent-8 mb-8">
        Si usted quiere <span className="font-bold">SOLICITAR</span> un medio
        para ser enviado, primero fijase en la página de traducciones recientes
        o use la búsqueda para ver si ese medio se ha enviado antes. Si no se ha
        enviado antes, puede usar la página de{" "}
        <span className="font-bold">ENVIAR UN MEDIO</span>.
      </p>
      <p className="indent-8">
        Si quiere <span className="font-bold">TRADUCIR</span>, asegurese que ha
        elegido bien el idioma de origen y el idioma al que quiere traducir. Se
        puede elegir su idioma a la izquierda de su nombre en el esquina
        superior de la página y luego ¡busque algo para traducir!
      </p>
    </>,
    <p>¿Por qué existe LocaLINEzation?</p>,
    <p className="indent-8">
      LocaLINEzation fue creado para superar el obstáculo del idioma para los
      fanáticos extranjeros de cualquier medio. Aunque no provee traducciones
      completos, aumenta en hacer que ese obstáculo sea menos difícil con la
      esperanza que eventualmente ese medio sea traducido por completo y/o
      localización de ese medio. Individuos pueden participar en la traducción y
      a la misma vez, mejorando sus habilidades, y tal vez también ser un parte
      vital en la traducción completa.
    </p>,
    <p>¿Por qué se ve así este sitio?</p>,
    <p className="indent-8">
      Estamos capturando un estilo de foro web de las décadas 2000 a 2010 con
      nuestro sitio web. Como nuestros usuarios objectivo tal vez se recuerdan
      de esa era con nostalgia, queremos fomentar esa energía en nuestro sitio
      web para que puedan tener una experiencia genial. En pocas palabras, este
      sitio web se ve de forma anticuado a propósito.
    </p>,
  ];

  return (
    <div className="flex flex-col h-fit justify-center items-center py-10">
      <div
        id="pageHeader"
        className="flex items-center h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg mt-2 mb-10 border border-black"
      >
        {englishText[0]}
      </div>

      <div className="rounded-lg text-gray-200 font-semibold py-8 max-w-[1440px] w-2/3 min-w-min flex flex-col gap-y-6">
        <div className="bg-purple-600 p-8 flex flex-col items-center rounded-xl">
          <div className="bg-fuchsia-300 text-3xl h-fit w-full min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
            {englishText[1]}
          </div>
          <div className="border border-t-0 h-fit w-full min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
            {englishText[2]}
          </div>
        </div>
        <div className="bg-purple-600 p-8 flex flex-col items-center rounded-xl">
          <div className="bg-fuchsia-300 text-3xl h-fit w-full min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
            {englishText[3]}
          </div>
          <div className="border border-t-0 h-fit w-full min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
            {englishText[4]}
          </div>
        </div>
        <div className="bg-purple-600 p-8 flex flex-col items-center rounded-xl">
          <div className="bg-fuchsia-300 text-3xl h-fit w-full min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
            {englishText[5]}
          </div>
          <div className="border border-t-0 h-fit w-full min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
            {englishText[6]}
          </div>
        </div>
        <div className="bg-purple-600 p-8 flex flex-col items-center rounded-xl">
          <div className="bg-fuchsia-300 text-3xl h-fit w-full min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
            {englishText[7]}
          </div>
          <div className="border border-t-0 h-fit w-full min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
            {englishText[8]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;