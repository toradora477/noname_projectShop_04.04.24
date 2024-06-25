import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenSize } from '../../store/screenSizeReducer';

const useScreenSize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      );
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);
};

export default useScreenSize;
