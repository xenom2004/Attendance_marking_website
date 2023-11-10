import React, { useState } from 'react';
import '../cssfile/PhotoUploader.css';

const PhotoUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleRemoveFile = (fileName) => {
        document.getElementById('file-input').value = '';
        const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
        setSelectedFiles(updatedFiles);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append(`file${index}`, file);
            });

            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadStatus('Upload successful!');
            } else {
                setUploadStatus('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading files: ', error);
            setUploadStatus('Upload failed. Please try again.');
        }
        setUploadStatus(`Uploaded files: ${selectedFiles.map(file => file.name).join(', ')}`);
    };

    return (
        <div className="photo-uploader-container">
            <input id="file-input" className="file-input" type="file" onChange={handleFileChange} multiple />
            <div className="selected-files">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                        <span className="file-name">{file.name}</span>
                        <button className="remove-button" onClick={() => handleRemoveFile(file.name)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button className="upload-button" onClick={handleUpload}>Upload</button>
            {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
        </div>
    );
};

export default PhotoUploader;
