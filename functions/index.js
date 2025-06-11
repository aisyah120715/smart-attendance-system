const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Set up the mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smart.attendance.system25@gmail.com',
    pass: 'lfyf ckfi xfdl buyj'
  }
});

// Cloud Function to send attendance warning email
exports.sendWarningEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email, name, studentID, courseCode, course, percent, warning, lecturerName } = req.body;

      const mailOptions = {
        from: 'Smart Attendance <smart.attendance.system25@gmail.com>',
        to: email,
        subject: `Attendance Warning: ${course}`,
        html: `
          <p><strong>Notification on Low Class Attendance</strong></p>
          <p>This email serves as a notification regarding your attendance record for the following course, which currently stands at <strong>${percent}%</strong>.</p>

          <p>
            <strong>Name:</strong> ${name}<br>
            <strong>Student ID:</strong> ${studentID}<br>
            <strong>Course Code:</strong> ${courseCode}<br>
            <strong>Course Name:</strong> ${course}<br>
            <strong>Status:</strong> ${warning}
          </p>

          <p>Please take the necessary steps to improve your attendance.</p>

          <p>Regards,<br><strong>${lecturerName}</strong></p>
        `
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  });
});
