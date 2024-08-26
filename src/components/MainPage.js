'use client';

import HandShakeComponent from '@/components/HandShake';
import MainFormComponent from '@/components/MainForm';
import ServerProgress from '@/components/ServerProgress';
import { ErrorToast } from '@/services/toasterServices';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useWebSocket from 'react-use-websocket';

/**
 * The main page component for the application.
 * This component handles the form input, WebSocket connection, and rendering of various sub-components based on the WebSocket message type.
 */
export default function MainPage() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      sender_url: '',
      receiver_url: '',
    },
  });

  const senderUrl = `ws://${watch('sender_url')}/ws/sender-socket/`;
  const receiverUrl = `ws://${watch(
    'receiver_url'
  )}/ws/data-transformation-socket/`;

  const [socketUrl, setSocketUrl] = useState(null);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (watch('receiver_url')) {
      setSocketUrl(receiverUrl);
    }
  }, [receiverUrl, watch]);

  const handleConnect = useCallback(
    (data) => {
      setLoading(true);
      if (data?.sender_url !== undefined && data?.receiver_url !== undefined) {
        if (lastJsonMessage?.data?.status_code === 200) {
          sendJsonMessage({});
          setSocketUrl(senderUrl);
          setLoading(false);
        } else {
          return null;
        }
      } else {
        ErrorToast({ text: 'Please enter valid url' });
      }
    },
    [lastJsonMessage?.data?.status_code, sendJsonMessage, senderUrl]
  );

  return (
    <main className='flex flex-col flex-auto text-white'>
      <div className='bg-form-bg-color h-screen w-full flex flex-col justify-center items-center'>
        {/*Form component */}
        {(lastJsonMessage === null ||
          lastJsonMessage?.type === 'data_transformation_controller') && (
          <MainFormComponent
            onClick={handleSubmit(handleConnect)}
            control={control}
          />
        )}

        {/*Handshake component */}
        {lastJsonMessage?.type === 'token_verification' ||
        lastJsonMessage?.type === 'secret_key_verification' ? (
          <HandShakeComponent />
        ) : null}

        {/*Server progress and rocket animation */}
        {lastJsonMessage?.type === 'schema_verification' ||
        lastJsonMessage?.type === 'data_transformation' ||
        lastJsonMessage?.type === 'sender_layer' ? (
          <ServerProgress
            message={
              lastJsonMessage?.type !== 'data_transformation' &&
              lastJsonMessage?.data?.message
            }
            instance={lastJsonMessage?.data?.instance}
            percentage={
              lastJsonMessage?.type === 'data_transformation' &&
              `${Number(lastJsonMessage?.data?.message?.split(' ')[0])}`
            }
            loading={loading}
            completed={lastJsonMessage?.type === 'sender_layer'}
            transMessage={
              lastJsonMessage?.type === 'data_transformation' &&
              'Data in motion'
            }
            transMessage1={
              lastJsonMessage?.type === 'data_transformation' &&
              'Transformation in action'
            }
          />
        ) : null}
      </div>
    </main>
  );
}
