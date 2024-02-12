import { PublicHoliday, PublicHolidayShort } from "../types";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const countryCode: string = SUPPORTED_COUNTRIES[0];
const mockedPublicHilidaysList: PublicHoliday[] = [
  {
    date: "date",
    localName: "localName",
    name: "name",
    countryCode: "countryCode",
    fixed: true,
    global: true,
    counties: ["counties"],
    launchYear: 2024,
    types: ["types"],
  },
];
const mockedShortenedPublicHilidaysList: PublicHolidayShort[] = [
  {
    name: "name",
    localName: "localName",
    date: "date",
  },
];

describe("getListOfPublicHolidays", () => {
  let currentYear: number;

  beforeEach(() => {
    currentYear = new Date().getFullYear();
  });

  test("should return list of public holidays", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedPublicHilidaysList });

    const result = await getListOfPublicHolidays(currentYear, countryCode);

    expect(result).toEqual(mockedShortenedPublicHilidaysList);
  });

  test("should return empty list if error occurs", async () => {
    mockedAxios.get.mockRejectedValue({});

    const result = await getListOfPublicHolidays(currentYear, countryCode);

    expect(result).toEqual([]);
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should return true if today is public holiday", async () => {
    mockedAxios.get.mockResolvedValue({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(countryCode);

    expect(result).toBeTruthy();
  });

  test("should return false if today is not public holiday", async () => {
    mockedAxios.get.mockResolvedValue({ status: 204 });

    const result = await checkIfTodayIsPublicHoliday(countryCode);

    expect(result).toBeFalsy();
  });

  test("should return false if error occurs", async () => {
    mockedAxios.get.mockRejectedValue({});

    const result = await checkIfTodayIsPublicHoliday(countryCode);

    expect(result).toBeFalsy();
  });
});

describe("getNextPublicHolidays", () => {
  test("should return list of next public holidays", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedPublicHilidaysList });

    const result = await getNextPublicHolidays(countryCode);

    expect(result).toEqual(mockedShortenedPublicHilidaysList);
  });

  test("should return empty list if error occurs", async () => {
    mockedAxios.get.mockRejectedValue({});

    const result = await getNextPublicHolidays(countryCode);

    expect(result).toEqual([]);
  });
});
