import { SubmitFeedbackUseCase } from "./sumit-feedback-use-case";

//spies = espiões

describe("Submit feedback", () => {
    const createFeedbackSpy = jest.fn();
    const sendMailSpy = jest.fn();

    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: sendMailSpy },
    )

    it("should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "data:image/png;base64,12098714912489021093"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("should not be able to submit feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64,12098714912489021093"
        })).rejects.toThrow();
    });

    it("should not be able to submit feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,12098714912489021093"
        })).rejects.toThrow();
    });

    it("should not be able to submit feedback with an invalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "ta tudo bugado",
            screenshot: "teste.jpg"
        })).rejects.toThrow();
    });
})