import InvoiceIcon from "../../public/invoice-icon";
import ListIcon from "../../public/list-icon";

export const SIDEBAR_MENU = [
  {
    id: "menu",
    label: "Menu",
    icon: null,
    path: null,
    children: [
      {
        id: "invoices-add",
        label: "Add Invoice",
        icon: InvoiceIcon, // Sesuaikan dengan library ikon yang digunakan
        path: "/invoices/add",
      },
      {
        id: "invoices-list",
        label: "My Invoices",
        icon: ListIcon,
        path: "/invoices/list",
      },
    ],
  },
];

export const drawerWidth = 280;
