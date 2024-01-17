import image1 from "../../../Utils/Images/1.png";
import image2 from "../../../Utils/Images/2.png";
import image3 from "../../../Utils/Images/3.png";
import image4 from "../../../Utils/Images/4.png";
import image5 from "../../../Utils/Images/5.png";
import image6 from "../../../Utils/Images/6.png";

// eslint-disable-next-line no-extend-native
String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const character = this.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash |= 0;
  }
  return Math.abs(hash);
};

const images = [image1, image2, image3, image4, image5, image6];

export default images;
