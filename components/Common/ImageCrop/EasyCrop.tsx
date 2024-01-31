import { Button as AntButton } from 'antd';
import { Slider as AntSlider } from 'antd';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import {
  ASPECT_MAX,
  ASPECT_MIN,
  ASPECT_STEP,
  PREFIX,
  ROTATION_INITIAL,
  ROTATION_MAX,
  ROTATION_MIN,
  ROTATION_STEP,
  ZOOM_INITIAL,
  ZOOM_STEP
} from './constants';
import type { EasyCropProps, EasyCropRef } from './types';
import styled from 'styled-components';

const CustomSlider = styled(AntSlider)`
  & > .ant-slider-handle {
    /* &::before {
      box-shadow: none !important;
      background-color: #fcc409;
      width: 20px;
      height: 20px;
      transform: translateY(-3px);
    } */
    &::after,
    :focus::after {
      box-shadow: none !important;
      background-color: #fcc409;
      width: 20px !important;
      height: 20px !important;
      transform: translateY(-3px) !important;
    }
  }
`;

const EasyCrop = forwardRef<EasyCropRef, EasyCropProps>((props, ref) => {
  const {
    cropperRef,
    zoomSlider,
    rotationSlider,
    aspectSlider,
    showReset,
    resetBtnText,

    modalImage,
    aspect: ASPECT_INITIAL,
    minZoom,
    maxZoom,
    cropShape,
    showGrid,

    cropperProps
  } = props;

  const [zoom, setZoom] = useState(ZOOM_INITIAL);
  const [rotation, setRotation] = useState(ROTATION_INITIAL);
  const [aspect, setAspect] = useState(ASPECT_INITIAL);

  const isResetActive =
    zoom !== ZOOM_INITIAL ||
    rotation !== ROTATION_INITIAL ||
    aspect !== ASPECT_INITIAL;

  const onReset = () => {
    setZoom(ZOOM_INITIAL);
    setRotation(ROTATION_INITIAL);
    setAspect(ASPECT_INITIAL);
  };

  const [crop, onCropChange] = useState<Point>({ x: 0, y: 0 });
  const cropPixelsRef = useRef<Area>({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    cropPixelsRef.current = croppedAreaPixels;
  }, []);

  useImperativeHandle(ref, () => ({
    rotation,
    cropPixelsRef,
    onReset
  }));

  const wrapperClass =
    '[display:flex] [align-items:center] [width:60%] [margin-inline:auto]';

  const buttonClass =
    '[display:flex] [align-items:center] [justify-content:center] [height:32px] [width:32px] [background:transparent] [border:0] [font-family:inherit] [font-size:18px] [cursor:pointer] disabled:[opacity:20%] disabled:[cursor:default]';

  const sliderClass = '[flex:1]';

  return (
    <>
      <Cropper
        {...cropperProps}
        ref={cropperRef}
        image={modalImage}
        crop={crop}
        //
        zoom={zoom}
        rotation={rotation}
        aspect={aspect}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomWithScroll={zoomSlider}
        //
        cropShape={cropShape}
        showGrid={showGrid}
        onCropChange={onCropChange}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        classes={{
          containerClassName: `${PREFIX}-container ![position:relative] [width:100%] [height:40vh] [&~section:first-of-type]:[margin-top:16px] [&~section:last-of-type]:[margin-bottom:16px]`,
          mediaClassName: `${PREFIX}-media`
        }}
      />

      {zoomSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-zoom ${wrapperClass} flex flex-col justify-start px-[128px]`}
          style={{ width: '100%' }}
        >
          <div className="my-[10px] w-full text-start font-next-book text-[21px] leading-[160%] tracking-[0.42px] text-neutral-medium-gray">
            Scale
          </div>
          <div className="flex w-full items-center">
            <button
              className={buttonClass}
              onClick={() => setZoom(zoom - ZOOM_STEP)}
              disabled={zoom - ZOOM_STEP < minZoom}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#0B0B0B"
                />
                <path d="M7 12L17 12" stroke="#0B0B0B" strokeLinecap="round" />
              </svg>
            </button>
            <div className="mx-[15px] -mt-[4px] w-full">
              <CustomSlider
                className={sliderClass}
                min={minZoom}
                max={maxZoom}
                step={ZOOM_STEP}
                value={zoom}
                onChange={setZoom}
                style={{}}
                trackStyle={{
                  backgroundColor: '#FFD850',
                  height: '10px',
                  borderRadius: '100px'
                }}
                railStyle={{
                  height: '10px',
                  borderRadius: '100px'
                }}
                handleStyle={{
                  width: '20px',
                  height: '20px'
                }}
              />
            </div>
            <button
              className={buttonClass}
              onClick={() => setZoom(zoom + ZOOM_STEP)}
              disabled={zoom + ZOOM_STEP > maxZoom}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#0B0B0B" />
                <path d="M7 12L17 12" stroke="white" strokeLinecap="round" />
                <path d="M12 7L12 17" stroke="white" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {rotationSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-rotation ${wrapperClass}`}
        >
          <button
            className={`${buttonClass} [font-size:16px]`}
            onClick={() => setRotation(rotation - ROTATION_STEP)}
            disabled={rotation === ROTATION_MIN}
          >
            ↺
          </button>
          <CustomSlider
            className={sliderClass}
            min={ROTATION_MIN}
            max={ROTATION_MAX}
            step={ROTATION_STEP}
            value={rotation}
            onChange={setRotation}
          />
          <button
            className={`${buttonClass} [font-size:16px]`}
            onClick={() => setRotation(rotation + ROTATION_STEP)}
            disabled={rotation === ROTATION_MAX}
          >
            ↻
          </button>
        </section>
      )}

      {aspectSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-aspect ${wrapperClass}`}
        >
          <button
            className={buttonClass}
            onClick={() => setAspect(aspect - ASPECT_STEP)}
            disabled={aspect - ASPECT_STEP < ASPECT_MIN}
          >
            ↕️
          </button>
          <CustomSlider
            className={sliderClass}
            min={ASPECT_MIN}
            max={ASPECT_MAX}
            step={ASPECT_STEP}
            value={aspect}
            onChange={setAspect}
          />
          <button
            className={buttonClass}
            onClick={() => setAspect(aspect + ASPECT_STEP)}
            disabled={aspect + ASPECT_STEP > ASPECT_MAX}
          >
            ↔️
          </button>
        </section>
      )}

      {showReset && (zoomSlider || rotationSlider || aspectSlider) && (
        <AntButton
          className="[bottom:20px] [position:absolute]"
          style={isResetActive ? {} : { opacity: 0.3, pointerEvents: 'none' }}
          onClick={onReset}
        >
          {resetBtnText}
        </AntButton>
      )}
    </>
  );
});

EasyCrop.displayName = 'EasyCrop';

export default memo(EasyCrop);
