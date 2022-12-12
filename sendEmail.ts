export interface User {
    name: string;
    email: string;
}

export interface Message {
    to: Array<User>;
    htmlContent: string;
    subject: string;
    sender: User;
}

export default async function sendEmail(options: Message): Promise<void> {

    const SENDIN_BLUE_URL = "https://api.sendinblue.com/v3/smtp/email";
    const mailOptions: Message = options

    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "api-key": Deno.env.get("SENDINBLUE_API_KEY")!,
    }

    try {

        const resp = await fetch(SENDIN_BLUE_URL, {
            headers: requestHeaders,
            method: "POST",
            body: JSON.stringify(mailOptions)
        });

        const data = await resp.json();
        if (data?.message) throw new Error(data.message);

        for (const user of mailOptions.to) {
            console.log(`🔥 EMAIL SENT TO ${user.email} 🎯`);
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}