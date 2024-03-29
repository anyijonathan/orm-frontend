import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import "./dropFileInput.css";

import { ImageConfig } from './ImageConfig'; 
import uploadImg from "./assets/cloud-upload-regular-240.png";

interface DropFileInputProps {
    onFileChange: (fileList: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = (props) => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current!.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current!.classList.remove('dragover');

    const onDrop = () => wrapperRef.current!.classList.remove('dragover');

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files![0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Click to upload or drag and drop<br />PDF/DOC/DOCX/XLS/PNG/JPEG</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired as PropTypes.Validator<(fileList: File[]) => void>,
};

export default DropFileInput;