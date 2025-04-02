import { useState } from 'react'

const usePreviewImage = () => {
  const [imageUrl, setImageUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImageUrl(reader.result)
      }

      reader.readAsDataURL(file)
    }
}
  return { handleImageChange, imageUrl, setImageUrl }   
}

export default usePreviewImage