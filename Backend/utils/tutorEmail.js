import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendAdminNotification = async (tutor) => {
  try {
    const msg = {
      to: process.env.ADMIN_EMAIL, // admin email
      from: {
        email: "no-reply@tutorportal.com", 
        name: "Tutor Portal Notifications",
      },
      subject: "🔔 New Tutor Registration",
      text: `Ek naya tutor register hua hai!\n\n
      Name: ${tutor.name}
      Email: ${tutor.email}
      Mobile: ${tutor.mobile}
      WhatsApp: ${tutor.whatsapp}
      City: ${tutor.city}`,
    };

    await sgMail.send(msg);
    console.log("✅ Admin ko email bhej diya (SendGrid)");
  } catch (error) {
    console.error("❌ Email bhejne me error:", error);
  }
};
