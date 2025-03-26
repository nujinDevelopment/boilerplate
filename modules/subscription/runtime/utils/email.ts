import nodemailer from 'nodemailer'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
})

export const sendWelcomeEmail = async (email: string, unsubscribeToken: string) => {
  const mailOptions = {
    from: `"${config.email.name}" <${config.email.user}>`,
    to: email,
    subject: 'Welcome to the newsletter!',
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #1a1b1e;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #00ff9d, #7c3aed, #ff006e);
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #1f2937;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .highlight {
            color: #00ff9d;
            font-weight: bold;
          }
          .accent {
            color: #ff006e;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed);
            color: #000000;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #ffffff80;
          }
          .divider {
            height: 2px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed, #ff006e);
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to the Future of Growth! 🚀</h1>
          </div>
          <div class="content">
            <p>Hey there,</p>
            <p>You've just taken the first step towards <span class="highlight">effortless business growth</span>. I'm Chris, and I'm here to help you discover your business leverage points and set up systems that work for you while you sleep.</p>
            <div class="divider"></div>
            <p><span class="accent">Here's what you can expect:</span></p>
            <ul>
              <li>🤖 Automation strategies that save you precious time</li>
              <li>💎 Tips to identify and leverage your business strengths</li>
              <li>📈 Growth tactics that scale without burning you out</li>
              <li>🔄 Systems that work on autopilot while you focus on what matters</li>
            </ul>
            <div class="divider"></div>
            <p>Get ready for insights that will transform your approach to business growth!</p>
            <p>To your success,<br>Chris</p>
          </div>
        </div>
      </body>
    </html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error: any) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}
