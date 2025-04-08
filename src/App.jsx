import './App.css';
import { useState } from 'react';
import { textExtractApi, imageUploadApi } from './api';

export default function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('Extracted text will be displayed here.');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    console.log(file);

    const result = await imageUploadApi(file);
    console.log('After API call', result);

    if (result) {
      setImage(result.data.secure_url);
      console.log(result.data.secure_url);
    } else setImage('Error uploading the image');
  };

  const handleApiCall = async () => {
    const result = await textExtractApi(image);
    console.log('After textExtractApi call', result);
    if (result.status) {
      const output = result.text;
      setText(output);
    } else {
      setText('Server Side Error'); 
    }
  };

  return (
    <main className="flex flex-col items-center bg-gradient-to-br from-[#f857a6] to-[#ff5858] h-full text-white">
      <h1 className="text-[4rem] text-bold font-mono p-8">TextExtract</h1>
      <input type="file" onChange={handleImageUpload} />

      {/*Boxes for showing input and output*/}
      <div className="flex flex-row items-center justify-center w-full mt-16">
        {/*Input*/}
        <div className="w-1/2 border-2 mx-32 p-4">
          {image === null ? (
            <p>No image uploaded yet.</p>
          ) : (
            <img src={image} loading="lazy" />
          )}
        </div>
        {/*Processing Button*/}
        <div className="p-4 border-2 border-white hover:scale-110 transition duration-700 ease-in-out rounded-lg bg-gradient-to-br from-yellow-400 to-transparent">
          <button onClick={handleApiCall}>Convert</button>
        </div>
        {/*Output*/}
        <div className="w-1/2 border-2 mx-32 p-4">
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{text}</pre>
        </div>
      </div>
    </main>
  );
}
