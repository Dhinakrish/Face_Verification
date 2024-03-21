export type ButtonMoleculeInterface = {
  backgroundColor?: string;
  style?: object;
  isLoading?: boolean;
  textColor?: string;
  type?: string;
  title?: string;
  onTap?: Callback;
};
type Callback = () => any;
