import { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import defaultAvatar from "../../Assets/Svgs/JohnDoe.svg";
/**
  * <summary>
  * displays the Avatar Image used by the App
  * </summary>
  * <param name="url, size">
  * </param> 
  * <returns>
  * The Avatar for the url provided
  * </returns> 
  */
export const Avatar = ({ url, size = 40 }: { url?: string; size?: number }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = url ?? defaultAvatar;
    }
  }, [url]);

  useEffect(() => {
    if (imgRef.current) {
      const imageToLoad = new Image();
      imageToLoad.src = url ?? defaultAvatar;
      imgRef.current.src = imageToLoad?.src;
      setIsLoading(false);
    }
  }, [url]);

  return (
    <>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="avatar"
        >
          <rect x="0" y="0" rx="5" ry="5" width={size} height={size} />
        </ContentLoader>
      ) : null}
      <img
        ref={imgRef}
        src={url ?? defaultAvatar}
        alt="User avatar"
        className={`avatar ${isLoading ? "hidden" : ""}`}
        style={{ width: size, height: size }}
      />
    </>
  );
};
