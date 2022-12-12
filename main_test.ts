import sendEmail from "./sendEmail.ts"

Deno.test("Send Email Test", async () => {

  const result = await sendEmail({
    htmlContent: "Hello World",
    subject: "Hello World",
    sender: {
      name: "John Doe",
      email: Deno.env.get("SENDER_EMAIL")!,
    },
    to: [
      {
        name: "John Doe 2",
        email: Deno.env.get("RECEIVER_EMAIL")!,
      },
      // You can send to multiple users
    ],
  });

  console.log(result);

});