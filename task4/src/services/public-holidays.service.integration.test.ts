import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
} from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

const countryCode: string = SUPPORTED_COUNTRIES[0];

describe("Integration test", () => {
  let currentYear: number;

  beforeEach(() => {
    currentYear = new Date().getFullYear();
  });

  test("should return list of public holidays", async () => {
    const result = await getListOfPublicHolidays(currentYear, countryCode);

    expect(result.length).toBeGreaterThan(0);
  });

  test("should return true if today is public holiday", async () => {
    const result = await checkIfTodayIsPublicHoliday(countryCode);

    expect(typeof result).toBe("boolean");
  });

  test("should return list of next public holidays", async () => {
    const result = await getListOfPublicHolidays(currentYear, countryCode);

    expect(result.length).toBeGreaterThan(0);
  });
});
