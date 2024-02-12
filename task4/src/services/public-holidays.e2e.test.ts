import request from "supertest";
import { SUPPORTED_COUNTRIES, PUBLIC_HOLIDAYS_API_URL } from "../config";

const countryCode: string = SUPPORTED_COUNTRIES[0];

describe("E2E", () => {
  let currentYear: number;

  beforeEach(() => {
    currentYear = new Date().getFullYear();
  });

  test("PublicHolidays should return status code 200", async () => {
    const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${currentYear}/${countryCode}`
    );

    expect(status).toBe(200);
  });

  test("PublicHolidays should return status code 404 when invalid country is provided", async () => {
    const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${currentYear}/invalid`
    );

    expect(status).toBe(404);
  });

  test("IsTodayPublicHoliday should return status code 200 or 204", async () => {
    const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/IsTodayPublicHoliday/${countryCode}`
    );
    const validStatuses = [200, 204];

    expect(validStatuses).toContain(status);
  });

  test("IsTodayPublicHoliday should return status code 404 when invalid country is provided", async () => {
    const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/IsTodayPublicHoliday/invalid`
    );

    expect(status).toBe(404);
  });
});
