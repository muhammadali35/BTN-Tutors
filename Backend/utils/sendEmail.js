// src/utils/sendEmail.js

export const sendAdminRegistrationEmail = async (userData) => {
  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'walihaiderjalali1407@gmail.com',
        pass: 'ukiy xofl qfvy uoaz' // ✅ تمہارا app password
      }
    });

    const mailOptions = {
      from: '"BTN Tutor Admin" <walihaiderjalali1407@gmail.com>',
      to: 'walihaiderjalali1407@gmail.com', // admin email
      subject: `🚨 New ${userData.type} Registration — ${userData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h3 style="color: #2563eb; text-align: center;">👤 New ${userData.type} Registered</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p><strong>📛 Name:</strong> ${userData.name}</p>
            <p><strong>📧 Email:</strong> ${userData.email}</p>
            <p><strong>📞 Phone:</strong> ${userData.mobile || userData.phone || "N/A"}</p>
            ${userData.city ? `<p><strong>🏙️ City:</strong> ${userData.city}</p>` : ''}
            ${userData.subjects ? `<p><strong>📚 Subjects:</strong> ${Array.isArray(userData.subjects) ? userData.subjects.join(', ') : userData.subjects}</p>` : ''}
            ${userData.school ? `<p><strong>🏫 School:</strong> ${userData.school}</p>` : ''}
            <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="text-align: center; color: #6b7280; font-size: 14px;">
            Login to admin panel to review this registration.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent for new ${userData.type}: ${userData.name}`);
  } catch (error) {
    console.error(`❌ Failed to send email for ${userData.type}:`, error);
  }
};