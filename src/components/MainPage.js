'use client';

import HandShakeComponent from '@/components/HandShake';
import MainFormComponent from '@/components/MainForm';
import ServerProgress from '@/components/ServerProgress';
import { ErrorToast } from '@/services/toasterServices';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useWebSocket from 'react-use-websocket';

export default function MainPage() {
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
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (watch('receiver_url')) {
      setSocketUrl(receiverUrl);
    }
  }, [receiverUrl, watch]);

  const handleConnect = useCallback(
    (data) => {
      if (data?.sender_url !== undefined && data?.receiver_url !== undefined) {
        if (lastJsonMessage?.data?.status_code === 200) {
          sendJsonMessage({});
          setSocketUrl(senderUrl);
        } else {
          return null;
        }
      } else {
        ErrorToast({ text: 'Please enter valid url' });
      }
    },
    [lastJsonMessage?.data?.status_code, sendJsonMessage, senderUrl]
  );

  console.log('WebSocket Data:', lastJsonMessage);

  return (
    <main className='flex flex-col flex-auto text-white'>
      <div className='bg-form-bg-color bg-cover h-screen w-full flex flex-col justify-center items-center'>
        {(lastJsonMessage === null ||
          lastJsonMessage?.type === 'data_transformation_controller') && (
          <MainFormComponent
            onClick={handleSubmit(handleConnect)}
            control={control}
          />
        )}

        {lastJsonMessage?.type === 'token_verification' ||
        lastJsonMessage?.type === 'secret_key_verification' ? (
          <HandShakeComponent />
        ) : null}

        {lastJsonMessage?.type === 'schema_verification' ||
        lastJsonMessage?.type === 'data_transformation' ? (
          <ServerProgress
            message={
              lastJsonMessage?.type !== 'data_transformation' &&
              lastJsonMessage?.data?.message
            }
            instance={lastJsonMessage?.data?.instance}
            percentage={
              lastJsonMessage?.type === 'data_transformation' &&
              `${lastJsonMessage?.data?.message}`
            }
          />
        ) : null}
        {/* <ServerProgress /> */}
      </div>
    </main>
  );
}
