import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LogIn from "../components/Login";
import App from "../App";
import { BrowserRouter, matchRoutes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";

const DOMAIN: string = process.env.REACT_APP_DOMAIN ?? "";

/** Testing  Link in Home page */
test('renders "Get Started" link', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Get started/i);
  expect(linkElement).toBeDefined();
});

/** Testing  Login in Login page */
test("submits correct values", async () => {
  const mockFetch = jest.fn();
  window.fetch = mockFetch;
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }), // replace with the actual response
  });

  render(
    <BrowserRouter>
      <RecoilRoot>
        <LogIn />
      </RecoilRoot>
    </BrowserRouter>
  );

  await act(async () => {
    await userEvent.type(screen.getByLabelText("Name"), "Test Name");
    await userEvent.type(screen.getByLabelText("Email address"), "World@gmail.com");
    await userEvent.click(screen.getByText("Sign in"));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
  });

  expect(mockFetch).toHaveBeenCalledWith(DOMAIN + "/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "World@gmail.com", name: "Test Name" }),
  });
});
