import { useState } from "react";

import img_1 from "../../assests/images/rent1.jpeg";
import img_2 from "../../assests/images/rent2.jpeg";
import img_3 from "../../assests/images/rent13.jpeg";
import img_4 from "../../assests/images/rent4.jpeg";
import img_5 from "../../assests/images/rent5.jpeg";
import img_6 from "../../assests/images/rent6.jpeg";
import img_7 from "../../assests/images/rent7.jpeg";
import img_8 from "../../assests/images/rent9.jpeg";
import img_9 from "../../assests/images/rent10.jpeg";
import img_10 from "../../assests/images/rent11.jpeg";
import img_11 from "../../assests/images/rent12.jpeg";
import img_12 from "../../assests/images/rent13.jpeg";


let imageFiles: any;
(async () => {
    imageFiles = import.meta.glob('/assets/images/*.{jpeg,jpg,gif,png}');
    console.log(imageFiles);
})()

const Image = ({ src = '', alt = '', ...props }) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    // const [randomImage, setRandomImage] = useState(null);
    const handleImageError = () => {
        const imageArray: Array<any> = [
            img_1,
            img_2,
            img_3,
            img_4,
            img_5,
            img_6,
            img_7,
            img_8,
            img_9,
            img_10,
            img_11,
            img_12
        ];
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        // setRandomImage(imageArray[randomIndex]);
        setImageSrc(imageArray[randomIndex]);
    }

    return (<img
        src={imageSrc}
        alt={alt}
        crossOrigin=""
        onError={handleImageError}
        {...props}
    />)
}

export default Image;