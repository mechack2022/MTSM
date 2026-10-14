package com.school.attendance.email.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailTemplateService {

    @Value("${app.mail.app-url}")
    private String appUrl;

    @Value("${app.mail.app-name}")
    private String appName;

    /**
     * Render email verification template
     */
    public String renderVerificationEmail(String fullName, String verificationToken) {
        String verificationLink = appUrl + "/verify-email?token=" + verificationToken;

        return buildEmailTemplate(
            "Verify Your Email Address",
            String.format("Hi %s,", fullName),
            "Welcome to " + appName + "! Please verify your email address to activate your account.",
            "Verify Email Address",
            verificationLink,
            "This link will expire in 24 hours.",
            "If you didn't create an account, you can safely ignore this email."
        );
    }

    /**
     * Render password reset template
     */
    public String renderPasswordResetEmail(String fullName, String resetToken) {
        String resetLink = appUrl + "/reset-password?token=" + resetToken;

        return buildEmailTemplate(
            "Reset Your Password",
            String.format("Hi %s,", fullName),
            "We received a request to reset your password. Click the button below to create a new password.",
            "Reset Password",
            resetLink,
            "This link will expire in 1 hour.",
            "If you didn't request a password reset, you can safely ignore this email."
        );
    }

    /**
     * Render welcome email template
     */
    public String renderWelcomeEmail(String fullName, String tenantName) {
        String dashboardLink = appUrl + "/dashboard";

        return buildEmailTemplate(
            "Welcome to " + appName + "!",
            String.format("Hi %s,", fullName),
            String.format("Your email has been verified! You're all set to start using %s for %s.",
                appName, tenantName),
            "Go to Dashboard",
            dashboardLink,
            "Get started by exploring the dashboard and setting up your first school.",
            null
        );
    }

    /**
     * Render invitation email template
     */
    public String renderInvitationEmail(String fullName, String invitedByName,
                                       String organizationName, String inviteToken) {
        String acceptLink = appUrl + "/accept-invite?token=" + inviteToken;

        return buildEmailTemplate(
            "You've Been Invited!",
            String.format("Hi %s,", fullName),
            String.format("%s has invited you to join %s on %s. " +
                    "Click the button below to accept the invitation and create your account.",
                invitedByName, organizationName, appName),
            "Accept Invitation",
            acceptLink,
            "This invitation will expire in 7 days.",
            "If you weren't expecting this invitation, you can safely ignore this email."
        );
    }

    /**
     * Build a complete HTML email template
     */
    private String buildEmailTemplate(String title, String greeting, String message,
                                      String buttonText, String buttonLink,
                                      String footerNote, String disclaimer) {
        StringBuilder html = new StringBuilder();

        html.append("<!DOCTYPE html>");
        html.append("<html lang=\"en\">");
        html.append("<head>");
        html.append("<meta charset=\"UTF-8\">");
        html.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        html.append("<title>").append(title).append("</title>");
        html.append("<style>");
        html.append("body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ");
        html.append("line-height: 1.6; color: #333333; background-color: #f4f4f4; margin: 0; padding: 0; }");
        html.append(".container { max-width: 600px; margin: 40px auto; ");
        html.append("background-color: #ffffff; border-radius: 8px; overflow: hidden; ");
        html.append("box-shadow: 0 4px 6px rgba(0,0,0,0.1); }");
        html.append(".header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); ");
        html.append("color: #ffffff; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 28px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; }");
        html.append(".greeting { font-size: 18px; font-weight: 600; color: #333333; margin-bottom: 20px; }");
        html.append(".message { font-size: 16px; color: #555555; margin-bottom: 30px; line-height: 1.8; }");
        html.append(".button { display: inline-block; padding: 14px 30px; ");
        html.append("background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); ");
        html.append("color: #ffffff !important; text-decoration: none; border-radius: 6px; ");
        html.append("font-weight: 600; font-size: 16px; text-align: center; ");
        html.append("transition: transform 0.2s, box-shadow 0.2s; }");
        html.append(".button:hover { transform: translateY(-2px); ");
        html.append("box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4); }");
        html.append(".footer-note { margin-top: 30px; padding-top: 20px; ");
        html.append("border-top: 1px solid #e0e0e0; font-size: 14px; color: #777777; }");
        html.append(".disclaimer { margin-top: 20px; font-size: 13px; color: #999999; ");
        html.append("padding: 15px; background-color: #f9f9f9; border-radius: 4px; }");
        html.append(".footer { background-color: #f8f8f8; padding: 25px 30px; ");
        html.append("text-align: center; border-top: 1px solid #e0e0e0; }");
        html.append(".footer p { margin: 5px 0; font-size: 13px; color: #777777; }");
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");
        html.append("<div class=\"container\">");

        // Header
        html.append("<div class=\"header\">");
        html.append("<h1>").append(appName).append("</h1>");
        html.append("</div>");

        // Content
        html.append("<div class=\"content\">");
        html.append("<p class=\"greeting\">").append(greeting).append("</p>");
        html.append("<p class=\"message\">").append(message).append("</p>");

        // Button
        html.append("<div style=\"text-align: center; margin: 30px 0;\">");
        html.append("<a href=\"").append(buttonLink).append("\" class=\"button\">");
        html.append(buttonText);
        html.append("</a>");
        html.append("</div>");

        // Footer note
        if (footerNote != null && !footerNote.isEmpty()) {
            html.append("<p class=\"footer-note\">").append(footerNote).append("</p>");
        }

        // Disclaimer
        if (disclaimer != null && !disclaimer.isEmpty()) {
            html.append("<div class=\"disclaimer\">").append(disclaimer).append("</div>");
        }

        // Alternative link
        html.append("<p style=\"margin-top: 30px; font-size: 13px; color: #999999;\">");
        html.append("Or copy and paste this link into your browser:<br>");
        html.append("<span style=\"word-break: break-all; color: #667eea;\">");
        html.append(buttonLink);
        html.append("</span>");
        html.append("</p>");

        html.append("</div>");

        // Footer
        html.append("<div class=\"footer\">");
        html.append("<p>&copy; 2026 ").append(appName).append(". All rights reserved.</p>");
        html.append("<p>Complete school management solution for modern educational institutions.</p>");
        html.append("</div>");

        html.append("</div>");
        html.append("</body>");
        html.append("</html>");

        return html.toString();
    }
}
