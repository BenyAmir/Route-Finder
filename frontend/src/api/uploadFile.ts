
export const uploadFile = async (file:File, token:string | null) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/data/upload', {
    method: 'POST',
        headers: { authorization: `Bearer ${token}` || "" },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  
  return response.json();
};