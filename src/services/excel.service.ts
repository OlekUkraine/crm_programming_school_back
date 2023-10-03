import * as ExcelJS from "exceljs";

import { IOrder } from "../types";

class ExcelService {
  public async createExcelFile(
    filteredData: IOrder[],
  ): Promise<ExcelJS.Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      {
        header: `Ім'я`,
        key: "name",
        width: 15,
        font: {
          name: "Comic Sans MS",
          family: 4,
          size: 16,
          underline: "double",
          bold: true,
        },
      },
      { header: "Прізвище", key: "surname", width: 15 },
      { header: "Email", key: "email", width: 25 },
    ];

    filteredData.forEach((order) => {
      worksheet.addRow({
        name: order.name,
        surname: order.surname,
        email: order.email,
      });
    });

    worksheet.eachRow((row) => {
      row.height = 42.5;
      row.alignment = {
        vertical: "middle",
        wrapText: true,
        indent: 10,
      };
    });

    return await workbook.xlsx.writeBuffer();
  }
}

export const excelService = new ExcelService();
