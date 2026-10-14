package com.school.attendance.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailTemplateService templateService;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.app-name}")
    private String appName;

    /**
     * Send a simple text email
     */
    @Async
    public void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Simple email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send an HTML email
     */
    @Async
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true = HTML

            mailSender.send(message);
            log.info("HTML email sent successfully to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send HTML email to: {}", to, e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send email verification email
     */
    public void sendVerificationEmail(String to, String fullName, String verificationToken) {
        try {
            String subject = String.format("Verify your %s account", appName);
            String htmlContent = templateService.renderVerificationEmail(fullName, verificationToken);

            sendHtmlEmail(to, subject, htmlContent);
            log.info("Verification email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", to, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    /**
     * Send password reset email
     */
    public void sendPasswordResetEmail(String to, String fullName, String resetToken) {
        try {
            String subject = String.format("Reset your %s password", appName);
            String htmlContent = templateService.renderPasswordResetEmail(fullName, resetToken);

            sendHtmlEmail(to, subject, htmlContent);
            log.info("Password reset email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", to, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    /**
     * Send welcome email after verification
     */
    public void sendWelcomeEmail(String to, String fullName, String tenantName) {
        try {
            String subject = String.format("Welcome to %s!", appName);
            String htmlContent = templateService.renderWelcomeEmail(fullName, tenantName);

            sendHtmlEmail(to, subject, htmlContent);
            log.info("Welcome email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}", to, e);
            // Don't throw exception for welcome emails - not critical
        }
    }

    /**
     * Send staff invitation email
     */
    public void sendInvitationEmail(String to, String fullName, String invitedByName,
                                   String organizationName, String inviteToken) {
        try {
            String subject = String.format("You're invited to join %s on %s",
                organizationName, appName);
            String htmlContent = templateService.renderInvitationEmail(
                fullName, invitedByName, organizationName, inviteToken);

            sendHtmlEmail(to, subject, htmlContent);
            log.info("Invitation email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send invitation email to: {}", to, e);
            throw new RuntimeException("Failed to send invitation email", e);
        }
    }
}
