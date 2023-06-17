"use client";

import axios from "axios";
import { useState } from "react";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IStatusEnum } from "@/utils/enums";

interface ApproveButtonProps {
  id?: string;
  refreshOrders: () => void;
  status: string;
}

export const ApproveButton = ({
  id,
  refreshOrders,
  status,
}: ApproveButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (status !== IStatusEnum.APPROVED) {
      try {
        setLoading(true);
        await axios.patch(`/api/orders/status`, {
          id: id,
          status: IStatusEnum.APPROVED,
        });
        refreshOrders();
      } catch (error) {
        console.warn("Patch update order: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <IconButton
        aria-label="approve"
        color={status === IStatusEnum.APPROVED ? "success" : "inherit"}
        onClick={handleApprove}
        disabled={loading}
      >
        <CheckCircleIcon />
      </IconButton>
    </>
  );
};
