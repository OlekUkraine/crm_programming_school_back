// export class ApiError extends Error {
//   status: number;
//
//   constructor(message: string, status: number) {
//     super(message);
//     this.status = status;
//   }
// }

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        status: this.status,
      },
    };
  }
}
