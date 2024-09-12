import RegistrationPage from "./Registrationpage";
import { render, screen } from '@testing-library/react';
import { fetchAPI, submitAPI, submitAPI } from "./api";

// Write the first test
test('form contains labels', () => {
    render(<RegistrationPage/>)
    const dateLabel = screen.getByText(/Choose date/i);
    expect(dateLabel).toBeInTheDocument();
    const timeLabel = screen.getByText(/Choose time/i);
    expect(timeLabel).toBeInTheDocument();
    const guestsLabel = screen.getByText(/Number of guests/i);
    expect(guestsLabel).toBeInTheDocument();
    const occasionLabel = screen.getByText(/Occasion/i);
    expect(occasionLabel).toBeInTheDocument();
});

test('form contains valid input fields', () => {
    render(<RegistrationPage/>)
    const input = screen.findByRole("input", { name: /res-date/i });
    userEvent.type(input, "12/12/2024");
    expect(mockedOnChange).toHaveBeenCalledWith("12/12/2024");
    const inputguests = screen.findByRole("input", { name: /guests/i });
    userEvent.type(input, "2");
    expect(mockedOnChange).toHaveBeenCalledWith("2");
    const select = screen.findByRole("input", { name: /res-time/i });
    expect(select).toBeInTheDocument();
    const selectOccasion = screen.findByRole("input", { name: /occasion/i });
    expect(selectOccasion).toBeInTheDocument();
});

test('api gives valid responses', () => {
    const times = fetchAPI(new Date)
    expect(times).toBeInstanceOf(Array)
    const submitAPI = submitAPI("fake data")
    expect(submitAPI).toBe(true)
});

