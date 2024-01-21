import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const data = await request.json();
    const { name, email, phone, query } = data;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    let mailDetails = {
      from: process.env.NODEMAILER_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Query using Next blog website",
      html: `
    <p>${query}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone number:</strong> ${phone}</p>
  `,
    };

    await mailTransporter.sendMail(mailDetails);

    return new Response(
      JSON.stringify({ message: "Query sent successfully", success: true }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error Occurs", error);
    return new Response(
      JSON.stringify({ error: "Error while sending the query" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
