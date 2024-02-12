import {
  validateCountry,
  validateYear,
  validateInput,
  shortenPublicHoliday,
} from "./helpers";
import { SUPPORTED_COUNTRIES } from "./config";
import { PublicHoliday } from "./types";

describe("validateCountry", () => {
  test("should return true for valid country", () => {
    const validCountry: string = SUPPORTED_COUNTRIES[0];
    expect(validateCountry(validCountry)).toBe(true);
  });

  test("should return false for invalid country", () => {
    const invalidCountry: string = "invalid";
    expect(validateCountry(invalidCountry)).toBe(false);
  });
});

describe("validateYear", () => {
  test("should return true for current year", () => {
    const currentYear: number = new Date().getFullYear();
    expect(validateYear(currentYear)).toBe(true);
  });

  test("should return false for non-current year", () => {
    const nonCurrentYear: number = new Date().getFullYear() - 1;
    expect(validateYear(nonCurrentYear)).toBe(false);
  });
});

describe("validateInput", () => {
  test("should return true for valid input", () => {
    const validInput: { year: number; country: string } = {
      year: new Date().getFullYear(),
      country: SUPPORTED_COUNTRIES[0],
    };
    expect(validateInput(validInput)).toBe(true);
  });

  test("should throw error for invalid country", () => {
    const invalidCountry: string = "invalid";
    expect(() => validateInput({ country: invalidCountry })).toThrowError(
      `Country provided is not supported, received: ${invalidCountry}`
    );
  });

  test("should throw error for non-current year", () => {
    const nonCurrentYear: number = new Date().getFullYear() - 1;
    expect(() => validateInput({ year: nonCurrentYear })).toThrowError(
      `Year provided not the current, received: ${nonCurrentYear}`
    );
  });
});

describe("shortenPublicHoliday", () => {
  test("should return shortened public holiday", () => {
    const publicHoliday: PublicHoliday = {
      date: "date",
      localName: "localName",
      name: "name",
      countryCode: "countryCode",
      fixed: true,
      global: true,
      counties: ["counties"],
      launchYear: 2024,
      types: ["types"],
    };
    expect(shortenPublicHoliday(publicHoliday)).toEqual({
      name: "name",
      localName: "localName",
      date: "date",
    });
  });
});
