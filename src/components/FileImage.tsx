import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Loader } from "./Loader";
import styles from "../utils.module.css";

type FileImageProps = {
    filePath: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const FileImage = ({ filePath, ...props }: FileImageProps) => {
    const [image, setImage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const downloadImage = async (filePath: string) => {
            const storage = getStorage();
            const imageRef = ref(storage, filePath);

            try {
                setLoading(true);
                const url = await getDownloadURL(imageRef);
                setImage(url);
                setLoading(false);
            } catch (error) {
                console.error("Failed to download image", error);
                setLoading(false);
            }
        };

        if (filePath && filePath.length > 0) {
            downloadImage(filePath);
        }
    }, [filePath]);

    if (loading) {
        return (
            <div className={styles.centeredFlex}>
                <Loader />
            </div>
        );
    }

    return <img src={image} alt={filePath} {...props} />;
};
