import React, { useState } from "react";
import axios from "axios";

const MyInfo = () => {
    const [document, setDocument] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!document || !selfie) {
            setMessage("Please select both a document and a selfie.");
            return;
        }

        //console.log("Document:", document);
        //console.log("Selfie:", selfie);

        const formData = new FormData();
        formData.append("document", document);
        formData.append("selfie", selfie);

        try {
            const response = await axios.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error uploading files");
        }
    };

    return (
        <div>
            <h2>My Info</h2>
            <div>
                <h3>Uploaded Documents</h3>
                <input type="file" onChange={(e) => setDocument(e.target.files[0])} />
            </div>
            <div>
                <h3>Selfie</h3>
                <input type="file" onChange={(e) => setSelfie(e.target.files[0])} />
            </div>
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MyInfo;