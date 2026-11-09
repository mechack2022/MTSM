package com.school.attendance.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Email service for sending emails
 * Supports HTML emails and async sending
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.from:noreply@mtsms.local}")
    private String fromEmail;

    @Value("${app.mail.app-name:MTSMS}")
    private String appName;

    @Value("${app.mail.app-url:http://localhost:3000}")
    private String appUrl;

    /**
     * Send a simple text email
     */
    @Async
    public void sendTextEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);

            mailSender.send(message);
            log.info("Sent text email to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send an HTML email
     */
    @Async
    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = HTML

            mailSender.send(message);
            log.info("Sent HTML email to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send verification email
     */
    @Async
    public void sendVerificationEmail(String to, String recipientName, String verificationLink) {
        String subject = String.format("Verify Your Email - %s", appName);
        String htmlBody = buildVerificationEmailHtml(recipientName, verificationLink);
        sendHtmlEmail(to, subject, htmlBody);
    }

    /**
     * Send welcome email after verification
     */
    @Async
    public void sendWelcomeEmail(String to, String recipientName, String loginUrl, String tempPassword) {
        String subject = String.format("Welcome to %s", appName);
        String htmlBody = buildWelcomeEmailHtml(recipientName, loginUrl, tempPassword);
        sendHtmlEmail(to, subject, htmlBody);
    }

    /**
     * Build HTML for verification email
     */
    private String buildVerificationEmailHtml(String recipientName, String verificationLink) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 30px; }
                        .button {
                            display: inline-block;
                            padding: 12px 30px;
                            background-color: #4F46E5;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>%s</h1>
                        </div>
                        <div class="content">
                            <h2>Hi %s,</h2>
                            <p>Thank you for creating an account with us! Please verify your email address to activate your account.</p>
                            <p>Click the button below to verify your email:</p>
                            <div style="text-align: center;">
                                <a href="%s" class="button">Verify Email Address</a>
                            </div>
                            <p>Or copy and paste this link into your browser:</p>
                            <p style="word-break: break-all; color: #4F46E5;">%s</p>
                            <p><strong>This link will expire in 24 hours.</strong></p>
                            <p>If you didn't create an account, please ignore this email.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 %s. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(appName, recipientName, verificationLink, verificationLink, appName);
    }

    /**
     * Build HTML for welcome email
     */
    private String buildWelcomeEmailHtml(String recipientName, String loginUrl, String tempPassword) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 30px; }
                        .credentials { background-color: #fff; padding: 15px; border-left: 4px solid #10B981; margin: 20px 0; }
                        .button {
                            display: inline-block;
                            padding: 12px 30px;
                            background-color: #10B981;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to %s!</h1>
                        </div>
                        <div class="content">
                            <h2>Hi %s,</h2>
                            <p>Your email has been verified successfully! Your account is now active.</p>
                            <div class="credentials">
                                <h3>Your Login Credentials:</h3>
                                <p><strong>Temporary Password:</strong> <code>%s</code></p>
                                <p style="color: #DC2626; font-size: 14px;">⚠️ Please change this password immediately after your first login.</p>
                            </div>
                            <div style="text-align: center;">
                                <a href="%s" class="button">Login to Your Account</a>
                            </div>
                            <p>If you have any questions, feel free to contact our support team.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 %s. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(appName, recipientName, tempPassword, loginUrl, appName);
    }
}
