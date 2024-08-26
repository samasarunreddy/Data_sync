import { notifications } from '@mantine/notifications';
import CancelRed from '../../public/assets/icons/cancel_red.svg';
import SuccessCheck from '../../public/assets/icons/check_primary.svg';

const SuccessToast = ({ text = '' }) => {
  notifications.show({
    // title: 'Success',
    message: text,
    icon: <SuccessCheck />,
    color: '#ffffff',
    classNames: {
      icon: '!bg-[#97B2CB]  ',
    },
    className: 'success-toast',
    withCloseButton: false,
  });
};
const ErrorToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    // title: 'Error',
    message: text,
    color: '#97B2CB',
    icon: <CancelRed />,
    classNames: {
      icon: '!bg-[#97B2CB] ',
    },
    className: 'error-toast',
    withCloseButton: false,
  });
};

export { SuccessToast, ErrorToast };
