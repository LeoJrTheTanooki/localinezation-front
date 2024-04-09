'use client'

import { Label, TextInput, FileInput, Button } from 'flowbite-react'
import React from 'react'

const TranslationUploadPage = () => {
  return (
    <div className=' grid grid-cols-2'>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="requestName" value="Submitting as..." />
        </div>
        <TextInput
          // onChange={handleTitle}
          id="requestName"
          type="text"
          // placeholder="Enter Title"
          required
        />
        <div className="mb-2 block">
          <Label
            htmlFor="languageSelect"
            value="Translating into..."
          />
        </div>
        <TextInput
          // onChange={handleDescription}
          id="languageSelect"
          type="text"
          // placeholder="Enter Title"
          required
        />
        <div className="mb-2 block">
          <Label htmlFor="dialogueRequest" value="Referencese" />
        </div>
        <TextInput
          // onChange={handleTags}
          id="dialogueRequest"
          type="text"
          // placeholder="Enter Tags"
        />
        <div className="mb-2 block">
          <Label htmlFor="screenshots" value="Screenshots" />
        </div>
        <FileInput
          id="screenshots"
          multiple
          accept="image/png, image/jpeg, image/webp"
          helperText="PNG, JPG or GIF (MAX. ???x???px)."
        />{" "}
        <div className="mb-2 block">
          <Label htmlFor="dialogueRequest" value="Video Link" />
        </div>
        <TextInput
          // onChange={handleTags}
          id="dialogueRequest"
          type="text"
          // placeholder="Enter Tags"
        />
        <Button
        // onClick={() => handlePageChange('/OpenRequestsPage')}
        >Submit Translation</Button>
      </div>
  </div>
  )
}

export default TranslationUploadPage