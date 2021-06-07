import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useToggle } from "react-use";
import { Column } from "devextreme-react/data-grid";

const useAals = () => fetch(`/aals`);

const AalList = ({ canUpdate }) => {
  const { t } = useTranslation();
  const [show, toggle] = useToggle(false);
  const tableRef = useRef();
  const { loading, data: aals, error, refetch } = useAals();

  if (loading) return <p>Loading</p>;
  if (error && !toast.isActive("errorToast")) {
    toast.error("An error occured while processing your request", {
      toastId: "errorToast",
      autoClose: false
    });
  }

  return <p>Loading</p>;
};

export default AalList;
