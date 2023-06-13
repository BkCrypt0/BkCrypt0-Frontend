import { useDispatch, useSelector } from "react-redux";
import { uploadImageID } from "src/redux/imageIDSlice";

function IdentityCardUploader() {
  const imageIDBase64 = useSelector(
    (state) => state.imageIDSlice.imageIDBase64
  );
  const dp = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      dp(uploadImageID(event.target.result));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageIDBase64 && (
        <img
          src={imageIDBase64}
          alt="identity-card"
          width="500px"
          height="300px"
        />
      )}
      <div>{imageIDBase64}</div>
    </div>
  );
}

export default IdentityCardUploader;
