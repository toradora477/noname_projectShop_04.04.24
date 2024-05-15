import React, { useState, useEffect } from 'react';
import { request } from '../../tools';
import { Spin } from '../';
import { ERROR_IMAGE_URL } from '../../common_constants/business';
import './PreviewImage.scss';

const PreviewImage = ({ fileID }) => {
  const core_megaState = {
      loading: true,
      url: '',
    },
    [megaState, setMegaState] = useState(core_megaState);

  useEffect(() => {
    if (!fileID) return setMegaState((prev) => ({ ...prev, err: true, loading: true }));
    const timerId = setTimeout(() => {
      const body = {
        fileID: fileID,
      };

      request.getImage('/products/getFilePreview', body, (res) => {
        const blob = res;
        const url = URL.createObjectURL(blob);

        setMegaState((prev) => ({ ...prev, url: url, loading: false }));
      });

      setMegaState((prev) => ({ ...prev, loading: false }));
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  const imgDrive = megaState.loading ? (
    <div className="loading-spinner">
      <Spin spinning={megaState.loading} />
    </div>
  ) : (
    <img src={megaState.url} className="img-drive" alt="file view" />
  );

  return megaState.loading && megaState.err ? (
    <img src={ERROR_IMAGE_URL} className="img-drive" alt="file view" />
  ) : (
    <div className="preview-image">{imgDrive}</div>
  );
};

export default PreviewImage;
