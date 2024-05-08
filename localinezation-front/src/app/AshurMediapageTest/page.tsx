
'use client'
import React, { useEffect, useState } from 'react';
import { fetchMedia, postTranslationRequest } from '@/utils/Dataservices';
import { IMedia, ITranslationRequest } from '@/Interfaces/Interfaces';
import { Button } from 'flowbite-react';


// This component displays a list of media items and allows users to request translations.
const MediaPageAshur: React.FC = () => {
    // State to store the list of media items fetched from the server
    const [mediaList, setMediaList] = useState<IMedia[]>([]);
    // State to store any error messages that might occur while fetching or posting data
    const [error, setError] = useState<string | null>(null);

    // This effect runs when the component mounts to the DOM
    useEffect(() => {
        // Define an asynchronous function to fetch media from the backend
        const loadMedia = async () => {
            try {
                const media = await fetchMedia();  // Attempt to fetch media
                setMediaList(media);               // If successful, update the state with the fetched media
            } catch (error) {
                setError('Failed to fetch media. Please try again later.');  // If an error occurs, set an error message
                console.error(error);  // Also log the error to the console for debugging
            }
        };

        loadMedia();  // Call the function to load media
    }, []);  // The empty dependency array means this effect runs only once after the initial render

    // Function to handle the submission of a new translation request
    const handleRequestTranslation = async (mediaId: number, language: string) => {
        try {
            // Define a new translation request object
            const newRequest: ITranslationRequest = {
                mediaId: mediaId,               // ID of the media item being translated
                requestLanguage: language,      // Language to translate into
                translations: []                // Start with an empty array of translations
            };
            await postTranslationRequest(mediaId, newRequest);  // Send the translation request to the server
            alert('Translation request created successfully!');  // Alert the user on success
        } catch (error) {
            setError('Failed to create translation request. Please try again.');  // Set an error message if there's a failure
            console.error(error);  // Log the error to the console for debugging
        }
    };

    return (
        <div>
            <h1>Media List</h1>
            {error && <p className="error">{error}</p>} 
             {/* // Display any error messages if present */}
            <ul>
                {mediaList.map((media) => (
                    //   Map over each media item in the list and render it
                    <li key={media.id}>
                       {/* Each list item must have a unique key, here it's the media ID */}
                        <h2>{media.title}</h2>  
                        {/* // Display the title of the media */}
                        <p>Original Language: {media.originalLanguage}</p> 
                         {/* // Display the original language of the media */}
                         <p>Media Type: {media.type}</p>
                        {/* Type of Media */}
                        {/* Button to request a new translation */}
                        <Button onClick={() => handleRequestTranslation(media.id, 'Spanish')}>
                            Request Spanish Translation
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MediaPageAshur;