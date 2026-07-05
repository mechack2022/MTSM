package com.school.attendance.user;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.user.dto.CreateUserRequest;
import com.school.attendance.user.dto.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MessageResolver messageResolver;

    // 🔒 RBAC: Only ADMIN can create users
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request,
            HttpServletRequest httpRequest) {
        UserResponse createdUser = userService.createUser(request);
        return ResponseEntity.status(201).body(
                ApiResponse.success(
                        201,
                        messageResolver.getMessage(MessageKey.USER_CREATE_SUCCESS),
                        createdUser,
                        httpRequest.getRequestURI()
                )
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers(
            HttpServletRequest httpRequest) {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.USER_LIST_SUCCESS),
                        users,
                        httpRequest.getRequestURI()
                )
        );
    }
}
