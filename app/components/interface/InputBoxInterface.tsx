export type InputBoxInterface = {
  title: string;
  onPress: () => void;
  color: string;
  customStyle: object;
  setRef: () => void;
  error: string;
  value: string;
  formatText: string;
  label: string;
  onChangeText: (value: string) => void;
  returnKeyType: string;
  maxLength: number;
  id: string;
  onSubmitEditing: () => {};
};
