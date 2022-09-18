export type TCallback<V=void> = () => V;
export type TArgCallback<T, V=void> = (arg: T) => V;

export type TModalProps = {
  onClose: TCallback;
  open: boolean;
}

export type TProduct = {
  id?: string;
  name: string;
  qty: number;
  price: number;
}