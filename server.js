const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let alerts = [];

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kalangeatharv@gmail.com",
        pass: "fczl lqjj rgkb aerf"
    }
});


const sendEmail = (alert) => {
    const mailOptions = {
        from: "kalangeatharv@gmail.com",
        to: "rishiwidcrown89@hotmail.com",
        subject: "🚨 Xbox Usage Alert!",
        text: `${alert.roommate} saw ${alert.friendPlaying} playing Xbox at ${new Date(alert.timestamp).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' })}.`
    };
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error sending email:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});

app.post("/notify", (req, res) => {
    const { roommate, friendPlaying } = req.body;
    if (!roommate || !friendPlaying) {
        return res.status(400).json({ error: "Both roommate and friendPlaying fields are required" });
    }

    const alert = { roommate, friendPlaying, timestamp: new Date() };
    alerts.push(alert);

    sendEmail(alert);

    res.json({ message: "Notification sent", alert });
});

app.get("/alerts", (req, res) => {
    res.json({ alerts });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
