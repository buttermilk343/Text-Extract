import axios from 'axios';

export const textExtractApi = async (image) => {
  const apiKey = import.meta.env.VITE_RAPID_API_KEY;
  const options = {
    method: 'GET',
    url: 'https://ocr-extract-text.p.rapidapi.com/ocr',
    params: {
      url: image  
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'ocr-extract-text.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const imageUploadApi = async (file) => {
  const preset_key = import.meta.env.VITE_PRESET_KEY;
  const cloud_name = import.meta.env.VITE_CLOUDNAME;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset_key);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    console.log('After successful api call:', response);
    return response;
  } catch (error) {
    console.log('Image Upload Error', error);
    return {
      message: error,
      status: 'False',
    };
  }
};
