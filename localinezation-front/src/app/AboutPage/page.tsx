"use client";

import React from "react";

const AboutPage = () => {

    return (
        <div className="flex flex-col h-fit justify-center items-center my-8">
            <div id="pageHeader" className="flex items-center h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg mt-2 mb-4">
                <h1 className="text-center font-bold text-gray-700 text-4xl py-7">About Us</h1>
            </div>
            <div className="w-[80vw] flex flex-col border-black border-2 my-4">
                <div id="titleHeader" className="bg-purple-600 text-white p-6 text-3xl font-bold">
                    <p>What is LocaLINEzation?</p>
                </div>
                <div id="textBox" className="p-6 text-xl">
                    <p className="indent-8">LocaLINEzation is a community driven website dedicated to translating parts of foreign media for fans who may not know said language. We use an open response system in order to allow for any and all potential translatiors to find where their expertise can be used, creating a direct LINE between the requester and the translating community.</p>
                </div>
            </div>
            <div className="w-[80vw] flex flex-col border-black border-2 my-4">
                <div id="titleHeader" className="bg-purple-600 text-white p-6 text-3xl font-bold">
                    <p>How to use LocaLINEzation</p>
                </div>
                <div id="textBox" className="p-6 text-xl">
                    <p className="indent-8 mb-8">
                        If you want to <span className="font-bold">REQUEST</span> a media to be submitted, first check the recent translations page or use the search bar to see if that media has already been requested before, and if it hasnt then use the <span className="font-bold">SUBMIT A MEDIA</span> page.</p>

                    <p className="indent-8">
                        If you are looking to <span className="font-bold">TRANSLATE</span>, make sure that you have correctly selected your origin language and language to translate to, located to the left of your name in the top corner of the page, and then find something to translate!
                    </p>
                </div>
            </div>
            <div className="w-[80vw] flex flex-col border-black border-2 my-4">
                <div id="titleHeader" className="bg-purple-600 text-white p-6 text-3xl font-bold">
                    <p>Why is LocaLINEzation?</p>
                </div>
                <div id="textBox" className="p-6 text-xl">
                    <p className="indent-8">
                        LocaLINEzation was made to help break the langauge barrier between foreign fans of any given media. While it doesn&rsquo;t  provide full translations, it helps to make cracks into a given media&rsquo;s language barrier in hopes of eventually leading to a full translation and/or localization of said media. Individuals are also able to participate in the translation while improving their own skillsets in the process, and potentially getting a vital role in a full translation.
                    </p>
                </div>
            </div>
            <div className="w-[80vw] flex flex-col border-black border-2 my-4">
                <div id="titleHeader" className="bg-purple-600 text-white p-6 text-3xl font-bold">
                    <p>Why does this site look like this?</p>
                </div>
                <div id="textBox" className="p-6 text-xl">
                    <p className="indent-8">
                        We&apos;re capturing a 2000s - 2010s web forum style with our website. Since our target users may reminisce about that era, we&apos;re trying to foster that energy within our website so they may have a pleasant viewing experience. In other words, this website looks outdated by design.
                    </p>
                    <p>

                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;