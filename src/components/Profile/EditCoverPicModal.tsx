import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {EditIcon} from "@chakra-ui/icons";
import axios from "axios";
import ReactCrop, {type Crop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const EditCoverPicModal = (data: any) => {


    const token = localStorage.getItem("token");
    const toast = useToast();
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: "%", // Can be 'px' or '%'
        x: 25, y: 25, width: 50, height: 50
    });
    const [image, setImage] = useState<HTMLImageElement | null>(null);


    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg");


    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    };
    const cropImageNow = (): void => {
        if (image) {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width || 0;
            canvas.height = crop.height || 0;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                const pixelRatio = window.devicePixelRatio;
                canvas.width = (crop.width || 0) * pixelRatio;
                canvas.height = (crop.height || 0) * pixelRatio;
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = "high";

                ctx.drawImage(image, (crop.x || 0) * scaleX, (crop.y || 0) * scaleY, (crop.width || 0) * scaleX, (crop.height || 0) * scaleY, 0, 0, crop.width || 0, crop.height || 0,);

                canvas.toBlob((blob) => {
                    try {
                         if (blob) {
                            // Create a File from the Blob
                            const file = new File([blob], "cropped-image.jpeg", {type: "image/jpeg"});
                            console.log(file);
                            // Do something with the file, for example, set it as the output
                            setFile(file);
                            toast(

                            )


                        }
                    }
                    catch (e) {

                    }

                    }, "image/jpeg", 1 // JPEG quality (0 to 1)
                );
            }
        }
    };

    const handle_save_picture = async (e: React.MouseEvent<HTMLButtonElement>) => {
        cropImageNow()
        console.error(file);
        const data = {
            "coverPhoto": file
        };


        await axios.patch("http://localhost:5000/api/v1/users/coverPicture", data, {

            headers: {
                "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
            },

        }).then(response => {
            toast({
                title: "Update cover picture successful", status: "success", duration: 9000, isClosable: true, position: "top",
            });
            onClose();
            window.location.reload();

        }).catch(error => {
            toast({
                title: error.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
            });
        });


    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result as string);

                }
            };

            reader.readAsDataURL(selectedFile);
        }


    };
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const {isOpen, onOpen, onClose} = useDisclosure();


    return (

        <>
            <Button onClick={onOpen} leftIcon={<EditIcon/>} colorScheme="twitter" position={"absolute"} top={2}
                    zIndex={800}
                    left={7}>Edit</Button>

            <Modal

                isOpen={isOpen}
                onClose={onClose}

            >
                <ModalOverlay px={90}>
                    <ModalContent>
                        <ModalHeader>Edit profile</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{display: "none"}}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <div>
                                {selectedImage && (<div>
                                    <ReactCrop
                                        crop={crop} onChange={setCrop}>
                                        <Image
                                            src={selectedImage}
                                            minWidth="400px" borderRadius={10}
                                            onClick={handleClickSelectFile} onLoad={event => {
                                            const loadedImage = event.currentTarget;

                                            // Set the image using your state setter function (e.g., setImage)
                                            setImage(loadedImage);

                                        }}


                                        ></Image>
                                    </ReactCrop>
                                    <br/>
                                    <Button onClick={cropImageNow}>Crop</Button>
                                    <br/>
                                    <br/>
                                </div>)}
                            </div>


                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handle_save_picture}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>);
};



