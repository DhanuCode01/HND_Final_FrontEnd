import { useState } from "react";

export default function ImageSlider(props){
    const images=props.images;//read props Value
    //console.log(images)

    const [selectedImage,setSelectedImage]=useState(images[0]);//Viewing image states
   return (
        <div className="w-full h-full flex flex-col items-center">
            <img
                src={selectedImage}
                alt="product"
                className="w-[700px] h-[700px] object-cover border-8 border-white "
            />
            <div className="mt-4 w-full flex justify-start gap-2 overflow-x-auto">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`product-${index}`}
                        className={`w-[80px] h-[80px] rounded-md object-cover cursor-pointer border-2 ${
                            image === selectedImage ? "border-green-500" : "border-transparent"
                        } hover:scale-105 transition-transform duration-200`}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}