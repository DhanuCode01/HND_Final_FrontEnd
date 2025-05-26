import { useEffect, useState } from "react";
import img1 from "../utils/Shop/shopping-01.jpg";
import img2 from "../utils/Shop/shopping-02.jpg";
import img3 from "../utils/Shop/shopping-03.jpg";
import img4 from "../utils/Shop/shopping-04.jpg";
import img5 from "../utils/Shop/shopping-05.jpg";
import img6 from "../utils/Shop/shopping-06.jpg";

export default function MoveImage() {
    const images = [img1, img2, img3, img4, img5, img6 ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div >
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-screen h-[500px] object-cover transition duration-700 ease-in-out"
            />
        </div>
    );
}
