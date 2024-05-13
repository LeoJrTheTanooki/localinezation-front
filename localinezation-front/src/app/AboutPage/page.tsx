"use client";

import React from "react";

const AboutPage = () => {

    return (
        <div className="flex flex-col h-fit justify-center items-center my-10">
            <div id="pageHeader" className="flex items-center h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg mt-2 mb-10 border border-black">
                <h1 className="text-center font-bold text-gray-700 text-4xl py-7">About Us</h1>
            </div>

            <div className="bg-purple-600 rounded-lg text-gray-200 font-semibold py-8 max-w-[1440px] w-fit flex flex-col gap-y-6">
                <div className="flex flex-col items-center">
                    <div className="bg-fuchsia-300 text-3xl h-fit w-3/4 min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
                        <p>What is LocaLINEzation?</p>
                    </div>
                    <div className="border border-t-0 h-fit w-3/4 min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
                        <p className="indent-8">LocaLINEzation is a community driven website dedicated to translating parts of foreign media for fans who may not know said language. We use an open response system in order to allow for any and all potential translatiors to find where their expertise can be used, creating a direct LINE between the requester and the translating community.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-fuchsia-300 text-3xl h-fit w-3/4 min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
                        <p>How to use LocaLINEzation</p>
                    </div>
                    <div className="border border-t-0 h-fit w-3/4 min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
                        <p className="indent-8 mb-8">
                            If you want to <span className="font-bold underline">REQUEST</span> a media to be submitted, first check the recent translations page or use the search bar to see if that media has already been requested before, and if it hasnt then use the <span className="font-bold underline">SUBMIT A MEDIA</span> page found on the navbar.
                        </p>
                        <p className="indent-8">
                            If you are looking to <span className="font-bold underline">TRANSLATE</span>, make sure that you have correctly selected your origin language and language to translate to, located to the left of your name in the top corner of the page, and then find something to translate!
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-fuchsia-300 text-3xl h-fit w-3/4 min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
                        <p>Why is LocaLINEzation?</p>
                    </div>
                    <div className="border border-t-0 h-fit w-3/4 min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
                        <p className="indent-8">
                            LocaLINEzation was made to help break the langauge barrier between foreign fans of any given media. While it doesn&rsquo;t  provide full translations, it helps to make cracks into a given media&rsquo;s language barrier in hopes of eventually leading to a full translation and/or localization of said media. Individuals are also able to participate in the translation while improving their own skillsets in the process, and potentially getting a vital role in a full translation.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-fuchsia-300 text-3xl h-fit w-3/4 min-w-64 text-center text-gray-700 py-3 font-semibold border-black border">
                        <p>Why does this site look like this?</p>
                    </div>
                    <div className="border border-t-0 h-fit w-3/4 min-w-64 border-black flex flex-col flex-wrap p-4 bg-fuchsia-200 text-gray-700">
                        <p className="indent-8">
                            We&apos;re capturing a 2000s - 2010s web forum style with our website. Since our target users may reminisce about that era, we&apos;re trying to foster that energy within our website so they may have a pleasant viewing experience. In other words, this website looks outdated by design.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;