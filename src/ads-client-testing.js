import { toast } from "react-toastify";

export const useFetchMocks = (hook) => (result) =>
  hook.mockReturnValue({
    loading: false,
    isLoading: false,
    data: null,
    error: null,
    refetch: jest.fn(),
    ...result
  });

export const getTableCheckboxByIndex = (container, rowIndex) => {
  const element = Array.from(container.querySelectorAll(".dx-select-checkbox"))[
    rowIndex + 1
  ];
  if (!element) throw new Error(`Unable to find element at row# ${rowIndex}`);
  return element;
};

jest.mock("react-toastify");

export const getToastMessage = (type = "success") =>
  toast[type].mock.calls[0][0];
