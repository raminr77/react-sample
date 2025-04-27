import notify, {
  type Toast,
  type Renderable,
  type ToastOptions,
  type ValueOrFunction
} from 'react-hot-toast';

type Message = ValueOrFunction<Renderable, Toast>;
type ToastProps = ToastOptions & {
  message: Message;
  isDark?: boolean;
};

const propsGenerator = (props: ToastProps) => ({
  duration: 3000,
  ...props,
  style: {
    ...props.style,
    ...(props.isDark
      ? {
          color: '#fff',
          background: '#333'
        }
      : {})
  }
});

export const toast = {
  info: (props: ToastProps) => notify(props.message, propsGenerator(props)),
  error: (props: ToastProps) => notify.error(props.message, propsGenerator(props)),
  custom: (props: ToastProps) => notify.custom(props.message, propsGenerator(props)),
  loading: (props: ToastProps) => notify.loading(props.message, propsGenerator(props)),
  success: (props: ToastProps) => notify.success(props.message, propsGenerator(props)),
  //
  removeAll: () => notify.remove(),
  dismissAll: () => notify.dismiss(),
  remove: (toastId: string) => notify.remove(toastId),
  dismiss: (toastId: string) => notify.dismiss(toastId)
};
