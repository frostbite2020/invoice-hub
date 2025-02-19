import { Chip } from "@mui/material";
import { Status } from "@/constants/enum";

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClasses = {
    [Status.paid]: "bg-green-100 text-[#219653]",
    [Status.unpaid]: "bg-red-100 text-[#D34053]",
    [Status.pending]: "bg-yellow-100 text-[#FFA70B]",
  };

  return (
    <Chip
      label={status}
      className={`font-medium text-sm px-3 py-1 rounded-2xl ${statusClasses[status]}`}
    />
  );
};

export default StatusBadge;
