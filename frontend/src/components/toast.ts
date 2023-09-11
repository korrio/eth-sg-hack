import { toast } from 'react-toastify';

const showToast = {
	current: (message:string, id:string) =>
		toast(message, {
			autoClose: 1666,
			toastId: id
		}),
	success: (message:string, id:string) =>
		toast.success(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	error: (message = 'An error occurred. Please try again later.', id:string) =>
		toast.error(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	warn: (message:string, id:string) =>
		toast.info(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	info: (message:string, id:string) =>
		toast.info(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		})
};

export default showToast;
