import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  within
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import $ from "jquery";

import AalList from "./AalList";
import { fakeAals } from "./aal.fixtures";
import { useAals, deleteAals } from "./aalApi";
import {
  useFetchMocks,
  getTableCheckboxByIndex,
  getToastMessage
} from "./ads-client-testing";

// UTILS

const renderComponent = (props = {}) =>
  render(
    <BrowserRouter>
      <AalList {...props} />
    </BrowserRouter>
  );

$.fn.modal = jest.fn();

// MOCKS
jest.mock("./aalApi");
jest.mock("react-toastify");
jest.mock("../../../../history");
jest.mock("../../../../helper/TableHelper");

const useFakeUseAals = useFetchMocks(useAals);

describe("AAL list", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading at first", async () => {
    useFakeUseAals({ loading: true });
    renderComponent();
    await waitFor(() =>
      expect(screen.queryByTestId("loading")).toBeInTheDocument()
    );
  });
  it("should trigger toast if errors", async () => {
    useFakeUseAals({ loading: false, error: "unable to fetch" });
    renderComponent();
    await waitFor(() =>
      expect(getToastMessage(toast.TYPE.ERROR)).toEqual(
        "An error occured while processing your request"
      )
    );
  });

  it("Displays a message when no costs retrieved", async () => {
    useFakeUseAals({ data: { payload: [] } });

    renderComponent();
    await waitFor(() =>
      expect(screen.queryByText(/No data/i)).toBeInTheDocument()
    );
  });

  it.only("Displays elements", async () => {
    useFakeUseAals({ data: { payload: fakeAals } });
    renderComponent();
    await waitFor(() => expect(screen.getByText("CON-MP")).toBeInTheDocument());
    expect(screen.getByText("ACTR-DEL")).toBeInTheDocument();
    expect(screen.queryByText("ACTR-MOD")).not.toBeInTheDocument();
  });

  it("Throws on delete failure", async () => {
    deleteAals.mockRejectedValue("API failure");
    const refetch = jest.fn();
    useFakeUseAals({ data: { payload: fakeAals }, refetch });
    const { container } = renderComponent({ canUpdate: true });
    await selectFirstRowThenDelete(container);
    await waitFor(() => expect(refetch).toHaveBeenCalledTimes(0));
  });

  it("Throws on delete failure", async () => {
    deleteAals.mockRejectedValue({ ok: false });
    const refetch = jest.fn();
    useFakeUseAals({ data: { payload: fakeAals }, refetch });
    const { container } = renderComponent({ canUpdate: true });
    await selectFirstRowThenDelete(container);
    await waitFor(() => expect(refetch).toHaveBeenCalledTimes(0));
  });

  it("Success on delete then refresh", async () => {
    deleteAals.mockResolvedValue({ ok: true });
    const refetch = jest.fn();
    useFakeUseAals({ data: { payload: fakeAals }, refetch });
    const { container } = renderComponent({ canUpdate: true });
    await selectFirstRowThenDelete(container);
    await waitFor(() => expect(refetch).toHaveBeenCalledTimes(1));
  });
});

const selectFirstRowThenDelete = async (container) => {
  await waitFor(() => expect(screen.getByText("CON-MP")).toBeInTheDocument());
  const deleteBtn = screen.getByTestId("delete-aal-action");
  expect(deleteBtn).toBeInTheDocument();

  const firstTableRow = getTableCheckboxByIndex(container, 1);
  fireEvent.click(firstTableRow);
  fireEvent.click(deleteBtn);

  const { getByText: getByTextFromModal } = within(
    container.querySelector("#delete")
  );
  const deleteConfirmBtn = getByTextFromModal("Ok");
  fireEvent.click(deleteConfirmBtn);
};
