import React, { useState, useEffect } from 'react';
import { request } from '../../tools';
import { Spin } from '../';

import './PreviewImage.scss';

const PreviewImage = ({ fileID }) => {
  const [red, green, blue] = ['#f5222d', '#52c41a', '#1677ff'];

  const core_megaState = {
      loading: true, //* Downloaded images
      url: '',
      status: blue,
    },
    [megaState, setMegaState] = useState(core_megaState);

  useEffect(() => {
    if (!fileID) return setMegaState((prev) => ({ ...prev, err: true, loading: true }));
    const timerId = setTimeout(() => {
      const body = {
        fileID: fileID,
      };

      request.getImage('/products/getFilePreview', body, (res) => {
        console.log('/products/getFilePreview', res);
        const blob = res;
        const url = URL.createObjectURL(blob);

        setMegaState((prev) => ({ ...prev, url: url, status: green.primary, loading: false }));
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
    <p style={{ color: 'red' }}>Error loading file</p>
  ) : (
    <div className="preview-image" style={{ borderColor: megaState.status }}>
      {imgDrive}
    </div>
  );
};

export default PreviewImage;
