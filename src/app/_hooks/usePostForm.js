import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';

export default function usePostForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.VERIFY_CARD,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('card');
      SuccessToast({
        text: data?.message ?? 'Card updated succesfully!',
      });
    },
    onError: (error) => {
      ErrorToast({
        text: error?.response?.data?.message ?? 'Something went wrong',
      });
    },
  });
}
