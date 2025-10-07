import dotenv from "dotenv";
dotenv.config({ path: "./.env.test" });
import { jest } from "@jest/globals";
import mockPrisma from "./mocks/prisma.mock.js";

jest.mock("../config/prisma.client.js", () => ({
    __esModule: true,
    default: mockPrisma,
    prisma: mockPrisma,
}));

jest.mock("../services/email.service.js", () => ({
    __esModule: true,
    emailClient: jest.fn(),
    emailAdmin: jest.fn(),
}));
