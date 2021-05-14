import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Spinner from "../spinner";
import { API_SETTINGS } from "../../constants";

import { uploadFileApi, resetUpload } from "../../redux/upload-store";

function UploadFile({
  isLoading,
  uploadFileApi,
  resetUpload,
  errorMessage,
  isSuccessful,
  ...props
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [validationError, setValidationError] = useState("");

  const history = useHistory();
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    const redirect = async () => {
      setIsSelected(false);
      await resetUpload();
      toast.success("cat uploaded");
      history.push("/");
    };
    if (isSuccessful) redirect();
  });

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setValidationError("");
    if (hasExtension(file.name, [".jpg", ".png"])) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
      setIsSelected(true);
    } else {
      setValidationError("File must be either png or jpg format.");
    }
  };

  const uploadHandler = () => {
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("sub_id", API_SETTINGS.UserId);

    uploadFileApi(formData);
  };

  //   const handleClick = (event) => {
  //     hiddenFileInput.current.click();
  //   };

  const hasExtension = (fileName, exts) => {
    var regex = new RegExp("([a-zA-Z0-9s_\\.-:])+(" + exts.join("|") + ")$");
    return regex.test(fileName.toLowerCase());
  };

  return (
    <CentredWrapper>
      <Heading>Select your cat</Heading>
      {isSelected ? (
        <Figure>
          <ImageWrapper>
            <SelectedImage alt="image to upload" src={fileUrl} />
          </ImageWrapper>

          <FigCaption>
            If you are sure this is a cat, click to upload
          </FigCaption>
        </Figure>
      ) : (
        <>
          <EmptyImage />
        </>
      )}

      {isLoading && <Spinner />}

      <Row>
        {isSelected ? (
          <Button onClick={uploadHandler}>Upload</Button>
        ) : (
          <ButtonLabel type="button" alt="choose file">
            Choose file
            <InvisibleFileUpload
              ref={hiddenFileInput}
              type="file"
              name="file"
              onChange={changeHandler}
            />
          </ButtonLabel>
        )}
      </Row>
      <Row>
        <p>{errorMessage}</p>
        <p>{validationError}</p>
      </Row>
    </CentredWrapper>
  );
}

const Heading = styled.h1`
  font-size: 1.8rem;
  text-align: left;
  padding-bottom: 16px;
`;
const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  border: 2px solid var(--col-gray-500);
  background-color: white;
  border-radius: 0.25em;
  padding: 6px;
`;

const ButtonLabel = styled.label`
  display: inline-block;
  border: 2px solid var(--col-gray-500);
  border-radius: 0.25em;
  padding: 6px;
`;

const Row = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
`;

const Figure = styled.figure`
  border: 1px solid black;
  padding: 8px;
`;

const FigCaption = styled.figcaption`
  text-align: left;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const EmptyImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: var(--col-gray-300);
  border-radius: 8px;
`;

const SelectedImage = styled.img`
  width: 100%;
`;

const InvisibleFileUpload = styled.input`
  opacity: 0;
  z-index: -1;
  position: absolute;
`;

const CentredWrapper = styled.div`
  max-width: 500px;
  margin: 64px auto;
  padding: 64px;
  border-radius: 8px;
`;

const mapStateToProps = ({ fileUpload }) => {
  return {
    isLoading: fileUpload.isFetching,
    errorMessage: fileUpload.errorMessage,
    isSuccessful: fileUpload.isSuccessful,
  };
};

const mapDispatchToProps = {
  uploadFileApi,
  resetUpload,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
