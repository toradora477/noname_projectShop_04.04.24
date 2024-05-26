import React, { useState, useEffect } from 'react';
import { request } from '../../tools';
import { Spin } from '../';
import clsx from 'clsx';
import { ERROR_IMAGE_URL } from '../../common_constants/business';
import './PreviewImage.scss';

const PreviewImage = ({ fileID, style, className }) => {
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
    <div style={{ ...style }} className={clsx('loading-spinner', className)}>
      <Spin spinning={megaState.loading} />
    </div>
  ) : (
    <img style={{ ...style }} src={megaState.url} className={clsx('img-drive', className)} alt="file view" />
  );

  return megaState.loading && megaState.err ? (
    <img style={{ ...style }} src={ERROR_IMAGE_URL} className={clsx('img-drive', className)} alt="file view" />
  ) : (
    <div style={{ ...style }} className={clsx('preview-image', className)}>
      {imgDrive}
    </div>
  );
};

export default PreviewImage;
