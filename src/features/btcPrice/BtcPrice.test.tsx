import React from "react";
import { render } from "../../test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API_URL } from "../../constants";
import { BtcPrice } from "./BtcPrice";

type APIResponse = {
  bpi: {
    USD: {
      rate: number;
    };
  };
  time: {
    updated: string;
  };
};

const mockedApiResponse: APIResponse = {
  bpi: {
    USD: {
      rate: 30000,
    },
  },
  time: {
    updated: "May 30",
  },
};

describe("BtcPrice", () => {
  describe("Success cases", () => {
    const worker = setupServer(
      rest.get<APIResponse>(API_URL, (req, res, ctx) => {
        return res(ctx.json(mockedApiResponse), ctx.delay(500));
      })
    );

    beforeAll(() => {
      worker.listen();
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    afterAll(() => {
      worker.close();
    });

    it("should render correctly with no data", () => {
      render(<BtcPrice />);

      expect(screen.getByText("USD 0")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Obter preço" })).toBeTruthy();
      expect(screen.getByRole("button", { name: "Borrar" })).toBeTruthy();
    });

    it("should get the btc price when the button is pressed", async () => {
      render(<BtcPrice />);

      const getBtcPriceButton = screen.getByRole("button", {
        name: "Obter preço",
      });

      userEvent.click(getBtcPriceButton);

      expect(await screen.findByText("Carregando...")).toBeTruthy();
      expect(await screen.findByText("USD 30000")).toBeTruthy();
      expect(await screen.findByText("May 30")).toBeTruthy();
    });

    it("should clear the quote when the clear button is pressed", async () => {
      render(<BtcPrice />);

      const getRandomQuoteButton = screen.getByRole("button", {
        name: "Obter preço",
      });

      userEvent.click(getRandomQuoteButton);

      // To check if the quote is displayed
      expect(await screen.findByText("USD 30000")).toBeTruthy();

      const clearButton = screen.getByRole("button", { name: "Apagar" });
      userEvent.click(clearButton);

      expect(await screen.findByText("USD 0")).toBeTruthy();
    });
  });

  describe("Error cases", () => {
    const worker = setupServer(
      rest.get<APIResponse>(API_URL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    beforeAll(() => {
      worker.listen();
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    afterAll(() => {
      worker.close();
    });

    it("should show error message if the input is a number", async () => {
      render(<BtcPrice />);

      const getQuoteButton = await screen.findByRole("button", {
        name: "Obter preço",
      });

      userEvent.click(getQuoteButton);

      expect(
        await screen.findByText("Ocorreu um erro ao obter as informações")
      ).toBeTruthy();
    });
  });
});
