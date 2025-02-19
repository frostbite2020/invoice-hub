import { Status } from "@/constants/enum";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";

export type Invoice = {
  invoiceName: string;
  invoiceNumber: string;
  dueDate: string;
  status: Status;
  amount: string;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function getRandomNumberString(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

const newInvoice = (): Invoice => {
  const enumValues = Object.values(Status);
  const formattedDate = format(faker.date.future(), "MMM dd, yyyy");
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(faker.commerce.price({ min: 10000, max: 1000000, dec: 0 })));

  return {
    invoiceName: faker.commerce.productName(),
    invoiceNumber: `INV` + getRandomNumberString(6),
    dueDate: formattedDate,
    status: faker.helpers.shuffle(enumValues)[0],
    amount: formattedCurrency,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Invoice[] => {
    const len = lens[depth]!;
    return range(len).map((d): Invoice => {
      return {
        ...newInvoice(),
      };
    });
  };

  return makeDataLevel();
}
