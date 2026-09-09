import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { fetchSettings } from "@/lib/api";
import { escapeHtml } from "@/lib/utils";

const DESIGNATION = "Software Engineer & Full-Stack Digital Marketer";
const PHONE_DISPLAY = "+880 1815-654292";
const PHONE_TEL = "+8801815654292";
const DEFAULT_LOGO_URL = "https://www.nasiruddin.net/nasirLogo.png";

// Same path data as the FA6 icons already used across the site (react-icons/fa6),
// inlined here so the email doesn't depend on any third-party icon CDN.
const SOCIAL_ICONS = {
  FaLinkedinIn: {
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
    color: "#0077B5",
  },
  FaFacebookF: {
    viewBox: "0 0 320 512",
    path: "M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z",
    color: "#1877F2",
  },
  FaInstagram: {
    viewBox: "0 0 448 512",
    path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
    color: "#E4405F",
  },
  FaXTwitter: {
    viewBox: "0 0 512 512",
    path: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
    color: "#000000",
  },
  FaBehance: {
    viewBox: "0 0 576 512",
    path: "M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z",
    color: "#1769FF",
  },
};

function buildThankYouEmail({ firstName, message, socialLinks, logoUrl }) {
  const socialsHtml = (socialLinks || [])
    .filter((s) => s.url && s.name && SOCIAL_ICONS[s.icon])
    .map((s) => {
      const meta = SOCIAL_ICONS[s.icon];
      return `<a href="${escapeHtml(s.url)}" title="${escapeHtml(s.name)}" style="display:inline-block;width:32px;height:32px;line-height:32px;border-radius:50%;background:${meta.color};text-align:center;margin:0 5px;text-decoration:none;">
        <svg width="14" height="14" viewBox="${meta.viewBox}" style="vertical-align:middle;" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="${meta.path}"/></svg>
      </a>`;
    })
    .join("");

  return `
  <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
    <div style="background:#111111;padding:32px 24px;text-align:center;">
      <img src="${escapeHtml(logoUrl || DEFAULT_LOGO_URL)}" alt="Nasir Uddin" height="40" style="height:40px;width:auto;display:inline-block;" />
    </div>

    <div style="padding:32px 24px;">
      <p style="font-size:16px;color:#111111;margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
      <p style="font-size:15px;line-height:1.6;color:#333333;margin:0 0 20px;">
        Thank you for reaching out! I've received your message and truly appreciate you taking the time to connect.
        I'll review it and get back to you as soon as possible, usually within 1&ndash;2 business days.
      </p>

      <div style="background:#f7f7f7;border-left:3px solid #fceb3b;padding:16px 20px;margin:0 0 24px;border-radius:4px;">
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888888;">Your message</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>

      <p style="font-size:15px;line-height:1.6;color:#333333;margin:0 0 28px;">
        In the meantime, feel free to connect with me on social media below.
      </p>

      <div style="padding-top:24px;border-top:1px solid #eeeeee;">
        <p style="margin:0;font-size:15px;font-weight:bold;color:#111111;">Nasir Uddin</p>
        <p style="margin:2px 0 10px;font-size:13px;color:#666666;">${escapeHtml(DESIGNATION)}</p>
        <p style="margin:0 0 12px;font-size:13px;color:#666666;">
          <a href="tel:${PHONE_TEL}" style="color:#666666;text-decoration:none;">${PHONE_DISPLAY}</a>
          &nbsp;&nbsp;<span style="color:#cccccc;">|</span>&nbsp;&nbsp;
          <a href="mailto:${process.env.GMAIL_USER}" style="color:#666666;text-decoration:none;">${process.env.GMAIL_USER}</a>
        </p>
        ${socialsHtml ? `<p style="margin:8px 0 0;">${socialsHtml}</p>` : ""}
      </div>
    </div>

    <div style="background:#f7f7f7;padding:16px 24px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#999999;">&copy; ${new Date().getFullYear()} Nasir Uddin. All rights reserved.</p>
    </div>
  </div>
  `;
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, subject, otherSubject, message } = data;

    if (!firstName || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const finalSubject = subject === "Other" && otherSubject ? otherSubject : subject;

    await dbConnect();
    await Contact.create({ firstName, lastName, email, phone, subject: finalSubject, message });

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = getTransporter();
      const settings = await fetchSettings();

      const results = await Promise.allSettled([
        transporter.sendMail({
          from: `Nasir Uddin <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Thanks for reaching out!",
          html: buildThankYouEmail({ firstName, message, socialLinks: settings?.socials, logoUrl: settings?.logoUrl }),
        }),
        transporter.sendMail({
          from: `Portfolio Contact Form <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER,
          replyTo: email,
          subject: `New inquiry: ${finalSubject}`,
          html: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone) || "N/A"}</p>
            <p><strong>Subject:</strong> ${escapeHtml(finalSubject)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          `,
        }),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Contact form: email ${i === 0 ? "to visitor" : "to admin"} failed:`, r.reason);
        }
      });
    } else {
      console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not configured, skipping emails");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
}
