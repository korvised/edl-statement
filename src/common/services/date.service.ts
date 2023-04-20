import { format } from "date-fns"

const IOS_FORMAT = "yyyy-MM-dd"
const LA_FORMAT = "dd/MM/yyyy"

export class DateService {
  private readonly currentDate = new Date()

  getCurrentDate(): Date {
    return this.currentDate
  }

  getLocaleDateString() {
    return format(new Date(this.currentDate), LA_FORMAT)
  }

  getFirstDateOfMonth(): Date {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    )
  }

  getIOSCurrentDate(): string {
    return this.formatIOSDate(new Date())
  }

  getCurrentYear(): number {
    return this.currentDate.getFullYear()
  }

  formatIOSDate(data: Date | string) {
    return format(new Date(data), IOS_FORMAT)
  }

  formatLocaleDate(date: Date | string) {
    return format(new Date(date), LA_FORMAT)
  }

  getTwoDateText(startDate: Date | string, endDate: Date | string): string {
    const start = this.formatIOSDate(startDate)
    const end = this.formatIOSDate(endDate)

    if (start === end) {
      return "ວັນທີ " + this.formatLocaleDate(start)
    } else {
      return (
        "ລະຫວ່າງວັນທີ " +
        this.formatLocaleDate(start) +
        " - " +
        this.formatLocaleDate(end)
      )
    }
  }
}
